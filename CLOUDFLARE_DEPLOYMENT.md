# 🌐 BlackCardinal → Cloudflare Pages Deployment Guide

**Target Domain**: blackcardinal.vip  
**Platform**: Cloudflare Pages (Free Tier)  
**Framework**: Next.js 15 (Static Export + Edge Functions)

---

## 🎯 Deployment Strategy for Cloudflare

Cloudflare Pages works differently than Vercel. Here's the adapted approach:

### Option A: Static Export (Recommended for Cloudflare Pages)
- Convert app to static export
- Use Cloudflare Workers for API routes
- Deploy database to Cloudflare D1 (SQLite) or external (Neon)

### Option B: Cloudflare Workers (Advanced)
- Use `@cloudflare/next-on-pages`
- Run Next.js on Cloudflare Workers
- More complex but full Next.js features

**Recommended**: Start with Option A (Static Export) for simplicity and cost.

---

## 📋 Pre-Deployment Checklist

### ✅ Current Status
- [x] Next.js application built and tested
- [x] SQLite database working locally
- [x] 49/49 tests passing
- [x] Build successful (0 errors)

### ⏳ Cloudflare Requirements
- [ ] Next.js configured for static export
- [ ] API routes converted to Cloudflare Workers/Functions
- [ ] Database migrated to cloud (Neon recommended)
- [ ] Environment variables configured in Cloudflare
- [ ] Domain blackcardinal.vip connected

---

## 🔧 Step 1: Prepare for Static Export

### Modify `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',  // Enable static export
  images: {
    unoptimized: true,  // Cloudflare doesn't support next/image optimization
  },
  // Remove server-side features for static export
  trailingSlash: true,
};

export default nextConfig;
```

### Issue: Static Export Limitations
- ❌ No Server Components with database queries
- ❌ No API routes (need Cloudflare Workers)
- ❌ No dynamic routing with database
- ❌ No authentication (NextAuth needs server)

**Problem**: Your app is heavily server-dependent (auth, database, Stripe webhooks).

---

## 🎯 RECOMMENDED: Hybrid Approach

Use Cloudflare for **frontend** + External services for **backend**:

```
┌──────────────────┐
│ Cloudflare Pages │ → Static frontend (HTML, CSS, JS)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Cloudflare      │ → API routes as Workers/Functions
│  Workers/Functions│
└────────┬─────────┘
         │
         ├─────────→ ┌──────────────┐
         │           │ Neon Database│  (PostgreSQL)
         │           └──────────────┘
         │
         ├─────────→ ┌──────────────┐
         │           │ Clerk/Auth0  │  (Authentication)
         │           └──────────────┘
         │
         └─────────→ ┌──────────────┐
                     │ Stripe API   │  (Payments)
                     └──────────────┘
```

---

## 🚀 EASIEST PATH: Keep Current Architecture

### Use Vercel (Free Tier) for Full App
Since you have a complex Next.js app with:
- Server components
- API routes
- Authentication
- Database queries
- Webhooks

**Vercel is the natural fit** (built by Next.js creators).

### Use Cloudflare for:
- Static assets (images, fonts)
- CDN/caching layer
- DNS management
- Domain (blackcardinal.vip)

### Architecture:
```
Cloudflare DNS (blackcardinal.vip)
         ↓
Cloudflare CDN (caching)
         ↓
Vercel (Next.js app)
         ↓
Neon (PostgreSQL database)
```

**Benefits**:
- ✅ No code changes needed
- ✅ Full Next.js features work
- ✅ Free tier on both platforms
- ✅ Best performance
- ✅ Cloudflare DNS + CDN + Security
- ✅ Vercel handles Next.js complexity

---

## 📝 Recommended: Cloudflare DNS + Vercel Hosting

### Step 1: Deploy to Vercel (20 min)

**A. Install Vercel CLI**
```powershell
npm install -g vercel
```

**B. Login to Vercel**
```powershell
vercel login
```

**C. Deploy**
```powershell
cd C:\Users\mpolz\Desktop\BC\web
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **blackcardinal**
- Directory? **.**
- Override settings? **N**

