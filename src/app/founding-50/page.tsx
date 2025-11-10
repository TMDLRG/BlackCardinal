import { Button } from '@/components/ui/button';
import { Users, Calendar, Package, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Founding 50 Program | BlackCardinal',
  description:
    'Join the Founding Fifty. Build your business with modern luxury, purpose, and a proven framework.',
};

export default function Founding50Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-oat/30 via-background to-oat/20 px-6 py-24 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 inline-block rounded-full bg-ink px-4 py-1 text-sm font-semibold uppercase tracking-wide text-oat">
            Limited to 50 Founding Partners
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Join the Founding Fifty
          </h1>
          <p className="mb-8 text-xl text-mute md:text-2xl">
            Be among the first to represent BlackCardinal. Build your own business sharing modern
            luxury with purpose.
          </p>
          <Button size="lg" asChild className="text-lg">
            <Link href="/join">Reserve Your Spot</Link>
          </Button>
          <p className="mt-6 text-sm italic text-mute">
            $50 Founding Partner Kit • One-time investment • No inventory commitment
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gradient-to-br from-ink via-charcoal to-ink px-6 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <h2 className="mb-3 text-2xl font-bold text-oat md:text-3xl">
              Why Black Cardinal?
            </h2>
            <p className="text-base text-oat/80">
              Watch the vision behind Black Cardinal and the Founding 50 program
            </p>
          </div>
          
          {/* Video Player */}
          <div className="overflow-hidden rounded-lg bg-charcoal shadow-xl">
            <video
              controls
              className="w-full"
              preload="metadata"
            >
              <source src="/Black Cardinal 50.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-ink">What You Get</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <BenefitCard
              icon={<Package className="h-8 w-8 text-ink" />}
              title="Complete Sample Kit"
              description="Physical product samples, BYOA press samples, and brand materials to showcase the full BlackCardinal experience."
              note="Subject to refinement"
            />
            <BenefitCard
              icon={<Users className="h-8 w-8 text-ink" />}
              title="Exclusive Territory"
              description="Priority access to customers in your market with founder status recognition."
              note="Subject to refinement"
            />
            <BenefitCard
              icon={<Calendar className="h-8 w-8 text-ink" />}
              title="Event Support"
              description="First access to BYOA pop-up activations and limited drops. Run your own micro-events with guidance."
              note="Timing and format to be confirmed"
            />
            <BenefitCard
              icon={<FileText className="h-8 w-8 text-ink" />}
              title="Marketing Assets"
              description="Digital lookbook, print materials, social templates, and business card templates for quick activation."
              note="Template format for local printing"
            />
          </div>
        </div>
      </section>

      {/* 10-Week Bootcamp */}
      <section className="bg-ink px-6 py-16 text-oat">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-6 text-center text-3xl font-bold">
            10-Week Founding 50 Enablement Bootcamp
          </h2>
          <p className="mb-12 text-center text-xl text-oat/80">
            Master advanced AI skills with ORC (Outcome, Role, Context), the 5Ps of entrepreneurship,
            person-to-person sales, and first-sale readiness.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BootcampWeek week="1-2" title="ORC Framework Mastery" />
            <BootcampWeek week="3-5" title="5Ps Deep-Dive" />
            <BootcampWeek week="6-7" title="Sales Scripts & Role-Play" />
            <BootcampWeek week="8" title="Person-to-Person Sales" />
            <BootcampWeek week="9" title="Your First BC Sale" />
            <BootcampWeek week="10" title="KPI Setting & Launch" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-ink">How It Works</h2>
          <div className="space-y-8">
            <Step
              number="1"
              title="Invite a few friends"
              description="Share the story in under a minute. Focus on luxury with purpose, BYOA sustainability, and the impact mission."
            />
            <Step
              number="2"
              title="Offer BYOA or Core Merch"
              description="Bring a favorite garment for a tasteful press, or order Core Tee, Studio Cap, or Morning Mug. When feasible, schedule a simple pop-up."
            />
            <Step
              number="3"
              title="Track & Grow"
              description="Use the built-in CRM to track leads, log deals, schedule follow-ups, and get ORC/5Ps coaching prompts as you build."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Roster Preview */}
      <section className="bg-oat/10 px-6 py-16">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-ink">Join the Community</h2>
          <p className="mb-8 text-lg text-mute">
            Founding members will be listed on the public roster (opt-in). Build credibility,
            connect with fellow founders, and be part of the origin story.
          </p>
          <Button variant="outline" asChild>
            <Link href="/roster">View Current Roster</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-6 text-4xl font-bold text-ink">Ready to Join?</h2>
          <p className="mb-8 text-lg text-mute">
            You know how to sell. You know how to read people. That's 80%. The other 20% is
            structure—this platform gives you that.
          </p>
          <Button size="lg" asChild className="text-lg">
            <Link href="/join">Reserve Your Founding Spot</Link>
          </Button>
          <p className="mt-6 text-sm text-mute">
            Limited to the first 50 qualified applicants. Selection based on alignment with brand
            values and market opportunity.
          </p>
        </div>
      </section>
    </main>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  note?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-ink hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-oat/30">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
      </div>
      <p className="mb-2 text-mute">{description}</p>
      {note && <p className="text-sm italic text-mute/70">{note}</p>}
    </div>
  );
}

function BootcampWeek({ week, title }: { week: string; title: string }) {
  return (
    <div className="rounded-lg border border-oat/30 bg-charcoal p-4">
      <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-oat/60">
        Week {week}
      </div>
      <h3 className="text-lg font-semibold text-oat">{title}</h3>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink text-xl font-bold text-oat">
        {number}
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold text-ink">{title}</h3>
        <p className="text-mute">{description}</p>
      </div>
    </div>
  );
}

