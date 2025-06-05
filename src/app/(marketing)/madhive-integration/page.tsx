import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function MadHiveIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Simple Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="font-semibold text-xl">Precise</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Precise Powers MadHive's Unified Execution
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precise enables MadHive to deliver true unified execution across all platforms. 
              See and control Hulu, Disney+, Fox, NBC campaigns in one real-time dashboard.
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
                <span className="text-3xl mr-3">🔒</span>
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
                <span className="text-3xl mr-3">🌐</span>
                <h3 className="text-xl font-bold">Unified Platform Intelligence</h3>
              </div>
              <p className="text-gray-700 mb-4"><strong>What MadHive Promises:</strong> "AI that gets smarter with every campaign"</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Single dashboard controls Hulu, Disney+, Fox, NBC simultaneously</li>
                <li>• Click any platform to see all campaigns running there</li>
                <li>• Real-time performance updates across all publishers</li>
                <li>• Budget automatically flows to best-performing platforms</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">✅</span>
                <h3 className="text-xl font-bold">Verified Performance Attribution</h3>
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
                <span className="text-3xl mr-3">⚡</span>
                <h3 className="text-xl font-bold">Real-Time Cross-Platform Control</h3>
              </div>
              <p className="text-gray-700 mb-4"><strong>What MadHive Promises:</strong> "Unified buying across all platforms"</p>
              <ul className="space-y-2 text-gray-600">
                <li>• One dashboard shows all platforms: streaming, broadcast, linear</li>
                <li>• Click into any platform to see individual campaigns</li>
                <li>• Real-time updates as performance changes</li>
                <li>• Automatic budget reallocation to top performers</li>
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
                    <span className="text-2xl block mb-2">🎬</span>
                    <p className="text-sm">Unified Dashboard</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">🎨</span>
                    <p className="text-sm">All Platforms</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">🎯</span>
                    <p className="text-sm">Click to Drill In</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">⚡</span>
                    <p className="text-sm">Real-Time Control</p>
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
                    <span className="text-2xl block mb-2">🔄</span>
                    <p className="text-sm">Platform Learning</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">🚀</span>
                    <p className="text-sm">Auto-Optimization</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">🎨</span>
                    <p className="text-sm">Smart Allocation</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">📊</span>
                    <p className="text-sm">Performance Driven</p>
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
                    <span className="text-2xl block mb-2">🔒</span>
                    <p className="text-sm">Privacy Engine</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">🌐</span>
                    <p className="text-sm">Platform Network</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">✅</span>
                    <p className="text-sm">Verified Results</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl block mb-2">🔮</span>
                    <p className="text-sm">Intelligence Layer</p>
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
            <h3 className="text-2xl font-bold mb-6 text-center">One Dashboard Controls Everything</h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📺</span>
                </div>
                <h4 className="font-bold mb-2">Hulu → Fox Sports</h4>
                <p className="text-sm text-gray-600">Young professional insights = +$45K savings</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h4 className="font-bold mb-2">Disney+ → NBC</h4>
                <p className="text-sm text-gray-600">Family viewing patterns = +$32K savings</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📡</span>
                </div>
                <h4 className="font-bold mb-2">CBS → Paramount+</h4>
                <p className="text-sm text-gray-600">Prime time patterns = Better streaming CPMs</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="font-bold mb-2">All Platforms</h4>
                <p className="text-sm text-gray-600">Total media credits this quarter: $250K+</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-gray-800">
                Every platform visible. Every campaign controllable. Every insight actionable. 
                All from one unified dashboard that updates in real-time.
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
              <h3 className="text-xl font-bold mb-4 text-blue-600">Media Credits & Savings</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>OMG earns $77,000+ media credits per campaign</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Platform insights create 18-25% efficiency gains</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Your data enhances the entire network's performance</span>
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
            Precise transforms every platform into a source of intelligence and every campaign 
            into an opportunity to earn media credits through cross-platform optimization.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-lg mb-4">
              <strong>Without Precise:</strong> Each platform operates in isolation - Hulu, Disney+, Fox all separate
            </p>
            <p className="text-lg">
              <strong>With Precise:</strong> One unified dashboard controls every platform. Click into any platform 
              to see campaigns. Watch performance update in real-time. Budget flows automatically to what works.
            </p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold">Precise</span>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Precise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}