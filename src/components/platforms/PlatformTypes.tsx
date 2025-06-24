"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Cloud } from "lucide-react";

export default function PlatformTypes() {
  const platforms = [
    {
      icon: Cpu,
      type: "DSPs",
      title: "Demand-Side Platforms",
      description: "Offer verified audiences with built-in attribution to your advertisers",
      benefits: [
        "Premium inventory differentiation",
        "Higher win rates with verified data",
        "Transparent performance reporting",
        "Automated billing reconciliation"
      ],
      examples: ["DV360", "Amazon DSP", "The Trade Desk", "Adobe DSP"],
      integration: "Real-time bidding integration",
    },
    {
      icon: Database,
      type: "DMPs",
      title: "Data Management Platforms",
      description: "Enable privacy-preserving data collaboration and monetization",
      benefits: [
        "Federated data activation",
        "Performance-based pricing",
        "Multi-party attribution",
        "Quality scoring system"
      ],
      examples: ["Adobe Audience Manager", "Oracle BlueKai", "Lotame", "Salesforce DMP"],
      integration: "Segment sync and activation",
    },
    {
      icon: Cloud,
      type: "CDPs",
      title: "Customer Data Platforms",
      description: "Help brands monetize their data while maintaining control",
      benefits: [
        "New revenue streams for clients",
        "Privacy-safe collaboration",
        "Closed-loop attribution",
        "First-party enrichment"
      ],
      examples: ["Segment", "mParticle", "Treasure Data", "Adobe CDP"],
      integration: "Event streaming and identity",
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
            Built for every platform type
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Native integrations for DSPs, DMPs, and CDPs
          </p>
        </motion.div>

        <div className="space-y-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-silk-gray overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="grid lg:grid-cols-5 gap-8 p-8">
                {/* Left: Type and icon */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-golden-amber to-golden-amber/70 p-3 flex-shrink-0">
                      <platform.icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <p className="text-golden-amber font-medium text-sm mb-1">{platform.type}</p>
                      <h3 className="text-heading-large font-bold text-dark-gray">
                        {platform.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-medium-gray mt-4">{platform.description}</p>
                </div>

                {/* Middle: Benefits */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-dark-gray mb-3">Key benefits</h4>
                  <ul className="space-y-2">
                    {platform.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-brand-green rounded-full" />
                        </div>
                        <span className="text-sm text-dark-gray">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Examples and integration */}
                <div className="lg:col-span-1">
                  <div className="mb-4">
                    <h4 className="font-semibold text-dark-gray mb-2">Examples</h4>
                    <div className="space-y-1">
                      {platform.examples.map((example) => (
                        <p key={example} className="text-sm text-medium-gray">{example}</p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-silk-gray">
                    <p className="text-sm font-medium text-brand-green">{platform.integration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}