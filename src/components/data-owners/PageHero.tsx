"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PageHero() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-green font-medium mb-4">For Data Controllers</p>
            
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              Turn your data into a{" "}
              <span className="text-gradient">performance powerhouse</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              Activate your data across more channels while maintaining control. 
              Prove performance impact to command premium prices. Automated attribution 
              shows exactly how your data drives campaign results — with proof.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started" className="btn-primary">
                Prove value
                <ArrowRight size={20} />
              </Link>
              <Link href="#performance" className="btn-secondary">
                See performance benefits
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <DataAssetVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DataAssetVisualization() {
  return (
    <div className="relative w-full h-[500px]">
      {/* Data blocks floating */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 bg-gradient-to-br from-brand-green/20 to-bright-purple/20 rounded-lg"
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${20 + Math.floor(i / 3) * 30}%`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-4 text-xs text-medium-gray font-mono">
            {["users", "events", "preferences", "behavior", "context", "signals"][i]}
          </div>
        </motion.div>
      ))}

      {/* Central verification badge */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="text-brand-green">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}