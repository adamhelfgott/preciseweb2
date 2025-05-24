# Complete Setup Guide: GitHub + Convex + Vercel

This guide will help you deploy the Precise Platform with all services connected.

## Quick Start (Recommended)

Run these commands in order:

```bash
# 1. Connect to GitHub
./scripts/github-setup.sh

# 2. Set up Convex and deploy to Vercel
./scripts/setup-and-deploy.sh
```

## Manual Setup (Step by Step)

### Step 1: GitHub Setup

#### Option A: Using GitHub CLI
```bash
# Install GitHub CLI (if needed)
brew install gh  # macOS
# or visit: https://cli.github.com/

# Authenticate
gh auth login

# Create repository
gh repo create preciseweb2 --public --source=. --push
```

#### Option B: Manual Setup
1. Create repository at https://github.com/new
2. Don't initialize with README
3. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/preciseweb2.git
git branch -M main
git push -u origin main
```

### Step 2: Convex Setup

```bash
# Install Convex
npm install

# Set up Convex project
npx convex dev

# This will:
# 1. Open browser to authenticate
# 2. Create a new project
# 3. Generate .env.local with credentials
# 4. Start development server

# Deploy Convex to production
npx convex deploy
```

### Step 3: Vercel Setup

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to:
# - Link Vercel account
# - Configure project
# - Set production domain

# Deploy to production
vercel --prod
```

#### Option B: GitHub Integration
1. Push code to GitHub (already done)
2. Go to https://vercel.com/new
3. Import GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `CONVEX_DEPLOY_KEY`
5. Deploy

### Step 4: Environment Variables

#### Local Development (.env.local)
```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=your-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Production (Vercel Dashboard)
Add these in Vercel project settings:
- `NEXT_PUBLIC_CONVEX_URL` - From .env.local
- `CONVEX_DEPLOY_KEY` - From .env.local  
- `NEXT_PUBLIC_APP_URL` - Your Vercel URL

### Step 5: GitHub Actions (Optional)

For automated deployments, add these secrets to GitHub:
1. Go to Settings → Secrets → Actions
2. Add:
   - `VERCEL_TOKEN` - From https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - From Vercel project settings
   - `VERCEL_PROJECT_ID` - From Vercel project settings
   - `NEXT_PUBLIC_CONVEX_URL` - From .env.local

## Verify Everything Works

### Local Development
```bash
npm run dev
# Visit http://localhost:3000
```

### Check Deployments
- **GitHub**: https://github.com/YOUR_USERNAME/preciseweb2
- **Convex Dashboard**: https://dashboard.convex.dev
- **Vercel Dashboard**: https://vercel.com/dashboard

### Test Production
Visit your Vercel URL (e.g., https://preciseweb2.vercel.app)

## Troubleshooting

### Common Issues

**Convex not connecting**
- Check .env.local exists
- Verify NEXT_PUBLIC_CONVEX_URL is set
- Run `npx convex dev` again

**Vercel build failing**
- Check all env vars are set in Vercel
- Verify Node version (should be 18+)
- Check build logs in Vercel dashboard

**GitHub push rejected**
- Make sure you're authenticated: `gh auth status`
- Check remote URL: `git remote -v`

### Reset Everything
```bash
# Remove git
rm -rf .git

# Remove Convex
rm -rf .convex convex.json .env.local

# Start over
./scripts/github-setup.sh
./scripts/setup-and-deploy.sh
```

## Next Steps

1. **Custom Domain**: Add your domain in Vercel settings
2. **Monitoring**: Set up error tracking (Sentry)
3. **Analytics**: Add Vercel Analytics
4. **CI/CD**: GitHub Actions are already configured
5. **Scaling**: Monitor usage in Convex and Vercel dashboards

## Support

- **Convex Docs**: https://docs.convex.dev
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

Happy deploying! 🚀