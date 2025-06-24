"use client";

import { motion } from "framer-motion";
import { Briefcase, Building, Cpu } from "lucide-react";
import Link from "next/link";

export default function BuyerTypeSelection() {
  const buyerTypes = [
    {
      icon: Briefcase,
      title: "Agencies",
      description: "Manage multiple clients with unified dashboards and cross-account insights",
      features: [
        "Multi-client campaign management",
        "White-label reporting",
        "Cross-account learnings",
        "Team collaboration tools"
      ],
      cta: "Agency solutions",
      href: "/agency-solutions",
      color: "from-electric-blue to-brand-green",
    },
    {
      icon: Building,
      title: "Brand Marketers",
      description: "Drive growth with first-party data enrichment and verified audiences",
      features: [
        "First-party data activation",
        "Lookalike expansion",
        "Closed-loop attribution",
        "Privacy-safe targeting"
      ],
      cta: "Brand solutions",
      href: "/brand-solutions",
      color: "from-warm-coral to-golden-amber",
    },
    {
      icon: Cpu,
      title: "DSPs & Platforms",
      description: "Integrate verified audiences and attribution directly into your platform",
      features: [
        "API-first integration",
        "Real-time segment sync",
        "Performance scoring",
        "Billing reconciliation"
      ],
      cta: "Platform integration",
      href: "/platforms",
      color: "from-soft-lavender to-electric-blue",
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
            Solutions for every media buyer
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Whether you're an agency, brand, or platform, we have the tools you need
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {buyerTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl border border-silk-gray p-8 hover:shadow-lg transition-all flex flex-col">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} p-3 mb-6`}>
                  <type.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-heading-large font-bold text-dark-gray mb-3">
                  {type.title}
                </h3>
                <p className="text-medium-gray mb-6">{type.description}</p>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {type.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-brand-green rounded-full" />
                      </div>
                      <span className="text-sm text-dark-gray">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link 
                  href={type.href}
                  className="inline-flex items-center text-brand-green font-medium hover:text-dark-gray transition-colors"
                >
                  {type.cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}