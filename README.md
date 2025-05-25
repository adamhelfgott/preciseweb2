# Precise.ai - Infrastructure for the AI Data Economy

A privacy-preserving data collaboration platform that enables brands and data owners to work together without sharing raw data.

## Features

### For Media Buyers / Ad Ops Managers
- **AI Campaign Assistant**: Natural language interface for campaign insights
- **Campaign Health Monitor**: Real-time anomaly detection and recommendations
- **Budget Pacing Intelligence**: AI-powered budget optimization
- **Multi-touch Attribution**: Shapley value attribution across channels
- **Audience Insights**: Verified audience data with overlap analysis

### For Data Owners
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
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key for the AI Assistant
   - `NEXT_PUBLIC_CONVEX_URL`: Your Convex deployment URL

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials

- **Media Buyer**: `mediabuyer@demo.com` / `demo123`
- **Data Owner**: `dataowner@demo.com` / `demo123`

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