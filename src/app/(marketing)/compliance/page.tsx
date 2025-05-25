"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, AlertCircle, CheckCircle, Scale, Database, Eye } from "lucide-react";
import Link from "next/link";

export default function CompliancePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray mb-6">
              Compliance Through Architecture
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-2xl mx-auto">
              Stay compliant by design, not policy. Our federated infrastructure ensures 
              you never become a data broker while enabling valuable collaboration.
            </p>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">Maintain Controller Status</h3>
              <p className="text-sm text-medium-gray">Never classified as a data broker</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">Zero Data Movement</h3>
              <p className="text-sm text-medium-gray">Data never leaves your infrastructure</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 text-center">
              <div className="w-12 h-12 bg-bright-purple/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileCheck className="w-6 h-6 text-bright-purple" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">Built-in Audit Trail</h3>
              <p className="text-sm text-medium-gray">Every query tracked and verified</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why You Won't Be a Data Broker */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              Why You Won't Be Classified as a Data Broker
            </h2>
            <p className="text-lg text-medium-gray">
              Data brokers sell or license data to third parties. With Precise, you never do either.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Data Broker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-warm-coral/5 border border-warm-coral/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-warm-coral" />
                <h3 className="text-xl font-semibold text-dark-gray">Traditional Data Broker</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-warm-coral rounded-full mt-2"></div>
                  <span className="text-medium-gray">Collects and aggregates data from multiple sources</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-warm-coral rounded-full mt-2"></div>
                  <span className="text-medium-gray">Sells or licenses raw data to third parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-warm-coral rounded-full mt-2"></div>
                  <span className="text-medium-gray">Data physically moves between parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-warm-coral rounded-full mt-2"></div>
                  <span className="text-medium-gray">Subject to strict broker regulations</span>
                </li>
              </ul>
            </motion.div>

            {/* With Precise */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-brand-green" />
                <h3 className="text-xl font-semibold text-dark-gray">With Precise</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-brand-green rounded-full mt-2"></div>
                  <span className="text-medium-gray">Your data stays in your infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-brand-green rounded-full mt-2"></div>
                  <span className="text-medium-gray">Only approved queries are executed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-brand-green rounded-full mt-2"></div>
                  <span className="text-medium-gray">Results are aggregated and privacy-preserved</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-brand-green rounded-full mt-2"></div>
                  <span className="text-medium-gray">Maintain full data controller status</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              Privacy-Preserving Architecture
            </h2>
            <p className="text-lg text-medium-gray">
              Our federated learning infrastructure ensures compliance through technical design.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-2">Secure Enclaves</h3>
                  <p className="text-medium-gray mb-3">
                    Computation happens in trusted execution environments (TEEs) within your infrastructure. 
                    Even Precise cannot see your raw data.
                  </p>
                  <div className="bg-light-gray rounded-lg p-4">
                    <code className="text-sm text-dark-gray font-mono">
                      Query → Secure Enclave → Aggregated Result
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-2">Differential Privacy</h3>
                  <p className="text-medium-gray mb-3">
                    Mathematical guarantees ensure individual records cannot be reverse-engineered 
                    from query results. Privacy is provable, not promised.
                  </p>
                  <div className="bg-light-gray rounded-lg p-4">
                    <code className="text-sm text-dark-gray font-mono">
                      Result = True Value + Calibrated Noise
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-bright-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-bright-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-2">Query Governance</h3>
                  <p className="text-medium-gray mb-3">
                    Define exactly what types of queries are allowed. Set thresholds, limit frequencies, 
                    and require minimum aggregation levels.
                  </p>
                  <div className="bg-light-gray rounded-lg p-4">
                    <code className="text-sm text-dark-gray font-mono">
                      if (query.type in approved_types) execute()
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              Compliance Standards We Support
            </h2>
            <p className="text-lg text-medium-gray">
              Our architecture is designed to meet the strictest global privacy regulations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-light-gray rounded-xl p-6"
            >
              <Scale className="w-8 h-8 text-electric-blue mb-3" />
              <h3 className="text-lg font-semibold text-dark-gray mb-2">GDPR</h3>
              <p className="text-sm text-medium-gray">
                Maintain data controller status. Support right to erasure, data minimization, 
                and purpose limitation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-light-gray rounded-xl p-6"
            >
              <Scale className="w-8 h-8 text-brand-green mb-3" />
              <h3 className="text-lg font-semibold text-dark-gray mb-2">CCPA/CPRA</h3>
              <p className="text-sm text-medium-gray">
                No sale of personal information. Full audit trail for consumer rights requests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-light-gray rounded-xl p-6"
            >
              <Scale className="w-8 h-8 text-bright-purple mb-3" />
              <h3 className="text-lg font-semibold text-dark-gray mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-medium-gray">
                Annual audits of security, availability, processing integrity, and confidentiality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand-green to-electric-blue rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Enable Compliant Collaboration?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join leading brands who collaborate without compromising compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary bg-white text-dark-gray hover:bg-light-gray">
                Get Started
              </Link>
              <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white/10">
                Talk to Compliance Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}