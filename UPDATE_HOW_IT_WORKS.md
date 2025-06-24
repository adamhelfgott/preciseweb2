# Update How It Works Page to Use CMS

The How It Works page currently has all content hardcoded. To use the CMS version:

## Option 1: Use the New CMS Page (Recommended)

1. Rename the current page:
```bash
mv src/app/(marketing)/how-it-works/page.tsx src/app/(marketing)/how-it-works/page-static.tsx
```

2. Rename the CMS version to be the main page:
```bash
mv src/app/(marketing)/how-it-works/page-cms.tsx src/app/(marketing)/how-it-works/page.tsx
```

## Option 2: Create Sanity Components

Update the existing page to fetch content from Sanity for sections like:

### Media Buyer Benefits
```typescript
// Instead of hardcoded:
<h3>Predictive CAC Forecasting</h3>
<p>AI predicts customer acquisition costs 4 weeks out with 92% accuracy</p>

// Use CMS:
const { data: benefits } = useSanityData(mediaBuyerBenefitsQuery);
{benefits?.map(benefit => (
  <div>
    <h3>{benefit.title}</h3>
    <p>{benefit.description}</p>
  </div>
))}
```

## Current Hardcoded Content That Needs CMS:

### Media Buyer Tab:
1. **Benefits Section:**
   - Predictive CAC Forecasting - AI predicts customer acquisition costs 4 weeks out with 92% accuracy
   - Multi-DSP Arbitrage - Automatically shift budgets between DSPs for 2.3x better performance
   - Creative Fatigue Detection - Know when to refresh creatives before performance drops

2. **Step by Step Process:**
   - Step 1: Connect Your Campaign Stack
   - Step 2: AI Monitors & Predicts Performance
   - Step 3: Execute with AI Copilot
   - All bullet points and descriptions

3. **Results Section:**
   - -47% CAC Reduction
   - 3.2x ROAS Improvement
   - 92% Forecast Accuracy

### Data Controller Tab:
Similar structure with different content

## The CMS page-cms.tsx already handles all of this!

Just use the CMS version and all content will be editable.