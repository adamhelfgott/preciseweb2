# Sanity CMS Setup Guide

## Overview

I've set up Sanity as a headless CMS for managing all the marketing content on Precise.ai. This allows non-technical team members to update copy, navigation, and content without touching code.

## What's Been Set Up

### Content Types (Schemas)

1. **Hero Sections** - Manage headlines, subheadlines, CTAs for each page
2. **Value Propositions** - Update the value props for media buyers and data sellers
3. **Navigation Links** - Control what appears in the main navigation
4. **Page Content** - Flexible content sections for any page
5. **Buyer Personas** - Manage content for different audience types (agencies, brands, DSPs, etc.)
6. **Outcome Metrics** - Update the metrics shown to media buyers
7. **Features/Benefits** - Manage feature lists across the site

### Integration Points

- Navigation component with CMS fallback
- Value props section with CMS data
- Hero sections across all pages
- Buyer persona cards
- Outcome metrics displays

## Quick Start

### 1. Create a Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity in the project
sanity init

# Choose:
# - Create new project
# - Public dataset name: production
# - Use TypeScript: Yes
```

### 2. Get Your Project ID

After initialization, you'll get a project ID. Add it to your `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Deploy Sanity Studio

```bash
sanity deploy
```

This will give you a URL like `https://your-project.sanity.studio`

### 4. Access the Studio Locally

Visit `http://localhost:3000/studio` to access the CMS interface.

## How to Update Content

### For Marketing Team

1. Go to `/studio` on your site
2. Log in with your Sanity account
3. Select the content type you want to edit:
   - **Navigation** - Update menu items
   - **Hero Sections** - Edit page headlines and CTAs
   - **Value Props** - Update benefit cards
   - **Buyer Personas** - Modify audience-specific content

### For Developers

The site uses a "CMS with fallback" pattern:

```tsx
// Example: Navigation component
const { data: navLinks, loading } = useSanityData<NavLink[]>(navigationQuery);

// Falls back to hardcoded if CMS isn't set up
const links = navLinks || defaultLinks;
```

This means:
- Site works without Sanity configured
- When Sanity is set up, it overrides hardcoded content
- No breaking changes during transition

## Content Structure

### Hero Section Example
```
{
  page: "media-buyers",
  eyebrow: "For Media Buyers",
  headline: "Drive better outcomes with",
  headlineHighlight: "verified audiences",
  subheadline: "Access premium data segments...",
  primaryCta: {
    text: "Access audiences",
    href: "/get-started"
  }
}
```

### Value Prop Example
```
{
  section: "mediaBuyers",
  headline: "For Media Buyers: Drive Better Outcomes",
  props: [
    {
      title: "Beyond CAC Reduction",
      description: "Drive outcomes across the entire funnel...",
      icon: "TrendingUp",
      gradient: "from-electric-blue to-electric-blue/70"
    }
  ]
}
```

## Adding New CMS-Managed Content

1. Create a new schema in `/sanity/schemas/`
2. Add it to the schemas index
3. Create a query in `/sanity/lib/queries.ts`
4. Use the `useSanityData` hook in your component
5. Provide fallback data for when CMS isn't configured

## Benefits

- **Non-technical updates** - Marketing can change copy without deployments
- **A/B testing** - Easy to test different messaging
- **Localization ready** - Can add multi-language support later
- **Version history** - Track all content changes
- **Real-time preview** - See changes before publishing
- **Collaborative** - Multiple team members can work together

## Next Steps

1. Set up Sanity project and add env variables
2. Deploy Sanity Studio
3. Start migrating content from hardcoded to CMS
4. Train marketing team on using the studio
5. Consider adding:
   - Preview mode for draft content
   - Scheduled publishing
   - Content approval workflows

## Migration Priority

Suggested order for moving content to CMS:

1. Navigation (quick win, highly visible)
2. Hero sections (marketing updates these frequently)
3. Value props (core messaging)
4. Outcome metrics (need regular updates)
5. Page-specific content (as needed)

The beauty is you can migrate gradually - the fallback pattern means nothing breaks!