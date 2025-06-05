'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  Zap,
  Brain,
  Shield,
  ArrowRight,
  ChevronDown,
  Play,
  Monitor,
  Tv,
  Radio
} from 'lucide-react';

// Supply sources from the MadHive deck
const supplyBuckets = {
  streaming: ['Disney+', 'Hulu', 'Peacock', 'Paramount+', 'Discovery+'],
  broadcast: ['FOX', 'NBC', 'CBS', 'ABC'],
  linear: ['MLB.com', 'Local Broadcast'],
  data: ['Annalect', 'Polk', 'S&P Global', 'MadHive Data Marketplace']
};

export default function OMGUnifiedDashboard() {
  const [selectedView, setSelectedView] = useState<'overview' | 'attribution' | 'optimization'>('overview');
  const [expandedPublisher, setExpandedPublisher] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">OMG</span>
                <span className="text-gray-400">×</span>
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
                <span className="font-semibold">MadHive</span>
                <span className="text-gray-400">×</span>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span className="font-semibold">Precise</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Powered by Maverick AI + Precise Intelligence
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700">Live Attribution</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setSelectedView('overview')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Unified Overview
            </button>
            <button
              onClick={() => setSelectedView('attribution')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'attribution'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Cross-Platform Attribution
            </button>
            <button
              onClick={() => setSelectedView('optimization')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'optimization'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              AI Optimization
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedView === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Spend</span>
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">Optimized</p>
                <p className="text-sm text-green-600 mt-1">Cross-bucket efficiency</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Unified Reach</span>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">Unified</p>
                <p className="text-sm text-purple-600 mt-1">True cross-platform reach</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Avg. Frequency</span>
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">Optimal</p>
                <p className="text-sm text-blue-600 mt-1">AI-balanced frequency</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Verified ROI</span>
                  <Shield className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">Verified</p>
                <p className="text-sm text-green-600 mt-1">Cryptographically proven</p>
              </motion.div>
            </div>

            {/* Spend by Publisher */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Unified Spend Across All Publishers
              </h2>
              
              <div className="space-y-4">
                {/* Streaming */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Streaming</span>
                    </div>
                    <span className="text-sm text-gray-600">Learning from broadcast & linear</span>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {supplyBuckets.streaming.map((publisher) => (
                      <div
                        key={publisher}
                        className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setExpandedPublisher(publisher)}
                      >
                        <p className="text-sm font-medium text-gray-900">{publisher}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Optimizing from linear insights
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-600">
                            Cross-platform learning
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Broadcast */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tv className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Broadcast</span>
                    </div>
                    <span className="text-sm text-gray-600">Learning from streaming & data</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {supplyBuckets.broadcast.map((publisher) => (
                      <div
                        key={publisher}
                        className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900">{publisher}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Enhanced by streaming data
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linear */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">Linear</span>
                    </div>
                    <span className="text-sm text-gray-600">Learning from digital patterns</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {supplyBuckets.linear.map((publisher) => (
                      <div
                        key={publisher}
                        className="bg-gray-50 rounded-lg p-3"
                      >
                        <p className="text-sm font-medium text-gray-900">{publisher}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Feeding digital intelligence
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Maverick AI + Precise Intelligence</h3>
                </div>
                <span className="text-sm opacity-80">Real-time insights</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <h4 className="font-medium mb-2">Cross-Platform Opportunity</h4>
                  <p className="text-sm opacity-90">
                    Streaming bucket learning from broadcast patterns suggests
                    reallocating budget for optimal performance across platforms.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <h4 className="font-medium mb-2">Frequency Optimization</h4>
                  <p className="text-sm opacity-90">
                    Linear insights reveal frequency optimization opportunities.
                    Each bucket's data enhances overall campaign efficiency.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <h4 className="font-medium mb-2">Annalect Data Activation</h4>
                  <p className="text-sm opacity-90">
                    Data bucket intelligence enhances all other platforms.
                    Cross-bucket learning identifies expansion opportunities.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedView === 'attribution' && (
          <div className="grid grid-cols-2 gap-8">
            {/* Attribution Flow */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Verified Attribution Path
              </h2>
              <div className="space-y-4">
                {[
                  { channel: 'Linear TV (FOX)', impact: 'Awareness', value: 'Foundation' },
                  { channel: 'Hulu Pre-Roll', impact: 'Consideration', value: 'Building' },
                  { channel: 'Disney+ Retargeting', impact: 'Intent', value: 'Engaging' },
                  { channel: 'Peacock + Annalect', impact: 'Conversion', value: 'Converting' }
                ].map((touchpoint, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-700">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{touchpoint.channel}</p>
                      <p className="text-sm text-gray-600">{touchpoint.impact}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{touchpoint.value}</p>
                      <p className="text-xs text-green-600">Verified</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Attribution Confidence</span>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-600">Fully Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Incrementality Testing */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Real-Time Incrementality
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Linear Only</span>
                    <span className="text-sm text-gray-600">Baseline</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Linear + Streaming</span>
                    <span className="text-sm text-green-600">Significant lift</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">+ Annalect Data</span>
                    <span className="text-sm text-purple-600">Maximum lift</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'optimization' && (
          <div className="space-y-8">
            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                AI-Powered Optimization Recommendations
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">High Confidence</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Reallocate Underperforming Linear Spend
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Linear bucket insights suggest streaming opportunities. 
                    Cross-platform intelligence enables smarter allocation.
                  </p>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                    Execute Optimization
                  </button>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">AI Learning</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    New High-Value Segment Discovered
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Data bucket intelligence discovered new audience synergies. 
                    Unified system reveals hidden opportunities across platforms.
                  </p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Explore Segment
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Predictions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                4-Week Performance Forecast
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Week 1</p>
                    <p className="text-2xl font-bold text-gray-900">Week 1</p>
                    <p className="text-xs text-gray-600">Baseline</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Week 2</p>
                    <p className="text-2xl font-bold text-gray-900">Week 2</p>
                    <p className="text-xs text-green-600">Improving</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Week 3</p>
                    <p className="text-2xl font-bold text-gray-900">Week 3</p>
                    <p className="text-xs text-green-600">Optimizing</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Week 4</p>
                    <p className="text-2xl font-bold text-purple-600">Week 4</p>
                    <p className="text-xs text-purple-600">Target achieved</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    High confidence based on unified intelligence system
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}