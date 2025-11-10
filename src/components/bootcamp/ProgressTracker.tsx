'use client';

import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';

type ProgressTrackerProps = {
  totalWeeks: number;
  currentWeek: number;
  completedWeeks: number;
  timeSpentMinutes?: number;
};

const formatMinutes = (minutes: number | undefined) => {
  if (!minutes) return '0h 0m';
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours}h ${remaining}m`;
};

export function ProgressTracker({
  totalWeeks,
  currentWeek,
  completedWeeks,
  timeSpentMinutes,
}: ProgressTrackerProps) {
  const { progressPercent, remainingWeeks } = useMemo(() => {
    const percent = Math.max(
      0,
      Math.min(100, Math.round((completedWeeks / totalWeeks) * 100)),
    );
    const remaining = Math.max(totalWeeks - completedWeeks, 0);
    return {
      progressPercent: percent,
      remainingWeeks: remaining,
    };
  }, [completedWeeks, totalWeeks]);

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
      <div className="mb-4 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-mute sm:text-sm">
          Bootcamp Progress
        </p>
        <h2 className="text-xl font-bold text-ink sm:text-2xl">
          Week {currentWeek} of {totalWeeks}
        </h2>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-background/70 px-4 py-3">
          <span className="text-sm text-mute">Complete</span>
          <span className="text-lg font-bold text-ink">{progressPercent}%</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-background/70 px-4 py-3">
          <span className="text-sm text-mute">Remaining</span>
          <span className="text-lg font-bold text-ink">{remainingWeeks} weeks</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-background/70 px-4 py-3">
          <span className="text-sm text-mute">Time Logged</span>
          <span className="text-lg font-bold text-ink">{formatMinutes(timeSpentMinutes)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[0.7rem] text-mute sm:text-xs">
          <span>0%</span>
          <span>100%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>
    </div>
  );
}

