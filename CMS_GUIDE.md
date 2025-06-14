# CMS Guide - Precise.ai Marketing Pages

## Overview

This guide explains how to use the Content Management System (CMS) for managing all marketing page content on Precise.ai. The CMS allows the marketing team to edit all text content without requiring code changes.

## Pages with CMS Support

The following marketing pages now have full CMS support:

1. **Company Page** (`/company`)
   - Leadership team information
   - Hero section content
   - Team member details including names, roles, backgrounds, and LinkedIn URLs

2. **Pricing Page** (`/pricing`)
   - Hero title and description
   - Value propositions
   - Feature list
   - ROI metrics
   - Form field labels
   - Trust section content

3. **Contact Page** (`/contact`)
   - Hero section with title and subtitle
   - Form field labels and placeholders
   - Quick contact information
   - Office location details
   - Response time metrics
   - FAQ CTA section

4. **Agent Intelligence Page** (`/agent-intelligence`)
   - Hero section with badge and CTAs
   - Trust badges
   - Feature cards with metrics
   - Code examples
   - Integration steps
   - CTA section

5. **Data Sellers Page** (`/data-sellers`)
   - Hero section with CTAs
   - Path selection options
   - Revenue comparison
   - Benefits section
   - Calculator section
   - CTA section

6. **Media Buyers Page** (`/media-buyers`)
   - Hero section with metrics
   - Outcomes section
   - Buyer type selection
   - Verification flow
   - CTA section

## How to Access the CMS

### Admin Panel
Visit `/cms-admin` to access the CMS admin panel. This provides a user-friendly interface for editing content.

### Initial Setup

1. First, seed the CMS with default content:
   ```bash
   npm run seed:cms
   ```

2. Make sure Convex is running:
   ```bash
   npx convex dev
   ```

3. Access the admin panel at `http://localhost:3000/cms-admin`

## Using the CMS Admin Panel

1. **Select a Page**: Use the dropdown to select which page you want to edit
2. **Edit Content**: Modify text fields, add/remove items from lists
3. **Save Changes**: Click "Save Changes" to persist your edits
4. **Reset**: Click "Reset" to revert to the last saved version

## Content Structure

### Company Page
```javascript
{
  hero: {
    title: "Leadership Team",
    description: "Building the infrastructure..."
  },
  teamMembers: [
    {
      name: "Jesse Redniss",
      role: "CEO",
      background: ["Qonsent", "WarnerMedia"],
      image: "/team/jesse.jpg",
      linkedin: "https://www.linkedin.com/..."
    }
  ],
  investorNote: "Backed by world-class investors..."
}
```

### Pricing Page
```javascript
{
  hero: {
    title: "Enterprise Pricing Built for Scale",
    description: "Custom pricing based on..."
  },
  valueProps: [
    {
      icon: "Zap",
      title: "Volume Discounts",
      description: "Scale pricing with your growth"
    }
  ],
  features: ["Custom data ingestion pipelines", ...],
  roi: {
    title: "Typical ROI",
    description: "Our enterprise customers...",
    metrics: [
      { label: "CAC Reduction", value: "30-45%" }
    ]
  },
  form: {
    title: "Get Your Custom Pricing",
    fields: { ... }
  },
  trustedBy: {
    title: "Trusted by leading brands...",
    companies: ["Chicago Cubs", ...]
  }
}
```

### Contact Page
```javascript
{
  hero: {
    title: "Let's Transform Your",
    titleHighlight: "Advertising Performance",
    subtitle: "Whether you're looking to..."
  },
  form: {
    title: "Get in Touch",
    fields: { ... }
  },
  quickContact: {
    title: "Quick Contact",
    items: [
      {
        icon: "Mail",
        label: "Email us",
        value: "hello@precise.ai",
        link: "mailto:hello@precise.ai"
      }
    ]
  },
  office: { ... },
  responseTime: { ... },
  faqCta: { ... }
}
```

## Best Practices

1. **Preview Changes**: Always preview your changes on the actual page before saving
2. **Backup Content**: Consider copying important content before making major changes
3. **Icon Names**: Use exact Lucide icon names (e.g., "Zap", "Shield", "Users")
4. **Image Paths**: Keep image paths consistent with existing structure
5. **Links**: Ensure all links are properly formatted (internal: `/path`, external: `https://...`)

## Troubleshooting

### Content Not Updating
1. Ensure Convex is running (`npx convex dev`)
2. Check browser console for errors
3. Try refreshing the page
4. Verify the content was saved successfully

### Missing Icons
Icons must match exact Lucide icon names. Common icons:
- Zap, Shield, Users, Brain, TrendingUp
- Mail, MessageSquare, Calendar, MapPin
- Check, CheckCircle, ArrowRight

### Form Validation
Ensure required fields are marked with `required: true` in the content structure.

## Adding New Pages to CMS

To add a new page to the CMS:

1. Add the page schema to `/convex/cms.ts`
2. Create a CMS component in `/src/components/[page-name]/[PageName]WithCMS.tsx`
3. Update the page file to use the CMS component
4. Add the page to the seed script
5. Add the page to the CMS admin panel

## Support

For technical issues or questions about the CMS, contact the development team.