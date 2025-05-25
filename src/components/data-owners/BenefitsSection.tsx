"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Target, Zap } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: BarChart3,
      title: "Maintain Controller Status",
      description: "Never become a data broker. Our architecture ensures you maintain full GDPR/CCPA controller status while enabling collaboration.",
    },
    {
      icon: TrendingUp,
      title: "Query Governance",
      description: "Approve specific query types and set fine-grained permissions. Control exactly what insights can be derived without exposing raw data.",
    },
    {
      icon: Target,
      title: "Federated Learning",
      description: "Enable model training in your environment. Algorithms come to your data, ensuring zero data movement and complete security.",
    },
    {
      icon: Zap,
      title: "Verified Credentials",
      description: "Every query includes cryptographic proof of consent and usage rights. Full audit trail for compliance and transparency.",
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
            Stay compliant while enabling collaboration
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