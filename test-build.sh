#!/bin/bash

# Test build script to simulate Vercel environment
echo "Starting test build..."

# Set environment variables
export NEXT_PUBLIC_CONVEX_URL="https://peaceful-monitor-946.convex.cloud"
export OPENAI_API_KEY="test-key"
export NODE_ENV="production"

# Clean install
echo "Installing dependencies..."
npm ci

# Run build
echo "Running build..."
npm run build

echo "Build complete!"