# Precise Project Handover Guide

## Project Overview

This repository contains the Precise.ai platform - a privacy-preserving data collaboration platform for advertising campaigns. The codebase includes:

1. **Marketing Website** - Public-facing site explaining Precise's value proposition
2. **Application Dashboard** - Authenticated app for Data Controllers and Media Buyers
3. **OMG Unified Dashboard** - Special dashboard for Omnicom Media Group showcasing cross-platform campaign management

## Repository Structure

```
preciseweb2/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (marketing)/       # Public marketing pages
│   │   ├── app/               # Authenticated application
│   │   └── omg-unified-dashboard-v3/  # OMG special dashboard
│   ├── components/            # Reusable React components
│   └── lib/                   # Utilities and configurations
├── sanity/                    # Sanity CMS schemas and config
├── convex/                    # Convex backend functions
├── public/                    # Static assets
└── docs/                      # Documentation

Strategic Documents (created by Claude):
├── PRECISE_VERIFIED_CREDENTIALS.md
├── MADHIVE_PE_REVENUE_CASE.md
├── PRECISE_BUSINESS_ONE_PAGER.md
├── PRECISE_POWERS_MAVERICK_AI.md
├── MADHIVE_BOARD_MEMO_PRECISE.md
├── PRECISE_OPERATIONALIZATION_PLAN.md
└── PRECISE_AGENTIC_CAMPAIGN_SYSTEM.md
```

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: 
  - Convex (real-time data, chat, lead capture) - PARTIALLY IMPLEMENTED
  - Supabase (auth/data) - NOT YET CONFIGURED
- **CMS**: Sanity (content management) - SCHEMAS DEFINED, NOT POPULATED
- **Deployment**: Vercel
- **AI**: OpenAI API for chat features

## Branches

### `master`
- Production-ready code
- Deployed to main Vercel instance
- Contains full application with all features

### `demo-ux-only`
- Demo branch for showcasing UI/UX without backend dependencies
- Mock data enabled via `NEXT_PUBLIC_MOCK_MODE=true`
- Used for client demonstrations
- Key differences:
  - No Supabase authentication required
  - Mock data for campaigns and earnings
  - Simplified deployment

### `ux-only` (legacy)
- Original demo branch, superseded by `demo-ux-only`

## Recent Work Completed

### 1. Marketing Website Updates
- **Homepage**: Hero section with value props, team section, CTA
- **Data Controllers Page**: Benefits, process flow, calculator, testimonials
- **Media Buyers Page**: Unified benefits for advertisers and agencies
- **Madhive Integration Page**: Showcasing partnership benefits
- **How It Works**: Step-by-step flows for both user types
- **Pricing Page**: Enterprise-focused with contact form

### 2. Application Dashboard Features
- **Data Controller Dashboard**:
  - Real-time earnings ticker
  - Valence Enhanced Shapley visualization
  - Data asset health scores
  - Market rate benchmarking
  - Buyer request matching

- **Media Buyer Dashboard**:
  - Campaign management with AI assistant
  - Multi-touch attribution (MMM)
  - Creative fatigue detection
  - DSP arbitrage dashboard
  - Predictive CAC forecasting
  - Custom attribution windows

### 3. OMG Unified Dashboard V3
- **Latest Version** (`/app/omg-unified-dashboard-v3`)
- Consolidated V1 functionality with V2 design
- Key Features:
  - Unified cross-platform view (CTV, digital, linear)
  - Platform Control with GRP and Reach %
  - AI Optimizations tab with real-time suggestions
  - Internal Metrics (OMG-only view)
  - **NEW: ZipAI Intelligence** - ZIP code level targeting replacing DMA
    - Micro-cultural segments
    - 84.3% target reach vs 62.5% for DMA
    - Live optimization feed
- Madhive CPM: $19, Hulu CPM: $23

