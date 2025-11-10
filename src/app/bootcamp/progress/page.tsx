import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import {
  extractCompletedWeeks,
  getOrCreateBootcampEnrollment,
  sumTimeSpent,
} from '@/lib/bootcamp/enrollment';
import { BOOTCAMP_WEEK_CONTENT } from '@/lib/bootcamp/content';
import { ProgressDashboard, ProgressMetrics, WeekStatus, Achievement } from '@/components/bootcamp/progress/ProgressDashboard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Progress | BlackCardinal Bootcamp',
  description: 'Track your bootcamp progress, achievements, and next actions.',
};

const TOTAL_WEEKS = Object.keys(BOOTCAMP_WEEK_CONTENT).length;
const LESSONS_TOTAL = Object.values(BOOTCAMP_WEEK_CONTENT).reduce((sum, week) => sum + week.lessons.length, 0);
const EXERCISES_TOTAL = Object.values(BOOTCAMP_WEEK_CONTENT).reduce((sum, week) => sum + week.exercises.length, 0);
const REFLECTIONS_TOTAL = TOTAL_WEEKS;

export default async function ProgressPage() {
  const cookieStore = await cookies();
  const isTestMode = cookieStore.get('test-auth')?.value === 'true';

  if (isTestMode) {
    const mockMetrics: ProgressMetrics = {
      totalWeeks: TOTAL_WEEKS,
      completedWeeks: 3,
      lessonsCompleted: 18,
      lessonsTotal: LESSONS_TOTAL,
      exercisesCompleted: 9,
      exercisesTotal: EXERCISES_TOTAL,
      reflectionsCompleted: 3,
      reflectionsTotal: REFLECTIONS_TOTAL,
      timeSpentMinutes: 420,
      notificationsEnabled: true,
      notificationSuggestions: [
        'Week 4 unlocks on Monday. Reserve 90 minutes to run the Purpose Lab.',
        'Download the test canvas and share with the team for review.',
      ],
    };

    const mockWeekStatus: WeekStatus[] = Array.from({ length: TOTAL_WEEKS }).map((_, index) => {
      if (index < 3) return { weekNumber: index + 1, status: 'completed' };
      if (index === 3) return { weekNumber: index + 1, status: 'in-progress' };
      return { weekNumber: index + 1, status: 'locked' };
    });

    const mockAchievements: Achievement[] = [
      { id: 'enrolled', title: 'Enrolled Founder', description: 'Completed orientation and joined bootcamp.', earned: true },
      { id: 'week1', title: 'Week 1 Complete', description: 'Mastered Outcome, Role, Context foundations.', earned: true },
      { id: 'halfway', title: 'Halfway There', description: 'Completed 5 of 10 weeks.', earned: false },
      { id: 'canvas-ready', title: 'Canvas Ready', description: 'Published your business canvas.', earned: false },
    ];

    return <ProgressDashboard metrics={mockMetrics} weekStatus={mockWeekStatus} achievements={mockAchievements} />;
  }

  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/bootcamp/progress');
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getOrCreateBootcampEnrollment(userId);

  const completedWeeks = extractCompletedWeeks(enrollment.weekProgress);
  const lessonsCompleted = enrollment.weekProgress.reduce((sum, week) => {
    const lessonProgress = (week.lessonProgress as Record<string, boolean> | null) ?? {};
    const completed = Object.values(lessonProgress).filter(Boolean).length;
    return sum + completed;
  }, 0);

  const exercisesCompleted = enrollment.weekProgress.reduce((sum, week) => {
    const exercises = (week.exercisesComplete as Record<string, { response: string }> | null) ?? {};
    const completed = Object.values(exercises).filter((entry) => entry.response?.trim().length).length;
    return sum + completed;
  }, 0);

  const reflectionsCompleted = enrollment.reflections.length;
  const timeSpentMinutes = sumTimeSpent(enrollment.weekProgress);

  const weekStatus: WeekStatus[] = Array.from({ length: TOTAL_WEEKS }).map((_, index) => {
    const weekNumber = index + 1;
    const progress = enrollment.weekProgress.find((entry) => entry.weekNumber === weekNumber);
    if (progress?.completedAt) return { weekNumber, status: 'completed' };
    if (weekNumber === enrollment.currentWeek) return { weekNumber, status: 'in-progress' };
    if (weekNumber < enrollment.currentWeek) return { weekNumber, status: 'in-progress' };
    return { weekNumber, status: 'locked' };
  });

  const metrics: ProgressMetrics = {
    totalWeeks: TOTAL_WEEKS,
    completedWeeks: completedWeeks.length,
    lessonsCompleted,
    lessonsTotal: LESSONS_TOTAL,
    exercisesCompleted,
    exercisesTotal: EXERCISES_TOTAL,
    reflectionsCompleted,
    reflectionsTotal: REFLECTIONS_TOTAL,
    timeSpentMinutes,
    notificationsEnabled: enrollment.notificationsEnabled,
    notificationSuggestions: buildNotificationSuggestions(enrollment.weekProgress, completedWeeks),
  };

  const achievements = buildAchievements(enrollment, metrics);

  return <ProgressDashboard metrics={metrics} weekStatus={weekStatus} achievements={achievements} />;
}

function buildNotificationSuggestions(
  weekProgress: { weekNumber: number; completedAt: Date | null }[],
  completedWeeks: number[],
) {
  if (completedWeeks.length >= TOTAL_WEEKS) {
    return ['All weeks complete. Schedule a canvas hand-off review with HQ.', 'Share your launch date with the community.'];
  }
  const remaining = Array.from({ length: TOTAL_WEEKS })
    .map((_, idx) => idx + 1)
    .filter((week) => !weekProgress.some((progress) => progress.weekNumber === week && progress.completedAt));

  return [
    `Week ${remaining[0]} is up next. Reserve 60-90 minutes to complete the lessons and exercises.`,
    'Update your reflection as soon as you finish the exercises to lock in the learning.',
  ];
}

function buildAchievements(
  enrollment: Awaited<ReturnType<typeof getOrCreateBootcampEnrollment>>,
  metrics: ProgressMetrics,
): Achievement[] {
  return [
    {
      id: 'enrolled',
      title: 'Enrolled Founder',
      description: 'Completed orientation and joined the bootcamp.',
      earned: Boolean(enrollment.startedAt),
    },
    {
      id: 'week1',
      title: 'Week 1 Complete',
      description: 'Mastered Outcome, Role, Context foundations.',
      earned: metrics.completedWeeks >= 1,
    },
    {
      id: 'halfway',
      title: 'Halfway Hero',
      description: 'Finished at least 5 weeks of the bootcamp.',
      earned: metrics.completedWeeks >= Math.ceil(TOTAL_WEEKS / 2),
    },
    {
      id: 'reflection-pro',
      title: 'Reflection Pro',
      description: 'Logged reflections for four consecutive weeks.',
      earned: metrics.reflectionsCompleted >= 4,
    },
    {
      id: 'canvas-ready',
      title: 'Canvas Ready',
      description: 'Published your business canvas.',
      earned: enrollment.businessCanvas !== null,
    },
    {
      id: 'finisher',
      title: 'Bootcamp Finisher',
      description: 'Completed all 10 weeks and capstone.',
      earned: metrics.completedWeeks >= TOTAL_WEEKS,
    },
  ];
}

