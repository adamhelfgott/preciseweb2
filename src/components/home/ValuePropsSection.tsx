"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Shuffle, Target, Shield, ChartBar, Calculator, Activity } from "lucide-react";

export default function ValuePropsSection() {
  const mediaBuyerProps = [
    {
      title: "Predictive CAC Forecasting",
      description: "AI predicts customer acquisition costs weeks in advance. Plan budgets with confidence using verified data signals.",
      icon: TrendingUp,
      gradient: "from-electric-blue to-electric-blue/70",
    },
    {
      title: "Creative Fatigue Detection",
      description: "Know when to refresh creatives before performance drops. AI monitors engagement decay patterns 24/7.",
      icon: Brain,
      gradient: "from-warm-coral to-warm-coral/70",
    },
    {
      title: "Multi-DSP Arbitrage",
      description: "Automatically shift budgets between DSPs for optimal performance. Verified data quality across all channels.",
      icon: Shuffle,
      gradient: "from-soft-lavender to-soft-lavender/70",
    },
    {
      title: "Incrementality Testing",
      description: "Built-in holdout groups prove real impact. Know exactly what's driving results vs. coincidence.",
      icon: Target,
      gradient: "from-golden-amber to-golden-amber/70",
    },
  ];

  const dataControllerProps = [
    {
      title: "Maintain Control",
      description: "Your data never leaves your infrastructure. Activate across more channels while maintaining GDPR/CCPA compliance.",
      icon: Shield,
      gradient: "from-brand-green to-brand-green/70",
    },
    {
      title: "Prove Performance Impact",
      description: "Automated attribution shows exactly how your data drives campaign results. Command premium pricing with proof.",
      icon: ChartBar,
      gradient: "from-electric-blue to-electric-blue/70",
    },
    {
      title: "Fair Value Attribution",
      description: "Get paid based on actual campaign impact, not guesswork. Verification makes the activation valuable.",
      icon: Calculator,
      gradient: "from-soft-lavender to-soft-lavender/70",
    },
    {
      title: "Performance Intelligence",
      description: "See real-time performance data from campaigns using your segments. Optimize data value over time.",
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
              For Media Buyers: Verified Data That Drives Performance
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Activate premium data segments with confidence. Reduce CAC with data you can actually rely on — with cryptographic validation of every action.
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
              For Data Controllers: Turn Your Data Into a Performance Powerhouse
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Activate your data across more channels while maintaining control. Prove performance impact to command premium prices — with proof.
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