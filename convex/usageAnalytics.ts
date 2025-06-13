import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

// Get usage analytics for an owner
export const getUsageAnalytics = query({
  args: {
    ownerId: v.id("users"),
    timeframe: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get analytics data
    const analytics = await ctx.db
      .query("usageAnalytics")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .order("desc")
      .take(100);

    // Get related data assets
    const assetIds = [...new Set(analytics.map(a => a.assetId))];
    const assets = await Promise.all(
      assetIds.map(id => ctx.db.get(id))
    );

    // Combine data
    const analyticsWithAssets = analytics.map(record => {
      const asset = assets.find(a => a?._id === record.assetId);
      return {
        ...record,
        assetName: asset?.name || "Unknown Asset",
        assetType: asset?.type || "Unknown",
      };
    });

    return analyticsWithAssets;
  },
});

// Get detailed query logs
export const getQueryLogs = query({
  args: {
    ownerId: v.id("users"),
    assetId: v.optional(v.id("dataAssets")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let analyticsQuery = ctx.db
      .query("usageAnalytics")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId));

    if (args.assetId) {
      analyticsQuery = analyticsQuery.filter((q) => 
        q.eq(q.field("assetId"), args.assetId)
      );
    }

    const analytics = await analyticsQuery
      .order("desc")
      .take(args.limit || 50);

    // Extract all queries from analytics records
    const allQueries: any[] = [];
    for (const record of analytics) {
      const asset = await ctx.db.get(record.assetId);
      for (const query of record.queries || []) {
        const user = await ctx.db.get(query.userId);
        allQueries.push({
          id: `${record._id}-${query.timestamp}`,
          timestamp: query.timestamp,
          assetId: record.assetId,
          assetName: asset?.name || "Unknown Asset",
          queryType: query.queryType,
          responseTime: query.responseTime,
          userName: user?.name || "Unknown User",
          userCompany: user?.company || "Unknown Company",
          revenue: (record.revenue / (record.queries?.length || 1)) || 0,
        });
      }
    }

    // Sort by timestamp descending
    return allQueries.sort((a, b) => b.timestamp - a.timestamp);
  },
});

// Get usage patterns and insights
export const getUsagePatterns = query({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const analytics = await ctx.db
      .query("usageAnalytics")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Calculate query type distribution
    const queryTypes: Record<string, number> = {};
    let totalQueries = 0;

    for (const record of analytics) {
      for (const query of record.queries || []) {
        queryTypes[query.queryType] = (queryTypes[query.queryType] || 0) + 1;
        totalQueries++;
      }
    }

    // Convert to array format
    const queryPatterns = Object.entries(queryTypes).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / totalQueries) * 100),
    }));

    // Calculate time-based patterns (hourly distribution)
    const hourlyDistribution = new Array(24).fill(0);
    for (const record of analytics) {
      for (const query of record.queries || []) {
        const hour = new Date(query.timestamp).getHours();
        hourlyDistribution[hour]++;
      }
    }

    // Calculate asset performance
    const assetPerformance = await Promise.all(
      [...new Set(analytics.map(a => a.assetId))].map(async (assetId) => {
        const asset = await ctx.db.get(assetId);
        const assetAnalytics = analytics.filter(a => a.assetId === assetId);
        
        const totalRevenue = assetAnalytics.reduce((sum, a) => sum + a.revenue, 0);
        const totalQueries = assetAnalytics.reduce((sum, a) => sum + (a.queries?.length || 0), 0);
        const avgResponseTime = assetAnalytics.reduce((sum, a) => {
          const avgTime = a.queries?.reduce((s, q) => s + q.responseTime, 0) / (a.queries?.length || 1);
          return sum + avgTime;
        }, 0) / assetAnalytics.length;

        return {
          assetId,
          assetName: asset?.name || "Unknown Asset",
          totalRevenue,
          totalQueries,
          avgResponseTime,
          revenuePerQuery: totalQueries > 0 ? totalRevenue / totalQueries : 0,
        };
      })
    );

    return {
      queryPatterns,
      hourlyDistribution,
      assetPerformance,
      totalQueries,
    };
  },
});

