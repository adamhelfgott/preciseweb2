import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

// Get creatives for a campaign
export const getCreatives = query({
  args: { 
    campaignId: v.optional(v.id("campaigns")),
    buyerId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let creatives;
    
    if (args.campaignId) {
      creatives = await ctx.db
        .query("creatives")
        .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId!))
        .collect();
    } else if (args.buyerId) {
      creatives = await ctx.db
        .query("creatives")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId!))
        .collect();
    } else {
      creatives = await ctx.db.query("creatives").collect();
    }

    return creatives;
  },
});

// Get creative fatigue alerts
export const getFatigueAlerts = query({
  args: { 
    buyerId: v.id("users"),
    status: v.optional(v.union(v.literal("active"), v.literal("resolved"), v.literal("ignored"))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("creativeFatigueAlerts")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId));

    const alerts = await query.collect();

    // Filter by status if provided
    if (args.status) {
      return alerts.filter(alert => alert.status === args.status);
    }

    // Get creative details for each alert
    const alertsWithCreatives = await Promise.all(
      alerts.map(async (alert) => {
        const creative = await ctx.db.get(alert.creativeId);
        const campaign = await ctx.db.get(alert.campaignId);
        return {
          ...alert,
          creative,
          campaign,
        };
      })
    );

    return alertsWithCreatives;
  },
});

// Get campaign health metrics
export const getCampaignHealth = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const health = await ctx.db
      .query("campaignHealth")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .order("desc")
      .first();

    return health;
  },
});

