import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (development only)
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create products with actual images
  const products = await Promise.all([
    // Merch - Core Products
    prisma.product.create({
      data: {
        name: 'Pullover Hoodie',
        description:
          'Premium heavyweight fleece with BlackCardinal mark. Refined comfort for everyday wear.',
        priceCents: 6800,
        category: 'Merch',
        imageUrl: '/pulloverhoodie.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Hooded Jacket',
        description:
          'Full-zip hooded jacket with embroidered logo. Premium construction, modern silhouette.',
        priceCents: 8200,
        category: 'Merch',
        imageUrl: '/hoodedjacketbwlogo.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Grey Knit Cap',
        description: 'Unstructured knit beanie with minimalist design. Everyday essential for refined style.',
        priceCents: 2800,
        category: 'Merch',
        imageUrl: '/greyknitcap.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'White Knit Cap',
        description: 'Clean white knit beanie with subtle branding. Versatile accessory for any season.',
        priceCents: 2800,
        category: 'Merch',
        imageUrl: '/whiteknitcap.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Coffee Mug',
        description: 'Ceramic mug with understated BlackCardinal mark. Ritual-grade quality for your morning routine.',
        priceCents: 2400,
        category: 'Merch',
        imageUrl: '/coffeecup.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Premium Backpack',
        description: 'Durable canvas backpack with leather accents. Designed for the modern professional.',
        priceCents: 12800,
        category: 'Merch',
        imageUrl: '/backpack.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sports Bra',
        description: 'High-performance athletic wear with BlackCardinal branding. Comfort meets style.',
        priceCents: 4800,
        category: 'Merch',
        imageUrl: '/sportsbra.jpeg',
        inStock: true,
      },
    }),
    // BYOA Services
    prisma.product.create({
      data: {
        name: 'BYOA Essential',
        description:
          '1 small front press (chest). Heat transfer vinyl. Preset designs. Walk-in or mail-in service.',
        priceCents: 1800,
        category: 'BYOA',
        imageUrl: '/3821112544242327276.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'BYOA Premium',
        description:
          'Front + back or full chest. Minimalist art or cardinal mark. Consultation included. Higher durability materials.',
        priceCents: 2800,
        category: 'BYOA',
        imageUrl: '/4579874047687401060.jpeg',
        inStock: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'BYOA Custom',
        description:
          'Custom layout & layering. DTF or specialty materials. By appointment. Event pricing available.',
        priceCents: 3500,
        category: 'BYOA',
        imageUrl: '/5771539071585584121.jpeg',
        inStock: true,
      },
    }),
    // Founding 50 Program
    prisma.product.create({
      data: {
        name: 'Founding 50 Program',
        description:
          'Join the Founding Fifty. Complete sample kit, exclusive territory, event support, marketing assets, and 10-week bootcamp.',
        priceCents: 5000,
        category: 'Program',
        imageUrl: '/products/founding-50.png',
        inStock: true,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@blackcardinal.com',
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create test founder user
  const founderUser = await prisma.user.create({
    data: {
      email: 'founder@example.com',
      name: 'Test Founder',
      role: 'FOUNDER',
      rosterOptIn: true,
      emailVerified: new Date(),
      Profile: {
        create: {
          city: 'New York, NY',
          bio: 'Passionate about luxury with purpose. Building community one conversation at a time.',
        },
      },
    },
  });

  console.log(`✅ Created test founder: ${founderUser.email}`);

  // Create sample leads for founder
  const leads = await prisma.lead.createMany({
    data: [
      {
        ownerId: founderUser.id,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '555-0101',
        notes: 'Interested in BYOA custom service. Loves minimalist design.',
        stage: 'CONTACTED',
        nextAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      },
      {
        ownerId: founderUser.id,
        name: 'Michael Chen',
        email: 'michael@example.com',
        phone: '555-0102',
        notes: 'Looking for Core Tee and Studio Cap. Committed to autism advocacy.',
        stage: 'QUALIFIED',
        nextAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      },
      {
        ownerId: founderUser.id,
        name: 'Emily Rodriguez',
        email: 'emily@example.com',
        stage: 'NEW',
      },
    ],
  });

  console.log(`✅ Created ${leads.count} sample leads`);

  // Create sample enrollment
  await prisma.enrollment.create({
    data: {
      userId: founderUser.id,
      program: 'Founding-50-bootcamp',
      week: 1,
      progress: {
        week1: {
          lessons: [true, false, false],
          quiz: false,
          completedAt: null,
        },
      },
    },
  });

  console.log('✅ Created sample enrollment');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
