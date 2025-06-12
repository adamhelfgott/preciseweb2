"use client";

import { motion } from "framer-motion";
import { Database, Shield, Zap, BarChart, Lock, Cpu } from "lucide-react";
import { useSanityData } from "@/hooks/useSanityData";
import { howItWorksQuery } from "@/sanity/lib/queries";

// Icon mapping
const iconMap: Record<string, any> = {
  Database,
  Shield,
  Zap,
  BarChart,
  Lock,
  Cpu,
};

type HowItWorksData = {
  headline: string;
  subheadline: string;
  steps: Array<{
    title: string;
    description: string;
    icon: string;
    features?: string[];
  }>;
};

export default function HowItWorksSectionWithCMS() {
  // Fetch data from Sanity
  const { data: howItWorksData } = useSanityData<HowItWorksData>(howItWorksQuery);

  // Fallback to hardcoded content
  const data = howItWorksData || {
    headline: "Built for the agent-driven future",
    subheadline: "Enable verified data flows without moving raw data",
    steps: [
      {
        title: "Connect your data",
        description: "Keep data in your existing infrastructure. Our SDK creates cryptographic proofs without accessing raw records.",
        icon: "Database",
        features: ["precise.mint(yourData)"],
      },
      {
        title: "Generate verified credentials",
        description: "Cryptographic proofs verify quality and consent. DSPs and AI agents can trust your data without seeing it.",
        icon: "Shield",
      },
      {
        title: "Track value attribution",
        description: "As campaigns run across commoditized DSPs, see exactly how your data contributes to outcomes. Automatic value distribution.",
        icon: "Zap",
      },
    ],
  };

  return (
    <section className="py-12 sm:py-16 md:py-20">
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
          <p className="text-body-large text-medium-gray">
            {data.subheadline}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Database;
            
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="card h-full">
                  <div className="text-6xl font-bold text-silk-gray mb-6">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="w-16 h-16 bg-light-gray rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-brand-green" />
                  </div>

                  <h3 className="text-heading-medium font-semibold text-dark-gray mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-medium-gray mb-6">
                    {step.description}
                  </p>

                  {step.features && step.features.length > 0 && (
                    <div className="bg-light-gray rounded-lg p-4">
                      <code className="text-sm text-dark-gray font-mono">
                        {step.features[0]}
                      </code>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}