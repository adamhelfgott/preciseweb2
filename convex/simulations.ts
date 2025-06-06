import { internalAction, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Start earnings simulation for a user
export const startEarningsSimulation = internalAction({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // For demo purposes, we'll just log
    // Real simulation happens on frontend
    console.log("Starting earnings simulation for user:", args.userId);
    
    // In production, this would set up scheduled tasks
    // For now, frontend will handle the simulation timing
  },
});

// Simulate campaign performance updates
export const simulateCampaignUpdate = internalMutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign || campaign.status !== "active") return;
    
    // Calculate daily spend based on total
    const dailySpend = 1666; // ~$100k over 60 days
    
    // Simulate CAC improvement if Precise is active
    let cacMultiplier = 1;
    if (campaign.preciseLaunchDate) {
      const daysSinceLaunch = (Date.now() - campaign.preciseLaunchDate) / (24 * 60 * 60 * 1000);
      cacMultiplier = Math.max(0.65, 1 - (daysSinceLaunch * 0.01)); // Improve 1% per day, cap at 35% improvement
    }
    
    const currentCAC = campaign.targetCAC * 1.5 * cacMultiplier;
    const conversions = Math.floor(dailySpend / currentCAC);
    const revenue = conversions * campaign.ltv;
    
    // Update campaign
    await ctx.db.patch(args.campaignId, {
      currentCAC: Number(currentCAC.toFixed(2)),
      spend: campaign.spend + dailySpend,
      revenue: campaign.revenue + revenue,
      roas: revenue / dailySpend,
      updatedAt: Date.now(),
    });
    
    // Add to history
    await ctx.db.insert("campaignHistory", {
      campaignId: args.campaignId,
      date: Date.now(),
      cac: Number(currentCAC.toFixed(2)),
      spend: dailySpend,
      conversions,
      revenue,
    });
    
    // Update DSP performance
    const dspPerformance = await ctx.db
      .query("dspPerformance")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .collect();
    
    for (const dsp of dspPerformance) {
      // Simulate eCPM decay
      const decayRate = 0.02; // 2% daily decay
      const newECPM = dsp.currentECPM * (1 - decayRate);
      const ecpmTrend = ((newECPM - dsp.currentECPM) / dsp.currentECPM) * 100;
      
      // Update status based on eCPM
      let status: "scaling" | "optimizing" | "saturated" = "optimizing";
      if (newECPM < 40) status = "saturated";
      else if (newECPM > 60) status = "scaling";
      
      await ctx.db.patch(dsp._id, {
        currentECPM: Number(newECPM.toFixed(2)),
        ecpmTrend: Number(ecpmTrend.toFixed(1)),
        status,
        timestamp: Date.now(),
      });
    }
  },
});

// Generate attribution data
export const generateAttributions = internalMutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) return;
    
    // Get random data assets to attribute value to
    const allAssets = await ctx.db.query("dataAssets").collect();
    const selectedAssets = allAssets
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Distribute CAC reduction using simplified Shapley values
    const totalReduction = campaign.previousCAC - campaign.currentCAC;
    const shares = [0.41, 0.29, 0.22]; // Pre-calculated Shapley values
    
    for (let i = 0; i < selectedAssets.length; i++) {
      const asset = selectedAssets[i];
      const cacReduction = totalReduction * shares[i];
      
      await ctx.db.insert("attributions", {
        campaignId: args.campaignId,
        dataSourceId: asset._id,
        cacReduction: Number(cacReduction.toFixed(2)),
        percentage: shares[i] * 100,
        value: cacReduction * 1000, // Assume 1000 conversions
        timestamp: Date.now(),
      });
    }
  },
});

// Initialize demo data for a new user
export const initializeDemoData = internalAction({
  args: { userId: v.id("users"), role: v.string() },
  handler: async (ctx, args) => {
    // For demo purposes, we'll just log the initialization
    // Real data setup can be done through frontend mutations
    console.log(`Initializing demo data for ${args.role} user:`, args.userId);
    
    // In production, this would:
    // 1. Create default data assets for DATA_OWNER
    // 2. Create default campaigns for MEDIA_BUYER  
    // 3. Generate initial recommendations
    // For now, the frontend will handle initial setup
  },
});