'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronUp,
  Play,
  Monitor,
  Tv,
  Radio,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Shuffle,
  Target,
  Eye,
  Clock,
  RefreshCw
} from 'lucide-react';

// Supply sources from the MadHive deck
const supplyBuckets = {
  streaming: ['Disney+', 'Hulu', 'Peacock', 'Paramount+', 'Discovery+'],
  broadcast: ['FOX', 'NBC', 'CBS', 'ABC'],
  linear: ['MLB.com', 'Local Broadcast'],
  data: ['Annalect', 'Polk', 'S&P Global', 'MadHive Data Marketplace']
};

// Mock campaign data
const campaigns = [
  {
    id: 'Q1-2025-AUTO',
    name: 'Q1 Auto Launch',
    status: 'active',
    totalBudget: 5200000,
    spent: 3120000,
    performance: {
      impressions: 125000000,
      reach: 45000000,
      frequency: 2.8,
      conversions: 15600,
      cpa: 200,
      roas: 3.2
    },
    channels: {
      streaming: {
        spend: 1560000,
        impressions: 62500000,
        conversions: 7800,
        trend: 'up',
        platforms: {
          'Disney+': { spend: 468000, impressions: 18750000, cpa: 180, trend: 'up' },
          'Hulu': { spend: 390000, impressions: 15625000, cpa: 195, trend: 'stable' },
          'Peacock': { spend: 312000, impressions: 12500000, cpa: 210, trend: 'down' },
          'Paramount+': { spend: 234000, impressions: 9375000, cpa: 205, trend: 'up' },
          'Discovery+': { spend: 156000, impressions: 6250000, cpa: 220, trend: 'stable' }
        }
      },
      broadcast: {
        spend: 936000,
        impressions: 37500000,
        conversions: 4680,
        trend: 'stable',
        platforms: {
          'FOX': { spend: 312000, impressions: 12500000, cpa: 190, trend: 'up' },
          'NBC': { spend: 234000, impressions: 9375000, cpa: 200, trend: 'stable' },
          'CBS': { spend: 234000, impressions: 9375000, cpa: 210, trend: 'down' },
          'ABC': { spend: 156000, impressions: 6250000, cpa: 215, trend: 'stable' }
        }
      },
      linear: {
        spend: 624000,
        impressions: 25000000,
        conversions: 3120,
        trend: 'down',
        platforms: {
          'MLB.com': { spend: 374400, impressions: 15000000, cpa: 240, trend: 'down' },
          'Local Broadcast': { spend: 249600, impressions: 10000000, cpa: 250, trend: 'down' }
        }
      }
    },
    recommendations: [
      {
        type: 'reallocation',
        urgency: 'high',
        from: 'linear',
        to: 'streaming',
        amount: 150000,
        impact: '+12% conversions',
        reason: 'Linear underperforming vs. streaming efficiency'
      },
      {
        type: 'optimization',
        urgency: 'medium',
        platform: 'Peacock',
        action: 'Refresh creatives',
        impact: 'Reduce CPA by 15%',
        reason: 'Creative fatigue detected'
      }
    ]
  },
  {
    id: 'BRAND-AWARENESS-2025',
    name: 'Brand Awareness Push',
    status: 'active',
    totalBudget: 3000000,
    spent: 1200000,
    performance: {
      impressions: 80000000,
      reach: 32000000,
      frequency: 2.5,
      conversions: 8000,
      cpa: 150,
      roas: 2.8
    },
    channels: {
      streaming: {
        spend: 600000,
        impressions: 40000000,
        conversions: 4400,
        trend: 'up',
        platforms: {
          'Disney+': { spend: 200000, impressions: 13333333, cpa: 136, trend: 'up' },
          'Hulu': { spend: 150000, impressions: 10000000, cpa: 142, trend: 'up' },
          'Peacock': { spend: 100000, impressions: 6666667, cpa: 155, trend: 'stable' },
          'Paramount+': { spend: 100000, impressions: 6666667, cpa: 160, trend: 'stable' },
          'Discovery+': { spend: 50000, impressions: 3333333, cpa: 165, trend: 'down' }
        }
      },
      broadcast: {
        spend: 480000,
        impressions: 32000000,
        conversions: 3200,
        trend: 'up',
        platforms: {
          'FOX': { spend: 150000, impressions: 10000000, cpa: 140, trend: 'up' },
          'NBC': { spend: 130000, impressions: 8666667, cpa: 145, trend: 'up' },
          'CBS': { spend: 120000, impressions: 8000000, cpa: 150, trend: 'stable' },
          'ABC': { spend: 80000, impressions: 5333333, cpa: 155, trend: 'stable' }
        }
      },
      linear: {
        spend: 120000,
        impressions: 8000000,
        conversions: 400,
        trend: 'stable',
        platforms: {
          'MLB.com': { spend: 72000, impressions: 4800000, cpa: 180, trend: 'stable' },
          'Local Broadcast': { spend: 48000, impressions: 3200000, cpa: 190, trend: 'down' }
        }
      }
    },
    recommendations: [
      {
        type: 'expansion',
        urgency: 'high',
        platform: 'Disney+',
        amount: 100000,
        impact: '+15% reach efficiency',
        reason: 'Best performing platform with headroom'
      }
    ]
  }
];

