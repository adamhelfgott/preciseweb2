# Cannes Demo Setup Guide

This guide will help you set up the database-driven prototype for the Cannes demo.

## Prerequisites

- Node.js 18+
- Supabase account (free tier works)
- Convex account (for chat features)
- OpenAI API key (for AI assistant)

## Quick Setup (15 minutes)

### 1. Clone and Install

```bash
git clone https://github.com/precise-ai/preciseweb2.git
cd preciseweb2
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at https://app.supabase.com
2. Go to Settings > API and copy your credentials
3. Run the migrations:

```bash
# Copy the SQL from these files and run in Supabase SQL editor:
# - supabase/migrations/001_initial_schema.sql
# - supabase/migrations/002_api_keys_webhooks.sql
```

### 3. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 4. Seed Demo Data

```bash
npm run seed:cannes
```

This creates:
- 2 demo organizations (Media Buyer & Data Owner)
- 4 campaigns with real creative images
- Performance metrics and events
- Demo API keys

### 5. Run the Application

```bash
# Terminal 1: Start Convex
npx convex dev

# Terminal 2: Start Next.js
npm run dev
```

Visit http://localhost:3000

## Demo Flow

### 1. Marketing Site
- Start at homepage
- Show `/agent-intelligence` page
- Click through to API docs

### 2. Media Buyer Dashboard
1. Click "Get Started" → "I buy media"
2. Sign in with any email (auth is mocked for demo)
3. Navigate to Campaigns page
4. Show creative images and fatigue scores
5. Click on "Creatives" tab to see carousel

### 3. Live Agent Demo
```bash
# Terminal 3: Run the demo agent
cd examples/demo-dsp-agent
node demo-agent.js
```

Watch as:
- New metrics appear in real-time
- Creative fatigue alerts trigger
- Performance data updates

### 4. Continuous Mode
```bash
node demo-agent.js continuous
```

Leave this running during booth demos for constant activity.

## Key Features to Demo

### For Media Buyers
1. **Creative Carousel** - Shows actual campaign images with fatigue scores
2. **Real-time Metrics** - Watch numbers update as agent pushes data
3. **AI Assistant** - Press Cmd+J to open chat
4. **Cross-DSP View** - Unified dashboard across all platforms

### For Developers
1. **Agent Intelligence Page** - `/agent-intelligence`
2. **API Documentation** - `/docs/api` 
3. **Live Code Examples** - Interactive tabs with copy buttons
4. **Simple Integration** - Show the demo agent code

## Talking Points

### Database-Driven Architecture
- "Everything you see is from a real database"
- "Supabase provides instant scalability"
- "Event sourcing captures every interaction"

### Agent Integration
- "DSPs push data every 5 seconds"
- "50ms response time for bid decisions"
- "Works with any language or platform"

### Privacy & Security
- "Data never leaves your infrastructure"
- "API keys are scoped by organization"
- "SOC2 compliant architecture"

## Troubleshooting

### No data showing?
1. Check Supabase connection in browser console
2. Verify .env.local has correct credentials
3. Run `npm run seed:cannes` again

### Agent not connecting?
1. Ensure backend is running (`npm run dev`)
2. Check API endpoint in demo-agent.js
3. Try the mock API key: `demo-dv360-key`

### Images not loading?
- Creative images use Unsplash URLs
- Ensure internet connection is stable
- Check browser console for errors

## Advanced Setup

### Multiple DSP Agents
```bash
# Terminal 1
DSP_NAME=DV360 node demo-agent.js continuous

# Terminal 2  
DSP_NAME=Amazon node demo-agent.js continuous

# Terminal 3
DSP_NAME=Meta node demo-agent.js continuous
```

### Custom Branding
Edit campaign images in `seed-cannes-demo.ts` to use client logos.

### Production Deploy
```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Deploy Convex functions
npx convex deploy
```

## Demo Checklist

Before the demo:
- [ ] Database seeded with fresh data
- [ ] All terminals ready (Next.js, Convex, Agent)
- [ ] Browser tabs open (Homepage, Campaigns, API Docs)
- [ ] Internet connection stable
- [ ] Backup slides ready

During the demo:
- [ ] Start with problem statement
- [ ] Show live data flowing
- [ ] Emphasize real-time nature
- [ ] Let them try the AI assistant
- [ ] Give them the GitHub link

## Support

- Slack: #cannes-demo
- Email: demo-support@precise.ai
- Emergency: +1-555-PRECISE