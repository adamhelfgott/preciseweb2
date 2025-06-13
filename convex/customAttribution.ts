import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get attribution models for a buyer
export const getModels = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const models = await ctx.db
      .query("attributionModels")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();

    // Get windows for each model
    const modelsWithWindows = await Promise.all(
      models.map(async (model) => {
        const windows = await ctx.db
          .query("attributionWindows")
          .withIndex("by_model", (q) => q.eq("modelId", model._id))
          .collect();

        const performance = await ctx.db
          .query("attributionPerformance")
          .withIndex("by_model", (q) => q.eq("modelId", model._id))
          .order("desc")
          .first();

        return {
          ...model,
          windows,
          performance: performance || {
            roas: 0,
            conversions: 0,
            revenue: 0,
          },
        };
      })
    );

    return modelsWithWindows;
  },
});

// Get conversion timing data
export const getConversionTiming = query({
  args: {
    buyerId: v.id("users"),
    channel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("conversionTiming")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId));

    if (args.channel) {
      query = query.filter((q) => q.eq(q.field("channel"), args.channel));
    }

    const timingData = await query.collect();

    // Group by day and aggregate
    const groupedData = timingData.reduce((acc, item) => {
      const existing = acc.find((d) => d.day === item.day);
      if (existing) {
        existing.conversions += item.conversions;
        existing.revenue += item.revenue;
      } else {
        acc.push({
          day: item.day,
          conversions: item.conversions,
          revenue: item.revenue,
        });
      }
      return acc;
    }, [] as { day: number; conversions: number; revenue: number }[]);

    return groupedData.sort((a, b) => a.day - b.day);
  },
});

// Create or update attribution model
export const saveModel = mutation({
  args: {
    buyerId: v.id("users"),
    name: v.string(),
    description: v.string(),
    isCustom: v.boolean(),
    windows: v.array(
      v.object({
        name: v.string(),
        duration: v.float64(),
        type: v.union(v.literal("click"), v.literal("view"), v.literal("engagement")),
        weight: v.number(),
        isActive: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check if model exists
    const existingModel = await ctx.db
      .query("attributionModels")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    let modelId: Id<"attributionModels">;

    if (existingModel) {
      // Update existing model
      await ctx.db.patch(existingModel._id, {
        description: args.description,
        isCustom: args.isCustom,
        isActive: true,
        updatedAt: Date.now(),
      });
      modelId = existingModel._id;

      // Delete existing windows
      const existingWindows = await ctx.db
        .query("attributionWindows")
        .withIndex("by_model", (q) => q.eq("modelId", modelId))
        .collect();

      for (const window of existingWindows) {
        await ctx.db.delete(window._id);
      }
    } else {
      // Create new model
      modelId = await ctx.db.insert("attributionModels", {
        buyerId: args.buyerId,
        name: args.name,
        description: args.description,
        isCustom: args.isCustom,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // Insert new windows
    for (const window of args.windows) {
      await ctx.db.insert("attributionWindows", {
        modelId,
        name: window.name,
        duration: window.duration,
        type: window.type,
        weight: window.weight,
        isActive: window.isActive,
      });
    }

    // Simulate some performance data for the new model
    await ctx.db.insert("attributionPerformance", {
      modelId,
      roas: 3.5 + Math.random() * 2,
      conversions: Math.floor(800 + Math.random() * 800),
      revenue: Math.floor(80000 + Math.random() * 80000),
      timestamp: Date.now(),
    });

    return { success: true, modelId };
  },
});

// Simulate conversion timing data
export const simulateConversionTiming = mutation({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const days = [0, 1, 2, 3, 7, 14, 28, 60];
    const channels = ["click", "view", "engagement"];

    for (const day of days) {
      for (const channel of channels) {
        // Check if data already exists
        const existing = await ctx.db
          .query("conversionTiming")
          .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
          .filter((q) => 
            q.and(
              q.eq(q.field("day"), day),
              q.eq(q.field("channel"), channel)
            )
          )
          .first();

        if (!existing) {
          // Generate decreasing conversions over time
          const baseConversions = 200 - (day * 2.5);
          const conversions = Math.max(5, Math.floor(baseConversions * Math.random()));
          const revenue = conversions * (100 + Math.random() * 50);

          await ctx.db.insert("conversionTiming", {
            buyerId: args.buyerId,
            day,
            conversions,
            revenue,
            channel,
            timestamp: Date.now(),
          });
        }
      }
    }

    // Also simulate some preset models if they don't exist
    const presetModels = [
      {
        name: "Industry Standard",
        description: "28-day click, 1-day view",
        windows: [
          { name: "Click", duration: 28, type: "click" as const, weight: 80, isActive: true },
          { name: "View", duration: 1, type: "view" as const, weight: 20, isActive: true },
        ],
      },
      {
        name: "Aggressive Attribution",
        description: "Longer windows for brand campaigns",
        windows: [
          { name: "Click", duration: 60, type: "click" as const, weight: 60, isActive: true },
          { name: "View", duration: 7, type: "view" as const, weight: 25, isActive: true },
          { name: "Engagement", duration: 14, type: "engagement" as const, weight: 15, isActive: true },
        ],
      },
      {
        name: "Conservative Model",
        description: "Strict attribution for performance marketing",
        windows: [
          { name: "Click", duration: 7, type: "click" as const, weight: 90, isActive: true },
          { name: "View", duration: 0.5, type: "view" as const, weight: 10, isActive: true },
        ],
      },
    ];

    for (const preset of presetModels) {
      const existing = await ctx.db
        .query("attributionModels")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => q.eq(q.field("name"), preset.name))
        .first();

      if (!existing) {
        // Create the model directly instead of calling saveModel
        const modelId = await ctx.db.insert("attributionModels", {
          buyerId: args.buyerId,
          name: preset.name,
          description: preset.description,
          isCustom: false,
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        // Insert windows for this model
        for (const window of preset.windows) {
          await ctx.db.insert("attributionWindows", {
            modelId,
            name: window.name,
            duration: window.duration,
            type: window.type,
            weight: window.weight,
            isActive: window.isActive,
          });
        }

        // Add initial performance data
        await ctx.db.insert("attributionPerformance", {
          modelId,
          roas: 3.5 + Math.random() * 2,
          conversions: Math.floor(800 + Math.random() * 800),
          revenue: Math.floor(80000 + Math.random() * 80000),
          timestamp: Date.now(),
        });
      }
    }

    return { success: true };
  },
});

