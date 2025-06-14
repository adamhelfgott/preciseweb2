import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Get earnings for a data controller
export const getEarnings = query({
  args: { 
    ownerId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    const earnings = await ctx.db
      .query("earnings")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .order("asc")
      .take(limit);
    
    // Fetch asset names for each earning
    const earningsWithAssets = await Promise.all(
      earnings.map(async (earning) => {
        const asset = await ctx.db.get(earning.assetId);
        return {
          ...earning,
          asset: asset?.name || "Unknown Asset",
        };
      })
    );
    
    return earningsWithAssets;
  },
});

// Get total earnings stats
export const getEarningsStats = query({
  args: { ownerId: v.id("users") },
  handler: async (ctx, args) => {
    const earnings = await ctx.db
      .query("earnings")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    const todayEarnings = earnings
      .filter(e => e.timestamp >= todayTimestamp)
      .reduce((sum, e) => sum + e.amount, 0);
    
    const totalEarnings = earnings
      .filter(e => e.status === "distributed")
      .reduce((sum, e) => sum + e.amount, 0);
    
    const pendingEarnings = earnings
      .filter(e => e.status === "pending")
      .reduce((sum, e) => sum + e.amount, 0);
    
    return {
      today: todayEarnings,
      total: totalEarnings,
      pending: pendingEarnings,
      count: earnings.length,
    };
  },
});

// Create a new earning (for simulation)
export const createEarning = internalMutation({
  args: {
    ownerId: v.id("users"),
    assetId: v.id("dataAssets"),
    amount: v.number(),
    campaign: v.string(),
    impressions: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("earnings", {
      ownerId: args.ownerId,
      assetId: args.assetId,
      amount: args.amount,
      campaign: args.campaign,
      impressions: args.impressions,
      timestamp: Date.now(),
      status: "pending",
    });
  },
});

// Simulate earnings for demo
export const simulateEarning = mutation({
  args: { ownerId: v.id("users") },
  handler: async (ctx, args) => {
    // Get user's data assets
    const assets = await ctx.db
      .query("dataAssets")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
    
    if (assets.length === 0) return null;
    
    // Pick a random asset
    const asset = assets[Math.floor(Math.random() * assets.length)];
    
    // Generate random earning
    const brands = ["Nike", "Adidas", "Under Armour", "Peloton", "Apple Fitness"];
    const campaigns = ["Summer Fitness", "Morning Warriors", "Premium Athletes"];
    
    const amount = Math.random() * 0.13 + 0.02; // $0.02 - $0.15
    const impressions = Math.floor(Math.random() * 1000 + 100);
    const campaign = `${brands[Math.floor(Math.random() * brands.length)]} ${campaigns[Math.floor(Math.random() * campaigns.length)]}`;
    
    return await ctx.db.insert("earnings", {
      ownerId: args.ownerId,
      assetId: asset._id,
      amount: Number(amount.toFixed(2)),
      campaign,
      impressions,
      timestamp: Date.now(),
      status: "pending",
    });
  },
});

// Update earning status to distributed
export const distributeEarnings = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Get all pending earnings older than 1 hour
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    const pendingEarnings = await ctx.db
      .query("earnings")
      .withIndex("by_timestamp")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "pending"),
          q.lt(q.field("timestamp"), oneHourAgo)
        )
      )
      .collect();
    
    // Update each to distributed
    for (const earning of pendingEarnings) {
      await ctx.db.patch(earning._id, { status: "distributed" });
    }
    
    return pendingEarnings.length;
  },
});

// Update earnings dates for specific campaigns
export const updateEarningsDates = mutation({
  args: {
    ownerId: v.id("users"),
    campaignName: v.string(),
    newDate: v.string(), // Date string like "2025-06-12"
  },
  handler: async (ctx, args) => {
    // Get all earnings for this owner with the specified campaign name
    const earnings = await ctx.db
      .query("earnings")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .filter((q) => q.eq(q.field("campaign"), args.campaignName))
      .collect();
    
    // Convert date string to timestamp
    const newTimestamp = new Date(args.newDate).getTime();
    
    // Update each earning's timestamp
    for (const earning of earnings) {
      await ctx.db.patch(earning._id, { timestamp: newTimestamp });
    }
    
    return earnings.length;
  },
});