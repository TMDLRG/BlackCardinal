import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — BlackCardinal',
  description: 'Terms of service for BlackCardinal platform and services.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-mute">Last updated: January 2025</p>

        <h2 className="mt-8 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the BlackCardinal platform, you accept and agree to be bound by the
          terms and provision of this agreement.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">2. Use License</h2>
        <p>
          Permission is granted to temporarily access the materials (information or software) on
          BlackCardinal's platform for personal, non-commercial transitory viewing only.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">3. Founding 50 Program</h2>
        <p>
          The Founding 50 program is subject to terms outlined at time of enrollment. Benefits and
          features are provisional and subject to refinement. Program details may evolve based on
          feedback and operational needs.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">4. BYOA Service</h2>
        <p>
          Bring Your Own Apparel (BYOA) service is provided as-is. Results may vary based on
          garment material, condition, and fabric type. See BYOA Waiver for full details.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">5. Limitation of Liability</h2>
        <p>
          In no event shall BlackCardinal or its suppliers be liable for any damages arising out of
          the use or inability to use the materials on BlackCardinal's platform.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws and
          you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <p className="mt-12 text-sm text-mute">
          For questions about these terms, contact: legal@blackcardinal.com
        </p>
      </div>
    </div>
  );
}

