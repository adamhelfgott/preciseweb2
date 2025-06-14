# 🚨 VERIFY SANITY IS WORKING ON VERCEL

## The Problem
The content IS in Sanity (we verified this), but the website might be showing fallback content because:
1. Sanity environment variables might not be set in Vercel
2. Some pages (like how-it-works) are completely hardcoded and don't use CMS

## Quick Check

Open browser console on https://preciseweb.vercel.app and look for:
- `[useSanityData] Fetching with query:` messages
- `[useSanityData] Result:` messages
- Any errors about Sanity

## Vercel Environment Variables

Make sure these are set in Vercel dashboard (Settings → Environment Variables):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=qjy49msn
NEXT_PUBLIC_SANITY_DATASET=production
```

⚠️ **IMPORTANT**: These MUST have `NEXT_PUBLIC_` prefix to work in client components!

## Pages Using CMS vs Hardcoded

### ✅ Using CMS (with fallback):
- **Homepage** (`/`) - HeroSectionWithCMS, TeamSectionWithCMS, etc.
- **Data Owners** (`/data-owners`) - Some sections
- **Advertisers** (`/advertisers`) - Some sections

### ❌ Completely Hardcoded:
- **How It Works** (`/how-it-works`) - ALL CONTENT IS HARDCODED!
  - The 92% accuracy is hardcoded on line 100
  - The -47% CAC is hardcoded on line 344
  - The 3.2x ROAS is hardcoded on line 349

## Why You're Seeing "Default" Content

1. **For CMS pages**: If Sanity env vars aren't set in Vercel, it falls back to hardcoded content
2. **For hardcoded pages**: They NEVER use Sanity, so they always show the same content

## To Fix This

### Option 1: Quick Fix (Just Set Env Vars)
1. Go to https://vercel.com/adamhelfgott/preciseweb2/settings/environment-variables
2. Add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `qjy49msn`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. Redeploy

### Option 2: Complete Fix (Make How-It-Works Use CMS)
The how-it-works page needs to be refactored to use CMS components like:
- HowItWorksSectionWithCMS
- Create MediaBuyerBenefitsWithCMS
- Create ResultsMetricsWithCMS

## Verify It's Working

After setting env vars and redeploying:
1. Check browser console for `[useSanityData]` logs
2. Change content in Sanity Studio
3. See if it updates on the website

Your content IS in Sanity, but the website might not be fetching it!