import { z } from 'zod';

// Profile validation
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  city: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  rosterOptIn: z.boolean(),
});

export type ProfileData = z.infer<typeof profileSchema>;

// Lead validation
export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  notes: z.string().max(2000).optional(),
  stage: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST']),
  nextAt: z.date().optional().nullable(),
});

export type LeadData = z.infer<typeof leadSchema>;

// Deal validation
export const dealSchema = z.object({
  leadId: z.string().cuid().optional().nullable(),
  product: z.string().min(1, 'Product is required'),
  amountCents: z.number().int().positive('Amount must be positive'),
  status: z.enum(['OPEN', 'WON', 'LOST', 'REFUNDED']),
});

export type DealData = z.infer<typeof dealSchema>;

// Checkout validation
export const checkoutSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
  items: z.array(
    z.object({
      productId: z.string().cuid(),
      name: z.string(),
      quantity: z.number().int().positive(),
      priceCents: z.number().int().positive(),
    })
  ).min(1, 'Cart cannot be empty'),
  paymentMethod: z.enum(['stripe', 'crypto']),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

// Product validation (admin)
export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required').max(2000),
  priceCents: z.number().int().positive('Price must be positive'),
  category: z.enum(['Merch', 'BYOA', 'Drops', 'Program']),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  inStock: z.boolean(),
});

export type ProductData = z.infer<typeof productSchema>;

