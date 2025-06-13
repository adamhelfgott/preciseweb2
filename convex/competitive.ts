import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get competitive intelligence metrics
export const getMetrics = query({
  args: {
    buyerId: v.id("users"),
    timeRange: v.union(v.literal("7d"), v.literal("30d"), v.literal("90d")),
  },
  handler: async (ctx, args) => {
    const metrics = await ctx.db
      .query("competitiveIntelligence")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("timeRange"), args.timeRange))
      .order("desc")
      .collect();

    // Get unique metrics (latest value for each metric)
    const latestMetrics = new Map();
    for (const metric of metrics) {
      if (!latestMetrics.has(metric.metric) || metric.timestamp > latestMetrics.get(metric.metric).timestamp) {
        latestMetrics.set(metric.metric, metric);
      }
    }

    return Array.from(latestMetrics.values());
  },
});

// Get performance benchmarks
export const getBenchmarks = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const benchmarks = await ctx.db
      .query("performanceBenchmarks")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .order("desc")
      .collect();

    // Get latest benchmark for each metric
    const latestBenchmarks = new Map();
    for (const benchmark of benchmarks) {
      if (!latestBenchmarks.has(benchmark.metric) || benchmark.timestamp > latestBenchmarks.get(benchmark.metric).timestamp) {
        latestBenchmarks.set(benchmark.metric, benchmark);
      }
    }

    return Array.from(latestBenchmarks.values());
  },
});

// Get creative trends
export const getCreativeTrends = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const trends = await ctx.db
      .query("creativeTrends")
      .order("desc")
      .take(args.limit || 10);

    return trends;
  },
});

// Get data source rankings
export const getDataSourceRankings = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const rankings = await ctx.db
      .query("dataSourceRankings")
      .withIndex("by_ranking", (q) => q.gte("ranking", 1))
      .order("asc")
      .take(args.limit || 5);

    return rankings;
  },
});

