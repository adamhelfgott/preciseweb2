import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update user from Clerk
export const saveUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.optional(v.union(v.literal("DATA_OWNER"), v.literal("MEDIA_BUYER"), v.literal("SOLUTION_CREATOR"))),
    company: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        ...(args.role && { role: args.role }),
        ...(args.company && { company: args.company }),
      });
      return existingUser._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        email: args.email,
        name: args.name,
        role: args.role || "DATA_OWNER",
        company: args.company || "",
        onboardingCompleted: false,
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