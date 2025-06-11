"use client";

import { motion } from "framer-motion";
import { Shield, DollarSign, BarChart3, Zap, Users, Award } from "lucide-react";

export default function UnifiedBenefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Privacy-Preserved Activation",
      description: "Your data never leaves your infrastructure. Maintain complete control while enabling broad activation.",
      gradient: "from-brand-green to-brand-green/70",
    },
    {
      icon: DollarSign,
      title: "Performance-Based Pricing",
      description: "Get paid based on actual campaign impact. Command 3-5x premiums when you can prove value.",
      gradient: "from-electric-blue to-electric-blue/70",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track usage, revenue, and performance metrics 24/7. Optimize pricing based on demand.",
      gradient: "from-warm-coral to-warm-coral/70",
    },
    {
      icon: Zap,
      title: "Instant Activation",
      description: "Go from data to activation in minutes, not weeks. Pre-integrated with major DSPs and platforms.",
      gradient: "from-bright-purple to-bright-purple/70",
    },
    {
      icon: Users,
      title: "Ecosystem Access",
      description: "Reach thousands of buyers through our network. No more one-off integrations.",
      gradient: "from-champagne to-deep-bronze/70",
    },
    {
      icon: Award,
      title: "Quality Scoring",
      description: "Build reputation through verified performance. Higher quality scores unlock premium pricing.",
      gradient: "from-brand-green to-electric-blue",
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
            Everything you need to maximize data value
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Built for both first-party brands and third-party providers
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
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 shadow-sm hover:shadow-lg transition-all">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} p-2.5 mb-4`}>
                  <benefit.icon className="w-full h-full text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-dark-gray mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-medium-gray leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}