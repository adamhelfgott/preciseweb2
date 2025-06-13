import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get all tests for a buyer
export const getTests = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const tests = await ctx.db
      .query("incrementalityTests")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();

    // Get related data for each test
    const testsWithData = await Promise.all(
      tests.map(async (test) => {
        const groups = await ctx.db
          .query("testGroups")
          .withIndex("by_test", (q) => q.eq("testId", test._id))
          .collect();

        const insights = await ctx.db
          .query("testInsights")
          .withIndex("by_test", (q) => q.eq("testId", test._id))
          .collect();

        return {
          ...test,
          groups,
          insights: insights.map((i) => i.insight),
          lift: {
            conversions: test.liftConversions,
            revenue: test.liftRevenue,
            confidence: test.confidence,
          },
        };
      })
    );

    return testsWithData;
  },
});

// Get daily results for a test
export const getDailyResults = query({
  args: {
    testId: v.id("incrementalityTests"),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("dailyTestResults")
      .withIndex("by_test", (q) => q.eq("testId", args.testId))
      .order("asc")
      .collect();

    return results.map((r) => ({
      day: r.day,
      test: r.testValue,
      control: r.controlValue,
      lift: r.lift,
    }));
  },
});

// Create new incrementality test
export const createTest = mutation({
  args: {
    buyerId: v.id("users"),
    name: v.string(),
    campaign: v.string(),
    duration: v.number(),
    testGroupSize: v.number(),
    controlGroupSize: v.number(),
  },
  handler: async (ctx, args) => {
    const testId = await ctx.db.insert("incrementalityTests", {
      buyerId: args.buyerId,
      name: args.name,
      campaign: args.campaign,
      status: "planning",
      startDate: Date.now(),
      duration: args.duration,
      progress: 0,
      liftConversions: 0,
      liftRevenue: 0,
      confidence: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create test and control groups
    await ctx.db.insert("testGroups", {
      testId,
      name: `Test (with ${args.name})`,
      size: args.testGroupSize,
      spend: 0,
      conversions: 0,
      revenue: 0,
      isControl: false,
    });

    await ctx.db.insert("testGroups", {
      testId,
      name: `Control (without ${args.name})`,
      size: args.controlGroupSize,
      spend: 0,
      conversions: 0,
      revenue: 0,
      isControl: true,
    });

    // Add initial insights
    const insights = [
      `Test design: ${Math.round((args.testGroupSize / (args.testGroupSize + args.controlGroupSize)) * 100)}/${Math.round((args.controlGroupSize / (args.testGroupSize + args.controlGroupSize)) * 100)} split`,
      `Expected ${args.duration}-day runtime for statistical significance`,
      "Measuring true incremental impact of campaign",
    ];

    for (const insight of insights) {
      await ctx.db.insert("testInsights", {
        testId,
        insight,
        timestamp: Date.now(),
      });
    }

    return { success: true, testId };
  },
});

// Update test status
export const updateTestStatus = mutation({
  args: {
    testId: v.id("incrementalityTests"),
    status: v.union(v.literal("planning"), v.literal("running"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Simulate incrementality test data
export const simulateIncrementalityData = mutation({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Sample test configurations
    const testConfigs = [
      {
        name: "Nike Precise Data Impact Test",
        campaign: "Nike Summer Fitness 2025",
        status: "running" as const,
        duration: 14,
        progress: 65,
        groups: [
          {
            name: "Test (with Precise)",
            size: 45000,
            spend: 12500,
            conversions: 342,
            revenue: 45280,
            isControl: false,
          },
          {
            name: "Control (without Precise)",
            size: 45000,
            spend: 12500,
            conversions: 198,
            revenue: 26136,
            isControl: true,
          },
        ],
        lift: {
          conversions: 72.7,
          revenue: 73.3,
          confidence: 94.2,
        },
        insights: [
          "Precise data drives 73% incremental revenue",
          "Test group CAC is 45% lower than control",
          "Statistical significance reached at 94% confidence",
        ],
      },
      {
        name: "Creative Messaging A/B Test",
        campaign: "Adidas Morning Warriors",
        status: "completed" as const,
        duration: 21,
        progress: 100,
        groups: [
          {
            name: "Performance Focus",
            size: 30000,
            spend: 8000,
            conversions: 256,
            revenue: 31232,
            isControl: false,
          },
          {
            name: "Lifestyle Focus",
            size: 30000,
            spend: 8000,
            conversions: 189,
            revenue: 23058,
            isControl: true,
          },
        ],
        lift: {
          conversions: 35.4,
          revenue: 35.5,
          confidence: 99.1,
        },
        insights: [
          "Performance messaging outperforms lifestyle by 35%",
          "Higher engagement rates with athletic imagery",
          "Recommend shifting all creatives to performance focus",
        ],
      },
      {
        name: "Geo Holdout Test - West Coast",
        campaign: "Under Armour Premium",
        status: "planning" as const,
        duration: 28,
        progress: 0,
        groups: [
          {
            name: "Test Markets",
            size: 120000,
            spend: 0,
            conversions: 0,
            revenue: 0,
            isControl: false,
          },
          {
            name: "Holdout Markets",
            size: 40000,
            spend: 0,
            conversions: 0,
            revenue: 0,
            isControl: true,
          },
        ],
        lift: {
          conversions: 0,
          revenue: 0,
          confidence: 0,
        },
        insights: [
          "Test design: 75/25 split across West Coast DMAs",
          "Expected 4-week runtime for statistical significance",
          "Measuring true incremental impact of campaign",
        ],
      },
    ];

    for (const config of testConfigs) {
      // Check if test already exists
      const existingTest = await ctx.db
        .query("incrementalityTests")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => q.eq(q.field("name"), config.name))
        .first();

      let testId: Id<"incrementalityTests">;

      if (existingTest) {
        // Update existing test
        await ctx.db.patch(existingTest._id, {
          status: config.status,
          progress: config.progress,
          liftConversions: config.lift.conversions,
          liftRevenue: config.lift.revenue,
          confidence: config.lift.confidence,
          updatedAt: Date.now(),
        });
        testId = existingTest._id;
      } else {
        // Create new test
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - Math.floor(config.duration * (config.progress / 100)));

        testId = await ctx.db.insert("incrementalityTests", {
          buyerId: args.buyerId,
          name: config.name,
          campaign: config.campaign,
          status: config.status,
          startDate: startDate.getTime(),
          duration: config.duration,
          progress: config.progress,
          liftConversions: config.lift.conversions,
          liftRevenue: config.lift.revenue,
          confidence: config.lift.confidence,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      // Update or create groups
      for (const group of config.groups) {
        const existingGroup = await ctx.db
          .query("testGroups")
          .withIndex("by_test", (q) => q.eq("testId", testId))
          .filter((q) => q.eq(q.field("name"), group.name))
          .first();

        if (existingGroup) {
          await ctx.db.patch(existingGroup._id, group);
        } else {
          await ctx.db.insert("testGroups", {
            testId,
            ...group,
          });
        }
      }

      // Update or create insights
      const existingInsights = await ctx.db
        .query("testInsights")
        .withIndex("by_test", (q) => q.eq("testId", testId))
        .collect();

      // Delete old insights
      for (const insight of existingInsights) {
        await ctx.db.delete(insight._id);
      }

      // Add new insights
      for (const insight of config.insights) {
        await ctx.db.insert("testInsights", {
          testId,
          insight,
          timestamp: Date.now(),
        });
      }

      // Generate daily results for running and completed tests
      if (config.status !== "planning") {
        const daysToGenerate = Math.floor(config.duration * (config.progress / 100));
        
        for (let day = 1; day <= daysToGenerate; day++) {
          const existingResult = await ctx.db
            .query("dailyTestResults")
            .withIndex("by_test", (q) => q.eq("testId", testId))
            .filter((q) => q.eq(q.field("day"), day))
            .first();

          const testValue = 20 + Math.random() * 15 + day * 2;
          const controlValue = 15 + Math.random() * 10;
          const lift = ((testValue / controlValue) - 1) * 100;

          if (existingResult) {
            await ctx.db.patch(existingResult._id, {
              testValue,
              controlValue,
              lift,
              timestamp: Date.now(),
            });
          } else {
            await ctx.db.insert("dailyTestResults", {
              testId,
              day,
              testValue,
              controlValue,
              lift,
              timestamp: Date.now(),
            });
          }
        }
      }
    }

    return { success: true };
  },
});