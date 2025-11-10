import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: 'BlackCardinal — Luxury That Speaks Volumes',
    template: '%s | BlackCardinal',
  },
  description:
    'Modern merch with meaning. BYOA heat-press services. 5% of profits to autism nonprofits.',
  keywords: ['luxury apparel', 'BYOA', 'heat press', 'autism charity', 'founding 50'],
  authors: [{ name: 'BlackCardinal' }],
  creator: 'BlackCardinal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blackcardinal.com',
    title: 'BlackCardinal — Luxury That Speaks Volumes',
    description: 'Modern merch with meaning. BYOA heat-press services.',
    siteName: 'BlackCardinal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlackCardinal — Luxury That Speaks Volumes',
    description: 'Modern merch with meaning. BYOA heat-press services.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
