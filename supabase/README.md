# Precise.ai Database Schema

## Overview

This schema is designed for maximum extensibility without requiring database migrations. The key principles are:

1. **Event Sourcing** - Store raw events, compute analytics on-demand
2. **JSONB Properties** - Add new fields without ALTER TABLE
3. **Polymorphic Relations** - Flexible entity relationships
4. **Time Series Metrics** - Any metric type can be tracked

## Core Tables

### Organizations
Companies using Precise (data owners, media buyers, or both).

### Users
Flexible role system - users belong to organizations with specific roles.

### Data Assets
Any type of data (audience, behavioral, location, etc.) with extensible properties:
```json
{
  "size": 1000000,
  "quality_score": 95,
  "categories": ["automotive", "luxury"],
  "refresh_frequency": "daily",
  "custom_field": "any_value"
}
```

### Campaigns
Marketing campaigns with flexible properties:
```json
{
  "budget": 50000,
  "targeting": {
    "age": "25-54",
    "interests": ["sports", "travel"]
  },
  "creatives": [...],
  "dsp_settings": {...}
}
```

### Events
Universal event table for any activity:
- Impressions, clicks, conversions
- Data usage events
- User actions
- System events

### Metrics
Time-series data for any metric:
- Revenue, impressions, CTR
- Attribution values
- Quality scores
- Custom metrics

### Relationships
Flexible many-to-many associations:
- `campaign_uses_asset`
- `user_manages_campaign`
- `asset_requires_permission`
- Any future relationship type

### Transactions
Financial records with flexible line items in properties.

### Permissions
Granular permission system with conditions (time-based, usage limits, etc.).

## Extensibility Examples

### Adding a New Feature: Creative Fatigue Detection

No schema changes needed! Just:

1. Add events with `event_type: 'creative_view'`
2. Store fatigue metrics in the metrics table
3. Add properties to campaigns: `{"creative_fatigue_threshold": 2000000}`

### Adding a New Business Model: Subscription Tiers

1. Add to organization properties: `{"subscription_tier": "enterprise"}`
2. Add permission conditions: `{"tier_required": "enterprise"}`
3. Track usage in events table

### Adding Complex Attribution Models

1. Store touchpoints as events
2. Add attribution calculations as views
3. Store results in metrics table
4. No schema changes!

## Setup Instructions

1. Create a new Supabase project at https://app.supabase.com

2. Get your project credentials:
   - Project URL
   - Anon Key
   - Service Role Key

3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. Run migrations:
   ```bash
   npx supabase db push
   ```

5. Generate TypeScript types:
   ```bash
   npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts
   ```

## Best Practices

1. **Use Properties JSONB**: Don't add columns, add to properties
2. **Event First**: Record events, derive state
3. **Views for Queries**: Complex queries become views
4. **Audit Everything**: Built-in audit trail for compliance

This schema can handle any pivot in business model or features without database migrations!