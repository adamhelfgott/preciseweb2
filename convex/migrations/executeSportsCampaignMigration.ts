import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

// Migration to add Professional Sports Team campaign data
// Maps to EXISTING schema fields only - no new fields

export const createUsersAndCampaign = internalMutation({
  args: {},
  handler: async (ctx) => {
    console.log("Starting Professional Sports Team migration...");
    
    // Step 1: Create or get users
    // Check if Luigi exists
    let luigi = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "luigi@demo.com"))
      .first();
    
    if (!luigi) {
      const luigiId = await ctx.db.insert("users", {
        email: "luigi@demo.com",
        name: "Luigi",
        role: "MEDIA_BUYER",
        company: "Professional Sports Team",
        onboardingCompleted: true,
        createdAt: Date.now(),
      });
      luigi = await ctx.db.get(luigiId);
    }
    
    // Check if Mario exists
    let mario = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "mario@demo.com"))
      .first();
    
    if (!mario) {
      const marioId = await ctx.db.insert("users", {
        email: "mario@demo.com",
        name: "Mario",
        role: "DATA_OWNER",
        company: "Audience Acuity",
        onboardingCompleted: true,
        createdAt: Date.now(),
      });
      mario = await ctx.db.get(marioId);
    }
    
    console.log("Users created/found:", { luigi: luigi?._id, mario: mario?._id });
    
    // Step 2: Create main Professional Sports Team campaign
    const mainCampaignId = await ctx.db.insert("campaigns", {
      buyerId: luigi!._id,
      name: "Professional Sports Team 2025",
      status: "active",
      currentCAC: 5.36,
      previousCAC: 10.27,
      targetCAC: 5.0,
      ltv: 150, // Calculated from LTV:CAC ratio of 28:1
      spend: 112120,
      revenue: 3130000, // From attribution data
      roas: 28,
      dsps: ["DV360", "Amazon DSP", "The Trade Desk", "Yahoo DSP"],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    console.log("Main campaign created:", mainCampaignId);
    
    // Step 3: Create campaign history (for trend visualization)
    const historyDates = [
      { daysAgo: 30, cac: 10.27, spend: 10000, conversions: 973, revenue: 272440 },
      { daysAgo: 25, cac: 9.50, spend: 15000, conversions: 1579, revenue: 442120 },
      { daysAgo: 20, cac: 8.80, spend: 20000, conversions: 2273, revenue: 636440 },
      { daysAgo: 15, cac: 7.90, spend: 25000, conversions: 3165, revenue: 886200 },
      { daysAgo: 10, cac: 7.20, spend: 30000, conversions: 4167, revenue: 1166760 },
      { daysAgo: 5, cac: 6.50, spend: 35000, conversions: 5385, revenue: 1507800 },
      { daysAgo: 0, cac: 5.36, spend: 40000, conversions: 7463, revenue: 2089640 },
    ];
    
    for (const history of historyDates) {
      await ctx.db.insert("campaignHistory", {
        campaignId: mainCampaignId,
        date: Date.now() - (history.daysAgo * 24 * 60 * 60 * 1000),
        cac: history.cac,
        spend: history.spend,
        conversions: history.conversions,
        revenue: history.revenue,
      });
    }
    
    // Step 4: Create creatives with fatigue scores
    const creative1Id = await ctx.db.insert("creatives", {
      campaignId: mainCampaignId,
      buyerId: luigi!._id,
      name: "Creative 1 - Hero Video",
      type: "video",
      format: "1920x1080",
      impressions: 22360770,
      clicks: 129692,
      conversions: 11180,
      spend: 80499,
      ctr: 0.58, // 0.58%
      cvr: 8.62, // conversions/clicks * 100
      cpa: 7.2,
      fatigueScore: 62, // 62% fatigue
      daysActive: 45,
      status: "active",
      createdAt: Date.now() - (45 * 24 * 60 * 60 * 1000),
      updatedAt: Date.now(),
    });
    
    const creative2Id = await ctx.db.insert("creatives", {
      campaignId: mainCampaignId,
      buyerId: luigi!._id,
      name: "Creative 2 - Season Highlights",
      type: "video",
      format: "1920x1080",
      impressions: 7282685,
      clicks: 19663,
      conversions: 4370,
      spend: 29131,
      ctr: 0.27, // 0.27%
      cvr: 22.22, // conversions/clicks * 100
      cpa: 6.7,
      fatigueScore: 28, // 28% fatigue
      daysActive: 20,
      status: "active",
      createdAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
      updatedAt: Date.now(),
    });
    
    // Step 5: Create creative fatigue alert for Creative 1
    await ctx.db.insert("creativeFatigueAlerts", {
      creativeId: creative1Id,
      campaignId: mainCampaignId,
      buyerId: luigi!._id,
      severity: "warning",
      ctrDrop: 35, // 35% drop
      cvrDrop: 28, // 28% drop
      recommendedAction: "Creative refresh recommended - performance declining",
      impact: "$12.3K potential wasted spend if not addressed",
      status: "active",
      createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
    });
    
    // Step 6: Create CAC predictions
    await ctx.db.insert("cacPredictions", {
      campaignId: mainCampaignId,
      buyerId: luigi!._id,
      timestamp: Date.now(),
      predictions: [
        {
          week: 1,
          predictedCAC: 6.90,
          confidenceLow: 6.80,
          confidenceHigh: 8.87,
          factors: [
            { name: "Creative Fatigue", impact: -15, direction: "negative" },
            { name: "Seasonal Demand", impact: 8, direction: "positive" },
          ],
        },
        {
          week: 2,
          predictedCAC: 6.24,
          confidenceLow: 6.15,
          confidenceHigh: 6.85,
          factors: [
            { name: "Creative Refresh", impact: 10, direction: "positive" },
            { name: "Publisher Mix Optimization", impact: 5, direction: "positive" },
          ],
        },
        {
          week: 3,
          predictedCAC: 5.57,
          confidenceLow: 5.45,
          confidenceHigh: 5.77,
          factors: [
            { name: "Data Enhancement", impact: 12, direction: "positive" },
            { name: "Audience Optimization", impact: 8, direction: "positive" },
          ],
        },
        {
          week: 4,
          predictedCAC: 5.36,
          confidenceLow: 5.31,
          confidenceHigh: 5.65,
          factors: [
            { name: "Full Optimization", impact: 15, direction: "positive" },
            { name: "Market Saturation", impact: -5, direction: "negative" },
          ],
        },
      ],
      currentCAC: 5.36,
      modelAccuracy: 87.5,
    });
    
    // Step 7: Create DSP performance data (replacing channels)
    const dspData = [
      { dsp: "DV360", spend: 44848, ecpm: 12.5, roas: 32, status: "scaling" as const }, // Web equivalent
      { dsp: "Amazon DSP", spend: 28030, ecpm: 10.2, roas: 25, status: "optimizing" as const }, // Tablet equivalent
      { dsp: "The Trade Desk", spend: 22424, ecpm: 14.8, roas: 35, status: "scaling" as const }, // App equivalent
      { dsp: "Yahoo DSP", spend: 16818, ecpm: 8.9, roas: 22, status: "saturated" as const }, // CTV equivalent
    ];
    
    for (const dsp of dspData) {
      await ctx.db.insert("dspPerformance", {
        campaignId: mainCampaignId,
        dsp: dsp.dsp,
        spend: dsp.spend,
        currentECPM: dsp.ecpm,
        ecpmTrend: Math.random() * 10 - 5, // Random trend -5% to +5%
        roas: dsp.roas,
        status: dsp.status,
        timestamp: Date.now(),
      });
    }
    
    // Step 8: Create Mario's data assets
    const identityResolutionId = await ctx.db.insert("dataAssets", {
      ownerId: mario!._id,
      name: "Identity Resolution - Sports Fans",
      type: "Identity Graph",
      qualityScore: 92,
      recordCount: 2500000,
      updateFrequency: 24, // hours
      revenuePerK: 2.39, // $560 / 234k queries * 1000
      industryAvgPerK: 2.10,
      usageRate: 78,
      monthlyRevenue: 560,
      status: "active",
      createdAt: Date.now() - (180 * 24 * 60 * 60 * 1000), // 6 months ago
      updatedAt: Date.now(),
    });
    
    const sportsAffinityId = await ctx.db.insert("dataAssets", {
      ownerId: mario!._id,
      name: "Live Sports Fan Affinity",
      type: "Behavioral Segment",
      qualityScore: 88,
      recordCount: 1800000,
      updateFrequency: 168, // weekly
      revenuePerK: 7.95, // $890 / 112k queries * 1000
      industryAvgPerK: 6.50,
      usageRate: 85,
      monthlyRevenue: 890,
      status: "active",
      createdAt: Date.now() - (120 * 24 * 60 * 60 * 1000), // 4 months ago
      updatedAt: Date.now(),
    });
    
    const locationContextId = await ctx.db.insert("dataAssets", {
      ownerId: mario!._id,
      name: "Location Context - Stadium Visitors",
      type: "Location Intelligence",
      qualityScore: 79,
      recordCount: 750000,
      updateFrequency: 72, // 3 days
      revenuePerK: 3.57, // $150 / 42k queries * 1000
      industryAvgPerK: 3.20,
      usageRate: 65,
      monthlyRevenue: 150,
      status: "active",
      createdAt: Date.now() - (90 * 24 * 60 * 60 * 1000), // 3 months ago
      updatedAt: Date.now(),
    });
    
    // Step 9: Create attribution data linking Mario's assets to Luigi's campaign
    const attributionData = [
      { dataSourceId: identityResolutionId, percentage: 3, value: 340, cacReduction: 0.34 },
      { dataSourceId: sportsAffinityId, percentage: 11, value: 1270, cacReduction: 1.13 },
      { dataSourceId: locationContextId, percentage: 2, value: 150, cacReduction: 0.15 },
    ];
    
    for (const attr of attributionData) {
      await ctx.db.insert("attributions", {
        campaignId: mainCampaignId,
        dataSourceId: attr.dataSourceId,
        cacReduction: attr.cacReduction,
        percentage: attr.percentage,
        value: attr.value,
        timestamp: Date.now(),
      });
    }
    
    // Step 10: Create earnings for Mario
    for (const asset of [
      { assetId: identityResolutionId, amount: 560, impressions: 234000 },
      { assetId: sportsAffinityId, amount: 890, impressions: 112000 },
      { assetId: locationContextId, amount: 150, impressions: 42000 },
    ]) {
      await ctx.db.insert("earnings", {
        ownerId: mario!._id,
        assetId: asset.assetId,
        amount: asset.amount,
        campaign: "Professional Sports Team 2025",
        impressions: asset.impressions,
        timestamp: Date.now(),
        status: "pending",
      });
    }
    
    // Step 11: Create additional campaigns for Luigi's portfolio
    const additionalCampaigns = [
      { name: "Spring Training Promo", spend: 12340, status: "active" as const },
      { name: "Season Pass Campaign", spend: 8230, status: "active" as const },
      { name: "Professional Sports Campaign", spend: 4810, status: "paused" as const },
      { name: "Holiday Ticket Bundle", spend: 4510, status: "completed" as const },
    ];
    
    for (const campaign of additionalCampaigns) {
      await ctx.db.insert("campaigns", {
        buyerId: luigi!._id,
        name: campaign.name,
        status: campaign.status,
        currentCAC: Math.random() * 5 + 5, // Random CAC between 5-10
        previousCAC: Math.random() * 5 + 8, // Random previous CAC between 8-13
        targetCAC: 6.0,
        ltv: 120,
        spend: campaign.spend,
        revenue: campaign.spend * (Math.random() * 10 + 20), // Random 20-30x ROAS
        roas: Math.random() * 10 + 20,
        dsps: ["DV360", "The Trade Desk"],
        createdAt: Date.now() - (Math.random() * 90 * 24 * 60 * 60 * 1000), // Random time in last 90 days
        updatedAt: Date.now(),
      });
    }
    
    // Step 12: Create campaign health monitoring
    await ctx.db.insert("campaignHealth", {
      campaignId: mainCampaignId,
      buyerId: luigi!._id,
      healthScore: 82, // Good health
      metrics: {
        ctrTrend: -12, // Declining due to creative fatigue
        cvrTrend: 8, // Improving with optimization
        cacTrend: -46, // Significant improvement
        roasTrend: 87, // Strong improvement
        budgetUtilization: 75, // 112k/150k
        creativeFreshness: 45, // Needs refresh
      },
      alerts: [
        {
          type: "creative_fatigue",
          severity: "warning",
          message: "Creative 1 showing 62% fatigue - refresh recommended",
        },
        {
          type: "performance",
          severity: "info",
          message: "CAC improved by 46% since Precise implementation",
        },
      ],
      timestamp: Date.now(),
    });
    
    // Step 13: Create recommendations for both users
    await ctx.db.insert("recommendations", {
      userId: luigi!._id,
      type: "campaign_optimization",
      priority: "high",
      title: "Refresh Creative 1 to Maintain Performance",
      description: "Creative 1 is showing 62% fatigue. Refreshing could improve CTR by 35% and save $12.3K in wasted spend.",
      estimatedImpact: {
        type: "cost_savings",
        value: 12300,
      },
      status: "new",
      createdAt: Date.now(),
    });
    
    await ctx.db.insert("recommendations", {
      userId: mario!._id,
      type: "data_optimization",
      priority: "medium",
      title: "Enhance Location Context Data Freshness",
      description: "Updating location data more frequently (daily vs 3 days) could increase value by 25% and command higher CPM.",
      estimatedImpact: {
        type: "revenue_increase",
        value: 37.5, // 25% of $150
      },
      status: "new",
      createdAt: Date.now(),
    });
    
    console.log("Migration completed successfully!");
    
    return {
      success: true,
      users: { luigi: luigi?._id, mario: mario?._id },
      campaign: mainCampaignId,
      message: "Professional Sports Team campaign data migrated successfully",
    };
  },
});