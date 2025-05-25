"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Target, Zap } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: BarChart3,
      title: "Health Score Analytics",
      description: "AI analyzes your data across 5 quality dimensions. Get specific recommendations to improve value and unlock premium pricing.",
    },
    {
      icon: TrendingUp,
      title: "Market Rate Intelligence",
      description: "See how your pricing compares to competitors. Dynamic benchmarking ensures you're never undervaluing your assets.",
    },
    {
      icon: Target,
      title: "Demand Matching",
      description: "Match your data to active buyer requests. Our AI shows compatibility scores and revenue potential for each opportunity.",
    },
    {
      icon: Zap,
      title: "Enhancement Insights",
      description: "Get AI-powered suggestions to increase data value. See projected revenue impact before making changes.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray">
            Intelligence tools that maximize your data value
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-8 h-8 text-brand-green" />
              </div>
              
              <h3 className="text-heading-medium font-semibold text-dark-gray mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-medium-gray">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}