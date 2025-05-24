"use client";

import { motion } from "framer-motion";

export default function LogoBar() {
  const logos = [
    "MadHive",
    "The Trade Desk",
    "LiveRamp",
    "Snowflake",
    "Databricks",
  ];

  return (
    <section className="py-16 bg-light-gray">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-medium-gray mb-8"
        >
          Trusted by industry leaders
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-medium-gray hover:text-dark-gray transition-colors duration-200"
            >
              <span className="text-xl font-medium">{logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}