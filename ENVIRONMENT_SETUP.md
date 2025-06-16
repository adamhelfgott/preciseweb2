# Environment Setup Guide

## Overview

This project uses different Convex databases for development and production:
- **Development**: peaceful-monitor-946
- **Production**: perceptive-pelican-227

## Local Development Setup

1. **Environment Variables (.env.local)**
   ```bash
   # OpenAI API Key
   OPENAI_API_KEY=sk-proj-...

   # Development Convex Configuration
   NEXT_PUBLIC_CONVEX_URL=https://peaceful-monitor-946.convex.cloud
   CONVEX_DEPLOYMENT=dev:peaceful-monitor-946

   # DO NOT include CONVEX_DEPLOY_KEY in .env.local
   ```

2. **Development Commands**
   ```bash
   # Start Convex dev server (in one terminal)
   npm run dev:convex

   # Start Next.js dev server (in another terminal)
   npm run dev
   ```

3. **Local Build Test**
   ```bash
   npm run build
   ```

## Production Deployment (Vercel)

### Required Vercel Environment Variables

1. **NEXT_PUBLIC_CONVEX_URL**
   - Value: `https://perceptive-pelican-227.convex.cloud`
   - Environments: Production

2. **CONVEX_DEPLOY_KEY**
   - Value: `prod:perceptive-pelican-227|eyJ2MiI6IjMyNzUwM2VmOTBiOTRlNGNhZTYzODBkZmI0ZjliOTUzIn0=`
   - Environments: Production, Preview

3. **OPENAI_API_KEY**
   - Value: Your OpenAI API key
   - Environments: Production, Preview, Development

### Deployment Commands

```bash
# Deploy to Vercel (production)
vercel --prod

# Deploy Convex functions to production
npm run convex:deploy
```

## How It Works

### Local Development
- Uses `.env.local` with development Convex URL
- NO `CONVEX_DEPLOY_KEY` in local environment
- Connects to `peaceful-monitor-946` database
- `npx convex dev` uses `CONVEX_DEPLOYMENT` from .env.local

### Production (Vercel)
- Uses Vercel environment variables
- `CONVEX_DEPLOY_KEY` authenticates production deployments
- Connects to `perceptive-pelican-227` database
- Build process uses deploy key for production codegen

## Important Notes

1. **Never commit `.env.local` to git**
2. **Keep `CONVEX_DEPLOY_KEY` only in Vercel, not local files**
3. **Development and production databases are separate**
4. **Data must be manually migrated between environments**

## Troubleshooting

### "Invalid Convex deploy key" Error
- Ensure `CONVEX_DEPLOY_KEY` is NOT in your `.env.local`
- Verify the key is correctly set in Vercel

### Wrong Database in Production
- Check `NEXT_PUBLIC_CONVEX_URL` in Vercel settings
- Should be `https://perceptive-pelican-227.convex.cloud`

### Local Development Using Production DB
- Remove `CONVEX_DEPLOY_KEY` from `.env.local`
- Ensure `CONVEX_DEPLOYMENT` points to dev environment

## Database Migration

To copy data from development to production:
```bash
# Export from development
npx convex export --path dev-export.zip

# Temporarily set deploy key
export CONVEX_DEPLOY_KEY="prod:perceptive-pelican-227|..."

# Import to production
npx convex import dev-export.zip --prod

# Unset deploy key
unset CONVEX_DEPLOY_KEY
```