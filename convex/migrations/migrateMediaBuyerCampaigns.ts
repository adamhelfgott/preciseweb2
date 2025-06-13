import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const migrateMediaBuyerCampaigns = mutation({
  args: {
    buyerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the media buyer user
    const buyer = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.buyerEmail))
      .first();

    if (!buyer || buyer.role !== "MEDIA_BUYER") {
      throw new Error("Media buyer not found");
    }

    // Check if campaigns already exist
    const existingCampaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_buyer", (q) => q.eq("buyerId", buyer._id))
      .collect();

    // Define the campaigns to migrate
    const campaignsToMigrate = [
      {
        name: "Nike Summer Fitness 2025",
        status: "active" as const,
        spend: 100000,
        targetCAC: 28.00,
        currentCAC: 31.20,
        previousCAC: 47.50,
        ltv: 131.04,
        revenue: 500000,
        roas: 5.0,
        dsps: ["madhive", "ttd", "amazon"],
        preciseLaunchDate: Date.now() - (30 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Tesla Model S Reveal",
        status: "active" as const,
        spend: 145000,
        targetCAC: 45.00,
        currentCAC: 68.00,
        previousCAC: 85.00,
        ltv: 250.00,
        revenue: 460000,
        roas: 3.2,
        dsps: ["ttd", "amazon"],
      },
      {
        name: "Disney+ Magic Happens",
        status: "active" as const,
        spend: 75000,
        targetCAC: 35.00,
        currentCAC: 42.80,
        previousCAC: 52.30,
        ltv: 145.20,
        revenue: 340000,
        roas: 4.5,
        dsps: ["madhive", "ttd"],
      },
    ];

    const migratedCampaigns = [];

    for (const campaignData of campaignsToMigrate) {
      // Check if campaign already exists
      const existing = existingCampaigns.find(c => c.name === campaignData.name);
      if (existing) {
        console.log(`Campaign "${campaignData.name}" already exists, skipping`);
        continue;
      }

      // Create the campaign
      const campaignId = await ctx.db.insert("campaigns", {
        buyerId: buyer._id,
        ...campaignData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      // Add DSP performance data for Nike campaign
      if (campaignData.name === "Nike Summer Fitness 2025") {
        const dspData = [
          { dsp: "MadHive", spend: 45000, currentECPM: 42.50, ecpmTrend: -12, roas: 5.2, status: "optimizing" as const },
          { dsp: "The Trade Desk", spend: 32000, currentECPM: 38.20, ecpmTrend: -18, roas: 4.8, status: "saturated" as const },
          { dsp: "Amazon DSP", spend: 23000, currentECPM: 51.30, ecpmTrend: -5, roas: 4.2, status: "scaling" as const },
        ];

        for (const dsp of dspData) {
          await ctx.db.insert("dspPerformance", {
            campaignId,
            ...dsp,
            timestamp: Date.now(),
          });
        }

        // Add creative performance data
        const creatives = [
          {
            name: "Nike Summer Hero - Runner",
            type: "image" as const,
            format: "1080x1080",
            impressions: 2450000,
            clicks: 48200,
            ctr: 1.97,
            conversions: 1820,
            cvr: 3.78,
            spend: 15600,
            cpa: 8.57,
            fatigueScore: 72,
            daysActive: 14,
          },
          {
            name: "Morning Motivation 15s",
            type: "video" as const,
            format: "9:16 Video",
            impressions: 3200000,
            clicks: 89600,
            ctr: 2.80,
            conversions: 3584,
            cvr: 4.00,
            spend: 24000,
            cpa: 6.70,
            fatigueScore: 25,
            daysActive: 5,
          },
        ];

        for (const creative of creatives) {
          await ctx.db.insert("creatives", {
            campaignId,
            buyerId: buyer._id,
            ...creative,
            status: "active" as const,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }
      }

      // Add DSP performance for other campaigns
      if (campaignData.name === "Tesla Model S Reveal") {
        await ctx.db.insert("dspPerformance", {
          campaignId,
          dsp: "The Trade Desk",
          spend: 80000,
          currentECPM: 65.00,
          ecpmTrend: -8,
          roas: 3.2,
          status: "optimizing" as const,
          timestamp: Date.now(),
        });
        await ctx.db.insert("dspPerformance", {
          campaignId,
          dsp: "Amazon DSP",
          spend: 65000,
          currentECPM: 72.00,
          ecpmTrend: -15,
          roas: 2.8,
          status: "saturated" as const,
          timestamp: Date.now(),
        });
      }

      if (campaignData.name === "Disney+ Magic Happens") {
        await ctx.db.insert("dspPerformance", {
          campaignId,
          dsp: "MadHive",
          spend: 40000,
          currentECPM: 35.00,
          ecpmTrend: 5,
          roas: 4.5,
          status: "scaling" as const,
          timestamp: Date.now(),
        });
        await ctx.db.insert("dspPerformance", {
          campaignId,
          dsp: "The Trade Desk",
          spend: 35000,
          currentECPM: 42.00,
          ecpmTrend: -3,
          roas: 4.2,
          status: "optimizing" as const,
          timestamp: Date.now(),
        });
      }

      migratedCampaigns.push(campaignData.name);
    }

    return {
      success: true,
      migratedCount: migratedCampaigns.length,
      migratedCampaigns,
      message: `Migrated ${migratedCampaigns.length} campaigns for ${args.buyerEmail}`,
    };
  },
});