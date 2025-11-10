'use client';

import { useState } from 'react';
import { ProgressChart } from './ProgressChart';
import { AchievementBadges } from './AchievementBadges';
import { Button } from '@/components/ui/button';

export type ProgressMetrics = {
  totalWeeks: number;
  completedWeeks: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  exercisesCompleted: number;
  exercisesTotal: number;
  reflectionsCompleted: number;
  reflectionsTotal: number;
  timeSpentMinutes: number;
  notificationsEnabled: boolean;
  notificationSuggestions: string[];
};

export type WeekStatus = {
  weekNumber: number;
  status: 'completed' | 'in-progress' | 'locked';
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
};

type ProgressDashboardProps = {
  metrics: ProgressMetrics;
  weekStatus: WeekStatus[];
  achievements: Achievement[];
};

export function ProgressDashboard({ metrics, weekStatus, achievements }: ProgressDashboardProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(metrics.notificationsEnabled);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const completionPercent = Math.round((metrics.completedWeeks / metrics.totalWeeks) * 100);

  const toggleNotifications = async () => {
    try {
      const res = await fetch('/api/bootcamp/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !notificationsEnabled }),
      });
      if (!res.ok) throw new Error('Failed to update notifications');
      const json = await res.json();
      setNotificationsEnabled(json.enabled);
      setNotificationMessage(json.enabled ? 'Reminders enabled.' : 'Reminders disabled.');
      setTimeout(() => setNotificationMessage(null), 2500);
    } catch (error: any) {
      setNotificationMessage('Unable to update notifications. Try again later.');
      setTimeout(() => setNotificationMessage(null), 3500);
    }
  };

  const timeSummary = `${Math.floor(metrics.timeSpentMinutes / 60)}h ${metrics.timeSpentMinutes % 60}m`;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto space-y-8 px-4 py-10">
        <section className="rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-mute">Bootcamp Progress</p>
              <h1 className="text-3xl font-semibold text-ink">
                {completionPercent}% complete ({metrics.completedWeeks}/{metrics.totalWeeks} weeks)
              </h1>
              <p className="text-sm text-mute">Total focused time: {timeSummary}</p>
            </div>
            <div className="space-y-2 text-right">
              <Button size="sm" variant="outline" onClick={toggleNotifications}>
                {notificationsEnabled ? 'Disable Reminders' : 'Enable Reminders'}
              </Button>
              {notificationMessage && <p className="text-xs text-mute">{notificationMessage}</p>}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <ProgressCard
            label="Lessons Complete"
            value={`${metrics.lessonsCompleted}/${metrics.lessonsTotal}`}
            helper="Tap a lesson in the week modules to mark finished."
          />
          <ProgressCard
            label="Exercises Submitted"
            value={`${metrics.exercisesCompleted}/${metrics.exercisesTotal}`}
            helper="Exercises auto-save as you work."
          />
          <ProgressCard
            label="Reflections Logged"
            value={`${metrics.reflectionsCompleted}/${metrics.reflectionsTotal}`}
            helper="Reflections unlock insight and week completion."
          />
        </section>

        <section className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink">Week Timeline</h2>
          <ProgressChart data={weekStatus} />
        </section>

        <section className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink">Achievement Badges</h2>
          <AchievementBadges achievements={achievements} />
        </section>

        <section className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink">Suggested Next Actions</h2>
          <ul className="space-y-2 text-sm text-ink">
            {metrics.notificationSuggestions.map((suggestion) => (
              <li key={suggestion} className="rounded-lg border border-border bg-background/70 p-3">
                {suggestion}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function ProgressCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <article className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-mute">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-xs text-mute">{helper}</p>
    </article>
  );
}

