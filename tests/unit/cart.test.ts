import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addToCart, removeFromCart, updateQuantity, calculateTotal, clearCart, getItemCount } from '@/lib/cart';
import type { CartItem } from '@/lib/cart';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Cart Management', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  const mockProduct: Omit<CartItem, 'quantity'> = {
    productId: 'prod_123',
    name: 'Core Tee',
    description: 'Premium cotton tee',
    priceCents: 3800,
    imageUrl: '/products/core-tee.png',
  };

  describe('calculateTotal', () => {
    it('should calculate total for empty cart', () => {
      const total = calculateTotal([]);
      expect(total).toBe(0);
    });

    it('should calculate total for single item', () => {
      const items: CartItem[] = [{ ...mockProduct, quantity: 1 }];
      const total = calculateTotal(items);
      expect(total).toBe(3800);
    });

    it('should calculate total for multiple quantities', () => {
      const items: CartItem[] = [{ ...mockProduct, quantity: 3 }];
      const total = calculateTotal(items);
      expect(total).toBe(11400); // 3800 * 3
    });

    it('should calculate total for multiple items', () => {
      const items: CartItem[] = [
        { ...mockProduct, quantity: 2 },
        { ...mockProduct, productId: 'prod_456', name: 'Studio Cap', priceCents: 3200, quantity: 1 },
      ];
      const total = calculateTotal(items);
      expect(total).toBe(10800); // (3800 * 2) + 3200
    });
  });

  describe('addToCart', () => {
    it('should add new item to empty cart', () => {
      const cart = addToCart(mockProduct);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe('prod_123');
      expect(cart.items[0].quantity).toBe(1);
      expect(cart.totalCents).toBe(3800);
    });

    it('should increment quantity for existing item', () => {
      addToCart(mockProduct);
      const cart = addToCart(mockProduct);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.totalCents).toBe(7600);
    });

    it('should add different products separately', () => {
      const product2 = { ...mockProduct, productId: 'prod_456', name: 'Studio Cap' };
      
      addToCart(mockProduct);
      const cart = addToCart(product2);

      expect(cart.items).toHaveLength(2);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      addToCart(mockProduct);
      const cart = removeFromCart('prod_123');

      expect(cart.items).toHaveLength(0);
      expect(cart.totalCents).toBe(0);
    });

    it('should not affect other items', () => {
      const product2 = { ...mockProduct, productId: 'prod_456', name: 'Cap', priceCents: 3200 };
      
      addToCart(mockProduct);
      addToCart(product2);
      const cart = removeFromCart('prod_123');

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe('prod_456');
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      addToCart(mockProduct);
      const cart = updateQuantity('prod_123', 5);

      expect(cart.items[0].quantity).toBe(5);
      expect(cart.totalCents).toBe(19000); // 3800 * 5
    });

    it('should remove item when quantity is 0', () => {
      addToCart(mockProduct);
      const cart = updateQuantity('prod_123', 0);

      expect(cart.items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      addToCart(mockProduct);
      const cart = updateQuantity('prod_123', -1);

      expect(cart.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items', () => {
      addToCart(mockProduct);
      clearCart();

      const stored = localStorage.getItem('blackcardinal_cart');
      expect(stored).toBeNull();
    });
  });

  describe('getItemCount', () => {
    it('should return 0 for empty cart', () => {
      const count = getItemCount();
      expect(count).toBe(0);
    });

    it('should return total quantity across all items', () => {
      const product2 = { ...mockProduct, productId: 'prod_456', name: 'Cap' };
      
      addToCart(mockProduct); // quantity 1
      addToCart(mockProduct); // quantity 2
      addToCart(product2); // quantity 1

      const count = getItemCount();
      expect(count).toBe(3); // 2 + 1
    });
  });
});

