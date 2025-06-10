# Step-by-Step Deployment Guide for Kevin (Marketing Website Only)

## Important Note
You're working on the marketing website only. The `/app` routes are password-protected and not needed for your work. Focus on:
- Homepage (`/`)
- Marketing pages (`/data-owners`, `/media-buyers`, etc.)
- OMG Dashboard (`/omg-unified-dashboard-v3`)

## Prerequisites Setup

### 1. Install Required Software
```bash
# Check if you have Node.js (need v18+)
node --version

# If not installed, download from: https://nodejs.org/
# Or use brew on Mac:
brew install node

# Verify npm is installed
npm --version
```

### 2. Clone the Repository
```bash
# Clone the repo
git clone https://github.com/adamhelfgott/preciseweb2.git
cd preciseweb2

# Switch to the demo branch
git checkout demo-ux-only

# Install dependencies
npm install
```

### 3. Set Up Environment Variables
Create a file called `.env.local` in the root directory:

```bash
# Create the file
touch .env.local
```

Add these contents:
```env
# Required for demo
NEXT_PUBLIC_MOCK_MODE=true

# That's it! No other config needed for marketing pages
# The /app routes are password protected and not your concern
```

## Local Testing

### 1. Run the Development Server
```bash
# Start the app
npm run dev

# You should see:
# ✓ Ready in XXXXms
# ▲ Next.js 15.1.8
# - Local: http://localhost:3000
```

### 2. Test Key Pages
Open http://localhost:3000 and verify:
- Homepage loads with animations
- `/omg-unified-dashboard-v3` - OMG dashboard works (no login needed)
- `/data-owners` - Marketing page loads
- `/media-buyers` - Media buyers page loads
- `/madhive-integration` - Partnership page loads
- `/how-it-works` - Explanation page loads

Note: `/app/*` routes are password protected - you don't need to access these

### Common Issues & Fixes

**Port Already in Use:**
```bash
# If you see "Port 3000 is in use"
# Kill the process:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
npm run dev -- -p 3001
```

**Module Not Found Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

**Build Errors:**
```bash
# Run type check to see issues
npm run type-check

# Try building locally first
npm run build
```

## Vercel Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
# Enter your email
# Confirm via email link
```

### 3. Initial Deployment
```bash
# Run from project root
vercel

# Answer the prompts:
# ? Set up and deploy "~/preciseweb2"? [Y/n] Y
# ? Which scope do you want to deploy to? (Use arrow keys) → Select your team
# ? Link to existing project? [y/N] N
# ? What's your project's name? preciseweb2-demo
# ? In which directory is your code located? ./ (just press enter)

# It will detect Next.js automatically
```

### 4. Set Environment Variables in Vercel
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to Settings → Environment Variables
4. Add just one variable:
   - `NEXT_PUBLIC_MOCK_MODE` = `true`
   
That's it! No other config needed.

### 5. Deploy to Production
```bash
# After environment variables are set
vercel --prod

# You'll get a production URL like:
# https://preciseweb2-demo.vercel.app
```

## Troubleshooting Vercel Deployment

### Build Failing on Vercel?

1. **Check build logs:**
   - Go to Vercel dashboard
   - Click on the failed deployment
   - Read the error messages

2. **Common fixes:**
   ```bash
   # Ensure all TypeScript errors are fixed
   npm run type-check
   
   # Test production build locally
   npm run build
   npm start
   ```

3. **Environment variable issues:**
   - Make sure all env vars are added in Vercel dashboard
   - Use Preview environment for testing

### HTTP 500 Errors?
- Check if `NEXT_PUBLIC_MOCK_MODE=true` is set
- View Function logs in Vercel dashboard

### Images Not Loading?
- The demo uses local images, they should work
- If not, check /public/icons/ directory exists

## Important Notes

1. **This is a DEMO branch** - It uses mock data, no real backend needed
2. **You're working on MARKETING pages only** - Not the app dashboard
3. **Key pages for your work:**
   - `/` - Marketing homepage
   - `/omg-unified-dashboard-v3` - OMG dashboard (no login needed)
   - `/madhive-integration` - Partnership page  
   - `/data-owners` - Data controller benefits
   - `/media-buyers` - Media buyer benefits
   - `/how-it-works` - Platform explanation

4. **What works:**
   - All marketing pages
   - OMG dashboard with mock data
   - All animations and interactions
   
5. **What's password protected (not your concern):**
   - `/app/*` routes - These are for the actual application
   - If you accidentally go there, it will ask for auth (you don't need it)

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run type-check      # Check TypeScript

# Git
git status              # Check changes
git pull origin demo-ux-only  # Get latest updates

# Vercel
vercel                  # Deploy preview
vercel --prod          # Deploy production
vercel env pull        # Sync env vars locally
```

## Contact for Help

If you run into issues:
1. Check the build logs first
2. Try the troubleshooting steps above
3. The PROJECT_HANDOVER_GUIDE.md has more technical details
4. Key files to understand:
   - `/src/app/app/omg-unified-dashboard-v3/page.tsx` - Main dashboard
   - `.env.local` - Environment configuration
   - `vercel.json` - Deployment configuration

Remember: This demo is designed to work without any backend services. If something seems broken, it's likely an environment variable or build issue, not a backend problem.

Good luck! 🚀