"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Define query parameters",
      description: "Specify the types of insights you need. Set up approved query templates that respect data controller permissions.",
    },
    {
      number: 2,
      title: "Execute federated queries",
      description: "Queries run in secure enclaves at data sources. Get aggregated results without moving or accessing raw data.",
    },
    {
      number: 3,
      title: "Measure with privacy",
      description: "Use closed-loop attribution to prove campaign impact. Verified credentials ensure every insight is compliant and auditable.",
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
            Query intelligence without accessing data
          </h2>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {step.number}
                  </div>
                  <span className="text-medium-gray">Step {step.number}</span>
                </div>
                
                <h3 className="text-display-medium font-bold text-dark-gray mb-4">
                  {step.title}
                </h3>
                
                <p className="text-body-large text-medium-gray">
                  {step.description}
                </p>
              </div>

              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <StepVisual step={step.number} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepVisual({ step }: { step: number }) {
  return (
    <div className="relative h-[400px] flex items-center justify-center bg-light-gray rounded-2xl">
      {step === 1 && <AudienceBrowser />}
      {step === 2 && <ActivationFlow />}
      {step === 3 && <AttributionDashboard />}
    </div>
  );
}

function AudienceBrowser() {
  return (
    <div className="w-full max-w-md p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-dark-gray mb-4">Available Audiences</h4>
        <div className="space-y-3">
          {["Fitness Enthusiasts", "Premium Shoppers", "Travel Buffs"].map((audience, i) => (
            <motion.div
              key={audience}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-4 border border-silk-gray rounded-lg hover:border-brand-green transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-dark-gray">{audience}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-green">95%</span>
                  <div className="w-12 h-2 bg-light-gray rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green" style={{ width: "95%" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivationFlow() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute"
        animate={{
          x: [-100, 0, 100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="w-32 h-32 bg-brand-green/20 rounded-lg flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
      </motion.div>
      
      <div className="text-center">
        <div className="text-4xl mb-4">🎯</div>
        <p className="text-medium-gray">Activating audience...</p>
      </div>
    </div>
  );
}

function AttributionDashboard() {
  return (
    <div className="w-full max-w-md p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-dark-gray mb-4">Attribution Report</h4>
        <div className="space-y-4">
          {[
            { source: "Behavioral Data", value: 45 },
            { source: "Transaction Data", value: 30 },
            { source: "Location Data", value: 25 },
          ].map((item, i) => (
            <motion.div
              key={item.source}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-medium-gray">{item.source}</span>
                <span className="text-sm font-semibold text-dark-gray">{item.value}%</span>
              </div>
              <div className="w-full h-3 bg-light-gray rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}