"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, FileCode, Lightbulb } from "lucide-react";

export default function GettingStarted() {
  const options = [
    {
      icon: Rocket,
      title: "Quick start",
      description: "Get up and running with our SDK in under 5 minutes",
      link: "/developers/quickstart",
    },
    {
      icon: FileCode,
      title: "Integration guides",
      description: "Step-by-step guides for popular platforms",
      link: "/developers/integrations",
    },
    {
      icon: Lightbulb,
      title: "Examples",
      description: "Sample applications and common patterns",
      link: "/developers/examples",
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
          <h2 className="text-display-medium font-bold text-dark-gray">
            Get started in minutes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={option.link} className="card block hover:border-brand-green transition-colors group h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-brand-green" />
                  </div>
                  
                  <h3 className="text-heading-medium font-semibold text-dark-gray mb-3">
                    {option.title}
                  </h3>
                  
                  <p className="text-medium-gray mb-6">
                    {option.description}
                  </p>
                  
                  <span className="text-brand-green font-medium group-hover:text-dark-gray transition-colors">
                    {option.title === "Quick start" ? "Start building" : option.title === "Integration guides" ? "View guides" : "Browse examples"} →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}