import Link from 'next/link';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { ReactNode } from 'react';
import { ProgressTracker } from './ProgressTracker';
import { BOOTCAMP_WEEKS, BootcampWeekMeta } from '@/lib/bootcamp/weeks';
import { Button } from '@/components/ui/button';

export type BootcampLayoutProps = {
  currentWeek: number;
  completedWeeks: number[];
  timeSpentMinutes?: number;
  children: ReactNode;
  weeks?: BootcampWeekMeta[];
  hideStartButton?: boolean;
  activeWeek?: number;
};

const defaultWeeks = BOOTCAMP_WEEKS;

export function BootcampLayout({
  currentWeek,
  completedWeeks,
  timeSpentMinutes,
  children,
  weeks = defaultWeeks,
  hideStartButton = false,
  activeWeek,
}: BootcampLayoutProps) {
  const completedSet = new Set(completedWeeks);
  const highlightedWeek = activeWeek ?? currentWeek;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid w-full gap-y-6 [column-gap:1.5rem] lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start lg:gap-y-8 lg:[column-gap:2.5rem]">
          <aside className="w-full space-y-6 lg:sticky lg:top-6 lg:w-64 lg:shrink-0 lg:self-start">
            <ProgressTracker
              totalWeeks={weeks.length}
              currentWeek={currentWeek}
              completedWeeks={completedWeeks.length}
              timeSpentMinutes={timeSpentMinutes}
            />

            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-mute">
                Bootcamp Roadmap
              </p>
              <ul className="space-y-4">
              {weeks.map((week) => {
                const isCompleted = completedSet.has(week.number);
                const isCurrent = highlightedWeek === week.number;
                const isLocked = week.number > currentWeek;
                const statusIcon = isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : isCurrent ? (
                  <Circle className="h-5 w-5 text-ink" />
                ) : (
                  <Lock className="h-5 w-5 text-mute" />
                );

                const weekHref = `/bootcamp/week/${week.number}`;

                return (
                  <li
                    key={week.number}
                    className={`rounded-xl border p-4 transition-colors shadow-sm sm:p-5 ${
                      isCurrent
                        ? 'border-ink bg-ink/5'
                        : isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-border bg-card/40'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">{statusIcon}</div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="text-[0.7rem] font-semibold text-mute sm:text-xs sm:uppercase sm:tracking-wide">
                          Week {week.number}
                        </p>
                        <h3 className="text-sm font-semibold leading-tight text-ink sm:text-base sm:leading-snug">
                          {week.title}
                        </h3>
                        <p className="text-sm text-mute line-clamp-3 sm:line-clamp-none">
                          {week.summary}
                        </p>
                        {!hideStartButton && (
                          <Button
                            asChild
                            size="sm"
                            className="w-full sm:w-auto"
                            variant={isCompleted ? 'outline' : isCurrent ? 'default' : 'secondary'}
                            disabled={isLocked}
                          >
                            <Link href={isLocked ? '#' : weekHref}>
                              {isCompleted ? 'Review' : isCurrent ? 'Continue' : 'Preview'}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
              </ul>
            </div>
          </aside>

          <section className="w-full min-w-0 space-y-6">{children}</section>
        </div>
      </main>
    </div>
  );
}

