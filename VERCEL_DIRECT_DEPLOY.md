# Deploy Directly to Vercel (No GitHub Required)

## Quick Deploy - 5 Minutes

You can deploy directly from your local machine using the Vercel CLI.

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

This opens your browser to authenticate.

## Step 3: Update Schema for Production

**IMPORTANT**: Before deploying, change line 9 in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

## Step 4: Deploy

```bash
# First deployment (creates project)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? blackcardinal (or your choice)
# - Directory? ./ (current directory)
# - Override settings? No
```

This creates a **preview deployment** (for testing).

## Step 5: Add PostgreSQL Database

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Select **Free** tier
6. Click **Create**
7. Click **Connect** → Select your project
8. Vercel automatically adds `DATABASE_URL` environment variable

## Step 6: Add Other Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**:

```
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-project.vercel.app
```

## Step 7: Deploy to Production

```bash
vercel --prod
```

This deploys to your production domain!

## Step 8: Initialize Database

After first production deploy:

```bash
# Pull production environment variables
vercel env pull .env.production

# Push schema to production database
npx prisma db push

# Optional: Seed initial data
npx prisma db seed
```

## 🎉 You're Live!

Your site is now at: `https://your-project.vercel.app`

## Updating Your Site

Every time you make changes:

```bash
# Deploy to production
vercel --prod

# Or deploy to preview first (for testing)
vercel
```

## Switching Back to Local Development

After deploying, switch back to SQLite for local work:

**Change `prisma/schema.prisma` line 9 back to:**
```prisma
provider = "sqlite"
```

Then:
```bash
npm run db:generate
npm run dev
```

## Pro Tip: Use Vercel CLI for Everything

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Open project in browser
vercel open

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add
```

## Alternative: Keep Both Schemas

If you don't want to keep switching the provider:

1. **Keep `schema.prisma` as SQLite** (for local dev)
2. **Use `schema.production.prisma` for production** (already created)
3. **Specify schema during build**:

Update `package.json` → `vercel-build`:
```json
"vercel-build": "prisma generate --schema=prisma/schema.production.prisma && prisma db push --schema=prisma/schema.production.prisma && next build"
```

## Costs

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Vercel Postgres: 256 MB storage, 60 compute hours/month

**Total: $0/month** for small-medium traffic

## Next Steps

1. Run `vercel` command
2. Add Postgres database in dashboard
3. Set environment variables
4. Run `vercel --prod`
5. Initialize database with `prisma db push`

Done! 🚀

