import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import {
  DEFAULT_TEST_NAME,
  ensureTestBootcampEnrollment,
  ensureTestUser,
  TEST_USER_ID,
} from '@/lib/test-mode';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Orientation | BlackCardinal',
  description: 'Welcome to the Founding 50 program - Get started with your journey.',
};

async function getOrientationStatus(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      Profile: true,
      BootcampEnrollment: {
        include: {
          weekProgress: true,
        },
      },
    },
  });

  const hasProfile =
    !!user?.Profile &&
    Boolean(
      (user.Profile.city && user.Profile.city.trim().length > 0) ||
        (user.Profile.bio && user.Profile.bio.trim().length > 0) ||
        (user.name && user.name.trim().length > 0 && user.name !== DEFAULT_TEST_NAME),
    );

  const enrollment = user?.BootcampEnrollment;
  const hasBootcampProgress =
    !!enrollment &&
    (enrollment.currentWeek > 1 ||
      enrollment.weekProgress.some((week) => Boolean(week.completedAt)));

  return {
    hasProfile,
    hasScheduled: !!user?.orientationScheduledAt,
    hasEnrollment: hasBootcampProgress,
  };
}

export default async function OrientationPage() {
  // Check for test mode first
  const cookieStore = await cookies();
  const testAuthCookie = cookieStore.get('test-auth');
  const isTestMode = testAuthCookie?.value === 'true';

  // If test mode, create a mock session
  if (isTestMode) {
    await ensureTestUser();
    await ensureTestBootcampEnrollment();

    const status = await getOrientationStatus(TEST_USER_ID);
    const allComplete = status.hasProfile && status.hasScheduled && status.hasEnrollment;

    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          {/* Test Mode Banner */}
          <div className="mb-6 rounded-lg border-2 border-ember bg-ember/10 p-4">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-ember" />
              <div>
                <h3 className="font-semibold text-ember">Test Mode Active</h3>
                <p className="text-sm text-mute">
                  You're viewing this page in test mode. Full functionality available.
                </p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-ink">Welcome to the Founding 50</h1>
            <p className="text-xl text-mute">
              You're part of an exclusive group building the BlackCardinal community. Let's get you
              oriented.
            </p>
          </div>

          {/* Checklist */}
          <div className="mb-12 space-y-6">
            <ChecklistItem
              icon={<User className="h-6 w-6" />}
              title="Complete Your Profile"
              description="Add your name, city, and bio so we can showcase you on the roster."
              completed={status.hasProfile}
              actionLabel="Complete Profile"
              actionHref="/dashboard"
            />
            <ChecklistItem
              icon={<Calendar className="h-6 w-6" />}
              title="Schedule Your Kickoff Call"
              description="Book a time to connect with the team and get your questions answered."
              completed={status.hasScheduled}
              actionLabel="Schedule Call"
              actionHref="/orientation/schedule"
            />
            <ChecklistItem
              icon={<BookOpen className="h-6 w-6" />}
              title="Start the Bootcamp"
              description="Begin your 10-week journey mastering ORC, 5Ps, and sales skills."
              completed={status.hasEnrollment}
              actionLabel="Start Bootcamp"
              actionHref="/bootcamp"
              disabled={!status.hasProfile || !status.hasScheduled}
            />
          </div>

          {/* CTA */}
          <div className="text-center">
            {allComplete ? (
              <Button asChild size="lg" className="px-8">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Normal authentication flow
  const session = await auth();

  if (!session?.user || (session.user as any).role !== 'FOUNDER') {
    redirect('/api/auth/signin?callbackUrl=/orientation');
  }

  const userId = (session.user as any).id || session.user.email;
  const status = await getOrientationStatus(userId!);

  const allComplete = status.hasProfile && status.hasScheduled && status.hasEnrollment;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-ink">Welcome to the Founding 50</h1>
          <p className="text-xl text-mute">
            You're part of an exclusive group building the BlackCardinal community. Let's get you
            oriented.
          </p>
        </div>

        {/* Checklist */}
        <div className="mb-12 space-y-6">
          <ChecklistItem
            icon={<User className="h-6 w-6" />}
            title="Complete Your Profile"
            description="Add your name, city, and bio so we can showcase you on the roster."
            completed={status.hasProfile}
            actionLabel="Complete Profile"
            actionHref="/dashboard"
          />
          <ChecklistItem
            icon={<Calendar className="h-6 w-6" />}
            title="Schedule Your Kickoff Call"
            description="Book a time to connect with the team and get your questions answered."
            completed={status.hasScheduled}
            actionLabel="Schedule Call"
            actionHref="/orientation/schedule"
          />
          <ChecklistItem
            icon={<BookOpen className="h-6 w-6" />}
            title="Start the Bootcamp"
            description="Begin your 10-week journey mastering ORC, 5Ps, and sales skills."
            completed={status.hasEnrollment}
            actionLabel="Start Bootcamp"
            actionHref="/bootcamp"
            disabled={!status.hasProfile || !status.hasScheduled}
          />
        </div>

        {/* Complete Section */}
        {allComplete && (
          <div className="rounded-lg border border-green-600 bg-green-50 p-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 className="mb-2 text-2xl font-bold text-ink">Orientation Complete!</h2>
            <p className="mb-6 text-mute">
              You're all set. Head to your dashboard to start tracking leads and building your
              business.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {/* Next Steps */}
        {!allComplete && (
          <div className="rounded-lg border border-border bg-oat/10 p-8">
            <h2 className="mb-4 text-xl font-bold text-ink">Next Steps</h2>
            <ul className="space-y-3 text-mute">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-ink">•</span>
                <span>Complete all checklist items above to unlock the full platform.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-ink">•</span>
                <span>
                  Your sample kit will ship within 5-7 business days (subject to refinement).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-ink">•</span>
                <span>
                  Join the Founding 50 community - connect with fellow founders on the roster.
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

function ChecklistItem({
  icon,
  title,
  description,
  completed,
  actionLabel,
  actionHref,
  disabled = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  completed: boolean;
  actionLabel: string;
  actionHref: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-6 rounded-lg border border-border bg-card p-6">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
          completed ? 'bg-green-100 text-green-600' : 'bg-oat/30 text-ink'
        }`}
      >
        {completed ? <CheckCircle className="h-6 w-6" /> : icon}
      </div>
      <div className="flex-1">
        <h3 className="mb-2 text-lg font-semibold text-ink">{title}</h3>
        <p className="mb-4 text-sm text-mute">{description}</p>
        {!completed && (
          <Button asChild size="sm" disabled={disabled}>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        )}
        {completed && (
          <div className="text-sm font-semibold text-green-600">✓ Completed</div>
        )}
      </div>
    </div>
  );
}

