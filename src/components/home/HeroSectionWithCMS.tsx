"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { heroSectionQuery } from "@/sanity/lib/queries";

type HeroData = {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
};

export default function HeroSectionWithCMS() {
  // Fetch hero data from Sanity
  const { data: heroData } = useSanityData<HeroData>(heroSectionQuery);

  // Fallback to hardcoded content
  const hero = heroData || {
    headline: "Verified Activation for Modern Marketing",
    subheadline: "Where trusted data meets exceptional performance. Precise enables secure data collaboration that drives real results — with cryptographic validation of every action, from source to outcome.",
    primaryButtonText: "Activate Campaigns",
    primaryButtonHref: "/get-started",
    secondaryButtonText: "Prove Value",
    secondaryButtonHref: "/how-it-works",
  };

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
              {hero.headline.split(' ').slice(0, 2).join(' ')}{" "}
              <span className="text-gradient">{hero.headline.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href={hero.primaryButtonHref} className="btn-primary">
                {hero.primaryButtonText}
                <ArrowRight size={20} />
              </Link>
              <Link href={hero.secondaryButtonHref} className="btn-secondary">
                {hero.secondaryButtonText}
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
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central hub */}
      <motion.div
        className="absolute w-32 h-32 flex items-center justify-center z-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
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

      {/* Orbiting elements */}
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const baseAngle = (index * 60) * Math.PI / 180;
        const baseRadius = 150;
        
        return (
          <motion.div
            key={index}
            className="absolute w-12 h-12 flex items-center justify-center"
            animate={{
              x: [
                Math.cos(baseAngle) * baseRadius,
                Math.cos(baseAngle + 0.3) * (baseRadius + 20),
                Math.cos(baseAngle - 0.3) * (baseRadius - 20),
                Math.cos(baseAngle) * baseRadius,
              ],
              y: [
                Math.sin(baseAngle) * baseRadius,
                Math.sin(baseAngle + 0.3) * (baseRadius + 20),
                Math.sin(baseAngle - 0.3) * (baseRadius - 20),
                Math.sin(baseAngle) * baseRadius,
              ],
            }}
            transition={{
              duration: 8 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-24px',
              marginTop: '-24px',
            }}
          >
            <motion.div
              className="text-brand-green text-2xl font-light"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.5, 1, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            >
              +
            </motion.div>
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
              stroke="#00B894"
              strokeWidth="0.5"
              opacity="0.2"
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