"use client";

import { motion } from "framer-motion";
import { DollarSign, Shield, Plug, Eye } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "New revenue streams",
      description: "Create value from data you're already collecting. Automated distribution means passive income without operational overhead.",
    },
    {
      icon: Shield,
      title: "Privacy-first approach",
      description: "Your raw data never leaves your control. Share insights and audiences while maintaining complete privacy compliance.",
    },
    {
      icon: Plug,
      title: "Simple integration",
      description: "Works with your existing infrastructure. One-line SDK or native integrations with major platforms.",
    },
    {
      icon: Eye,
      title: "Complete transparency",
      description: "See exactly how your data creates value. Track usage, measure impact, understand attribution.",
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
            Why leading companies choose Precise
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