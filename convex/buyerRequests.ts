import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get active buyer requests
export const getActiveRequests = query({
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("buyerRequests")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .order("desc")
      .collect();

    // Get buyer details for each request
    const requestsWithBuyers = await Promise.all(
      requests.map(async (request) => {
        const buyer = await ctx.db.get(request.buyerId);
        return {
          ...request,
          buyerName: buyer?.name || "Unknown Buyer",
          buyerCompany: buyer?.company || "Unknown Company",
        };
      })
    );

    return requestsWithBuyers;
  },
});

// Get request matches for a data owner
export const getRequestMatches = query({
  args: {
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all matches for this owner's assets
    const matches = await ctx.db
      .query("requestMatches")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .order("desc")
      .collect();

    // Get request and asset details for each match
    const matchesWithDetails = await Promise.all(
      matches.map(async (match) => {
        const request = await ctx.db.get(match.requestId);
        const asset = await ctx.db.get(match.assetId);
        const buyer = request ? await ctx.db.get(request.buyerId) : null;

        return {
          ...match,
          request: request ? {
            ...request,
            buyerName: buyer?.name || "Unknown Buyer",
            buyerCompany: buyer?.company || "Unknown Company",
          } : null,
          assetName: asset?.name || "Unknown Asset",
          assetType: asset?.type || "Unknown Type",
        };
      })
    );

    return matchesWithDetails.filter(m => m.request !== null);
  },
});

// Create a new buyer request
export const createBuyerRequest = mutation({
  args: {
    buyerId: v.id("users"),
    title: v.string(),
    description: v.string(),
    segments: v.array(v.string()),
    budget: v.float64(),
    targetCAC: v.float64(),
    targetAudience: v.string(),
    requiredAttributes: v.array(v.string()),
    preferredAttributes: v.array(v.string()),
    campaignType: v.string(),
    timeline: v.string(),
  },
  handler: async (ctx, args) => {
    const requestId = await ctx.db.insert("buyerRequests", {
      ...args,
      status: "active",
      expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: Date.now(),
    });

    return requestId;
  },
});

// Find matches for a request
export const findMatches = mutation({
  args: {
    requestId: v.id("buyerRequests"),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);
    if (!request) return;

    // Get all data assets
    const assets = await ctx.db.query("dataAssets").collect();

    // Calculate match scores for each asset
    for (const asset of assets) {
      // Simple matching logic based on type and segments
      let matchScore = 0;
      const matchedAttributes: string[] = [];
      const missingAttributes: string[] = [];

      // Check segment match
      if (request.segments.some(seg => asset.type.includes(seg.toLowerCase()))) {
        matchScore += 30;
        matchedAttributes.push("Segment Match");
      }

      // Check required attributes (simulated)
      request.requiredAttributes.forEach(attr => {
        if (Math.random() > 0.5) {
          matchScore += 20;
          matchedAttributes.push(attr);
        } else {
          missingAttributes.push(attr);
        }
      });

      // Check preferred attributes (simulated)
      request.preferredAttributes.forEach(attr => {
        if (Math.random() > 0.5) {
          matchScore += 10;
          matchedAttributes.push(attr);
        }
      });

      // Only create match if score is above threshold
      if (matchScore >= 50) {
        const existingMatch = await ctx.db
          .query("requestMatches")
          .withIndex("by_request", (q) => q.eq("requestId", args.requestId))
          .filter((q) => q.eq(q.field("assetId"), asset._id))
          .first();

        if (!existingMatch) {
          await ctx.db.insert("requestMatches", {
            requestId: args.requestId,
            assetId: asset._id,
            ownerId: asset.ownerId,
            matchScore,
            matchedAttributes,
            missingAttributes,
            pricing: {
              cpm: asset.revenuePerK || 10,
              estimatedReach: asset.recordCount || 1000000,
              totalCost: ((asset.revenuePerK || 10) * (asset.recordCount || 1000000)) / 1000,
            },
            status: "pending",
            timestamp: Date.now(),
          });
        }
      }
    }
  },
});

