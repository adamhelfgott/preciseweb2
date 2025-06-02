"use client";

import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { dataOwnersProcessQuery } from "@/sanity/lib/queries";

type ProcessData = {
  headline: string;
  subheadline: string;
  steps: Array<{
    title: string;
    description: string;
    duration?: string;
  }>;
};

export default function ProcessSectionWithCMS() {
  // Fetch process data from Sanity
  const { data: processData } = useSanityData<ProcessData>(dataOwnersProcessQuery);

  // Fallback to hardcoded content
  const process = processData || {
    headline: "Enable federated intelligence in three steps",
    subheadline: "Set up privacy-preserving collaboration without moving data",
    steps: [
      {
        title: "Install SDK in 5 minutes",
        description: "One line of code to start minting proofs. Works with any data infrastructure. Free for up to 1M events/month.",
        duration: "5 minutes"
      },
      {
        title: "Automatic proof minting",
        description: "Each data batch gets a Verifiable Credential with quality score, consent verification, and immutable hash on Alicenet. You also earn LCVT tokens for future staking.",
        duration: "Automatic"
      },
      {
        title: "Fair royalty distribution",
        description: "When campaigns use your data, Shapley values calculate your exact contribution. Royalties auto-split and deposit daily. No invoicing, no collections, just earnings.",
        duration: "Daily"
      }
    ]
  };

  return (
    <section className="section-padding bg-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            {process.headline}
          </h2>
          <p className="text-body-large text-medium-gray">
            {process.subheadline}
          </p>
        </motion.div>

        <div className="space-y-24">
          {process.steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              duration={step.duration}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  duration?: string;
  reverse?: boolean;
}

function ProcessStep({ number, title, description, duration, reverse }: ProcessStepProps) {
  // Visual content based on step number
  const getStepVisualContent = () => {
    switch (number) {
      case 1:
        return (
          <div className="bg-dark-gray text-white rounded-xl p-6 font-mono text-sm">
            <pre className="whitespace-pre-wrap">{`pip install precise-sdk

# That's it. Start minting:
from precise import mint_proof
proof = mint_proof(your_data)`}</pre>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-medium-gray mb-1">Minting time</p>
              <p className="text-lg font-semibold text-dark-gray">{"< 100ms per batch"}</p>
            </div>
            <div>
              <p className="text-sm text-medium-gray mb-1">LCVT earned</p>
              <p className="text-lg font-semibold text-dark-gray">1 token per 1K records</p>
            </div>
            <div>
              <p className="text-sm text-medium-gray mb-1">Quality scoring</p>
              <p className="text-lg font-semibold text-dark-gray">Automatic grading</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-medium-gray">Your share</span>
              <span className="text-2xl font-bold text-dark-gray">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-medium-gray">Precise fee</span>
              <span className="text-2xl font-bold text-dark-gray">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-medium-gray">Network fee</span>
              <span className="text-2xl font-bold text-dark-gray">10%</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:grid-flow-col-dense" : ""}`}
    >
      <div className={reverse ? "lg:col-start-2" : ""}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
            {number}
          </div>
          <span className="text-medium-gray">Step {number}</span>
          {duration && (
            <span className="text-sm text-medium-gray bg-light-gray px-3 py-1 rounded-full">
              {duration}
            </span>
          )}
        </div>
        
        <h3 className="text-display-medium font-bold text-dark-gray mb-4">
          {title}
        </h3>
        
        <p className="text-body-large text-medium-gray mb-8">
          {description}
        </p>

        {getStepVisualContent()}
      </div>

      <div className={reverse ? "lg:col-start-1" : ""}>
        <StepVisual step={number} />
      </div>
    </motion.div>
  );
}

function StepVisual({ step }: { step: number }) {
  return (
    <div className="relative h-[400px] flex items-center justify-center">
      {step === 1 && <InstallVisual />}
      {step === 2 && <MintingVisual />}
      {step === 3 && <DistributionVisual />}
    </div>
  );
}

function InstallVisual() {
  return (
    <motion.div
      className="w-full max-w-md"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="bg-white shadow-xl rounded-xl p-8 border border-silk-gray">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-warm-coral rounded-full" />
          <div className="w-3 h-3 bg-[#FFBD2E] rounded-full" />
          <div className="w-3 h-3 bg-brand-green rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-light-gray rounded w-3/4" />
          <div className="h-4 bg-light-gray rounded w-1/2" />
          <div className="h-4 bg-brand-green/20 rounded w-full" />
        </div>
      </div>
    </motion.div>
  );
}

function MintingVisual() {
  return (
    <div className="relative">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 bg-gradient-to-br from-brand-green/20 to-bright-purple/20 rounded-lg"
          style={{
            left: `${i * 40}px`,
            top: `${i * 20}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
      <motion.div
        className="relative z-10 w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="text-4xl">🪙</span>
      </motion.div>
    </div>
  );
}

function DistributionVisual() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-32 h-32 bg-brand-green rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
      {[0, 120, 240].map((angle, i) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 100;
        const y = Math.sin(radian) * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-white shadow-lg rounded-full"
            style={{
              left: `calc(50% + ${x}px - 32px)`,
              top: `calc(50% + ${y}px - 32px)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
}