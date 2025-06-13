import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get touch points for a campaign
export const getTouchPoints = query({
  args: { 
    campaignId: v.optional(v.id("campaigns")),
    buyerId: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (args.campaignId) {
      const touchPoints = await ctx.db
        .query("touchPoints")
        .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId!))
        .order("desc")
        .take(args.limit || 100);
      return touchPoints;
    } else if (args.buyerId) {
      const touchPoints = await ctx.db
        .query("touchPoints")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId!))
        .order("desc")
        .take(args.limit || 100);
      return touchPoints;
    } else {
      const touchPoints = await ctx.db
        .query("touchPoints")
        .order("desc")
        .take(args.limit || 100);
      return touchPoints;
    }
  },
});

// Get attribution summary by channel
export const getAttributionByChannel = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const touchPoints = await ctx.db
      .query("touchPoints")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .collect();
    
    // Aggregate by channel
    const channelMap = new Map<string, { 
      conversions: number, 
      value: number, 
      touchPoints: number 
    }>();
    
    for (const conversion of touchPoints) {
      for (const tp of conversion.touchPoints) {
        const current = channelMap.get(tp.channel) || { 
          conversions: 0, 
          value: 0, 
          touchPoints: 0 
        };
        
        current.conversions++;
        current.value += conversion.totalValue * (tp.attribution / 100);
        current.touchPoints++;
        
        channelMap.set(tp.channel, current);
      }
    }
    
    return Array.from(channelMap.entries()).map(([channel, data]) => ({
      channel,
      ...data,
      avgValue: data.value / data.conversions,
    }));
  },
});

// Create touch point data
export const createTouchPoint = mutation({
  args: {
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    conversionId: v.string(),
    touchPoints: v.array(v.object({
      channel: v.string(),
      timestamp: v.number(),
      engagement: v.string(),
      attribution: v.number(),
      dataSource: v.optional(v.string()),
    })),
    totalValue: v.number(),
    modelType: v.union(v.literal("firstTouch"), v.literal("lastTouch"), v.literal("linear"), v.literal("timeDecay"), v.literal("dataDriver")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("touchPoints", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Simulate attribution data (for demo)
export const simulateAttribution = mutation({
  args: { 
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const channels = ["Precise Direct", "Google Ads", "Meta", "Email", "Organic"];
    const dataSources = ["Precise AI", "LiveRamp", "First-Party", "Third-Party"];
    
    // Generate 5 conversion journeys
    for (let i = 0; i < 5; i++) {
      const numTouchPoints = 2 + Math.floor(Math.random() * 4);
      const touchPoints = [];
      
      // Create touch points over the last 7 days
      const baseTime = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const timeIncrement = (7 * 24 * 60 * 60 * 1000) / numTouchPoints;
      
      for (let j = 0; j < numTouchPoints; j++) {
        const isFirst = j === 0;
        const isLast = j === numTouchPoints - 1;
        
        touchPoints.push({
          channel: channels[Math.floor(Math.random() * channels.length)],
          timestamp: baseTime + (j * timeIncrement),
          engagement: isLast ? "conversion" : isFirst ? "impression" : "click",
          attribution: 100 / numTouchPoints, // Linear for simplicity
          dataSource: dataSources[Math.floor(Math.random() * dataSources.length)],
        });
      }
      
      await ctx.db.insert("touchPoints", {
        campaignId: args.campaignId,
        buyerId: args.buyerId,
        conversionId: `conv_${Date.now()}_${i}`,
        touchPoints,
        totalValue: 100 + Math.random() * 200,
        modelType: "linear",
        timestamp: Date.now(),
      });
    }
  },
});

// Get CAC predictions
export const getCACPredictions = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const predictions = await ctx.db
      .query("cacPredictions")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .order("desc")
      .first();
    
    return predictions;
  },
});

// Create CAC predictions
export const createCACPrediction = mutation({
  args: {
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    currentCAC: v.number(),
    predictions: v.array(v.object({
      week: v.number(),
      predictedCAC: v.number(),
      confidenceLow: v.number(),
      confidenceHigh: v.number(),
      factors: v.array(v.object({
        name: v.string(),
        impact: v.number(),
        direction: v.union(v.literal("positive"), v.literal("negative")),
      })),
    })),
    modelAccuracy: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cacPredictions", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Simulate CAC predictions
export const simulateCACPredictions = mutation({
  args: { 
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) return;
    
    const currentCAC = campaign.currentCAC || 35;
    const predictions = [];
    
    // Generate 4-week predictions
    for (let week = 1; week <= 4; week++) {
      const trend = -0.02 * week; // 2% improvement per week
      const baseCAC = currentCAC * (1 + trend);
      const variance = 0.1 * week; // Increasing uncertainty
      
      const factors = [
        { 
          name: "Precise Data Optimization", 
          impact: -8 - week, 
          direction: "positive" as const 
        },
        { 
          name: "Seasonal Trends", 
          impact: Math.random() * 5, 
          direction: Math.random() > 0.5 ? "positive" as const : "negative" as const
        },
        { 
          name: "Creative Fatigue", 
          impact: 3 + week * 0.5, 
          direction: "negative" as const 
        },
        { 
          name: "Audience Expansion", 
          impact: -5, 
          direction: "positive" as const 
        },
      ];
      
      predictions.push({
        week,
        predictedCAC: baseCAC,
        confidenceLow: baseCAC * (1 - variance),
        confidenceHigh: baseCAC * (1 + variance),
        factors,
      });
    }
    
    await ctx.db.insert("cacPredictions", {
      campaignId: args.campaignId,
      buyerId: args.buyerId,
      currentCAC,
      predictions,
      modelAccuracy: 88 + Math.random() * 10,
      timestamp: Date.now(),
    });
  },
});

// Note: Regional performance functions moved to regional.ts

// Get Shapley values for data owner
export const getShapleyValues = query({
  args: { 
    ownerId: v.id("users"),
    assetId: v.optional(v.id("dataAssets")),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("shapleyValues")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId));
    
    const values = await query.collect();
    
    if (args.assetId) {
      return values.filter(v => v.assetId === args.assetId);
    }
    
    return values;
  },
});

// Calculate and store Shapley values
export const calculateShapleyValues = mutation({
  args: {
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
    campaignId: v.id("campaigns"),
    shapleyValue: v.number(),
    marginalContribution: v.number(),
    coalitionSize: v.number(),
  },
  handler: async (ctx, args) => {
    const startTime = Date.now();
    
    // In a real implementation, this would run the Shapley value algorithm
    // For now, we'll store the provided values
    
    await ctx.db.insert("shapleyValues", {
      ...args,
      calculationDate: Date.now(),
      computationTime: Date.now() - startTime,
    });
  },
});