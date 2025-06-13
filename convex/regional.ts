import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get regional performance data for a campaign
export const getRegionalPerformance = query({
  args: {
    campaignId: v.optional(v.id("campaigns")),
    buyerId: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("regionalPerformance");

    if (args.campaignId) {
      query = query.filter((q) => q.eq(q.field("campaignId"), args.campaignId));
    }

    if (args.buyerId) {
      query = query.filter((q) => q.eq(q.field("buyerId"), args.buyerId));
    }

    const results = await query
      .order("desc")
      .take(args.limit || 10);

    return results;
  },
});

// Get time series data for a specific DMA
export const getRegionalTimeSeries = query({
  args: {
    campaignId: v.id("campaigns"),
    dmaId: v.string(),
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - (args.days || 30));
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    const results = await ctx.db
      .query("regionalTimeSeries")
      .withIndex("by_campaign_dma", (q) =>
        q.eq("campaignId", args.campaignId).eq("dmaId", args.dmaId)
      )
      .filter((q) => q.gte(q.field("date"), cutoffDateStr))
      .order("asc")
      .collect();

    return results;
  },
});

// Simulate regional performance data
export const simulateRegionalPerformance = mutation({
  args: {
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Sample DMA data
    const dmaData = [
      {
        dmaId: "501",
        dmaName: "New York",
        state: "NY",
        coordinates: [-74.006, 40.7128],
        tvViewership: 2340000 + Math.floor(Math.random() * 200000),
        footTraffic: 145000 + Math.floor(Math.random() * 20000),
        correlation: 0.87 + (Math.random() * 0.1 - 0.05),
        lift: 34 + Math.floor(Math.random() * 10 - 5),
        roas: 4.2 + (Math.random() * 0.5 - 0.25),
        stores: 23,
        avgSpend: 47.50 + (Math.random() * 5 - 2.5),
        topBrands: ["McDonald's", "Target", "Walmart"],
        performance: "high" as const,
      },
      {
        dmaId: "602",
        dmaName: "Chicago",
        state: "IL",
        coordinates: [-87.6298, 41.8781],
        tvViewership: 1560000 + Math.floor(Math.random() * 150000),
        footTraffic: 98000 + Math.floor(Math.random() * 15000),
        correlation: 0.82 + (Math.random() * 0.1 - 0.05),
        lift: 28 + Math.floor(Math.random() * 8 - 4),
        roas: 3.8 + (Math.random() * 0.4 - 0.2),
        stores: 18,
        avgSpend: 42.30 + (Math.random() * 4 - 2),
        topBrands: ["Jewel-Osco", "Walgreens", "Home Depot"],
        performance: "high" as const,
      },
      {
        dmaId: "803",
        dmaName: "Los Angeles",
        state: "CA",
        coordinates: [-118.2437, 34.0522],
        tvViewership: 1890000 + Math.floor(Math.random() * 180000),
        footTraffic: 112000 + Math.floor(Math.random() * 18000),
        correlation: 0.79 + (Math.random() * 0.1 - 0.05),
        lift: 31 + Math.floor(Math.random() * 8 - 4),
        roas: 3.6 + (Math.random() * 0.4 - 0.2),
        stores: 21,
        avgSpend: 52.10 + (Math.random() * 5 - 2.5),
        topBrands: ["Ralph's", "CVS", "Best Buy"],
        performance: "medium" as const,
      },
      {
        dmaId: "504",
        dmaName: "Philadelphia",
        state: "PA",
        coordinates: [-75.1652, 39.9526],
        tvViewership: 980000 + Math.floor(Math.random() * 100000),
        footTraffic: 67000 + Math.floor(Math.random() * 10000),
        correlation: 0.75 + (Math.random() * 0.1 - 0.05),
        lift: 22 + Math.floor(Math.random() * 6 - 3),
        roas: 3.2 + (Math.random() * 0.3 - 0.15),
        stores: 15,
        avgSpend: 38.90 + (Math.random() * 4 - 2),
        topBrands: ["Wawa", "Acme", "Target"],
        performance: "medium" as const,
      },
      {
        dmaId: "511",
        dmaName: "Washington DC",
        state: "DC",
        coordinates: [-77.0369, 38.9072],
        tvViewership: 1120000 + Math.floor(Math.random() * 120000),
        footTraffic: 78000 + Math.floor(Math.random() * 12000),
        correlation: 0.91 + (Math.random() * 0.08 - 0.04),
        lift: 37 + Math.floor(Math.random() * 10 - 5),
        roas: 4.5 + (Math.random() * 0.5 - 0.25),
        stores: 14,
        avgSpend: 54.20 + (Math.random() * 6 - 3),
        topBrands: ["Giant", "Harris Teeter", "Whole Foods"],
        performance: "high" as const,
      },
    ];

    // Insert or update regional performance data
    for (const dma of dmaData) {
      // Check if we already have data for this DMA and campaign
      const existing = await ctx.db
        .query("regionalPerformance")
        .filter((q) =>
          q.and(
            q.eq(q.field("campaignId"), args.campaignId),
            q.eq(q.field("dmaId"), dma.dmaId)
          )
        )
        .first();

      if (existing) {
        // Update existing record
        await ctx.db.patch(existing._id, {
          ...dma,
          timestamp: Date.now(),
        });
      } else {
        // Insert new record
        await ctx.db.insert("regionalPerformance", {
          ...dma,
          campaignId: args.campaignId,
          buyerId: args.buyerId,
          timestamp: Date.now(),
        });
      }

      // Also generate time series data for the last 30 days
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        // Check if we already have data for this date
        const existingTS = await ctx.db
          .query("regionalTimeSeries")
          .withIndex("by_campaign_dma", (q) =>
            q.eq("campaignId", args.campaignId).eq("dmaId", dma.dmaId)
          )
          .filter((q) => q.eq(q.field("date"), dateStr))
          .first();

        if (!existingTS) {
          await ctx.db.insert("regionalTimeSeries", {
            campaignId: args.campaignId,
            dmaId: dma.dmaId,
            date: dateStr,
            tvImpressions: dma.tvViewership / 30 + Math.floor(Math.random() * 50000 - 25000),
            storeVisits: dma.footTraffic / 30 + Math.floor(Math.random() * 2000 - 1000),
            correlation: dma.correlation + (Math.random() * 0.1 - 0.05),
            roas: dma.roas + (Math.random() * 0.3 - 0.15),
            timestamp: date.getTime(),
          });
        }
      }
    }

    return { success: true };
  },
});

