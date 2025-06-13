import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get budget allocations
export const getAllocations = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const allocations = await ctx.db
      .query("budgetAllocations")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();

    return allocations;
  },
});

// Get budget scenarios
export const getScenarios = query({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const scenarios = await ctx.db
      .query("budgetScenarios")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.neq(q.field("status"), "archived"))
      .collect();

    return scenarios;
  },
});

// Get performance predictions for a campaign
export const getPredictions = query({
  args: {
    buyerId: v.id("users"),
    campaignId: v.string(),
  },
  handler: async (ctx, args) => {
    const predictions = await ctx.db
      .query("performancePredictions")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .filter((q) => q.eq(q.field("campaignId"), args.campaignId))
      .collect();

    return predictions.sort((a, b) => a.budgetLevel - b.budgetLevel);
  },
});

// Save budget scenario
export const saveScenario = mutation({
  args: {
    buyerId: v.id("users"),
    name: v.string(),
    description: v.string(),
    allocations: v.array(v.object({
      campaignId: v.string(),
      campaignName: v.string(),
      budget: v.float64(),
      percentage: v.float64(),
    })),
  },
  handler: async (ctx, args) => {
    const totalBudget = args.allocations.reduce((sum, a) => sum + a.budget, 0);
    
    // Calculate projected metrics (simplified)
    const projectedRevenue = totalBudget * 4.5; // Assuming average 4.5x ROAS
    const projectedROAS = projectedRevenue / totalBudget;

    const scenarioId = await ctx.db.insert("budgetScenarios", {
      buyerId: args.buyerId,
      name: args.name,
      description: args.description,
      totalBudget,
      projectedRevenue,
      projectedROAS,
      allocations: args.allocations,
      status: "draft",
      createdAt: Date.now(),
    });

    return { success: true, scenarioId };
  },
});

// Apply budget scenario
export const applyScenario = mutation({
  args: {
    scenarioId: v.id("budgetScenarios"),
  },
  handler: async (ctx, args) => {
    // Update scenario status
    await ctx.db.patch(args.scenarioId, {
      status: "active",
    });

    // In a real system, this would update actual campaign budgets
    return { success: true };
  },
});

