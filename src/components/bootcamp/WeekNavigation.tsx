import Link from 'next/link';
import { Button } from '@/components/ui/button';

type WeekNavigationProps = {
  currentWeek: number;
  totalWeeks: number;
  basePath?: string;
};

export function WeekNavigation({
  currentWeek,
  totalWeeks,
  basePath = '/bootcamp',
}: WeekNavigationProps) {
  const prevWeek = currentWeek > 1 ? currentWeek - 1 : null;
  const nextWeek = currentWeek < totalWeeks ? currentWeek + 1 : null;

  const buildHref = (week: number) =>
    week === 1 ? `${basePath}/week/1` : `${basePath}/week/${week}`;

  return (
    <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-mute">
        Week {currentWeek} of {totalWeeks}
      </div>
      <div className="flex items-center gap-3">
        <Button asChild size="sm" variant="outline" disabled={!prevWeek}>
          <Link href={prevWeek ? buildHref(prevWeek) : '#'} aria-disabled={!prevWeek}>
            ← Previous
          </Link>
        </Button>
        <Button asChild size="sm" variant="default" disabled={!nextWeek}>
          <Link href={nextWeek ? buildHref(nextWeek) : '#'} aria-disabled={!nextWeek}>
            Next →
          </Link>
        </Button>
      </div>
    </nav>
  );
}

