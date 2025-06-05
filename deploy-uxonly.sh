#!/bin/bash

echo "🚀 Deploying UX-only demo to Vercel..."

# Set environment variables for deployment
export NEXT_PUBLIC_MOCK_MODE=true
export NEXT_PUBLIC_SANITY_PROJECT_ID=dummy
export NEXT_PUBLIC_SANITY_DATASET=production
export NEXT_PUBLIC_CONVEX_URL=https://animated-starfish-207.convex.cloud

# Deploy to Vercel
vercel --prod --env NEXT_PUBLIC_MOCK_MODE=true --env NEXT_PUBLIC_SANITY_PROJECT_ID=dummy --env NEXT_PUBLIC_SANITY_DATASET=production --env NEXT_PUBLIC_CONVEX_URL=https://animated-starfish-207.convex.cloud

echo "✅ Deployment complete!"