"use client";

import { motion } from "framer-motion";
import { TrendingDown, Users, Repeat, Heart, Eye, Clock } from "lucide-react";

export default function OutcomesSection() {
  const outcomes = [
    {
      category: "Performance Marketing",
      icon: TrendingDown,
      color: "from-brand-green to-brand-green/70",
      metrics: [
        { name: "Customer Acquisition Cost", impact: "↓34% average reduction", proven: true },
        { name: "Return on Ad Spend", impact: "4.2x average ROAS", proven: true },
        { name: "Conversion Rate", impact: "↑28% improvement", proven: true },
        { name: "Cost Per Action", impact: "↓41% reduction", proven: true },
      ]
    },
    {
      category: "Customer Lifetime Value",
      icon: Users,
      color: "from-electric-blue to-electric-blue/70",
      metrics: [
        { name: "LTV:CAC Ratio", impact: "3.8x improvement", proven: true },
        { name: "Repeat Purchase Rate", impact: "↑52% increase", proven: true },
        { name: "Average Order Value", impact: "↑23% growth", proven: true },
        { name: "Customer Retention", impact: "↑67% year-over-year", proven: true },
      ]
    },
    {
      category: "Churn & Retention",
      icon: Repeat,
      color: "from-warm-coral to-warm-coral/70",
      metrics: [
        { name: "Churn Reduction", impact: "↓18% monthly churn", proven: true },
        { name: "Win-back Rate", impact: "↑45% re-engagement", proven: true },
        { name: "Subscription Renewal", impact: "↑31% renewal rate", proven: true },
        { name: "Engagement Score", impact: "↑56% active users", proven: true },
      ]
    },
    {
      category: "Brand Marketing",
      icon: Heart,
      color: "from-soft-lavender to-soft-lavender/70",
      metrics: [
        { name: "Brand Awareness", impact: "+27% unaided recall", proven: true },
        { name: "Consideration Lift", impact: "+34% consideration", proven: true },
        { name: "Brand Favorability", impact: "+19% sentiment", proven: true },
        { name: "Purchase Intent", impact: "+42% intent lift", proven: true },
      ]
    },
    {
      category: "Media Efficiency",
      icon: Eye,
      color: "from-golden-amber to-golden-amber/70",
      metrics: [
        { name: "Viewability Rate", impact: "94% average viewability", proven: true },
        { name: "Audience Overlap", impact: "↓67% waste reduction", proven: true },
        { name: "Frequency Cap", impact: "Optimal 3.2 frequency", proven: true },
        { name: "Cross-Channel Lift", impact: "+48% incremental reach", proven: true },
      ]
    },
    {
      category: "Speed & Agility",
      icon: Clock,
      color: "from-brand-green to-electric-blue",
      metrics: [
        { name: "Time to Insight", impact: "Real-time attribution", proven: true },
        { name: "Campaign Launch", impact: "60% faster activation", proven: true },
        { name: "Optimization Cycles", impact: "Daily vs. weekly", proven: true },
        { name: "Data Freshness", impact: "<24hr latency", proven: true },
      ]
    },
  ];

  return (
    <section id="outcomes" className="section-padding bg-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            Proven outcomes across the entire funnel
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            From awareness to retention, drive measurable improvements with verified data
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl border border-silk-gray hover:shadow-lg transition-all">
                {/* Header */}
                <div className="p-6 border-b border-silk-gray">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${outcome.color} p-2`}>
                      <outcome.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="font-semibold text-dark-gray">{outcome.category}</h3>
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-6 space-y-4">
                  {outcome.metrics.map((metric) => (
                    <div key={metric.name} className="group/metric">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-sm text-medium-gray">{metric.name}</span>
                        <span className="text-sm font-medium text-dark-gray whitespace-nowrap">
                          {metric.impact}
                        </span>
                      </div>
                      {metric.proven && (
                        <div className="mt-1 flex items-center gap-1">
                          <div className="w-3 h-3 bg-brand-green rounded-full" />
                          <span className="text-xs text-brand-green">Verified</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}