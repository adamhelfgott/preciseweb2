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
  Brain
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"data-owner" | "media-buyer">("data-owner");

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
              Privacy-Preserving Data Collaboration
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              Precise enables secure data monetization and high-quality audience targeting without ever exposing raw data
            </p>
          </motion.div>

          {/* Tab Selection */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("data-owner")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                activeTab === "data-owner"
                  ? "bg-dark-gray text-white"
                  : "bg-white text-dark-gray border-2 border-silk-gray hover:border-dark-gray"
              }`}
            >
              <Database className="inline w-5 h-5 mr-2" />
              For Data Owners
            </button>
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
          </div>
        </div>
      </section>

      {/* Data Owner Flow */}
      {activeTab === "data-owner" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Key Benefits */}
          <section className="py-12 bg-white">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                Turn Your Data Into Revenue Without Risk
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
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Data Never Leaves</h3>
                  <p className="text-medium-gray">
                    Your data stays in your infrastructure. We only create verified credentials.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Automatic Royalties</h3>
                  <p className="text-medium-gray">
                    Get paid automatically whenever your data contributes to campaign success.
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
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Fair Attribution</h3>
                  <p className="text-medium-gray">
                    Valence Enhanced Shapley ensures you're paid fairly for your data's impact.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="py-16 md:py-24">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-16">
                How Data Owners Monetize
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
                      <h3 className="text-2xl font-bold text-dark-gray">Connect Your Data</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Install our lightweight SDK or use our APIs to connect your data sources. Your data never leaves your infrastructure.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">5-minute setup with popular databases</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">SOC2 compliant security</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Real-time or batch processing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-light-gray rounded-xl p-8">
                    <pre className="text-sm text-dark-gray overflow-x-auto">
{`// Example: Connect with one line of code
const precise = new PreciseSDK({
  apiKey: 'your-api-key',
  dataSource: 'user-events'
});

