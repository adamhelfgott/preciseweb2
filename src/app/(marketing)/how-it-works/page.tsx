"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Shield, 
  Zap, 
  TrendingUp, 
  Lock, 
  ArrowRight,
  Check,
  Users,
  BarChart3,
  DollarSign,
  Target,
  Layers,
  Brain,
  Cpu,
  LineChart,
  AlertTriangle,
  RefreshCcw,
  Sparkles
} from "lucide-react";
import ProofInfrastructureSection from "@/components/marketing/ProofInfrastructureSection";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"data-controller" | "media-buyer">("media-buyer");

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray mb-6">
              AI-Powered Intelligence Infrastructure
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              Precise combines federated learning, predictive analytics, and privacy-preserving computation to revolutionize how brands collaborate with data
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="py-8">
        <div className="container max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("media-buyer")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                activeTab === "media-buyer"
                  ? "bg-dark-gray text-white"
                  : "bg-white text-dark-gray border-2 border-silk-gray hover:border-dark-gray"
              }`}
            >
              <Target className="inline w-5 h-5 mr-2" />
              For Media Buyers
            </button>
            <button
              onClick={() => setActiveTab("data-controller")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                activeTab === "data-controller"
                  ? "bg-dark-gray text-white"
                  : "bg-white text-dark-gray border-2 border-silk-gray hover:border-dark-gray"
              }`}
            >
              <Database className="inline w-5 h-5 mr-2" />
              For Data Controllers
            </button>
          </div>
        </div>
      </section>

      {/* Media Buyer Flow */}
      {activeTab === "media-buyer" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Key Benefits */}
          <section className="py-12 bg-white">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                AI-Powered Campaign Optimization at Scale
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Predictive CAC Forecasting</h3>
                  <p className="text-medium-gray">
                    AI predicts customer acquisition costs 4 weeks out with 92% accuracy
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-8 h-8 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Multi-DSP Arbitrage</h3>
                  <p className="text-medium-gray">
                    Automatically shift budgets between DSPs for 2.3x better performance
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-bright-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-bright-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Creative Fatigue Detection</h3>
                  <p className="text-medium-gray">
                    Know when to refresh creatives before performance drops
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="py-16 md:py-24">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-16">
                How Our AI AdOps Command Center Works
              </h2>
              
              <div className="space-y-16">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">Connect Your Campaign Stack</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      One-click integration with all major DSPs, measurement partners, and creative platforms. Your AI assistant immediately begins learning your campaign patterns.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Cpu className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Google DV360, TTD, Amazon DSP, Meta</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">LiveRamp, Neustar, TransUnion integration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">AI learns your KPIs and optimization style</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-xl p-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold text-dark-gray mb-4">Connected Platforms</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                          <span className="font-medium">Google DV360</span>
                          <span className="text-sm text-brand-green">✓ Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                          <span className="font-medium">The Trade Desk</span>
                          <span className="text-sm text-brand-green">✓ Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                          <span className="font-medium">Amazon DSP</span>
                          <span className="text-sm text-brand-green">✓ Connected</span>
                        </div>
                        <div className="mt-4 p-4 bg-electric-blue/10 rounded-lg">
                          <div className="text-sm font-medium text-dark-gray mb-1">AI Status</div>
                          <div className="text-xs text-medium-gray">Learning from 127 campaigns...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="lg:order-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">AI Monitors & Predicts Performance</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Our AI continuously analyzes millions of signals to predict CAC changes, detect creative fatigue, and identify arbitrage opportunities before humans can.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <LineChart className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">4-week CAC predictions with confidence intervals</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <RefreshCcw className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Creative performance decay modeling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Cross-DSP performance arbitrage</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:order-1 bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-semibold text-dark-gray mb-4">AI Insights Dashboard</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-warm-coral rounded-lg bg-warm-coral/5">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-warm-coral" />
                          <span className="text-sm font-medium text-dark-gray">Creative Fatigue Alert</span>
                        </div>
                        <p className="text-sm text-medium-gray mb-2">
                          "Nike_Summer_V2" showing 34% CTR decline over 7 days
                        </p>
                        <button className="text-sm text-warm-coral font-medium">View Recommendations →</button>
                      </div>
                      <div className="p-4 border border-brand-green rounded-lg bg-brand-green/5">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-brand-green" />
                          <span className="text-sm font-medium text-dark-gray">Arbitrage Opportunity</span>
                        </div>
                        <p className="text-sm text-medium-gray mb-2">
                          Shift $25K from Meta to TTD for 2.1x better CAC
                        </p>
                        <button className="text-sm text-brand-green font-medium">Execute Transfer →</button>
                      </div>
                      <div className="p-4 border border-electric-blue rounded-lg bg-electric-blue/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-electric-blue" />
                          <span className="text-sm font-medium text-dark-gray">CAC Forecast</span>
                        </div>
                        <p className="text-sm text-medium-gray">
                          Week 1: $45 → Week 4: $52 (±$3 confidence)
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">Execute with AI Copilot</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Your AI assistant provides specific, actionable recommendations. Execute optimizations with one click or let AI handle routine tasks automatically.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Natural language campaign management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Guardrails prevent overspending</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Track incrementality with holdout testing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-xl p-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-electric-blue" />
                        </div>
                        <span className="text-sm font-medium">AI Assistant</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-light-gray rounded-lg p-3">
                          <p className="text-sm text-medium-gray mb-1">You:</p>
                          <p className="text-sm">"Why is my CAC increasing this week?"</p>
                        </div>
                        <div className="bg-electric-blue/5 rounded-lg p-3">
                          <p className="text-sm text-medium-gray mb-1">AI:</p>
                          <p className="text-sm">Three factors: 1) Creative fatigue on top 3 ads (42% of spend), 2) Increased CPMs on Meta (+18%), 3) Lower match rates on LiveRamp segments. Recommend refreshing creatives and shifting 30% budget to TTD.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="text-sm font-medium text-dark-gray mb-3">Quick Actions</h5>
                      <div className="space-y-2">
                        <button className="w-full text-left p-3 bg-brand-green/10 rounded-lg text-sm font-medium text-brand-green hover:bg-brand-green/20 transition-colors">
                          Execute Budget Reallocation →
                        </button>
                        <button className="w-full text-left p-3 bg-electric-blue/10 rounded-lg text-sm font-medium text-electric-blue hover:bg-electric-blue/20 transition-colors">
                          Launch Creative A/B Test →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-16 bg-gradient-to-b from-white to-light-gray">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                Real Results from Real Campaigns
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="text-4xl font-bold text-brand-green mb-2">-47%</div>
                  <div className="text-lg font-medium text-dark-gray mb-1">CAC Reduction</div>
                  <p className="text-sm text-medium-gray">Average across 50+ campaigns</p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="text-4xl font-bold text-electric-blue mb-2">3.2x</div>
                  <div className="text-lg font-medium text-dark-gray mb-1">ROAS Improvement</div>
                  <p className="text-sm text-medium-gray">With multi-touch attribution</p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="text-4xl font-bold text-bright-purple mb-2">92%</div>
                  <div className="text-lg font-medium text-dark-gray mb-1">Forecast Accuracy</div>
                  <p className="text-sm text-medium-gray">4-week CAC predictions</p>
                </div>
              </div>
            </div>
          </section>

        </motion.div>
      )}

      {/* Data Controller Flow */}
      {activeTab === "data-controller" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Key Benefits */}
          <section className="py-12 bg-white">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                Market Intelligence Without Sharing Your Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Stay a Data Controller</h3>
                  <p className="text-medium-gray">
                    Never become a data broker. Maintain GDPR/CCPA controller status.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LineChart className="w-8 h-8 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Real-Time Demand Signals</h3>
                  <p className="text-medium-gray">
                    See what advertisers need before your competitors do.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-bright-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-bright-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">AI Revenue Optimization</h3>
                  <p className="text-medium-gray">
                    ML-driven pricing based on real campaign performance data.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="py-16 md:py-24">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-16">
                How Intelligence Infrastructure Works
              </h2>
              
              <div className="space-y-16">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">Deploy Secure Query Infrastructure</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Install federated learning nodes that enable privacy-preserving queries. Your data never moves - algorithms come to you in secure enclaves.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">SOC2 Type II compliant infrastructure</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Zero-trust architecture with audit logs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Differential privacy on all outputs</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-light-gray rounded-xl p-8">
                    <pre className="text-sm text-dark-gray overflow-x-auto">
{`// Deploy with one command
precise deploy --mode=federated

// Set query governance rules
precise.governance({
  allowedQueries: ['aggregate', 'cohort'],
  minAggregationSize: 1000,
  differentialPrivacy: {
    epsilon: 1.0,
    delta: 1e-5
  }
});`}
                    </pre>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="lg:order-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">Get Market Intelligence Insights</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Our AI analyzes demand patterns across the ecosystem to show you opportunities, pricing benchmarks, and quality improvements that drive revenue.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <LineChart className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Real-time advertiser demand signals</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Pricing optimization recommendations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Data enhancement opportunities</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:order-1 bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-semibold text-dark-gray mb-4">Market Intelligence Dashboard</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-brand-green rounded-lg bg-brand-green/5">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-brand-green" />
                          <span className="text-sm font-medium text-dark-gray">High Demand Alert</span>
                        </div>
                        <p className="text-sm text-medium-gray mb-2">
                          "Fitness enthusiasts" seeing 340% increased demand
                        </p>
                        <div className="text-xs text-brand-green">Current pricing 42% below market</div>
                      </div>
                      <div className="p-4 border border-electric-blue rounded-lg bg-electric-blue/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-electric-blue" />
                          <span className="text-sm font-medium text-dark-gray">Enhancement Opportunity</span>
                        </div>
                        <p className="text-sm text-medium-gray">
                          Add "purchase intent" signals to increase value by 3.2x
                        </p>
                      </div>
                      <div className="mt-4 p-4 bg-light-gray rounded-lg">
                        <div className="text-sm font-medium text-dark-gray mb-2">Your Position</div>
                        <div className="flex justify-between text-sm">
                          <span className="text-medium-gray">Market Rank</span>
                          <span className="font-medium">#3 of 47</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-medium-gray">Quality Score</span>
                          <span className="font-medium">94/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">Earn Based on Real Impact</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Our Valence Enhanced Shapley system ensures you're paid fairly based on your data's actual contribution to campaign success. Full transparency, no guesswork.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Attribution based on incrementality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Weekly automated payments</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Cryptographic proof of usage</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h4 className="font-semibold text-dark-gray mb-4">Revenue Analytics</h4>
                    <div className="text-3xl font-bold text-dark-gray mb-2">$127,493</div>
                    <div className="text-sm text-brand-green mb-6">+47% vs last month</div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-medium-gray">Nike Campaign Impact</span>
                          <span className="font-medium text-dark-gray">$34,230</span>
                        </div>
                        <div className="text-xs text-medium-gray">
                          Your data reduced their CAC by 23%
                        </div>
                        <div className="w-full bg-light-gray rounded-full h-2 mt-2">
                          <div className="bg-brand-green h-2 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-medium-gray">Adidas Incrementality Test</span>
                          <span className="font-medium text-dark-gray">$28,120</span>
                        </div>
                        <div className="text-xs text-medium-gray">
                          Proved 2.3x ROAS improvement
                        </div>
                        <div className="w-full bg-light-gray rounded-full h-2 mt-2">
                          <div className="bg-electric-blue h-2 rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-silk-gray">
                      <div className="flex justify-between text-sm">
                        <span className="text-medium-gray">Next payout</span>
                        <span className="font-medium text-dark-gray">Friday, $31,847</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-16 bg-gradient-to-b from-white to-light-gray">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                Why You Won't Be a Data Broker
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">Traditional Data Broker</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-warm-coral">✗</span>
                      <span className="text-medium-gray">Collects and stores third-party data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warm-coral">✗</span>
                      <span className="text-medium-gray">Sells data to unknown parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warm-coral">✗</span>
                      <span className="text-medium-gray">Data leaves your control</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warm-coral">✗</span>
                      <span className="text-medium-gray">Complex regulatory compliance</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-brand-green">
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">Precise Infrastructure</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green">✓</span>
                      <span className="text-medium-gray">You only process your first-party data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green">✓</span>
                      <span className="text-medium-gray">Data never leaves your servers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green">✓</span>
                      <span className="text-medium-gray">Only approved queries execute</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-green">✓</span>
                      <span className="text-medium-gray">Maintain controller status</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </motion.div>
      )}

      {/* Proof Infrastructure Section - Always visible */}
      <ProofInfrastructureSection />

      {/* Dynamic CTA Footer */}
      <section className="py-16 bg-dark-gray">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {activeTab === "media-buyer" 
              ? "Join the AI-Powered Future of Media Buying"
              : "Enable Intelligence Without Sharing Data"
            }
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {activeTab === "media-buyer"
              ? "Leading brands use Precise to outperform their competition"
              : "Join leading brands already using federated intelligence"
            }
          </p>
          <a
            href="/get-started"
            className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            {activeTab === "media-buyer" ? "See Live Demo" : "Schedule Demo"}
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}