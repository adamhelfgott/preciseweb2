import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get marketplace demand data
export const getMarketplaceDemand = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("marketplaceDemand")
      .order("desc")
      .take(10);
  },
});

// Get pricing recommendations for an asset
export const getPricingRecommendations = query({
  args: { assetId: v.id("dataAssets") },
  handler: async (ctx, args) => {
    const recommendations = await ctx.db
      .query("marketplacePricing")
      .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
      .order("desc")
      .first();
    
    return recommendations;
  },
});

// Get competitor benchmarks
export const getCompetitorBenchmarks = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("marketplaceCompetitors")
      .order("desc")
      .take(10);
  },
});

// Get integration opportunities
export const getIntegrationOpportunities = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("marketplaceIntegrations")
      .order("desc")
      .take(10);
  },
});

// Get marketplace solutions for media buyers
export const getMarketplaceSolutions = query({
  args: {
    objective: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.featured !== undefined) {
      return await ctx.db
        .query("marketplaceSolutions")
        .withIndex("by_featured", (q) => 
          q.eq("featured", args.featured!)
        )
        .order("desc")
        .take(20);
    } else if (args.objective) {
      return await ctx.db
        .query("marketplaceSolutions")
        .withIndex("by_objective", (q) => 
          q.eq("objective", args.objective!)
        )
        .order("desc")
        .take(20);
    } else {
      return await ctx.db
        .query("marketplaceSolutions")
        .order("desc")
        .take(20);
    }
  },
});

// Create marketplace demand data (for simulation/testing)
export const createMarketplaceDemand = mutation({
  args: {
    category: v.string(),
    avgCPM: v.float64(),
    growth: v.float64(),
    volume: v.string(),
    topBuyers: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("marketplaceDemand", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Create pricing recommendation
export const createPricingRecommendation = mutation({
  args: {
    assetId: v.id("dataAssets"),
    currentPrice: v.float64(),
    recommendedPrice: v.float64(),
    rationale: v.string(),
    potentialRevenue: v.float64(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("marketplacePricing", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Create competitor benchmark
export const createCompetitorBenchmark = mutation({
  args: {
    competitor: v.string(),
    marketShare: v.float64(),
    avgCPM: v.float64(),
    dataQuality: v.float64(),
    categories: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("marketplaceCompetitors", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Create integration opportunity
export const createIntegrationOpportunity = mutation({
  args: {
    partner: v.string(),
    type: v.string(),
    potentialRevenue: v.float64(),
    effort: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    description: v.string(),
    benefits: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("marketplaceIntegrations", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Create marketplace solution
export const createMarketplaceSolution = mutation({
  args: {
    name: v.string(),
    provider: v.string(),
    description: v.string(),
    featured: v.boolean(),
    objective: v.string(),
    cohortCount: v.number(),
    totalReach: v.number(),
    avgQualityScore: v.float64(),
    performanceMetrics: v.object({
      avgCAC: v.float64(),
      avgROAS: v.float64(),
      successRate: v.float64(),
      totalSpend: v.float64(),
      totalRevenue: v.float64(),
    }),
    dsps: v.array(v.string()),
    pricingModel: v.string(),
    pricingDetails: v.string(),
    status: v.union(v.literal("active"), v.literal("coming_soon")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("marketplaceSolutions", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Create Weather Company marketplace solution (one-time setup)
export const createWeatherCompanySolution = mutation({
  handler: async (ctx) => {
    // Check if Weather Company already exists
    const existing = await ctx.db
      .query("marketplaceSolutions")
      .filter((q) => q.eq(q.field("name"), "Weather Company"))
      .first();
    
    if (existing) {
      return { success: false, message: "Weather Company solution already exists" };
    }
    
    const result = await ctx.db.insert("marketplaceSolutions", {
      name: "Weather Company",
      provider: "Data Controller",
      description: "A real-time data provider offering global, predictive, and granular weather insights that are reliable, scalable, timely, and highly contextual",
      featured: false,
      objective: "Contextual Targeting",
      cohortCount: 15000000,
      totalReach: 1,
      avgQualityScore: 1,
      performanceMetrics: {
        avgCAC: 2,
        avgROAS: 3,
        successRate: 4,
        totalSpend: 5,
        totalRevenue: 6,
      },
      dsps: ["Google"],
      pricingModel: "CPM",
      pricingDetails: "Contact for custom pricing",
      status: "active",
      createdAt: Date.now(),
    });
    
    return { success: true, id: result };
  },
});