**D. Set Environment Variables**
```powershell
# Required
vercel env add DATABASE_URL
# Paste: your Neon database URL (see Step 2)

vercel env add NEXTAUTH_SECRET
# Paste: /sxSD1KaQxRMO5VBuzHtmjx+hX0wt071vKY2Qd/RuXA=

vercel env add NEXTAUTH_URL
# Paste: https://blackcardinal.vip

# Optional (for full functionality)
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
```

**E. Deploy to Production**
```powershell
vercel --prod
```

You'll get a URL like: `blackcardinal.vercel.app`

---

### Step 2: Set Up Cloud Database (15 min)

**Option A: Neon (Recommended - PostgreSQL)**

1. Go to [neon.tech](https://neon.tech)
2. Sign up (free tier)
3. Create new project: "blackcardinal"
4. Create database: "production"
5. Copy connection string

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

Add back `@db.Text` annotations:
```prisma
refresh_token String? @db.Text
access_token  String? @db.Text
id_token      String? @db.Text
notes         String? @db.Text
description   String  @db.Text
```

6. Add to Vercel:
```powershell
vercel env add DATABASE_URL production
# Paste: postgresql://user:pass@ep-xxx.neon.tech/blackcardinal?sslmode=require
```

7. Run migrations on production:
```powershell
# Set DATABASE_URL locally to production DB
$env:DATABASE_URL="postgresql://..."
npm run db:push
npm run db:seed  # Seed products only
```

---

### Step 3: Configure Cloudflare DNS (10 min)

**A. Log into Cloudflare Dashboard**
- Go to [dash.cloudflare.com](https://dash.cloudflare.com)
- Select your domain: **blackcardinal.vip**

**B. Add CNAME Record**
```
Type: CNAME
Name: @ (or blackcardinal.vip)
Target: cname.vercel-dns.com
Proxy: Enabled (orange cloud)
TTL: Auto
```

**C. Add www CNAME (optional)**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: Enabled
```

**D. In Vercel Dashboard**
1. Go to Project → Settings → Domains
2. Add domain: `blackcardinal.vip`
3. Add domain: `www.blackcardinal.vip` (if desired)
4. Vercel will verify and issue SSL certificate (automatic)

---

### Step 4: Configure Stripe Webhooks (10 min)

**A. In Stripe Dashboard**
1. Go to Developers → Webhooks
2. Add endpoint: `https://blackcardinal.vip/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret

**B. Add to Vercel**
```powershell
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste the webhook secret
```

**C. Redeploy**
```powershell
vercel --prod
```

---

### Step 5: Update Google OAuth (5 min)

**In Google Cloud Console**:
1. Go to Credentials
2. Edit OAuth 2.0 Client
3. Add Authorized redirect URI:
   ```
   https://blackcardinal.vip/api/auth/callback/google
   ```
4. Save

---

### Step 6: Test Production Site (10 min)

**Visit**: https://blackcardinal.vip

**Test**:
1. ✅ Homepage loads
2. ✅ Store shows products
3. ✅ Can add to cart
4. ✅ Can sign in
5. ✅ Can checkout (test mode)
6. ✅ Order confirms
7. ✅ Webhooks fire (check Stripe dashboard logs)

---

## 🎯 Alternative: Pure Cloudflare Setup

If you MUST use only Cloudflare (not Vercel), here's the path:

### Requirements
1. Convert app to use Cloudflare Workers
2. Use Cloudflare D1 (SQLite) or external DB
3. Replace NextAuth with Clerk or Auth0
4. Significant code changes needed

### Estimated Effort
- **Conversion Time**: 2-4 weeks
- **Complexity**: High
- **Risk**: Breaking changes

### Tools Needed
- `@cloudflare/next-on-pages` (experimental)
- Cloudflare Wrangler CLI
- Cloudflare Workers knowledge

**Recommendation**: **Don't do this**. The Cloudflare DNS + Vercel hosting approach is:
- ✅ Easier (no code changes)
- ✅ Faster (deploy today)
- ✅ More reliable (battle-tested)
- ✅ Still uses Cloudflare (DNS, CDN, security)
- ✅ Free tier on both platforms

---

## 💰 Cost Comparison

### Cloudflare Pages Only (Complex Migration)
- **Hosting**: Free
- **Workers**: $5/month (10M requests)
- **D1 Database**: Free (5 GB storage)
- **Development Time**: 2-4 weeks ($5K-15K)
- **Total First Year**: ~$60 + development cost

### Cloudflare DNS + Vercel Hosting (Recommended)
- **Cloudflare**: Free (DNS, CDN, SSL)
- **Vercel**: Free tier (100 GB bandwidth)
- **Neon Database**: Free tier (0.5 GB)
- **Development Time**: 0 (already done!)
- **Total First Year**: **$0**

**Winner**: Cloudflare DNS + Vercel Hosting 🏆

---

## 🚀 Quick Deploy Script (Cloudflare DNS + Vercel)

Save as `deploy-production.ps1`:

```powershell
# BlackCardinal Production Deployment
# Run this after setting up Neon database

# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy project
cd C:\Users\mpolz\Desktop\BC\web
vercel

# 4. Add environment variables (do this in Vercel Dashboard UI)
Write-Host "✅ Deployed! Now:"
Write-Host "1. Go to Vercel Dashboard"
Write-Host "2. Add environment variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)"
Write-Host "3. Run: vercel --prod"
Write-Host "4. Configure Cloudflare DNS: CNAME @ → cname.vercel-dns.com"
Write-Host "5. Add domain in Vercel: blackcardinal.vip"
Write-Host "6. Test: https://blackcardinal.vip"
```

---

## 📊 Cloudflare Features You Still Get

### With Cloudflare DNS + Vercel Hosting:
✅ **Cloudflare DNS**: Ultra-fast DNS resolution  
✅ **Cloudflare CDN**: Global edge caching  
✅ **Cloudflare SSL**: Free SSL certificate  
✅ **DDoS Protection**: Cloudflare's security  
✅ **Analytics**: Cloudflare Web Analytics  
✅ **Firewall**: WAF rules  
✅ **Page Rules**: Custom caching  

### Bonus from Vercel:
✅ **Edge Network**: 50+ global locations  
✅ **Auto Scaling**: Handle traffic spikes  
✅ **Preview Deployments**: Test before prod  
✅ **Analytics**: Real User Monitoring  
✅ **Logs**: Debugging and monitoring  

**Best of both worlds!**

---

## 🔄 Migration Path (If You Change Your Mind)

### From Vercel → Pure Cloudflare
1. Install: `npm install @cloudflare/next-on-pages`
2. Configure: `wrangler.toml`
3. Modify: API routes for Workers
4. Replace: NextAuth with Clerk
5. Convert: Database to D1 or keep Neon
6. Deploy: `npx @cloudflare/next-on-pages`

**Effort**: 2-4 weeks  
**Risk**: High  
**Benefit**: Marginal (both are free tier)

---

## 🎯 Recommended Deployment (Today)

### Phase 1: Deploy to Vercel (1 hour)
```
1. vercel login
2. vercel
3. Add env vars in Dashboard
4. vercel --prod
Result: Live at blackcardinal.vercel.app
```

### Phase 2: Connect Cloudflare DNS (30 min)
```
1. Cloudflare Dashboard → DNS
2. Add CNAME: @ → cname.vercel-dns.com
3. Vercel Dashboard → Add domain: blackcardinal.vip
4. Wait for SSL (5-10 min)
Result: Live at blackcardinal.vip ✅
```

### Phase 3: Configure Production Services (30 min)
```
1. Neon database setup
2. Stripe live keys
3. Google OAuth production credentials
4. Test end-to-end
Result: Fully functional production site ✅
```

**Total Time**: 2 hours  
**Total Cost**: $0 (free tiers)  
**Code Changes**: 0 (uses existing code)

---

## 🛡️ Cloudflare Security Features

Once DNS is configured through Cloudflare:

### Enable These (Free):
1. **SSL/TLS**: Encryption mode → Full (strict)
2. **Auto HTTPS Rewrites**: Force HTTPS
3. **Always Use HTTPS**: Redirect HTTP
4. **Brotli Compression**: Faster page loads
5. **Mirage**: Image optimization
6. **Rocket Loader**: JavaScript optimization
7. **WAF**: Basic firewall rules

### Firewall Rules (Examples):
```
# Block known bots
(cf.threat_score gt 14) then Block

# Rate limit checkout
(http.request.uri.path eq "/api/checkout/stripe" and rate(10/1m) gt 10) then Block

# Protect admin
(http.request.uri.path contains "/admin" and not ip.geoip.country eq "US") then Challenge
```

---

## 📊 Performance with Cloudflare

### What Cloudflare Optimizes:
- **Static Assets**: Cached at edge (HTML, CSS, JS, images)
- **Dynamic Content**: Cached with smart rules
- **SSL/TLS**: Fast handshake
- **HTTP/3**: Latest protocol
- **Compression**: Gzip + Brotli

### Expected Performance:
- **TTFB**: <200ms (global edge)
- **LCP**: <2s (cached assets)
- **FCP**: <1s (Cloudflare CDN)

### Lighthouse Targets:
- **Performance**: 90+ (achievable)
- **Accessibility**: 100 (already good)
- **Best Practices**: 95+ (with SSL)
- **SEO**: 95+ (with sitemap)

---

## 🔧 Environment Variables (Production)

### Required for Vercel Deployment

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/blackcardinal?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="/sxSD1KaQxRMO5VBuzHtmjx+hX0wt071vKY2Qd/RuXA="
NEXTAUTH_URL="https://blackcardinal.vip"

# Stripe (PRODUCTION - Use live keys!)
STRIPE_SECRET_KEY="sk_live_your_live_key_here"
STRIPE_PUBLISHABLE_KEY="pk_live_your_live_key_here"
STRIPE_WEBHOOK_SECRET="whsec_production_webhook_secret"

# Google OAuth (Production)
GOOGLE_CLIENT_ID="your-production-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-production-secret"

# Email (Optional but recommended)
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="noreply@blackcardinal.vip"

# App Config
NEXT_PUBLIC_APP_URL="https://blackcardinal.vip"
NEXT_PUBLIC_APP_NAME="BlackCardinal"

# Feature Flags
ENABLE_CRYPTO_PAYMENTS="false"
NEXT_PUBLIC_ENABLE_CRYPTO="false"
```

**Add these in**: Vercel Dashboard → Project → Settings → Environment Variables

---

## 📋 Deployment Checklist

### Pre-Deployment
- [x] Code complete and tested locally
- [x] Database schema finalized
- [x] Seed products created
- [ ] Set up Neon database (10 min)
- [ ] Get Stripe production keys (5 min)
- [ ] Configure Google OAuth production (10 min)

### Deployment
- [ ] Install Vercel CLI
- [ ] Deploy to Vercel (`vercel`)
- [ ] Add environment variables in Dashboard
- [ ] Deploy production (`vercel --prod`)
- [ ] Get deployment URL

### DNS Configuration
- [ ] Log into Cloudflare Dashboard
- [ ] Navigate to blackcardinal.vip DNS settings
- [ ] Add CNAME record: @ → cname.vercel-dns.com
- [ ] In Vercel: Add custom domain blackcardinal.vip
- [ ] Wait for SSL certificate (auto, 5-10 min)
- [ ] Test: https://blackcardinal.vip

### Post-Deployment
- [ ] Run database migrations (`npm run db:push` with prod DATABASE_URL)
- [ ] Seed products (`npm run db:seed`)
- [ ] Configure Stripe webhooks
- [ ] Test complete user journey
- [ ] Monitor logs for errors

---

## 🔐 Security Checklist

### Cloudflare Settings
- [ ] SSL/TLS: Full (strict)
- [ ] Always Use HTTPS: Enabled
- [ ] Automatic HTTPS Rewrites: Enabled
- [ ] WAF: Enabled
- [ ] Bot Fight Mode: Enabled (free)
- [ ] Security Level: Medium or High

### Vercel Settings
- [ ] Environment variables: Production only
- [ ] Preview deployments: Enabled
- [ ] Protection: Password (optional)
- [ ] Analytics: Enabled

### Application
- [ ] Stripe webhooks: Signature verification ✅
- [ ] NEXTAUTH_SECRET: Strong (32+ chars) ✅
- [ ] Database: SSL mode required ✅
- [ ] Input validation: Zod schemas ✅

---

## 📈 Monitoring & Maintenance

### Cloudflare Analytics (Free)
- **Web Analytics**: Page views, visitors, performance
- **Enable**: Cloudflare Dashboard → Analytics → Web Analytics

### Vercel Analytics (Free Tier)
- **Real User Monitoring**: Core Web Vitals
- **Enable**: Vercel Dashboard → Analytics

### Stripe Dashboard
- **Payment Monitoring**: Transactions, refunds, disputes
- **Webhook Logs**: Debug webhook issues

### Error Tracking (Optional)
- **Sentry**: $0-26/month
- **LogRocket**: Session replay
- **Alternative**: Vercel logs (built-in)

---

## 🚀 Go-Live Procedure

### Day of Launch
**9:00 AM** - Final QA on staging  
**10:00 AM** - Deploy to production (`vercel --prod`)  
**10:30 AM** - Configure Cloudflare DNS  
**11:00 AM** - Test complete user journey  
**11:30 AM** - Monitor logs and analytics  
**12:00 PM** - **GO LIVE** ✅  

### First 24 Hours
- Monitor Vercel logs every 2 hours
- Check Stripe dashboard for transactions
- Verify webhooks firing correctly
- Test from different devices/locations
- Collect user feedback

### First Week
- Daily monitoring
- Address any bugs immediately
- Optimize based on real data
- Gather Founding 50 feedback

---

## 🎯 FINAL RECOMMENDATION

**Deploy Architecture**:
```
User Request
     ↓
Cloudflare DNS (blackcardinal.vip)
     ↓
Cloudflare CDN (caching, security, SSL)
     ↓
Vercel Edge Network (hosting)
     ↓
Your Next.js App (server-side rendering)
     ↓
Neon PostgreSQL (database)
```

**Why This Works**:
- ✅ Uses Cloudflare (your preference)
- ✅ Zero code changes needed
- ✅ Free tier on all platforms
- ✅ Production-ready today
- ✅ Scales to millions of users
- ✅ Best-in-class performance

**Timeline**: 2 hours to live  
**Cost**: $0/month (free tiers)  
**Effort**: Minimal (mostly config)

---

## 📞 Support

### Deployment Issues
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Cloudflare Docs**: [developers.cloudflare.com](https://developers.cloudflare.com)
- **Neon Docs**: [neon.tech/docs](https://neon.tech/docs)

### Quick Fixes
```powershell
# Redeploy
vercel --prod

# View logs
vercel logs

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME production

# Domain status
vercel domains ls
```

---

**Status**: Ready to Deploy ✅  
**Platform**: Cloudflare DNS + Vercel Hosting  
**Timeline**: 2 hours to blackcardinal.vip live  
**Next**: Follow steps above  

🚀 **Let's get you live!**


