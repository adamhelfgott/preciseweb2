import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get marketplace solutions
export const getSolutions = query({
  args: {
    featured: v.optional(v.boolean()),
    objective: v.optional(v.string()),
    industry: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let solutionsQuery = ctx.db.query("solutions")
      .withIndex("by_status", (q) => q.eq("status", "active"));
    
    const solutions = await solutionsQuery.collect();
    
    // Filter by criteria
    let filtered = solutions;
    
    if (args.featured !== undefined) {
      filtered = filtered.filter(s => s.featured === args.featured);
    }
    
    if (args.objective) {
      filtered = filtered.filter(s => s.objective === args.objective);
    }
    
    // Sort by performance
    filtered.sort((a, b) => b.successRate - a.successRate);
    
    // Get creator info for each solution
    const solutionsWithCreators = await Promise.all(
      filtered.map(async (solution) => {
        const creator = await ctx.db.get(solution.creatorId);
        return {
          ...solution,
          creator: creator ? {
            name: creator.name,
            company: creator.company,
            verified: creator.company === "Precise Team",
          } : null,
        };
      })
    );
    
    return solutionsWithCreators;
  },
});

// Create a new solution
export const createSolution = mutation({
  args: {
    creatorId: v.id("users"),
    name: v.string(),
    description: v.string(),
    cohortIds: v.array(v.id("dataAssets")),
    dsps: v.array(v.string()),
    objective: v.string(),
    targetCAC: v.number(),
    targetROAS: v.number(),
    pricingModel: v.string(),
    pricingDetails: v.string(),
  },
  handler: async (ctx, args) => {
    // Calculate aggregate metrics from cohorts
    const cohorts = await Promise.all(
      args.cohortIds.map(id => ctx.db.get(id))
    );
    
    const totalReach = cohorts.reduce((sum, c) => sum + (c?.recordCount || 0), 0);
    const avgQualityScore = cohorts.reduce((sum, c) => sum + (c?.qualityScore || 0), 0) / cohorts.length;
    
    return await ctx.db.insert("solutions", {
      creatorId: args.creatorId,
      name: args.name,
      description: args.description,
      featured: false,
      cohortCount: cohorts.length,
      totalReach,
      avgQualityScore: Math.round(avgQualityScore),
      dsps: args.dsps,
      objective: args.objective,
      targetCAC: args.targetCAC,
      targetROAS: args.targetROAS,
      activations: 0,
      avgCAC: args.targetCAC, // Will improve with usage
      successRate: 0,
      totalSpend: 0,
      totalRevenue: 0,
      pricingModel: args.pricingModel,
      pricingDetails: args.pricingDetails,
      status: "active",
      createdAt: Date.now(),
    });
  },
});

// Activate a solution
export const activateSolution = mutation({
  args: {
    solutionId: v.id("solutions"),
    campaignId: v.id("campaigns"),
  },
  handler: async (ctx, args) => {
    const solution = await ctx.db.get(args.solutionId);
    if (!solution) throw new Error("Solution not found");
    
    // Update solution metrics
    await ctx.db.patch(args.solutionId, {
      activations: solution.activations + 1,
    });
    
    // Link to campaign
    const campaign = await ctx.db.get(args.campaignId);
    if (campaign) {
      // Simulate immediate improvement
      await ctx.db.patch(args.campaignId, {
        currentCAC: campaign.currentCAC * 0.9, // 10% immediate improvement
        preciseLaunchDate: Date.now(),
      });
    }
    
    return { success: true };
  },
});

// Create default featured solution
export const createFeaturedSolution = mutation({
  args: {},
  handler: async (ctx) => {
    // Get or create Precise Team user
    let preciseTeam = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "team@precise.ai"))
      .first();
    
    if (!preciseTeam) {
      const teamId = await ctx.db.insert("users", {
        email: "team@precise.ai",
        name: "Precise Team",
        role: "SOLUTION_CREATOR",
        company: "Precise Team",
        onboardingCompleted: true,
        createdAt: Date.now(),
      });
      preciseTeam = await ctx.db.get(teamId);
    }
    
    if (!preciseTeam) return;
    
    // Check if featured solution already exists
    const existing = await ctx.db
      .query("solutions")
      .withIndex("by_creator", (q) => q.eq("creatorId", preciseTeam._id))
      .first();
    
    if (existing) return existing._id;
    
    // Create featured solution
    return await ctx.db.insert("solutions", {
      creatorId: preciseTeam._id,
      name: "Premium Fitness Acquisition Blueprint",
      description: "Complete acquisition strategy combining morning fitness enthusiasts, premium equipment buyers, and health-conscious millennials.",
      featured: true,
      cohortCount: 3,
      totalReach: 2300000,
      avgQualityScore: 94,
      dsps: ["madhive", "ttd", "amazon"],
      objective: "acquisition",
      targetCAC: 28,
      targetROAS: 4.5,
      activations: 127,
      avgCAC: 24.50,
      successRate: 94,
      totalSpend: 12700000,
      totalRevenue: 57150000,
      pricingModel: "performance",
      pricingDetails: "2% of ad spend + $0.50 per conversion",
      status: "active",
      createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
    });
  },
});