import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, DollarSign, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ensureTestBootcampEnrollment, ensureTestUser, TEST_USER_ID } from '@/lib/test-mode';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | BlackCardinal',
  description: 'Your Founder Dashboard - Track leads, deals, and bootcamp progress.',
};

async function getDashboardStats(userId: string) {
  const [totalLeads, openDeals, bootcampEnrollment] = await Promise.all([
    prisma.lead.count({ where: { ownerId: userId } }),
    prisma.deal.count({ where: { ownerId: userId, status: 'OPEN' } }),
    prisma.bootcampEnrollment.findUnique({
      where: { userId },
      select: { currentWeek: true },
    }),
  ]);

  const wonDeals = await prisma.deal.findMany({
    where: { ownerId: userId, status: 'WON' },
    select: { amountCents: true },
  });

  const totalRevenue = wonDeals.reduce((sum: number, deal: { amountCents: number }) => sum + deal.amountCents, 0);

  // Get upcoming appointments
  const upcomingLeads = await prisma.lead.findMany({
    where: {
      ownerId: userId,
      nextAt: { gte: new Date() },
    },
    orderBy: { nextAt: 'asc' },
    take: 3,
  });

  return {
    totalLeads,
    openDeals,
    totalRevenue,
    bootcampWeek: bootcampEnrollment?.currentWeek || 0,
    upcomingLeads,
  };
}

export default async function DashboardPage() {
  // Check for test mode first
  const cookieStore = await cookies();
  const testAuthCookie = cookieStore.get('test-auth');
  const isTestMode = testAuthCookie?.value === 'true';

  // If test mode, render with mock data
  if (isTestMode) {
    await ensureTestUser();
    await ensureTestBootcampEnrollment();
    const stats = await getDashboardStats(TEST_USER_ID);

    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          {/* Test Mode Banner */}
          <div className="mb-6 rounded-lg border-2 border-ember bg-ember/10 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-ember" />
              <div>
                <h3 className="font-semibold text-ember">Test Mode Active</h3>
                <p className="text-sm text-mute">
                  You're viewing this page in test mode. Full functionality available.
                </p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-ink">Founder Dashboard</h1>
            <p className="text-xl text-mute">Track your pipeline and bootcamp progress</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Users className="h-8 w-8 text-ember" />}
              label="Total Leads"
              value={stats.totalLeads.toString()}
              href="/dashboard/leads"
            />
            <StatCard
              icon={<DollarSign className="h-8 w-8 text-ember" />}
              label="Open Deals"
              value={stats.openDeals.toString()}
              href="/dashboard/deals"
            />
            <StatCard
              icon={<BarChart3 className="h-8 w-8 text-ember" />}
              label="Revenue"
              value={`$${(stats.totalRevenue / 100).toFixed(0)}`}
              href="/dashboard/deals"
            />
            <StatCard
              icon={<BookOpen className="h-8 w-8 text-ember" />}
              label="Bootcamp Week"
              value={stats.bootcampWeek > 0 ? `Week ${stats.bootcampWeek}` : 'Not Started'}
              href="/bootcamp"
            />
          </div>

          {/* Action Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Button asChild className="w-full justify-start" size="lg" variant="outline">
              <Link href="/dashboard/leads">
                <Users className="mr-3 h-5 w-5" />
                Manage Leads
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" size="lg" variant="outline">
              <Link href="/bootcamp">
                <BookOpen className="mr-3 h-5 w-5" />
                Continue Bootcamp
              </Link>
            </Button>
          </div>

          {/* Upcoming Appointments */}
          {stats.upcomingLeads.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-6 text-2xl font-bold text-ink">Upcoming Appointments</h2>
              <div className="space-y-4">
                {stats.upcomingLeads.map((lead: any) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-mute" />
                      <div>
                        <p className="font-semibold text-ink">{lead.name}</p>
                        <p className="text-sm text-mute">
                          {lead.nextAt?.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/leads/${lead.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    );
  }

  // Normal authentication flow
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  const userId = (session.user as any).id || session.user.email;
  const stats = await getDashboardStats(userId!);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-bold text-ink">
            Welcome back, {session.user.name?.split(' ')[0] || 'Founder'}
          </h1>
          <p className="text-lg text-mute">
            You know how to sell. You know how to read people. Track it here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            label="Total Leads"
            value={stats.totalLeads.toString()}
            href="/dashboard/leads"
          />
          <StatCard
            icon={<BarChart3 className="h-6 w-6" />}
            label="Open Deals"
            value={stats.openDeals.toString()}
            href="/dashboard/deals"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6" />}
            label="Total Revenue"
            value={`$${(stats.totalRevenue / 100).toFixed(2)}`}
            href="/dashboard/deals"
          />
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            label="Bootcamp Progress"
            value={stats.bootcampWeek > 0 ? `Week ${stats.bootcampWeek}` : 'Not Started'}
            href="/bootcamp"
          />
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-ink">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button asChild variant="outline" className="h-auto justify-start p-6">
              <Link href="/dashboard/leads">
                <Users className="mr-3 h-5 w-5" />
                Manage Leads
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto justify-start p-6">
              <Link href="/dashboard/deals">
                <BarChart3 className="mr-3 h-5 w-5" />
                Log a Deal
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto justify-start p-6">
              <Link href="/bootcamp">
                <BookOpen className="mr-3 h-5 w-5" />
                Continue Bootcamp
              </Link>
            </Button>
          </div>
        </section>

        {/* Upcoming Appointments */}
        {stats.upcomingLeads.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-ink">Upcoming Appointments</h2>
            <div className="space-y-4">
              {stats.upcomingLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-mute" />
                    <div>
                      <p className="font-semibold text-ink">{lead.name}</p>
                      <p className="text-sm text-mute">
                        {lead.nextAt?.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/dashboard/leads/${lead.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-ink hover:shadow-lg"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-oat/30 text-ink">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-ink">{value}</div>
      <div className="text-sm text-mute">{label}</div>
    </Link>
  );
}

