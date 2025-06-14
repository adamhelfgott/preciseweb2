"use client";

import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { logoBarQuery } from "@/sanity/lib/queries";
import Image from "next/image";

type LogoBarData = {
  headline: string;
  logos: Array<{
    name: string;
    imageUrl?: string;
  }>;
};

export default function LogoBarWithCMS() {
  // Fetch logo bar data from Sanity
  const { data: logoBarData } = useSanityData<LogoBarData>(logoBarQuery);

  // Fallback to hardcoded content
  const data = logoBarData || {
    headline: "Our Partners",
    logos: []
  };

  // Don't show this section if we don't have any logos to display
  if (data.logos.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12 bg-light-gray">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-medium-gray mb-8"
        >
          {data.headline}
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {data.logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-medium-gray hover:text-dark-gray transition-all duration-200 hover:scale-105"
            >
              {logo.imageUrl ? (
                <Image
                  src={logo.imageUrl}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200"
                />
              ) : (
                <span className="text-xl font-medium">{logo.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}