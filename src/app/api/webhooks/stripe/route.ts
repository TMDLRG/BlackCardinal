import { NextRequest, NextResponse } from 'next/server';
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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  const userId = session.metadata?.userId;

  if (!orderId) {
    console.error('No orderId in session metadata');
    return;
  }

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'COMPLETED',
      updatedAt: new Date(),
    },
  });

  // If no user ID, create account (new customer)
  if (!userId && session.customer_details?.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: session.customer_details.email },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email: session.customer_details.email,
          name: session.customer_details.name || undefined,
          role: 'FOUNDER', // Default role for purchases
          emailVerified: new Date(),
        },
      });

      // Link order to new user
      await prisma.order.update({
        where: { id: orderId },
        data: { userId: newUser.id },
      });

      // TODO: Send welcome email
      console.log(`Created new user account: ${newUser.email}`);
    }
  }

  // TODO: Send order confirmation email
  console.log(`Order ${orderId} completed successfully`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Find order by payment intent ID
  const order = await prisma.order.findFirst({
    where: { paymentId: paymentIntent.id },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'FAILED' },
    });
  }

  console.log(`Payment failed for intent: ${paymentIntent.id}`);
}

