// Migration Plan for Professional Sports Team Campaign Data
// This file outlines the plan for uploading Luigi's campaign data to Convex

import { mutation, internalMutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * MIGRATION PLAN - DO NOT EXECUTE
 * 
 * This plan outlines the steps to migrate the Professional Sports Team campaign data
 * into Convex for Luigi's media buyer view and Mario's data controller view.
 */

export const migrationPlan = {
  // Step 1: Create/Update User Accounts
  users: [
    {
      email: "luigi@demo.com",
      name: "Luigi",
      role: "MEDIA_BUYER",
      company: "Professional Sports Team",
      avatar: "/avatars/luigi.png"
    },
    {
      email: "mario@demo.com", 
      name: "Mario",
      role: "DATA_OWNER",
      company: "Audience Acuity",
      avatar: "/avatars/mario.png"
    }
  ],

  // Step 2: Schema Updates Needed
  schemaUpdates: {
    campaigns: {
      // Add new fields for sports team campaign
      newFields: [
        "cacReduction: v.number()",
        "roasImprovement: v.number()",
        "blendedLTV_CAC: v.number()",
        "previousCAC: v.number()",
        "previousROAS: v.number()"
      ]
    },
    
    creatives: {
      // Ensure fatigue score is tracked
      requiredFields: [
        "fatigueScore: v.number()",
        "clickRate: v.number()",
        "cac: v.number()"
      ]
    },

    cacForecasts: {
      // New table for CAC predictions
      schema: `
        week: v.number(),
        campaignId: v.id("campaigns"),
        predicted: v.number(),
        minRange: v.number(),
        maxRange: v.number(),
        recommendation: v.string(),
        confidence: v.number(),
        timestamp: v.number()
      `
    },

    attributionBreakdown: {
      // Track value attribution to data providers
      schema: `
        campaignId: v.id("campaigns"),
        source: v.string(),
        percentage: v.number(),
        value: v.number(),
        cohort: v.optional(v.string()),
        roas: v.optional(v.number()),
        dataControllerId: v.optional(v.string()),
        timestamp: v.number()
      `
    },

    channelPerformance: {
      // Replace social handles with digital channels
      schema: `
        campaignId: v.id("campaigns"),
        channel: v.string(), // "Tablet", "Web", "App", "CTV"
        spend: v.number(),
        conversions: v.number(),
        cac: v.number(),
        roas: v.number(),
        timestamp: v.number()
      `
    }
  },

  // Step 3: Data Upload Functions (NOT TO BE EXECUTED)
  uploadFunctions: {
    // Main campaign data
    uploadCampaign: `
      await ctx.db.insert("campaigns", {
        userId: luigiUserId,
        name: "Professional Sports Team 2025",
        status: "active",
        budget: 150000,
        spend: 112120,
        impressions: 29643455,
        clicks: 149355,
        conversions: 15550,
        currentCAC: 5.36,
        previousCAC: 10.27,
        cacReduction: 0.46,
        currentROAS: 28,
        previousROAS: 15,
        roasImprovement: 1.9,
        blendedLTV_CAC: 28,
        startDate: new Date("2025-01-01").getTime(),
        endDate: new Date("2025-12-31").getTime(),
        createdAt: Date.now()
      });
    `,

    // Creative performance data
    uploadCreatives: `
      // Creative 1 - Fatigued
      await ctx.db.insert("creatives", {
        campaignId: campaignId,
        name: "Creative 1",
        type: "display",
        status: "active",
        fatigueScore: 0.62,
        impressions: 22360770,
        clicks: 129692,
        clickRate: 0.0058,
        conversions: 11180,
        spend: 80499,
        cac: 7.2,
        createdAt: Date.now()
      });

      // Creative 2 - Performing well
      await ctx.db.insert("creatives", {
        campaignId: campaignId,
        name: "Creative 2",
        type: "display",
        status: "active",
        fatigueScore: 0.28,
        impressions: 7282685,
        clicks: 19663,
        clickRate: 0.0027,
        conversions: 4370,
        spend: 29131,
        cac: 6.7,
        createdAt: Date.now()
      });
    `,

    // CAC Forecast data
    uploadCACForecasts: `
      const forecasts = [
        { week: 1, predicted: 6.90, min: 6.80, max: 8.87, rec: "Creative refresh" },
        { week: 2, predicted: 6.24, min: 6.15, max: 6.85, rec: "Creative / Publisher Mix optimization" },
        { week: 3, predicted: 5.57, min: 5.45, max: 5.77, rec: "Data enhanced Creative" },
        { week: 4, predicted: 5.36, min: 5.31, max: 5.65, rec: "Potential Refresh needed" }
      ];

      for (const forecast of forecasts) {
        await ctx.db.insert("cacForecasts", {
          campaignId: campaignId,
          week: forecast.week,
          predicted: forecast.predicted,
          minRange: forecast.min,
          maxRange: forecast.max,
          recommendation: forecast.rec,
          confidence: 0.85 - (forecast.week * 0.025),
          timestamp: Date.now()
        });
      }
    `,

    // Attribution breakdown
    uploadAttribution: `
      const attributions = [
        { source: "1P Data - Marketing", percentage: 0.07, value: 810, cohort: "C0", roas: 14.6 },
        { source: "1P Data - Sales", percentage: 0.13, value: 1500, cohort: "C1", roas: 34.7 },
        { source: "3P Data - IDR - Audience Acuity", percentage: 0.03, value: 340, cohort: "C2", roas: 40.8, dataControllerId: "mario@demo.com" },
        { source: "3P Data - User Affinities - Audience Acuity", percentage: 0.11, value: 1270, cohort: "C3", roas: 80.9, dataControllerId: "mario@demo.com" },
        { source: "Precise AI Model", percentage: 0.42, value: 4700 },
        { source: "Return Path Data", percentage: 0.23, value: 2600 }
      ];

      for (const attr of attributions) {
        await ctx.db.insert("attributionBreakdown", attr);
      }
    `,

    // Channel performance
    uploadChannels: `
      const channels = [
        { channel: "Tablet", spend: 28030, conversions: 3920, cac: 7.15, roas: 25 },
        { channel: "Web", spend: 44848, conversions: 7380, cac: 6.08, roas: 32 },
        { channel: "App", spend: 22424, conversions: 4100, cac: 5.47, roas: 35 },
        { channel: "CTV", spend: 16818, conversions: 2150, cac: 7.82, roas: 22 }
      ];

      for (const channel of channels) {
        await ctx.db.insert("channelPerformance", {
          campaignId: campaignId,
          ...channel,
          timestamp: Date.now()
        });
      }
    `,

    // Additional campaigns for portfolio view
    uploadAdditionalCampaigns: `
      const additionalCampaigns = [
        { id: "campaign_12340", name: "Ad Campaign", spend: 12340, status: "active" },
        { id: "campaign_8230", name: "Ad Campaign", spend: 8230, status: "active" },
        { id: "campaign_5670", name: "Professional Sports Campaign", spend: 4810, status: "paused" },
        { id: "campaign_4510", name: "Ad Campaign", spend: 4510, status: "completed" }
      ];

      for (const campaign of additionalCampaigns) {
        await ctx.db.insert("campaigns", {
          userId: luigiUserId,
          ...campaign,
          budget: campaign.spend * 1.2,
          impressions: campaign.spend * 1000,
          clicks: campaign.spend * 50,
          conversions: campaign.spend * 2,
          createdAt: Date.now()
        });
      }
    `
  },

  // Step 4: Data Connections for Mario's View
  dataControllerConnections: {
    // Link Mario's data assets to Luigi's campaign
    linkDataAssets: `
      // Create entries showing Mario's data contribution to Luigi's campaign
      await ctx.db.insert("dataUsage", {
        dataAssetId: "identity_resolution_asset",
        campaignId: sportsTeamCampaignId,
        queries: 234000,
        revenue: 560,
        dataOwnerId: "mario@demo.com",
        timestamp: Date.now()
      });

      await ctx.db.insert("dataUsage", {
        dataAssetId: "live_sports_fan_asset",
        campaignId: sportsTeamCampaignId,
        queries: 112000,
        revenue: 890,
        dataOwnerId: "mario@demo.com",
        timestamp: Date.now()
      });

      await ctx.db.insert("dataUsage", {
        dataAssetId: "location_context_asset",
        campaignId: sportsTeamCampaignId,
        queries: 42000,
        revenue: 150,
        dataOwnerId: "mario@demo.com",
        timestamp: Date.now()
      });
    `,

    // Create proof of data transaction
    createProofOfData: `
      await ctx.db.insert("dataProofs", {
        dataId: "0x3f261e2c687a7d3c941dcc31d7d5df56c187ae3a09f428e1d03185a193f2c757",
        timestamp: new Date("2025-05-15T11:17:15-04:00").getTime(),
        blockHeight: 810502,
        vpIds: "384484",
        transactionContract: "0xa61Aa9C70cD62c0Dc03C5338e1f99c8F0eB56982",
        transactionHash: "0x408dedb0fca4c38e86a2ea1065f180a02abcb94dd24cf0f2db8d75978bd85a97",
        explorerUrl: "https://block-explorer.prod.alice.net/tx/0x408dedb0fca4c38e86a2ea1065f180a02abcb94dd24cf0f2db8d75978bd85a97?tab=index",
        campaignId: sportsTeamCampaignId,
        dataOwnerId: "mario@demo.com"
      });
    `
  },

  // Step 5: View Modifications
  viewUpdates: {
    mediaBuyer: [
      "Show Professional Sports Team campaign prominently",
      "Display CAC reduction metrics with Precise impact",
      "Show creative fatigue alerts for Creative 1",
      "Display 4-week CAC forecast with confidence intervals",
      "Show attribution breakdown with links to data providers",
      "Replace social channels with Tablet/Web/App/CTV",
      "Show additional campaigns in portfolio view"
    ],
    
    dataController: [
      "Show earnings from Professional Sports Team campaign",
      "Display cryptographic proof of data usage",
      "Show real-time usage metrics for each data asset",
      "Link to Luigi's campaign performance",
      "Show breakdown of $1,600 campaign revenue"
    ]
  },

  // Step 6: Testing Checklist
  testingChecklist: [
    "✓ Luigi can log in and see Professional Sports Team campaign",
    "✓ Mario can log in and see earnings from data contribution",
    "✓ CAC reduction metrics display correctly (46% reduction)",
    "✓ Creative fatigue alerts work for Creative 1 (62%)",
    "✓ 4-week forecast shows with confidence intervals",
    "✓ Attribution breakdown totals to 100%",
    "✓ Channel performance shows Tablet/Web/App/CTV instead of social",
    "✓ Cryptographic proof displays in Mario's view",
    "✓ Real-time updates work between views",
    "✓ Additional campaigns show in portfolio view"
  ]
};

// Helper function to generate the migration (DO NOT RUN)
export const generateMigrationCode = () => {
  console.log(`
    MIGRATION STEPS:
    1. Update Convex schema with new tables/fields
    2. Create user accounts for Luigi and Mario
    3. Upload campaign data with 10x scaling
    4. Upload additional campaigns for portfolio view
    5. Link data assets between users
    6. Create cryptographic proof records
    7. Test both views thoroughly
    
    Note: All values should be 10x scaled except percentages and ratios
  `);
};