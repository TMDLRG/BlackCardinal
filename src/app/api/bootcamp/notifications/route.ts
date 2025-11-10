import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  ensureTestBootcampEnrollment,
  ensureTestUser,
  TEST_USER_ID,
} from '@/lib/test-mode';

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';
  let userId: string;

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();
    userId = enrollment.userId;
  } else {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    userId = (session.user as any).id as string;
  }

  const enrollment = await prisma.bootcampEnrollment.findUnique({
    where: { userId },
    include: { weekProgress: true },
  });

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  const pendingWeeks = Array.from({ length: 10 })
    .map((_, idx) => idx + 1)
    .filter((week) => !enrollment.weekProgress.some((progress) => progress.weekNumber === week && progress.completedAt));

  const suggestions =
    pendingWeeks.length === 0
      ? ['All weeks are complete. Use the canvas builder to finalize assets.']
      : [
          `Week ${pendingWeeks[0]} is next. Block time this week to continue momentum.`,
          'Set a reminder to complete your reflection after finishing the exercises.',
        ];

  return NextResponse.json({
    enabled: enrollment.notificationsEnabled,
    suggestions,
  });
}

export async function PATCH(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';
  let userId: string;

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();
    userId = enrollment.userId;
  } else {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    userId = (session.user as any).id as string;
  }
  const body = await request.json();
  const enabled = typeof body?.enabled === 'boolean' ? body.enabled : true;

  const enrollment = await prisma.bootcampEnrollment.update({
    where: { userId },
    data: { notificationsEnabled: enabled },
    select: { notificationsEnabled: true },
  });

  return NextResponse.json({ enabled: enrollment.notificationsEnabled });
}

