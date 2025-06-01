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
  // Campaign types
  const campaigns = [
    { id: "social", name: "Social", color: "from-electric-blue to-electric-blue/70" },
    { id: "display", name: "Display", color: "from-warm-coral to-warm-coral/70" },
    { id: "ctv", name: "CTV/OTT", color: "from-soft-lavender to-soft-lavender/70" },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central Precise logo */}
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

      {/* Campaign boxes orbiting */}
      {campaigns.map((campaign, index) => {
        const angle = (index * 120) * Math.PI / 180;
        const radius = 160;
        
        return (
          <motion.div
            key={campaign.id}
            className="absolute"
            animate={{
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + 0.5) * radius,
                Math.cos(angle) * radius,
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + 0.5) * radius,
                Math.sin(angle) * radius,
              ],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-60px',
              marginTop: '-40px',
            }}
          >
            <div className={`w-28 h-20 bg-gradient-to-r ${campaign.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-white font-medium text-sm">{campaign.name}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Data flow indicators */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`flow-${i}`}
          className="absolute w-1 h-1 bg-brand-green rounded-full"
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 30}%`,
            top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 30}%`,
          }}
        />
      ))}

      {/* Performance metrics */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-silk-gray"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-green rounded-full" />
            <span className="text-sm text-medium-gray">Verified Data</span>
          </div>
          <div className="w-px h-4 bg-silk-gray" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-electric-blue rounded-full" />
            <span className="text-sm text-medium-gray">Real Attribution</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}