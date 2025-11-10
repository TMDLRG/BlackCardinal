import { describe, it, expect } from 'vitest';
import {
  profileSchema,
  leadSchema,
  dealSchema,
  checkoutSchema,
  productSchema,
} from '@/lib/validators';

describe('Validators', () => {
  describe('profileSchema', () => {
    it('should validate valid profile data', () => {
      const validProfile = {
        name: 'John Doe',
        city: 'New York, NY',
        bio: 'Passionate founder',
        rosterOptIn: true,
      };

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should require name', () => {
      const invalidProfile = {
        name: '',
        rosterOptIn: false,
      };

      const result = profileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it('should allow optional fields', () => {
      const minimalProfile = {
        name: 'Jane Smith',
        rosterOptIn: false,
      };

      const result = profileSchema.safeParse(minimalProfile);
      expect(result.success).toBe(true);
    });
  });

  describe('leadSchema', () => {
    it('should validate valid lead data', () => {
      const validLead = {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '555-0101',
        notes: 'Interested in BYOA',
        stage: 'CONTACTED' as const,
        nextAt: new Date('2025-12-15'),
      };

      const result = leadSchema.safeParse(validLead);
      expect(result.success).toBe(true);
    });

    it('should require name', () => {
      const invalidLead = {
        name: '',
        stage: 'NEW',
      };

      const result = leadSchema.safeParse(invalidLead);
      expect(result.success).toBe(false);
    });

    it('should validate email format', () => {
      const invalidEmail = {
        name: 'John',
        email: 'not-an-email',
        stage: 'NEW' as const,
      };

      const result = leadSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    });

    it('should allow empty string for optional email', () => {
      const leadWithoutEmail = {
        name: 'John',
        email: '',
        stage: 'NEW' as const,
      };

      const result = leadSchema.safeParse(leadWithoutEmail);
      expect(result.success).toBe(true);
    });
  });

  describe('dealSchema', () => {
    it('should validate valid deal data', () => {
      const validDeal = {
        leadId: null,  // leadId is optional
        product: 'Core Tee',
        amountCents: 3800,
        status: 'OPEN' as const,
      };

      const result = dealSchema.safeParse(validDeal);
      expect(result.success).toBe(true);
    });

    it('should require positive amount', () => {
      const invalidDeal = {
        product: 'Core Tee',
        amountCents: -100,
        status: 'OPEN' as const,
      };

      const result = dealSchema.safeParse(invalidDeal);
      expect(result.success).toBe(false);
    });

    it('should require product name', () => {
      const invalidDeal = {
        product: '',
        amountCents: 3800,
        status: 'OPEN' as const,
      };

      const result = dealSchema.safeParse(invalidDeal);
      expect(result.success).toBe(false);
    });
  });

  describe('checkoutSchema', () => {
    it('should validate valid checkout data', () => {
      const validCheckout = {
        email: 'customer@example.com',
        name: 'Customer Name',
        items: [
          {
            productId: 'clz123abc456',  // Valid cuid format
            name: 'Core Tee',
            quantity: 2,
            priceCents: 3800,
          },
        ],
        paymentMethod: 'stripe' as const,
      };

      const result = checkoutSchema.safeParse(validCheckout);
      if (!result.success) {
        console.error('Validation errors:', result.error.errors);
      }
      expect(result.success).toBe(true);
    });

    it('should require valid email', () => {
      const invalidCheckout = {
        email: 'not-an-email',
        name: 'Name',
        items: [{ productId: 'prod_123', name: 'Tee', quantity: 1, priceCents: 3800 }],
        paymentMethod: 'stripe' as const,
      };

      const result = checkoutSchema.safeParse(invalidCheckout);
      expect(result.success).toBe(false);
    });

    it('should require at least one item', () => {
      const emptyCart = {
        email: 'customer@example.com',
        name: 'Name',
        items: [],
        paymentMethod: 'stripe' as const,
      };

      const result = checkoutSchema.safeParse(emptyCart);
      expect(result.success).toBe(false);
    });
  });

  describe('productSchema', () => {
    it('should validate valid product data', () => {
      const validProduct = {
        name: 'Core Tee',
        description: 'Premium cotton tee with BC mark',
        priceCents: 3800,
        category: 'Merch' as const,
        imageUrl: 'https://example.com/image.jpg',
        inStock: true,
      };

      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it('should require positive price', () => {
      const invalidProduct = {
        name: 'Test',
        description: 'Test product',
        priceCents: -100,
        category: 'Merch' as const,
        inStock: true,
      };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it('should validate category enum', () => {
      const invalidCategory = {
        name: 'Test',
        description: 'Test product',
        priceCents: 1000,
        category: 'InvalidCategory',
        inStock: true,
      };

      const result = productSchema.safeParse(invalidCategory);
      expect(result.success).toBe(false);
    });
  });
});

