import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get DSP performance for a campaign
export const getDSPPerformance = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const performance = await ctx.db
      .query("dspPerformance")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .order("desc")
      .take(10); // Get latest performance for each DSP

    // Group by DSP and get the latest entry for each
    const latestByDSP = new Map();
    for (const perf of performance) {
      if (!latestByDSP.has(perf.dsp)) {
        latestByDSP.set(perf.dsp, perf);
      }
    }

    return Array.from(latestByDSP.values());
  },
});

// Update DSP performance metrics
export const updateDSPPerformance = mutation({
  args: {
    campaignId: v.id("campaigns"),
    dsp: v.string(),
    spend: v.number(),
    currentECPM: v.number(),
    ecpmTrend: v.number(),
    roas: v.number(),
    status: v.union(v.literal("scaling"), v.literal("optimizing"), v.literal("saturated")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("dspPerformance", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Get DSP performance history
export const getDSPPerformanceHistory = query({
  args: { 
    campaignId: v.id("campaigns"),
    dsp: v.string(),
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days || 30;
    const startDate = Date.now() - days * 24 * 60 * 60 * 1000;

    const history = await ctx.db
      .query("dspPerformance")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .filter((q) => 
        q.and(
          q.eq(q.field("dsp"), args.dsp),
          q.gte(q.field("timestamp"), startDate)
        )
      )
      .collect();

    return history;
  },
});

// Simulate DSP performance updates (for demo)
export const simulateDSPPerformance = mutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const dsps = [
      { name: "MadHive", baseECPM: 42.50, baseROAS: 5.2 },
      { name: "The Trade Desk", baseECPM: 38.20, baseROAS: 4.8 },
      { name: "Amazon DSP", baseECPM: 51.30, baseROAS: 4.2 },
      { name: "Google DV360", baseECPM: 45.00, baseROAS: 4.5 },
      { name: "Meta", baseECPM: 40.00, baseROAS: 5.0 },
    ];

    for (const dsp of dsps) {
      // Random variations
      const ecpmVariation = (Math.random() - 0.5) * 10; // -5 to +5
      const roasVariation = (Math.random() - 0.5) * 0.5; // -0.25 to +0.25
      const spend = 10000 + Math.random() * 40000;
      
      const currentECPM = dsp.baseECPM + ecpmVariation;
      const ecpmTrend = ecpmVariation > 0 ? ecpmVariation : ecpmVariation * 2; // Negative trends are stronger
      const roas = Math.max(3, dsp.baseROAS + roasVariation);
      
      // Determine status based on trends
      let status: "scaling" | "optimizing" | "saturated";
      if (ecpmTrend > 2 && roas > 4.5) {
        status = "scaling";
      } else if (ecpmTrend < -5 || roas < 3.5) {
        status = "saturated";
      } else {
        status = "optimizing";
      }

      await ctx.db.insert("dspPerformance", {
        campaignId: args.campaignId,
        dsp: dsp.name,
        spend,
        currentECPM,
        ecpmTrend,
        roas,
        status,
        timestamp: Date.now(),
      });
    }

    // Update campaign health
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) return;

    const healthScore = 70 + Math.random() * 30;
    const alerts = [];
    
    if (healthScore < 80) {
      alerts.push({
        type: "performance",
        severity: "warning" as const,
        message: "2 DSPs showing declining performance",
      });
    }

    await ctx.db.insert("campaignHealth", {
      campaignId: args.campaignId,
      buyerId: campaign.buyerId,
      healthScore,
      metrics: {
        ctrTrend: -5 + Math.random() * 10,
        cvrTrend: -5 + Math.random() * 10,
        cacTrend: -10 + Math.random() * 20,
        roasTrend: -10 + Math.random() * 20,
        budgetUtilization: 60 + Math.random() * 40,
        creativeFreshness: 50 + Math.random() * 50,
      },
      alerts,
      timestamp: Date.now(),
    });
  },
});