// Update match status
export const updateMatchStatus = mutation({
  args: {
    matchId: v.id("requestMatches"),
    status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("negotiating"), v.literal("accepted"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.matchId, {
      status: args.status,
    });

    return { success: true };
  },
});

// Simulate buyer requests
export const simulateBuyerRequests = mutation({
  handler: async (ctx) => {
    // Get a media buyer user
    const buyers = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "MEDIA_BUYER"))
      .collect();

    if (buyers.length === 0) return { success: false, message: "No media buyers found" };

    const requestTemplates = [
      {
        title: "High-Value Fitness Enthusiasts Q1 2025",
        description: "Looking for premium fitness data with purchase intent signals for new product launch",
        segments: ["Fitness", "Health", "Wellness"],
        budget: 75000,
        targetCAC: 35,
        targetAudience: "25-45 affluent fitness enthusiasts",
        requiredAttributes: ["Age", "Income", "Fitness Activity"],
        preferredAttributes: ["Purchase History", "Brand Affinity", "Device Data"],
        campaignType: "Product Launch",
        timeline: "Q1 2025",
      },
      {
        title: "Sustainable Living Audience",
        description: "Need eco-conscious consumers with demonstrated sustainable purchase behavior",
        segments: ["Environment", "Lifestyle", "Shopping"],
        budget: 50000,
        targetCAC: 42,
        targetAudience: "Millennials interested in sustainability",
        requiredAttributes: ["Demographics", "Purchase Behavior"],
        preferredAttributes: ["Social Media Activity", "Brand Preferences"],
        campaignType: "Brand Awareness",
        timeline: "Immediate",
      },
      {
        title: "Tech Early Adopters",
        description: "Seeking cutting-edge tech enthusiasts for new gadget launch",
        segments: ["Technology", "Innovation", "Gadgets"],
        budget: 100000,
        targetCAC: 55,
        targetAudience: "Tech professionals and enthusiasts",
        requiredAttributes: ["Device Usage", "App Behavior"],
        preferredAttributes: ["Income Level", "Education", "Location"],
        campaignType: "Product Launch",
        timeline: "Next 30 days",
      },
    ];

    // Create a random request
    const template = requestTemplates[Math.floor(Math.random() * requestTemplates.length)];
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];

    const requestId = await ctx.db.insert("buyerRequests", {
      buyerId: buyer._id,
      ...template,
      budget: template.budget + Math.random() * 20000,
      targetCAC: template.targetCAC + Math.random() * 10,
      status: "active",
      expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
      createdAt: Date.now(),
    });

    // Find matches for this request
    // Note: In a real app, this would be done asynchronously
    // For now, matches are created manually

    return { success: true, requestId };
  },
});

// Delete a buyer request
export const deleteBuyerRequest = mutation({
  args: {
    requestId: v.id("buyerRequests"),
  },
  handler: async (ctx, args) => {
    // First delete all associated matches
    const matches = await ctx.db
      .query("requestMatches")
      .withIndex("by_request", (q) => q.eq("requestId", args.requestId))
      .collect();
    
    for (const match of matches) {
      await ctx.db.delete(match._id);
    }
    
    // Then delete the request itself
    await ctx.db.delete(args.requestId);
    
    return { success: true };
  },
});

// Get all buyer requests (for cleanup script)
export const getBuyerRequests = query({
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("buyerRequests")
      .order("desc")
      .collect();

    // Get buyer details for each request
    const requestsWithBuyers = await Promise.all(
      requests.map(async (request) => {
        const buyer = await ctx.db.get(request.buyerId);
        return {
          ...request,
          buyerName: buyer?.name || "Unknown Buyer",
          buyerCompany: buyer?.company || "Unknown Company",
        };
      })
    );

    return requestsWithBuyers;
  },
});
