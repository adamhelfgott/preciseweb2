# How It Works Page - CMS Implementation

## Overview

The How It Works page has been implemented with full CMS support through Sanity. This allows marketing teams to edit all content without touching code.

## Schema Structure

The `howItWorksPage` schema includes:

### Hero Section
- `heroTitle`: Main page title
- `heroSubtitle`: Subtitle text
- `mediaBuyerTabLabel`: Label for media buyer tab
- `dataControllerTabLabel`: Label for data controller tab

### Media Buyer Section
- **Benefits**: Array of 3 benefits with:
  - Icon name (from Lucide icons)
  - Icon color (brand-green, electric-blue, bright-purple, etc.)
  - Title
  - Description

- **Process Steps**: Array of steps with:
  - Step number
  - Title
  - Description
  - Bullet points (with icon and text)
  - Visual example (optional)

- **Results**: Array of metrics with:
  - Metric value (e.g., "-47%", "3.2x")
  - Metric color
  - Label
  - Sublabel

- **CTA Section**:
  - Title
  - Subtitle
  - Button text
  - Button link

### Data Controller Section
Similar structure to Media Buyer but includes:
- **Trust/Comparison Section**: Side-by-side comparison cards
  - Card title
  - Highlight flag
  - Items with positive/negative indicators

## Visual Examples

Each process step can have a visual example with types:
- `dashboard`: Renders as a dashboard component
- `code`: Renders as a code block
- `chart`: Renders as a chart/visualization
- `custom`: Custom HTML content

## Files Created

1. **Schema**: `/sanity/schemas/howItWorksPage.ts`
   - Complete schema definition for Sanity Studio

2. **CMS Page**: `/src/app/(marketing)/how-it-works/page-cms.tsx`
   - CMS-powered version of the page
   - Falls back to default content if CMS is not configured
   - Handles dynamic icon and color mapping

3. **Visual Examples Component**: `/src/components/marketing/HowItWorksVisualExamples.tsx`
   - Handles rendering of visual examples
   - Provides default examples if none specified
   - Supports multiple content types

4. **Seed Script**: `/scripts/seed-how-it-works.ts`
   - Populates CMS with current page content
   - Run with: `SANITY_API_TOKEN=your-token npx tsx scripts/seed-how-it-works.ts`

## Usage

### To Use the CMS Version

Replace the current page import in your app router:

```tsx
// In /src/app/(marketing)/how-it-works/page.tsx
export { default } from './page-cms';
```

### Editing Content in Sanity Studio

1. Navigate to `/studio` in your app
2. Find "How It Works Page" in the content list
3. Edit any field
4. Changes are reflected immediately on the site

### Adding New Icons

Icons use Lucide React. To add new icons:
1. Import the icon in the CMS page
2. Add it to the `iconMap` object
3. Use the exact icon name in Sanity

### Color Options

Available colors for icons and metrics:
- `brand-green`
- `electric-blue`
- `bright-purple`
- `warm-coral`
- `golden-amber`

## Benefits

1. **No Code Changes**: Marketing can update all text, metrics, and structure
2. **Visual Editing**: See changes in real-time in Sanity Studio
3. **Flexible Content**: Add/remove steps, benefits, or results
4. **Type Safety**: Full TypeScript support
5. **Fallback Content**: Works even if CMS is not configured

## Migration

To switch to the CMS version:
1. Ensure Sanity is configured with proper env vars
2. Run the seed script to populate initial content
3. Update the page export to use the CMS version
4. Test all functionality

The original static page remains available as a backup.