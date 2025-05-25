"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              Federated intelligence{" "}
              <span className="text-gradient">without data sharing</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              The privacy-preserving infrastructure that enables intelligent collaboration 
              between brands and intelligence users. Algorithms move to data, not the 
              other way around. Stay compliant, maintain control, unlock value.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/get-started" className="btn-primary">
                Enable federated intelligence
                <ArrowRight size={20} />
              </Link>
              <Link href="/developers" className="btn-secondary">
                View architecture
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <TrustItem icon="🔐" label="Zero data movement" />
              <TrustItem icon="🛡️" label="Maintain controller status" />
              <TrustItem icon="⚡" label="Query-based intelligence" />
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <DataFlowAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-caption text-medium-gray">{label}</p>
    </div>
  );
}

function DataFlowAnimation() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central hub */}
      <motion.div
        className="absolute w-32 h-32 bg-brand-green rounded-full flex items-center justify-center z-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-white font-bold text-3xl">P</span>
      </motion.div>

      {/* Orbiting elements */}
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = (index * 60) * Math.PI / 180;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-light-gray rounded-lg flex items-center justify-center"
            style={{
              left: `calc(50% + ${x}px - 32px)`,
              top: `calc(50% + ${y}px - 32px)`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="w-2 h-2 bg-brand-green rounded-full"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          </motion.div>
        );
      })}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index * 60) * Math.PI / 180;
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.line
              key={index}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke="#E5E5E7"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}