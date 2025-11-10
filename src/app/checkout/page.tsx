'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { getCart, type Cart } from '@/lib/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>({ items: [], totalCents: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.items.length === 0) {
      router.push('/cart');
    }
    setCart(currentCart);
  }, [router]);

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-ink">Checkout</h1>

        {/* Order Summary */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">Order Summary</h2>
          <div className="space-y-3 border-b border-border pb-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-mute">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-ink">
                  ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold text-ink">
            <span>Total</span>
            <span>${(cart.totalCents / 100).toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-6 text-xl font-semibold text-ink">Payment</h2>
          
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <Button
            onClick={handleStripeCheckout}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay with Stripe
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-sm text-mute">
            Secure payment processing via Stripe
          </p>
        </div>
      </div>
    </main>
  );
}

