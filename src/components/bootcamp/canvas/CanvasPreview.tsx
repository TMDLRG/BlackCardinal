'use client';

import { BusinessCanvasData } from './BusinessCanvasBuilder';

type CanvasPreviewProps = {
  data: BusinessCanvasData | null;
  visible: boolean;
};

export function CanvasPreview({ data, visible }: CanvasPreviewProps) {
  if (!visible || !data) {
    return null;
  }

  return (
    <div className="print:block" data-canvas-preview>
      <div className="rounded-2xl border border-border bg-background p-6 shadow-lg print:border-0 print:shadow-none">
        <header className="mb-6 border-b border-border pb-4">
          <h1 className="text-3xl font-bold text-ink">{data.brandName || 'Black Cardinal Franchise'}</h1>
          <p className="mt-2 text-sm font-semibold text-mute">Business Launch Kit</p>
          <p className="mt-2 text-sm text-mute">{data.canvasSummary || 'Complete business plan and launch strategy'}</p>
        </header>

        <div className="space-y-6">
          <PreviewSection title="Franchise Identity" items={[
            { label: 'Purpose Statement', value: data.purpose },
            { label: 'Target Customers', value: data.targetMarket },
          ]} />
          
          <PreviewSection title="Revenue Streams & Pricing" items={[
            { label: 'Black Cardinal Products', value: data.product },
            { label: 'BYOA Services', value: data.profit },
            { label: 'Referral Program', value: data.revenueShare },
          ]} />
          
          <PreviewSection title="Personal 5Ps Foundation" items={[
            { label: 'Proper (Values)', value: data.proper },
            { label: 'Preparation (Planning)', value: data.preparation },
            { label: 'Prevents (Warning Lights)', value: data.prevents },
            { label: 'Poor (Decline Signals)', value: data.poor },
            { label: 'Performance (Promises)', value: data.performance },
          ]} />
          
          <PreviewSection title="Operations & Support" items={[
            { label: 'Core Processes', value: data.process },
            { label: 'Support Ecosystem', value: data.people },
          ]} />
          
          <PreviewSection title="AI & Marketing Tools" items={[
            { label: 'AI Outcomes', value: data.outcome },
            { label: 'AI Roles', value: data.role },
            { label: 'Prompt Library', value: data.context },
            { label: 'Marketing Strategy', value: data.marketingStrategy },
          ]} />
          
          <PreviewSection title="Launch Plan" items={[
            { label: 'Launch Date & 30-Day Plan', value: data.launchTimeline },
            { label: 'First Customer Strategy', value: data.firstCustomerTarget },
            { label: 'Success Metrics', value: data.successMetrics },
            { label: 'Day 1 Commitments', value: data.launchCommitments },
          ]} />
          
          <PreviewSection title="Financial Projections" items={[
            { label: '90-Day Revenue Projection', value: data.supportLevel },
            { label: 'Startup Costs & Inventory', value: data.productionAccess },
            { label: 'Support Needed from BC', value: data.supportRequests },
          ]} />
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ title, items }: { title: string; items: Array<{ label: string; value: string }> }) {
  return (
    <article className="space-y-3 rounded-xl border border-border bg-card/60 p-5 print:break-inside-avoid">
      <h2 className="text-lg font-semibold text-ink border-b border-border pb-2">{title}</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={`${title}-${idx}`} className="space-y-1">
            <h3 className="text-sm font-semibold text-ink">{item.label}</h3>
            <p className="text-sm text-mute whitespace-pre-wrap">{item.value || '—'}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

