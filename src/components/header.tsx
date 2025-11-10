'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartButton } from '@/components/cart-button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="BlackCardinal Home">
          <div className="relative h-8 w-8">
            <Image
              src="/BlackCardinalLogo.png"
              alt="BlackCardinal"
              width={32}
              height={32}
              priority
              className="object-contain"
            />
          </div>
          <span className="text-xl font-semibold">BlackCardinal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          <Link
            href="/store"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Store
          </Link>
          <Link
            href="/founding-50"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Founding 50
          </Link>
          <Link
            href="/roster"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Roster
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/test-login"
            className="rounded-md border border-ember px-3 py-1 text-sm font-medium text-ember transition-colors hover:bg-ember hover:text-oat"
          >
            Test Login
          </Link>
        </nav>

        {/* Desktop Cart + Mobile menu button */}
        <div className="flex items-center gap-2">
          <CartButton />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-border bg-background px-4 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-3">
            <Link
              href="/store"
              className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-oat hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/founding-50"
              className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-oat hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Founding 50
            </Link>
            <Link
              href="/roster"
              className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-oat hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roster
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-oat hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/test-login"
              className="rounded-md border border-ember bg-ember/10 px-3 py-2 text-base font-medium text-ember transition-colors hover:bg-ember hover:text-oat"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔐 Test Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

