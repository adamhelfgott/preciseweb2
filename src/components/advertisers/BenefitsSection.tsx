"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Shield, BarChart3 } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Predictive CAC Forecasting",
      description: "AI-powered predictions show your CAC trajectory 4 weeks ahead with confidence intervals. Stop flying blind.",
    },
    {
      icon: BarChart3,
      title: "Custom Attribution Windows",
      description: "Configure attribution models that match your business. From first-touch to data-driven, see what really drives conversions.",
    },
    {
      icon: CheckCircle,
      title: "Incrementality Testing",
      description: "Built-in holdout testing reveals true campaign impact. Know which campaigns actually move the needle.",
    },
    {
      icon: Shield,
      title: "Creative Fatigue Alerts",
      description: "AI monitors creative performance and alerts you before fatigue impacts results. Stay ahead of declining CTRs.",
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
            Advanced analytics that improve every campaign
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