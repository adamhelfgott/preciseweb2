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
  // Simplified: Input → Precise → Output flow
  const dataTypes = ["1st Party", "3rd Party", "Behavioral"];
  const channels = ["CTV", "Social", "Display"];
  const outcomes = ["↓34% CAC", "4.2x ROAS", "Verified"];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central Precise logo with verification badge */}
      <motion.div
        className="absolute w-20 h-20 flex items-center justify-center z-20"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <img 
            src="/icon.svg" 
            alt="Precise" 
            className="w-full h-full"
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-green rounded-full flex items-center justify-center"
            animate={{
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Data types (left) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-4">
        {dataTypes.map((type, index) => (
          <motion.div
            key={type}
            className="text-sm font-medium text-medium-gray"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {type}
          </motion.div>
        ))}
      </div>

      {/* Channels (right) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4">
        {channels.map((channel, index) => (
          <motion.div
            key={channel}
            className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-brand-green"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {channel}
          </motion.div>
        ))}
      </div>

      {/* Flowing particles */}
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 3 === 0 ? '#0984E3' : i % 3 === 1 ? '#00B894' : '#FF6B6B',
          }}
          animate={{
            x: [-200, 0, 200],
            y: [(i % 3 - 1) * 60, 0, (i % 3 - 1) * 60],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}

      {/* Outcomes (bottom) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-8">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={outcome}
            className="text-sm font-semibold text-dark-gray bg-white px-4 py-2 rounded-full shadow-sm border border-silk-gray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {outcome}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}