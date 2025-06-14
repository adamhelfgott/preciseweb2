"use client";

import { motion } from "framer-motion";

export default function VerificationFlow() {
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
            How verification drives performance
          </h2>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Every audience segment comes with built-in performance validation
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Flow visualization */}
          <div className="relative">
            {/* Steps */}
            {[
              {
                step: 1,
                title: "Select Audiences",
                description: "Browse verified segments with quality scores and performance history",
              },
              {
                step: 2,
                title: "Activate Campaigns",
                description: "Deploy across any DSP or platform with one-click activation",
              },
              {
                step: 3,
                title: "Track Attribution",
                description: "Real-time performance tracking with multi-touch attribution",
              },
              {
                step: 4,
                title: "Optimize & Scale",
                description: "AI recommendations for budget allocation and audience expansion",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-8 mb-12 ${
                  index % 2 === 1 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? "text-right" : ""}`}>
                  <h3 className="text-heading-medium font-semibold text-dark-gray mb-2">
                    {item.title}
                  </h3>
                  <p className="text-medium-gray">{item.description}</p>
                </div>

                {/* Step indicator */}
                <div className="relative">
                  <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-brand-green/30" />
                  )}
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-2xl"
          >
            <h3 className="text-heading-large font-semibold text-dark-gray mb-4">
              See the difference verified data makes
            </h3>
            <p className="text-medium-gray mb-6">
              Join leading brands and agencies already driving better outcomes with Precise
            </p>
            <Link href="/demo" className="btn-primary">
              Request a demo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Adding the missing import
import Link from "next/link";