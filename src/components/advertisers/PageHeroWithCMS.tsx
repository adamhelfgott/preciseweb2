"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { advertisersHeroQuery } from "@/sanity/lib/queries";

type HeroData = {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  animationTerms?: string[];
};

export default function PageHeroWithCMS() {
  // Fetch hero data from Sanity
  const { data: heroData } = useSanityData<HeroData>(advertisersHeroQuery);

  // Fallback to hardcoded content
  const hero = heroData || {
    headline: "Verified data activation. Exceptional performance.",
    subheadline: "Activate premium data segments with confidence. Reduce CAC with data you can actually rely on. Built-in verification eliminates data quality surprises and optimizes campaigns in real-time with cryptographic validation of every action.",
    primaryButtonText: "Activate campaigns",
    primaryButtonHref: "/get-started",
  };

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
              {hero.headline.includes('.') ? (
                <>
                  {hero.headline.split('.')[0]}.
                  <br />
                  <span className="text-gradient">{hero.headline.split('.')[1]}</span>
                </>
              ) : (
                <span className="text-gradient">{hero.headline}</span>
              )}
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={hero.primaryButtonHref} className="btn-primary">
                {hero.primaryButtonText}
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
            <AttributionFlowVisualization animationTerms={hero.animationTerms} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AttributionFlowVisualization({ animationTerms }: { animationTerms?: string[] }) {
  // Default terms if not provided from CMS
  const defaultTerms = [
    { 
      id: "ctv", 
      name: "CTV", 
      angle: 0, 
      radius: 140,
      size: "text-lg",
      weight: "font-black",
      gradient: "from-electric-blue to-brand-green",
      type: "channel",
    },
    { 
      id: "1st-party", 
      name: "1st Party", 
      angle: 30, 
      radius: 180,
      size: "text-sm",
      weight: "font-bold",
      gradient: "from-warm-coral to-golden-amber",
      type: "data",
    },
    { 
      id: "display", 
      name: "Display", 
      angle: 60, 
      radius: 160,
      size: "text-base",
      weight: "font-extrabold",
      gradient: "from-soft-lavender to-electric-blue",
      type: "channel",
    },
    { 
      id: "behavioral", 
      name: "Behavioral", 
      angle: 90, 
      radius: 170,
      size: "text-xs",
      weight: "font-black",
      gradient: "from-golden-amber to-warm-coral",
      type: "data",
    },
    { 
      id: "social", 
      name: "Social", 
      angle: 120, 
      radius: 150,
      size: "text-xl",
      weight: "font-bold",
      gradient: "from-brand-green to-electric-blue",
      type: "channel",
    },
    { 
      id: "3rd-party", 
      name: "3rd Party", 
      angle: 150, 
      radius: 190,
      size: "text-sm",
      weight: "font-extrabold",
      gradient: "from-electric-blue to-soft-lavender",
      type: "data",
    },
    { 
      id: "dooh", 
      name: "DOOH", 
      angle: 180, 
      radius: 140,
      size: "text-base",
      weight: "font-black",
      gradient: "from-warm-coral to-brand-green",
      type: "channel",
    },
    { 
      id: "cac", 
      name: "↓34% CAC", 
      angle: 210, 
      radius: 170,
      size: "text-lg",
      weight: "font-extrabold",
      gradient: "from-brand-green to-golden-amber",
      type: "outcome",
    },
    { 
      id: "audio", 
      name: "Audio", 
      angle: 240, 
      radius: 155,
      size: "text-base",
      weight: "font-bold",
      gradient: "from-soft-lavender to-golden-amber",
      type: "channel",
    },
    { 
      id: "roas", 
      name: "4.2x ROAS", 
      angle: 270, 
      radius: 180,
      size: "text-sm",
      weight: "font-black",
      gradient: "from-electric-blue to-warm-coral",
      type: "outcome",
    },
    { 
      id: "mobile", 
      name: "Mobile", 
      angle: 300, 
      radius: 160,
      size: "text-lg",
      weight: "font-extrabold",
      gradient: "from-golden-amber to-brand-green",
      type: "channel",
    },
    { 
      id: "verified", 
      name: "Verified ✓", 
      angle: 330, 
      radius: 145,
      size: "text-base",
      weight: "font-bold",
      gradient: "from-brand-green to-electric-blue",
      type: "outcome",
    },
  ];

  // If CMS provides custom terms, use them
  const allTerms = animationTerms && animationTerms.length > 0 
    ? animationTerms.map((term, index) => ({
        id: term.toLowerCase().replace(/\s+/g, '-'),
        name: term,
        angle: (index * 360) / animationTerms.length,
        radius: 140 + (index % 3) * 20,
        size: ["text-sm", "text-base", "text-lg"][index % 3],
        weight: ["font-bold", "font-extrabold", "font-black"][index % 3],
        gradient: [
          "from-electric-blue to-brand-green",
          "from-warm-coral to-golden-amber",
          "from-soft-lavender to-electric-blue",
          "from-golden-amber to-warm-coral",
          "from-brand-green to-electric-blue",
        ][index % 5],
        type: "custom",
      }))
    : defaultTerms;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Central Precise logo */}
      <motion.div
        className="absolute w-20 h-20 flex items-center justify-center z-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
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

      {/* All floating terms */}
      {allTerms.map((term, index) => {
        const angleRad = (term.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * term.radius;
        const y = Math.sin(angleRad) * term.radius;
        
        return (
          <motion.div
            key={term.id}
            className="absolute"
            animate={{
              x: [
                x,
                x + Math.random() * 30 - 15,
                x - Math.random() * 30 + 15,
                x,
              ],
              y: [
                y,
                y - Math.random() * 30 + 15,
                y + Math.random() * 30 - 15,
                y,
              ],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.span 
              className={`${term.size} ${term.weight} text-transparent bg-clip-text bg-gradient-to-r ${term.gradient} inline-block`}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              {term.name}
            </motion.span>
          </motion.div>
        );
      })}

      {/* Playful floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: ['#0984E3', '#00B894', '#FF6B6B', '#A29BFE', '#FDCB6E'][i % 5],
          }}
          animate={{
            x: [
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
            ],
            y: [
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
              Math.random() * 400 - 200,
            ],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
    </div>
  );
}