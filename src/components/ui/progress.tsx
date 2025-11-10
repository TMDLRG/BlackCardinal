'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
};

const clampValue = (value: number | undefined) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }
  return Math.min(100, Math.max(0, value));
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, children, ...props }, ref) => {
    const normalized = clampValue(value);

    return (
      <div
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalized}
        {...props}
      >
        <div
          className="h-full w-full origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${normalized / 100})` }}
        />
        {children}
      </div>
    );
  },
);
Progress.displayName = 'Progress';

export { Progress };