### 4. Key UI/UX Decisions
- Removed all emoji icons, replaced with sophisticated styled components
- Premium color palette: Electric Blue (#0984E3), Brand Green (#00B894)
- Mobile-first responsive design
- Keyboard shortcuts for power users
- Real-time collaboration features (cursors, live status)

## Deployment Guide

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Vercel account
- Environment variables (see below)

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Convex backend (in separate terminal)
npx convex dev
```

### Environment Variables

Create `.env.local` with:
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOY_KEY=your_convex_key

# OpenAI (for AI features)
OPENAI_API_KEY=your_openai_key

# Supabase (not needed for demo branches)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_id
NEXT_PUBLIC_SANITY_DATASET=production

# For demo deployments
NEXT_PUBLIC_MOCK_MODE=true  # Enables mock data
```

### Deploying to Vercel

#### Production Deployment (master branch)
```bash
vercel --prod
```

#### Demo Deployment (demo-ux-only branch)
1. Ensure you're on `demo-ux-only` branch
2. Use `vercel.ux-demo.json` for configuration
3. Deploy with: `vercel --prod`

The demo deployment will use mock data and bypass authentication.

### Vercel Configuration Files
- `vercel.json` - Production config
- `vercel.ux-demo.json` - Demo config with mock mode enabled
- `vercel.demo.json` - Alternative demo config

## For Claude Code Instances

When another Claude instance takes over:

1. **Understand the Context**:
   - Read `CLAUDE.md` for project-specific instructions
   - Review this handover guide
   - Check recent commits for context

2. **Key Rules to Follow**:
   - Never use "MadHive" - always "Madhive"
   - No emojis in production code
   - Prefer editing existing files over creating new ones
   - Always run lint/typecheck before committing

3. **Common Tasks**:
   - Update CPM pricing: Look in `campaignData` objects
   - Add new platforms: Update `platforms` object and campaign data
   - Modify dashboards: Check `/app/app/` directory
   - Update marketing content: Check `/app/(marketing)/`

4. **Testing Approach**:
   - Use mock data for demos (`NEXT_PUBLIC_MOCK_MODE=true`)
   - Test responsive design at all breakpoints
   - Verify keyboard shortcuts work
   - Check real-time features with Convex

## Current State Notes

### What's Working
- All marketing pages functional
- Demo dashboards with mock data
- OMG V3 dashboard with ZipAI Intelligence
- Real-time features via Convex (optional)
- Responsive design
- Password protection on `/app/*` routes

### Password Protection
All `/app/*` routes are protected with basic authentication:
- **Username**: `precise`
- **Password**: `demo2025`

This keeps the application dashboard private while marketing pages remain public.

### Known Issues
- Some Sanity CMS content needs seeding
- Production Supabase not fully configured

### Sanity CMS Status
- **Current State**: Schemas are fully defined but content is NOT populated
- **Project ID**: Currently using "dummy" ID which causes console errors (harmless)
- **Purpose**: Eventually will manage all marketing content (hero sections, team info, etc.)
- **Files**:
  - `/sanity/schemas/` - All content schemas defined
  - `/scripts/seed-*.ts` - Seeding scripts ready but not run
  - Components with `WithCMS` suffix are ready for Sanity data
- **To Enable**: Need to create Sanity project and run seed scripts

### Convex Backend Status
- **Current State**: Partially implemented for real-time features
- **What's Working**:
  - Chat persistence in AI Assistant
  - Lead capture (contacts table added)
  - Real-time activity feeds (mocked)
- **What's NOT Working**:
  - User authentication (using mock auth)
  - Actual data storage (using mock data)
  - Real campaign/earnings data
- **Files**:
  - `/convex/` - All backend functions
  - `/convex/schema.ts` - Database schema
  - `/convex/contacts.ts` - NEW: Lead capture functions
- **To Enable**: Set `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOY_KEY`

### Lead Capture Implementation
- **Contact Form**: `/api/contact` endpoint saves to Convex (if configured) or logs
- **Email Capture**: Footer newsletter signup also uses same endpoint
- **Data Flow**:
  1. Form submission → `/api/contact` API route
  2. API attempts to save to Convex
  3. Falls back to console logging if Convex not configured
  4. Ready for CRM integration (HubSpot, Salesforce, etc.)

### Next Steps Suggested
1. Resolve GitHub authentication for pushing commits
2. **OPTIONAL**: Set up Sanity CMS (can wait - site works without it)
3. **OPTIONAL**: Configure Convex for lead capture (currently logs to console)
4. Set up production Supabase instance (for actual user auth)
5. Implement actual DSP integrations (currently mocked)
6. Add real payment processing for data controllers
7. Connect lead capture to CRM/email service

## Contact Points

- **Repository**: https://github.com/adamhelfgott/preciseweb2
- **Vercel Dashboard**: Check team settings for deployment URLs
- **Convex Dashboard**: https://dashboard.convex.dev
- **Sanity Studio**: `/studio` route when running locally

## Important Files to Review

1. `/src/app/app/omg-unified-dashboard-v3/page.tsx` - Latest OMG dashboard
2. `/CLAUDE.md` - Project-specific AI instructions
3. `/src/components/app/campaigns/` - All campaign management components
4. `/convex/` - Backend functions for real-time features
5. Strategic documents in root directory for business context

---

This guide should enable any developer or Claude instance to quickly understand the project structure, recent work, and deployment process. The demo-ux-only branch is ideal for client demonstrations without backend dependencies.