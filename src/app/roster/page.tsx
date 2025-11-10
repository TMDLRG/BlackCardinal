import { prisma } from '@/lib/db';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Founding 50 Roster | BlackCardinal',
  description: 'Meet the Founding Fifty members building the BlackCardinal community.',
};

async function getFounders() {
  return await prisma.user.findMany({
    where: {
      role: 'FOUNDER',
      rosterOptIn: true,
    },
    include: {
      Profile: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

export default async function RosterPage() {
  const founders = await getFounders();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-oat/20 to-background px-6 py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <Users className="mx-auto mb-6 h-16 w-16 text-ink" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            The Founding Fifty
          </h1>
          <p className="text-lg text-mute">
            Meet the pioneers building the BlackCardinal community. Luxury with purpose, one
            conversation at a time.
          </p>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          {founders.length === 0 ? (
            <div className="rounded-lg border border-border bg-oat/10 p-12 text-center">
              <p className="text-lg text-mute">
                Founding members coming soon. Be among the first to join.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {founders.map((founder: any) => (
                <FounderCard key={founder.id} founder={founder} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FounderCard({ founder }: { founder: any }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-ink hover:shadow-lg">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-ink">{founder.name || 'Founding Rep'}</h3>
        {founder.Profile?.city && (
          <p className="text-sm text-mute">{founder.Profile.city}</p>
        )}
      </div>
      {founder.Profile?.bio && (
        <p className="line-clamp-3 text-sm text-mute">{founder.Profile.bio}</p>
      )}
    </article>
  );
}

