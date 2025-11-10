'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto max-w-2xl px-6">
        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mb-4 flex justify-center">
              <ShieldCheck className="h-16 w-16 text-ember" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-ink">Sign In Required</h1>
            <p className="text-mute">
              You need to be signed in to access this page
            </p>
          </div>

          <div className="space-y-4">
            {/* Test Login Button */}
            <Link href="/test-login">
              <Button className="w-full" size="lg">
                Use Test Login (Development)
              </Button>
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-mute">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Production Auth */}
            <div className="rounded-lg bg-accent/50 p-4 text-center">
              <p className="text-sm text-mute">
                Production authentication with Google/Email will be available soon
              </p>
            </div>
          </div>

          {/* Callback Info */}
          {callbackUrl && callbackUrl !== '/' && (
            <div className="mt-6 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
              <p className="font-semibold">Redirecting to:</p>
              <p className="truncate">{callbackUrl}</p>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/">
              <Button variant="ghost" className="text-mute hover:text-ink">
                ← Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-mute">Loading...</div>
      </main>
    }>
      <SignInContent />
    </Suspense>
  );
}

