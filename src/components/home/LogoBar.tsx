"use client";

import { motion } from "framer-motion";

export default function LogoBar() {
  // Only include actual partners/clients
  const logos: string[] = [
    // Add real partners here when confirmed
    // "Partner Name",
  ];

  // Don't show this section if we don't have any real logos to display
  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-light-gray">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-medium-gray mb-8"
        >
          Our Partners
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