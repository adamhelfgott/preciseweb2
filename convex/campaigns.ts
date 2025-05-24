import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get campaigns for a media buyer
export const getCampaigns = query({
  args: { buyerId: v.id("users") },
  handler: async (ctx, args) => {
    const campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();
    
    // Get additional data for each campaign
    const campaignsWithData = await Promise.all(
      campaigns.map(async (campaign) => {
        // Get campaign history
        const history = await ctx.db
          .query("campaignHistory")
          .withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id))
          .order("desc")
          .take(30);
        
        // Get DSP performance
        const dspPerformance = await ctx.db
          .query("dspPerformance")
          .withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id))
          .order("desc")
          .take(10);
        
        // Get attribution data
        const attributions = await ctx.db
          .query("attributions")
          .withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id))
          .collect();
        
        // Group DSP performance by platform
        const dspBreakdown = campaign.dsps.map(dsp => {
          const perf = dspPerformance.find(p => p.dsp === dsp);
          return {
            id: dsp,
            name: dsp === "madhive" ? "MadHive" : 
                  dsp === "ttd" ? "The Trade Desk" : 
                  dsp === "amazon" ? "Amazon DSP" : dsp,
            spend: perf?.spend || 0,
            currentECPM: perf?.currentECPM || 0,
            ecpmTrend: perf?.ecpmTrend || 0,
            roas: perf?.roas || 0,
            status: perf?.status || "optimizing",
          };
        });
        
        return {
          ...campaign,
          cacHistory: history.map(h => ({
            date: new Date(h.date).toISOString(),
            value: h.cac,
          })),
          dspBreakdown,
          topDataSources: attributions.slice(0, 3),
        };
      })
    );
    
    return campaignsWithData;
  },
});

// Create a new campaign
export const createCampaign = mutation({
  args: {
    buyerId: v.id("users"),
    name: v.string(),
    targetCAC: v.number(),
    ltv: v.number(),
    dsps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const campaignId = await ctx.db.insert("campaigns", {
      buyerId: args.buyerId,
      name: args.name,
      status: "active",
      currentCAC: args.targetCAC * 1.5, // Start higher
      previousCAC: args.targetCAC * 1.8,
      targetCAC: args.targetCAC,
      ltv: args.ltv,
      spend: 0,
      revenue: 0,
      roas: 0,
      dsps: args.dsps,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    // Initialize DSP performance
    for (const dsp of args.dsps) {
      await ctx.db.insert("dspPerformance", {
        campaignId,
        dsp,
        spend: 0,
        currentECPM: Math.random() * 30 + 70, // $70-100 starting
        ecpmTrend: 0,
        roas: 0,
        status: "optimizing",
        timestamp: Date.now(),
      });
    }
    
    return campaignId;
  },
});

// Update campaign performance
export const updateCampaignPerformance = mutation({
  args: {
    campaignId: v.id("campaigns"),
    spend: v.number(),
    conversions: v.number(),
    revenue: v.number(),
  },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) throw new Error("Campaign not found");
    
    const newCAC = args.conversions > 0 ? args.spend / args.conversions : campaign.currentCAC;
    const newROAS = args.spend > 0 ? args.revenue / args.spend : 0;
    
    // Update campaign
    await ctx.db.patch(args.campaignId, {
      currentCAC: newCAC,
      spend: campaign.spend + args.spend,
      revenue: campaign.revenue + args.revenue,
      roas: newROAS,
      updatedAt: Date.now(),
    });
    
    // Add to history
    await ctx.db.insert("campaignHistory", {
      campaignId: args.campaignId,
      date: Date.now(),
      cac: newCAC,
      spend: args.spend,
      conversions: args.conversions,
      revenue: args.revenue,
    });
  },
});

// Activate Precise data on campaign
export const activatePreciseData = mutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.campaignId, {
      preciseLaunchDate: Date.now(),
    });
    
    // Simulate immediate CAC improvement
    const campaign = await ctx.db.get(args.campaignId);
    if (campaign) {
      const improvedCAC = campaign.currentCAC * 0.85; // 15% immediate improvement
      await ctx.db.patch(args.campaignId, {
        currentCAC: improvedCAC,
      });
    }
  },
});

// Create default campaign for new media buyers
export const createDefaultCampaign = mutation({
  args: { buyerId: v.id("users") },
  handler: async (ctx, args) => {
    const campaignId = await ctx.db.insert("campaigns", {
      buyerId: args.buyerId,
      name: "Nike Summer Fitness 2025",
      status: "active",
      currentCAC: 31.20,
      previousCAC: 47.50,
      targetCAC: 28.00,
      ltv: 131.04,
      preciseLaunchDate: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
      spend: 100000,
      revenue: 500000,
      roas: 5.0,
      dsps: ["madhive", "ttd", "amazon"],
      createdAt: Date.now() - (60 * 24 * 60 * 60 * 1000), // 60 days ago
      updatedAt: Date.now(),
    });
    
    // Create historical data
    const history = [];
    for (let i = 60; i >= 0; i--) {
      const date = Date.now() - (i * 24 * 60 * 60 * 1000);
      const cac = i > 30 ? 47.50 - (17.50 - i) * 0.3 : 31.20 + i * 0.5;
      
      history.push({
        campaignId,
        date,
        cac: Number(cac.toFixed(2)),
        spend: 1666, // ~100k over 60 days
        conversions: Math.floor(1666 / cac),
        revenue: 8333, // ~500k over 60 days
      });
    }
    
    // Insert history
    for (const record of history) {
      await ctx.db.insert("campaignHistory", record);
    }
    
    // Create DSP performance data
    const dsps = [
      { id: "madhive", spend: 45000, ecpm: 42.50, trend: -12, roas: 5.2 },
      { id: "ttd", spend: 32000, ecpm: 38.20, trend: -18, roas: 4.8 },
      { id: "amazon", spend: 23000, ecpm: 51.30, trend: -5, roas: 4.2 },
    ];
    
    for (const dsp of dsps) {
      await ctx.db.insert("dspPerformance", {
        campaignId,
        dsp: dsp.id,
        spend: dsp.spend,
        currentECPM: dsp.ecpm,
        ecpmTrend: dsp.trend,
        roas: dsp.roas,
        status: dsp.id === "amazon" ? "scaling" : dsp.id === "ttd" ? "saturated" : "optimizing",
        timestamp: Date.now(),
      });
    }
    
    return campaignId;
  },
});