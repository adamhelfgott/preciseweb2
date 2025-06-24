"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Activity, FileCheck } from "lucide-react";

export default function ProofInfrastructureSection() {
  const proofs = [
    {
      icon: FileCheck,
      title: "Proof of Origin",
      description: "Who created the segment, and what's in it?",
      details: "Cryptographic credentials validate data source and composition without exposing raw data",
      color: "from-electric-blue to-brand-green"
    },
    {
      icon: Activity,
      title: "Proof of Activation",
      description: "Was it actually used in the campaign?",
      details: "Verifiable receipts track every activation with tamper-proof transaction records",
      color: "from-brand-green to-electric-blue"
    },
    {
      icon: CheckCircle,
      title: "Proof of Performance",
      description: "Did it work, and what part worked best?",
      details: "Immutable performance logs prove ROI and segment contribution",
      color: "from-electric-blue to-bright-purple"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-soft-white to-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            PATENTED TECHNOLOGY
          </span>
          
          <h2 className="text-display-medium font-bold text-dark-gray mb-6">
            Most platforms promise transparency.<br />
            <span className="text-gradient">Precise proves it.</span>
          </h2>
          
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Our patented proof infrastructure turns data trust into a verifiable process. 
            No more guessing where an audience came from. No more wondering if your segment performed. 
            No more hoping your partners play fair.
          </p>
        </motion.div>

        {/* Three Proofs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {proofs.map((proof, index) => (
            <motion.div
              key={proof.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-silk-gray">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${proof.color} p-3 mb-6`}>
                  <proof.icon className="w-full h-full text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-dark-gray mb-3">
                  {proof.title}
                </h3>
                <p className="text-lg font-medium text-dark-gray mb-3">
                  {proof.description}
                </p>
                <p className="text-medium-gray text-sm">
                  {proof.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-electric-blue/5 to-brand-green/5 rounded-2xl p-12 mb-12"
        >
          <Shield className="w-16 h-16 text-brand-green mx-auto mb-6" />
          <h3 className="text-display-medium font-bold text-dark-gray mb-6">
            The difference is foundational
          </h3>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto leading-relaxed">
            Without proof, every signal is a guess, every identity is a gamble, and every attribution model is a black box. 
            Precise is the first infrastructure that enables proof-based data collaboration — 
            turning ad tech from a set of opinions into a chain of verified facts.
          </p>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="max-w-4xl mx-auto">
            {/* Quote mark */}
            <div className="absolute -top-4 -left-4 text-6xl text-brand-green/20 font-serif">"</div>
            
            {/* Quote content */}
            <blockquote className="relative bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-silk-gray">
              <p className="text-xl md:text-2xl font-medium text-dark-gray leading-relaxed mb-6">
                Trust and transparency in data are no longer optional, they are essential. By working with Precise, we are giving our partners the ability to verify and trust the quality of the data they rely on, setting a new precedent for accountability in audience intelligence.
              </p>
              
              {/* Attribution */}
              <footer className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-green"></div>
                <div>
                  <cite className="not-italic">
                    <span className="font-semibold text-dark-gray">Jeff Berke</span>
                    <span className="text-medium-gray">, CEO of Audience Acuity</span>
                  </cite>
                </div>
              </footer>
            </blockquote>
            
            {/* Closing quote mark */}
            <div className="absolute -bottom-4 -right-4 text-6xl text-brand-green/20 font-serif rotate-180">"</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}