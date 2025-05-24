import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get data assets for an owner
export const getDataAssets = query({
  args: { ownerId: v.id("users") },
  handler: async (ctx, args) => {
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();
    
    // Calculate additional metrics
    const assetsWithMetrics = await Promise.all(
      assets.map(async (asset) => {
        // Get recent earnings for this asset
        const recentEarnings = await ctx.db
          .query("earnings")
          .withIndex("by_asset", (q) => q.eq("assetId", asset._id))
          .order("desc")
          .take(10);
        
        // Get attribution data
        const attributions = await ctx.db
          .query("attributions")
          .withIndex("by_data_source", (q) => q.eq("dataSourceId", asset._id))
          .collect();
        
        const campaignImpact = attributions.slice(0, 3).map(attr => ({
          cacReduction: attr.cacReduction,
          percentage: attr.percentage,
        }));
        
        return {
          ...asset,
          recentEarnings,
          campaignImpact,
        };
      })
    );
    
    return assetsWithMetrics;
  },
});

// Create a new data asset
export const createDataAsset = mutation({
  args: {
    ownerId: v.id("users"),
    name: v.string(),
    type: v.string(),
    recordCount: v.number(),
    updateFrequency: v.number(),
  },
  handler: async (ctx, args) => {
    // Calculate quality score based on data characteristics
    let qualityScore = 70; // Base score
    
    // Add points for record count
    if (args.recordCount > 1000000) qualityScore += 10;
    else if (args.recordCount > 100000) qualityScore += 5;
    
    // Add points for update frequency
    if (args.updateFrequency <= 6) qualityScore += 15;
    else if (args.updateFrequency <= 24) qualityScore += 10;
    
    // Industry averages (mock data)
    const industryAvgPerK = 8.3;
    const revenuePerK = industryAvgPerK * (qualityScore / 85); // Scale by quality
    
    return await ctx.db.insert("dataAssets", {
      ownerId: args.ownerId,
      name: args.name,
      type: args.type,
      qualityScore: Math.min(qualityScore, 100),
      recordCount: args.recordCount,
      updateFrequency: args.updateFrequency,
      revenuePerK: Number(revenuePerK.toFixed(2)),
      industryAvgPerK,
      usageRate: Math.floor(Math.random() * 30 + 50), // 50-80% usage
      monthlyRevenue: 0, // Will be calculated from earnings
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update data asset
export const updateDataAsset = mutation({
  args: {
    assetId: v.id("dataAssets"),
    updateFrequency: v.optional(v.number()),
    status: v.optional(v.union(v.literal("active"), v.literal("paused"), v.literal("pending"))),
  },
  handler: async (ctx, args) => {
    const updates: any = {
      updatedAt: Date.now(),
    };
    
    if (args.updateFrequency !== undefined) {
      updates.updateFrequency = args.updateFrequency;
      
      // Recalculate quality score
      const asset = await ctx.db.get(args.assetId);
      if (asset) {
        let qualityScore = 70;
        if (asset.recordCount > 1000000) qualityScore += 10;
        else if (asset.recordCount > 100000) qualityScore += 5;
        
        if (args.updateFrequency <= 6) qualityScore += 15;
        else if (args.updateFrequency <= 24) qualityScore += 10;
        
        updates.qualityScore = Math.min(qualityScore, 100);
      }
    }
    
    if (args.status !== undefined) {
      updates.status = args.status;
    }
    
    await ctx.db.patch(args.assetId, updates);
  },
});

// Create default data assets for new users
export const createDefaultAssets = mutation({
  args: { ownerId: v.id("users") },
  handler: async (ctx, args) => {
    const defaultAssets = [
      {
        name: "Fitness Activity Events",
        type: "behavioral",
        recordCount: 2300000,
        updateFrequency: 24,
      },
      {
        name: "User Demographics",
        type: "demographic",
        recordCount: 1500000,
        updateFrequency: 168, // Weekly
      },
    ];
    
    const createdAssets = [];
    
    for (const assetData of defaultAssets) {
      const assetId = await ctx.db.insert("dataAssets", {
        ownerId: args.ownerId,
        name: assetData.name,
        type: assetData.type,
        qualityScore: assetData.name.includes("Fitness") ? 94 : 88,
        recordCount: assetData.recordCount,
        updateFrequency: assetData.updateFrequency,
        revenuePerK: assetData.name.includes("Fitness") ? 12.5 : 6.2,
        industryAvgPerK: assetData.name.includes("Fitness") ? 8.3 : 7.1,
        usageRate: assetData.name.includes("Fitness") ? 78 : 45,
        monthlyRevenue: assetData.name.includes("Fitness") ? 23400 : 11200,
        status: "active",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      
      createdAssets.push(assetId);
    }
    
    return createdAssets;
  },
});