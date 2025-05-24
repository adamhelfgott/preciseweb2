"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Shield, BarChart3 } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Verified quality",
      description: "Every audience comes with cryptographic proof of quality and consent. Know exactly what you're buying before you activate.",
    },
    {
      icon: TrendingUp,
      title: "Complete attribution",
      description: "See which data sources drive conversions. Make optimization decisions based on transparent, verifiable insights.",
    },
    {
      icon: Shield,
      title: "Built-in compliance",
      description: "Every audience includes verified consent. Reduce risk and build campaigns with confidence.",
    },
    {
      icon: BarChart3,
      title: "Performance insights",
      description: "Access historical performance data for every audience. Make informed decisions based on real results.",
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
            The advantages of verified data
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