# Deployment Guide - Black Cardinal Web Platform

## Overview

This Next.js application is configured to work with:
- **Local Development**: SQLite database (`src/podcast.db`)
- **Production (Vercel)**: PostgreSQL database

## Local Development Setup

Your current setup already works! The app uses SQLite locally:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run development server
npm run dev
```

Database location: `src/podcast.db`

## Production Deployment to Vercel

### Prerequisites

1. **Vercel Account** (free tier is sufficient)
2. **GitHub Repository** (push your code)

### Step 1: Create Vercel Postgres Database

1. Go to [vercel.com](https://vercel.com) and sign in
2. Create a new project or go to your project settings
3. Go to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose **Free tier** (256 MB storage, 60 compute hours/month)
6. Copy the `DATABASE_URL` connection string

### Step 2: Set Environment Variables in Vercel

In your Vercel project settings → **Environment Variables**, add:

```bash
# Database (Vercel will provide this automatically if you connect the database)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Stripe (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
```

### Step 3: Update Build Settings

Vercel will auto-detect Next.js. Ensure these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Add Build Hook for Prisma

Create a `package.json` postinstall script to generate Prisma client during build:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Step 5: Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or simply:
1. Push to GitHub
2. Import repository in Vercel dashboard
3. Vercel auto-deploys on every push to main

### Step 6: Initialize Production Database

After first deployment, run migrations:

```bash
# Using Vercel CLI
vercel env pull .env.production
npx prisma db push
npx prisma db seed  # If you have seed data
```

Or use Vercel's SQL editor in the dashboard.

## Database Schema Compatibility

**Good news**: Your Prisma schema is already compatible with both SQLite and PostgreSQL! 

The only difference is the `provider` setting. Prisma handles:
- ✅ Type conversions (SQLite's flexible types → Postgres strict types)
- ✅ JSON fields (works in both)
- ✅ DateTime handling
- ✅ Indexes and unique constraints

## Current Configuration

- **Local**: Uses `schema.prisma` with SQLite
- **Production**: Uses same schema, just change provider to `postgresql`

## Switching Between Databases

### Option 1: Manual Switch (Current Setup)
Edit `prisma/schema.prisma` line 9:
- Local: `provider = "sqlite"`
- Production: `provider = "postgresql"`

### Option 2: Automated (Recommended)
Use environment-based schema generation (requires build script modification).

## Testing Production Build Locally

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Issue: "Can't reach database server"
- **Local**: Check `src/podcast.db` exists
- **Production**: Verify `DATABASE_URL` in Vercel env vars

### Issue: "Prisma Client not generated"
- Run: `npm run db:generate`
- Check `postinstall` script runs during Vercel build

### Issue: "Database schema out of sync"
- Run: `npx prisma db push`
- Or create migration: `npx prisma migrate dev`

## Cost Breakdown

### Vercel Free Tier:
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ 100GB-hours serverless function execution
- ✅ Vercel Postgres: 256 MB storage, 60 compute hours/month

**Total Cost: $0/month** (for small-medium traffic)

### When You'll Need to Upgrade:
- \>100GB bandwidth/month
- \>60 hours database compute/month
- \>256 MB database storage
- Need team collaboration features

## Alternative: Railway

If you prefer all-in-one deployment:

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add PostgreSQL plugin (free tier)
4. Railway auto-configures `DATABASE_URL`
5. Deploy

**Railway Free Tier**: $5/month credit (enough for small apps)

## Next Steps

1. ✅ Schema is ready for both SQLite and PostgreSQL
2. ⏭️ Create Vercel account
3. ⏭️ Push code to GitHub
4. ⏭️ Connect repo to Vercel
5. ⏭️ Add Vercel Postgres database
6. ⏭️ Set environment variables
7. ⏭️ Deploy!

Your app will continue working locally with SQLite while running on PostgreSQL in production.

