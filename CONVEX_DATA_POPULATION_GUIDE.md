# Convex Data Population Guide

## Overview
This document identifies which application views currently have no data (after disabling mock data) and which Convex tables need to be populated for a complete demo experience.

## Current State Analysis

### ✅ Views WITH Convex Data (Working)

#### Luigi's Views (Media Buyer)
1. **Campaigns Page** (`/app/campaigns`)
   - Main campaign list ✓
   - Campaign metrics ✓
   - DSP performance ✓
   - Creative fatigue alerts ✓
   - CAC predictions ✓

#### Mario's Views (Data Owner)
1. **Dashboard** (`/app/dashboard`)
   - Live earnings ticker ✓
   - Data assets overview ✓
   - Recommendations ✓
   - Activity feed (simulated) ✓

2. **Assets Page** (`/app/assets`)
   - Asset list ✓
   - Quality scores ✓
   - Monthly revenue ✓

3. **Earnings Page** (`/app/earnings`)
   - Transaction history ✓
   - Attribution breakdown ✓

### ❌ Views WITHOUT Data (Need Population)

#### Media Buyer Views

1. **Campaign Health Monitor**
   - **Missing**: campaignHealth records with detailed metrics
   - **Table**: `campaignHealth`
   - **Required Fields**: healthScore, metrics (ctrTrend, cvrTrend, etc.), alerts

2. **Budget Pacing**
   - **Missing**: Budget utilization data
   - **Table**: `campaigns` (needs budget field) + new budget tracking

3. **Audience Insights**
   - **Missing**: audienceSegments, audienceOverlap
   - **Tables**: `audienceSegments`, `audienceOverlap`

4. **Multi-Touch Attribution**
   - **Missing**: touchPoints, attribution models
   - **Table**: `touchPoints`

5. **Regional Performance Tracker**
   - **Missing**: regionalPerformance, regionalTimeSeries
   - **Tables**: `regionalPerformance`, `regionalTimeSeries`

6. **Competitive Intelligence**
   - **Missing**: competitiveIntelligence, performanceBenchmarks
   - **Tables**: `competitiveIntelligence`, `performanceBenchmarks`, `creativeTrends`

7. **Cross-Channel Incrementality**
   - **Missing**: crossChannelTests, testRegions, channelPerformance
   - **Tables**: `crossChannelTests`, `testRegions`, `channelPerformance`

8. **Custom Attribution Windows**
   - **Missing**: attributionModels, attributionWindows, conversionTiming
   - **Tables**: `attributionModels`, `attributionWindows`, `conversionTiming`

9. **Incrementality Testing**
   - **Missing**: incrementalityTests, testGroups, dailyTestResults
   - **Tables**: `incrementalityTests`, `testGroups`, `dailyTestResults`

10. **Audience Overlap Analysis**
    - **Missing**: Detailed overlap data between segments
    - **Table**: `audienceOverlap` (exists but empty)

11. **Smart Budget Reallocation**
    - **Missing**: budgetAllocations, budgetScenarios, performancePredictions
    - **Tables**: `budgetAllocations`, `budgetScenarios`, `performancePredictions`

#### Data Owner Views

1. **Market Rate Benchmarking**
   - **Partially Working**: Basic rates exist
   - **Missing**: Competitor data, price history
   - **Tables**: Need more `marketRates` records

2. **Data Enhancement Suggestions**
   - **Partially Working**: Basic suggestions
   - **Missing**: More diverse enhancement types
   - **Table**: `enhancementSuggestions`

3. **Buyer Request Dashboard**
   - **Partially Working**: Basic requests
   - **Missing**: More buyer requests with varied statuses
   - **Table**: `buyerRequests`

4. **Usage Analytics**
   - **Missing**: Detailed usage patterns
   - **Table**: `usageAnalytics`

5. **Data Asset Health Score**
   - **Missing**: Health metrics breakdown
   - **Table**: `assetHealthScores`

## Convex Tables Requiring Data

### High Priority (Core Features)
1. `campaignHealth` - For campaign health monitoring
2. `audienceSegments` - For audience insights
3. `touchPoints` - For multi-touch attribution
4. `budgetAllocations` - For budget optimization
5. `assetHealthScores` - For data quality metrics

### Medium Priority (Analytics)
1. `competitiveIntelligence` - Market comparison
2. `performanceBenchmarks` - Industry benchmarks
3. `regionalPerformance` - Geographic insights
4. `incrementalityTests` - Test results
5. `conversionTiming` - Attribution timing

### Low Priority (Advanced Features)
1. `crossChannelTests` - Cross-channel testing
2. `testRegions` - Regional test data
3. `channelPerformance` - Channel metrics
4. `creativeTrends` - Creative performance trends
5. `dataSourceRankings` - Provider rankings

## Migration Scripts Needed

### 1. Campaign Health Data
```typescript
// campaignHealthMigration.ts
- Health scores for all campaigns
- Trend metrics (CTR, CVR, CAC, ROAS)
- Alert generation based on thresholds
```

### 2. Audience Data
```typescript
// audienceDataMigration.ts
- 5-10 audience segments with performance metrics
- Overlap analysis between segments
- Lookalike recommendations
```

### 3. Attribution Data
```typescript
// attributionDataMigration.ts
- Touch points for conversions
- Multiple attribution models
- Conversion timing distribution
```

### 4. Budget & Performance Data
```typescript
// budgetPerformanceMigration.ts
- Budget allocations across campaigns
- Performance predictions
- Optimization scenarios
```

### 5. Competitive & Market Data
```typescript
// marketIntelligenceMigration.ts
- Industry benchmarks
- Competitor performance
- Market trends
```

## Data Population Strategy

### Phase 1: Core Functionality
1. Campaign health monitoring
2. Basic audience segments
3. Budget tracking
4. Asset health scores

### Phase 2: Analytics
1. Attribution models
2. Competitive intelligence
3. Regional performance
4. Market benchmarking

### Phase 3: Advanced Features
1. Incrementality testing
2. Cross-channel analysis
3. Predictive scenarios
4. Trend analysis

## Implementation Checklist

- [ ] Create migration scripts for each data category
- [ ] Ensure data consistency between Luigi and Mario's views
- [ ] Add temporal data for trend visualization
- [ ] Include variety in statuses and metrics
- [ ] Test all views after data population
- [ ] Document any remaining mock dependencies

## Success Criteria

A view is considered "complete" when:
1. It displays real Convex data
2. All interactive features work
3. Charts/graphs show meaningful trends
4. No console errors about missing data
5. Loading states handle empty data gracefully

## Next Steps

1. Prioritize which views are most important for the demo
2. Create targeted migration scripts for those views
3. Test each view after migration
4. Update this document as views are completed