# Environment Variables Template

Copy these to your `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/blackcardinal?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Provider (Resend or Mailgun)
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@blackcardinal.com"
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Stripe
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"

# Crypto Payments (optional, feature-flagged)
ENABLE_CRYPTO_PAYMENTS="false"
COINBASE_COMMERCE_API_KEY="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
COINBASE_COMMERCE_WEBHOOK_SECRET="xxxxxxxxxxxxx"

# File Storage (S3 or Vercel Blob)
S3_BUCKET="blackcardinal-assets"
S3_ACCESS_KEY_ID="xxxxxxxxxxxxx"
S3_SECRET_ACCESS_KEY="xxxxxxxxxxxxx"
S3_REGION="us-east-1"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

