import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { BootcampLayout } from '@/components/bootcamp/BootcampLayout';
import { WeekNavigation } from '@/components/bootcamp/WeekNavigation';
import { WeekModule } from '@/components/bootcamp/week/WeekModule';
import { BOOTCAMP_WEEK_CONTENT } from '@/lib/bootcamp/content';
import { BOOTCAMP_WEEKS } from '@/lib/bootcamp/weeks';
import {
  extractCompletedWeeks,
  getOrCreateBootcampEnrollment,
  sumTimeSpent,
} from '@/lib/bootcamp/enrollment';
import { prisma } from '@/lib/db';
import { ensureTestUser, TEST_USER_ID } from '@/lib/test-mode';

type PageProps = {
  params: Promise<{ week: string }>;
};

const TOTAL_WEEKS = BOOTCAMP_WEEKS.length;

function parseWeekNumber(param: string) {
  const week = Number.parseInt(param, 10);
  if (Number.isNaN(week) || week < 1 || week > TOTAL_WEEKS) {
    return null;
  }
  return week;
}

export default async function BootcampWeekPage({ params }: PageProps) {
  const { week } = await params;
  const weekNumber = parseWeekNumber(week);
  if (!weekNumber) {
    notFound();
  }

  const content = BOOTCAMP_WEEK_CONTENT[weekNumber];
  if (!content) {
    notFound();
  }

  const cookieStore = await cookies();
  const isTestMode = cookieStore.get('test-auth')?.value === 'true';

  if (isTestMode) {
    await ensureTestUser();
    const userId = TEST_USER_ID;
    const enrollment = await getOrCreateBootcampEnrollment(userId);

    if (weekNumber > enrollment.currentWeek) {
      redirect('/bootcamp');
    }

    const weekProgress = await prisma.weekProgress.upsert({
      where: {
        enrollmentId_weekNumber: {
          enrollmentId: enrollment.id,
          weekNumber,
        },
      },
      update: {},
      create: {
        enrollmentId: enrollment.id,
        weekNumber,
      },
    });

    const reflection = await prisma.reflection.findUnique({
      where: {
        enrollmentId_weekNumber: {
          enrollmentId: enrollment.id,
          weekNumber,
        },
      },
    });

    const completedWeeks = extractCompletedWeeks(enrollment.weekProgress);
    const timeSpent = sumTimeSpent(enrollment.weekProgress);

    const lessonProgress =
      (weekProgress.lessonProgress as Record<string, boolean> | null | undefined) ?? {};
    const exercisesComplete =
      (weekProgress.exercisesComplete as Record<string, { response: string; completedAt?: string }> | null | undefined) ??
      {};

    return (
      <BootcampLayout
        currentWeek={enrollment.currentWeek}
        completedWeeks={completedWeeks}
        timeSpentMinutes={timeSpent}
        hideStartButton
        activeWeek={weekNumber}
      >
        <WeekHeader weekNumber={weekNumber} objective={content.objective} />
        <WeekModule
          weekNumber={weekNumber}
          totalWeeks={TOTAL_WEEKS}
          lessons={content.lessons}
          exercises={content.exercises}
          reflection={content.reflection}
          initialLessonProgress={lessonProgress}
          initialExercises={exercisesComplete}
          initialReflection={reflection?.content ?? undefined}
          initialWeekCompleted={Boolean(weekProgress.completedAt)}
        />
        <WeekNavigation currentWeek={weekNumber} totalWeeks={TOTAL_WEEKS} basePath="/bootcamp" />
      </BootcampLayout>
    );
  }

  const session = await auth();
  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/bootcamp/week/${weekNumber}`);
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getOrCreateBootcampEnrollment(userId);

  if (weekNumber > enrollment.currentWeek) {
    redirect('/bootcamp');
  }

  const weekProgress = await prisma.weekProgress.upsert({
    where: {
      enrollmentId_weekNumber: {
        enrollmentId: enrollment.id,
        weekNumber,
      },
    },
    update: {},
    create: {
      enrollmentId: enrollment.id,
      weekNumber,
    },
  });

  const reflection = await prisma.reflection.findUnique({
    where: {
      enrollmentId_weekNumber: {
        enrollmentId: enrollment.id,
        weekNumber,
      },
    },
  });

  const completedWeeks = extractCompletedWeeks(enrollment.weekProgress);
  const timeSpent = sumTimeSpent(enrollment.weekProgress);

  const lessonProgress =
    (weekProgress.lessonProgress as Record<string, boolean> | null | undefined) ?? {};
  const exercisesComplete =
    (weekProgress.exercisesComplete as Record<string, { response: string; completedAt?: string }> | null | undefined) ??
    {};

  return (
    <BootcampLayout
      currentWeek={enrollment.currentWeek}
      completedWeeks={completedWeeks}
      timeSpentMinutes={timeSpent}
      hideStartButton
      activeWeek={weekNumber}
    >
      <WeekHeader weekNumber={weekNumber} objective={content.objective} />
      <WeekModule
        weekNumber={weekNumber}
        totalWeeks={TOTAL_WEEKS}
        lessons={content.lessons}
        exercises={content.exercises}
        reflection={content.reflection}
        initialLessonProgress={lessonProgress}
        initialExercises={exercisesComplete}
        initialReflection={reflection?.content ?? undefined}
        initialWeekCompleted={Boolean(weekProgress.completedAt)}
        testMode={false}
      />
      <WeekNavigation currentWeek={weekNumber} totalWeeks={TOTAL_WEEKS} basePath="/bootcamp" />
    </BootcampLayout>
  );
}

function WeekHeader({ weekNumber, objective }: { weekNumber: number; objective: string }) {
  return (
    <header className="rounded-2xl border border-border bg-background/80 p-6 backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-wide text-mute">Week {weekNumber}</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        {BOOTCAMP_WEEKS[weekNumber - 1]?.title ?? `Bootcamp Week ${weekNumber}`}
      </h1>
      <p className="mt-3 text-base text-mute">{objective}</p>
      <div className="mt-4 text-xs text-mute">
        <span>
          Reading: {BOOTCAMP_WEEK_CONTENT[weekNumber]?.readingTimeMinutes ?? 0} min · Exercises:{' '}
          {BOOTCAMP_WEEK_CONTENT[weekNumber]?.estimatedWorkMinutes ?? 0} min
        </span>
      </div>
    </header>
  );
}


