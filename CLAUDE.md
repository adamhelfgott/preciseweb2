# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Precise.ai is a privacy-preserving data collaboration platform for advertising campaigns. The platform enables:
- **Data Controllers**: Monetize data through verified credentials while maintaining privacy
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
- Global search functionality (Cmd+K)

#### Media Buyer Features
- **Campaigns Page**: Full AdOps command center with AI assistant
- **Creative Carousel**: Performance tracking with fatigue detection
- **Creative Fatigue Alert**: Automated alerts when creatives need refresh
- **DSP Arbitrage**: Multi-DSP optimization dashboard
- **Multi-Touch Attribution**: Marketing Mix Model implementation
- **Campaign Health Monitor**: Real-time performance alerts
- **Budget Pacing**: Spend tracking and forecasting
- **Audience Insights**: Segment performance analysis
- **AI Assistant**: Collapsible chat with markdown support and Convex persistence
- **Predictive CAC Forecasting**: AI-powered 4-week CAC predictions with confidence intervals
- **Custom Attribution Windows**: Configurable attribution models with visual impact analysis
- **Incrementality Testing**: Holdout group testing for true campaign impact

#### Data Controller Features
- **Earnings Dashboard**: Revenue tracking and visualization
- **Earnings Predictor**: Calculate potential earnings based on data quality
- **Valence Enhanced Shapley**: Fair value attribution
- **Asset Performance**: Breakdown by data type
- **Transaction History**: Detailed payment records
- **Real-time Activity Feed**: Live usage monitoring
- **Data Asset Health Score**: Comprehensive quality scoring with improvement recommendations
- **Market Rate Benchmarking**: Compare pricing to market standards
- **Data Enhancement Suggestions**: AI-powered recommendations to increase value
- **Buyer Request Dashboard**: Match assets with active buyer requests

#### Marketing Site
- Homepage with value propositions
- Data Controllers page
- Advertisers page
- Get Started with role-specific onboarding flows
- Company/Team page with real team photos
- Developer documentation structure
- How It Works page with step-by-step flows
- Pricing page with enterprise contact form

### 🚨 Critical Issues for Go-Live

1. **Mock Data Dependencies**:
   - All campaign data is mocked
   - All earnings data is mocked
   - No real API integrations
   - No actual DSP connections

2. **Missing Core Features**:
   - No actual data upload/management for data controllers
   - No real payment processing
   - No actual ad serving integration
   - No real attribution tracking

3. **Case Studies Page Issues**:
   - References 3 images that don't exist (commented out for now)
   - Need to either add real case study images or create placeholders

4. **Legal Pages**:
   - Privacy Policy - Not created
   - Terms of Service - Not created

### 🎯 Features In Progress

#### Media Buyer Features (Not Yet Implemented)
1. **Audience Overlap Analysis** - Identify redundant targeting
2. **Competitive Intelligence** - Industry benchmarking
3. **Smart Budget Reallocation** - AI-driven budget optimization
4. **Integration Health Dashboard** - Monitor DSP connections
5. **Collaborative Workspaces** - Team campaign management
6. **Automated Reporting** - Scheduled stakeholder updates

#### Data Controller Features (Not Yet Implemented)
1. **Usage Analytics Deep Dive** - Granular usage insights
2. **Smart Pricing Recommendations** - ML-based price optimization
3. **Automated Data Validation** - Quality checks and alerts
4. **Revenue Share Calculator** - Team/partner splits
5. **White-label Reports** - Branded reports for stakeholders

### 📋 Go-Live Checklist

**Must Have**:
- [ ] Replace mock data with real APIs (or clearly mark as demo)
- [ ] Create privacy policy page
- [ ] Create terms of service page
- [ ] Create contact/support page
- [ ] Add or create case study images
- [ ] Add loading states for all async operations
- [ ] Add error handling for all API calls
- [ ] Mobile responsive testing and fixes (partially complete)
- [ ] Accessibility audit (ARIA labels, keyboard nav)
- [ ] Performance testing (Lighthouse audit)
- [ ] Security audit (authentication, data privacy)
- [ ] Production environment setup
- [ ] SSL certificates
- [ ] Domain configuration

**Nice to Have**:
- [ ] FAQ/Help center
- [ ] Blog/Resources section
- [ ] More detailed API documentation
- [ ] Video demos/tutorials
- [ ] Live chat support integration
- [ ] Multi-language support
- [ ] Email notification system
- [ ] 2FA authentication

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
- **Data Controllers**: Valence Enhanced Shapley for fair value distribution
- Values are abstracted to prevent exact negotiation leverage

### Design Philosophy
- Blends Spotify's data visualization, Apple's minimalism, and Hermès' craftsmanship
- Premium neutral palette with vibrant accents
- Mobile-first responsive design
- Accessibility as a core principle

### Color Palette
- Dark Gray: #2D3436
- Medium Gray: #636E72
- Light Gray: #F5F6F7
- Silk Gray: #FAFBFC
- Electric Blue: #0984E3
- Brand Green: #00B894
- Warm Coral: #FF6B6B
- Soft Lavender: #A29BFE
- Golden Amber: #FDCB6E

## Important Rules

1. **No Fake Data in Production**: Never show inflated metrics or fake company logos
2. **Privacy First**: Always abstract exact data values to prevent leverage
3. **Bug Fixes**: Never remove features when fixing bugs - find the root cause
4. **Quality**: Prefer fixing existing features over adding new ones
5. **User Experience**: Always provide loading states and error handling
6. **Accessibility**: All interactive elements must be keyboard accessible
7. **Performance**: Lazy load heavy components and optimize images