import { prisma } from '@/lib/db';
import { Role } from '@prisma/client';
import { getOrCreateBootcampEnrollment } from '@/lib/bootcamp/enrollment';

export const TEST_USER_ID = 'test-user-id';
export const DEFAULT_TEST_EMAIL = 'test-founder@blackcardinal.com';
export const DEFAULT_TEST_NAME = 'Test Founder';

export async function ensureTestUser({
  role = 'FOUNDER',
  email = DEFAULT_TEST_EMAIL,
  name = DEFAULT_TEST_NAME,
}: {
  role?: Role | 'FOUNDER' | 'ADMIN' | 'CUSTOMER';
  email?: string;
  name?: string;
} = {}) {
  const resolvedRole = role as Role;

  return prisma.user.upsert({
    where: { id: TEST_USER_ID },
    update: {
      email,
      name,
      role: resolvedRole,
      orientationScheduledAt: null,
      rosterOptIn: false,
    },
    create: {
      id: TEST_USER_ID,
      email,
      name,
      role: resolvedRole,
    },
  });
}

export async function ensureTestProfile() {
  await prisma.profile.upsert({
    where: { userId: TEST_USER_ID },
    update: {},
    create: {
      userId: TEST_USER_ID,
    },
  });
}

export async function ensureTestBootcampEnrollment() {
  const enrollment = await getOrCreateBootcampEnrollment(TEST_USER_ID);
  return enrollment;
}

export async function resetTestUserData() {
  // Ensure the user exists before attempting to reset
  await ensureTestUser();

  await prisma.$transaction([
    prisma.businessCanvas.deleteMany({
      where: { enrollment: { userId: TEST_USER_ID } },
    }),
    prisma.reflection.deleteMany({
      where: { enrollment: { userId: TEST_USER_ID } },
    }),
    prisma.weekProgress.deleteMany({
      where: { enrollment: { userId: TEST_USER_ID } },
    }),
    prisma.bootcampEnrollment.deleteMany({
      where: { userId: TEST_USER_ID },
    }),
    prisma.lead.deleteMany({
      where: { ownerId: TEST_USER_ID },
    }),
    prisma.deal.deleteMany({
      where: { ownerId: TEST_USER_ID },
    }),
    prisma.profile.deleteMany({
      where: { userId: TEST_USER_ID },
    }),
    prisma.enrollment.deleteMany({
      where: { userId: TEST_USER_ID },
    }),
  ]);

  // Reset user fields back to defaults
  await prisma.user.update({
    where: { id: TEST_USER_ID },
    data: {
      name: DEFAULT_TEST_NAME,
      email: DEFAULT_TEST_EMAIL,
      orientationScheduledAt: null,
      rosterOptIn: false,
      updatedAt: new Date(),
    },
  });
}

