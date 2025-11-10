import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-oat">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">BlackCardinal</h3>
            <p className="text-sm text-oat/80">
              Luxury that speaks volumes.
              <br />
              Quiet details. Bold impact.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-3 text-base font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/store" className="text-oat/80 hover:text-oat hover:underline">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/store?category=BYOA" className="text-oat/80 hover:text-oat hover:underline">
                  BYOA Service
                </Link>
              </li>
              <li>
                <Link href="/store?category=Drops" className="text-oat/80 hover:text-oat hover:underline">
                  Limited Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-base font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/founding-50" className="text-oat/80 hover:text-oat hover:underline">
                  Founding 50
                </Link>
              </li>
              <li>
                <Link href="/roster" className="text-oat/80 hover:text-oat hover:underline">
                  Roster
                </Link>
              </li>
              <li>
                <Link href="#impact" className="text-oat/80 hover:text-oat hover:underline">
                  Impact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 border-t border-oat/20 pt-8 text-center">
          <p className="text-sm text-oat/60">&copy; 2025 BlackCardinal LLC. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <Link href="/legal/terms" className="text-oat/60 hover:text-oat hover:underline">
              Terms
            </Link>
            <Link href="/legal/privacy" className="text-oat/60 hover:text-oat hover:underline">
              Privacy
            </Link>
            <Link href="/legal/byoa-waiver" className="text-oat/60 hover:text-oat hover:underline">
              BYOA Waiver
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

