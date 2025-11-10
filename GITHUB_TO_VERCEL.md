# ✅ Code Pushed to GitHub!

Your code is now live at: **https://github.com/TMDLRG/BlackCardinal**

## Next: Deploy to Vercel (5 minutes)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login (free)

2. **Click "Add New Project"**

3. **Import from GitHub:**
   - Select `TMDLRG/BlackCardinal` repository
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - Click **"Deploy"**

5. **Add PostgreSQL Database:**
   - After deployment, go to your project dashboard
   - Click **"Storage"** tab
   - Click **"Create Database"** → **"Postgres"**
   - Select **"Free"** tier (256 MB, 60 compute hours/month)
   - Click **"Create"**
   - Vercel automatically connects it and adds `DATABASE_URL`

6. **Add Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add these:
   
   ```
   NEXTAUTH_SECRET=<run in terminal: openssl rand -base64 32>
   NEXTAUTH_URL=https://your-project.vercel.app
   ```
   
   (Replace `your-project.vercel.app` with your actual Vercel URL)

7. **Update Schema for Production:**
   - In your local code, change `prisma/schema.prisma` line 9:
     ```prisma
     provider = "postgresql"  // was "sqlite"
     ```
   - Commit and push:
     ```bash
     git add prisma/schema.prisma
     git commit -m "Switch to PostgreSQL for production"
     git push origin main
     ```
   - Vercel auto-redeploys!

8. **Initialize Database:**
   - Go to Vercel project → **Storage** → Your Postgres DB
   - Click **"Query"** tab
   - Or use CLI:
     ```bash
     vercel env pull .env.production
     npx prisma db push
     ```

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to your GitHub repo
vercel link

# Deploy
vercel --prod
```

Then follow steps 5-8 above for database setup.

## 🎉 Your Site Will Be Live!

- **URL**: `https://your-project.vercel.app`
- **Auto-deploys**: Every push to `main` branch
- **Preview deploys**: Every push to other branches
- **HTTPS**: Automatic
- **CDN**: Global edge network
- **Cost**: $0/month (free tier)

## What's Already Configured

✅ Build command includes Prisma generation  
✅ `.vercelignore` excludes local database files  
✅ `vercel.json` configures Next.js properly  
✅ Schema is ready for PostgreSQL  
✅ All dependencies are production-ready  

## Local Development After Deployment

Your local setup continues working with SQLite:

1. Keep `provider = "sqlite"` in your local `prisma/schema.prisma`
2. Run `npm run dev` as usual
3. Local database (`src/podcast.db`) is unaffected

When you want to deploy changes:
1. Change to `provider = "postgresql"`
2. Commit and push
3. Vercel auto-deploys

## Monitoring Your Site

- **Vercel Dashboard** → Your Project → **"Logs"** tab
- **Real-time deployment logs**
- **Runtime logs** for debugging
- **Analytics** (free tier includes basic analytics)

## Need Help?

- Vercel Support: https://vercel.com/docs
- Your deployment guides: `VERCEL_DEPLOYMENT_STEPS.md` and `VERCEL_DIRECT_DEPLOY.md`

---

**Ready to deploy?** Go to [vercel.com](https://vercel.com) and import your GitHub repo!