// Record new usage
export const recordUsage = mutation({
  args: {
    assetId: v.id("dataAssets"),
    userId: v.id("users"),
    queryType: v.string(),
    responseTime: v.number(),
  },
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.assetId);
    if (!asset) throw new Error("Asset not found");

    const today = new Date().toISOString().split('T')[0];
    
    // Find or create today's analytics record
    const existingRecord = await ctx.db
      .query("usageAnalytics")
      .withIndex("by_asset", (q) => q.eq("assetId", args.assetId))
      .filter((q) => q.eq(q.field("date"), today))
      .first();

    if (existingRecord) {
      // Update existing record
      const queries = existingRecord.queries || [];
      queries.push({
        userId: args.userId,
        timestamp: Date.now(),
        queryType: args.queryType,
        responseTime: args.responseTime,
      });

      const uniqueUserIds = new Set(queries.map(q => q.userId));
      
      await ctx.db.patch(existingRecord._id, {
        accessCount: existingRecord.accessCount + 1,
        uniqueUsers: uniqueUserIds.size,
        queries,
        revenue: existingRecord.revenue + (asset.revenuePerK || 10) / 1000, // Revenue per query
      });
    } else {
      // Create new record
      await ctx.db.insert("usageAnalytics", {
        assetId: args.assetId,
        ownerId: asset.ownerId,
        date: today,
        accessCount: 1,
        uniqueUsers: 1,
        queries: [{
          userId: args.userId,
          timestamp: Date.now(),
          queryType: args.queryType,
          responseTime: args.responseTime,
        }],
        revenue: (asset.revenuePerK || 10) / 1000,
        topUseCase: args.queryType,
      });
    }

    return { success: true };
  },
});

// Simulate usage for demo
export const simulateUsage = mutation({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get owner's assets
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    if (assets.length === 0) return { success: false, message: "No assets found" };

    // Get some media buyer users
    const buyers = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "MEDIA_BUYER"))
      .take(5);

    const queryTypes = [
      "Audience Segment",
      "Lookalike Modeling",
      "Attribution Analysis",
      "Predictive Scoring",
      "Custom Query",
      "Real-time Activation",
      "Cross-Device Matching",
      "Behavioral Targeting",
    ];

    // Simulate usage for random asset
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const queryType = queryTypes[Math.floor(Math.random() * queryTypes.length)];

    if (buyer) {
      await ctx.runMutation(api.usageAnalytics.recordUsage, {
        assetId: asset._id,
        userId: buyer._id,
        queryType,
        responseTime: 50 + Math.random() * 450, // 50-500ms
      });
    }

    return { success: true, asset: asset.name, queryType };
  },
});

// Get campaign usage stats
export const getCampaignUsage = query({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all campaigns that have used owner's data
    const analytics = await ctx.db
      .query("usageAnalytics")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Get unique user IDs from queries
    const userIds = new Set<Id<"users">>();
    for (const record of analytics) {
      for (const query of record.queries || []) {
        userIds.add(query.userId);
      }
    }

    // Get user details and their campaigns
    const campaignUsage: Record<string, any> = {};
    
    for (const userId of userIds) {
      const user = await ctx.db.get(userId);
      if (!user) continue;

      // Get campaigns for this user
      const campaigns = await ctx.db
        .query("campaigns")
        .withIndex("by_buyer", (q) => q.eq("buyerId", userId))
        .collect();

      for (const campaign of campaigns) {
        if (!campaignUsage[campaign._id]) {
          campaignUsage[campaign._id] = {
            id: campaign._id,
            name: campaign.name,
            advertiser: user.company || "Unknown",
            queries: 0,
            revenue: 0,
            performance: campaign.roas || 0,
            trend: campaign.currentCAC > campaign.previousCAC ? "down" : "up",
          };
        }

        // Count queries and revenue for this campaign
        for (const record of analytics) {
          const campaignQueries = record.queries?.filter(q => q.userId === userId) || [];
          campaignUsage[campaign._id].queries += campaignQueries.length;
          campaignUsage[campaign._id].revenue += (record.revenue / (record.queries?.length || 1)) * campaignQueries.length;
        }
      }
    }

    return Object.values(campaignUsage).sort((a, b) => b.revenue - a.revenue);
  },
});