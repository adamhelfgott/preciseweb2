import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generic content fields that can be reused
const heroSchema = v.object({
  title: v.string(),
  subtitle: v.optional(v.string()),
  description: v.string(),
  primaryCta: v.object({
    text: v.string(),
    href: v.string(),
  }),
  secondaryCta: v.optional(v.object({
    text: v.string(),
    href: v.string(),
  })),
  badge: v.optional(v.object({
    text: v.string(),
    icon: v.optional(v.string()),
  })),
});

const benefitSchema = v.object({
  title: v.string(),
  description: v.string(),
  icon: v.optional(v.string()),
  metrics: v.optional(v.array(v.object({
    label: v.string(),
    value: v.string(),
  }))),
});

const stepSchema = v.object({
  title: v.string(),
  description: v.string(),
  icon: v.optional(v.string()),
  details: v.optional(v.array(v.string())),
});

const faqSchema = v.object({
  question: v.string(),
  answer: v.string(),
});

const testimonialSchema = v.object({
  quote: v.string(),
  author: v.string(),
  role: v.string(),
  company: v.string(),
  image: v.optional(v.string()),
});

const teamMemberSchema = v.object({
  name: v.string(),
  role: v.string(),
  background: v.array(v.string()),
  image: v.string(),
  linkedin: v.optional(v.string()),
});

const featureSchema = v.object({
  title: v.string(),
  description: v.string(),
  icon: v.optional(v.string()),
  metric: v.optional(v.string()),
  details: v.optional(v.array(v.string())),
});

// Get page content by page slug
export const getPageContent = query({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    const content = await ctx.db
      .query("cmsContent")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .first();
    
    return content || null;
  },
});

// Update page content
export const updatePageContent = mutation({
  args: {
    page: v.string(),
    content: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsContent")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        content: args.content,
        updatedAt: Date.now(),
      });
      return existing._id;
    } else {
      return await ctx.db.insert("cmsContent", {
        page: args.page,
        content: args.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Page-specific content getters
export const getCompanyContent = query({
  handler: async (ctx) => {
    const content = await ctx.db
      .query("cmsContent")
      .withIndex("by_page", (q) => q.eq("page", "company"))
      .first();
    
    return content?.content || {
      hero: {
        title: "Leadership Team",
        description: "Building the infrastructure for the AI data economy with decades of experience from the world's leading media and technology companies.",
      },
      teamMembers: [],
      investorNote: "Backed by world-class investors and advisors",
    };
  },
});

export const getPricingContent = query({
  handler: async (ctx) => {
    const content = await ctx.db
      .query("cmsContent")
      .withIndex("by_page", (q) => q.eq("page", "pricing"))
      .first();
    
    return content?.content || {
      hero: {
        title: "Enterprise Pricing Built for Scale",
        description: "Custom pricing based on your data volume and usage. Get started with a personalized demo and pricing proposal.",
      },
      valueProps: [],
      features: [],
      roi: {
        title: "Typical ROI",
        description: "Our enterprise customers typically see:",
        metrics: [],
      },
      trustedBy: {
        title: "Trusted by leading brands and data owners",
        companies: [],
      },
    };
  },
});

export const getContactContent = query({
  handler: async (ctx) => {
    const content = await ctx.db
      .query("cmsContent")
      .withIndex("by_page", (q) => q.eq("page", "contact"))
      .first();
    
    return content?.content || {
      hero: {
        title: "Let's Transform Your Advertising Performance",
        subtitle: "Whether you're looking to optimize campaigns with AI or enable federated intelligence on your data, we're here to help.",
      },
      form: {
        title: "Get in Touch",
        fields: {
          name: { label: "Your Name", placeholder: "John Doe", required: true },
          email: { label: "Email Address", placeholder: "john@company.com", required: true },
          company: { label: "Company", placeholder: "Your Company", required: false },
          role: {
            label: "I'm interested in Precise as a...",
            options: [
              { value: "media-buyer", label: "Media Buyer / Advertiser" },
              { value: "data-owner", label: "Data Controller / Publisher" },
              { value: "partner", label: "Technology Partner" },
              { value: "investor", label: "Investor" },
              { value: "other", label: "Other" },
            ],
          },
          message: { label: "How can we help?", placeholder: "Tell us about your needs...", required: true },
        },
        submitButton: "Send Message",
      },
      quickContact: {
        title: "Quick Contact",
        email: { label: "Email us", value: "hello@precise.ai" },
        chat: { label: "Live chat", value: "Available 9AM-6PM PST" },
        demo: { label: "Schedule a demo", value: "30-minute walkthrough" },
      },
      office: {
        title: "Visit Us",
        location: {
          name: "San Francisco Office",
          address: ["548 Market Street", "Suite 28562", "San Francisco, CA 94104"],
        },
      },
      responseTime: {
        title: "Fast Response Guaranteed",
        description: "Our team typically responds within 24 hours during business days. For urgent inquiries, please mention it in your message.",
        metrics: [
          { label: "Demo requests", time: "< 2 hrs" },
          { label: "General inquiries", time: "< 24 hrs" },
        ],
      },
      faqCta: {
        title: "Looking for quick answers?",
        description: "Check out our comprehensive documentation and frequently asked questions.",
        primaryButton: { text: "View Documentation", href: "/developers" },
        secondaryButton: { text: "How It Works", href: "/how-it-works" },
      },
    };
  },
});

export const getAgentIntelligenceContent = query({
  handler: async (ctx) => {
    const content = await ctx.db
      .query("cmsContent")
      .withIndex("by_page", (q) => q.eq("page", "agent-intelligence"))
      .first();
    
    return content?.content || {
      hero: {
        badge: { text: "Agent-to-Agent Intelligence", icon: "Zap" },
        title: "Make Your DSP Intelligent",
        titleHighlight: "Intelligent",
        description: "Transform your DSP into a self-optimizing system with Precise.ai's cross-platform intelligence. Real-time insights that no single platform can provide.",
        primaryCta: { text: "View API Docs", href: "/docs/api" },
        secondaryCta: { text: "Live Demo", href: "/demo" },
        trustBadges: [
          { icon: "Shield", text: "SOC2 Compliant" },
          { icon: "CheckCircle", text: "99.9% Uptime SLA" },
          { icon: "Zap", text: "<50ms Response Time" },
        ],
      },
      architecture: {
        title: "How Agent Intelligence Works",
        description: "Your DSPs become smarter by sharing insights through Precise.ai",
      },
      features: {
        title: "Intelligence That Drives Results",
        description: "Real-time insights that improve every bid decision",
        items: [],
      },
      codeExamples: {
        title: "Integration in Minutes",
        description: "Choose your language and get started with just a few lines of code",
        examples: [],
      },
      integrationSteps: {
        title: "Start Optimizing in 4 Steps",
        steps: [],
      },
      cta: {
        title: "Ready to Make Your DSP Smarter?",
        description: "Join leading agencies and brands using Precise.ai to optimize billions in ad spend",
        primaryButton: { text: "Get Started Free", href: "/get-started" },
        secondaryButton: { text: "Talk to Sales", href: "/contact" },
      },
    };
  },
});

// Get all CMS pages for admin
export const getAllPages = query({
  handler: async (ctx) => {
    const pages = await ctx.db.query("cmsContent").collect();
    return pages.map(page => ({
      id: page._id,
      page: page.page,
      updatedAt: page.updatedAt,
    }));
  },
});