// Create a new creative
export const createCreative = mutation({
  args: {
    campaignId: v.id("campaigns"),
    buyerId: v.id("users"),
    name: v.string(),
    type: v.union(v.literal("image"), v.literal("video"), v.literal("carousel"), v.literal("native")),
    format: v.string(),
  },
  handler: async (ctx, args) => {
    const creative = await ctx.db.insert("creatives", {
      ...args,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      ctr: 0,
      cvr: 0,
      cpa: 0,
      fatigueScore: 0,
      daysActive: 0,
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return creative;
  },
});

// Update creative performance metrics
export const updateCreativePerformance = mutation({
  args: {
    creativeId: v.id("creatives"),
    impressions: v.number(),
    clicks: v.number(),
    conversions: v.number(),
    spend: v.number(),
  },
  handler: async (ctx, args) => {
    const creative = await ctx.db.get(args.creativeId);
    if (!creative) throw new Error("Creative not found");

    const newImpressions = creative.impressions + args.impressions;
    const newClicks = creative.clicks + args.clicks;
    const newConversions = creative.conversions + args.conversions;
    const newSpend = creative.spend + args.spend;

    const ctr = newImpressions > 0 ? (newClicks / newImpressions) * 100 : 0;
    const cvr = newClicks > 0 ? (newConversions / newClicks) * 100 : 0;
    const cpa = newConversions > 0 ? newSpend / newConversions : 0;

    // Calculate fatigue score based on performance trends
    const daysActive = Math.floor((Date.now() - creative.createdAt) / (1000 * 60 * 60 * 24));
    let fatigueScore = creative.fatigueScore;

    // Simple fatigue calculation: increases with days active and decreasing CTR
    if (daysActive > 7 && ctr < creative.ctr * 0.8) {
      fatigueScore = Math.min(100, fatigueScore + 10);
    }

    await ctx.db.patch(args.creativeId, {
      impressions: newImpressions,
      clicks: newClicks,
      conversions: newConversions,
      spend: newSpend,
      ctr,
      cvr,
      cpa,
      fatigueScore,
      daysActive,
      updatedAt: Date.now(),
    });

    // Check if we need to create a fatigue alert
    if (fatigueScore > 70 && creative.status === "active") {
      const existingAlert = await ctx.db
        .query("creativeFatigueAlerts")
        .withIndex("by_creative", (q) => q.eq("creativeId", args.creativeId))
        .filter((q) => q.eq(q.field("status"), "active"))
        .first();

      if (!existingAlert) {
        const ctrDrop = ((creative.ctr - ctr) / creative.ctr) * 100;
        const cvrDrop = ((creative.cvr - cvr) / creative.cvr) * 100;

        await ctx.db.insert("creativeFatigueAlerts", {
          creativeId: args.creativeId,
          campaignId: creative.campaignId,
          buyerId: creative.buyerId,
          severity: fatigueScore > 85 ? "critical" : "warning",
          ctrDrop,
          cvrDrop,
          recommendedAction: fatigueScore > 85 
            ? "Replace creative immediately" 
            : "Consider refreshing creative soon",
          impact: `$${(args.spend * 0.2).toFixed(0)} potential waste`,
          status: "active",
          createdAt: Date.now(),
        });
      }
    }
  },
});

// Simulate creative performance (for demo)
export const simulateCreativePerformance = mutation({
  args: { buyerId: v.id("users") },
  handler: async (ctx, args) => {
    const campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    if (campaigns.length === 0) return;

    // Get or create some creatives for the first campaign
    const campaign = campaigns[0];
    let creatives = await ctx.db
      .query("creatives")
      .withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id))
      .collect();

    // Create demo creatives if none exist
    if (creatives.length === 0) {
      const creativeTypes = [
        { name: "Summer Sale Hero", type: "image" as const, format: "1200x628" },
        { name: "Product Showcase", type: "carousel" as const, format: "1080x1080" },
        { name: "Brand Story Video", type: "video" as const, format: "16:9" },
      ];

      for (const creative of creativeTypes) {
        await ctx.db.insert("creatives", {
          campaignId: campaign._id,
          buyerId: args.buyerId,
          name: creative.name,
          type: creative.type,
          format: creative.format,
          impressions: Math.floor(Math.random() * 100000),
          clicks: Math.floor(Math.random() * 5000),
          conversions: Math.floor(Math.random() * 200),
          spend: Math.random() * 5000,
          ctr: Math.random() * 5,
          cvr: Math.random() * 10,
          cpa: 20 + Math.random() * 30,
          fatigueScore: Math.random() * 100,
          daysActive: Math.floor(Math.random() * 30),
          status: "active",
          createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
          updatedAt: Date.now(),
        });
      }
    }

    // Update a random creative's performance
    creatives = await ctx.db
      .query("creatives")
      .withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id))
      .collect();

    if (creatives.length > 0) {
      const creative = creatives[Math.floor(Math.random() * creatives.length)];
      
      // Update creative performance inline
      const newImpressions = creative.impressions + Math.floor(Math.random() * 1000);
      const newClicks = creative.clicks + Math.floor(Math.random() * 50);
      const newConversions = creative.conversions + Math.floor(Math.random() * 5);
      const newSpend = creative.spend + Math.random() * 100;

      const ctr = newImpressions > 0 ? (newClicks / newImpressions) * 100 : 0;
      const cvr = newClicks > 0 ? (newConversions / newClicks) * 100 : 0;
      const cpa = newConversions > 0 ? newSpend / newConversions : 0;

      // Calculate fatigue score
      const daysActive = Math.floor((Date.now() - creative.createdAt) / (1000 * 60 * 60 * 24));
      let fatigueScore = creative.fatigueScore;
      if (daysActive > 7 && ctr < creative.ctr * 0.8) {
        fatigueScore = Math.min(100, fatigueScore + 10);
      }

      await ctx.db.patch(creative._id, {
        impressions: newImpressions,
        clicks: newClicks,
        conversions: newConversions,
        spend: newSpend,
        ctr,
        cvr,
        cpa,
        fatigueScore,
        daysActive,
        updatedAt: Date.now(),
      });
    }

    // Update campaign health
    await ctx.db.insert("campaignHealth", {
      campaignId: campaign._id,
      buyerId: args.buyerId,
      healthScore: 70 + Math.random() * 30,
      metrics: {
        ctrTrend: -5 + Math.random() * 10,
        cvrTrend: -5 + Math.random() * 10,
        cacTrend: -10 + Math.random() * 20,
        roasTrend: -10 + Math.random() * 20,
        budgetUtilization: 60 + Math.random() * 40,
        creativeFreshness: 50 + Math.random() * 50,
      },
      alerts: Math.random() > 0.5 ? [
        {
          type: "creative_fatigue",
          severity: "warning",
          message: "2 creatives showing signs of fatigue",
        },
      ] : [],
      timestamp: Date.now(),
    });
  },
});

// Get creative performance history
export const getCreativePerformance = query({
  args: { 
    creativeId: v.id("creatives"),
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days || 7;
    const startDate = Date.now() - days * 24 * 60 * 60 * 1000;

    const performance = await ctx.db
      .query("creativePerformance")
      .withIndex("by_creative", (q) => q.eq("creativeId", args.creativeId))
      .filter((q) => q.gte(q.field("date"), startDate))
      .collect();

    return performance;
  },
});

// Resolve fatigue alert
export const resolveFatigueAlert = mutation({
  args: { alertId: v.id("creativeFatigueAlerts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.alertId, {
      status: "resolved",
      resolvedAt: Date.now(),
    });
  },
});