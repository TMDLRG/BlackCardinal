/**
 * Crypto Payment Adapter Interface
 * Pluggable architecture for multiple crypto payment gateways
 */

export interface CryptoCharge {
  id: string;
  status: 'pending' | 'confirmed' | 'failed' | 'expired';
  amount: {
    cents: number;
    currency: string;
  };
  crypto: {
    amount: string;
    currency: string; // BTC, ETH, USDC, etc.
  };
  checkoutUrl: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
}

export interface CreateChargeParams {
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  metadata?: Record<string, any>;
  redirectUrl?: string;
  cancelUrl?: string;
}

export interface CryptoPaymentAdapter {
  /**
   * Create a new crypto charge/checkout session
   */
  createCharge(params: CreateChargeParams): Promise<CryptoCharge>;

  /**
   * Get charge details by ID
   */
  getCharge(chargeId: string): Promise<CryptoCharge>;

  /**
   * Verify webhook signature
   */
  verifyWebhook(payload: string, signature: string, secret: string): boolean;

  /**
   * Parse webhook event
   */
  parseWebhookEvent(payload: string): {
    type: 'charge:pending' | 'charge:confirmed' | 'charge:failed';
    charge: CryptoCharge;
  };
}

/**
 * Default/Stub Crypto Adapter (for development)
 */
export class DefaultCryptoAdapter implements CryptoPaymentAdapter {
  async createCharge(params: CreateChargeParams): Promise<CryptoCharge> {
    const chargeId = `test_charge_${Date.now()}`;
    
    return {
      id: chargeId,
      status: 'pending',
      amount: {
        cents: params.priceCents,
        currency: params.currency,
      },
      crypto: {
        amount: '0.00015', // Mock BTC amount
        currency: 'BTC',
      },
      checkoutUrl: `/checkout/crypto/${chargeId}`,
      metadata: params.metadata,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    };
  }

  async getCharge(chargeId: string): Promise<CryptoCharge> {
    // Mock implementation
    return {
      id: chargeId,
      status: 'pending',
      amount: { cents: 5000, currency: 'USD' },
      crypto: { amount: '0.00015', currency: 'BTC' },
      checkoutUrl: `/checkout/crypto/${chargeId}`,
      createdAt: new Date(),
    };
  }

  verifyWebhook(payload: string, signature: string, secret: string): boolean {
    // Mock verification - always returns true in test mode
    return true;
  }

  parseWebhookEvent(payload: string): any {
    const data = JSON.parse(payload);
    return {
      type: data.type || 'charge:pending',
      charge: data.charge,
    };
  }
}

/**
 * Coinbase Commerce Adapter (placeholder for actual implementation)
 */
export class CoinbaseCommerceAdapter implements CryptoPaymentAdapter {
  private apiKey: string;
  private baseUrl = 'https://api.commerce.coinbase.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createCharge(params: CreateChargeParams): Promise<CryptoCharge> {
    // TODO: Implement actual Coinbase Commerce API call
    // For now, return mock data
    console.warn('Coinbase Commerce adapter not fully implemented - using mock data');
    return new DefaultCryptoAdapter().createCharge(params);
  }

  async getCharge(chargeId: string): Promise<CryptoCharge> {
    // TODO: Implement actual API call
    return new DefaultCryptoAdapter().getCharge(chargeId);
  }

  verifyWebhook(payload: string, signature: string, secret: string): boolean {
    // TODO: Implement Coinbase Commerce webhook signature verification
    return new DefaultCryptoAdapter().verifyWebhook(payload, signature, secret);
  }

  parseWebhookEvent(payload: string): any {
    // TODO: Parse Coinbase Commerce webhook format
    return new DefaultCryptoAdapter().parseWebhookEvent(payload);
  }
}

/**
 * Adapter Factory - returns the appropriate adapter based on config
 */
export function getCryptoAdapter(provider: string = 'default', apiKey?: string): CryptoPaymentAdapter {
  switch (provider.toLowerCase()) {
    case 'coinbase':
      if (!apiKey) {
        console.warn('Coinbase Commerce API key not provided, falling back to default adapter');
        return new DefaultCryptoAdapter();
      }
      return new CoinbaseCommerceAdapter(apiKey);
    case 'default':
    default:
      return new DefaultCryptoAdapter();
  }
}

