'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { addToCart, type CartItem } from '@/lib/cart';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  disabled?: boolean;
}

export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    
    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || added}
      className={`w-full ${added ? 'bg-green-600 hover:bg-green-700' : ''}`}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {added ? 'Added' : 'Add to Cart'}
    </Button>
  );
}

