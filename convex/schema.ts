import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users with roles
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("DATA_OWNER"), v.literal("MEDIA_BUYER"), v.literal("SOLUTION_CREATOR")),
    company: v.string(),
    onboardingCompleted: v.boolean(),
    createdAt: v.number(),
    mockId: v.optional(v.string()), // For demo/mock data
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // Data assets for data controllers
  dataAssets: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    type: v.string(),
    qualityScore: v.number(), // 0-100
    recordCount: v.number(),
    updateFrequency: v.number(), // hours
    revenuePerK: v.number(), // revenue per 1000 records
    industryAvgPerK: v.number(),
    usageRate: v.number(), // percentage 0-100
    monthlyRevenue: v.number(),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("pending")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"]),

  // Earnings events
  earnings: defineTable({
    ownerId: v.id("users"),
    assetId: v.id("dataAssets"),
    amount: v.number(),
    campaign: v.string(),
    impressions: v.number(),
    timestamp: v.number(),
    status: v.union(v.literal("pending"), v.literal("distributed")),
  })
    .index("by_owner", ["ownerId"])
    .index("by_asset", ["assetId"])
    .index("by_timestamp", ["timestamp"]),

  // Campaigns for media buyers
  campaigns: defineTable({
    buyerId: v.id("users"),
    name: v.string(),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("completed")),
    currentCAC: v.number(),
    previousCAC: v.number(),
    targetCAC: v.number(),
    ltv: v.number(),
    preciseLaunchDate: v.optional(v.number()),
    spend: v.number(),
    revenue: v.number(),
    roas: v.number(),
    dsps: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_buyer", ["buyerId"])
    .index("by_status", ["status"]),

  // Campaign performance history
  campaignHistory: defineTable({
    campaignId: v.id("campaigns"),
    date: v.number(),
    cac: v.number(),
    spend: v.number(),
    conversions: v.number(),
    revenue: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_date", ["date"]),

  // Attribution data
  attributions: defineTable({
    campaignId: v.id("campaigns"),
    dataSourceId: v.id("dataAssets"),
    cacReduction: v.number(),
    percentage: v.number(), // contribution percentage
    value: v.number(), // monetary value
    timestamp: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_data_source", ["dataSourceId"]),

  // Marketplace solutions
  solutions: defineTable({
    creatorId: v.id("users"),
    name: v.string(),
    description: v.string(),
    featured: v.boolean(),
    cohortCount: v.number(),
    totalReach: v.number(),
    avgQualityScore: v.number(),
    dsps: v.array(v.string()),
    objective: v.string(),
    targetCAC: v.number(),
    targetROAS: v.number(),
    activations: v.number(),
    avgCAC: v.number(),
    successRate: v.number(),
    totalSpend: v.number(),
    totalRevenue: v.number(),
    pricingModel: v.string(),
    pricingDetails: v.string(),
    status: v.union(v.literal("active"), v.literal("draft"), v.literal("archived")),
    createdAt: v.number(),
  })
    .index("by_creator", ["creatorId"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"]),

  // Recommendations
  recommendations: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("data_optimization"), v.literal("campaign_optimization")),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    title: v.string(),
    description: v.string(),
    estimatedImpact: v.object({
      type: v.string(),
      value: v.number(),
    }),
    status: v.union(v.literal("new"), v.literal("viewed"), v.literal("applied"), v.literal("dismissed")),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  // DSP performance tracking
  dspPerformance: defineTable({
    campaignId: v.id("campaigns"),
    dsp: v.string(),
    spend: v.number(),
    currentECPM: v.number(),
    ecpmTrend: v.number(), // percentage change
    roas: v.number(),
    status: v.union(v.literal("scaling"), v.literal("optimizing"), v.literal("saturated")),
    timestamp: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_timestamp", ["timestamp"]),

  // AI Chat messages for persistence
  chatMessages: defineTable({
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    timestamp: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),

  // CMS Content for marketing pages
  cmsContent: defineTable({
    page: v.string(), // page identifier (e.g., "company", "pricing", etc.)
    content: v.any(), // flexible content structure for each page
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_page", ["page"]),

  // Contact form submissions and leads - unified table for all form submissions
  contacts: defineTable({
    // Common fields
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.string(), // "contact-form", "data-owner-onboarding", "advertiser-onboarding", etc.
    formType: v.string(), // specific form type for filtering
    
    // Additional fields for onboarding flows
    industry: v.optional(v.string()),
    objective: v.optional(v.string()),
    
    // Data owner specific fields
    dataTypes: v.optional(v.object({
      behavioral: v.optional(v.boolean()),
      transaction: v.optional(v.boolean()),
      location: v.optional(v.boolean()),
      preference: v.optional(v.boolean()),
    })),
    userSize: v.optional(v.string()),
    infrastructure: v.optional(v.string()),
    
    // Media buyer specific fields
    platforms: v.optional(v.object({
      meta: v.optional(v.boolean()),
      dv360: v.optional(v.boolean()),
      ttd: v.optional(v.boolean()),
      amazon: v.optional(v.boolean()),
      microsoft: v.optional(v.boolean()),
      tiktok: v.optional(v.boolean()),
      linkedin: v.optional(v.boolean()),
      madhive: v.optional(v.boolean()),
    })),
    spend: v.optional(v.string()),
    challenges: v.optional(v.object({
      quality: v.optional(v.boolean()),
      attribution: v.optional(v.boolean()),
      compliance: v.optional(v.boolean()),
      performance: v.optional(v.boolean()),
    })),
    
    // Meta fields
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("converted")),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    notes: v.optional(v.string()), // for internal follow-up notes
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"])
    .index("by_source", ["source"])
    .index("by_form_type", ["formType"]),
});