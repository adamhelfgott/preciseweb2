import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new contact/lead from form submission
export const createContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    message: v.string(),
    source: v.optional(v.string()), // "contact-form", "newsletter", etc.
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    
    // Store the contact
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      status: "new",
      createdAt: timestamp,
    });

    // You could also trigger email notifications here
    // or sync with external CRM systems
    
    return { success: true, contactId };
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