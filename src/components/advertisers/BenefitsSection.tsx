"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Shield, BarChart3 } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Federated Model Training",
      description: "Train models across distributed data without centralizing it. Algorithms move to data sources, maintaining complete privacy.",
    },
    {
      icon: BarChart3,
      title: "Closed-Loop Attribution",
      description: "Measure campaign outcomes using privacy-preserving techniques. No raw data joins, only verified signals with cryptographic proof.",
    },
    {
      icon: CheckCircle,
      title: "Secure Query Execution",
      description: "Submit approved queries that execute in secure enclaves. Get aggregated insights without ever accessing individual records.",
    },
    {
      icon: Shield,
      title: "Compliance by Design",
      description: "Built-in consent verification and usage rights. Every query includes proof of permissions, ensuring GDPR/CCPA compliance.",
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
            Privacy-preserving intelligence at scale
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