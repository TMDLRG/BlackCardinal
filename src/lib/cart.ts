/**
 * Shopping Cart State Management
 * Client-side cart with localStorage persistence
 */

export interface CartItem {
  productId: string;
  name: string;
  description: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
  totalCents: number;
}

const CART_STORAGE_KEY = 'blackcardinal_cart';

/**
 * Get cart from localStorage
 */
export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], totalCents: 0 };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { items: [], totalCents: 0 };
    }

    const cart = JSON.parse(stored) as Cart;
    return cart;
  } catch (error) {
    console.error('Failed to load cart:', error);
    return { items: [], totalCents: 0 };
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}

/**
 * Calculate cart total
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

/**
 * Add item to cart
 */
export function addToCart(product: Omit<CartItem, 'quantity'>): Cart {
  const cart = getCart();
  
  // Check if item already exists
  const existingIndex = cart.items.findIndex((item) => item.productId === product.productId);
  
  if (existingIndex >= 0) {
    // Increment quantity
    cart.items[existingIndex].quantity += 1;
  } else {
    // Add new item
    cart.items.push({ ...product, quantity: 1 });
  }
  
  cart.totalCents = calculateTotal(cart.items);
  saveCart(cart);
  
  return cart;
}

/**
 * Remove item from cart
 */
export function removeFromCart(productId: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.productId !== productId);
  cart.totalCents = calculateTotal(cart.items);
  saveCart(cart);
  
  return cart;
}

/**
 * Update item quantity
 */
export function updateQuantity(productId: string, quantity: number): Cart {
  const cart = getCart();
  const item = cart.items.find((item) => item.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      // Remove if quantity is 0 or negative
      return removeFromCart(productId);
    }
    
    item.quantity = quantity;
    cart.totalCents = calculateTotal(cart.items);
    saveCart(cart);
  }
  
  return cart;
}

/**
 * Clear cart
 */
export function clearCart(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items: [], totalCents: 0 } }));
}

/**
 * Get item count
 */
export function getItemCount(): number {
  const cart = getCart();
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