// Calculate correlation between TV impressions and foot traffic
export const calculateCorrelation = query({
  args: {
    campaignId: v.id("campaigns"),
    dmaId: v.string(),
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const timeSeries = await ctx.db
      .query("regionalTimeSeries")
      .withIndex("by_campaign_dma", (q) =>
        q.eq("campaignId", args.campaignId).eq("dmaId", args.dmaId)
      )
      .order("desc")
      .take(args.days || 30);

    if (timeSeries.length < 2) {
      return { correlation: 0, confidence: 0 };
    }

    // Calculate Pearson correlation coefficient
    const tvImpressions = timeSeries.map(d => d.tvImpressions);
    const storeVisits = timeSeries.map(d => d.storeVisits);

    const n = tvImpressions.length;
    const sumX = tvImpressions.reduce((a, b) => a + b, 0);
    const sumY = storeVisits.reduce((a, b) => a + b, 0);
    const sumXY = tvImpressions.reduce((total, x, i) => total + x * storeVisits[i], 0);
    const sumX2 = tvImpressions.reduce((total, x) => total + x * x, 0);
    const sumY2 = storeVisits.reduce((total, y) => total + y * y, 0);

    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    // Calculate confidence based on sample size
    const confidence = Math.min(n / 30, 1) * 100;

    return {
      correlation: Math.max(-1, Math.min(1, correlation)),
      confidence,
      sampleSize: n,
    };
  },
});