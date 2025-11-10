'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getItemCount } from '@/lib/cart';
import Link from 'next/link';

export function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial load
    setItemCount(getItemCount());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setItemCount(getItemCount());
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/cart" aria-label={`Shopping cart with ${itemCount} items`}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-xs font-bold text-oat">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}

