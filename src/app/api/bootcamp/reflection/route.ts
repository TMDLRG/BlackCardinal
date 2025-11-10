import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  ensureTestBootcampEnrollment,
  ensureTestUser,
  TEST_USER_ID,
} from '@/lib/test-mode';

async function getEnrollment(userId: string) {
  return prisma.bootcampEnrollment.findUnique({
    where: { userId },
  });
}

function parseBodyWeek(body: any) {
  const weekNumber = Number.parseInt(body?.weekNumber, 10);
  if (Number.isNaN(weekNumber) || weekNumber < 1 || weekNumber > 10) {
    throw new Error('Invalid week number');
  }
  const content = (body?.content ?? '').toString().trim();
  if (!content) {
    throw new Error('Reflection content is required');
  }
  return { weekNumber, content };
}

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();
    const reflections = await prisma.reflection.findMany({
      where: { enrollmentId: enrollment.id },
      orderBy: { weekNumber: 'asc' },
    });
    return NextResponse.json({ reflections });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getEnrollment(userId);

  if (!enrollment) {
    return NextResponse.json({ reflections: [] });
  }

  const reflections = await prisma.reflection.findMany({
    where: { enrollmentId: enrollment.id },
    orderBy: { weekNumber: 'asc' },
  });

  return NextResponse.json({ reflections });
}

export async function POST(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();

    try {
      const { weekNumber, content } = parseBodyWeek(await request.json());

      const reflection = await prisma.reflection.upsert({
        where: {
          enrollmentId_weekNumber: {
            enrollmentId: enrollment.id,
            weekNumber,
          },
        },
        update: {
          content,
        },
        create: {
          enrollmentId: enrollment.id,
          weekNumber,
          content,
        },
      });

      return NextResponse.json({ reflection });
    } catch (error: any) {
      return NextResponse.json({ error: error.message ?? 'Invalid request' }, { status: 400 });
    }
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getEnrollment(userId);

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  try {
    const { weekNumber, content } = parseBodyWeek(await request.json());

    const reflection = await prisma.reflection.upsert({
      where: {
        enrollmentId_weekNumber: {
          enrollmentId: enrollment.id,
          weekNumber,
        },
      },
      update: {
        content,
      },
      create: {
        enrollmentId: enrollment.id,
        weekNumber,
        content,
      },
    });

    return NextResponse.json({ reflection });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';

  if (isTestMode) {
    await ensureTestUser();
    const enrollment = await ensureTestBootcampEnrollment();

    try {
      const { weekNumber, content } = parseBodyWeek(await request.json());

      const reflection = await prisma.reflection.update({
        where: {
          enrollmentId_weekNumber: {
            enrollmentId: enrollment.id,
            weekNumber,
          },
        },
        data: {
          content,
        },
      });

      return NextResponse.json({ reflection });
    } catch (error: any) {
      return NextResponse.json({ error: error.message ?? 'Invalid request' }, { status: 400 });
    }
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  const enrollment = await getEnrollment(userId);

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  try {
    const { weekNumber, content } = parseBodyWeek(await request.json());

    const reflection = await prisma.reflection.update({
      where: {
        enrollmentId_weekNumber: {
          enrollmentId: enrollment.id,
          weekNumber,
        },
      },
      data: {
        content,
      },
    });

    return NextResponse.json({ reflection });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? 'Invalid request' }, { status: 400 });
  }
}