export default function OMGUnifiedDashboard() {
  const [selectedView, setSelectedView] = useState<'campaigns' | 'overview' | 'attribution' | 'optimization'>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const [showReallocation, setShowReallocation] = useState(false);

  const handleReallocation = (recommendation: any) => {
    setShowReallocation(true);
    // In a real app, this would trigger the actual reallocation
    setTimeout(() => setShowReallocation(false), 3000);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    return <ArrowRight className="w-4 h-4 text-gray-400" />;
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'streaming': return <Monitor className="w-5 h-5 text-purple-600" />;
      case 'broadcast': return <Tv className="w-5 h-5 text-blue-600" />;
      case 'linear': return <Radio className="w-5 h-5 text-orange-600" />;
      default: return <BarChart3 className="w-5 h-5 text-gray-600" />;
    }
  };

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
                <span className="text-sm text-green-700">Live Cross-Platform Learning</span>
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
              onClick={() => setSelectedView('campaigns')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'campaigns'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Campaign Performance
            </button>
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
        {selectedView === 'campaigns' && (
          <>
            {/* Campaign Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <select
                  value={selectedCampaign.id}
                  onChange={(e) => setSelectedCampaign(campaigns.find(c => c.id === e.target.value) || campaigns[0])}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.name} - ${(campaign.spent / 1000000).toFixed(1)}M / ${(campaign.totalBudget / 1000000).toFixed(1)}M
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${selectedCampaign.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-600 capitalize">{selectedCampaign.status}</span>
                </div>
              </div>
            </div>

            {/* Campaign Metrics */}
            <div className="grid grid-cols-6 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Budget Spent</span>
                  <DollarSign className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${(selectedCampaign.spent / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500">
                  {((selectedCampaign.spent / selectedCampaign.totalBudget) * 100).toFixed(0)}% used
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Impressions</span>
                  <Eye className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {(selectedCampaign.performance.impressions / 1000000).toFixed(0)}M
                </p>
                <p className="text-xs text-green-600">Cross-platform</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Reach</span>
                  <Users className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {(selectedCampaign.performance.reach / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-purple-600">Unified</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Frequency</span>
                  <Activity className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {selectedCampaign.performance.frequency.toFixed(1)}x
                </p>
                <p className="text-xs text-blue-600">Optimized</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">CPA</span>
                  <Target className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${selectedCampaign.performance.cpa}
                </p>
                <p className="text-xs text-green-600">Verified</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">ROAS</span>
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {selectedCampaign.performance.roas.toFixed(1)}x
                </p>
                <p className="text-xs text-green-600">Proven</p>
              </motion.div>
            </div>

            {/* Channel Performance Breakdown */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cross-Platform Performance & Learning
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RefreshCw className="w-4 h-4" />
                    <span>Real-time optimization</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {Object.entries(selectedCampaign.channels).map(([channel, data]) => (
                  <div key={channel} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedChannel(expandedChannel === channel ? null : channel)}
                      className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getChannelIcon(channel)}
                          <div className="text-left">
                            <h3 className="font-medium capitalize">{channel}</h3>
                            <p className="text-sm text-gray-600">
                              ${(data.spend / 1000000).toFixed(2)}M spent • {(data.impressions / 1000000).toFixed(0)}M impressions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{data.conversions.toLocaleString()} conversions</p>
                            <div className="flex items-center gap-1 justify-end">
                              {getTrendIcon(data.trend)}
                              <span className="text-xs text-gray-600">Performance trend</span>
                            </div>
                          </div>
                          {expandedChannel === channel ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedChannel === channel && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-white">
                            <div className="grid grid-cols-5 gap-3">
                              {Object.entries(data.platforms).map(([platform, platformData]) => (
                                <div key={platform} className="border border-gray-200 rounded-lg p-3">
                                  <h4 className="font-medium text-sm mb-2">{platform}</h4>
                                  <div className="space-y-1 text-xs">
                                    <p className="text-gray-600">
                                      Spend: ${(platformData.spend / 1000).toFixed(0)}K
                                    </p>
                                    <p className="text-gray-600">
                                      Impr: {(platformData.impressions / 1000000).toFixed(1)}M
                                    </p>
                                    <p className="text-gray-600">
                                      CPA: ${platformData.cpa}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2">
                                      {getTrendIcon(platformData.trend)}
                                      <span className="text-gray-500">Trend</span>
                                    </div>
                                  </div>
                                  {platformData.trend === 'down' && (
                                    <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                                      AI suggests optimization
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Cross-Platform Intelligence */}
                            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-600" />
                                Cross-Platform Intelligence
                              </h4>
                              <p className="text-xs text-gray-700">
                                {channel === 'streaming' && 'Learning from broadcast prime-time patterns to optimize streaming ad placement. Linear TV viewing habits enhance targeting.'}
                                {channel === 'broadcast' && 'Streaming engagement data improves broadcast targeting. Digital behaviors predict linear viewing patterns.'}
                                {channel === 'linear' && 'Digital engagement signals optimize linear buys. Streaming data identifies high-value linear audiences.'}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                AI-Powered Optimization Opportunities
              </h2>
              <div className="space-y-4">
                {selectedCampaign.recommendations.map((rec, idx) => (
                  <div key={idx} className={`border rounded-lg p-4 ${
                    rec.urgency === 'high' ? 'border-red-200 bg-red-50' : 
                    rec.urgency === 'medium' ? 'border-yellow-200 bg-yellow-50' : 
                    'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {rec.type === 'reallocation' && <Shuffle className="w-5 h-5 text-purple-600" />}
                          {rec.type === 'optimization' && <Zap className="w-5 h-5 text-yellow-600" />}
                          {rec.type === 'expansion' && <TrendingUp className="w-5 h-5 text-green-600" />}
                          <span className="font-medium capitalize">{rec.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            rec.urgency === 'high' ? 'bg-red-100 text-red-700' :
                            rec.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {rec.urgency} priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          {rec.from && rec.to && `Move $${(rec.amount / 1000).toFixed(0)}K from ${rec.from} to ${rec.to}`}
                          {rec.platform && rec.action && `${rec.action} on ${rec.platform}`}
                          {rec.platform && !rec.action && `Increase ${rec.platform} budget by $${(rec.amount / 1000).toFixed(0)}K`}
                        </p>
                        <p className="text-xs text-gray-600">{rec.reason}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-medium text-green-700">{rec.impact}</span>
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-gray-600">Verified by Precise</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleReallocation(rec)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Execute
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reallocation Success Modal */}
            <AnimatePresence>
              {showReallocation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={() => setShowReallocation(false)}
                >
                  <div className="bg-white rounded-xl p-8 max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <h3 className="text-xl font-semibold">Optimization Executed</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Budget reallocation in progress. The unified intelligence system is now optimizing across all platforms.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Changes will reflect in 2-3 minutes</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {selectedView === 'overview' && (
          <>
            {/* Aggregate Portfolio Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Portfolio Spend</span>
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">$8.2M</p>
                <p className="text-sm text-green-600 mt-1">Optimally allocated</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Reach</span>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">77M</p>
                <p className="text-sm text-purple-600 mt-1">Deduplicated</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Portfolio ROAS</span>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">3.0x</p>
                <p className="text-sm text-green-600 mt-1">Cross-platform lift</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Intelligence Score</span>
                  <Brain className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-sm text-purple-600 mt-1">Learning efficiency</p>
              </motion.div>
            </div>

            {/* Cross-Platform Learning Matrix */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Real-Time Cross-Platform Intelligence Flow
              </h2>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Monitor className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="font-medium mb-2">Streaming</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>→ Enhances broadcast timing</p>
                    <p>→ Optimizes linear targeting</p>
                    <p>→ Feeds data enrichment</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Tv className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Broadcast</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>→ Informs streaming strategy</p>
                    <p>→ Validates linear reach</p>
                    <p>→ Enriches audience data</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Radio className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="font-medium mb-2">Linear</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>→ Guides digital timing</p>
                    <p>→ Validates streaming</p>
                    <p>→ Traditional behaviors</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Data</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>→ Powers all targeting</p>
                    <p>→ Verifies performance</p>
                    <p>→ Enables intelligence</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-green-50 rounded-lg">
                <p className="text-sm text-center text-gray-700">
                  <strong>Unified Intelligence:</strong> Every impression on any platform instantly improves performance across all others. 
                  The system continuously learns and optimizes in real-time.
                </p>
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
                  { channel: 'Linear TV (FOX)', impact: 'Awareness', value: 'Foundation', verified: true },
                  { channel: 'Hulu Pre-Roll', impact: 'Consideration', value: 'Building', verified: true },
                  { channel: 'Disney+ Retargeting', impact: 'Intent', value: 'Engaging', verified: true },
                  { channel: 'Peacock + Annalect', impact: 'Conversion', value: 'Converting', verified: true }
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
                      {touchpoint.verified && (
                        <div className="flex items-center gap-1 justify-end">
                          <Shield className="w-3 h-3 text-green-600" />
                          <p className="text-xs text-green-600">Verified</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Attribution Confidence</span>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-600">94% Cryptographically Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cross-Platform Incrementality */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Cross-Platform Incrementality
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Single Platform</span>
                    <span className="text-sm text-gray-600">Baseline</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-600 h-3 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Two Platforms</span>
                    <span className="text-sm text-blue-600">+85% lift</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Three Platforms</span>
                    <span className="text-sm text-purple-600">+150% lift</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">All Platforms + Data</span>
                    <span className="text-sm text-green-600">+220% lift</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Key Insight:</strong> Each platform exponentially enhances the others. 
                  The unified system delivers compounding returns through cross-platform intelligence.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'optimization' && (
          <div className="space-y-8">
            {/* Real-Time Optimization Engine */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                AI-Powered Cross-Platform Optimization Engine
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Executing Now</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Streaming → Broadcast Sync
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Disney+ engagement spike detected. Automatically increasing NBC prime-time allocation.
                  </p>
                  <div className="text-sm text-green-700">
                    Expected lift: +18% cross-platform efficiency
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Learning</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Linear Patterns Discovered
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    MLB.com viewers show high streaming affinity. Creating unified sports audience segment.
                  </p>
                  <div className="text-sm text-blue-700">
                    New segment size: 2.3M high-value users
                  </div>
                </div>

                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Opportunity</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Data Enhancement Available
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Annalect signals can enhance Peacock targeting. Zero-exposure activation ready.
                  </p>
                  <div className="text-sm text-purple-700">
                    Potential CPA reduction: -25%
                  </div>
                </div>
              </div>
            </div>

            {/* Unified Performance Forecast */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                30-Day Unified Performance Forecast
              </h2>
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Current State</p>
                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-md">
                      <div className="text-center">
                        <p className="text-2xl font-bold">3.0x</p>
                        <p className="text-xs text-gray-600">ROAS</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">Platform silos limiting performance</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Week 1</p>
                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-md border-2 border-blue-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">3.3x</p>
                        <p className="text-xs text-gray-600">ROAS</p>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600">Cross-platform learning begins</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Week 2</p>
                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-md border-2 border-purple-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">3.7x</p>
                        <p className="text-xs text-gray-600">ROAS</p>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600">Intelligence compounds</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Week 4</p>
                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-md border-2 border-green-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">4.2x</p>
                        <p className="text-xs text-gray-600">ROAS</p>
                      </div>
                    </div>
                    <p className="text-xs text-green-600">Fully optimized ecosystem</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-700">
                    <strong>Projected improvement:</strong> +40% ROAS through unified intelligence. 
                    Every platform learns from every other platform continuously.
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