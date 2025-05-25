import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get chat history for a user
export const getChatHistory = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get the last 50 messages for this user
    const messages = await ctx.db
      .query("chatMessages")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
    
    // Return in chronological order
    return messages.reverse();
  },
});

// Save a new chat message
export const saveMessage = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chatMessages", {
      userId: args.userId,
      role: args.role,
      content: args.content,
      timestamp: Date.now(),
    });
  },
});

// Clear chat history for a user (optional feature)
export const clearChatHistory = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("chatMessages")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Delete all messages for this user
    await Promise.all(messages.map((msg) => ctx.db.delete(msg._id)));
    
    return { deleted: messages.length };
  },
});

// Get recent chat summary (for displaying preview)
export const getChatSummary = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const recentMessages = await ctx.db
      .query("chatMessages")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(3);
    
    if (recentMessages.length === 0) {
      return null;
    }
    
    return {
      lastMessageTime: recentMessages[0].timestamp,
      messageCount: recentMessages.length,
      preview: recentMessages[0].content.substring(0, 100) + "...",
    };
  },
});