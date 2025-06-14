"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function RevenueComparison() {
  const traditional = {
    title: "Traditional Data Monetization",
    icon: TrendingDown,
    color: "text-warm-coral",
    points: [
      "Fixed CPM pricing regardless of performance",
      "No visibility into campaign outcomes",
      "Race to the bottom on pricing",
      "Limited to direct relationships",
      "Manual reporting and reconciliation",
      "Buyers question data quality"
    ]
  };

  const precise = {
    title: "Monetization Through Precise",
    icon: TrendingUp,
    color: "text-brand-green",
    points: [
      "Performance-based premium pricing",
      "Real-time attribution and outcomes",
      "Command 3-5x higher prices with proof",
      "Access to entire ecosystem of buyers",
      "Automated usage tracking and billing",
      "Quality scores drive pricing power"
    ]
  };

  return (
    <section className="section-padding bg-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            Why data controllers choose Precise
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Move from commodity pricing to value-based monetization
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 border border-warm-coral/20">
              <div className="flex items-center gap-3 mb-6">
                <traditional.icon className={`w-6 h-6 ${traditional.color}`} />
                <h3 className="text-heading-medium font-semibold text-dark-gray">
                  {traditional.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {traditional.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-warm-coral mt-1.5">✕</span>
                    <span className="text-medium-gray">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Precise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 border border-brand-green/20 shadow-lg">
              <div className="absolute -top-3 -right-3 bg-brand-green text-white text-sm font-medium px-3 py-1 rounded-full">
                Recommended
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <precise.icon className={`w-6 h-6 ${precise.color}`} />
                <h3 className="text-heading-medium font-semibold text-dark-gray">
                  {precise.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {precise.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-brand-green mt-1.5">✓</span>
                    <span className="text-dark-gray font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-green mb-2">3-5x</div>
            <p className="text-sm text-medium-gray">Higher revenue per segment</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-electric-blue mb-2">87%</div>
            <p className="text-sm text-medium-gray">Buyer retention rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-golden-amber mb-2">24/7</div>
            <p className="text-sm text-medium-gray">Real-time usage tracking</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}