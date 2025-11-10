'use client';

import { ReactNode } from 'react';

type CanvasSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  active?: boolean;
};

export function CanvasSection({ title, description, children, active = false }: CanvasSectionProps) {
  return (
    <section
      className={`rounded-2xl border p-6 transition-all ${
        active ? 'border-ink bg-card' : 'border-border bg-card/60'
      }`}
    >
      <header className="mb-4 space-y-2">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <p className="text-sm text-mute">{description}</p>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

