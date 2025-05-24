# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Precise.ai marketing website implementation project. The website follows a sophisticated design philosophy blending Spotify's vibrant data visualization, Apple's minimal layouts, and Hermès' luxury craftsmanship details.

## Development Commands

Since this appears to be a new project without existing package.json or build configuration, the following commands will need to be set up:

### Initial Setup
```bash
# Initialize Next.js project (if not already done)
npx create-next-app@latest . --typescript --tailwind --app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Architecture Overview

The website is structured as a Next.js application with the following key pages:

1. **Homepage** - Hero section with free proof service messaging, trust indicators, and value propositions
2. **For Data Owners** - Detailed information about monetizing data through verified credentials
3. **For Advertisers** - Benefits of using verified data and platform integrations
4. **Developer Documentation** - API references, SDKs, and integration guides
5. **Onboarding Flows** - Multi-step forms for both data owners and advertisers

## Design System

The project uses a custom design system with:
- Premium neutral color palette with vibrant accents
- Typography using SF Display, Inter, and JetBrains Mono
- Component library including buttons, cards, and navigation elements
- Responsive design with mobile-first approach

## Key Implementation Details

- Static generation for marketing pages using Next.js
- Intersection observers for scroll animations
- Lazy loading for images and heavy components
- Proper ARIA labels and keyboard navigation for accessibility
- SEO optimization with meta tags and structured data

## File Structure

The website.md file contains the complete implementation guide including:
- Visual design system specifications
- Complete page layouts and copy
- Component library definitions
- Onboarding flow implementations
- Performance and accessibility guidelines