'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PurposeLab() {
  return (
    <section className="space-y-8">
      <ModuleContainer
        title="AI Purpose Statement Generator"
        description="Provide your audience, the transformation you deliver, and the mechanism you use. The generator will offer three purpose variations for comparison."
      >
        <PurposeGenerator />
      </ModuleContainer>

      <ModuleContainer
        title="Purpose Testing Sandbox"
        description="Paste a purpose statement to receive an instant scorecard across clarity, urgency, and credibility."
      >
        <PurposeTester />
      </ModuleContainer>

      <ModuleContainer
        title="Competitive Narrative Scan"
        description="Map how competitors describe themselves and expose the narrative gap you will own."
      >
        <CompetitiveAnalyzer />
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

function PurposeGenerator() {
  const [audience, setAudience] = useState('');
  const [transformation, setTransformation] = useState('');
  const [mechanism, setMechanism] = useState('');
  const [tone, setTone] = useState<'bold' | 'trusted' | 'visionary'>('bold');
  const [generated, setGenerated] = useState<string[]>([]);

  const disabled = !audience || !transformation || !mechanism;

  const handleGenerate = () => {
    if (disabled) return;
    const templates = purposeTemplates[tone];
    const results = templates.map((template) =>
      template
        .replace('{audience}', audience.trim())
        .replace('{transformation}', transformation.trim())
        .replace('{mechanism}', mechanism.trim()),
    );
    setGenerated(results);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Audience</label>
          <Input
            placeholder="e.g. boutique apparel founders"
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Transformation</label>
          <Input
            placeholder="e.g. launch profitable pop-ups in 30 days"
            value={transformation}
            onChange={(event) => setTransformation(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-mute">Mechanism</label>
          <Input
            placeholder="e.g. AI-configured launch ops + curated merch"
            value={mechanism}
            onChange={(event) => setMechanism(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-mute">Tone</span>
        {(['bold', 'trusted', 'visionary'] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
              tone === option ? 'bg-ink text-background' : 'bg-oat text-ink hover:bg-oat/80',
            )}
            onClick={() => setTone(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <Button onClick={handleGenerate} disabled={disabled}>
        Generate variations
      </Button>

      {generated.length > 0 && (
        <div className="space-y-3">
          {generated.map((statement, index) => (
            <div key={statement} className="rounded-xl border border-border bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mute">Option {index + 1}</p>
              <p className="mt-2 text-sm text-ink">{statement}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const purposeTemplates: Record<'bold' | 'trusted' | 'visionary', string[]> = {
  bold: [
    'We empower {audience} to {transformation} through {mechanism}.',
    'For {audience}, we turn the impossible into inevitable by {mechanism} so they can {transformation}.',
    '{audience} partner with us to {transformation} because our {mechanism} eliminates guesswork.',
  ],
  trusted: [
    'We guide {audience} to {transformation} using {mechanism} that has been proven in the field.',
    'Our mission is to help {audience} {transformation}, backed by a trusted system of {mechanism}.',
    '{audience} rely on us to {transformation}, with {mechanism} that keeps every promise.',
  ],
  visionary: [
    'We see a world where {audience} {transformation}. We build it through {mechanism}.',
    'Imagine {audience} who can {transformation}. Our {mechanism} makes that future real today.',
    'We catalyze {transformation} for {audience} by orchestrating {mechanism}.',
  ],
};

function PurposeTester() {
  const [statement, setStatement] = useState('');
  const score = useMemo(() => scorePurpose(statement), [statement]);

  return (
    <div className="space-y-4">
      <Textarea
        value={statement}
        onChange={(event) => setStatement(event.target.value)}
        placeholder="Paste the purpose statement you want to test."
      />
      {statement && (
        <div className="grid gap-3 md:grid-cols-3">
          {score.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-border bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mute">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold text-ink">{metric.score}/5</p>
              <p className="mt-2 text-xs text-mute">{metric.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function scorePurpose(statement: string) {
  const length = statement.trim().length;
  const hasNumber = /\d/.test(statement);
  const hasBenefit = /(to|so they can|so that)/i.test(statement);
  const hasAudience = /(for|to help|with)/i.test(statement);

  const clarity = Math.min(5, Math.max(2, Math.round(length / 60)));
  const urgency = hasNumber ? 5 : 3;
  const credibility = hasBenefit && hasAudience ? 5 : 3;

  return {
    metrics: [
      {
        label: 'Clarity',
        score: clarity,
        feedback: clarity >= 4 ? 'Concise and direct.' : 'Tighten the language and remove filler.',
      },
      {
        label: 'Urgency',
        score: urgency,
        feedback: hasNumber
          ? 'Specific outcomes create urgency.'
          : 'Add measurable results (time, revenue, efficiency).',
      },
      {
        label: 'Credibility',
        score: credibility,
        feedback: hasBenefit && hasAudience
          ? 'Audience and benefit are explicit.'
          : 'Clarify who you serve and why this matters.',
      },
    ],
  };
}

function CompetitiveAnalyzer() {
  const [entries, setEntries] = useState<Array<{ name: string; statement: string }>>([
    { name: '', statement: '' },
  ]);

  const addEntry = () => setEntries((prev) => [...prev, { name: '', statement: '' }]);
  const updateEntry = (index: number, field: 'name' | 'statement', value: string) => {
    setEntries((prev) => prev.map((entry, idx) => (idx === index ? { ...entry, [field]: value } : entry)));
  };

  const insights = useMemo(() => {
    const statements = entries
      .map((entry) => entry.statement.toLowerCase())
      .filter((statement) => statement.trim().length > 0);
    if (statements.length === 0) return [];

    const repeatedWords = new Map<string, number>();
    statements.forEach((statement) => {
      statement
        .split(/\W+/)
        .filter((word) => word.length > 4)
        .forEach((word) => repeatedWords.set(word, (repeatedWords.get(word) ?? 0) + 1));
    });

    const dominant = [...repeatedWords.entries()]
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word]) => word);

    return dominant;
  }, [entries]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={`comp-${index}`} className="rounded-xl border border-border bg-background/70 p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-mute">Competitor</label>
                <Input
                  placeholder="Brand name"
                  value={entry.name}
                  onChange={(event) => updateEntry(index, 'name', event.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-mute">Purpose Statement</label>
                <Textarea
                  rows={3}
                  placeholder="Paste copy from their about page, manifesto, or campaign."
                  value={entry.statement}
                  onChange={(event) => updateEntry(index, 'statement', event.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addEntry}>
        + Add competitor
      </Button>

      {insights.length > 0 && (
        <div className="rounded-xl border border-ink/30 bg-ink/5 p-4 text-sm text-ink">
          <p className="font-semibold">Common narrative themes detected:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {insights.map((word) => (
              <li key={word}>
                Many competitors lead with <span className="font-semibold">{word}</span>. Highlight an alternative
                differentiator to stand out.
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

