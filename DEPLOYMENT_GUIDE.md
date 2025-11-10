# BlackCardinal Platform - Deployment Guide

## 🚀 Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Minimum required for development
DATABASE_URL="postgresql://user:password@localhost:5432/blackcardinal"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialize Database
```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

This creates:
- 8 products (Core Tee, Cap, Mug, Hoodie, BYOA services, Founding 50 program)
- Admin user: `admin@blackcardinal.com`
- Test founder: `founder@example.com` (with sample leads)

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Run with Coverage
```bash
npm run test:coverage
```

---

## 🔐 Authentication Setup

### Email Provider (Optional)
For magic link authentication, configure Resend:
```env
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@blackcardinal.com"
```

### Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Add to `.env.local`:
```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

---

## 💳 Stripe Setup (Required for Payments)

### 1. Get Stripe Keys
1. Sign up at [Stripe](https://stripe.com)
2. Get test keys from Dashboard → Developers → API keys

### 2. Configure Environment
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Test with Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date, any CVC

### 4. Stripe Webhook Setup (Development)
Install Stripe CLI:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret:
```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## 🗄️ Database Options

### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
# macOS: brew install postgresql
# Windows: Download from postgresql.org

# Create database
createdb blackcardinal

# Update .env.local
DATABASE_URL="postgresql://localhost:5432/blackcardinal"
```

### Option 2: Neon (Cloud PostgreSQL)
1. Sign up at [Neon](https://neon.tech)
2. Create a new project
3. Copy connection string to `.env.local`

### Option 3: PlanetScale (MySQL-compatible)
1. Sign up at [PlanetScale](https://planetscale.com)
2. Create a new database
3. Copy connection string to `.env.local`

---

## ☁️ Production Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Production database (Neon/PlanetScale)
- Stripe account (live keys)

### 1. Prepare Repository
```bash
# Commit all changes
git add .
git commit -m "Initial BlackCardinal platform"

# Push to GitHub
git remote add origin https://github.com/yourusername/blackcardinal.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```env
# Database
DATABASE_URL="postgresql://..." # Your production database

# NextAuth
NEXTAUTH_SECRET="production-secret-32-chars"
NEXTAUTH_URL="https://blackcardinal.com" # Your domain

# OAuth (if using)
GOOGLE_CLIENT_ID="production-client-id"
GOOGLE_CLIENT_SECRET="production-client-secret"

# Email (if using)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@blackcardinal.com"

# Stripe (IMPORTANT: Use live keys!)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Set up after deployment

# App Config
NEXT_PUBLIC_APP_URL="https://blackcardinal.com"
NEXT_PUBLIC_APP_NAME="BlackCardinal"
```

### 4. Run Database Migrations
```bash
# Using Vercel CLI or in Vercel Dashboard
npm run db:push
npm run db:seed # Only run once for products
```

### 5. Configure Stripe Webhooks (Production)
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://blackcardinal.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret to Vercel env vars:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

### 6. Configure Custom Domain
1. In Vercel Dashboard → Domains
2. Add your domain: `blackcardinal.com` and `www.blackcardinal.com`
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### 7. Update OAuth Redirect URIs
Update authorized redirect URIs in:
- Google Cloud Console: `https://blackcardinal.com/api/auth/callback/google`

---

## 🔧 Post-Deployment Checklist

### Verify Core Functionality
- [ ] Homepage loads correctly
- [ ] Store displays products
- [ ] Authentication works (email or OAuth)
- [ ] Cart adds/removes items
- [ ] Checkout creates Stripe session
- [ ] Test payment completes successfully
- [ ] Order confirmation shows
- [ ] Webhooks fire correctly (check Stripe Dashboard logs)
- [ ] User account created after first purchase
- [ ] Dashboard accessible after login

### Security Checks
- [ ] HTTPS enabled
- [ ] Environment variables not exposed
- [ ] Webhook signatures verified
- [ ] CSRF protection active (Next.js built-in)
- [ ] SQL injection prevented (Prisma parameterization)

### Performance Checks
- [ ] Lighthouse Performance ≥80
- [ ] Images loading correctly
- [ ] No console errors
- [ ] Pages load in <3s

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npm run db:studio # Opens Prisma Studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Auth Not Working
- Verify `NEXTAUTH_SECRET` is set (32+ characters)
- Check `NEXTAUTH_URL` matches your domain
- OAuth: Verify redirect URIs match exactly

### Stripe Checkout Fails
- Use test mode keys in development
- Verify webhook endpoint is accessible
- Check Stripe Dashboard logs for errors
- Ensure `STRIPE_SECRET_KEY` starts with `sk_test_` or `sk_live_`

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

### Database Schema Mismatch
```bash
# Generate Prisma client
npm run db:generate

# Push latest schema
npm run db:push
```

---

## 📊 Monitoring & Maintenance

### View Logs
```bash
# Vercel CLI
vercel logs

# Or in Vercel Dashboard → Deployments → [deployment] → Logs
```

### Database Backups
- **Neon**: Automatic daily backups (free tier: 7-day retention)
- **PlanetScale**: Automatic backups (free tier: 1-day retention)
- **Self-hosted**: Set up pg_dump cron job

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update non-breaking
npm update

# Update Next.js
npm install next@latest

# After updates, test thoroughly
npm run build
npm run test
```

---

## 🔄 Continuous Deployment

Vercel automatically deploys on:
- **main branch** → Production
- **Pull requests** → Preview deployments

### Deployment Workflow
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "Add new feature"`
3. Push to GitHub: `git push origin feature/new-feature`
4. Open PR on GitHub
5. Vercel creates preview deployment (check in PR comments)
6. Review and test preview
7. Merge PR → Auto-deploy to production

---

## 📈 Scaling Considerations

### Database
- Free tiers work for 0-100 users
- Upgrade to paid plans for 100+ users
- Consider read replicas for heavy traffic

### Vercel
- Free tier: 100 GB bandwidth/month
- Pro tier ($20/mo): 1 TB bandwidth + advanced features
- Enterprise: Custom pricing

### CDN & Caching
Vercel provides:
- Global CDN (automatic)
- Edge caching for static assets
- ISR (Incremental Static Regeneration) for pages

---

## 🆘 Support Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
- **NextAuth Docs**: [authjs.dev](https://authjs.dev)
- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## 🎯 Next Steps After Deployment

1. **Test End-to-End**: Run through complete user journey
2. **Set Up Monitoring**: Add error tracking (Sentry)
3. **Analytics**: Add privacy-respecting analytics (Plausible/Umami)
4. **Email Marketing**: Set up welcome sequences
5. **Content**: Complete bootcamp lessons
6. **Marketing**: Launch Founding 50 campaign
7. **Support**: Set up customer support system

---

**Deployment Status**: Ready for Production ✅  
**Estimated Setup Time**: 2-4 hours  
**Required Skills**: Basic command line, GitHub, Vercel familiarity

Good luck with your launch! 🚀