// Simulate budget optimization data
export const simulateBudgetData = mutation({
  args: {
    buyerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Campaign budget allocations
    const campaigns = [
      {
        campaignId: "nike-summer-2025",
        campaignName: "Nike Summer Fitness 2025",
        currentBudget: 50000,
        currentROAS: 3.2,
        performance: "underperforming",
      },
      {
        campaignId: "adidas-morning",
        campaignName: "Adidas Morning Warriors",
        currentBudget: 35000,
        currentROAS: 5.8,
        performance: "scaling",
      },
      {
        campaignId: "under-armour-premium",
        campaignName: "Under Armour Premium",
        currentBudget: 25000,
        currentROAS: 4.1,
        performance: "stable",
      },
      {
        campaignId: "puma-urban",
        campaignName: "Puma Urban Athletes",
        currentBudget: 40000,
        currentROAS: 2.4,
        performance: "declining",
      },
      {
        campaignId: "reebok-crossfit",
        campaignName: "Reebok CrossFit Challenge",
        currentBudget: 30000,
        currentROAS: 6.2,
        performance: "scaling",
      },
    ];

    // Generate allocations
    for (const campaign of campaigns) {
      let recommendedBudget = campaign.currentBudget;
      let projectedROAS = campaign.currentROAS;
      let reason = "";
      let confidence = 85;

      if (campaign.performance === "scaling") {
        recommendedBudget = campaign.currentBudget * 1.5;
        projectedROAS = campaign.currentROAS * 0.9; // Slight decrease due to scale
        reason = "High performance with room to scale. Marginal efficiency maintained.";
        confidence = 92;
      } else if (campaign.performance === "underperforming") {
        recommendedBudget = campaign.currentBudget * 0.7;
        projectedROAS = campaign.currentROAS * 1.2; // Improvement from optimization
        reason = "Reduce budget to optimize efficiency. Focus on best-performing segments.";
        confidence = 78;
      } else if (campaign.performance === "declining") {
        recommendedBudget = campaign.currentBudget * 0.5;
        projectedROAS = campaign.currentROAS * 1.1;
        reason = "Significant reduction recommended. Creative fatigue detected.";
        confidence = 82;
      } else {
        recommendedBudget = campaign.currentBudget * 1.1;
        projectedROAS = campaign.currentROAS;
        reason = "Maintain current performance with slight increase for testing.";
        confidence = 88;
      }

      const existing = await ctx.db
        .query("budgetAllocations")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => q.eq(q.field("campaignId"), campaign.campaignId))
        .first();

      const data = {
        campaignId: campaign.campaignId,
        campaignName: campaign.campaignName,
        currentBudget: campaign.currentBudget,
        recommendedBudget,
        currentROAS: campaign.currentROAS,
        projectedROAS,
        reason,
        confidence,
        timestamp: Date.now(),
      };

      if (existing) {
        await ctx.db.patch(existing._id, data);
      } else {
        await ctx.db.insert("budgetAllocations", {
          buyerId: args.buyerId,
          ...data,
        });
      }

      // Generate performance predictions
      const budgetLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];
      for (const multiplier of budgetLevels) {
        const budgetLevel = campaign.currentBudget * multiplier;
        
        // Simulate diminishing returns
        const efficiencyFactor = Math.pow(0.95, multiplier - 1);
        const baseConversions = (campaign.currentBudget / 100) * (campaign.currentROAS / 4);
        
        const predictedConversions = Math.floor(baseConversions * multiplier * efficiencyFactor);
        const predictedRevenue = predictedConversions * 120; // Avg order value
        const predictedROAS = budgetLevel > 0 ? predictedRevenue / budgetLevel : 0;
        const predictedClicks = predictedConversions * 50; // Assume 2% CVR

        const existingPred = await ctx.db
          .query("performancePredictions")
          .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
          .filter((q) => 
            q.and(
              q.eq(q.field("campaignId"), campaign.campaignId),
              q.eq(q.field("budgetLevel"), budgetLevel)
            )
          )
          .first();

        const predData = {
          campaignId: campaign.campaignId,
          budgetLevel,
          predictedClicks,
          predictedConversions,
          predictedRevenue,
          predictedROAS,
          confidence: 85 + Math.random() * 10,
          timestamp: Date.now(),
        };

        if (existingPred) {
          await ctx.db.patch(existingPred._id, predData);
        } else {
          await ctx.db.insert("performancePredictions", {
            buyerId: args.buyerId,
            ...predData,
          });
        }
      }
    }

    // Create sample scenarios
    const scenarios = [
      {
        name: "Aggressive Growth",
        description: "Maximize revenue by scaling top performers",
        allocations: [
          { campaignId: "adidas-morning", campaignName: "Adidas Morning Warriors", budget: 52500, percentage: 29.2 },
          { campaignId: "reebok-crossfit", campaignName: "Reebok CrossFit Challenge", budget: 45000, percentage: 25 },
          { campaignId: "under-armour-premium", campaignName: "Under Armour Premium", budget: 27500, percentage: 15.3 },
          { campaignId: "nike-summer-2025", campaignName: "Nike Summer Fitness 2025", budget: 35000, percentage: 19.4 },
          { campaignId: "puma-urban", campaignName: "Puma Urban Athletes", budget: 20000, percentage: 11.1 },
        ],
      },
      {
        name: "Efficiency Focus",
        description: "Optimize for highest ROAS across portfolio",
        allocations: [
          { campaignId: "reebok-crossfit", campaignName: "Reebok CrossFit Challenge", budget: 40000, percentage: 26.7 },
          { campaignId: "adidas-morning", campaignName: "Adidas Morning Warriors", budget: 38000, percentage: 25.3 },
          { campaignId: "under-armour-premium", campaignName: "Under Armour Premium", budget: 28000, percentage: 18.7 },
          { campaignId: "nike-summer-2025", campaignName: "Nike Summer Fitness 2025", budget: 30000, percentage: 20 },
          { campaignId: "puma-urban", campaignName: "Puma Urban Athletes", budget: 14000, percentage: 9.3 },
        ],
      },
    ];

    for (const scenario of scenarios) {
      const existing = await ctx.db
        .query("budgetScenarios")
        .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
        .filter((q) => q.eq(q.field("name"), scenario.name))
        .first();

      if (!existing) {
        const totalBudget = scenario.allocations.reduce((sum, a) => sum + a.budget, 0);
        const projectedRevenue = totalBudget * 4.8;
        const projectedROAS = projectedRevenue / totalBudget;

        await ctx.db.insert("budgetScenarios", {
          buyerId: args.buyerId,
          name: scenario.name,
          description: scenario.description,
          totalBudget,
          projectedRevenue,
          projectedROAS,
          allocations: scenario.allocations,
          status: "draft",
          createdAt: Date.now(),
        });
      }
    }

    return { success: true };
  },
});