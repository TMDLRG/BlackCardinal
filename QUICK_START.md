# 🚀 BlackCardinal Platform - Quick Start Guide

**Get running in 15 minutes!**

---

## ⚡ Super Fast Setup

### Step 1: Install (2 min)
```bash
cd C:\Users\mpolz\Desktop\BC\web
npm install
```

### Step 2: Environment (3 min)
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local with these MINIMUM variables:
```

```env
DATABASE_URL="postgresql://localhost:5432/blackcardinal"
NEXTAUTH_SECRET="test-secret-must-be-at-least-32-chars-long"
NEXTAUTH_URL="http://localhost:3000"
```

**Note**: That's ALL you need for basic testing!

### Step 3: Database (5 min)
```bash
# Push schema
npm run db:push

# Seed with sample data (8 products + test users)
npm run db:seed
```

You'll get:
- ✅ Admin user: `admin@blackcardinal.com`
- ✅ Test founder: `founder@example.com`
- ✅ 8 products (Core Tee, Cap, Mug, BYOA services, etc.)
- ✅ Sample leads and enrollment

### Step 4: Run (1 min)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🎯 What You Can Test Immediately

### Without ANY API Keys
✅ Browse homepage  
✅ Explore store  
✅ Add items to cart  
✅ View cart  
✅ Read Founding 50 pitch  
✅ See public roster  
✅ View bootcamp structure  
✅ Read legal pages  

### With Stripe Test Key (~5 min setup)
Add to `.env.local`:
```env
STRIPE_SECRET_KEY="sk_test_your_stripe_test_key"
```

Get free test key: [stripe.com/register](https://stripe.com)

Then test:
✅ Complete checkout  
✅ Use test card: `4242 4242 4242 4242`  
✅ See order confirmation  
✅ Webhook processes payment  

### With OAuth (~10 min setup)
Add to `.env.local`:
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Setup: [console.cloud.google.com](https://console.cloud.google.com)

Then test:
✅ Sign in with Google  
✅ Access dashboard  
✅ View protected pages  

---

## 🧪 Run Tests (Optional)

### Unit Tests
```bash
npm run test
```

Tests:
- Cart management (add/remove/calculate)
- ICS file generation (calendar exports)
- Form validators (profile, lead, deal)
- Coaching prompt selection

### E2E Tests (Requires Running Server)
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:e2e
```

Tests:
- Homepage accessibility
- Store functionality
- Cart workflow
- (Note: Some tests may fail without full setup - that's okay!)

---

## 🐛 Troubleshooting

### "Database connection failed"
```bash
# Make sure PostgreSQL is running
# Or use a free cloud database:
# - Neon: neon.tech
# - Supabase: supabase.com
# - PlanetScale: planetscale.com

# Update DATABASE_URL in .env.local
```

### "Build fails"
```bash
# Generate Prisma client
npm run db:generate

# Clear cache
rm -rf .next
npm run build
```

### "Can't sign in"
```bash
# Make sure NEXTAUTH_SECRET is set (32+ characters)
# Make sure NEXTAUTH_URL matches your local URL
# For OAuth: Verify redirect URIs in Google Console
```

---

## 📚 Next Steps After Quick Start

### Explore the Code
1. `src/app/` - All pages
2. `src/components/` - UI components
3. `src/lib/` - Core logic (auth, cart, payments)
4. `prisma/schema.prisma` - Database schema

### Read the Docs
1. `README.md` - Detailed setup
2. `ARCHITECTURE.md` - Technical deep-dive
3. `DEPLOYMENT_GUIDE.md` - Production deployment
4. `PROJECT_STATUS.md` - What's complete vs. what's needed

### Start Building
1. **Content Team**: Extract lessons from `book_v11.txt`
2. **Engineers**: Build CRM pages (`/dashboard/leads`, `/dashboard/deals`)
3. **QA**: Run test suite, report bugs
4. **Designer**: Polish UI, create product images

---

## ⏱️ Time Budget

| Task | Time | Difficulty |
|------|------|-----------|
| Install & setup | 15 min | 😊 Easy |
| Test store & cart | 10 min | 😊 Easy |
| Configure Stripe | 15 min | 🙂 Moderate |
| Test checkout | 5 min | 😊 Easy |
| Configure OAuth | 20 min | 🤔 Moderate |
| Deploy to Vercel | 30 min | 🙂 Moderate |
| **Total to Running** | **15 min** | 😊 **Easy** |
| **Total to Demo-Ready** | **45 min** | 🙂 **Moderate** |
| **Total to Production** | **2-4 hours** | 🤔 **Moderate** |

---

## 🎉 Success Indicators

You'll know it's working when:

✅ Homepage loads with logo animation  
✅ Store shows 8 products  
✅ Cart badge updates when adding items  
✅ Cart page shows your items  
✅ Checkout button works  
✅ (With Stripe key) Payment redirects to Stripe  
✅ (With Stripe test card) Order confirms successfully  

---

## 🆘 Need Help?

### Resources
- **Full Setup**: README.md
- **Architecture**: ARCHITECTURE.md
- **Deployment**: DEPLOYMENT_GUIDE.md
- **Feature Status**: PROJECT_STATUS.md
- **Delivery Report**: FINAL_DELIVERY.md

### Common Commands
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run db:studio        # Open database GUI
npm run db:generate      # Regenerate Prisma client
npm run db:seed          # Reseed database
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
```

---

**Time to First Run**: 15 minutes  
**Difficulty**: Easy 😊  
**Prerequisites**: Node.js 18+, PostgreSQL (local or cloud)  
**Result**: Fully functional BlackCardinal platform

**Let's go!** 🚀


