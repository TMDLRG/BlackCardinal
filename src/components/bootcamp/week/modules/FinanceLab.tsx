'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type RevenueLine = {
  id: string;
  label: string;
  price: number;
  units: number;
};

type CostLine = {
  id: string;
  label: string;
  cost: number;
};

export function FinanceLab() {
  return (
    <section className="space-y-8">
      <ModuleContainer
        title="Pricing Strategy Calculator"
        description="Model pricing scenarios with anchor price, value price, and acceptable floor price per offer."
      >
        <PricingStrategy />
      </ModuleContainer>

      <ModuleContainer
        title="Financial Model Builder"
        description="Assemble a 12-month projection by adding revenue lines and cost lines. Snapshot your net margin automatically."
      >
        <FinancialModel />
      </ModuleContainer>

      <ModuleContainer
        title="Break-even & Runway Analyzer"
        description="Input monthly fixed costs and contribution margin to estimate break-even revenue and cash runway."
      >
        <BreakEvenAnalyzer />
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

function PricingStrategy() {
  const [cost, setCost] = useState('');
  const [value, setValue] = useState('');
  const [anchor, setAnchor] = useState('');

  const parsedCost = Number.parseFloat(cost) || 0;
  const parsedValue = Number.parseFloat(value) || 0;
  const parsedAnchor = Number.parseFloat(anchor) || 0;

  const guardrails = useMemo(() => {
    const floor = parsedCost * 1.5;
    const valuePrice = parsedValue || floor;
    const anchorPrice = parsedAnchor || valuePrice * 1.5;
    return {
      floor: Math.ceil(floor),
      target: Math.ceil(valuePrice),
      anchor: Math.ceil(anchorPrice),
    };
  }, [parsedCost, parsedValue, parsedAnchor]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Input value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Delivery cost per unit ($)" />
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Perceived value ($)" />
        <Input value={anchor} onChange={(e) => setAnchor(e.target.value)} placeholder="Comparable anchor price ($)" />
      </div>

      <div className="grid gap-3 md:grid-cols-3 text-sm text-ink">
        <PriceCard label="Floor price" value={guardrails.floor} description="Never go below this number." />
        <PriceCard label="Target price" value={guardrails.target} description="Priced to match delivered value." />
        <PriceCard label="Anchor price" value={guardrails.anchor} description="Use as comparison in conversations." />
      </div>
    </div>
  );
}

function PriceCard({ label, value, description }: { label: string; value: number; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-mute">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">${value}</p>
      <p className="mt-2 text-xs text-mute">{description}</p>
    </div>
  );
}

const createId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

function FinancialModel() {
  const [revenues, setRevenues] = useState<RevenueLine[]>([
    { id: createId(), label: '', price: 0, units: 0 },
  ]);
  const [costs, setCosts] = useState<CostLine[]>([{ id: createId(), label: '', cost: 0 }]);

  const addRevenue = () => setRevenues((prev) => [...prev, { id: createId(), label: '', price: 0, units: 0 }]);
  const updateRevenue = (id: string, field: keyof RevenueLine, value: string) => {
    setRevenues((prev) =>
      prev.map((line) => (line.id === id ? { ...line, [field]: field === 'label' ? value : Number(value) || 0 } : line)),
    );
  };
  const removeRevenue = (id: string) => setRevenues((prev) => prev.filter((line) => line.id !== id));

  const addCost = () => setCosts((prev) => [...prev, { id: createId(), label: '', cost: 0 }]);
  const updateCost = (id: string, field: keyof CostLine, value: string) => {
    setCosts((prev) =>
      prev.map((line) => (line.id === id ? { ...line, [field]: field === 'label' ? value : Number(value) || 0 } : line)),
    );
  };
  const removeCost = (id: string) => setCosts((prev) => prev.filter((line) => line.id !== id));

  const totals = useMemo(() => {
    const revenue = revenues.reduce((sum, line) => sum + line.price * line.units, 0);
    const cost = costs.reduce((sum, line) => sum + line.cost, 0);
    const net = revenue - cost;
    const margin = revenue === 0 ? 0 : Math.round((net / revenue) * 100);
    return { revenue, cost, net, margin };
  }, [revenues, costs]);

  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-ink">Revenue Lines</h4>
        {revenues.map((line) => (
          <div key={line.id} className="grid gap-3 md:grid-cols-12 rounded-xl border border-border bg-background/70 p-4">
            <Input
              className="md:col-span-4"
              value={line.label}
              placeholder="Offer / line item"
              onChange={(e) => updateRevenue(line.id, 'label', e.target.value)}
            />
            <Input
              className="md:col-span-3"
              type="number"
              value={line.price || ''}
              placeholder="Price"
              onChange={(e) => updateRevenue(line.id, 'price', e.target.value)}
            />
            <Input
              className="md:col-span-3"
              type="number"
              value={line.units || ''}
              placeholder="Units / month"
              onChange={(e) => updateRevenue(line.id, 'units', e.target.value)}
            />
            <div className="md:col-span-2 flex items-center justify-end">
              <Button variant="ghost" size="sm" onClick={() => removeRevenue(line.id)} className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addRevenue}>
          + Add revenue line
        </Button>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-ink">Cost Lines</h4>
        {costs.map((line) => (
          <div key={line.id} className="grid gap-3 md:grid-cols-12 rounded-xl border border-border bg-background/70 p-4">
            <Input
              className="md:col-span-6"
              value={line.label}
              placeholder="Cost category"
              onChange={(e) => updateCost(line.id, 'label', e.target.value)}
            />
            <Input
              className="md:col-span-4"
              type="number"
              value={line.cost || ''}
              placeholder="Monthly cost"
              onChange={(e) => updateCost(line.id, 'cost', e.target.value)}
            />
            <div className="md:col-span-2 flex items-center justify-end">
              <Button variant="ghost" size="sm" onClick={() => removeCost(line.id)} className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addCost}>
          + Add cost line
        </Button>
      </section>

      <div className="grid gap-3 md:grid-cols-4 text-sm text-ink">
        <SummaryCard label="Monthly revenue" value={totals.revenue} />
        <SummaryCard label="Monthly costs" value={totals.cost} />
        <SummaryCard label="Net profit" value={totals.net} />
        <SummaryCard label="Net margin" value={Number.isFinite(totals.margin) ? `${totals.margin}%` : '—'} />
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-border bg-background/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-mute">{label}</p>
      <p className="mt-2 text-xl font-bold text-ink">
        {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
      </p>
    </div>
  );
}

function BreakEvenAnalyzer() {
  const [fixedCosts, setFixedCosts] = useState('');
  const [price, setPrice] = useState('');
  const [variableCost, setVariableCost] = useState('');
  const [cash, setCash] = useState('');

  const fixed = Number.parseFloat(fixedCosts) || 0;
  const priceValue = Number.parseFloat(price) || 0;
  const variable = Number.parseFloat(variableCost) || 0;
  const cashValue = Number.parseFloat(cash) || 0;

  const contributionMargin = priceValue === 0 ? 0 : (priceValue - variable) / priceValue;
  const breakEvenUnits = contributionMargin === 0 ? 0 : Math.ceil(fixed / (priceValue - variable));
  const breakEvenRevenue = breakEvenUnits * priceValue;
  const runwayMonths = fixed === 0 ? 0 : Math.floor(cashValue / fixed);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <Input value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} placeholder="Monthly fixed costs ($)" />
        <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Average sale price ($)" />
        <Input value={variableCost} onChange={(e) => setVariableCost(e.target.value)} placeholder="Variable cost per sale ($)" />
        <Input value={cash} onChange={(e) => setCash(e.target.value)} placeholder="Cash on hand ($)" />
      </div>
      <div className="rounded-xl border border-ink/30 bg-ink/5 p-4 text-sm text-ink">
        <p>Contribution margin: {(contributionMargin * 100).toFixed(0)}%</p>
        <p>Break-even units: {breakEvenUnits || '—'}</p>
        <p>Break-even revenue: ${breakEvenRevenue.toLocaleString()}</p>
        <p>Cash runway (months): {runwayMonths || '—'}</p>
      </div>
    </div>
  );
}

