'use client';

import { Textarea } from '@/components/ui/textarea';

type CanvasFieldProps = {
  label: string;
  helper?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

export function CanvasField({ label, helper, placeholder, value, onChange, rows = 4 }: CanvasFieldProps) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-mute">{label}</label>
        {helper && <p className="text-xs text-mute">{helper}</p>}
      </div>
      <Textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

