import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

// Initialize Stripe only when API key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-10-29.clover',
  });
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 });
    }

    // Calculate total
    const totalCents = items.reduce(
      (sum: number, item: any) => sum + item.priceCents * item.quantity,
      0
    );

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        email: session?.user?.email || 'guest@blackcardinal.com',
        status: 'PENDING',
        totalCents,
        items: JSON.stringify(items),
        paymentProvider: 'stripe',
      },
    });

    // Create Stripe Checkout Session
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: item.priceCents,
        },
        quantity: item.quantity,
      })),
      customer_email: session?.user?.email || undefined,
      metadata: {
        orderId: order.id,
        userId: session?.user?.id || '',
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