// Your data stays in your database
precise.createCredentials({
  table: 'user_activities',
  columns: ['category', 'timestamp'],
  privacy: 'differential'
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
                      <h3 className="text-2xl font-bold text-dark-gray">Create Verified Credentials</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      We automatically generate privacy-preserving credentials from your data that advertisers can use for targeting.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Zero-knowledge proofs ensure privacy</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Layers className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Automatic segmentation and categorization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Real-time credential updates</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:order-1 bg-gradient-to-br from-brand-green/10 to-electric-blue/10 rounded-xl p-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-dark-gray">Fitness Enthusiasts</span>
                        <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">Verified</span>
                      </div>
                      <div className="text-2xl font-bold text-dark-gray mb-1">2.3M users</div>
                      <div className="text-sm text-medium-gray">High-value segment • 95% accuracy</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-dark-gray">Premium Subscribers</span>
                        <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">Verified</span>
                      </div>
                      <div className="text-2xl font-bold text-dark-gray mb-1">890K users</div>
                      <div className="text-sm text-medium-gray">LTV &gt; $500 • Active last 30 days</div>
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
                      <h3 className="text-2xl font-bold text-dark-gray">Earn Automatic Royalties</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Get paid based on your data's actual impact on campaign performance through our Valence Enhanced Shapley system.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Performance-based pricing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Real-time earnings dashboard</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Weekly automated payouts</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h4 className="font-semibold text-dark-gray mb-4">Your Earnings This Month</h4>
                    <div className="text-3xl font-bold text-dark-gray mb-2">$47,382</div>
                    <div className="text-sm text-brand-green mb-6">+23.5% vs last month</div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-medium-gray">Nike Campaign</span>
                          <span className="font-medium text-dark-gray">$12,340</span>
                        </div>
                        <div className="w-full bg-light-gray rounded-full h-2">
                          <div className="bg-brand-green h-2 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-medium-gray">Adidas Campaign</span>
                          <span className="font-medium text-dark-gray">$8,230</span>
                        </div>
                        <div className="w-full bg-light-gray rounded-full h-2">
                          <div className="bg-electric-blue h-2 rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-dark-gray">
            <div className="container max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Monetizing Your Data Today
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join leading brands already earning with Precise
              </p>
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        </motion.div>
      )}

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
                Access Premium Data Without Privacy Risk
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Verified Audiences</h3>
                  <p className="text-medium-gray">
                    Target real, verified users with deterministic data quality.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Clear Attribution</h3>
                  <p className="text-medium-gray">
                    See exactly which data sources drive your campaign performance.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-bright-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-bright-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">Zero Privacy Risk</h3>
                  <p className="text-medium-gray">
                    Never touch raw data. Always compliant with GDPR, CCPA, and more.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="py-16 md:py-24">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-16">
                How Media Buyers Succeed
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
                      <h3 className="text-2xl font-bold text-dark-gray">Browse Verified Audiences</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Access our marketplace of pre-verified audience segments from premium data owners.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">1000+ verified segments</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">All data quality verified</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Granular targeting options</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="font-semibold text-dark-gray mb-4">Available Segments</h4>
                    <div className="space-y-4">
                      <div className="border border-silk-gray rounded-lg p-4 hover:border-electric-blue transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-dark-gray">Fitness Enthusiasts</span>
                          <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">Premium</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-medium-gray">Size:</span>
                            <span className="ml-2 font-medium text-dark-gray">2.3M</span>
                          </div>
                          <div>
                            <span className="text-medium-gray">Match Rate:</span>
                            <span className="ml-2 font-medium text-dark-gray">87%</span>
                          </div>
                        </div>
                      </div>
                      <div className="border border-silk-gray rounded-lg p-4 hover:border-electric-blue transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-dark-gray">High-Value Shoppers</span>
                          <span className="text-xs bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full">Verified</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-medium-gray">Size:</span>
                            <span className="ml-2 font-medium text-dark-gray">890K</span>
                          </div>
                          <div>
                            <span className="text-medium-gray">LTV:</span>
                            <span className="ml-2 font-medium text-dark-gray">&gt; $500</span>
                          </div>
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
                      <h3 className="text-2xl font-bold text-dark-gray">Launch & Optimize</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      Use our AI-powered campaign tools to optimize performance in real-time across all your DSPs.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">AI optimization recommendations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Layers className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Multi-DSP orchestration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Real-time performance tracking</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:order-1 bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-xl p-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold text-dark-gray mb-4">Campaign Performance</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-medium-gray">CAC Reduction</span>
                            <span className="text-sm font-medium text-brand-green">-34%</span>
                          </div>
                          <div className="w-full bg-light-gray rounded-full h-2">
                            <div className="bg-brand-green h-2 rounded-full" style={{ width: '34%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-medium-gray">ROAS Improvement</span>
                            <span className="text-sm font-medium text-electric-blue">+250%</span>
                          </div>
                          <div className="w-full bg-light-gray rounded-full h-2">
                            <div className="bg-electric-blue h-2 rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>
                        <div className="pt-4 border-t border-silk-gray">
                          <div className="text-sm text-medium-gray mb-1">AI Recommendation</div>
                          <div className="text-sm font-medium text-dark-gray">
                            "Shift 20% budget to MadHive - seeing 2.3x better performance"
                          </div>
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
                      <div className="w-12 h-12 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <h3 className="text-2xl font-bold text-dark-gray">Track Clear Attribution</h3>
                    </div>
                    <p className="text-lg text-medium-gray mb-6">
                      See exactly which data sources drive results with our Marketing Mix Model attribution.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Multi-touch attribution</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">Incrementality testing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                        <span className="text-medium-gray">ROI by data source</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h4 className="font-semibold text-dark-gray mb-4">Attribution Analysis</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-medium-gray">Whoop Fitness Data</span>
                          <span className="text-sm font-medium text-dark-gray">41% impact</span>
                        </div>
                        <p className="text-xs text-medium-gray">
                          Reduced CAC by $12.30 • 2.3M users reached
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-medium-gray">LiveRamp Identity</span>
                          <span className="text-sm font-medium text-dark-gray">29% impact</span>
                        </div>
                        <p className="text-xs text-medium-gray">
                          Reduced CAC by $8.70 • 1.8M users reached
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-medium-gray">Precise AI Model</span>
                          <span className="text-sm font-medium text-dark-gray">22% impact</span>
                        </div>
                        <p className="text-xs text-medium-gray">
                          Reduced CAC by $6.50 • Optimization layer
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-dark-gray">
            <div className="container max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Running Better Campaigns Today
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join leading advertisers already succeeding with Precise
              </p>
              <a
                href="/get-started"
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Request Demo
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}