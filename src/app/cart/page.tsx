'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getCart, updateQuantity, removeFromCart, clearCart, type Cart, type CartItem } from '@/lib/cart';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], totalCents: 0 });

  useEffect(() => {
    setCart(getCart());

    const handleCartUpdate = (event: CustomEvent<Cart>) => {
      setCart(event.detail);
    };

    window.addEventListener('cart-updated', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl px-6 py-24 text-center">
          <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-mute/30" />
          <h1 className="mb-4 text-3xl font-bold text-ink">Your Cart is Empty</h1>
          <p className="mb-8 text-lg text-mute">
            Add some items from the store to get started.
          </p>
          <Button asChild size="lg">
            <Link href="/store">Browse Store</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-ink">Shopping Cart</h1>
          <Button variant="ghost" onClick={handleClearCart} className="text-mute hover:text-ink">
            Clear Cart
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold text-ink">Order Summary</h2>
              
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-mute">
                  <span>Subtotal</span>
                  <span>${(cart.totalCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-mute">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between text-lg font-bold text-ink">
                <span>Total</span>
                <span>${(cart.totalCents / 100).toFixed(2)}</span>
              </div>
              
              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link href="/store">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const itemTotal = (item.priceCents * item.quantity) / 100;

  return (
    <div className="flex gap-6 rounded-lg border border-border bg-card p-6">
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-oat/20">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-mute/30" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="mb-1 text-lg font-semibold text-ink">{item.name}</h3>
          <p className="line-clamp-2 text-sm text-mute">{item.description}</p>
        </div>
        
        {/* Quantity Controls */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center rounded-md border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-mute hover:text-red-600"
            onClick={() => onRemove(item.productId)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="text-xl font-bold text-ink">${itemTotal.toFixed(2)}</div>
        <div className="text-sm text-mute">${(item.priceCents / 100).toFixed(2)} each</div>
      </div>
    </div>
  );
}

