import { prisma } from '@/lib/db';

export async function getOrCreateBootcampEnrollment(userId: string) {
  return prisma.bootcampEnrollment.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      weekProgress: {
        create: {
          weekNumber: 1,
        },
      },
    },
    include: {
      weekProgress: true,
      reflections: true,
      businessCanvas: true,
    },
  });
}

export function extractCompletedWeeks(weekProgress: { weekNumber: number; completedAt: Date | null }[]) {
  return weekProgress.filter((week) => week.completedAt).map((week) => week.weekNumber);
}

export function sumTimeSpent(weekProgress: { timeSpent: number | null | undefined }[]) {
  return weekProgress.reduce((acc, week) => acc + (week.timeSpent ?? 0), 0);
}

