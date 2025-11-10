'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import BlackCardinalLogo from '../../images/BlackCardinalLogo.png';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Trigger animation after mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const animationClass = prefersReducedMotion
    ? 'opacity-100'
    : `transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background via-background/95 to-oat/20 px-6 py-24">
      {/* Logo reveal animation */}
      <div className={animationClass}>
        <div className="mb-8 flex justify-center">
          <div className="relative h-48 w-48 md:h-64 md:w-64">
            <Image
              src={BlackCardinalLogo}
              alt="BlackCardinal Logo"
              fill
              priority
              sizes="(max-width: 768px) 192px, 256px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Tagline */}
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
          Luxury That Speaks Volumes
        </h1>

        <p className="mx-auto mb-2 max-w-2xl text-center text-lg text-mute md:text-xl">
          Quiet details. Bold impact.
        </p>

        <p className="mx-auto mb-12 max-w-3xl text-center text-base text-muted md:text-lg">
          We press purpose into every piece. Modern merch with meaning meets sustainable BYOA
          heat-press services.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <a href="#products">Shop Merch</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#byoa">Book BYOA</a>
          </Button>
        </div>

        {/* Impact note */}
        <p className="mt-12 text-center text-sm italic text-mute">
          5% of all net profits support autism nonprofits — inspired by Jesse, printed with
          purpose.
        </p>
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <div
          className={`absolute bottom-12 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronDown
            className="h-8 w-8 animate-bounce text-mute"
            aria-label="Scroll down"
          />
        </div>
      )}
    </section>
  );
}

