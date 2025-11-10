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

  // Try to find user by email first (works for both SQLite and PostgreSQL)
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    // Update existing user
    return prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        role: resolvedRole,
        orientationScheduledAt: null,
        rosterOptIn: false,
      },
    });
  }

  // Create new user
  // For SQLite (local), use fixed ID; for PostgreSQL (production), let it auto-generate
  try {
    return await prisma.user.create({
      data: {
        id: TEST_USER_ID, // Try with fixed ID first (SQLite)
        email,
        name,
        role: resolvedRole,
      },
    });
  } catch (error) {
    // If fixed ID fails (PostgreSQL), create without ID
    return await prisma.user.create({
      data: {
        email,
        name,
        role: resolvedRole,
      },
    });
  }
}

export async function ensureTestProfile() {
  // Find user by email to get their ID
  const user = await prisma.user.findUnique({
    where: { email: DEFAULT_TEST_EMAIL },
  });

  if (!user) {
    throw new Error('Test user not found. Call ensureTestUser first.');
  }

  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
    },
  });
}

export async function ensureTestBootcampEnrollment() {
  // Find user by email to get their ID
  const user = await prisma.user.findUnique({
    where: { email: DEFAULT_TEST_EMAIL },
  });

  if (!user) {
    throw new Error('Test user not found. Call ensureTestUser first.');
  }

  const enrollment = await getOrCreateBootcampEnrollment(user.id);
  return enrollment;
}

export async function resetTestUserData() {
  // Ensure the user exists before attempting to reset
  await ensureTestUser();

  // Find user by email to get their ID
  const user = await prisma.user.findUnique({
    where: { email: DEFAULT_TEST_EMAIL },
  });

  if (!user) {
    throw new Error('Test user not found after ensureTestUser.');
  }

  await prisma.$transaction([
    prisma.businessCanvas.deleteMany({
      where: { enrollment: { userId: user.id } },
    }),
    prisma.reflection.deleteMany({
      where: { enrollment: { userId: user.id } },
    }),
    prisma.weekProgress.deleteMany({
      where: { enrollment: { userId: user.id } },
    }),
    prisma.bootcampEnrollment.deleteMany({
      where: { userId: user.id },
    }),
    prisma.lead.deleteMany({
      where: { ownerId: user.id },
    }),
    prisma.deal.deleteMany({
      where: { ownerId: user.id },
    }),
    prisma.profile.deleteMany({
      where: { userId: user.id },
    }),
    prisma.enrollment.deleteMany({
      where: { userId: user.id },
    }),
  ]);

  // Reset user fields back to defaults
  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: DEFAULT_TEST_NAME,
      email: DEFAULT_TEST_EMAIL,
      orientationScheduledAt: null,
      rosterOptIn: false,
      updatedAt: new Date(),
    },
  });
}

