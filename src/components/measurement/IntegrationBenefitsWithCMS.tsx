"use client";

import { motion } from "framer-motion";
import { Link2, Shield, BarChart3, Zap, Users, Award } from "lucide-react";
import { useSanityData } from "@/hooks/useSanityData";
import { measurementBenefitsQuery } from "@/sanity/lib/queries";

// Icon mapping for Sanity icon strings
const iconMap: Record<string, React.ElementType> = {
  link2: Link2,
  shield: Shield,
  barChart3: BarChart3,
  zap: Zap,
  users: Users,
  award: Award,
};

type BenefitItem = {
  title: string;
  description: string;
  icon: string;
  features?: string[];
};

type BenefitsData = {
  headline: string;
  subheadline: string;
  items: BenefitItem[];
};

export default function IntegrationBenefitsWithCMS() {
  // Fetch benefits data from Sanity
  const { data: benefitsData } = useSanityData<BenefitsData>(measurementBenefitsQuery);

  // Fallback to hardcoded content
  const fallbackBenefits = [
    {
      icon: "link2",
      title: "Deterministic Data Signals",
      description: "Access verified first-party signals to enhance probabilistic models with ground truth data.",
      features: ["87% accuracy improvement"],
    },
    {
      icon: "shield",
      title: "Privacy-Preserving Integration",
      description: "Connect to data sources without handling PII. All matching happens in secure enclaves.",
      features: ["100% GDPR compliant"],
    },
    {
      icon: "barChart3",
      title: "Multi-Party Attribution",
      description: "Fairly attribute value across all data contributors using Valence Enhanced Shapley.",
      features: ["3-way+ attribution"],
    },
    {
      icon: "zap",
      title: "Real-Time Signal Updates",
      description: "Get streaming updates as campaigns run, not batch uploads weeks later.",
      features: ["<1hr data freshness"],
    },
    {
      icon: "users",
      title: "Expanded Client Base",
      description: "Offer enhanced attribution to brands that need verified data collaboration.",
      features: ["45% more serviceable market"],
    },
    {
      icon: "award",
      title: "Competitive Differentiation",
      description: "Be the only measurement provider that can prove impact with verified signals.",
      features: ["Premium pricing power"],
    },
  ];

  const data = benefitsData || {
    headline: "Why measurement partners choose Precise",
    subheadline: "Enhance your attribution solutions with verified data signals",
    items: fallbackBenefits,
  };

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
            {data.headline}
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            {data.subheadline}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Link2;
            
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 hover:shadow-lg transition-all">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-soft-lavender to-soft-lavender/70 p-2.5 mb-4">
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-medium-gray mb-4">
                    {benefit.description}
                  </p>
                  
                  {/* Value metric */}
                  {benefit.features && benefit.features.length > 0 && (
                    <div className="pt-4 border-t border-silk-gray">
                      <span className="text-soft-lavender font-semibold">
                        {benefit.features[0]}
                      </span>
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