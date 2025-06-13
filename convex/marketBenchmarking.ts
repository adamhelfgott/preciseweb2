import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get market rates for all segments
export const getMarketRates = query({
  handler: async (ctx) => {
    const rates = await ctx.db
      .query("marketRates")
      .collect();

    return rates;
  },
});

// Get market position for specific assets
export const getAssetMarketPosition = query({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const positions = await ctx.db
      .query("assetMarketPosition")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Get asset details for each position
    const positionsWithAssets = await Promise.all(
      positions.map(async (position) => {
        const asset = await ctx.db.get(position.assetId);
        return {
          ...position,
          assetName: asset?.name || "Unknown Asset",
          assetType: asset?.type || "Unknown Type",
        };
      })
    );

    return positionsWithAssets;
  },
});

// Initialize market rates (run once)
export const initializeMarketRates = mutation({
  handler: async (ctx) => {
    const segments = [
      { segment: "Fitness Enthusiasts", avgCPM: 45, minCPM: 35, maxCPM: 65, volume: 12500000, qualityPremium: 1.2 },
      { segment: "Health & Wellness", avgCPM: 42, minCPM: 30, maxCPM: 58, volume: 15000000, qualityPremium: 1.15 },
      { segment: "Tech Professionals", avgCPM: 55, minCPM: 40, maxCPM: 80, volume: 8000000, qualityPremium: 1.3 },
      { segment: "Retail Shoppers", avgCPM: 38, minCPM: 25, maxCPM: 52, volume: 20000000, qualityPremium: 1.1 },
      { segment: "Entertainment Seekers", avgCPM: 40, minCPM: 28, maxCPM: 55, volume: 18000000, qualityPremium: 1.12 },
      { segment: "Financial Services", avgCPM: 65, minCPM: 45, maxCPM: 95, volume: 5000000, qualityPremium: 1.4 },
      { segment: "Automotive Intenders", avgCPM: 58, minCPM: 42, maxCPM: 85, volume: 6500000, qualityPremium: 1.35 },
      { segment: "Travel Enthusiasts", avgCPM: 48, minCPM: 35, maxCPM: 70, volume: 9000000, qualityPremium: 1.25 },
    ];

    // Check if rates already exist
    const existingRates = await ctx.db.query("marketRates").collect();
    if (existingRates.length > 0) {
      return { message: "Market rates already initialized", count: existingRates.length };
    }

    // Insert market rates
    for (const rate of segments) {
      await ctx.db.insert("marketRates", {
        ...rate,
        lastUpdated: Date.now(),
      });
    }

    return { message: "Market rates initialized", count: segments.length };
  },
});

// Calculate and update asset market position
export const calculateMarketPosition = mutation({
  args: {
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }

    // Determine segment based on asset type
    const segmentMap: Record<string, string> = {
      "fitness_data": "Fitness Enthusiasts",
      "health_records": "Health & Wellness",
      "purchase_history": "Retail Shoppers",
      "location_data": "Travel Enthusiasts",
      "demographic": "Tech Professionals", // Default for demo
    };

    const segment = segmentMap[asset.type] || "Tech Professionals";

    // Get market rate for this segment
    const marketRate = await ctx.db
      .query("marketRates")
      .withIndex("by_segment", (q) => q.eq("segment", segment))
      .first();

    if (!marketRate) {
      throw new Error("Market rate not found for segment");
    }

    // Calculate current CPM (simulated based on quality score)
    const qualityMultiplier = asset.qualityScore ? (asset.qualityScore / 100) : 0.8;
    const currentCPM = marketRate.avgCPM * qualityMultiplier * (0.9 + Math.random() * 0.2);

    // Calculate percentile
    const range = marketRate.maxCPM - marketRate.minCPM;
    const percentile = Math.min(100, Math.max(0, 
      ((currentCPM - marketRate.minCPM) / range) * 100
    ));

    // Determine demand level
    const demandLevel: "high" | "medium" | "low" = percentile >= 70 ? "high" : percentile >= 40 ? "medium" : "low";

    // Calculate pricing opportunity
    let pricingOpportunity = undefined;
    if (currentCPM < marketRate.avgCPM * 0.9) {
      const suggestedCPM = marketRate.avgCPM * qualityMultiplier;
      const potentialRevenue = (suggestedCPM - currentCPM) * (asset.recordCount || 1000000) / 1000;
      
      pricingOpportunity = {
        suggestedCPM,
        potentialRevenue,
        rationale: percentile < 30 
          ? "Your pricing is below market rate. Quality justifies premium pricing."
          : "Small price optimization available based on current market conditions.",
      };
    }

    // Check if position exists
    const existingPosition = await ctx.db
      .query("assetMarketPosition")
      .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
      .first();

    const positionData = {
      assetId: args.assetId,
      ownerId: args.ownerId,
      segment,
      currentCPM,
      marketAvgCPM: marketRate.avgCPM,
      percentile,
      competitorCount: Math.floor(15 + Math.random() * 20),
      demandLevel,
      pricingOpportunity,
      timestamp: Date.now(),
    };

    if (existingPosition) {
      await ctx.db.patch(existingPosition._id, positionData);
      return existingPosition._id;
    } else {
      const positionId = await ctx.db.insert("assetMarketPosition", positionData);
      return positionId;
    }
  },
});

