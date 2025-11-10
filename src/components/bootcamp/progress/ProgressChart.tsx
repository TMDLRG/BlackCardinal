'use client';

import { WeekStatus } from './ProgressDashboard';

const statusStyles: Record<WeekStatus['status'], string> = {
  completed: 'bg-emerald-500',
  'in-progress': 'bg-ember',
  locked: 'bg-border',
};

export function ProgressChart({ data }: { data: WeekStatus[] }) {
  return (
    <div className="grid gap-3">
      {data.map((week) => (
        <div key={week.weekNumber} className="flex items-center gap-3">
          <span className="w-16 text-xs font-semibold uppercase tracking-wide text-mute">Week {week.weekNumber}</span>
          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-oat/40">
            <div className={`absolute inset-y-0 left-0 ${statusStyles[week.status]}`} style={{ width: progressWidth(week.status) }} />
          </div>
          <span className="w-24 text-right text-xs text-mute capitalize">{week.status.replace('-', ' ')}</span>
        </div>
      ))}
    </div>
  );
}

function progressWidth(status: WeekStatus['status']) {
  switch (status) {
    case 'completed':
      return '100%';
    case 'in-progress':
      return '50%';
    default:
      return '8%';
  }
}