// Simulate competitive intelligence data
export const simulateCompetitiveData = mutation({
  args: {
    buyerId: v.id("users"),
    timeRange: v.union(v.literal("7d"), v.literal("30d"), v.literal("90d")),
  },
  handler: async (ctx, args) => {
    // Market metrics
    const marketMetrics = [
      {
        metric: "industryAvgCAC",
        value: 47.23 + (Math.random() * 5 - 2.5),
        change: -12.5 + (Math.random() * 4 - 2),
      },
      {
        metric: "marketCTR",
        value: 2.34 + (Math.random() * 0.3 - 0.15),
        change: 8.3 + (Math.random() * 3 - 1.5),
      },
      {
        metric: "avgROAS",
        value: 3.2 + (Math.random() * 0.4 - 0.2),
        change: 15.2 + (Math.random() * 5 - 2.5),
      },
      {
        metric: "creativeRefreshRate",
        value: 14 + Math.floor(Math.random() * 3 - 1.5),
        change: -5.0 + (Math.random() * 2 - 1),
      },
    ];

    // Insert market metrics
    for (const metric of marketMetrics) {
      await ctx.db.insert("competitiveIntelligence", {
        buyerId: args.buyerId,
        ...metric,
        timestamp: Date.now(),
        timeRange: args.timeRange,
      });
    }

    // Performance benchmarks
    const performanceMetrics = [
      { metric: "Targeting Precision", yourScore: 85, industryAvg: 72, top10Percentile: 92 },
      { metric: "Creative Quality", yourScore: 78, industryAvg: 68, top10Percentile: 88 },
      { metric: "Data Utilization", yourScore: 92, industryAvg: 61, top10Percentile: 95 },
      { metric: "Attribution Accuracy", yourScore: 88, industryAvg: 54, top10Percentile: 90 },
      { metric: "Budget Efficiency", yourScore: 81, industryAvg: 69, top10Percentile: 87 },
      { metric: "Campaign Velocity", yourScore: 75, industryAvg: 71, top10Percentile: 93 },
    ];

    for (const benchmark of performanceMetrics) {
      // Add some randomness
      const adjusted = {
        ...benchmark,
        yourScore: Math.min(100, Math.max(0, benchmark.yourScore + Math.floor(Math.random() * 6 - 3))),
        industryAvg: Math.min(100, Math.max(0, benchmark.industryAvg + Math.floor(Math.random() * 4 - 2))),
        top10Percentile: Math.min(100, Math.max(0, benchmark.top10Percentile + Math.floor(Math.random() * 3 - 1))),
      };

      await ctx.db.insert("performanceBenchmarks", {
        buyerId: args.buyerId,
        ...adjusted,
        timestamp: Date.now(),
      });
    }

    // Creative trends (global data, not buyer-specific)
    const creativeTrends = [
      { format: "Video 15s", adoption: 78, performance: "+23% CTR", momentum: "rising" as const },
      { format: "Interactive Cards", adoption: 45, performance: "+31% engagement", momentum: "rising" as const },
      { format: "Static Banner", adoption: 92, performance: "-12% CTR", momentum: "declining" as const },
      { format: "Carousel Ads", adoption: 67, performance: "+18% conversion", momentum: "stable" as const },
      { format: "AR Try-On", adoption: 23, performance: "+45% conversion", momentum: "emerging" as const },
    ];

    for (const trend of creativeTrends) {
      // Check if trend already exists
      const existing = await ctx.db
        .query("creativeTrends")
        .withIndex("by_format", (q) => q.eq("format", trend.format))
        .first();

      if (existing) {
        // Update existing
        await ctx.db.patch(existing._id, {
          adoption: Math.min(100, Math.max(0, trend.adoption + Math.floor(Math.random() * 10 - 5))),
          performance: trend.performance,
          momentum: trend.momentum,
          timestamp: Date.now(),
        });
      } else {
        // Insert new
        await ctx.db.insert("creativeTrends", {
          ...trend,
          timestamp: Date.now(),
        });
      }
    }

    // Data source rankings (global data)
    const dataSourceRankings = [
      { provider: "Behavioral Signals Co", marketShare: 23, avgROAS: 4.2, trend: "up" as const },
      { provider: "Demographic Plus", marketShare: 19, avgROAS: 3.8, trend: "stable" as const },
      { provider: "Intent Stream", marketShare: 17, avgROAS: 4.5, trend: "up" as const },
      { provider: "Location Intel", marketShare: 15, avgROAS: 3.5, trend: "down" as const },
      { provider: "Premium Audiences", marketShare: 12, avgROAS: 4.1, trend: "up" as const },
    ];

    for (let i = 0; i < dataSourceRankings.length; i++) {
      const ranking = dataSourceRankings[i];
      
      // Check if ranking already exists
      const existing = await ctx.db
        .query("dataSourceRankings")
        .withIndex("by_provider", (q) => q.eq("provider", ranking.provider))
        .first();

      if (existing) {
        // Update existing
        await ctx.db.patch(existing._id, {
          marketShare: Math.max(0, ranking.marketShare + (Math.random() * 2 - 1)),
          avgROAS: Math.max(0, ranking.avgROAS + (Math.random() * 0.2 - 0.1)),
          trend: ranking.trend,
          ranking: i + 1,
          timestamp: Date.now(),
        });
      } else {
        // Insert new
        await ctx.db.insert("dataSourceRankings", {
          ...ranking,
          ranking: i + 1,
          timestamp: Date.now(),
        });
      }
    }

    return { success: true };
  },
});

// Get trend data for charts
export const getTrendData = query({
  args: {
    buyerId: v.id("users"),
    metric: v.string(),
    days: v.number(),
  },
  handler: async (ctx, args) => {
    const cutoffTime = Date.now() - (args.days * 24 * 60 * 60 * 1000);
    
    const data = await ctx.db
      .query("competitiveIntelligence")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => 
        q.and(
          q.eq(q.field("metric"), args.metric),
          q.gte(q.field("timestamp"), cutoffTime)
        )
      )
      .order("asc")
      .collect();

    return data;
  },
});