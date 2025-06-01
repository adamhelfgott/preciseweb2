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
              Verified Activation{" "}
              <span className="text-gradient">for Modern Marketing</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              Where trusted data meets exceptional performance. Precise enables secure 
              data collaboration that drives real results — with cryptographic validation 
              of every action, from source to outcome.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/get-started" className="btn-primary">
                Activate Campaigns
                <ArrowRight size={20} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                Prove Value
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <TrustItem label="Lower CAC with verified data" />
              <TrustItem label="Premium pricing with proof" />
              <TrustItem label="Cryptographic validation" />
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

function TrustItem({ label }: { label: string }) {
  return (
    <div className="text-center">
      <p className="text-caption text-medium-gray">{label}</p>
    </div>
  );
}

function DataFlowAnimation() {
  // Data sources on the left
  const dataSources = [
    { name: "CRM", y: -60 },
    { name: "Web", y: 0 },
    { name: "App", y: 60 },
  ];

  // Campaign channels on the right
  const channels = [
    { name: "DSP", y: -60 },
    { name: "Social", y: 0 },
    { name: "CTV", y: 60 },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central Precise hub */}
      <motion.div
        className="absolute w-32 h-32 flex items-center justify-center z-20"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full">
          <img 
            src="/icon.svg" 
            alt="Precise" 
            className="w-full h-full"
          />
          {/* Verification badge */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center"
            animate={{
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Data sources (left) */}
      {dataSources.map((source, index) => (
        <motion.div
          key={source.name}
          className="absolute left-0 w-20 h-20 bg-white border-2 border-silk-gray rounded-xl flex flex-col items-center justify-center"
          style={{ top: `calc(50% + ${source.y}px - 40px)` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="text-xs font-medium text-medium-gray">{source.name}</div>
          <motion.div
            className="mt-1 w-2 h-2 bg-electric-blue rounded-full"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        </motion.div>
      ))}

      {/* Campaign channels (right) */}
      {channels.map((channel, index) => (
        <motion.div
          key={channel.name}
          className="absolute right-0 w-20 h-20 bg-white border-2 border-silk-gray rounded-xl flex flex-col items-center justify-center"
          style={{ top: `calc(50% + ${channel.y}px - 40px)` }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          <div className="text-xs font-medium text-medium-gray">{channel.name}</div>
          <motion.div
            className="mt-1 w-8 h-1 bg-brand-green rounded-full"
            animate={{
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        </motion.div>
      ))}

      {/* Data flow particles */}
      {[...Array(12)].map((_, index) => (
        <DataParticle key={index} index={index} />
      ))}

      {/* Attribution metrics */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full border border-silk-gray"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-medium-gray">CAC</span>
            <motion.span
              className="font-semibold text-brand-green"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              -34%
            </motion.span>
          </div>
          <div className="w-px h-4 bg-silk-gray" />
          <div className="flex items-center gap-2">
            <span className="text-medium-gray">ROAS</span>
            <motion.span
              className="font-semibold text-electric-blue"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
              }}
            >
              4.2x
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DataParticle({ index }: { index: number }) {
  const startSide = index % 2 === 0 ? 'left' : 'right';
  const targetY = [-60, 0, 60][index % 3];
  
  return (
    <motion.div
      className="absolute w-2 h-2 bg-brand-green rounded-full"
      style={{
        left: startSide === 'left' ? '90px' : 'auto',
        right: startSide === 'right' ? '90px' : 'auto',
        top: '50%',
      }}
      animate={{
        x: startSide === 'left' ? [0, 160, 320] : [0, -160, -320],
        y: [targetY, 0, targetY],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: index * 0.4,
        ease: "easeInOut",
      }}
    />
  );
}