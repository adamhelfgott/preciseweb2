'use client'

import React from 'react'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ArrowRight, Shield, Zap, Brain, TrendingUp, Users, Target, BarChart3, Layers } from 'lucide-react'

export default function OMDPositioningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Precise Powers MadHive's Unified Platform for OMD
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How Precise's intelligence layer enables MadHive to deliver unified cross-platform optimization 
              with cryptographic verification for OMG's campaigns
            </p>
          </div>
        </div>
      </section>

      {/* Three Column Architecture */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The Unified Intelligence Architecture</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* What OMG Sees */}
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-blue-800 text-center">What OMG Sees</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-1">Single Dashboard</h4>
                  <p className="text-sm text-gray-600">All publishers, all metrics, one view</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Target className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-1">Unified Targeting</h4>
                  <p className="text-sm text-gray-600">Consistent audiences across all inventory</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-1">Real-Time Performance</h4>
                  <p className="text-sm text-gray-600">Instant insights, immediate optimization</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Shield className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-1">Verified Attribution</h4>
                  <p className="text-sm text-gray-600">Cryptographically proven results</p>
                </div>
              </div>
            </div>

            {/* MadHive Platform */}
            <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-green-800 text-center">MadHive Platform</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <Layers className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-1">Unified Local Workflow</h4>
                  <p className="text-sm text-gray-600">All supply sources integrated</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Brain className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-1">Maverick AI</h4>
                  <p className="text-sm text-gray-600">Cross-platform optimization engine</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Zap className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-1">Real-Time Decisioning</h4>
                  <p className="text-sm text-gray-600">Sub-second bid optimization</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-1">MediaOcean Integration</h4>
                  <p className="text-sm text-gray-600">Seamless workflow connection</p>
                </div>
              </div>
            </div>

            {/* Precise Powers */}
            <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-purple-800 text-center">Precise Powers</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <Shield className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-1">Cryptographic Verification</h4>
                  <p className="text-sm text-gray-600">Every impression mathematically proven</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Brain className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-1">Unified Intelligence</h4>
                  <p className="text-sm text-gray-600">Buckets learn from each other</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Users className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-1">Privacy-Safe Activation</h4>
                  <p className="text-sm text-gray-600">Use Annalect data without exposure</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-1">Network Learning</h4>
                  <p className="text-sm text-gray-600">Every campaign improves all others</p>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Arrows */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">User Experience</span>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-500">Platform Capabilities</span>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-500">Intelligence Layer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Intelligence System */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The Unified Intelligence System</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700">
                Every bucket continuously learns from and improves the others through Maverick AI powered by Precise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Streaming Bucket */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">📺</span>
                </div>
                <h3 className="font-bold mb-2">Streaming Intelligence</h3>
                <p className="text-sm text-gray-600">Disney+, Hulu, Peacock patterns enhance broadcast performance</p>
              </div>
              
              {/* Broadcast Bucket */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="font-bold mb-2">Broadcast Intelligence</h3>
                <p className="text-sm text-gray-600">Fox, NBC, CBS insights optimize streaming targeting</p>
              </div>
              
              {/* Linear Bucket */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">📡</span>
                </div>
                <h3 className="font-bold mb-2">Linear Intelligence</h3>
                <p className="text-sm text-gray-600">Traditional TV data amplifies digital campaign performance</p>
              </div>
              
              {/* Data Bucket */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="font-bold mb-2">Data Intelligence</h3>
                <p className="text-sm text-gray-600">Annalect insights power all channels without exposure</p>
              </div>
            </div>
            
            {/* Intelligence Flow */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-center mb-4">How Intelligence Flows</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-2">Instant Learning</p>
                  <p className="text-gray-600">A successful creative on Disney+ immediately improves Fox targeting</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-2">Cross-Platform Patterns</p>
                  <p className="text-gray-600">Linear TV viewing habits enhance streaming audience models</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-2">Continuous Optimization</p>
                  <p className="text-gray-600">Every impression across any platform makes all buckets smarter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What This Means for OMD</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Traditional Approach</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✗</span>
                  <div>
                    <p className="font-semibold">Siloed Platforms</p>
                    <p className="text-sm text-gray-600">Each DSP operates independently</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✗</span>
                  <div>
                    <p className="font-semibold">Delayed Attribution</p>
                    <p className="text-sm text-gray-600">Days or weeks to understand performance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✗</span>
                  <div>
                    <p className="font-semibold">Limited Learning</p>
                    <p className="text-sm text-gray-600">Each campaign starts from scratch</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✗</span>
                  <div>
                    <p className="font-semibold">Data Exposure Risk</p>
                    <p className="text-sm text-gray-600">Must share data to activate it</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">MadHive + Precise</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <p className="font-semibold">Unified Intelligence</p>
                    <p className="text-sm text-gray-600">All platforms learn from each other instantly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <p className="font-semibold">Real-Time Verification</p>
                    <p className="text-sm text-gray-600">Cryptographic proof within seconds</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <p className="font-semibold">Compound Learning</p>
                    <p className="text-sm text-gray-600">Every campaign improves all future campaigns</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <p className="font-semibold">Zero-Exposure Activation</p>
                    <p className="text-sm text-gray-600">Use Annalect data without sharing it</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Implementation Roadmap</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-600">Phase 1: Foundation (30 days)</h3>
                  <p className="text-gray-600 mt-2">Connect Precise verification layer to MadHive platform</p>
                  <p className="text-sm text-gray-500 mt-1">Enable cryptographic attribution across all publishers</p>
                </div>
                <div className="text-3xl">🔧</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-green-600">Phase 2: Intelligence (60 days)</h3>
                  <p className="text-gray-600 mt-2">Deploy unified intelligence system</p>
                  <p className="text-sm text-gray-500 mt-1">Enable cross-bucket learning with Maverick AI</p>
                </div>
                <div className="text-3xl">🧠</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-purple-600">Phase 3: Optimization (90 days)</h3>
                  <p className="text-gray-600 mt-2">Full automation with privacy-safe data activation</p>
                  <p className="text-sm text-gray-500 mt-1">Real-time optimization across all inventory</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Campaign Performance?</h2>
          <p className="text-xl mb-8">
            MadHive + Precise delivers the unified intelligence system that makes every 
            campaign smarter than the last, with cryptographic proof of success.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-4">Only With Precise</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <p>Streaming learns from broadcast</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p>Linear enhances digital</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p>Data amplifies all channels</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p>Every impression verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}