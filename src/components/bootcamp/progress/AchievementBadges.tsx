'use client';

import { Achievement } from './ProgressDashboard';
import { cn } from '@/lib/utils';

export function AchievementBadges({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className={cn(
            'rounded-2xl border p-4 transition',
            achievement.earned ? 'border-emerald-400 bg-emerald-50 text-emerald-900' : 'border-border bg-background/70',
          )}
        >
          <h3 className="text-sm font-semibold">{achievement.title}</h3>
          <p className="mt-2 text-xs text-mute">{achievement.description}</p>
          <p className={cn('mt-3 text-xs font-semibold uppercase tracking-wide', achievement.earned ? 'text-emerald-700' : 'text-mute')}>
            {achievement.earned ? 'Unlocked' : 'In progress'}
          </p>
        </div>
      ))}
    </div>
  );
}

