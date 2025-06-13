import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get active test for a buyer
export const getActiveTest = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const test = await ctx.db
      .query("crossChannelTests")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.neq(q.field("status"), "completed"))
      .order("desc")
      .first();

    return test;
  },
});

// Get test regions
export const getTestRegions = query({
  args: {
    testId: v.id("crossChannelTests"),
  },
  handler: async (ctx, args) => {
    const regions = await ctx.db
      .query("testRegions")
      .withIndex("by_test", (q) => q.eq("testId", args.testId))
      .collect();

    return regions;
  },
});

// Get channel performance data
export const getChannelPerformance = query({
  args: {
    testId: v.id("crossChannelTests"),
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - (args.days || 28));
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    const performance = await ctx.db
      .query("channelPerformance")
      .withIndex("by_test_date", (q) => q.eq("testId", args.testId))
      .filter((q) => q.gte(q.field("date"), cutoffDateStr))
      .collect();

    return performance;
  },
});

// Get ACR matching data
export const getACRMatching = query({
  args: {
    testId: v.id("crossChannelTests"),
  },
  handler: async (ctx, args) => {
    const matching = await ctx.db
      .query("acrMatching")
      .withIndex("by_test", (q) => q.eq("testId", args.testId))
      .collect();

    return matching;
  },
});

// Create or update incrementality test
export const createOrUpdateTest = mutation({
  args: {
    buyerId: v.id("users"),
    testName: v.string(),
    status: v.union(v.literal("running"), v.literal("paused"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    // Check if test already exists
    const existingTest = await ctx.db
      .query("crossChannelTests")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("testName"), args.testName))
      .first();

    if (existingTest) {
      // Update existing test
      await ctx.db.patch(existingTest._id, {
        status: args.status,
        daysRunning: Math.floor((Date.now() - existingTest.startDate) / (1000 * 60 * 60 * 24)),
        confidence: Math.min(99, 90 + Math.random() * 9),
        timestamp: Date.now(),
      });
      return existingTest._id;
    } else {
      // Create new test
      const testId = await ctx.db.insert("crossChannelTests", {
        buyerId: args.buyerId,
        testName: args.testName,
        status: args.status,
        startDate: Date.now(),
        daysRunning: 0,
        confidence: 0,
        timestamp: Date.now(),
      });
      return testId;
    }
  },
});

