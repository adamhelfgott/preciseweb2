# Precise - Infrastructure for the AI Data Economy

A privacy-preserving data collaboration platform that creates targetable audiences from behavioral context and signals—not emails or device IDs. Enables brands, agencies, and data providers to collaborate without sharing raw data.

## Features

### For Media Buyers / Ad Ops Managers
- **AI Campaign Assistant**: Natural language interface for campaign insights
- **Campaign Health Monitor**: Real-time anomaly detection and recommendations
- **Budget Pacing Intelligence**: AI-powered budget optimization
- **Multi-touch Attribution**: Shapley value attribution across channels
- **Audience Insights**: Verified audience data with overlap analysis

### For Data Controllers
- **Real-time Earnings Dashboard**: Track revenue from data usage
- **Attribution Transparency**: See fair contribution via Shapley values
- **Privacy Dashboard**: Monitor differential privacy metrics
- **Data Marketplace**: Pricing recommendations and demand insights

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional, for AI Assistant)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adamhelfgott/preciseweb2.git
cd preciseweb2

# For demo version (recommended)
git checkout demo-ux-only
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
touch .env.local
```

4. Add to `.env.local`:
```env
# For demo mode
NEXT_PUBLIC_MOCK_MODE=true

# Optional - for AI chat features
OPENAI_API_KEY=your_openai_key_here

# Not needed for demo
# NEXT_PUBLIC_CONVEX_URL=...
# NEXT_PUBLIC_SUPABASE_URL=...
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Demo Access

The `demo-ux-only` branch uses mock data. 

**Public pages** (no login required):
- `/` - Marketing homepage
- `/omg-unified-dashboard-v3` - OMG command center with ZipAI Intelligence
- `/data-owners`, `/media-buyers` - Marketing pages
- `/madhive-integration` - Partnership showcase

**Protected pages** (`/app/*` routes):
- **Username**: `precise`
- **Password**: `demo2025`
- Example: `/app/dashboard` - Demo dashboard with mock data

## Deployment

The app is configured for easy deployment on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel settings
4. Deploy

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Convex (real-time database)
- **AI**: OpenAI GPT-4 (via Vercel AI SDK)
- **Charts**: Recharts
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── app/               # Protected app routes
├── components/            # React components
│   ├── app/              # App-specific components
│   ├── home/             # Marketing site components
│   └── onboarding/       # Onboarding flow
├── contexts/             # React contexts
├── lib/                  # Utility functions
└── convex/              # Convex backend functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.