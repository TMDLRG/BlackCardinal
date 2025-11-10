import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BlackCardinal',
  description: 'Privacy policy for BlackCardinal platform.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-mute">Last updated: January 2025</p>

        <h2 className="mt-8 text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, including:
        </p>
        <ul className="list-disc pl-6">
          <li>Account information (name, email, profile details)</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Order history and transaction data</li>
          <li>CRM data (leads, deals, notes - for Founder accounts)</li>
          <li>Bootcamp progress and quiz responses</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send order confirmations</li>
          <li>Send you technical notices and support messages</li>
          <li>Provide bootcamp content and track your progress</li>
          <li>Display your profile on the public roster (if opted in)</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information:
        </p>
        <ul className="list-disc pl-6">
          <li>With service providers who assist in operations (Stripe, email providers)</li>
          <li>If required by law or to protect our rights</li>
          <li>With your consent (e.g., public roster opt-in)</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">4. Data Security</h2>
        <p>
          We use industry-standard security measures to protect your personal information. However,
          no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6">
          <li>Access and update your personal information</li>
          <li>Request deletion of your account and data</li>
          <li>Opt out of marketing communications</li>
          <li>Control your roster visibility</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">6. Cookies</h2>
        <p>
          We use essential cookies for authentication and functionality. We do not use third-party
          tracking cookies.
        </p>

        <p className="mt-12 text-sm text-mute">
          For privacy questions or data requests, contact: privacy@blackcardinal.com
        </p>
      </div>
    </div>
  );
}

