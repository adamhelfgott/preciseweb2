# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Precise.ai is a privacy-preserving data collaboration platform for advertising campaigns. The platform enables:
- **Data Owners**: Monetize data through verified credentials while maintaining privacy
- **Media Buyers**: Access high-quality audience data with transparent attribution

Key differentiators:
- Privacy-first approach - data never leaves owner's control
- Valence Enhanced Shapley for fair value distribution
- Marketing Mix Model (MMM) for media buyer attribution
- Real-time campaign optimization with AI assistance

## Current Project State (as of May 25, 2025)

### ✅ Completed Features

#### Platform Infrastructure
- Next.js 15 with App Router and TypeScript
- Vercel deployment configured
- Convex backend for real-time features and chat persistence
- Role-based authentication (DATA_OWNER, MEDIA_BUYER)
- Responsive design with Tailwind CSS

#### Media Buyer Features
- **Campaigns Page**: Full AdOps command center with AI assistant
- **Creative Carousel**: Performance tracking with fatigue detection
- **DSP Arbitrage**: Multi-DSP optimization dashboard
- **Multi-Touch Attribution**: Marketing Mix Model implementation
- **Campaign Health Monitor**: Real-time performance alerts
- **Budget Pacing**: Spend tracking and forecasting
- **Audience Insights**: Segment performance analysis
- **AI Assistant**: Collapsible chat with markdown support and Convex persistence

#### Data Owner Features
- **Earnings Dashboard**: Revenue tracking and visualization
- **Valence Enhanced Shapley**: Fair value attribution
- **Asset Performance**: Breakdown by data type
- **Transaction History**: Detailed payment records
- **Real-time Activity Feed**: Live usage monitoring

#### Marketing Site
- Homepage with value propositions
- Data Owners page
- Advertisers page
- Get Started with role-specific onboarding flows
- Company/Team page with real team photos
- Developer documentation structure

### 🚨 Critical Issues for Go-Live

1. **Missing Content Pages**:
   - `/pricing` - Currently shows "under construction"
   - `/how-it-works` - Currently shows "under construction"
   - Legal pages (Privacy Policy, Terms of Service) - Not created
   - Contact/Support page - Not created

2. **Case Studies Page Issues**:
   - References 3 images that don't exist:
     - `/case-studies/chicago-cubs.jpg`
     - `/case-studies/retail.jpg`
     - `/case-studies/streaming.jpg`
   - Need to either add images or remove image references

3. **Mock Data Dependencies**:
   - All campaign data is mocked
   - All earnings data is mocked
   - No real API integrations
   - No actual DSP connections

4. **Missing Core Features**:
   - No actual data upload/management for data owners
   - No real payment processing
   - No actual ad serving integration
   - No real attribution tracking

### 🎯 High-Priority Improvements

#### For Media Buyers
1. **Predictive CAC Forecasting** - AI-powered cost predictions
2. **Creative A/B Testing Interface** - Built-in experimentation
3. **Competitive Intelligence** - Industry benchmarking
4. **Real-time Bidding Insights** - Live auction data
5. **Automated Reporting** - Scheduled stakeholder updates

#### For Data Owners
1. **Data Quality Scoring** - Automated validation and scoring
2. **Earnings Predictor** - ML-based revenue forecasting
3. **Market Rate Benchmarking** - Competitive pricing insights
4. **Enhanced Usage Analytics** - Deeper insights into data usage
5. **Smart Pricing Recommendations** - AI-optimized pricing

#### Platform-Wide
1. **Mobile Responsiveness** - Many components need mobile optimization
2. **Loading States** - Add skeleton screens for better UX
3. **Error Handling** - Graceful degradation for API failures
4. **Empty States** - Better messaging when no data exists
5. **Onboarding Tours** - Guided walkthroughs for new users
6. **Global Search** - Search across all campaigns/assets
7. **Notifications System** - Real-time alerts
8. **Performance Optimization** - Code splitting, lazy loading

### 📋 Go-Live Checklist

**Must Have**:
- [ ] Complete pricing page content
- [ ] Complete how-it-works page content  
- [ ] Add or remove case study images
- [ ] Create privacy policy page
- [ ] Create terms of service page
- [ ] Create contact/support page
- [ ] Replace mock data with real APIs (or clearly mark as demo)
- [ ] Add loading states for all async operations
- [ ] Add error handling for all API calls
- [ ] Mobile responsive testing and fixes
- [ ] Accessibility audit (ARIA labels, keyboard nav)
- [ ] Performance testing (Lighthouse audit)

**Nice to Have**:
- [ ] FAQ/Help center
- [ ] Blog/Resources section
- [ ] More detailed API documentation
- [ ] Video demos/tutorials
- [ ] Live chat support integration
- [ ] Multi-language support

## Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Type checking
npm run type-check

# Linting
npm run lint

# Run Convex
npx convex dev
```

## Architecture Decisions

1. **Frontend**: Next.js 15 App Router for SSG/SSR capabilities
2. **Styling**: Tailwind CSS for rapid development
3. **Backend**: Convex for real-time features (chat, activity feeds)
4. **AI**: Vercel AI SDK with OpenAI for chat assistant
5. **Charts**: Recharts for data visualization
6. **Animation**: Framer Motion for smooth transitions

## Key Implementation Notes

### AI Assistant
- Uses Vercel AI SDK v3 with streaming responses
- Persists chat history in Convex
- Markdown rendering with react-markdown
- Collapsible UI to not obstruct main content

### Attribution Models
- **Media Buyers**: Marketing Mix Model (MMM) for campaign attribution
- **Data Owners**: Valence Enhanced Shapley for fair value distribution
- Values are abstracted to prevent exact negotiation leverage

### Design Philosophy
- Blends Spotify's data visualization, Apple's minimalism, and Hermès' craftsmanship
- Premium neutral palette with vibrant accents
- Mobile-first responsive design
- Accessibility as a core principle

## Important Rules

1. **No Fake Data in Production**: Never show inflated metrics or fake company logos
2. **Privacy First**: Always abstract exact data values to prevent leverage
3. **Bug Fixes**: Never remove features when fixing bugs - find the root cause
4. **Quality**: Prefer fixing existing features over adding new ones