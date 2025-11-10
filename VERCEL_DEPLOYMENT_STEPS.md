# Quick Vercel Deployment Guide

## ✅ Your App is Ready to Deploy!

Everything is configured. Here's the 5-minute deployment process:

## Step 1: Push to GitHub (if not already done)

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Create Vercel Account & Import Project

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (free)
3. Click **"Add New Project"**
4. Select your `web` repository
5. Click **"Import"**

## Step 3: Add PostgreSQL Database

1. In your Vercel project dashboard, go to **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose **"Free"** plan (256 MB, 60 compute hours/month)
5. Click **"Create"**
6. Vercel automatically adds `DATABASE_URL` to your environment variables

## Step 4: Add Environment Variables

In **Settings** → **Environment Variables**, add:

### Required:
```
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-project.vercel.app
```

### Optional (if using Stripe):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

**Note**: `DATABASE_URL` is automatically set when you create the Postgres database.

## Step 5: Update Schema for Production

Before deploying, you need to change ONE line in `prisma/schema.prisma`:

**Change line 9 from:**
```prisma
provider = "sqlite"
```

**To:**
```prisma
provider = "postgresql"
```

Then commit and push:
```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push
```

Vercel will auto-deploy!

## Step 6: Initialize Database Schema

After first deployment:

1. Go to your Vercel project → **Storage** → **Your Postgres DB**
2. Click **"Query"** tab
3. Or use Vercel CLI:

```bash
# Pull production environment variables
vercel env pull .env.production

# Push schema to production database
npx prisma db push

# Optional: Seed with initial data
npx prisma db seed
```

## Step 7: Verify Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test login flow
3. Test bootcamp functionality
4. Check database is persisting data

## 🎉 You're Live!

Your site will now:
- ✅ Auto-deploy on every GitHub push
- ✅ Have HTTPS automatically
- ✅ Scale automatically
- ✅ Have preview deployments for branches
- ✅ Cost $0/month (free tier)

## Switching Back to Local Development

To work locally after deploying:

1. Change `prisma/schema.prisma` back to `provider = "sqlite"`
2. Run `npm run db:generate`
3. Run `npm run dev`

Your local SQLite database (`src/podcast.db`) remains unchanged.

## Pro Tip: Branch-Based Development

Keep `provider = "postgresql"` on `main` branch (for production).
Use `provider = "sqlite"` on feature branches (for local dev).

Or better yet, use the environment variable approach (see DEPLOYMENT.md for advanced setup).

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

## Monitoring & Logs

- **Vercel Dashboard** → Your Project → **"Logs"** tab
- **Real-time logs** during deployment
- **Runtime logs** for debugging production issues

