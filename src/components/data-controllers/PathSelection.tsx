"use client";

import { motion } from "framer-motion";
import { Building2, Database } from "lucide-react";

export default function PathSelection() {
  const paths = [
    {
      icon: Building2,
      title: "First-Party Data Owner",
      subtitle: "Brands & Publishers",
      description: "You have direct customer relationships and valuable behavioral data",
      benefits: [
        "Monetize without sharing raw data",
        "Maintain GDPR/CCPA compliance",
        "Create new revenue streams",
        "Prove marketing impact"
      ],
      examples: "Retailers, Publishers, Apps, Subscription Services",
      color: "from-electric-blue to-brand-green",
    },
    {
      icon: Database,
      title: "Third-Party Data Provider",
      subtitle: "Data Brokers & Identity Graphs",
      description: "You aggregate and sell audience segments across multiple sources",
      benefits: [
        "Command premium prices with proof",
        "Real-time usage tracking",
        "Multi-buyer management",
        "Quality scoring advantage"
      ],
      examples: "Data Brokers, Identity Providers, Segment Providers, DMPs",
      color: "from-warm-coral to-golden-amber",
    },
  ];

  return (
    <section id="paths" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            Two paths to data monetization
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Choose the journey that matches your business model
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-white rounded-2xl border border-silk-gray p-8 hover:shadow-lg transition-all">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${path.color} rounded-t-2xl`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${path.color} p-3 mb-6`}>
                  <path.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-heading-large font-bold text-dark-gray mb-2">
                  {path.title}
                </h3>
                <p className="text-brand-green font-medium mb-4">{path.subtitle}</p>
                <p className="text-medium-gray mb-6">{path.description}</p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {path.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-brand-green rounded-full" />
                      </div>
                      <span className="text-sm text-dark-gray">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Examples */}
                <div className="pt-6 border-t border-silk-gray">
                  <p className="text-sm text-medium-gray">
                    <span className="font-medium">Examples:</span> {path.examples}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}