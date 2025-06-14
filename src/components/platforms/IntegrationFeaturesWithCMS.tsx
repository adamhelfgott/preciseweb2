"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Gauge, Lock, RefreshCw, LucideIcon } from "lucide-react";
import Link from "next/link";
import { platformFeaturesQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  code2: Code2,
  gauge: Gauge,
  lock: Lock,
  refresh: RefreshCw,
  refreshcw: RefreshCw,
};

interface Feature {
  title: string;
  description: string;
  icon: string;
  code: string;
}

interface IntegrationFeaturesData {
  headline: string;
  subheadline: string;
  items: Feature[];
}

// Fallback data
const fallbackData: IntegrationFeaturesData = {
  headline: "Developer-friendly integration",
  subheadline: "Get up and running in days, not months",
  items: [
    {
      title: "API-First Architecture",
      description: "RESTful APIs and webhooks for seamless integration. SDKs available for major languages.",
      icon: "code2",
      code: `// Example: Activate audience segment
const segment = await precise.segments.activate({
  id: 'fitness_enthusiasts_q1',
  dsp: 'dv360',
  budget: 50000
});`
    },
    {
      title: "Real-Time Performance Data",
      description: "Stream attribution data as campaigns run. No more waiting for batch reports.",
      icon: "gauge",
      code: `// Subscribe to performance updates
precise.performance.subscribe({
  campaignId: 'abc123',
  onUpdate: (metrics) => {
    console.log('CAC:', metrics.cac);
    console.log('ROAS:', metrics.roas);
  }
});`
    },
    {
      title: "Privacy-Preserving Matching",
      description: "Match users without handling PII. All processing happens in secure enclaves.",
      icon: "lock",
      code: `// Secure audience matching
const matched = await precise.match({
  audience: hashedEmails,
  method: 'sha256',
  enclave: true
});`
    },
    {
      title: "Automated Reconciliation",
      description: "Handle billing and attribution across multiple data providers automatically.",
      icon: "refreshcw",
      code: `// Get attribution breakdown
const attribution = await precise.attribution.get({
  campaignId: 'abc123',
  model: 'shapley'
});`
    }
  ]
};

export default function IntegrationFeaturesWithCMS() {
  const [data, setData] = useState<IntegrationFeaturesData>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(platformFeaturesQuery);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching integration features data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="section-padding bg-soft-white">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-8 bg-silk-gray rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-silk-gray rounded w-1/2 mx-auto mb-16"></div>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-silk-gray rounded-2xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {data.items.map((feature, index) => {
            const Icon = iconMap[feature.icon.toLowerCase()] || Code2;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-silk-gray overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-golden-amber to-golden-amber/70 p-2 flex-shrink-0">
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-gray mb-2">{feature.title}</h3>
                      <p className="text-sm text-medium-gray">{feature.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Code example */}
                <div className="bg-dark-gray text-white p-4 font-mono text-xs overflow-x-auto">
                  <pre>{feature.code}</pre>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-heading-large font-semibold text-dark-gray mb-4">
            Ready to differentiate your platform?
          </h3>
          <p className="text-medium-gray mb-8 max-w-2xl mx-auto">
            Join leading platforms already offering verified data collaboration to their clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/developers" className="btn-primary">
              Explore documentation
            </Link>
            <Link href="/contact" className="btn-secondary">
              Schedule integration call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}