// Simulate incrementality test data
export const simulateIncrementalityTest = mutation({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args): Promise<{ success: boolean; testId: Id<"crossChannelTests"> }> => {
    // Check if test already exists
    const existingTest = await ctx.db
      .query("crossChannelTests")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("testName"), "Cross-Channel Incrementality Test"))
      .first();

    let testId: Id<"crossChannelTests">;
    if (existingTest) {
      // Update existing test
      await ctx.db.patch(existingTest._id, {
        status: "running",
        daysRunning: Math.floor((Date.now() - existingTest.startDate) / (1000 * 60 * 60 * 24)),
        confidence: Math.min(99, 90 + Math.random() * 9),
        timestamp: Date.now(),
      });
      testId = existingTest._id;
    } else {
      // Create new test
      testId = await ctx.db.insert("crossChannelTests", {
        buyerId: args.buyerId,
        testName: "Cross-Channel Incrementality Test",
        status: "running",
        startDate: Date.now(),
        daysRunning: 0,
        confidence: 0,
        timestamp: Date.now(),
      });
    }

    // Define test regions
    const testRegions = [
      {
        regionId: "nyc",
        regionName: "New York DMA",
        coordinates: [-74.006, 40.7128],
        testType: "Linear + CTV",
        isControl: false,
        tvReach: 2340000 + Math.floor(Math.random() * 100000),
        ctvReach: 890000 + Math.floor(Math.random() * 50000),
        linearOnly: 450000 + Math.floor(Math.random() * 20000),
        overlap: 340000 + Math.floor(Math.random() * 20000),
        lift: 34 + Math.random() * 5,
        confidence: 96 + Math.random() * 3,
      },
      {
        regionId: "chicago",
        regionName: "Chicago DMA",
        coordinates: [-87.6298, 41.8781],
        testType: "Linear Only",
        isControl: true,
        tvReach: 1560000 + Math.floor(Math.random() * 80000),
        ctvReach: 0,
        linearOnly: 1560000 + Math.floor(Math.random() * 80000),
        overlap: 0,
        lift: 0,
        confidence: 0,
      },
      {
        regionId: "la",
        regionName: "Los Angeles DMA",
        coordinates: [-118.2437, 34.0522],
        testType: "CTV Only",
        isControl: false,
        tvReach: 0,
        ctvReach: 1120000 + Math.floor(Math.random() * 60000),
        linearOnly: 0,
        overlap: 0,
        lift: 18 + Math.random() * 3,
        confidence: 92 + Math.random() * 4,
      },
      {
        regionId: "philly",
        regionName: "Philadelphia DMA",
        coordinates: [-75.1652, 39.9526],
        testType: "Linear + CTV",
        isControl: false,
        tvReach: 980000 + Math.floor(Math.random() * 50000),
        ctvReach: 420000 + Math.floor(Math.random() * 30000),
        linearOnly: 320000 + Math.floor(Math.random() * 20000),
        overlap: 240000 + Math.floor(Math.random() * 15000),
        lift: 28 + Math.random() * 4,
        confidence: 94 + Math.random() * 3,
      },
      {
        regionId: "dc",
        regionName: "Washington DC DMA",
        coordinates: [-77.0369, 38.9072],
        testType: "Control (No Media)",
        isControl: true,
        tvReach: 0,
        ctvReach: 0,
        linearOnly: 0,
        overlap: 0,
        lift: 0,
        confidence: 0,
      },
    ];

    // Insert or update test regions
    for (const region of testRegions) {
      const existingRegion = await ctx.db
        .query("testRegions")
        .withIndex("by_test", (q) => q.eq("testId", testId))
        .filter((q) => q.eq(q.field("regionId"), region.regionId))
        .first();

      if (existingRegion) {
        await ctx.db.patch(existingRegion._id, {
          ...region,
          testId,
        });
      } else {
        await ctx.db.insert("testRegions", {
          ...region,
          testId,
        });
      }
    }

    // Generate time series performance data
    const channels = ["linear", "ctv", "combined", "control"];
    const today = new Date();
    
    for (let i = 0; i < 28; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (27 - i));
      const dateStr = date.toISOString().split('T')[0];

      for (const channel of channels) {
        const existingPerf = await ctx.db
          .query("channelPerformance")
          .withIndex("by_test_date", (q) => q.eq("testId", testId))
          .filter((q) => 
            q.and(
              q.eq(q.field("date"), dateStr),
              q.eq(q.field("channel"), channel)
            )
          )
          .first();

        const baseIndex = 100;
        let index = baseIndex;
        let incrementalLift = 0;

        if (channel === "linear") {
          index = baseIndex + Math.random() * 20 + (i * 0.8);
          incrementalLift = 22 + Math.random() * 4;
        } else if (channel === "ctv") {
          index = baseIndex + Math.random() * 15 + (i * 0.6);
          incrementalLift = 18 + Math.random() * 3;
        } else if (channel === "combined") {
          index = baseIndex + Math.random() * 25 + (i * 1.5);
          incrementalLift = 42 + Math.random() * 6;
        } else {
          index = baseIndex + Math.random() * 5;
          incrementalLift = 0;
        }

        if (existingPerf) {
          await ctx.db.patch(existingPerf._id, {
            index,
            reach: Math.floor(1000000 + Math.random() * 500000),
            conversions: Math.floor(1000 + Math.random() * 500),
            incrementalLift,
          });
        } else {
          await ctx.db.insert("channelPerformance", {
            testId,
            date: dateStr,
            channel,
            index,
            reach: Math.floor(1000000 + Math.random() * 500000),
            conversions: Math.floor(1000 + Math.random() * 500),
            incrementalLift,
          });
        }
      }
    }

    // Generate ACR matching data
    const segments = [
      { segment: "Sports Viewers", linearReach: 78, ctvMatch: 62, incremental: 34 },
      { segment: "News Watchers", linearReach: 85, ctvMatch: 45, incremental: 42 },
      { segment: "Prime Time", linearReach: 92, ctvMatch: 71, incremental: 38 },
      { segment: "Late Night", linearReach: 45, ctvMatch: 82, incremental: 55 },
    ];

    for (const segment of segments) {
      const existingSegment = await ctx.db
        .query("acrMatching")
        .withIndex("by_test", (q) => q.eq("testId", testId))
        .filter((q) => q.eq(q.field("segment"), segment.segment))
        .first();

      const data = {
        ...segment,
        linearReach: segment.linearReach + Math.random() * 5 - 2.5,
        ctvMatch: segment.ctvMatch + Math.random() * 5 - 2.5,
        incremental: segment.incremental + Math.random() * 3 - 1.5,
        timestamp: Date.now(),
      };

      if (existingSegment) {
        await ctx.db.patch(existingSegment._id, data);
      } else {
        await ctx.db.insert("acrMatching", {
          testId,
          ...data,
        });
      }
    }

    return { success: true, testId };
  },
});