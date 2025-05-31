"use client";

import { motion } from "framer-motion";

export default function ValuePropsSection() {
  const mediaBuyerProps = [
    {
      title: "Predictive CAC Forecasting",
      description: "AI predicts customer acquisition costs weeks in advance. Plan budgets with confidence using verified data signals.",
    },
    {
      title: "Creative Fatigue Detection",
      description: "Know when to refresh creatives before performance drops. AI monitors engagement decay patterns 24/7.",
    },
    {
      title: "Multi-DSP Arbitrage",
      description: "Automatically shift budgets between DSPs for optimal performance. Verified data quality across all channels.",
    },
    {
      title: "Incrementality Testing",
      description: "Built-in holdout groups prove real impact. Know exactly what's driving results vs. coincidence.",
    },
  ];

  const dataControllerProps = [
    {
      title: "Maintain Control",
      description: "Your data never leaves your infrastructure. Activate across more channels while maintaining GDPR/CCPA compliance.",
    },
    {
      title: "Prove Performance Impact",
      description: "Automated attribution shows exactly how your data drives campaign results. Command premium pricing with proof.",
    },
    {
      title: "Fair Value Attribution",
      description: "Get paid based on actual campaign impact, not guesswork. Verification makes the activation valuable.",
    },
    {
      title: "Performance Intelligence",
      description: "See real-time performance data from campaigns using your segments. Optimize data value over time.",
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
              For Data Controllers: Turn Your Data Into a Performance Powerhouse
            </h2>
            <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
              Activate your data across more channels while maintaining control. Prove performance impact to command premium prices — with proof.
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