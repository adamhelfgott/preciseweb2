"use client";

import { motion } from "framer-motion";

export default function ValuePropsSection() {
  const mediaBuyerProps = [
    {
      icon: "🧠",
      title: "Predictive CAC Forecasting",
      description: "AI predicts customer acquisition costs 4 weeks out with 92% accuracy. Plan budgets with confidence.",
    },
    {
      icon: "🎯",
      title: "Creative Fatigue Detection",
      description: "Know when to refresh creatives before performance drops. AI monitors engagement decay patterns 24/7.",
    },
    {
      icon: "💸",
      title: "Multi-DSP Arbitrage",
      description: "Automatically shift budgets between DSPs for optimal performance. Average 2.3x improvement in CAC.",
    },
    {
      icon: "📊",
      title: "Incrementality Testing",
      description: "Built-in holdout groups prove real impact. Know exactly what's driving results vs. coincidence.",
    },
  ];

  const dataControllerProps = [
    {
      icon: "🔐",
      title: "Stay a Data Controller",
      description: "Never become a data broker. Your data never leaves your infrastructure. Maintain GDPR/CCPA compliance.",
    },
    {
      icon: "💡",
      title: "Market Intelligence",
      description: "See advertiser demand signals in real-time. Know what data is valuable before your competitors.",
    },
    {
      icon: "🏆",
      title: "Fair Value Attribution",
      description: "Valence Enhanced Shapley ensures you're paid based on actual campaign impact, not guesswork.",
    },
    {
      icon: "🚀",
      title: "Zero Integration Hassle",
      description: "Deploy federated nodes in minutes. Works with your existing data infrastructure. SOC2 compliant.",
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
              For Media Buyers: AI That Delivers Results
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Stop guessing. Start knowing. Our AI analyzes millions of signals to optimize your campaigns in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaBuyerProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{prop.icon}</div>
                <h3 className="text-heading-medium font-semibold text-dark-gray mb-3">
                  {prop.title}
                </h3>
                <p className="text-medium-gray">
                  {prop.description}
                </p>
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
              For Data Controllers: Intelligence Without Exposure
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Enable federated queries while maintaining complete control. Your data never moves, only insights do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataControllerProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{prop.icon}</div>
                <h3 className="text-heading-medium font-semibold text-dark-gray mb-3">
                  {prop.title}
                </h3>
                <p className="text-medium-gray">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}