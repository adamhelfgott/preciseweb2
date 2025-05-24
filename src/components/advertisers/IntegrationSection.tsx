"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function IntegrationSection() {
  const platforms = [
    {
      name: "MadHive",
      details: ["Native integration", "Real-time sync", "Embedded dashboards"],
      featured: true,
    },
    {
      name: "The Trade Desk",
      details: ["API integration", "Audience sync"],
      featured: false,
    },
    {
      name: "Amazon DSP",
      details: ["Direct integration", "Performance sync"],
      featured: false,
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
            Works with your existing platforms
          </h2>
          <p className="text-body-large text-medium-gray">
            Access verified audiences through the DSPs you already use
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card ${platform.featured ? "border-brand-green shadow-lg" : ""}`}
            >
              {platform.featured && (
                <div className="inline-block px-3 py-1 bg-brand-green text-white text-sm font-medium rounded-full mb-4">
                  Recommended
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-dark-gray mb-4">
                {platform.name}
              </h3>
              
              <ul className="space-y-2 mb-6">
                {platform.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-medium-gray">{detail}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={`/integrations/${platform.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-brand-green hover:text-dark-gray transition-colors duration-200 font-medium"
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}