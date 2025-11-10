import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BYOA Service Waiver — BlackCardinal',
  description: 'Bring Your Own Apparel service waiver and terms.',
};

export default function BYOAWaiverPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">BYOA Service Waiver</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-mute">Last updated: January 2025</p>

        <p className="font-semibold text-ink">
          Please read carefully before using Bring Your Own Apparel (BYOA) heat-press services.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">1. Service Description</h2>
        <p>
          BlackCardinal's BYOA service applies heat-transfer designs to customer-provided apparel
          using professional heat-press equipment. We offer three tiers: Essential, Premium, and
          Custom.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">2. Material Suitability</h2>
        <p>
          <strong>Compatible materials:</strong> Cotton, cotton blends (≥50% cotton), polyester.
        </p>
        <p>
          <strong>Avoid:</strong> Nylon, waterproof fabrics, silicone-treated materials, garments
          with existing heat-sensitive embellishments.
        </p>
        <p>
          We offer test swatches for uncertain materials. Final results depend on garment type,
          material composition, and condition.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">3. Customer Acknowledgment</h2>
        <p>By using BYOA services, you acknowledge that:</p>
        <ul className="list-disc pl-6">
          <li>Print results may vary based on garment material and condition</li>
          <li>BlackCardinal is not liable for damage to unsuitable materials</li>
          <li>Test swatches are recommended for premium/vintage garments</li>
          <li>Heat-press applications are permanent and cannot be undone</li>
          <li>Color accuracy may vary slightly from digital mockups</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">4. Returns and Refunds</h2>
        <p>
          BYOA is a service, not a product. Refunds are provided only for:
        </p>
        <ul className="list-disc pl-6">
          <li>Service errors (incorrect design, misalignment)</li>
          <li>Equipment failure resulting in damage</li>
        </ul>
        <p>
          Refunds are NOT provided for:
        </p>
        <ul className="list-disc pl-6">
          <li>Customer dissatisfaction with material compatibility</li>
          <li>Pre-existing garment damage or defects</li>
          <li>Customer-approved designs that don't meet expectations</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">5. Care Instructions</h2>
        <p>To ensure longevity of heat-pressed designs:</p>
        <ul className="list-disc pl-6">
          <li>Wash inside out in cold water</li>
          <li>Avoid bleach and fabric softeners</li>
          <li>Tumble dry low or hang dry</li>
          <li>Do not iron directly on design</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">6. Limitation of Liability</h2>
        <p>
          BlackCardinal's liability is limited to the service fee paid. We are not responsible for
          the replacement value of customer-provided garments.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">7. Photo Consent</h2>
        <p>
          Completed BYOA projects may be photographed for portfolio/marketing use. You may opt out
          at time of service.
        </p>

        <div className="mt-12 rounded-lg border-2 border-ink bg-oat/20 p-6">
          <p className="font-semibold">By proceeding with BYOA service, you agree to these terms.</p>
          <p className="mt-2 text-sm text-mute">
            Questions? Contact: byoa@blackcardinal.com
          </p>
        </div>
      </div>
    </div>
  );
}

