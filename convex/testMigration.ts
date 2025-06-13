import { query } from "./_generated/server";
import { v } from "convex/values";

export const verifyMigration = query({
  args: {},
  handler: async (ctx) => {
    // Get Luigi and Mario
    const luigi = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "luigi@demo.com"))
      .first();
    
    const mario = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "mario@demo.com"))
      .first();
    
    // Get Luigi's campaigns
    const luigiCampaigns = luigi
      ? await ctx.db
          .query("campaigns")
          .withIndex("by_buyer", (q) => q.eq("buyerId", luigi._id))
          .collect()
      : [];
    
    // Get Mario's data assets
    const marioAssets = mario
      ? await ctx.db
          .query("dataAssets")
          .withIndex("by_owner", (q) => q.eq("ownerId", mario._id))
          .collect()
      : [];
    
    // Get main sports campaign
    const sportsCampaign = luigiCampaigns.find(c => c.name === "Professional Sports Team 2025");
    
    // Get creatives for sports campaign
    const creatives = sportsCampaign
      ? await ctx.db
          .query("creatives")
          .withIndex("by_campaign", (q) => q.eq("campaignId", sportsCampaign._id))
          .collect()
      : [];
    
    // Get attributions
    const attributions = sportsCampaign
      ? await ctx.db
          .query("attributions")
          .withIndex("by_campaign", (q) => q.eq("campaignId", sportsCampaign._id))
          .collect()
      : [];
    
    // Get Mario's earnings
    const marioEarnings = mario
      ? await ctx.db
          .query("earnings")
          .withIndex("by_owner", (q) => q.eq("ownerId", mario._id))
          .collect()
      : [];
    
    return {
      users: {
        luigi: luigi ? { id: luigi._id, email: luigi.email, name: luigi.name } : null,
        mario: mario ? { id: mario._id, email: mario.email, name: mario.name } : null,
      },
      campaigns: {
        total: luigiCampaigns.length,
        sportsCampaign: sportsCampaign ? {
          name: sportsCampaign.name,
          currentCAC: sportsCampaign.currentCAC,
          previousCAC: sportsCampaign.previousCAC,
          roas: sportsCampaign.roas,
          spend: sportsCampaign.spend,
        } : null,
      },
      dataAssets: {
        total: marioAssets.length,
        assets: marioAssets.map(a => ({
          name: a.name,
          monthlyRevenue: a.monthlyRevenue,
          qualityScore: a.qualityScore,
        })),
      },
      creatives: {
        total: creatives.length,
        details: creatives.map(c => ({
          name: c.name,
          fatigueScore: c.fatigueScore,
          impressions: c.impressions,
          ctr: c.ctr,
        })),
      },
      attributions: {
        total: attributions.length,
        totalValue: attributions.reduce((sum, a) => sum + a.value, 0),
      },
      earnings: {
        total: marioEarnings.length,
        totalAmount: marioEarnings.reduce((sum, e) => sum + e.amount, 0),
      },
    };
  },
});