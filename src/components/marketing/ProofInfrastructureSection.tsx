"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, CheckCircle, FileCheck, Activity, Network } from "lucide-react";

export default function ProofInfrastructureSection() {
  const proofSteps = [
    {
      icon: FileCheck,
      title: "Creates cryptographic credentials from datasets",
      description: "We generate cryptographically secure credentials from your audience or dataset—proving who created it, when, and what's inside (without exposing the raw data). These credentials are tamper-proof and can be validated by any authorized partner.",
      highlight: "Tamper-proof credentials",
      color: "from-electric-blue to-brand-green"
    },
    {
      icon: Shield,
      title: "Issues privacy-safe \"proof transactions\" for activation and performance",
      description: "These tokens are created when a credential is used in a campaign. They serve as a verifiable receipt—showing how a segment was used, where it went, and what it helped drive—without revealing sensitive details.",
      highlight: "Verifiable receipts",
      color: "from-brand-green to-electric-blue"
    },
    {
      icon: Activity,
      title: "Tracks performance using distributed ledger technology",
      description: "Every data interaction is recorded in a tamper-resistant log, making it possible to prove ROI, segment contribution, and compliance in ways traditional ad tech systems can't.",
      highlight: "Immutable audit trail",
      color: "from-electric-blue to-bright-purple"
    },
    {
      icon: Network,
      title: "Supports identity coordination without centralization",
      description: "Instead of becoming a new identity graph, Precise integrates with existing ID providers—validating how identifiers are connected across partners while preserving data separation and ownership.",
      highlight: "Decentralized validation",
      color: "from-bright-purple to-electric-blue"
    }
  ];

  const proofTypes = [
    {
      title: "Proof of Origin",
      description: "Who created the segment, and what's in it?",
      icon: CheckCircle
    },
    {
      title: "Proof of Activation",
      description: "Was it actually used in the campaign?",
      icon: CheckCircle
    },
    {
      title: "Proof of Performance",
      description: "Did it work, and what part worked best?",
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-soft-white to-white">
      <div className="container max-w-6xl">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Shield className="w-20 h-20 text-brand-green mx-auto mb-8" />
          <h2 className="text-display-medium font-bold text-dark-gray mb-6">
            Precise's Patented Proof Infrastructure
          </h2>
          
          <p className="text-heading-medium font-semibold text-dark-gray mb-4">
            Data you can trust. Proof you can show. Privacy you don't have to trade away.
          </p>
          
          <p className="text-body-large text-medium-gray max-w-4xl mx-auto mb-8">
            Precise's infrastructure turns data trust into a verifiable process, not just a hopeful assumption. 
            Our patented proof layer combines encrypted credentialing, privacy-preserving validation, and 
            immutable audit trails—without ever exposing the actual data or duplicating sensitive identifiers.
          </p>
          
          <p className="text-body-large font-medium text-dark-gray max-w-3xl mx-auto">
            It's the first infrastructure designed to give you proof of who, what, and how—without ever giving away the "who."
          </p>
        </motion.div>

        {/* What It Actually Does Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-heading-large font-bold text-dark-gray text-center mb-12">
            What It Actually Does
          </h3>
          
          <div className="space-y-8">
            {proofSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-silk-gray hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} p-3 flex-shrink-0`}>
                      <step.icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-dark-gray mb-3">
                        {step.title}
                      </h4>
                      <p className="text-body-regular text-medium-gray leading-relaxed">
                        {step.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-electric-blue">
                        <Lock className="w-4 h-4" />
                        {step.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Promise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-heading-large font-bold text-dark-gray mb-4">
            Most platforms promise transparency. Precise proves it.
          </h3>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            We don't just deliver data—we deliver verified proof that the data is real, 
            used as intended, and driving results. No more guessing where an audience came from. 
            No more wondering if your segment performed. No more hoping your partners play fair.
          </p>
        </motion.div>

        {/* Proof Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold text-dark-gray text-center mb-8">
            Precise gives you:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {proofTypes.map((proof, index) => (
              <motion.div
                key={proof.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-brand-green/5 to-electric-blue/5 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <proof.icon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-dark-gray mb-2">
                  {proof.title}
                </h5>
                <p className="text-sm text-medium-gray">
                  {proof.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}