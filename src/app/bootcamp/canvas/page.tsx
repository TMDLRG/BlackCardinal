import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { BootcampLayout } from '@/components/bootcamp/BootcampLayout';
import { BusinessCanvasBuilder } from '@/components/bootcamp/canvas/BusinessCanvasBuilder';
import {
  extractCompletedWeeks,
  getOrCreateBootcampEnrollment,
  sumTimeSpent,
} from '@/lib/bootcamp/enrollment';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Business Canvas | BlackCardinal',
  description: 'Assemble and export your BlackCardinal white-label business canvas.',
};

export default async function CanvasPage() {
  const cookieStore = await cookies();
  const isTestMode = cookieStore.get('test-auth')?.value === 'true';

  if (isTestMode) {
    return (
      <BootcampLayout currentWeek={10} completedWeeks={[]} hideStartButton activeWeek={10}>
        <CanvasHeader />
        <BusinessCanvasBuilder />
      </BootcampLayout>
    );
  }

  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/bootcamp/canvas');
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getOrCreateBootcampEnrollment(userId);

  if (enrollment.currentWeek < 10) {
    redirect('/bootcamp');
  }

  const completedWeeks = extractCompletedWeeks(enrollment.weekProgress);
  const timeSpent = sumTimeSpent(enrollment.weekProgress);

  return (
    <BootcampLayout
      currentWeek={enrollment.currentWeek}
      completedWeeks={completedWeeks}
      timeSpentMinutes={timeSpent}
      hideStartButton
      activeWeek={10}
    >
      <CanvasHeader />
      <BusinessCanvasBuilder />
    </BootcampLayout>
  );
}

function CanvasHeader() {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card/60 p-6">
      <h1 className="text-3xl font-semibold text-ink">Business Launch Kit Builder</h1>
      <p className="text-sm text-mute">
        Bring together everything you've built over 10 weeks: your purpose, revenue streams, Personal 5Ps, Professional 5Ps, AI templates, and launch plan. This becomes your complete business reference document. Auto-save is enabled, and you can export as JSON or print-ready PDF.
      </p>
      <Button asChild variant="outline" size="sm">
        <Link href="/bootcamp/week/10">Review Week 10 Capstone Lessons</Link>
      </Button>
    </section>
  );
}

