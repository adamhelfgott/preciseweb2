import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get audience segments
export const getSegments = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const segments = await ctx.db
      .query("audienceSegments")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();

    return segments;
  },
});

// Get overlap analysis
export const getOverlapAnalysis = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const overlaps = await ctx.db
      .query("audienceOverlap")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();

    return overlaps;
  },
});

// Get recommendations
export const getRecommendations = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const recommendations = await ctx.db
      .query("overlapRecommendations")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("status"), "new"))
      .order("desc")
      .collect();

    return recommendations;
  },
});

// Update recommendation status
export const updateRecommendationStatus = mutation({
  args: {
    recommendationId: v.id("overlapRecommendations"),
    status: v.union(v.literal("applied"), v.literal("dismissed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.recommendationId, {
      status: args.status,
    });

    return { success: true };
  },
});

// Simulate audience overlap data
export const simulateAudienceData = mutation({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Define audience segments
    const segments = [
      {
        name: "Fitness Enthusiasts",
        size: 2500000,
        cpm: 8.50,
        performance: {
          ctr: 2.8,
          cvr: 3.2,
          roas: 4.5,
        },
        providers: ["Nike+", "Strava", "MyFitnessPal"],
      },
      {
        name: "Luxury Shoppers",
        size: 1200000,
        cpm: 12.75,
        performance: {
          ctr: 1.9,
          cvr: 2.1,
          roas: 6.2,
        },
        providers: ["American Express", "Saks", "Net-a-Porter"],
      },
      {
        name: "Tech Early Adopters",
        size: 3200000,
        cpm: 10.25,
        performance: {
          ctr: 3.5,
          cvr: 2.8,
          roas: 5.1,
        },
        providers: ["Product Hunt", "TechCrunch", "The Verge"],
      },
      {
        name: "Outdoor Adventurers",
        size: 1800000,
        cpm: 7.50,
        performance: {
          ctr: 3.2,
          cvr: 3.5,
          roas: 4.8,
        },
        providers: ["REI Co-op", "Outside Magazine", "AllTrails"],
      },
      {
        name: "Premium Fitness",
        size: 800000,
        cpm: 15.00,
        performance: {
          ctr: 2.5,
          cvr: 4.2,
          roas: 5.5,
        },
        providers: ["Equinox", "Peloton", "Barry's Bootcamp"],
      },
    ];

    // Insert or update segments
    for (const segment of segments) {
      const existing = await ctx.db
        .query("audienceSegments")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => q.eq(q.field("name"), segment.name))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          ...segment,
          size: segment.size + Math.floor(Math.random() * 100000 - 50000),
          performance: {
            ctr: segment.performance.ctr + (Math.random() * 0.2 - 0.1),
            cvr: segment.performance.cvr + (Math.random() * 0.2 - 0.1),
            roas: segment.performance.roas + (Math.random() * 0.3 - 0.15),
          },
        });
      } else {
        await ctx.db.insert("audienceSegments", {
          buyerId: args.buyerId,
          ...segment,
          createdAt: Date.now(),
        });
      }
    }

    // Define overlaps
    const overlaps = [
      {
        audienceA: "Fitness Enthusiasts",
        audienceB: "Premium Fitness",
        overlapPercentage: 72,
        uniqueA: 28,
        uniqueB: 8,
        totalReach: 2576000,
        costSaving: 9600,
      },
      {
        audienceA: "Fitness Enthusiasts",
        audienceB: "Outdoor Adventurers",
        overlapPercentage: 45,
        uniqueA: 55,
        uniqueB: 35,
        totalReach: 3175000,
        costSaving: 6750,
      },
      {
        audienceA: "Luxury Shoppers",
        audienceB: "Tech Early Adopters",
        overlapPercentage: 28,
        uniqueA: 72,
        uniqueB: 82,
        totalReach: 3936000,
        costSaving: 8960,
      },
      {
        audienceA: "Tech Early Adopters",
        audienceB: "Outdoor Adventurers",
        overlapPercentage: 18,
        uniqueA: 82,
        uniqueB: 78,
        totalReach: 4676000,
        costSaving: 3240,
      },
    ];

    // Insert or update overlaps
    for (const overlap of overlaps) {
      const existing = await ctx.db
        .query("audienceOverlap")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => 
          q.and(
            q.eq(q.field("audienceA"), overlap.audienceA),
            q.eq(q.field("audienceB"), overlap.audienceB)
          )
        )
        .first();

      const data = {
        ...overlap,
        overlapPercentage: overlap.overlapPercentage + (Math.random() * 5 - 2.5),
        costSaving: overlap.costSaving + (Math.random() * 1000 - 500),
        timestamp: Date.now(),
      };

      if (existing) {
        await ctx.db.patch(existing._id, data);
      } else {
        await ctx.db.insert("audienceOverlap", {
          buyerId: args.buyerId,
          ...data,
        });
      }
    }

    // Generate recommendations
    const recommendations = [
      {
        recommendation: "Merge 'Premium Fitness' into 'Fitness Enthusiasts' campaign",
        impact: "72% overlap detected - eliminate redundant targeting",
        savings: 9600,
        priority: "high" as const,
      },
      {
        recommendation: "Create exclusion list for 'Outdoor Adventurers' when targeting 'Fitness Enthusiasts'",
        impact: "45% overlap - improve reach efficiency",
        savings: 6750,
        priority: "medium" as const,
      },
      {
        recommendation: "Test combined 'Luxury Tech' audience segment",
        impact: "28% overlap with complementary performance metrics",
        savings: 8960,
        priority: "low" as const,
      },
    ];

    // Insert new recommendations
    for (const rec of recommendations) {
      const existing = await ctx.db
        .query("overlapRecommendations")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => q.eq(q.field("recommendation"), rec.recommendation))
        .first();

      if (!existing) {
        await ctx.db.insert("overlapRecommendations", {
          buyerId: args.buyerId,
          ...rec,
          status: "new",
          timestamp: Date.now(),
        });
      }
    }

    return { success: true };
  },
});