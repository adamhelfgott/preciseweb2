"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Shuffle, Target, Shield, ChartBar, Calculator, Activity } from "lucide-react";

export default function ValuePropsSection() {
  const mediaBuyerProps = [
    {
      title: "Beyond CAC Reduction",
      description: "Drive outcomes across the entire funnel - awareness, consideration, conversion, and retention.",
      icon: TrendingUp,
      gradient: "from-electric-blue to-electric-blue/70",
    },
    {
      title: "Verified Attribution",
      description: "Multi-touch attribution with deterministic signals. Know what's actually driving results.",
      icon: Brain,
      gradient: "from-warm-coral to-warm-coral/70",
    },
    {
      title: "Cross-Channel Optimization",
      description: "Unified performance across DSPs, social, CTV, and more. One source of truth.",
      icon: Shuffle,
      gradient: "from-bright-purple to-bright-purple/70",
    },
    {
      title: "Real-Time Intelligence",
      description: "Act on insights immediately, not weeks later. AI-powered recommendations 24/7.",
      icon: Target,
      gradient: "from-brand-green to-electric-blue",
    },
  ];

  const dataControllerProps = [
    {
      title: "3-5x Revenue Uplift",
      description: "Command premium prices when you can prove performance. Move from CPM to value-based pricing.",
      icon: Shield,
      gradient: "from-brand-green to-brand-green/70",
    },
    {
      title: "Universal Activation",
      description: "One integration reaches thousands of buyers. Works for both 1P brands and 3P brokers.",
      icon: ChartBar,
      gradient: "from-electric-blue to-electric-blue/70",
    },
    {
      title: "Quality Drives Price",
      description: "Build reputation through verified performance. Higher quality scores unlock premium rates.",
      icon: Calculator,
      gradient: "from-bright-purple to-bright-purple/70",
    },
    {
      title: "Real-Time Analytics",
      description: "Track usage, revenue, and performance 24/7. Optimize pricing based on demand.",
      icon: Activity,
      gradient: "from-warm-coral to-warm-coral/70",
    },
  ];

  return (
    <section className="section-padding bg-soft-white">
      <div className="container">
        {/* Media Buyer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-display-medium font-bold text-dark-gray mb-4">
              For Media Buyers: Drive Better Outcomes
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Access verified audiences with transparent attribution across the entire marketing funnel. From awareness to retention, optimize what matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaBuyerProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 shadow-sm hover:shadow-lg transition-all">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prop.gradient} rounded-t-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.gradient} p-2.5 mb-4`}>
                    <prop.icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content with fixed height title */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-dark-gray min-h-[3.5rem] flex items-start">
                      {prop.title}
                    </h3>
                    <p className="text-sm text-medium-gray leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                  
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Controller Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-display-medium font-bold text-dark-gray mb-4">
              For Data Controllers: Monetize with Performance Proof
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Whether you're a brand with first-party data or a broker with third-party segments, command premium prices through verified performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataControllerProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 shadow-sm hover:shadow-lg transition-all">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prop.gradient} rounded-t-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.gradient} p-2.5 mb-4`}>
                    <prop.icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content with fixed height title */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-dark-gray min-h-[3.5rem] flex items-start">
                      {prop.title}
                    </h3>
                    <p className="text-sm text-medium-gray leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                  
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}