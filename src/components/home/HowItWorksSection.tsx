"use client";

import { motion } from "framer-motion";
import { Database, Shield, Zap } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Database,
      title: "Connect your data",
      description: "Keep data in your existing infrastructure. Our SDK creates cryptographic proofs without accessing raw records.",
      code: "precise.mint(yourData)",
    },
    {
      number: "02",
      icon: Shield,
      title: "Generate verified credentials",
      description: "Cryptographic proofs verify quality and consent. DSPs and AI agents can trust your data without seeing it.",
    },
    {
      number: "03",
      icon: Zap,
      title: "Track value attribution",
      description: "As campaigns run across DSPs, see exactly how your data contributes to outcomes. Automatic value distribution.",
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
            Built for the agent-driven future
          </h2>
          <p className="text-body-large text-medium-gray">
            Enable verified data flows without moving raw data
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="card h-full">
                <div className="text-6xl font-bold text-silk-gray mb-6">
                  {step.number}
                </div>
                
                <div className="w-16 h-16 bg-light-gray rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-brand-green" />
                </div>

                <h3 className="text-heading-medium font-semibold text-dark-gray mb-4">
                  {step.title}
                </h3>
                
                <p className="text-medium-gray mb-6">
                  {step.description}
                </p>

                {step.code && (
                  <div className="bg-light-gray rounded-lg p-4">
                    <code className="text-sm text-dark-gray font-mono">
                      {step.code}
                    </code>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}