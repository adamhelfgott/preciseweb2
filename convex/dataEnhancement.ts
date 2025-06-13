import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get enhancement suggestions for an owner's assets
export const getSuggestions = query({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const suggestions = await ctx.db
      .query("enhancementSuggestions")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .filter((q) => q.neq(q.field("status"), "dismissed"))
      .collect();

    // Get asset details for each suggestion
    const suggestionsWithAssets = await Promise.all(
      suggestions.map(async (suggestion) => {
        const asset = await ctx.db.get(suggestion.assetId);
        return {
          ...suggestion,
          assetName: asset?.name || "Unknown Asset",
          assetType: asset?.type || "Unknown Type",
        };
      })
    );

    // Sort by impact and potential revenue
    return suggestionsWithAssets.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      const impactDiff = impactOrder[b.impact] - impactOrder[a.impact];
      if (impactDiff !== 0) return impactDiff;
      return b.potentialRevenue - a.potentialRevenue;
    });
  },
});

// Generate suggestions for an asset
export const generateSuggestions = mutation({
  args: {
    assetId: v.id("dataAssets"),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }

    // Define suggestion templates based on asset type
    const suggestionTemplates = [
      {
        type: "enrichment" as const,
        title: "Add Behavioral Insights",
        description: "Enhance with user engagement patterns and preference data to increase value by 35%",
        impact: "high" as const,
        effort: "medium" as const,
        potentialRevenue: 12500,
        requirements: [
          "Implement event tracking for user interactions",
          "Add preference scoring algorithm",
          "Enable real-time data updates"
        ],
      },
      {
        type: "validation" as const,
        title: "Improve Data Accuracy",
        description: "Implement automated validation rules to ensure 99.9% data accuracy",
        impact: "medium" as const,
        effort: "low" as const,
        potentialRevenue: 5200,
        requirements: [
          "Set up data validation pipeline",
          "Configure anomaly detection",
          "Create data quality dashboards"
        ],
      },
      {
        type: "expansion" as const,
        title: "Expand Geographic Coverage",
        description: "Add 5 new metro areas to increase addressable market by 40%",
        impact: "high" as const,
        effort: "high" as const,
        potentialRevenue: 18000,
        requirements: [
          "Partner with regional data providers",
          "Standardize location taxonomy",
          "Validate new market data"
        ],
      },
      {
        type: "quality" as const,
        title: "Enhance Data Freshness",
        description: "Move to real-time updates for 25% higher CPM rates",
        impact: "medium" as const,
        effort: "medium" as const,
        potentialRevenue: 8300,
        requirements: [
          "Upgrade data pipeline infrastructure",
          "Implement streaming data ingestion",
          "Add real-time monitoring"
        ],
      },
    ];

    // Generate suggestions based on asset characteristics
    const suggestions = [];
    
    // Always suggest enrichment for basic data types
    if (asset.type === "demographic" || asset.type === "location_data") {
      suggestions.push(suggestionTemplates[0]);
    }

    // Suggest validation if quality score is below 90
    if (asset.qualityScore < 90) {
      suggestions.push(suggestionTemplates[1]);
    }

    // Suggest expansion for smaller datasets
    if (asset.recordCount < 1000000) {
      suggestions.push(suggestionTemplates[2]);
    }

    // Suggest freshness improvements for older data
    if (asset.updateFrequency > 24) {
      suggestions.push(suggestionTemplates[3]);
    }

    // If no specific suggestions, add a general one
    if (suggestions.length === 0) {
      suggestions.push({
        type: "enrichment" as const,
        title: "Add Premium Attributes",
        description: "Enhance dataset with high-value attributes for 20% revenue increase",
        impact: "medium" as const,
        effort: "medium" as const,
        potentialRevenue: 7500,
        requirements: [
          "Research high-demand attributes",
          "Source additional data points",
          "Validate and integrate new fields"
        ],
      });
    }

    // Insert suggestions that don't already exist
    for (const template of suggestions) {
      // Check if similar suggestion already exists
      const existing = await ctx.db
        .query("enhancementSuggestions")
        .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
        .filter((q) => 
          q.and(
            q.eq(q.field("type"), template.type),
            q.eq(q.field("title"), template.title)
          )
        )
        .first();

      if (!existing) {
        await ctx.db.insert("enhancementSuggestions", {
          assetId: args.assetId,
          ownerId: args.ownerId,
          ...template,
          status: "pending",
          createdAt: Date.now(),
        });
      }
    }

    return { success: true, suggestionsCreated: suggestions.length };
  },
});

// Update suggestion status
export const updateSuggestionStatus = mutation({
  args: {
    suggestionId: v.id("enhancementSuggestions"),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("completed"), v.literal("dismissed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.suggestionId, {
      status: args.status,
    });

    return { success: true };
  },
});

// Generate suggestions for all assets
export const generateAllSuggestions = mutation({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all assets for the owner
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    let totalSuggestions = 0;

    // Generate suggestions for each asset
    for (const asset of assets) {
      // Inline suggestion generation to avoid circular reference
      const suggestionTemplates = [
        {
          type: "enrichment" as const,
          title: "Add Behavioral Insights",
          description: "Enhance with user engagement patterns and preference data to increase value by 35%",
          impact: "high" as const,
          effort: "medium" as const,
          potentialRevenue: 12500 + Math.random() * 5000,
          requirements: [
            "Implement event tracking for user interactions",
            "Add preference scoring algorithm",
            "Enable real-time data updates"
          ],
        },
        {
          type: "validation" as const,
          title: "Improve Data Accuracy",
          description: "Implement automated validation rules to ensure 99.9% data accuracy",
          impact: "medium" as const,
          effort: "low" as const,
          potentialRevenue: 5200 + Math.random() * 2000,
          requirements: [
            "Set up data validation pipeline",
            "Configure anomaly detection",
            "Create data quality dashboards"
          ],
        },
        {
          type: "expansion" as const,
          title: "Expand Geographic Coverage",
          description: "Add 5 new metro areas to increase addressable market by 40%",
          impact: "high" as const,
          effort: "high" as const,
          potentialRevenue: 18000 + Math.random() * 5000,
          requirements: [
            "Partner with regional data providers",
            "Standardize location taxonomy",
            "Validate new market data"
          ],
        },
      ];

      // Randomly select 1-2 suggestions per asset
      const numSuggestions = 1 + Math.floor(Math.random() * 2);
      const selectedTemplates = suggestionTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, numSuggestions);

      for (const template of selectedTemplates) {
        const existing = await ctx.db
          .query("enhancementSuggestions")
          .withIndex("by_asset", (q) => q.eq("assetId", asset._id))
          .filter((q) => 
            q.and(
              q.eq(q.field("type"), template.type),
              q.eq(q.field("title"), template.title)
            )
          )
          .first();

        if (!existing) {
          await ctx.db.insert("enhancementSuggestions", {
            assetId: asset._id,
            ownerId: args.ownerId,
            ...template,
            status: "pending",
            createdAt: Date.now(),
          });
          totalSuggestions++;
        }
      }
    }

    return { success: true, suggestionsCreated: totalSuggestions };
  },
});