import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get health score for a specific asset
export const getHealthScore = query({
  args: {
    assetId: v.id("dataAssets"),
  },
  handler: async (ctx, args) => {
    const healthScore = await ctx.db
      .query("assetHealthScores")
      .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
      .first();

    return healthScore;
  },
});

// Get all health scores for an owner
export const getHealthScoresByOwner = query({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const scores = await ctx.db
      .query("assetHealthScores")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Get asset details for each score
    const scoresWithAssets = await Promise.all(
      scores.map(async (score) => {
        const asset = await ctx.db.get(score.assetId);
        return {
          ...score,
          assetName: asset?.name || "Unknown Asset",
          assetType: asset?.type || "Unknown Type",
        };
      })
    );

    return scoresWithAssets;
  },
});

// Calculate and update health score
export const calculateHealthScore = mutation({
  args: {
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Simulate health score calculation
    const metrics = {
      completeness: 75 + Math.random() * 20,
      accuracy: 80 + Math.random() * 15,
      freshness: 70 + Math.random() * 25,
      consistency: 85 + Math.random() * 10,
      uniqueness: 90 + Math.random() * 10,
    };

    const overallScore = 
      (metrics.completeness * 0.25) +
      (metrics.accuracy * 0.25) +
      (metrics.freshness * 0.20) +
      (metrics.consistency * 0.15) +
      (metrics.uniqueness * 0.15);

    // Generate recommendations based on scores
    const recommendations = [];
    if (metrics.completeness < 85) {
      recommendations.push("Fill in missing demographic data fields to improve completeness");
    }
    if (metrics.freshness < 80) {
      recommendations.push("Update data more frequently to maintain freshness");
    }
    if (metrics.accuracy < 90) {
      recommendations.push("Implement validation rules to improve data accuracy");
    }
    if (metrics.consistency < 90) {
      recommendations.push("Standardize data formats across all records");
    }

    // Check if health score exists
    const existingScore = await ctx.db
      .query("assetHealthScores")
      .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
      .first();

    const currentDate = new Date().toISOString().split('T')[0];
    
    if (existingScore) {
      // Update existing score
      const updatedHistory = [...existingScore.scoreHistory];
      
      // Only add to history if it's a new day
      const lastHistoryDate = updatedHistory[updatedHistory.length - 1]?.date;
      if (lastHistoryDate !== currentDate) {
        updatedHistory.push({
          date: currentDate,
          score: overallScore,
        });
        // Keep only last 30 days
        if (updatedHistory.length > 30) {
          updatedHistory.shift();
        }
      }

      await ctx.db.patch(existingScore._id, {
        overallScore,
        ...metrics,
        recommendations,
        scoreHistory: updatedHistory,
        lastUpdated: Date.now(),
      });

      return existingScore._id;
    } else {
      // Create new health score
      const scoreId = await ctx.db.insert("assetHealthScores", {
        assetId: args.assetId,
        ownerId: args.ownerId,
        overallScore,
        ...metrics,
        recommendations,
        scoreHistory: [{
          date: currentDate,
          score: overallScore,
        }],
        lastUpdated: Date.now(),
      });

      return scoreId;
    }
  },
});

// Simulate health score improvements
export const simulateHealthScoreUpdate = mutation({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all assets for the owner
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Update health scores for each asset
    for (const asset of assets) {
      // Inline the health score calculation to avoid circular reference
      const metrics = {
        completeness: 75 + Math.random() * 20,
        accuracy: 80 + Math.random() * 15,
        freshness: 70 + Math.random() * 25,
        consistency: 85 + Math.random() * 10,
        uniqueness: 90 + Math.random() * 10,
      };

      const overallScore = 
        (metrics.completeness * 0.25) +
        (metrics.accuracy * 0.25) +
        (metrics.freshness * 0.20) +
        (metrics.consistency * 0.15) +
        (metrics.uniqueness * 0.15);

      const recommendations = [];
      if (metrics.completeness < 85) {
        recommendations.push("Fill in missing demographic data fields to improve completeness");
      }
      if (metrics.freshness < 80) {
        recommendations.push("Update data more frequently to maintain freshness");
      }
      if (metrics.accuracy < 90) {
        recommendations.push("Implement validation rules to improve data accuracy");
      }
      if (metrics.consistency < 90) {
        recommendations.push("Standardize data formats across all records");
      }

      const existingScore = await ctx.db
        .query("assetHealthScores")
        .withIndex("by_asset", (q) => q.eq("assetId", asset._id))
        .first();

      const currentDate = new Date().toISOString().split('T')[0];
      
      if (existingScore) {
        const updatedHistory = [...existingScore.scoreHistory];
        const lastHistoryDate = updatedHistory[updatedHistory.length - 1]?.date;
        if (lastHistoryDate !== currentDate) {
          updatedHistory.push({
            date: currentDate,
            score: overallScore,
          });
          if (updatedHistory.length > 30) {
            updatedHistory.shift();
          }
        }

        await ctx.db.patch(existingScore._id, {
          overallScore,
          ...metrics,
          recommendations,
          scoreHistory: updatedHistory,
          lastUpdated: Date.now(),
        });
      } else {
        await ctx.db.insert("assetHealthScores", {
          assetId: asset._id,
          ownerId: args.ownerId,
          overallScore,
          ...metrics,
          recommendations,
          scoreHistory: [{
            date: currentDate,
            score: overallScore,
          }],
          lastUpdated: Date.now(),
        });
      }
    }

    return { success: true, assetsUpdated: assets.length };
  },
});

// Internal mutation for scheduled updates
export const internal = {
  calculateHealthScore,
};