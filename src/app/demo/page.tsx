'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  Target,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface MockFounder {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  enrolledAt: string;
  status: string;
}

export default function DemoPage() {
  const [founder, setFounder] = useState<MockFounder | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    // Load mock founder data from localStorage
    const mockFounderData = localStorage.getItem('mockFounder');
    if (mockFounderData) {
      setFounder(JSON.parse(mockFounderData));
    }
  }, []);

  if (!founder) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink mb-4">Loading Demo Experience...</h1>
          <p className="text-mute">Please complete the registration form first.</p>
          <Link href="/join" className="mt-4 inline-block">
            <Button>Complete Registration</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <div className="mb-12 rounded-lg bg-gradient-to-r from-ink to-graphite p-8 text-oat">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                Welcome, {founder.firstName}!
              </h1>
              <p className="text-lg opacity-90">
                You're now a Founding 50 Member (Demo Mode)
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mb-8 rounded-lg border-2 border-accent bg-oat p-6">
          <h2 className="mb-2 flex items-center text-xl font-bold text-ink">
            <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
            Demo Mode Active
          </h2>
          <p className="text-graphite">
            This is a demonstration of the full Founding 50 member experience. 
            All features are simulated for demo purposes. To access the real platform, 
            please complete the actual registration and payment process.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard Stats */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Your Stats</h3>
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-mute">Bootcamp Progress</p>
                <p className="text-2xl font-bold text-ink">{currentWeek}/10 Weeks</p>
              </div>
              <div>
                <p className="text-sm text-mute">Resources Accessed</p>
                <p className="text-2xl font-bold text-ink">15</p>
              </div>
              <div>
                <p className="text-sm text-mute">Community Connections</p>
                <p className="text-2xl font-bold text-ink">8</p>
              </div>
            </div>
          </div>

          {/* Current Bootcamp Week */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Week {currentWeek}</h3>
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <h4 className="mb-2 font-bold text-graphite">
              Brand & Identity Deep Dive
            </h4>
            <p className="mb-4 text-sm text-mute">
              Understand your brand's DNA, refine your positioning, and craft 
              messaging that resonates with your ideal client.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-graphite">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Brand Archetype Workshop
              </div>
              <div className="flex items-center text-sm text-graphite">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Positioning Statement
              </div>
              <div className="flex items-center text-sm text-mute">
                <Clock className="mr-2 h-4 w-4" />
                Voice & Tone Guide (In Progress)
              </div>
            </div>
            <Button className="mt-4 w-full" variant="outline">
              View Week Details
            </Button>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Upcoming</h3>
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-4">
                <p className="text-sm font-bold text-graphite">Group Workshop</p>
                <p className="text-xs text-mute">Tomorrow, 2:00 PM EST</p>
                <p className="mt-1 text-sm text-mute">
                  Strategic Planning Session
                </p>
              </div>
              <div className="border-l-2 border-border pl-4 opacity-60">
                <p className="text-sm font-bold text-graphite">1-on-1 Coaching</p>
                <p className="text-xs text-mute">Friday, 10:00 AM EST</p>
                <p className="mt-1 text-sm text-mute">
                  Brand Development Review
                </p>
              </div>
            </div>
            <Button className="mt-4 w-full" variant="outline">
              View All Events
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Quick Actions</h3>
              <Target className="h-6 w-6 text-accent" />
            </div>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                View Current Week
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Community Directory
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
              <Button className="w-full" variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Pricing Tools
              </Button>
            </div>
          </div>

          {/* Resources */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-bold text-ink">Latest Resources</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-background p-3">
                <p className="font-bold text-graphite">Brand Positioning Guide</p>
                <p className="text-xs text-mute">Week 1 • PDF</p>
              </div>
              <div className="rounded-lg bg-background p-3">
                <p className="font-bold text-graphite">Pricing Psychology Worksheet</p>
                <p className="text-xs text-mute">Week 1 • Interactive</p>
              </div>
              <div className="rounded-lg bg-background p-3">
                <p className="font-bold text-graphite">Client Discovery Template</p>
                <p className="text-xs text-mute">Week 2 • Notion</p>
              </div>
            </div>
            <Button className="mt-4 w-full" variant="outline">
              View All Resources
            </Button>
          </div>

          {/* Member Info */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-bold text-ink">Your Profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-mute">Name</p>
                <p className="font-bold text-graphite">
                  {founder.firstName} {founder.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-mute">Location</p>
                <p className="font-bold text-graphite">
                  {founder.city}, {founder.state}
                </p>
              </div>
              <div>
                <p className="text-sm text-mute">Email</p>
                <p className="font-bold text-graphite">{founder.email}</p>
              </div>
              <div>
                <p className="text-sm text-mute">Status</p>
                <p className="font-bold text-green-600">Active Member</p>
              </div>
              <div>
                <p className="text-sm text-mute">Enrolled</p>
                <p className="font-bold text-graphite">
                  {new Date(founder.enrolledAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Demo CTA */}
        <div className="mt-12 rounded-lg border-2 border-accent bg-card p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-ink">
            Ready to Get Started for Real?
          </h2>
          <p className="mb-6 text-graphite">
            This demo shows you what's possible. To access the full Founding 50 
            experience, complete your registration and join us.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/join">
              <Button size="lg">
                Complete Registration
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

