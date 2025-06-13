import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update user (supports mock users)
export const saveUser = mutation({
  args: {
    id: v.optional(v.string()), // Mock user ID
    email: v.string(),
    name: v.string(),
    role: v.optional(v.union(v.literal("DATA_OWNER"), v.literal("MEDIA_BUYER"), v.literal("SOLUTION_CREATOR"))),
    company: v.optional(v.string()),
    onboardingCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // For mock users, check by mock ID first
    if (args.id) {
      const existingUserById = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("mockId"), args.id))
        .first();
      
      if (existingUserById) {
        // Update existing mock user
        await ctx.db.patch(existingUserById._id, {
          name: args.name,
          email: args.email,
          ...(args.role && { role: args.role }),
          ...(args.company && { company: args.company }),
          ...(args.onboardingCompleted !== undefined && { onboardingCompleted: args.onboardingCompleted }),
        });
        return existingUserById._id;
      }
    }

    // Check by email as fallback
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        ...(args.id && { mockId: args.id }),
        ...(args.role && { role: args.role }),
        ...(args.company && { company: args.company }),
        ...(args.onboardingCompleted !== undefined && { onboardingCompleted: args.onboardingCompleted }),
      });
      return existingUser._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        mockId: args.id,
        email: args.email,
        name: args.name,
        role: args.role || "DATA_OWNER",
        company: args.company || "",
        onboardingCompleted: args.onboardingCompleted ?? false,
        createdAt: Date.now(),
      });
    }
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get user by mock ID
export const getUserByMockId = query({
  args: { mockId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("mockId"), args.mockId))
      .first();
  },
});

// Update user role
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("DATA_OWNER"), v.literal("MEDIA_BUYER"), v.literal("SOLUTION_CREATOR")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { role: args.role });
  },
});

// Complete onboarding
export const completeOnboarding = mutation({
  args: {
    userId: v.id("users"),
    company: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      company: args.company,
      onboardingCompleted: true,
    });
  },
});