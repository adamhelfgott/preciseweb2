'use client'

import React from 'react'
import Logo from '@/components/Logo'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield, Zap, Brain, TrendingUp, Network, Database, Lock, BarChart3 } from 'lucide-react'

export default function MadHiveIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              What Precise Powers for MadHive
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precise is the invisible intelligence layer that transforms MadHive from a unified buying platform 
              into an AI-powered optimization engine with cryptographic verification.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Capabilities Precise Provides</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Lock className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold">Privacy-Safe Data Collaboration</h3>
              </div>
              <p className="text-gray-700 mb-4"><strong>What MadHive Promises:</strong> "Activate first-party data without sharing it"</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Cryptographic protocols that compute on encrypted data</li>
                <li>• Federated learning across all advertisers without data exposure</li>
                <li>• Zero-knowledge proofs for attribution without revealing identity</li>
                <li>• Enables Annalect, Polk, S&P Global data activation with zero leakage</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold">Unified Intelligence System</h3>
              </div>
              <p className="text-gray-700 mb-4"><strong>What MadHive Promises:</strong> "AI that gets smarter with every campaign"</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Streaming, broadcast, linear, and data buckets learn from each other</li>
                <li>• Cross-platform insights flow instantly between all channels</li>
                <li>• Each bucket's performance enhances all others exponentially</li>
                <li>• Continuous optimization that improves every second</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold">Cryptographic Attribution & Verification</h3>
              </div>
              <p className="text-gray-700 mb-4"><strong>What MadHive Promises:</strong> "Prove ROI with mathematical certainty"</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Every impression cryptographically signed and verified</li>
                <li>• Tamper-proof attribution chain from ad to conversion</li>
                <li>• Cross-platform identity resolution without universal IDs</li>
                <li>• Court-admissible proof of performance</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold">Real-Time Cross-Platform Optimization</h3>
              </div>
              <p className="text-gray-700 mb-4"><strong>What MadHive Promises:</strong> "Unified buying across linear and digital"</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Sub-second attribution updates across all channels</li>
                <li>• Automated budget reallocation based on verified performance</li>
                <li>• Frequency capping that actually works across walled gardens</li>
                <li>• Incrementality testing with holdout groups in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Architecture</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-8">
              {/* MadHive Layer */}
              <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                <h3 className="font-bold text-lg mb-3 text-blue-800">MadHive Platform Layer (What clients see)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Database className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm">Unified UI/UX</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Network className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm">MediaOcean Integration</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm">Publisher Connections</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm">Reporting Dashboard</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gray-300"></div>
              </div>

              {/* Maverick Layer */}
              <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                <h3 className="font-bold text-lg mb-3 text-green-800">Maverick AI Layer (What optimizes)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Brain className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm">Audience Modeling</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm">Bid Optimization</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm">Creative Selection</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm">Budget Allocation</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gray-300"></div>
              </div>

              {/* Precise Layer */}
              <div className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                <h3 className="font-bold text-lg mb-3 text-purple-800">Precise Intelligence Layer (What enables)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Lock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm">Secure Multi-Party Computation</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Network className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm">Federated Learning</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm">Cryptographic Engine</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Database className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm">Privacy Identity Graph</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Intelligence */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The Power of Unified Intelligence</h2>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">How Buckets Learn From Each Other</h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📺</span>
                </div>
                <h4 className="font-bold mb-2">Streaming</h4>
                <p className="text-sm text-gray-600">Disney+, Hulu insights improve broadcast targeting</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h4 className="font-bold mb-2">Broadcast</h4>
                <p className="text-sm text-gray-600">Fox, NBC patterns optimize streaming campaigns</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📡</span>
                </div>
                <h4 className="font-bold mb-2">Linear</h4>
                <p className="text-sm text-gray-600">Traditional TV data enhances digital performance</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="font-bold mb-2">Data</h4>
                <p className="text-sm text-gray-600">Annalect insights amplify all channels</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-gray-800">
                Every impression makes every bucket smarter. Intelligence flows instantly between all platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Business Value for MadHive</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Revenue Enhancement</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Premium pricing for verified performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Data marketplace monetization without data transfer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Performance guarantees backed by cryptographic proof</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-green-600">Cost Reduction</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>No data storage costs - never store client PII</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reduced legal risk through cryptographic compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Automated operations with AI handling optimization</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Market Differentiation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Only platform with mathematical verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Post-cookie ready with no deprecated signals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Network effects that improve with every campaign</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">The Bottom Line</h2>
          <p className="text-xl mb-8">
            Precise transforms MadHive from a "unified buying platform" into an 
            "intelligence-powered optimization engine with cryptographic proof."
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-lg mb-4">
              <strong>Without Precise:</strong> MadHive is another DSP with good publisher relationships
            </p>
            <p className="text-lg">
              <strong>With Precise:</strong> MadHive is the only platform that can prove performance 
              with mathematical certainty while learning from the entire ecosystem
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}