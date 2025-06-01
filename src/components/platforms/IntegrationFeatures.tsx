"use client";

import { motion } from "framer-motion";
import { Code2, Gauge, Lock, RefreshCw } from "lucide-react";

export default function IntegrationFeatures() {
  const features = [
    {
      icon: Code2,
      title: "API-First Architecture",
      description: "RESTful APIs and webhooks for seamless integration. SDKs available for major languages.",
      code: `// Example: Activate audience segment
const segment = await precise.segments.activate({
  id: 'fitness_enthusiasts_q1',
  dsp: 'dv360',
  budget: 50000
});`,
    },
    {
      icon: Gauge,
      title: "Real-Time Performance Data",
      description: "Stream attribution data as campaigns run. No more waiting for batch reports.",
      code: `// Subscribe to performance updates
precise.performance.subscribe({
  campaignId: 'abc123',
  onUpdate: (metrics) => {
    console.log('CAC:', metrics.cac);
    console.log('ROAS:', metrics.roas);
  }
});`,
    },
    {
      icon: Lock,
      title: "Privacy-Preserving Matching",
      description: "Match users without handling PII. All processing happens in secure enclaves.",
      code: `// Secure audience matching
const matched = await precise.match({
  audience: hashedEmails,
  method: 'sha256',
  enclave: true
});`,
    },
    {
      icon: RefreshCw,
      title: "Automated Reconciliation",
      description: "Handle billing and attribution across multiple data providers automatically.",
      code: `// Get attribution breakdown
const attribution = await precise.attribution.get({
  campaignId: 'abc123',
  model: 'shapley'
});`,
    },
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
            Developer-friendly integration
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Get up and running in days, not months
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
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
                    <feature.icon className="w-full h-full text-white" />
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
          ))}
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

// Adding missing import
import Link from "next/link";