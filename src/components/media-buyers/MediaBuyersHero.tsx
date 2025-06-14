"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MediaBuyersHero() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-electric-blue font-medium mb-4">For Media Buyers</p>
            
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              Drive better outcomes with{" "}
              <span className="text-gradient">verified audiences</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              Access premium data segments with built-in performance validation. 
              Optimize campaigns across the entire funnel with transparent attribution 
              that proves what's actually working.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started" className="btn-primary">
                Access audiences
                <ArrowRight size={20} />
              </Link>
              <Link href="#outcomes" className="btn-secondary">
                See all outcomes
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <OutcomesAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OutcomesAnimation() {
  const metrics = [
    { name: "CAC", value: "↓34%", color: "text-brand-green" },
    { name: "ROAS", value: "4.2x", color: "text-electric-blue" },
    { name: "LTV", value: "↑52%", color: "text-bright-purple" },
    { name: "Churn", value: "↓18%", color: "text-warm-coral" },
    { name: "Brand Lift", value: "+27%", color: "text-brand-green" },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central logo */}
      <motion.div
        className="absolute w-24 h-24 flex items-center justify-center z-20"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img 
          src="/icon.svg" 
          alt="Precise" 
          className="w-full h-full"
        />
      </motion.div>

      {/* Orbiting metrics */}
      {metrics.map((metric, index) => {
        const angle = (index * 72) * Math.PI / 180; // 360/5 = 72 degrees
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={metric.name}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [x * 0.8, x, x * 0.8],
              y: [y * 0.8, y, y * 0.8],
            }}
            transition={{
              opacity: { delay: index * 0.1 },
              scale: { delay: index * 0.1 },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="bg-white rounded-xl shadow-lg px-4 py-3 text-center">
              <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-xs text-medium-gray">{metric.name}</div>
            </div>
          </motion.div>
        );
      })}

      {/* Connecting particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-brand-green rounded-full"
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${50 + Math.cos((i * 36) * Math.PI / 180) * 60}%`,
            top: `${50 + Math.sin((i * 36) * Math.PI / 180) * 60}%`,
          }}
        />
      ))}
    </div>
  );
}