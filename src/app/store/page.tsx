import { prisma } from '@/lib/db';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Store | BlackCardinal',
  description: 'Premium merch with meaning. Core Tee, Studio Cap, Morning Mug, and BYOA services.',
};

async function getProducts() {
  return await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { category: 'asc' },
  });
}

export default async function StorePage() {
  const products = await getProducts();
  
  const merchProducts = products.filter((p: any) => p.category === 'Merch');
  const byoaProducts = products.filter((p: any) => p.category === 'BYOA');
  const dropsProducts = products.filter((p: any) => p.category === 'Drops');

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-oat/20 to-background px-6 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Modern Merch with Meaning
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-mute">
          Premium basics with the BlackCardinal mark. Refined design, sustainable BYOA services,
          and purpose woven into every piece.
        </p>
      </section>

      {/* Core Merch */}
      {merchProducts.length > 0 && (
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-ink">Core Merch Line</h2>
            <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {merchProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BYOA Services */}
      {byoaProducts.length > 0 && (
        <section className="bg-oat/10 px-6 py-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="mb-4 text-3xl font-bold text-ink">Bring Your Own Apparel</h2>
            <p className="mb-8 text-mute">
              Bring your story. We'll press it. Extend the life of your premium garments with
              curated heat-press designs.
            </p>
            <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {byoaProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <p className="mt-8 text-sm italic text-mute">
              <strong>Waiver note:</strong> Customer acknowledges final print result may vary by
              garment type and material; test swatches offered.{' '}
              <a href="/legal/byoa-waiver" className="underline hover:text-ink">
                View full terms
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Limited Drops */}
      {dropsProducts.length > 0 && (
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-ink">Limited Drops</h2>
            <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {dropsProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function ProductCard({ product }: { product: any }) {
  // Format price with proper 2 decimal places
  const price = (product.priceCents / 100).toFixed(2);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-ink hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-oat/20">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingCart className="h-16 w-16 text-mute/30" />
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-ink">{product.name}</h3>
        <p className="mb-4 flex-1 text-sm text-mute">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-ink">${price}</span>
          </div>
          <AddToCartButton
            product={{
              productId: product.id,
              name: product.name,
              description: product.description,
              priceCents: product.priceCents,
              imageUrl: product.imageUrl || undefined,
            }}
            disabled={!product.inStock}
          />
        </div>
      </div>
    </article>
  );
}

