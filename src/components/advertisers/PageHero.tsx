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
            <p className="text-brand-green font-medium mb-4">For Media Buyers</p>
            
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              Verified data activation.
              <br />
              <span className="text-gradient">Exceptional performance.</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              Activate premium data segments with confidence. Reduce CAC with data 
              you can actually rely on. Built-in verification eliminates data quality 
              surprises and optimizes campaigns in real-time with cryptographic validation 
              of every action.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started" className="btn-primary">
                Activate campaigns
                <ArrowRight size={20} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                See how it works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <AttributionFlowVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AttributionFlowVisualization() {
  return (
    <div className="relative w-full h-[500px]">
      {/* Data sources */}
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-20 h-20 bg-gradient-to-br from-brand-green/20 to-bright-purple/20 rounded-lg"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Central processing */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-32 h-32 bg-brand-green/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-brand-green">AI</span>
          </div>
        </div>
      </motion.div>

      {/* Outcomes */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <motion.div
          className="w-32 h-16 bg-brand-green rounded-lg flex items-center justify-center text-white font-medium"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Results
        </motion.div>
      </div>

      {/* Flow lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${100 + i * 150} 50 Q ${200 + i * 75} 250 200 400`}
            stroke="#1DB954"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>
    </div>
  );
}