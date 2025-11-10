'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, CreditCard, Bitcoin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'payment' | 'processing'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleMockPayment = () => {
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      // Store mock founder data in localStorage for demo purposes
      localStorage.setItem('mockFounder', JSON.stringify({
        ...formData,
        enrolledAt: new Date().toISOString(),
        status: 'active',
      }));
      
      // Redirect to demo page to show full founder experience
      router.push('/demo');
    }, 2000);
  };

  if (step === 'processing') {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ink text-oat">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-oat border-t-transparent" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-2">Processing Payment...</h2>
          <p className="text-mute">Please wait while we complete your registration.</p>
        </div>
      </main>
    );
  }

  if (step === 'payment') {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-ink">Complete Your Purchase</h1>
            <p className="text-lg text-mute">
              Choose your preferred payment method to finalize registration.
            </p>
          </div>

          {/* Product Summary */}
          <div className="mb-8 rounded-lg border border-border bg-card p-8">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-oat">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-ink">Founding 50 Program</h2>
                  <p className="text-mute">
                    Complete sample kit, bootcamp access, CRM toolkit, and exclusive territory.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-ink">$50</div>
                <div className="text-sm text-mute">One-time</div>
              </div>
            </div>
          </div>

          {/* Registrant Info */}
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold text-ink">Registrant Information</h3>
            <div className="grid gap-2 text-sm">
              <div><span className="text-mute">Name:</span> <span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
              <div><span className="text-mute">Email:</span> <span className="font-medium">{formData.email}</span></div>
              <div><span className="text-mute">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
              <div><span className="text-mute">Location:</span> <span className="font-medium">{formData.city}, {formData.state}</span></div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={() => setStep('form')}
            >
              Edit Information
            </Button>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-ink">Choose Payment Method</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                asChild
                size="lg"
                className="h-auto flex-col items-start gap-2 p-6 text-left"
              >
                <Link href="/checkout/stripe">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6" />
                    <span className="text-lg font-semibold">Credit / Debit Card</span>
                  </div>
                  <p className="text-sm font-normal opacity-80">Secure payment via Stripe</p>
                </Link>
              </Button>
              
              {/* Mock Payment Button for Demo */}
              <Button
                size="lg"
                variant="outline"
                className="h-auto flex-col items-start gap-2 p-6 text-left border-2 border-green-500"
                onClick={handleMockPayment}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg font-semibold">Demo Payment (Testing)</span>
                </div>
                <p className="text-sm font-normal">Skip payment for full demo experience</p>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-auto flex-col items-start gap-2 p-6 text-left"
                disabled
              >
                <div className="flex items-center gap-3">
                  <Bitcoin className="h-6 w-6" />
                  <span className="text-lg font-semibold">Cryptocurrency</span>
                </div>
                <p className="text-sm font-normal">Coming soon</p>
              </Button>
            </div>
          </div>

          {/* Fine Print */}
          <div className="rounded-lg bg-oat/10 p-6 text-sm text-mute">
            <p className="mb-2">
              <strong>Important:</strong> This kit is informational and not a contract. Program
              details are evolving; benefits may change.
            </p>
            <p className="mb-2">
              Sample kit contents and timeline are subject to refinement. Roster listing cadence and
              format to be confirmed.
            </p>
            <p>
              By proceeding, you acknowledge the provisional nature of the program and agree to the{' '}
              <Link href="/legal/terms" className="underline hover:text-ink">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-ink">Join the Founding 50</h1>
          <p className="text-lg text-mute">
            Complete your registration to become a founding member.
          </p>
        </div>

        {/* Product Summary */}
        <div className="mb-8 rounded-lg border border-border bg-card p-8">
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-oat">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-ink">Founding 50 Program</h2>
                <p className="text-mute">
                  Complete sample kit, bootcamp access, CRM toolkit, and exclusive territory.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-ink">$50</div>
              <div className="text-sm text-mute">One-time</div>
            </div>
          </div>

          {/* What's Included */}
          <div className="border-t border-border pt-6">
            <h3 className="mb-4 font-semibold text-ink">What's Included:</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2 text-sm text-mute">
                <span className="mt-1 text-ink">✓</span>
                <span>Physical sample kit (subject to refinement)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-mute">
                <span className="mt-1 text-ink">✓</span>
                <span>10-week bootcamp (ORC + 5Ps + Sales)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-mute">
                <span className="mt-1 text-ink">✓</span>
                <span>CRM toolkit for lead/deal tracking</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-mute">
                <span className="mt-1 text-ink">✓</span>
                <span>Public roster listing (opt-in)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-mute">
                <span className="mt-1 text-ink">✓</span>
                <span>Marketing assets & templates</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-mute">
                <span className="mt-1 text-ink">✓</span>
                <span>Event support & guidance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mb-8 rounded-lg border border-border bg-card p-8">
          <h3 className="mb-6 text-xl font-semibold text-ink">Your Information</h3>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName" className="mb-2 block text-sm font-medium text-ink">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="mb-2 block text-sm font-medium text-ink">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-2">
              <Label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@example.com"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-2">
              <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="city" className="mb-2 block text-sm font-medium text-ink">
                City *
              </Label>
              <Input
                id="city"
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="state" className="mb-2 block text-sm font-medium text-ink">
                State *
              </Label>
              <Input
                id="state"
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="NY"
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg">
              Continue to Payment
            </Button>
          </div>
        </form>

        {/* Fine Print */}
        <div className="rounded-lg bg-oat/10 p-6 text-sm text-mute">
          <p className="mb-2">
            <strong>Important:</strong> This kit is informational and not a contract. Program
            details are evolving; benefits may change.
          </p>
          <p className="mb-2">
            Sample kit contents and timeline are subject to refinement. Roster listing cadence and
            format to be confirmed.
          </p>
          <p>
            By proceeding, you acknowledge the provisional nature of the program and agree to the{' '}
            <Link href="/legal/terms" className="underline hover:text-ink">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

