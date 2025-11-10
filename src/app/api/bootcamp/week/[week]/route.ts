import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import {
  ensureTestBootcampEnrollment,
  ensureTestUser,
  TEST_USER_ID,
} from '@/lib/test-mode';

type RouteContext = {
  params: { week: string };
};

function parseWeek(params: RouteContext['params']) {
  const weekNumber = Number.parseInt(params.week, 10);
  if (Number.isNaN(weekNumber) || weekNumber < 1 || weekNumber > 10) {
    throw new Error('Invalid week number');
  }
  return weekNumber;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';
  const weekNumber = parseWeek(context.params);

  if (isTestMode) {
    await ensureTestUser();
    await ensureTestBootcampEnrollment();

    const enrollment = await prisma.bootcampEnrollment.findUnique({
      where: { userId: TEST_USER_ID },
      include: {
        weekProgress: {
          where: { weekNumber },
        },
      },
    });

    const weekProgress = enrollment?.weekProgress[0] ?? null;

    return NextResponse.json({ weekProgress });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;

  const enrollment = await prisma.bootcampEnrollment.findUnique({
    where: { userId },
    include: {
      weekProgress: {
        where: { weekNumber },
      },
    },
  });

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  const weekProgress = enrollment.weekProgress[0] ?? null;

  return NextResponse.json({ weekProgress });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';
  const weekNumber = parseWeek(context.params);

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();

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

    return NextResponse.json({ weekProgress });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;

  const enrollment = await prisma.bootcampEnrollment.findUnique({
    where: { userId },
  });

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
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

  return NextResponse.json({ weekProgress });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';
  const weekNumber = parseWeek(context.params);

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();
    const body = await request.json();
    const { lessonProgress, exercisesComplete, timeSpent, completedAt } = body ?? {};

    const updated = await prisma.weekProgress.upsert({
      where: {
        enrollmentId_weekNumber: {
          enrollmentId: enrollment.id,
          weekNumber,
        },
      },
      update: {
        lessonProgress: lessonProgress ?? undefined,
        exercisesComplete: exercisesComplete ?? undefined,
        timeSpent: typeof timeSpent === 'number' ? timeSpent : undefined,
        completedAt: completedAt === null ? null : completedAt ? new Date(completedAt) : undefined,
      },
      create: {
        enrollmentId: enrollment.id,
        weekNumber,
        lessonProgress: lessonProgress ?? {},
        exercisesComplete: exercisesComplete ?? {},
        timeSpent: typeof timeSpent === 'number' ? timeSpent : 0,
        completedAt: completedAt ? new Date(completedAt) : undefined,
      },
    });

    await prisma.bootcampEnrollment.update({
      where: { id: enrollment.id },
      data: {
        lastAccessedAt: new Date(),
      },
    });

    return NextResponse.json({ weekProgress: updated });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  const body = await request.json();

  const enrollment = await prisma.bootcampEnrollment.findUnique({
    where: { userId },
  });

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  const { lessonProgress, exercisesComplete, timeSpent, completedAt } = body ?? {};

  const updated = await prisma.weekProgress.upsert({
    where: {
      enrollmentId_weekNumber: {
        enrollmentId: enrollment.id,
        weekNumber,
      },
    },
    update: {
      lessonProgress: lessonProgress ?? undefined,
      exercisesComplete: exercisesComplete ?? undefined,
      timeSpent: typeof timeSpent === 'number' ? timeSpent : undefined,
      completedAt: completedAt === null ? null : completedAt ? new Date(completedAt) : undefined,
    },
    create: {
      enrollmentId: enrollment.id,
      weekNumber,
      lessonProgress: lessonProgress ?? {},
      exercisesComplete: exercisesComplete ?? {},
      timeSpent: typeof timeSpent === 'number' ? timeSpent : 0,
      completedAt: completedAt ? new Date(completedAt) : undefined,
    },
  });

  return NextResponse.json({ weekProgress: updated });
}

