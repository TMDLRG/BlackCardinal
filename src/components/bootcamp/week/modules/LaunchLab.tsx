'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Channel = {
  id: string;
  name: string;
  goal: string;
  kpi: string;
};

type ContentItem = {
  id: string;
  week: number;
  theme: string;
  format: string;
};

type ChecklistItem = {
  id: string;
  phase: 'Pre-Launch' | 'Launch Week' | 'Post-Launch';
  task: string;
  owner: string;
  due: string;
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

export function LaunchLab() {
  return (
    <section className="space-y-8">
      <ModuleContainer
        title="Marketing Plan Builder"
        description="Prioritize channels, define goals, and set KPIs for the first 90 days."
      >
        <MarketingPlanBuilder />
      </ModuleContainer>

      <ModuleContainer
        title="Content Calendar Generator"
        description="Design a four-week content run with weekly themes and formats."
      >
        <ContentCalendarBuilder />
      </ModuleContainer>

      <ModuleContainer
        title="Launch Checklist Creator"
        description="Build a phased checklist covering pre-launch, launch week, and post-launch activities."
      >
        <LaunchChecklistBuilder />
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

function MarketingPlanBuilder() {
  const [channels, setChannels] = useState<Channel[]>([
    { id: createId(), name: '', goal: '', kpi: '' },
  ]);

  const addChannel = () => setChannels((prev) => [...prev, { id: createId(), name: '', goal: '', kpi: '' }]);
  const updateChannel = (id: string, field: keyof Channel, value: string) => {
    setChannels((prev) => prev.map((channel) => (channel.id === id ? { ...channel, [field]: value } : channel)));
  };
  const removeChannel = (id: string) => setChannels((prev) => prev.filter((channel) => channel.id !== id));

  const exportText = useMemo(
    () =>
      channels
        .filter((channel) => channel.name.trim())
        .map(
          (channel) =>
            `Channel: ${channel.name}\nGoal: ${channel.goal || '[Define the outcome]'}\nPrimary KPI: ${channel.kpi || '[Define the metric]'}\n`,
        )
        .join('\n'),
    [channels],
  );

  const handleCopy = async () => {
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
        {channels.map((channel) => (
          <div key={channel.id} className="rounded-xl border border-border bg-background/70 p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <Input
                value={channel.name}
                onChange={(e) => updateChannel(channel.id, 'name', e.target.value)}
                placeholder="Channel name (e.g. Instagram Live, Partnerships)"
              />
              <Input
                value={channel.goal}
                onChange={(e) => updateChannel(channel.id, 'goal', e.target.value)}
                placeholder="Goal"
              />
              <Input
                value={channel.kpi}
                onChange={(e) => updateChannel(channel.id, 'kpi', e.target.value)}
                placeholder="Primary KPI"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => removeChannel(channel.id)} className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={addChannel}>
          + Add channel
        </Button>
        <Button onClick={handleCopy} disabled={!exportText}>
          Copy marketing plan
        </Button>
      </div>
      {exportText && (
        <pre className="rounded-lg border border-border bg-ink/5 p-4 text-xs text-ink whitespace-pre-wrap">{exportText}</pre>
      )}
    </div>
  );
}

function ContentCalendarBuilder() {
  const [items, setItems] = useState<ContentItem[]>(
    Array.from({ length: 4 }, (_, idx) => ({
      id: createId(),
      week: idx + 1,
      theme: '',
      format: '',
    })),
  );

  const updateItem = (id: string, field: keyof ContentItem, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: field === 'week' ? Number(value) : value } : item)));
  };

  const exportText = useMemo(() => {
    return items
      .map((item) => `Week ${item.week}: Theme — ${item.theme || '[Theme]'} | Format — ${item.format || '[Format]'}`)
      .join('\n');
  }, [items]);

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
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-background/70 p-4">
            <div className="grid gap-3 md:grid-cols-12">
              <Input
                type="number"
                min={1}
                max={4}
                className="md:col-span-2"
                value={item.week}
                onChange={(e) => updateItem(item.id, 'week', e.target.value)}
              />
              <Input
                className="md:col-span-5"
                value={item.theme}
                onChange={(e) => updateItem(item.id, 'theme', e.target.value)}
                placeholder="Theme / story"
              />
              <Input
                className="md:col-span-5"
                value={item.format}
                onChange={(e) => updateItem(item.id, 'format', e.target.value)}
                placeholder="Format (e.g. live, email, carousel)"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setItems((prev) => [...prev, { id: createId(), week: prev.length + 1, theme: '', format: '' }])}>
          + Add week
        </Button>
        <Button onClick={copy} disabled={!exportText}>
          Copy calendar
        </Button>
      </div>
      <pre className="rounded-lg border border-border bg-ink/5 p-4 text-xs text-ink whitespace-pre-wrap">
        {exportText}
      </pre>
    </div>
  );
}

function LaunchChecklistBuilder() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: createId(), phase: 'Pre-Launch', task: '', owner: '', due: '' },
  ]);

  const addItem = () =>
    setItems((prev) => [...prev, { id: createId(), phase: 'Pre-Launch', task: '', owner: '', due: '' }]);

  const updateItem = (id: string, field: keyof ChecklistItem, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: field === 'phase' ? (value as ChecklistItem['phase']) : value } : item)),
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const exportText = useMemo(() => {
    return items
      .filter((item) => item.task.trim())
      .map(
        (item) =>
          `[${item.phase}] ${item.task} — Owner: ${item.owner || 'TBD'} · Due: ${item.due || 'TBD'}`,
      )
      .join('\n');
  }, [items]);

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
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-background/70 p-4">
            <div className="grid gap-3 md:grid-cols-12">
              <select
                className="md:col-span-2 h-10 rounded-md border border-border bg-background px-3 text-sm text-ink"
                value={item.phase}
                onChange={(e) => updateItem(item.id, 'phase', e.target.value)}
              >
                <option value="Pre-Launch">Pre-Launch</option>
                <option value="Launch Week">Launch Week</option>
                <option value="Post-Launch">Post-Launch</option>
              </select>
              <Input
                className="md:col-span-5"
                value={item.task}
                onChange={(e) => updateItem(item.id, 'task', e.target.value)}
                placeholder="Task"
              />
              <Input
                className="md:col-span-2"
                value={item.owner}
                onChange={(e) => updateItem(item.id, 'owner', e.target.value)}
                placeholder="Owner"
              />
              <Input
                className="md:col-span-2"
                value={item.due}
                onChange={(e) => updateItem(item.id, 'due', e.target.value)}
                placeholder="Due date"
              />
              <div className="md:col-span-1 flex items-center justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={addItem}>
          + Add checklist item
        </Button>
        <Button onClick={copy} disabled={!exportText}>
          Copy checklist
        </Button>
      </div>
      {exportText && (
        <pre className="rounded-lg border border-border bg-ink/5 p-4 text-xs text-ink whitespace-pre-wrap">{exportText}</pre>
      )}
    </div>
  );
}

