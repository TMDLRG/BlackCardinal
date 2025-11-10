import { Suspense } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Order Successful | BlackCardinal',
  description: 'Your order has been confirmed.',
};

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-6 py-24 text-center">
        <CheckCircle className="mx-auto mb-6 h-24 w-24 text-green-600" />
        <h1 className="mb-4 text-4xl font-bold text-ink">Order Confirmed!</h1>
        <p className="mb-8 text-lg text-mute">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrderDetails />
        </Suspense>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/store">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

async function OrderDetails() {
  // In a real implementation, fetch order details using session_id from URL
  return (
    <div className="rounded-lg border border-border bg-card p-8">
      <h2 className="mb-4 text-xl font-semibold text-ink">What's Next?</h2>
      <ul className="space-y-3 text-left text-mute">
        <li className="flex items-start gap-2">
          <span className="mt-1 text-ink">✓</span>
          <span>Check your email for order confirmation and receipt</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-ink">✓</span>
          <span>Your account has been created (if this was your first purchase)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-ink">✓</span>
          <span>If you purchased the Founding 50 program, visit Orientation to get started</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-ink">✓</span>
          <span>Physical items will ship within 5-7 business days (subject to refinement)</span>
        </li>
      </ul>
    </div>
  );
}

