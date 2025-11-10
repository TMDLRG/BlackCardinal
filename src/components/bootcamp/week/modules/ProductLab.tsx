'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FeatureRow = {
  id: string;
  name: string;
  priority: 'Must' | 'Should' | 'Could';
  notes: string;
};

export function ProductLab() {
  return (
    <section className="space-y-8">
      <ModuleContainer
        title="AI Product Brainstorming"
        description="Feed in your audience, outcome, and constraints to generate a list of feature ideas worth exploring."
      >
        <ProductBrainstormer />
      </ModuleContainer>

      <ModuleContainer
        title="Feature Matrix Builder"
        description="Capture your top features, classify priority, and export the matrix into your workspace."
      >
        <FeatureMatrix />
      </ModuleContainer>

      <ModuleContainer
        title="Pricing Calculator"
        description="Model pricing scenarios by combining cost, time, and desired margin. Use the output to justify your price."
      >
        <PricingCalculator />
      </ModuleContainer>
    </section>
  );
}

function ModuleContainer({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
      <header className="mb-4 space-y-2">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="text-sm text-mute">{description}</p>
      </header>
      {children}
    </article>
  );
}

function ProductBrainstormer() {
  const [audience, setAudience] = useState('');
  const [outcome, setOutcome] = useState('');
  const [constraints, setConstraints] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);

  const disabled = !audience || !outcome;

  const handleGenerate = () => {
    if (disabled) return;
    const seed = `${audience.toLowerCase()}|${outcome.toLowerCase()}|${constraints.toLowerCase()}`;
    const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const template = productIdeas[hash % productIdeas.length];
    const generated = template.map((idea) =>
      idea
        .replace('{audience}', audience.trim())
        .replace('{outcome}', outcome.trim())
        .replace('{constraint}', constraints || 'their current constraints'),
    );
    setIdeas(generated);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Audience</label>
          <Input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="e.g. first-time founders" />
        </div>
        <div className="lg:col-span-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Desired Outcome</label>
          <Input value={outcome} onChange={(event) => setOutcome(event.target.value)} placeholder="e.g. launch in 30 days" />
        </div>
        <div className="lg:col-span-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Constraints (optional)</label>
          <Input value={constraints} onChange={(event) => setConstraints(event.target.value)} placeholder="e.g. limited budget, no team" />
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={disabled}>
        Generate Feature Ideas
      </Button>

      {ideas.length > 0 && (
        <ul className="space-y-3">
          {ideas.map((idea) => (
            <li key={idea} className="rounded-xl border border-border bg-background/70 p-4 text-sm text-ink">
              {idea}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const productIdeas = [
  [
    'Launch kit tailored for {audience} with done-for-you assets that accelerate {outcome}.',
    'Guided implementation sprint that removes {constraint} as a blocker.',
    'Accountability cadence pairing {audience} with a success partner to maintain momentum.',
    'Live teardown sessions where {audience} see real-time feedback applied to their assets.',
    'Resource library that turns common {constraint} into repeatable playbooks.',
  ],
  [
    'Interactive dashboard showing {audience} progress toward {outcome} each week.',
    'Automation pack that replaces the most manual part of the process to offset {constraint}.',
    'Expert office hours focusing on the bottlenecks that stall {outcome}.',
    'AI co-pilot prompts tuned for {audience} so they can execute without guesswork.',
    'Launch-day checklist with reminders to eliminate last-minute stress.',
  ],
  [
    'Micro-learning series delivering the exact skill needed to achieve {outcome}.',
    'Supplier & partner rolodex curated for {audience}, saving weeks of research.',
    'Budget calculator translating {constraint} into actionable spend plans.',
    'Customer proof toolkit to build trust fast during the {outcome} journey.',
    'Scenario planner for adapting when {constraint} changes mid-project.',
  ],
];

function FeatureMatrix() {
  const [rows, setRows] = useState<FeatureRow[]>([
    { id: createFeatureId(), name: '', priority: 'Must', notes: '' },
  ]);

  const addRow = () =>
    setRows((prev) => [...prev, { id: createFeatureId(), name: '', priority: 'Should', notes: '' }]);

  const updateRow = (id: string, field: keyof FeatureRow, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const exportText = useMemo(() => {
    return rows
      .filter((row) => row.name.trim().length > 0)
      .map((row) => `- [${row.priority}] ${row.name} — ${row.notes || 'No notes provided.'}`)
      .join('\n');
  }, [rows]);

  const handleCopy = async () => {
    if (!exportText) return;
    try {
      await navigator.clipboard.writeText(exportText);
    } catch {
      // ignore clipboard errors silently
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl border border-border bg-background/70 p-4">
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-5 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-mute">Feature</label>
                <Input
                  value={row.name}
                  onChange={(event) => updateRow(row.id, 'name', event.target.value)}
                  placeholder="Feature headline"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-mute">Priority</label>
                <select
                  value={row.priority}
                  onChange={(event) =>
                    updateRow(row.id, 'priority', event.target.value as FeatureRow['priority'])
                  }
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-ink"
                >
                  <option value="Must">Must</option>
                  <option value="Should">Should</option>
                  <option value="Could">Could</option>
                </select>
              </div>
              <div className="md:col-span-4 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-mute">Notes</label>
                <Textarea
                  rows={2}
                  value={row.notes}
                  onChange={(event) => updateRow(row.id, 'notes', event.target.value)}
                  placeholder="Why this feature matters, dependencies, etc."
                />
              </div>
              <div className="md:col-span-1 flex items-end justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeRow(row.id)} className="text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={addRow}>
          + Add Feature
        </Button>
        <Button variant="default" onClick={handleCopy} disabled={!exportText}>
          Copy Matrix to Clipboard
        </Button>
      </div>

      {exportText && (
        <pre className="rounded-lg border border-border bg-ink/5 p-4 text-xs text-ink whitespace-pre-wrap">
          {exportText}
        </pre>
      )}
    </div>
  );
}

function createFeatureId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function PricingCalculator() {
  const [cost, setCost] = useState('');
  const [hours, setHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [margin, setMargin] = useState(40);

  const costValue = Number.parseFloat(cost) || 0;
  const hoursValue = Number.parseFloat(hours) || 0;
  const hourlyRateValue = Number.parseFloat(hourlyRate) || 0;

  const recommendedPrice = useMemo(() => {
    const base = costValue + hoursValue * hourlyRateValue;
    if (base === 0) return 0;
    return Math.ceil(base / (1 - margin / 100));
  }, [costValue, hoursValue, hourlyRateValue, margin]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Hard Costs ($)</label>
          <Input value={cost} onChange={(event) => setCost(event.target.value)} placeholder="e.g. 1200" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Founder Hours</label>
          <Input value={hours} onChange={(event) => setHours(event.target.value)} placeholder="e.g. 20" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Effective Hourly Rate</label>
          <Input value={hourlyRate} onChange={(event) => setHourlyRate(event.target.value)} placeholder="e.g. 100" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Target Margin (%)</label>
          <input
            type="range"
            min={20}
            max={80}
            value={margin}
            onChange={(event) => setMargin(Number(event.target.value))}
            className="w-full"
          />
          <p className="text-xs text-mute">Target margin: {margin}%</p>
        </div>
      </div>

      {recommendedPrice > 0 && (
        <div className="rounded-xl border border-ink/30 bg-ink/5 p-4">
          <p className="text-sm text-ink">
            Recommended base price: <span className="text-xl font-semibold">${recommendedPrice}</span>
          </p>
          <p className="text-xs text-mute">
            Assumes total cost basis of ${(costValue + hoursValue * hourlyRateValue).toFixed(2)} and {margin}% margin target.
          </p>
        </div>
      )}
    </div>
  );
}

