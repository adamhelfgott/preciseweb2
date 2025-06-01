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
  // Channel and measurement terms with varied styles
  const terms = [
    { 
      id: "ctv", 
      name: "CTV", 
      angle: 0, 
      radius: 140,
      size: "text-lg",
      weight: "font-black",
      gradient: "from-electric-blue to-brand-green",
      outlined: false,
    },
    { 
      id: "display", 
      name: "Display", 
      angle: 45, 
      radius: 160,
      size: "text-base",
      weight: "font-bold",
      gradient: "from-warm-coral to-golden-amber",
      outlined: true,
    },
    { 
      id: "audio", 
      name: "Audio", 
      angle: 90, 
      radius: 150,
      size: "text-xl",
      weight: "font-extrabold",
      gradient: "from-soft-lavender to-electric-blue",
      outlined: false,
    },
    { 
      id: "dooh", 
      name: "DOOH", 
      angle: 135, 
      radius: 170,
      size: "text-sm",
      weight: "font-black",
      gradient: "from-golden-amber to-warm-coral",
      outlined: true,
    },
    { 
      id: "outcomes", 
      name: "Outcomes", 
      angle: 180, 
      radius: 140,
      size: "text-base",
      weight: "font-extrabold",
      gradient: "from-brand-green to-electric-blue",
      outlined: false,
    },
    { 
      id: "measurement", 
      name: "Measurement", 
      angle: 225, 
      radius: 160,
      size: "text-xs",
      weight: "font-bold",
      gradient: "from-electric-blue to-soft-lavender",
      outlined: true,
    },
    { 
      id: "social", 
      name: "Social", 
      angle: 270, 
      radius: 150,
      size: "text-lg",
      weight: "font-black",
      gradient: "from-warm-coral to-brand-green",
      outlined: false,
    },
    { 
      id: "mobile", 
      name: "Mobile", 
      angle: 315, 
      radius: 170,
      size: "text-base",
      weight: "font-extrabold",
      gradient: "from-soft-lavender to-golden-amber",
      outlined: true,
    },
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

      {/* Floating terms */}
      {terms.map((term, index) => {
        const angleRad = (term.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * term.radius;
        const y = Math.sin(angleRad) * term.radius;
        
        return (
          <motion.div
            key={term.id}
            className="absolute"
            animate={{
              x: [x, x + 10, x - 10, x],
              y: [y, y - 10, y + 10, y],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4 + (index * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {term.outlined ? (
              <div className="relative">
                <span 
                  className={`${term.size} ${term.weight} text-dark-gray`}
                  style={{
                    WebkitTextStroke: '1.5px #2D3436',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {term.name}
                </span>
                <span 
                  className={`${term.size} ${term.weight} text-transparent bg-clip-text bg-gradient-to-r ${term.gradient} absolute inset-0`}
                  style={{
                    WebkitTextStroke: '0.5px transparent',
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {term.name}
                </span>
              </div>
            ) : (
              <span 
                className={`${term.size} ${term.weight} text-transparent bg-clip-text bg-gradient-to-r ${term.gradient}`}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                {term.name}
              </span>
            )}
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