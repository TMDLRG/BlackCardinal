'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Step = {
  id: string;
  description: string;
  owner: string;
  tool: string;
};

export function ProcessLab() {
  return (
    <section className="space-y-8">
      <ModuleContainer
        title="Process Flow Builder"
        description="Document each step of your process, including owners and tools. Exportable to SOPs."
      >
        <ProcessFlowBuilder />
      </ModuleContainer>

      <ModuleContainer
        title="Automation Opportunity Identifier"
        description="Score steps based on repetition, rule-based logic, and impact to reveal automation candidates."
      >
        <AutomationIdentifier />
      </ModuleContainer>

      <ModuleContainer
        title="SOP Draft Generator"
        description="Feed your steps to generate an SOP outline with purpose, steps, and quality checks."
      >
        <SOPGenerator />
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

function ProcessFlowBuilder() {
  const [steps, setSteps] = useState<Step[]>([
    { id: createId(), description: '', owner: '', tool: '' },
  ]);

  const addStep = () =>
    setSteps((prev) => [...prev, { id: createId(), description: '', owner: '', tool: '' }]);

  const updateStep = (id: string, field: keyof Step, value: string) => {
    setSteps((prev) => prev.map((step) => (step.id === id ? { ...step, [field]: value } : step)));
  };

  const removeStep = (id: string) => setSteps((prev) => prev.filter((step) => step.id !== id));

  const exportText = useMemo(() => {
    return steps
      .filter((step) => step.description.trim())
      .map(
        (step, idx) =>
          `${idx + 1}. ${step.description} — Owner: ${step.owner || 'TBD'} · Tool: ${step.tool || 'N/A'}`,
      )
      .join('\n');
  }, [steps]);

  const copy = async () => {
    if (!exportText) return;
    try {
      await navigator.clipboard.writeText(exportText);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="rounded-xl border border-border bg-background/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-mute">Step {index + 1}</p>
            <Textarea
              rows={2}
              value={step.description}
              onChange={(event) => updateStep(step.id, 'description', event.target.value)}
              placeholder="Describe the action or decision."
              className="mt-2"
            />
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Input
                value={step.owner}
                onChange={(event) => updateStep(step.id, 'owner', event.target.value)}
                placeholder="Owner / accountable person"
              />
              <Input
                value={step.tool}
                onChange={(event) => updateStep(step.id, 'tool', event.target.value)}
                placeholder="Tool / system used"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)} className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={addStep}>
          + Add step
        </Button>
        <Button onClick={copy} disabled={!exportText}>
          Copy flow outline
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

function AutomationIdentifier() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<string[]>([]);

  const handleAnalyze = () => {
    const lines = input
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      setAnalysis([]);
      return;
    }

    const results = lines.map((line) => {
      const lower = line.toLowerCase();
      const score =
        (lower.includes('manual') ? 2 : 0) +
        (lower.includes('repeat') ? 2 : 0) +
        (lower.includes('copy') || lower.includes('paste') ? 2 : 0) +
        (lower.includes('checklist') ? 1 : 0);
      if (score >= 4) {
        return `High potential: "${line}" — worth automating immediately.`;
      }
      if (score >= 2) {
        return `Medium potential: "${line}" — prototype automation after documenting SOPs.`;
      }
      return `Low potential: "${line}" — keep manual until volume increases.`;
    });

    setAnalysis(results);
  };

  return (
    <div className="space-y-4">
      <Textarea
        rows={4}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Paste your process steps (one per line)."
      />
      <Button onClick={handleAnalyze} disabled={!input.trim()}>
        Score automation potential
      </Button>
      {analysis.length > 0 && (
        <ul className="space-y-2 text-sm text-ink">
          {analysis.map((item) => (
            <li key={item} className="rounded-lg border border-border bg-background/70 p-3">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SOPGenerator() {
  const [purpose, setPurpose] = useState('');
  const [steps, setSteps] = useState('');
  const [quality, setQuality] = useState('');
  const [output, setOutput] = useState('');

  const generate = () => {
    const stepList = steps
      .split('\n')
      .map((step) => step.trim())
      .filter(Boolean)
      .map((step, idx) => `${idx + 1}. ${step}`)
      .join('\n');

    const qualityList = quality
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `- ${item}`)
      .join('\n');

    const sop = [
      `Purpose: ${purpose || '[Clarify why this SOP exists].'}`,
      '',
      'Steps:',
      stepList || '1. Document each step in order.',
      '',
      'Quality Checks:',
      qualityList || '- Define pass/fail criteria at each stage.',
    ].join('\n');

    setOutput(sop);
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <Input value={purpose} onChange={(event) => setPurpose(event.target.value)} placeholder="SOP purpose" />
      <Textarea
        rows={4}
        value={steps}
        onChange={(event) => setSteps(event.target.value)}
        placeholder="List steps (one per line)."
      />
      <Textarea
        rows={3}
        value={quality}
        onChange={(event) => setQuality(event.target.value)}
        placeholder="List quality checks or required evidence (one per line)."
      />
      <div className="flex flex-wrap gap-3">
        <Button onClick={generate}>Generate SOP Outline</Button>
        <Button variant="outline" onClick={copy} disabled={!output}>
          Copy Outline
        </Button>
      </div>
      {output && (
        <pre className="rounded-lg border border-border bg-ink/5 p-4 text-xs text-ink whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

