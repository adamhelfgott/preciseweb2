#!/bin/bash

# Deploy to uxonly environment on Vercel

echo "Deploying to uxonly environment..."

# Set environment variables for the build
export NEXT_PUBLIC_SANITY_PROJECT_ID="qjy49msn"
export NEXT_PUBLIC_SANITY_DATASET="production"
export NEXT_PUBLIC_SANITY_API_VERSION="2025-06-01"

# Deploy using Vercel CLI with production flag
npx vercel deploy --prod \
  --env NEXT_PUBLIC_SANITY_PROJECT_ID="qjy49msn" \
  --env NEXT_PUBLIC_SANITY_DATASET="production" \
  --env NEXT_PUBLIC_SANITY_API_VERSION="2025-06-01" \
  --yes

echo "Deployment initiated!"