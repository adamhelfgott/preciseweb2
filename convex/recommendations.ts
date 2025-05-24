import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get recommendations for a user
export const getRecommendations = query({
  args: { 
    userId: v.id("users"),
    status: v.optional(v.union(v.literal("new"), v.literal("viewed"), v.literal("applied"), v.literal("dismissed"))),
  },
  handler: async (ctx, args) => {
    let recommendationsQuery = ctx.db
      .query("recommendations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId));
    
    if (args.status) {
      recommendationsQuery = recommendationsQuery.filter((q) => 
        q.eq(q.field("status"), args.status)
      );
    }
    
    const recommendations = await recommendationsQuery.collect();
    
    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return recommendations.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  },
});

// Generate recommendations for data owner
export const generateDataOwnerRecommendations = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user || user.role !== "DATA_OWNER") return [];
    
    // Get user's data assets
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.userId))
      .collect();
    
    const recommendations = [];
    
    // Check for missing data types
    const hasTypes = {
      sleep: assets.some(a => a.type === "sleep"),
      behavioral: assets.some(a => a.type === "behavioral"),
      location: assets.some(a => a.type === "location"),
      preference: assets.some(a => a.type === "preference"),
    };
    
    if (!hasTypes.sleep && hasTypes.behavioral) {
      recommendations.push({
        userId: args.userId,
        type: "data_optimization" as const,
        priority: "high" as const,
        title: "Add Sleep Data to Fitness Events",
        description: "Cohorts with sleep + fitness data earn 3.2x higher CPMs. Your estimated additional revenue: +$18,400/month",
        estimatedImpact: {
          type: "revenue",
          value: 18400,
        },
        status: "new" as const,
        createdAt: Date.now(),
      });
    }
    
    // Check data freshness
    const staleAssets = assets.filter(a => a.updateFrequency > 24);
    if (staleAssets.length > 0) {
      recommendations.push({
        userId: args.userId,
        type: "data_optimization" as const,
        priority: "medium" as const,
        title: "Increase Update Frequency",
        description: "Update data every 6 hours instead of daily for +18% quality score improvement",
        estimatedImpact: {
          type: "quality",
          value: 18,
        },
        status: "new" as const,
        createdAt: Date.now(),
      });
    }
    
    // Insert recommendations
    for (const rec of recommendations) {
      await ctx.db.insert("recommendations", rec);
    }
    
    return recommendations;
  },
});

// Generate recommendations for media buyer
export const generateMediaBuyerRecommendations = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user || user.role !== "MEDIA_BUYER") return [];
    
    // Get user's campaigns
    const campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.userId))
      .collect();
    
    const recommendations = [];
    
    for (const campaign of campaigns) {
      // Check if CAC is above target
      if (campaign.currentCAC > campaign.targetCAC * 1.2) {
        recommendations.push({
          userId: args.userId,
          type: "campaign_optimization" as const,
          priority: "high" as const,
          title: `Optimize ${campaign.name}`,
          description: `Add "Premium Fitness Enthusiasts" cohort to ${campaign.name} for projected -$8.20 CAC reduction`,
          estimatedImpact: {
            type: "cac_reduction",
            value: 8.20,
          },
          status: "new" as const,
          createdAt: Date.now(),
        });
      }
      
      // Check for dayparting opportunities
      if (!campaign.preciseLaunchDate || Date.now() - campaign.preciseLaunchDate > 7 * 24 * 60 * 60 * 1000) {
        recommendations.push({
          userId: args.userId,
          type: "campaign_optimization" as const,
          priority: "medium" as const,
          title: "Daypart Optimization Available",
          description: "Shift 30% budget to 6-8am targeting based on attribution data showing 3.2x higher conversion",
          estimatedImpact: {
            type: "cac_reduction",
            value: 4.50,
          },
          status: "new" as const,
          createdAt: Date.now(),
        });
      }
    }
    
    // Insert recommendations
    for (const rec of recommendations) {
      await ctx.db.insert("recommendations", rec);
    }
    
    return recommendations;
  },
});

// Update recommendation status
export const updateRecommendationStatus = mutation({
  args: {
    recommendationId: v.id("recommendations"),
    status: v.union(v.literal("viewed"), v.literal("applied"), v.literal("dismissed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.recommendationId, {
      status: args.status,
    });
  },
});