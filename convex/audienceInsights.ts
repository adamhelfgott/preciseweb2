import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get audience segments for a campaign
export const getAudienceSegments = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("audienceInsightSegments")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .order("desc")
      .take(20);
  },
});

// Get audience performance timeline
export const getAudiencePerformanceTimeline = query({
  args: { 
    campaignId: v.id("campaigns"),
    segmentName: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (args.segmentName) {
      return await ctx.db
        .query("audiencePerformanceTimeline")
        .withIndex("by_campaign_segment", (q) => 
          q.eq("campaignId", args.campaignId).eq("segmentName", args.segmentName!)
        )
        .order("desc")
        .take(30);
    } else {
      return await ctx.db
        .query("audiencePerformanceTimeline")
        .withIndex("by_campaign_segment", (q) => 
          q.eq("campaignId", args.campaignId)
        )
        .order("desc")
        .take(30);
    }
  },
});

// Get audience overlap data
export const getAudienceOverlapData = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("audienceOverlapData")
      .withIndex("by_campaign", (q) => q.eq("campaignId", args.campaignId))
      .order("desc")
      .take(10);
  },
});

// Create audience segment
export const createAudienceSegment = mutation({
  args: {
    campaignId: v.id("campaigns"),
    name: v.string(),
    size: v.number(),
    ctr: v.float64(),
    cvr: v.float64(),
    cpc: v.float64(),
    roas: v.float64(),
    demographics: v.object({
      age: v.string(),
      gender: v.string(),
      income: v.string(),
      interests: v.array(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("audienceInsightSegments", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Create performance timeline entry
export const createPerformanceTimelineEntry = mutation({
  args: {
    campaignId: v.id("campaigns"),
    segmentName: v.string(),
    date: v.string(),
    impressions: v.number(),
    conversions: v.number(),
    spend: v.float64(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("audiencePerformanceTimeline", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Create audience overlap data
export const createAudienceOverlap = mutation({
  args: {
    campaignId: v.id("campaigns"),
    segment1: v.string(),
    segment2: v.string(),
    overlap: v.float64(),
    wastedSpend: v.float64(),
    recommendation: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("audienceOverlapData", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Batch create audience segments (for simulation)
export const batchCreateAudienceSegments = mutation({
  args: {
    campaignId: v.id("campaigns"),
    segments: v.array(v.object({
      name: v.string(),
      size: v.number(),
      ctr: v.float64(),
      cvr: v.float64(),
      cpc: v.float64(),
      roas: v.float64(),
      demographics: v.object({
        age: v.string(),
        gender: v.string(),
        income: v.string(),
        interests: v.array(v.string()),
      }),
    })),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const segment of args.segments) {
      const id = await ctx.db.insert("audienceInsightSegments", {
        campaignId: args.campaignId,
        ...segment,
        timestamp: Date.now(),
      });
      results.push(id);
    }
    return results;
  },
});