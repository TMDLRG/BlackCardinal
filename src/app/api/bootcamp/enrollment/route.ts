import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  ensureTestBootcampEnrollment,
  ensureTestUser,
  TEST_USER_ID,
} from '@/lib/test-mode';

function createUnauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

async function fetchTestEnrollment() {
  await ensureTestUser();
  const enrollment = await prisma.bootcampEnrollment.findUnique({
    where: { userId: TEST_USER_ID },
    include: {
      weekProgress: true,
      reflections: true,
      businessCanvas: true,
    },
  });

  if (enrollment) {
    return enrollment;
  }

  return ensureTestBootcampEnrollment();
}

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';

  if (isTestMode) {
    const enrollment = await fetchTestEnrollment();
    return NextResponse.json({ enrollment });
  }

  const session = await auth();

  if (!session?.user) {
    return createUnauthorizedResponse();
  }

  const userId = (session.user as any).id as string;

  const enrollment = await prisma.bootcampEnrollment.findUnique({
    where: { userId },
    include: {
      weekProgress: true,
      reflections: true,
      businessCanvas: true,
    },
  });

  return NextResponse.json({ enrollment });
}

export async function POST(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';

  if (isTestMode) {
    const enrollment = await fetchTestEnrollment();
    return NextResponse.json({ enrollment });
  }

  const session = await auth();

  if (!session?.user) {
    return createUnauthorizedResponse();
  }

  const userId = (session.user as any).id as string;

  const existing = await prisma.bootcampEnrollment.findUnique({
    where: { userId },
    include: {
      weekProgress: true,
      reflections: true,
      businessCanvas: true,
    },
  });

  if (existing) {
    return NextResponse.json({ enrollment: existing });
  }

  const enrollment = await prisma.bootcampEnrollment.create({
    data: {
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

  return NextResponse.json({ enrollment });
}

export async function PATCH(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';

  if (isTestMode) {
    const body = await request.json();
    const { currentWeek, completed, completedAt } = body ?? {};
    const enrollment = await prisma.bootcampEnrollment.update({
      where: { userId: TEST_USER_ID },
      data: {
        currentWeek: typeof currentWeek === 'number' ? currentWeek : undefined,
        completed: typeof completed === 'boolean' ? completed : undefined,
        completedAt: completed ? completedAt ?? new Date() : completed === false ? null : undefined,
        lastAccessedAt: new Date(),
      },
      include: {
        weekProgress: true,
        reflections: true,
        businessCanvas: true,
      },
    });

    return NextResponse.json({ enrollment });
  }

  const session = await auth();

  if (!session?.user) {
    return createUnauthorizedResponse();
  }

  const userId = (session.user as any).id as string;

  const body = await request.json();
  const { currentWeek, completed, completedAt } = body ?? {};

  const enrollment = await prisma.bootcampEnrollment.update({
    where: { userId },
    data: {
      currentWeek: typeof currentWeek === 'number' ? currentWeek : undefined,
      completed: typeof completed === 'boolean' ? completed : undefined,
      completedAt: completed ? completedAt ?? new Date() : completed === false ? null : undefined,
      lastAccessedAt: new Date(),
    },
    include: {
      weekProgress: true,
      reflections: true,
      businessCanvas: true,
    },
  });

  return NextResponse.json({ enrollment });
}

