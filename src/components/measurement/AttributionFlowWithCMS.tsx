"use client";

import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { measurementAttributionFlowQuery } from "@/sanity/lib/queries";

type AttributionStep = {
  title: string;
  description: string;
  metrics?: string[];
};

type AttributionFlowData = {
  headline: string;
  subheadline: string;
  steps: AttributionStep[];
};

export default function AttributionFlowWithCMS() {
  // Fetch attribution flow data from Sanity
  const { data: flowData } = useSanityData<AttributionFlowData>(measurementAttributionFlowQuery);

  // Fallback to hardcoded content
  const fallbackSteps = [
    {
      title: "Your Solution",
      description: "Existing MMM, MTA, or incrementality platform",
      metrics: ["MMM"],
    },
    {
      title: "Integration",
      description: "Connect with Precise's verified data signals",
      metrics: ["+"],
    },
    {
      title: "Enhanced Solution",
      description: "Your platform + verified data signals",
      metrics: ["✓"],
    },
  ];

  const data = flowData || {
    headline: "How Precise enhances your attribution",
    subheadline: "Seamlessly integrate verified signals into your existing models",
    steps: fallbackSteps,
  };

  // Integration process steps (keeping these hardcoded as they're more UI-specific)
  const integrationSteps = [
    "API credentials",
    "Define data needs",
    "Test integration",
    "Go live"
  ];

  // Use cases (keeping these hardcoded for now)
  const useCases = [
    {
      title: "Enhanced MMM",
      description: "Add deterministic signals to improve model accuracy"
    },
    {
      title: "True Incrementality",
      description: "Verify lift with actual conversion data"
    },
    {
      title: "Cross-Channel Attribution",
      description: "Connect online and offline touchpoints"
    }
  ];

  return (
    <section className="section-padding bg-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            {data.headline}
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            {data.subheadline}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Visual flow diagram */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid lg:grid-cols-3 gap-8">
              {data.steps.map((step, index) => {
                const isIntegration = index === 1;
                const isEnhanced = index === 2;
                
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: index === 0 ? -20 : index === 2 ? 20 : 0, y: index === 1 ? 20 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={isIntegration ? "flex items-center justify-center" : "text-center"}
                  >
                    {isIntegration ? (
                      <div className="relative">
                        <div className="w-32 h-32 border-4 border-brand-green rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-brand-green">
                            {step.metrics?.[0] || "+"}
                          </span>
                        </div>
                        <motion.div
                          className="absolute inset-0 w-32 h-32 border-4 border-brand-green/30 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <div className={`w-20 h-20 ${isEnhanced ? 'bg-brand-green' : 'bg-soft-lavender/20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          {isEnhanced ? (
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-2xl font-bold text-soft-lavender">
                              {step.metrics?.[0] || "MMM"}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-dark-gray mb-2">{step.title}</h3>
                        <p className="text-sm text-medium-gray">
                          {step.description}
                        </p>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Integration steps */}
            <div className="mt-12 pt-8 border-t border-silk-gray">
              <h4 className="font-semibold text-dark-gray mb-6 text-center">
                Simple integration process
              </h4>
              <div className="grid md:grid-cols-4 gap-4">
                {integrationSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-medium-gray">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Use cases */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-silk-gray"
              >
                <h4 className="font-semibold text-dark-gray mb-2">{useCase.title}</h4>
                <p className="text-sm text-medium-gray">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}