'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, User, Lock, CheckCircle } from 'lucide-react';

export default function TestLoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resetStatus, setResetStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    
    try {
      // Call API which will set cookies and redirect
      await fetch('/api/test-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'FOUNDER',
          email: credentials.email,
          name: credentials.email.split('@')[0],
        }),
        redirect: 'manual', // Don't follow redirect, we'll do it manually
        credentials: 'include',
      });
      
      // Give a moment for cookies to be set, then navigate
      setTimeout(() => {
        window.location.href = '/orientation';
      }, 150);
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
    }
  };

  const quickLogin = async (role: 'FOUNDER' | 'ADMIN') => {
    setStatus('success');
    
    try {
      // Call API to set test-auth cookie
      await fetch('/api/test-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
        credentials: 'include', // Ensure cookies are sent/received
      });
      
      // Wait a moment for cookies to be set, then redirect
      setTimeout(() => {
        window.location.href = role === 'FOUNDER' ? '/orientation' : '/dashboard';
      }, 200);
    } catch (error) {
      console.error('Quick login error:', error);
      setStatus('error');
    }
  };

  const handleReset = async () => {
    setResetStatus('pending');
    try {
      const response = await fetch('/api/test-auth/reset', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      if (typeof window !== 'undefined') {
        for (let week = 1; week <= 10; week += 1) {
          window.localStorage.removeItem(`bootcamp-week-${week}-test`);
        }
      }

      await fetch('/api/test-auth', { method: 'DELETE' });

      setResetStatus('success');
      setStatus('idle');
      setCredentials({ email: '', password: '' });

      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (error) {
      console.error('Reset error:', error);
      setResetStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-6 py-12">
        {/* Success Message */}
        {status === 'success' && (
          <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Login Successful!</h3>
                <p className="text-sm text-green-700">
                  Redirecting to your dashboard...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Login Failed</h3>
                <p className="text-sm text-red-700">
                  Please try again or use the demo mode.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Warning Banner */}
        <div className="mb-8 rounded-lg border-2 border-ember bg-ember/10 p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-ember" />
            <div>
              <h3 className="font-semibold text-ember">Test Environment Only</h3>
              <p className="text-sm text-mute">
                This login is for local testing only. Production uses secure authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Test Login Card */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold text-ink whitespace-nowrap">Test Login</h1>
            <p className="text-mute whitespace-normal">
              Access the full founder experience for testing
            </p>
          </div>

          {/* Quick Login Buttons */}
          <div className="mb-6 space-y-3">
            <Button
              onClick={() => quickLogin('FOUNDER')}
              disabled={status === 'success'}
              className="w-full"
              size="lg"
            >
              {status === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Redirecting...
                </>
              ) : (
                <>
                  <User className="mr-2 h-5 w-5" />
                  Quick Login as Founder
                </>
              )}
            </Button>

            <Button
              onClick={() => quickLogin('ADMIN')}
              disabled={status === 'success'}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {status === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Redirecting...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Quick Login as Admin
                </>
              )}
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-mute">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Any password works for testing"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
              <p className="text-xs text-mute">
                Any password will work - this is for testing only
              </p>
            </div>

            <Button
              type="submit"
              disabled={status === 'success'}
              className="w-full"
              size="lg"
            >
              {status === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Redirecting...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Login with Email
                </>
              )}
            </Button>
          </form>

          {/* Info Section */}
          <div className="mt-6 rounded-lg bg-accent/50 p-4">
            <h4 className="mb-2 font-semibold text-ink">Testing Notes:</h4>
            <ul className="space-y-1 text-sm text-mute">
              <li>• Use quick login buttons for instant access</li>
              <li>• Or enter any email/password combination</li>
              <li>• Data now persists to the database for the test user</li>
              <li>• Access all protected routes</li>
              <li>• Production uses secure NextAuth</li>
            </ul>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-background/60 p-4">
            <h4 className="text-md mb-2 font-semibold text-ink">Reset Test Mode</h4>
            <p className="text-sm text-mute">
              Clear saved bootcamp progress, reflections, and dashboard data for the test account.
            </p>
            <Button
              onClick={handleReset}
              variant="secondary"
              className="mt-3 w-full"
              disabled={resetStatus === 'pending'}
            >
              {resetStatus === 'pending' ? 'Resetting...' : 'Reset Test Experience'}
            </Button>
            {resetStatus === 'success' && (
              <p className="mt-2 text-sm text-green-600">Reset complete. Reloading…</p>
            )}
            {resetStatus === 'error' && (
              <p className="mt-2 text-sm text-red-600">Reset failed. Please try again.</p>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="text-mute hover:text-ink"
          >
            ← Back to Homepage
          </Button>
        </div>
      </div>
    </main>
  );
}