// Update all asset positions for an owner
export const updateAllMarketPositions = mutation({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all assets for the owner
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Update market position for each asset
    for (const asset of assets) {
      // Inline calculation to avoid circular reference
      const segmentMap: Record<string, string> = {
        "fitness_data": "Fitness Enthusiasts",
        "health_records": "Health & Wellness",
        "purchase_history": "Retail Shoppers",
        "location_data": "Travel Enthusiasts",
        "demographic": "Tech Professionals",
      };

      const segment = segmentMap[asset.type] || "Tech Professionals";
      const marketRate = await ctx.db
        .query("marketRates")
        .withIndex("by_segment", (q) => q.eq("segment", segment))
        .first();

      if (!marketRate) continue;

      const qualityMultiplier = asset.qualityScore ? (asset.qualityScore / 100) : 0.8;
      const currentCPM = marketRate.avgCPM * qualityMultiplier * (0.9 + Math.random() * 0.2);
      const range = marketRate.maxCPM - marketRate.minCPM;
      const percentile = Math.min(100, Math.max(0, 
        ((currentCPM - marketRate.minCPM) / range) * 100
      ));

      const demandLevel: "high" | "medium" | "low" = percentile >= 70 ? "high" : percentile >= 40 ? "medium" : "low";

      let pricingOpportunity = undefined;
      if (currentCPM < marketRate.avgCPM * 0.9) {
        const suggestedCPM = marketRate.avgCPM * qualityMultiplier;
        const potentialRevenue = (suggestedCPM - currentCPM) * (asset.recordCount || 1000000) / 1000;
        
        pricingOpportunity = {
          suggestedCPM,
          potentialRevenue,
          rationale: percentile < 30 
            ? "Your pricing is below market rate. Quality justifies premium pricing."
            : "Small price optimization available based on current market conditions.",
        };
      }

      const existingPosition = await ctx.db
        .query("assetMarketPosition")
        .withIndex("by_asset", (q) => q.eq("assetId", asset._id))
        .first();

      const positionData = {
        assetId: asset._id,
        ownerId: args.ownerId,
        segment,
        currentCPM,
        marketAvgCPM: marketRate.avgCPM,
        percentile,
        competitorCount: Math.floor(15 + Math.random() * 20),
        demandLevel,
        pricingOpportunity,
        timestamp: Date.now(),
      };

      if (existingPosition) {
        await ctx.db.patch(existingPosition._id, positionData);
      } else {
        await ctx.db.insert("assetMarketPosition", positionData);
      }
    }

    return { success: true, assetsUpdated: assets.length };
  },
});

// Simulate market rate fluctuations
export const simulateMarketChanges = mutation({
  handler: async (ctx) => {
    const rates = await ctx.db.query("marketRates").collect();

    for (const rate of rates) {
      // Simulate small market fluctuations
      const changePercent = (Math.random() - 0.5) * 0.1; // +/- 5%
      
      const newAvgCPM = rate.avgCPM * (1 + changePercent);
      const newMinCPM = rate.minCPM * (1 + changePercent);
      const newMaxCPM = rate.maxCPM * (1 + changePercent);

      await ctx.db.patch(rate._id, {
        avgCPM: newAvgCPM,
        minCPM: newMinCPM,
        maxCPM: newMaxCPM,
        lastUpdated: Date.now(),
      });
    }

    return { success: true, ratesUpdated: rates.length };
  },
});