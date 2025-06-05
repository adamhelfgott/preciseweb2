/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript strict checking during builds
    ignoreBuildErrors: true,
  },
  // Skip build errors for demo
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Environment variables for demo build
  env: {
    NEXT_PUBLIC_MOCK_MODE: 'true',
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'dummy',
    NEXT_PUBLIC_SANITY_DATASET: 'production',
  },
};

export default nextConfig;