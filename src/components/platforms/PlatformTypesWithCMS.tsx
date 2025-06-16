"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Cloud, LucideIcon } from "lucide-react";
import { platformTypesQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  cpu: Cpu,
  database: Database,
  cloud: Cloud,
};

interface PlatformType {
  name: string;
  description: string;
  icon: string;
  benefits: string[];
  integration: {
    time: string;
    method: string;
  };
}

interface PlatformTypesData {
  headline: string;
  subheadline: string;
  types: PlatformType[];
}

// Fallback data
const fallbackData: PlatformTypesData = {
  headline: "Built for every platform type",
  subheadline: "Native integrations for DSPs, DMPs, and CDPs",
  types: [
    {
      name: "DSPs",
      description: "Offer verified audiences with built-in attribution to your advertisers",
      icon: "cpu",
      benefits: [
        "Premium inventory differentiation",
        "Higher win rates with verified data",
        "Transparent performance reporting",
        "Automated billing reconciliation"
      ],
      integration: {
        time: "Real-time",
        method: "bidding integration"
      }
    },
    {
      name: "DMPs",
      description: "Enable privacy-preserving data collaboration and monetization",
      icon: "database",
      benefits: [
        "Federated data activation",
        "Performance-based pricing",
        "Multi-party attribution",
        "Quality scoring system"
      ],
      integration: {
        time: "Segment",
        method: "sync and activation"
      }
    },
    {
      name: "CDPs",
      description: "Help brands monetize their data while maintaining control",
      icon: "cloud",
      benefits: [
        "New revenue streams for clients",
        "Privacy-safe collaboration",
        "Closed-loop attribution",
        "First-party enrichment"
      ],
      integration: {
        time: "Event",
        method: "streaming and identity"
      }
    }
  ]
};

// Platform examples (static - not from CMS)
const platformExamples: Record<string, string[]> = {
  "DSPs": ["DV360", "Amazon DSP", "The Trade Desk", "Adobe DSP"],
  "DMPs": ["Adobe Audience Manager", "Oracle BlueKai", "Lotame", "Salesforce DMP"],
  "CDPs": ["Segment", "mParticle", "Treasure Data", "Adobe CDP"],
};

// Platform titles (static - not from CMS)
const platformTitles: Record<string, string> = {
  "DSPs": "Demand-Side Platforms",
  "DMPs": "Data Management Platforms",
  "CDPs": "Customer Data Platforms",
};

export default function PlatformTypesWithCMS() {
  const [data, setData] = useState<PlatformTypesData>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(platformTypesQuery);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching platform types data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-8 bg-silk-gray rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-silk-gray rounded w-1/2 mx-auto mb-16"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-silk-gray rounded-2xl h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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

        <div className="space-y-8">
          {data.types.map((platform, index) => {
            const Icon = iconMap[platform.icon] || Cpu;
            const examples = platformExamples[platform.name] || [];
            const title = platformTitles[platform.name] || platform.name;
            
            return (
              <motion.div
                key={platform.name}
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
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <p className="text-golden-amber font-medium text-sm mb-1">{platform.name}</p>
                        <h3 className="text-heading-large font-bold text-dark-gray">
                          {title}
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
                        {examples.map((example) => (
                          <p key={example} className="text-sm text-medium-gray">{example}</p>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-silk-gray">
                      <p className="text-sm font-medium text-brand-green">
                        {platform.integration.time} {platform.integration.method}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}