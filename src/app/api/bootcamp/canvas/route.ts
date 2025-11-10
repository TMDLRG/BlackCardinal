import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  ensureTestBootcampEnrollment,
  ensureTestUser,
  TEST_USER_ID,
} from '@/lib/test-mode';

type CanvasPayload = Partial<Record<
  | 'purpose'
  | 'product'
  | 'people'
  | 'process'
  | 'profit'
  | 'proper'
  | 'preparation'
  | 'prevents'
  | 'poor'
  | 'performance'
  | 'outcome'
  | 'role'
  | 'context'
  | 'brandName'
  | 'brandIdentity'
  | 'targetMarket'
  | 'uniqueValue'
  | 'canvasSummary'
  | 'launchTimeline'
  | 'marketingStrategy'
  | 'firstCustomerTarget'
  | 'successMetrics'
  | 'revenueShare'
  | 'supportLevel'
  | 'productionAccess'
  | 'launchCommitments'
  | 'supportRequests'
  | 'publishedAt',
  string | null
>>;

const requiredFields: Array<keyof CanvasPayload> = [
  'purpose',
  'product',
  'people',
  'process',
  'profit',
  'proper',
  'preparation',
  'prevents',
  'poor',
  'performance',
  'outcome',
  'role',
  'context',
  'brandName',
  'brandIdentity',
  'targetMarket',
  'uniqueValue',
  'canvasSummary',
  'launchTimeline',
  'marketingStrategy',
  'firstCustomerTarget',
  'successMetrics',
  'revenueShare',
  'supportLevel',
  'productionAccess',
  'launchCommitments',
'supportRequests',
];

async function getEnrollment(userId: string) {
  return prisma.bootcampEnrollment.findUnique({
    where: { userId },
    include: {
      businessCanvas: true,
    },
  });
}

function sanitizePayload(payload: CanvasPayload, allowPartial = false) {
  if (!allowPartial) {
    for (const field of requiredFields) {
      if (typeof payload[field] === 'undefined') {
        payload[field] = '';
      }
    }
  }
  const clean: Record<string, string | null | Date | undefined> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    if (key === 'publishedAt') {
      clean[key] = value ? new Date(value) : null;
      continue;
    }
    clean[key] = value ?? '';
  }
  return clean;
}

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const isTestMode = cookies.get('test-auth')?.value === 'true';
  let userId: string;

  if (isTestMode) {
    await ensureTestUser();
    await ensureTestBootcampEnrollment();
    userId = TEST_USER_ID;
  } else {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    userId = (session.user as any).id as string;
  }

  const enrollment = await getEnrollment(userId);

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  return NextResponse.json({ canvas: enrollment.businessCanvas });
}

export async function POST(request: NextRequest) {
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

  const enrollment = await getEnrollment(userId);

  if (!enrollment) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  if (enrollment.businessCanvas) {
    return NextResponse.json({ canvas: enrollment.businessCanvas });
  }

  const payload = sanitizePayload(await request.json().catch(() => ({})));

  const canvas = await prisma.businessCanvas.create({
    data: {
      enrollmentId: enrollment.id,
      ...(payload as any),
    },
  });

  return NextResponse.json({ canvas });
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

  const enrollment = await getEnrollment(userId);

  if (!enrollment?.businessCanvas) {
    return NextResponse.json({ error: 'Canvas not found' }, { status: 404 });
  }

  const payload = sanitizePayload(await request.json().catch(() => ({})), true);

  const canvas = await prisma.businessCanvas.update({
    where: { enrollmentId: enrollment.id },
    data: payload,
  });

  return NextResponse.json({ canvas });
}

export async function DELETE(request: NextRequest) {
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

  const enrollment = await getEnrollment(userId);

  if (!enrollment?.businessCanvas) {
    return NextResponse.json({ success: true });
  }

  await prisma.businessCanvas.delete({
    where: { enrollmentId: enrollment.id },
  });

  return NextResponse.json({ success: true });
}

