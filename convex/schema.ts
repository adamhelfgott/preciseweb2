import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users with roles
  users: defineTable({
    mockId: v.optional(v.string()), // Mock user ID for demo accounts
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("DATA_OWNER"), v.literal("MEDIA_BUYER"), v.literal("SOLUTION_CREATOR")),
    company: v.string(),
    onboardingCompleted: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // Data assets for data controllers
  dataAssets: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    type: v.string(),
    qualityScore: v.number(), // 0-100
    recordCount: v.number(),
    updateFrequency: v.number(), // hours
    revenuePerK: v.number(), // revenue per 1000 records
    industryAvgPerK: v.number(),
    usageRate: v.number(), // percentage 0-100
    monthlyRevenue: v.number(),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("pending")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),

  // Earnings events
  earnings: defineTable({
    ownerId: v.id("users"),
    assetId: v.id("dataAssets"),
    amount: v.number(),
    campaign: v.string(),
    impressions: v.number(),
    timestamp: v.number(),
    status: v.union(v.literal("pending"), v.literal("distributed")),
  })
    .index("by_owner", ["ownerId"])
    .index("by_asset", ["assetId"])
    .index("by_timestamp", ["timestamp"]),

  // Campaigns for media buyers
  campaigns: defineTable({
    buyerId: v.id("users"),
    name: v.string(),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("completed")),
    currentCAC: v.number(),
    previousCAC: v.number(),
    targetCAC: v.number(),
    ltv: v.number(),
    preciseLaunchDate: v.optional(v.number()),
    spend: v.number(),
    revenue: v.number(),
    roas: v.number(),
    dsps: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Campaign performance history
  campaignHistory: defineTable({
    campaignId: v.id("campaigns"),
    date: v.number(),
    cac: v.number(),
    spend: v.number(),
    conversions: v.number(),
    revenue: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_date", ["date"]),

  // Attribution data
  attributions: defineTable({
    campaignId: v.id("campaigns"),
    dataSourceId: v.id("dataAssets"),
    cacReduction: v.number(),
    percentage: v.number(), // contribution percentage
    value: v.number(), // monetary value
    timestamp: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_data_source", ["dataSourceId"]),

  // Marketplace solutions
  solutions: defineTable({
    creatorId: v.id("users"),
    name: v.string(),
    description: v.string(),
    featured: v.boolean(),
    cohortCount: v.number(),
    totalReach: v.number(),
    avgQualityScore: v.number(),
    dsps: v.array(v.string()),
    objective: v.string(),
    targetCAC: v.number(),
    targetROAS: v.number(),
    activations: v.number(),
    avgCAC: v.number(),
    successRate: v.number(),
    totalSpend: v.number(),
    totalRevenue: v.number(),
    pricingModel: v.string(),
    pricingDetails: v.string(),
    status: v.union(v.literal("active"), v.literal("draft"), v.literal("archived")),
    createdAt: v.number(),
  })
    .index("by_creator", ["creatorId"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"]),

  // Recommendations
  recommendations: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("data_optimization"), v.literal("campaign_optimization")),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    title: v.string(),
    description: v.string(),
    estimatedImpact: v.object({
      type: v.string(),
      value: v.number(),
    }),
    status: v.union(v.literal("new"), v.literal("viewed"), v.literal("applied"), v.literal("dismissed")),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  // DSP performance tracking
  dspPerformance: defineTable({
    campaignId: v.id("campaigns"),
    dsp: v.string(),
    spend: v.number(),
    currentECPM: v.number(),
    ecpmTrend: v.number(), // percentage change
    roas: v.number(),
    status: v.union(v.literal("scaling"), v.literal("optimizing"), v.literal("saturated")),
    timestamp: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_timestamp", ["timestamp"]),

  // AI Chat messages for persistence
  chatMessages: defineTable({
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    timestamp: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),

  // Creative assets and performance
  creatives: defineTable({
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    name: v.string(),
    type: v.union(v.literal("image"), v.literal("video"), v.literal("carousel"), v.literal("native")),
    format: v.string(), // e.g., "300x250", "1920x1080", "16:9"
    impressions: v.number(),
    clicks: v.number(),
    conversions: v.number(),
    spend: v.number(),
    ctr: v.number(), // Click-through rate
    cvr: v.number(), // Conversion rate
    cpa: v.number(), // Cost per acquisition
    fatigueScore: v.number(), // 0-100, higher means more fatigue
    daysActive: v.number(),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("retired")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"])
    .index("by_fatigue", ["fatigueScore"]),

  // Creative fatigue alerts
  creativeFatigueAlerts: defineTable({
    creativeId: v.id("creatives"),
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    severity: v.union(v.literal("warning"), v.literal("critical")),
    ctrDrop: v.number(), // Percentage drop in CTR
    cvrDrop: v.number(), // Percentage drop in CVR
    recommendedAction: v.string(),
    impact: v.string(), // e.g., "$5.2K wasted spend"
    status: v.union(v.literal("active"), v.literal("resolved"), v.literal("ignored")),
    createdAt: v.number(),
    resolvedAt: v.optional(v.number()),
  })
    .index("by_creative", ["creativeId"])
    .index("by_campaign", ["campaignId"])
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Campaign health metrics
  campaignHealth: defineTable({
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    healthScore: v.number(), // 0-100
    metrics: v.object({
      ctrTrend: v.number(), // percentage change
      cvrTrend: v.number(),
      cacTrend: v.number(),
      roasTrend: v.number(),
      budgetUtilization: v.number(), // percentage
      creativeFreshness: v.number(), // 0-100
    }),
    alerts: v.array(v.object({
      type: v.string(),
      severity: v.union(v.literal("info"), v.literal("warning"), v.literal("critical")),
      message: v.string(),
    })),
    timestamp: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_buyer", ["buyerId"])
    .index("by_timestamp", ["timestamp"]),

  // Creative performance history
  creativePerformance: defineTable({
    creativeId: v.id("creatives"),
    date: v.number(),
    hourlyData: v.array(v.object({
      hour: v.number(),
      impressions: v.number(),
      clicks: v.number(),
      conversions: v.number(),
      spend: v.number(),
      ctr: v.number(),
      cvr: v.number(),
    })),
  })
    .index("by_creative", ["creativeId"])
    .index("by_date", ["date"]),

  // Multi-touch attribution data
  touchPoints: defineTable({
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    conversionId: v.string(), // Unique conversion identifier
    timestamp: v.number(),
    touchPoints: v.array(v.object({
      channel: v.string(),
      timestamp: v.number(),
      engagement: v.string(), // e.g., "impression", "click", "view"
      attribution: v.number(), // Attribution percentage
      dataSource: v.optional(v.string()),
    })),
    totalValue: v.number(),
    modelType: v.union(v.literal("firstTouch"), v.literal("lastTouch"), v.literal("linear"), v.literal("timeDecay"), v.literal("dataDriver")),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_buyer", ["buyerId"])
    .index("by_timestamp", ["timestamp"]),

  // CAC predictions
  cacPredictions: defineTable({
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    timestamp: v.number(),
    predictions: v.array(v.object({
      week: v.number(), // 1-4 weeks ahead
      predictedCAC: v.number(),
      confidenceLow: v.number(),
      confidenceHigh: v.number(),
      factors: v.array(v.object({
        name: v.string(),
        impact: v.number(), // percentage impact
        direction: v.union(v.literal("positive"), v.literal("negative")),
      })),
    })),
    currentCAC: v.number(),
    modelAccuracy: v.number(), // 0-100
  })
    .index("by_campaign", ["campaignId"])
    .index("by_buyer", ["buyerId"])
    .index("by_timestamp", ["timestamp"]),

  // Regional performance (DMA-level data)
  regionalPerformance: defineTable({
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    dmaId: v.string(), // DMA code (e.g., "501" for NYC)
    dmaName: v.string(), // e.g., "New York"
    state: v.string(),
    coordinates: v.array(v.float64()), // [longitude, latitude]
    tvViewership: v.number(),
    footTraffic: v.number(),
    correlation: v.float64(), // TV to foot traffic correlation
    lift: v.number(), // percentage lift
    roas: v.float64(),
    stores: v.number(),
    avgSpend: v.float64(),
    topBrands: v.array(v.string()),
    performance: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    timestamp: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_buyer", ["buyerId"])
    .index("by_dma", ["dmaId"])
    .index("by_timestamp", ["timestamp"]),

  // Regional time series data
  regionalTimeSeries: defineTable({
    campaignId: v.id("campaigns"),
    dmaId: v.string(),
    date: v.string(),
    tvImpressions: v.number(),
    storeVisits: v.number(),
    correlation: v.float64(),
    roas: v.float64(),
    timestamp: v.number(),
  })
    .index("by_campaign_dma", ["campaignId", "dmaId"])
    .index("by_date", ["date"]),

  // Shapley value calculations for data owners
  shapleyValues: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    campaignId: v.id("campaigns"),
    calculationDate: v.number(),
    shapleyValue: v.number(), // Contribution value 0-1
    marginalContribution: v.number(), // Dollar value
    coalitionSize: v.number(), // Number of data sources in coalition
    computationTime: v.number(), // ms taken to calculate
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"])
    .index("by_campaign", ["campaignId"])
    .index("by_date", ["calculationDate"]),

  // Competitive intelligence data
  competitiveIntelligence: defineTable({
    buyerId: v.id("users"),
    metric: v.string(), // e.g., "industryAvgCAC", "marketCTR", "avgROAS"
    value: v.float64(),
    change: v.float64(), // percentage change
    timestamp: v.number(),
    timeRange: v.union(v.literal("7d"), v.literal("30d"), v.literal("90d")),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_metric", ["metric"])
    .index("by_timestamp", ["timestamp"]),

  // Performance benchmarks
  performanceBenchmarks: defineTable({
    buyerId: v.id("users"),
    metric: v.string(), // e.g., "Targeting Precision", "Creative Quality"
    yourScore: v.number(),
    industryAvg: v.number(),
    top10Percentile: v.number(),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_metric", ["metric"]),

  // Creative trends tracking
  creativeTrends: defineTable({
    format: v.string(), // e.g., "Video 15s", "Interactive Cards"
    adoption: v.number(), // percentage
    performance: v.string(), // e.g., "+23% CTR"
    momentum: v.union(v.literal("rising"), v.literal("stable"), v.literal("declining"), v.literal("emerging")),
    timestamp: v.number(),
  })
    .index("by_format", ["format"])
    .index("by_momentum", ["momentum"]),

  // Data source rankings
  dataSourceRankings: defineTable({
    provider: v.string(),
    marketShare: v.number(),
    avgROAS: v.float64(),
    trend: v.union(v.literal("up"), v.literal("down"), v.literal("stable")),
    ranking: v.number(),
    timestamp: v.number(),
  })
    .index("by_ranking", ["ranking"])
    .index("by_provider", ["provider"]),

  // Cross-channel incrementality test data
  crossChannelTests: defineTable({
    buyerId: v.id("users"),
    testName: v.string(),
    status: v.union(v.literal("running"), v.literal("paused"), v.literal("completed")),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    daysRunning: v.number(),
    confidence: v.float64(),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Test regions for incrementality
  testRegions: defineTable({
    testId: v.id("crossChannelTests"),
    regionId: v.string(),
    regionName: v.string(),
    coordinates: v.array(v.float64()),
    testType: v.string(), // e.g., "Linear + CTV", "Linear Only", "Control"
    isControl: v.boolean(),
    tvReach: v.number(),
    ctvReach: v.number(),
    linearOnly: v.number(),
    overlap: v.number(),
    lift: v.float64(),
    confidence: v.float64(),
  })
    .index("by_test", ["testId"])
    .index("by_region", ["regionId"]),

  // Channel performance metrics
  channelPerformance: defineTable({
    testId: v.id("crossChannelTests"),
    date: v.string(),
    channel: v.string(), // "linear", "ctv", "combined", "control"
    index: v.float64(), // Performance index (base 100)
    reach: v.number(),
    conversions: v.number(),
    incrementalLift: v.float64(),
  })
    .index("by_test_date", ["testId", "date"])
    .index("by_channel", ["channel"]),

  // ACR (Automatic Content Recognition) matching data
  acrMatching: defineTable({
    testId: v.id("crossChannelTests"),
    segment: v.string(), // e.g., "Sports Viewers", "News Watchers"
    linearReach: v.float64(), // percentage
    ctvMatch: v.float64(), // percentage
    incremental: v.float64(), // percentage
    timestamp: v.number(),
  })
    .index("by_test", ["testId"])
    .index("by_segment", ["segment"]),

  // Custom attribution models
  attributionModels: defineTable({
    buyerId: v.id("users"),
    name: v.string(),
    description: v.string(),
    isCustom: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_name", ["name"]),

  // Attribution windows configuration
  attributionWindows: defineTable({
    modelId: v.id("attributionModels"),
    name: v.string(),
    duration: v.float64(), // in days
    type: v.union(v.literal("click"), v.literal("view"), v.literal("engagement")),
    weight: v.number(), // 0-100
    isActive: v.boolean(),
  })
    .index("by_model", ["modelId"])
    .index("by_type", ["type"]),

  // Attribution model performance
  attributionPerformance: defineTable({
    modelId: v.id("attributionModels"),
    campaignId: v.optional(v.id("campaigns")),
    roas: v.float64(),
    conversions: v.number(),
    revenue: v.float64(),
    timestamp: v.number(),
  })
    .index("by_model", ["modelId"])
    .index("by_campaign", ["campaignId"]),

  // Conversion timing data
  conversionTiming: defineTable({
    buyerId: v.id("users"),
    day: v.number(), // days since exposure
    conversions: v.number(),
    revenue: v.float64(),
    channel: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_day", ["day"]),

  // Incrementality tests
  incrementalityTests: defineTable({
    buyerId: v.id("users"),
    name: v.string(),
    campaign: v.string(),
    status: v.union(v.literal("planning"), v.literal("running"), v.literal("completed")),
    startDate: v.number(),
    duration: v.number(), // days
    progress: v.number(), // percentage
    liftConversions: v.float64(),
    liftRevenue: v.float64(),
    confidence: v.float64(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Test groups
  testGroups: defineTable({
    testId: v.id("incrementalityTests"),
    name: v.string(),
    size: v.number(),
    spend: v.float64(),
    conversions: v.number(),
    revenue: v.float64(),
    isControl: v.boolean(),
  })
    .index("by_test", ["testId"]),

  // Test insights
  testInsights: defineTable({
    testId: v.id("incrementalityTests"),
    insight: v.string(),
    timestamp: v.number(),
  })
    .index("by_test", ["testId"]),

  // Daily test results
  dailyTestResults: defineTable({
    testId: v.id("incrementalityTests"),
    day: v.number(),
    testValue: v.float64(),
    controlValue: v.float64(),
    lift: v.float64(),
    timestamp: v.number(),
  })
    .index("by_test", ["testId"])
    .index("by_day", ["day"]),

  // Audience overlap analysis
  audienceOverlap: defineTable({
    buyerId: v.id("users"),
    audienceA: v.string(),
    audienceB: v.string(),
    overlapPercentage: v.float64(),
    uniqueA: v.float64(),
    uniqueB: v.float64(),
    totalReach: v.number(),
    costSaving: v.float64(),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_audiences", ["audienceA", "audienceB"]),

  // Audience segments
  audienceSegments: defineTable({
    buyerId: v.id("users"),
    name: v.string(),
    size: v.number(),
    cpm: v.float64(),
    performance: v.object({
      ctr: v.float64(),
      cvr: v.float64(),
      roas: v.float64(),
    }),
    providers: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_name", ["name"]),

  // Overlap recommendations
  overlapRecommendations: defineTable({
    buyerId: v.id("users"),
    recommendation: v.string(),
    impact: v.string(),
    savings: v.float64(),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    status: v.union(v.literal("new"), v.literal("applied"), v.literal("dismissed")),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Budget allocations
  budgetAllocations: defineTable({
    buyerId: v.id("users"),
    campaignId: v.string(),
    campaignName: v.string(),
    currentBudget: v.float64(),
    recommendedBudget: v.float64(),
    currentROAS: v.float64(),
    projectedROAS: v.float64(),
    reason: v.string(),
    confidence: v.float64(),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_campaign", ["campaignId"]),

  // Budget scenarios
  budgetScenarios: defineTable({
    buyerId: v.id("users"),
    name: v.string(),
    description: v.string(),
    totalBudget: v.float64(),
    projectedRevenue: v.float64(),
    projectedROAS: v.float64(),
    allocations: v.array(v.object({
      campaignId: v.string(),
      campaignName: v.string(),
      budget: v.float64(),
      percentage: v.float64(),
    })),
    status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
    createdAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Performance predictions
  performancePredictions: defineTable({
    buyerId: v.id("users"),
    campaignId: v.string(),
    budgetLevel: v.float64(),
    predictedClicks: v.number(),
    predictedConversions: v.number(),
    predictedRevenue: v.float64(),
    predictedROAS: v.float64(),
    confidence: v.float64(),
    timestamp: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_campaign", ["campaignId"]),

  // Phase 8: Data Controller Advanced Features
  
  // Data asset health scores
  assetHealthScores: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    overallScore: v.float64(),
    completeness: v.float64(),
    accuracy: v.float64(),
    freshness: v.float64(),
    consistency: v.float64(),
    uniqueness: v.float64(),
    recommendations: v.array(v.string()),
    scoreHistory: v.array(v.object({
      date: v.string(),
      score: v.float64(),
    })),
    lastUpdated: v.number(),
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"]),

  // Market rate benchmarking
  marketRates: defineTable({
    segment: v.string(),
    avgCPM: v.float64(),
    minCPM: v.float64(),
    maxCPM: v.float64(),
    volume: v.number(),
    qualityPremium: v.float64(),
    lastUpdated: v.number(),
  })
    .index("by_segment", ["segment"]),

  // Asset market positioning
  assetMarketPosition: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    segment: v.string(),
    currentCPM: v.float64(),
    marketAvgCPM: v.float64(),
    percentile: v.float64(),
    competitorCount: v.number(),
    demandLevel: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    pricingOpportunity: v.optional(v.object({
      suggestedCPM: v.float64(),
      potentialRevenue: v.float64(),
      rationale: v.string(),
    })),
    timestamp: v.number(),
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"])
    .index("by_segment", ["segment"]),

  // Data enhancement suggestions
  enhancementSuggestions: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    type: v.union(v.literal("enrichment"), v.literal("validation"), v.literal("expansion"), v.literal("quality")),
    title: v.string(),
    description: v.string(),
    impact: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    effort: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    potentialRevenue: v.float64(),
    requirements: v.array(v.string()),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("completed"), v.literal("dismissed")),
    createdAt: v.number(),
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),

  // Buyer requests
  buyerRequests: defineTable({
    buyerId: v.id("users"),
    title: v.string(),
    description: v.string(),
    segments: v.array(v.string()),
    budget: v.float64(),
    targetCAC: v.float64(),
    targetAudience: v.string(),
    requiredAttributes: v.array(v.string()),
    preferredAttributes: v.array(v.string()),
    campaignType: v.string(),
    timeline: v.string(),
    status: v.union(v.literal("active"), v.literal("matched"), v.literal("expired")),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  // Request matches
  requestMatches: defineTable({
    requestId: v.id("buyerRequests"),
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    matchScore: v.float64(),
    matchedAttributes: v.array(v.string()),
    missingAttributes: v.array(v.string()),
    pricing: v.object({
      cpm: v.float64(),
      estimatedReach: v.number(),
      totalCost: v.float64(),
    }),
    status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("negotiating"), v.literal("accepted"), v.literal("rejected")),
    timestamp: v.number(),
  })
    .index("by_request", ["requestId"])
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),

  // Usage analytics
  usageAnalytics: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    date: v.string(),
    accessCount: v.number(),
    uniqueUsers: v.number(),
    queries: v.array(v.object({
      userId: v.id("users"),
      timestamp: v.number(),
      queryType: v.string(),
      responseTime: v.number(),
    })),
    revenue: v.float64(),
    topUseCase: v.string(),
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"])
    .index("by_date", ["date"]),

  // Pricing recommendations
  pricingRecommendations: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    currentPrice: v.float64(),
    recommendedPrice: v.float64(),
    confidence: v.float64(),
    factors: v.array(v.object({
      name: v.string(),
      impact: v.float64(),
      description: v.string(),
    })),
    projectedRevenue: v.object({
      monthly: v.float64(),
      quarterly: v.float64(),
      yearly: v.float64(),
    }),
    competitorPrices: v.array(v.object({
      competitor: v.string(),
      price: v.float64(),
      quality: v.float64(),
    })),
    createdAt: v.number(),
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"]),

  // Data validation results
  validationResults: defineTable({
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    validationType: v.union(v.literal("schema"), v.literal("completeness"), v.literal("accuracy"), v.literal("consistency")),
    passed: v.boolean(),
    issues: v.array(v.object({
      severity: v.union(v.literal("error"), v.literal("warning"), v.literal("info")),
      field: v.string(),
      message: v.string(),
      count: v.number(),
    })),
    summary: v.object({
      totalRecords: v.number(),
      validRecords: v.number(),
      invalidRecords: v.number(),
      validationScore: v.float64(),
    }),
    autoFixed: v.number(),
    timestamp: v.number(),
  })
    .index("by_asset", ["assetId"])
    .index("by_owner", ["ownerId"])
    .index("by_type", ["validationType"]),

  // Revenue shares
  revenueShares: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    description: v.string(),
    participants: v.array(v.object({
      userId: v.optional(v.id("users")),
      email: v.string(),
      name: v.string(),
      role: v.string(),
      sharePercentage: v.float64(),
    })),
    rules: v.array(v.object({
      condition: v.string(),
      adjustment: v.float64(),
      description: v.string(),
    })),
    status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
    effectiveDate: v.number(),
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),

  // White label reports
  whitelabelReports: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    template: v.string(),
    branding: v.object({
      logo: v.optional(v.string()),
      primaryColor: v.string(),
      secondaryColor: v.string(),
      fontFamily: v.string(),
    }),
    sections: v.array(v.union(
      v.literal("executive_summary"),
      v.literal("performance_metrics"),
      v.literal("attribution_analysis"),
      v.literal("recommendations"),
      v.literal("appendix")
    )),
    dataRange: v.object({
      start: v.number(),
      end: v.number(),
    }),
    recipients: v.array(v.object({
      email: v.string(),
      name: v.string(),
    })),
    schedule: v.optional(v.object({
      frequency: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
      dayOfWeek: v.optional(v.number()),
      dayOfMonth: v.optional(v.number()),
      time: v.string(),
    })),
    lastGenerated: v.optional(v.number()),
    status: v.union(v.literal("draft"), v.literal("active"), v.literal("paused")),
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),
});