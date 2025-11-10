'use client';

import { useEffect, useMemo, useState } from 'react';
import { CanvasField } from './CanvasField';
import { CanvasSection } from './CanvasSection';
import { CanvasNavigation } from './CanvasNavigation';
import { CanvasPreview } from './CanvasPreview';
import { CanvasPDFExport } from './CanvasPDFExport';

export type BusinessCanvasData = {
  id: string;
  purpose: string;
  product: string;
  people: string;
  process: string;
  profit: string;
  proper: string;
  preparation: string;
  prevents: string;
  poor: string;
  performance: string;
  outcome: string;
  role: string;
  context: string;
  brandName: string;
  brandIdentity: string;
  targetMarket: string;
  uniqueValue: string;
  canvasSummary: string;
  launchTimeline: string;
  marketingStrategy: string;
  firstCustomerTarget: string;
  successMetrics: string;
  revenueShare: string;
  supportLevel: string;
  productionAccess: string;
  launchCommitments: string;
  supportRequests: string;
  updatedAt?: string;
};

type CanvasFieldKey = keyof Omit<BusinessCanvasData, 'id' | 'updatedAt'>;

type DraftState = Partial<Record<CanvasFieldKey, string>>;

const sections: Array<{
  id: string;
  title: string;
  description: string;
  fields: Array<{ key: CanvasFieldKey; label: string; helper?: string; placeholder?: string; rows?: number }>;
}> = [
  {
    id: 'identity',
    title: 'Your Black Cardinal Franchise',
    description: 'Core identity: who you are, who you serve, and what makes you unique.',
    fields: [
      { key: 'brandName', label: 'Your Franchise Name', placeholder: 'e.g., Black Cardinal Austin', helper: 'Your local Black Cardinal franchise name' },
      { key: 'canvasSummary', label: 'Business Overview', helper: 'One paragraph summarizing your entire franchise.', placeholder: 'I run a Black Cardinal franchise in [city] serving...', rows: 3 },
      { key: 'purpose', label: 'Your Purpose Statement', helper: 'From Week 4: Who you help, what you provide, why it matters.', placeholder: 'I help [who] in [area] [achieve what] through Black Cardinal...', rows: 3 },
      { key: 'targetMarket', label: 'Your Ideal Customers', helper: 'From Week 4: Customer personas and where they spend time.', placeholder: 'My ideal customers are... They value... They shop at...', rows: 4 },
    ],
  },
  {
    id: 'revenue',
    title: 'Revenue Streams & Pricing',
    description: 'Your three revenue streams with pricing and profit margins.',
    fields: [
      { key: 'product', label: 'Black Cardinal Products', helper: 'From Week 4: List your core products with wholesale/retail pricing.', placeholder: '1. Classic Tee - Wholesale $20, Retail $40, Profit $20...', rows: 4 },
      { key: 'profit', label: 'BYOA Services & Pricing', helper: 'From Week 5: Your BYOA service offerings and pricing structure.', placeholder: 'Simple print: $15, Standard: $25, Premium: $30...', rows: 3 },
      { key: 'revenueShare', label: 'Referral Program', helper: 'How you\'ll grow the Founding 50 network in your area.', placeholder: 'I\'ll refer potential franchise owners by...', rows: 3 },
    ],
  },
  {
    id: 'personal-5ps',
    title: 'Personal 5Ps Foundation',
    description: 'Your personal operating system from Weeks 2-3.',
    fields: [
      { key: 'proper', label: 'Proper: Your Values', helper: 'From Week 2: 3-5 core values that guide your decisions.', placeholder: 'Honesty, Quality, Community, Integrity...', rows: 2 },
      { key: 'preparation', label: 'Preparation: Your Planning Ritual', helper: 'From Week 2: When and how you plan your week.', placeholder: 'Every Sunday at 7pm, I review sales, plan priorities, check inventory...', rows: 3 },
      { key: 'prevents', label: 'Prevents: Your Warning Lights', helper: 'From Week 2: 5 things you check weekly to catch problems early.', placeholder: 'Inventory levels, cash flow, customer feedback, energy levels, sales trends...', rows: 3 },
      { key: 'poor', label: 'Poor: Your Decline Signals', helper: 'From Week 3: Signs that tell you something needs attention.', placeholder: 'Working more but earning less, dreading customer calls, inventory piling up...', rows: 3 },
      { key: 'performance', label: 'Performance: Your Promises', helper: 'From Week 3: Weekly commitments you track and deliver on.', placeholder: 'Ship orders on time, respond within 24hrs, post 3x/week, review numbers...', rows: 3 },
    ],
  },
  {
    id: 'operations',
    title: 'Operations & Processes',
    description: 'How you run your business day-to-day from Week 5.',
    fields: [
      { key: 'process', label: 'Your Core Processes', helper: 'From Week 5: Key processes for orders, BYOA, inventory, customer service.', placeholder: 'Product Order Process: (1) Confirm payment, (2) Pack with BC tissue, (3) Ship within 24hrs...', rows: 5 },
      { key: 'people', label: 'Your Support Ecosystem', helper: 'Partners, suppliers, mentors, and future team members.', placeholder: 'Partners: [local coffee shop for display], Suppliers: [BC wholesale], Mentors: [F50 members]...', rows: 4 },
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI & Marketing Tools',
    description: 'Your ORC templates and marketing systems from Weeks 6-8.',
    fields: [
      { key: 'outcome', label: 'AI Outcomes You Create', helper: 'From Week 6: What you use AI to generate.', placeholder: 'Social posts, email campaigns, ad copy, customer responses...', rows: 2 },
      { key: 'role', label: 'AI Role Definitions', helper: 'From Week 6: How you configure AI to sound.', placeholder: 'Friendly local business owner, professional brand ambassador...', rows: 2 },
      { key: 'context', label: 'Your Prompt Library', helper: 'From Weeks 6-7: Templates you\'ve built for common tasks.', placeholder: 'Instagram post template, welcome email template, Facebook ad template...', rows: 4 },
      { key: 'marketingStrategy', label: 'Marketing Channels & Calendar', helper: 'From Week 9: Your content calendar and channel strategy.', placeholder: 'Post 3x/week on Instagram, email list monthly, local events quarterly...', rows: 3 },
    ],
  },
  {
    id: 'launch',
    title: 'Launch Plan & Commitments',
    description: 'Your 30-day launch plan and Day 1 commitments from Weeks 9-10.',
    fields: [
      { key: 'launchTimeline', label: 'Your Launch Date & 30-Day Plan', helper: 'From Week 9: Specific launch date and week-by-week goals.', placeholder: 'Launch Date: [date]. Week 1: 3 sales, tell 20 people. Week 2: 5 sales, first BYOA job...', rows: 4 },
      { key: 'firstCustomerTarget', label: 'First Customer Strategy', helper: 'Who you\'ll reach out to first and how.', placeholder: 'Start with my network: friends, family, coworkers. Offer F&F discount...', rows: 3 },
      { key: 'successMetrics', label: 'Your Success Metrics', helper: 'From Week 10: How you\'ll measure success in first 90 days.', placeholder: 'Month 1: $500 profit, 10 sales. Month 2: $900 profit, 15 sales + 5 BYOA. Month 3: $1500 profit...', rows: 3 },
      { key: 'launchCommitments', label: 'Your Day 1 Commitments', helper: 'From Week 10: What you\'ll do in first 24 hours after launch.', placeholder: 'Post announcement, email 25 people, set goal of 3 sales in week 1...', rows: 3 },
    ],
  },
  {
    id: 'financial',
    title: 'Financial Projections',
    description: 'Your 90-day financial plan from Week 10.',
    fields: [
      { key: 'supportLevel', label: '90-Day Revenue Projection', helper: 'Month-by-month sales, revenue, costs, and profit estimates.', placeholder: 'Month 1: 10 sales, $400 revenue, $250 costs, $150 profit...', rows: 4 },
      { key: 'productionAccess', label: 'Startup Costs & Inventory', helper: 'Initial investment needed for inventory, equipment, marketing.', placeholder: 'Inventory: $500, Heat press: $300, Marketing: $200, Total: $1000...', rows: 3 },
      { key: 'supportRequests', label: 'Support Needed from Black Cardinal', helper: 'What help, training, or resources you need from BC HQ.', placeholder: 'Need: product training, marketing materials, F50 community access...', rows: 3 },
    ],
  },
];

export function BusinessCanvasBuilder() {
  const [canvas, setCanvas] = useState<BusinessCanvasData | null>(null);
  const [draft, setDraft] = useState<DraftState>({});
  const [activeSection, setActiveSection] = useState<string>('identity');
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error'>('loading');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch('/api/bootcamp/canvas', { cache: 'no-store' });
        const json = await res.json();
        let canvasData = json.canvas as BusinessCanvasData | null;

        if (!canvasData) {
          const create = await fetch('/api/bootcamp/canvas', { method: 'POST' });
          const created = await create.json();
          canvasData = created.canvas ?? null;
        }

        if (mounted) {
          setCanvas(canvasData);
          setStatus('idle');
        }
      } catch {
        if (mounted) {
          setStatus('error');
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;
    if (Object.keys(draft).length === 0) return;

    const handler = setTimeout(async () => {
      setStatus('saving');
      try {
        await fetch('/api/bootcamp/canvas', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        });
        setDraft({});
        setStatus('saved');
        setLastSaved(new Date());
      } catch {
        setStatus('error');
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [draft, canvas]);

  const handleFieldChange = (key: CanvasFieldKey, value: string) => {
    setCanvas((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownloadJSON = () => {
    if (!canvas) return;
    const blob = new Blob([JSON.stringify(canvas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${canvas.brandName.replace(/\s+/g, '-').toLowerCase()}-canvas.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    setPreviewOpen(true);
    setTimeout(() => window.print(), 120);
  };

  const statusLabel = useMemo(() => {
    switch (status) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Save failed. Retry or check network.';
      case 'loading':
        return 'Loading canvas...';
      default:
        return lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : 'Autosave enabled';
    }
  }, [status, lastSaved]);

  if (!canvas) {
    return (
      <div className="rounded-2xl border border-border bg-card/50 p-6 text-sm text-mute">
        Preparing your canvas...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CanvasNavigation
          sections={sections.map((section) => ({ id: section.id, title: section.title }))}
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <div className="text-xs text-mute">{statusLabel}</div>
      </div>

      {sections.map((section) => (
        <CanvasSection
          key={section.id}
          title={section.title}
          description={section.description}
          active={section.id === activeSection}
        >
          {section.fields.map((field) => (
            <CanvasField
              key={field.key}
              label={field.label}
              helper={field.helper}
              placeholder={field.placeholder}
              rows={field.rows}
              value={(canvas[field.key] as string) ?? ''}
              onChange={(value) => handleFieldChange(field.key, value)}
            />
          ))}
        </CanvasSection>
      ))}

      <div className="space-y-4 rounded-2xl border border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold text-ink">Preview & Export</h2>
        <p className="text-sm text-mute">
          Review the unified canvas before sharing. Use “Print / Export PDF” to produce a shareable version or download the raw JSON.
        </p>
        <CanvasPDFExport onDownloadJSON={handleDownloadJSON} onPrint={handlePrint} />
        <button
          type="button"
          className="text-xs font-semibold uppercase tracking-wide text-ember"
          onClick={() => setPreviewOpen((prev) => !prev)}
        >
          {previewOpen ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <CanvasPreview data={canvas} visible={previewOpen} />
    </div>
  );
}

