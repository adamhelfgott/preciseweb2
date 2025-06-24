"use client";

import { motion } from "framer-motion";
import { Link2, Shield, BarChart3, Zap, Users, Award } from "lucide-react";

export default function IntegrationBenefits() {
  const benefits = [
    {
      icon: Link2,
      title: "Deterministic Data Signals",
      description: "Access verified first-party signals to enhance probabilistic models with ground truth data.",
      value: "87% accuracy improvement",
    },
    {
      icon: Shield,
      title: "Privacy-Preserving Integration",
      description: "Connect to data sources without handling PII. All matching happens in secure enclaves.",
      value: "100% GDPR compliant",
    },
    {
      icon: BarChart3,
      title: "Multi-Party Attribution",
      description: "Fairly attribute value across all data contributors using Valence Enhanced Shapley.",
      value: "3-way+ attribution",
    },
    {
      icon: Zap,
      title: "Real-Time Signal Updates",
      description: "Get streaming updates as campaigns run, not batch uploads weeks later.",
      value: "<1hr data freshness",
    },
    {
      icon: Users,
      title: "Expanded Client Base",
      description: "Offer enhanced attribution to brands that need verified data collaboration.",
      value: "45% more serviceable market",
    },
    {
      icon: Award,
      title: "Competitive Differentiation",
      description: "Be the only measurement provider that can prove impact with verified signals.",
      value: "Premium pricing power",
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
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            Why measurement partners choose Precise
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Enhance your attribution solutions with verified data signals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 hover:shadow-lg transition-all">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bright-purple to-electric-blue p-2.5 mb-4">
                  <benefit.icon className="w-full h-full text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-dark-gray mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-medium-gray mb-4">
                  {benefit.description}
                </p>
                
                {/* Value metric */}
                <div className="pt-4 border-t border-silk-gray">
                  <span className="text-bright-purple font-semibold">{benefit.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}