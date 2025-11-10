import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BootcampLayout } from '@/components/bootcamp/BootcampLayout';
import { BOOTCAMP_WEEKS } from '@/lib/bootcamp/weeks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import {
  extractCompletedWeeks,
  getOrCreateBootcampEnrollment,
  sumTimeSpent,
} from '@/lib/bootcamp/enrollment';
import { ensureTestBootcampEnrollment, ensureTestUser, TEST_USER_ID } from '@/lib/test-mode';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bootcamp | BlackCardinal',
  description: '10-week ORCHESTRATE + 5Ps bootcamp for Founding 50 entrepreneurs.',
};

export default async function BootcampPage() {
  const cookieStore = await cookies();
  const isTestMode = cookieStore.get('test-auth')?.value === 'true';

  if (isTestMode) {
    await ensureTestUser();
    await ensureTestBootcampEnrollment();
    const enrollment = await getOrCreateBootcampEnrollment(TEST_USER_ID);
    const completedWeeks = extractCompletedWeeks(enrollment.weekProgress);
    const timeSpent = sumTimeSpent(enrollment.weekProgress);

    return (
      <BootcampLayout currentWeek={enrollment.currentWeek} completedWeeks={completedWeeks} timeSpentMinutes={timeSpent}>
        <TestModeHero />
        <WelcomeContent currentWeek={enrollment.currentWeek} />
        <NextActions currentWeek={enrollment.currentWeek} />
      </BootcampLayout>
    );
  }

  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/bootcamp');
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getOrCreateBootcampEnrollment(userId);

  const completedWeeks = extractCompletedWeeks(enrollment.weekProgress);
  const timeSpent = sumTimeSpent(enrollment.weekProgress);

  return (
    <BootcampLayout
      currentWeek={enrollment.currentWeek}
      completedWeeks={completedWeeks}
      timeSpentMinutes={timeSpent}
    >
      <WelcomeContent currentWeek={enrollment.currentWeek} />
      <NextActions currentWeek={enrollment.currentWeek} />
    </BootcampLayout>
  );
}

function TestModeHero() {
  return (
    <div className="rounded-2xl border-2 border-ember bg-ember/10 p-6">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 h-6 w-6 text-ember" />
        <div>
          <h2 className="text-lg font-semibold text-ember">Test Mode Active</h2>
          <p className="text-sm text-ember/80">
            You are exploring the bootcamp in sandbox mode. Progress and data persist to the database for verification.
          </p>
        </div>
      </div>
    </div>
  );
}

function WelcomeContent({ currentWeek }: { currentWeek: number }) {
  const current = BOOTCAMP_WEEKS.find((week) => week.number === currentWeek) ?? BOOTCAMP_WEEKS[0];
  return (
    <section className="w-full space-y-6 rounded-2xl border border-border bg-card/50 p-4 sm:p-6 lg:p-8">
      <div className="w-full space-y-2 sm:space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-mute sm:text-sm">Founding 50 Bootcamp</p>
        <h1 className="text-xl font-bold text-ink sm:text-3xl">
          Build & Launch Your Black Cardinal Franchise
        </h1>
        <p className="text-sm text-mute sm:text-base">
          Over 10 weeks you'll learn everything needed to launch a successful Black Cardinal franchise: the brand story, Personal 5Ps for individual success, Professional 5Ps for business operations, AI tools for marketing and sales, and a complete launch plan with financial projections.
        </p>
      </div>

      <div className="w-full rounded-xl border border-border bg-background/80 p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-mute sm:text-sm">Up Next</p>
        <h2 className="mt-2 text-lg font-bold text-ink sm:text-2xl">
          Week {current.number}: {current.title}
        </h2>
        <p className="mt-2 text-sm text-mute sm:text-base">{current.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {current.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-ink/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <Button asChild size="lg" className="w-full">
            <Link href={`/bootcamp/week/${current.number}`}>Go to Week {current.number}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/bootcamp/canvas">View Business Canvas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function NextActions({ currentWeek }: { currentWeek: number }) {
  const remainingWeeks = BOOTCAMP_WEEKS.filter((week) => week.number > currentWeek).slice(0, 3);

  return (
    <section className="w-full space-y-4 rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
      <h2 className="text-base font-semibold text-ink sm:text-xl">Upcoming Milestones</h2>
      <div className="grid w-full gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {remainingWeeks.map((week) => (
          <div key={week.number} className="flex w-full flex-col gap-2 rounded-xl border border-border bg-background/80 p-4 shadow-sm sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-mute">
              Week {week.number}
            </p>
            <h3 className="text-sm font-semibold leading-tight text-ink sm:text-base">
              {week.title}
            </h3>
            <p className="text-sm text-mute line-clamp-3 sm:line-clamp-none">
              {week.summary}
            </p>
          </div>
        ))}
        {remainingWeeks.length === 0 && (
          <div className="flex w-full flex-col gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900 shadow-sm">
            <h3 className="text-sm font-semibold sm:text-base">Capstone Week</h3>
            <p className="text-sm sm:text-base">You're on the final stretch. Assemble your business canvas and prepare your launch plan.</p>
          </div>
        )}
      </div>
    </section>
  );
}