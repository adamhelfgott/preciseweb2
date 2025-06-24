import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new contact/lead from form submission
export const createContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.optional(v.string()), // "contact-form", "newsletter", etc.
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    // Store the contact
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      source: args.source || "contact-form",
      formType: "contact",
      status: "new",
      createdAt: timestamp,
    });

    // You could also trigger email notifications here
    // or sync with external CRM systems
    
    return { success: true, contactId };
  },
});

// Create a comprehensive form submission for onboarding flows
export const createFormSubmission = mutation({
  args: {
    // Required fields
    name: v.string(),
    email: v.string(),
    company: v.string(),
    source: v.string(), // "data-owner-onboarding", "advertiser-onboarding", etc.
    formType: v.string(),
    
    // Optional common fields
    role: v.optional(v.string()),
    industry: v.optional(v.string()),
    objective: v.optional(v.string()),
    message: v.optional(v.string()),
    
    // Data owner specific
    dataTypes: v.optional(v.object({
      behavioral: v.optional(v.boolean()),
      transaction: v.optional(v.boolean()),
      location: v.optional(v.boolean()),
      preference: v.optional(v.boolean()),
    })),
    userSize: v.optional(v.string()),
    infrastructure: v.optional(v.string()),
    
    // Media buyer specific
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
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    // Check if this email already exists
    const existingContact = await ctx.db
      .query("contacts")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    // Store the submission
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      status: "new",
      createdAt: timestamp,
    });
    
    // Log for debugging
    console.log(`New ${args.formType} submission from ${args.email} (${args.company})`);
    
    return { 
      success: true, 
      contactId,
      isExistingContact: !!existingContact 
    };
  },
});

// Get recent contacts (for admin dashboard)
export const getRecentContacts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    
    const contacts = await ctx.db
      .query("contacts")
      .order("desc")
      .take(limit);
    
    return contacts;
  },
});

// Update contact status
export const updateContactStatus = mutation({
  args: {
    contactId: v.id("contacts"),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("converted")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contactId, {
      status: args.status,
      updatedAt: Date.now(),
    });
    
    return { success: true };
  },
});