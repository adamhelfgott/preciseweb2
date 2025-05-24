"use client";

import { motion } from "framer-motion";

export default function ValuePropsSection() {
  const props = [
    {
      icon: "🆓",
      title: "Free to proof",
      description: "Start minting verified credentials instantly. No contracts, no setup fees. First 1M events/month free forever.",
    },
    {
      icon: "🧮",
      title: "Fair value distribution",
      description: "Shapley values mathematically calculate each contributor's share. Every data source gets paid based on actual impact.",
    },
    {
      icon: "🪙",
      title: "LCVT staking rewards",
      description: "Earn tokens for providing quality data. Stake on high-performing cohorts for additional yield. Optional but lucrative.",
    },
    {
      icon: "🤖",
      title: "Agent-ready APIs",
      description: "Built for AI agents to discover, verify, and activate data across commoditized DSPs. Simple APIs, complex capabilities.",
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
          <h2 className="text-display-medium font-bold text-dark-gray">
            Stripe for proof-stamped data
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl mb-4">{prop.icon}</div>
              <h3 className="text-heading-medium font-semibold text-dark-gray mb-3">
                {prop.title}
              </h3>
              <p className="text-medium-gray">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}