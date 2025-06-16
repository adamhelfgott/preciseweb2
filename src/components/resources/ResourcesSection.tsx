"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const resources = [
  {
    category: "Getting Started",
    items: [
      {
        title: "Platform Overview",
        description: "Learn the fundamentals of the Precise platform and how it enables privacy-preserving data collaboration",
        href: "#",
        type: "Guide",
        readTime: "5 min read",
      },
      {
        title: "Quick Start for Data Controllers",
        description: "Step-by-step guide to start monetizing your data while maintaining complete privacy control",
        href: "/data-owners",
        type: "Tutorial",
        readTime: "10 min read",
      },
      {
        title: "Media Buyer's Guide",
        description: "Everything you need to know about leveraging high-quality audience data for your campaigns",
        href: "/advertisers",
        type: "Guide",
        readTime: "8 min read",
      },
    ],
  },
  {
    category: "Technical Documentation",
    items: [
      {
        title: "Valence Enhanced Shapley",
        description: "Deep dive into our fair value attribution system for data collaboration",
        href: "#",
        type: "Whitepaper",
        readTime: "15 min read",
      },
      {
        title: "Privacy Architecture",
        description: "Technical overview of our privacy-preserving infrastructure and security measures",
        href: "#",
        type: "Technical Doc",
        readTime: "20 min read",
      },
      {
        title: "API Reference",
        description: "Complete API documentation for integrating with the Precise platform",
        href: "#",
        type: "API Docs",
        readTime: "Reference",
      },
    ],
  },
  {
    category: "Best Practices",
    items: [
      {
        title: "Data Quality Optimization",
        description: "Maximize your data asset value with proven quality improvement strategies",
        href: "#",
        type: "Guide",
        readTime: "12 min read",
      },
      {
        title: "Campaign Performance Tips",
        description: "Expert strategies for optimizing your advertising campaigns with Precise data",
        href: "#",
        type: "Best Practices",
        readTime: "10 min read",
      },
      {
        title: "Compliance Guidelines",
        description: "Navigate data privacy regulations while maximizing data utility",
        href: "/compliance",
        type: "Compliance",
        readTime: "15 min read",
      },
    ],
  },
  {
    category: "Case Studies",
    items: [
      {
        title: "Retail Brand Success Story",
        description: "How a major retailer increased ROAS by 40% using Precise's audience data",
        href: "/case-studies",
        type: "Case Study",
        readTime: "8 min read",
      },
      {
        title: "Publisher Revenue Growth",
        description: "Learn how publishers are generating new revenue streams with their first-party data",
        href: "/case-studies",
        type: "Case Study",
        readTime: "10 min read",
      },
      {
        title: "Cross-Industry Collaboration",
        description: "Breakthrough results from data collaboration between telecom and financial services",
        href: "/case-studies",
        type: "Case Study",
        readTime: "12 min read",
      },
    ],
  },
];

const typeColors = {
  "Guide": "bg-electric-blue/10 text-electric-blue",
  "Tutorial": "bg-brand-green/10 text-brand-green",
  "Whitepaper": "bg-soft-lavender/10 text-soft-lavender",
  "Technical Doc": "bg-golden-amber/10 text-golden-amber",
  "API Docs": "bg-warm-coral/10 text-warm-coral",
  "Best Practices": "bg-brand-green/10 text-brand-green",
  "Compliance": "bg-medium-gray/10 text-medium-gray",
  "Case Study": "bg-electric-blue/10 text-electric-blue",
};

export default function ResourcesSection() {
  return (
    <section className="py-20">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-dark-gray mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Resources
          </motion.h1>
          <motion.p 
            className="text-lg text-medium-gray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you need to succeed with privacy-preserving data collaboration
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-6 py-4 pr-12 bg-white border border-silk-gray rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
            />
            <svg 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="space-y-16">
          {resources.map((category, categoryIndex) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-dark-gray mb-8">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={resource.href}
                      className="block p-6 bg-white rounded-xl border border-silk-gray hover:border-electric-blue/20 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[resource.type as keyof typeof typeColors] || "bg-gray-100 text-gray-600"}`}>
                          {resource.type}
                        </span>
                        <span className="text-xs text-medium-gray">{resource.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-dark-gray mb-2 group-hover:text-electric-blue transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-medium-gray line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="mt-4 flex items-center text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Learn more</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div 
          className="mt-20 bg-gradient-to-br from-electric-blue/5 to-brand-green/5 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-dark-gray mb-4">Stay Updated</h3>
          <p className="text-medium-gray mb-8 max-w-2xl mx-auto">
            Get the latest insights on privacy-preserving data collaboration and platform updates delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-electric-blue/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}