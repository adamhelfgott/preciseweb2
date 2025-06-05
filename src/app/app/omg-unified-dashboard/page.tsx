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
  RefreshCw,
  Sparkles,
  CreditCard,
  Filter,
  ChevronRight,
  Award,
  Lightbulb
} from 'lucide-react';

// Real platforms OMG works with
const platforms = {
  streaming: [
    { name: 'Hulu', logo: '🟢', color: 'green' },
    { name: 'Disney+', logo: '🔵', color: 'blue' },
    { name: 'Paramount+', logo: '⭐', color: 'yellow' },
    { name: 'Peacock', logo: '🦚', color: 'purple' },
    { name: 'Discovery+', logo: '🔍', color: 'orange' }
  ],
  broadcast: [
    { name: 'Fox', logo: '🦊', color: 'red' },
    { name: 'NBC', logo: '🏛️', color: 'blue' },
    { name: 'CBS', logo: '👁️', color: 'blue' },
    { name: 'ABC', logo: '🔴', color: 'red' }
  ],
  integrated: [
    { name: 'MadHive', logo: '🟣', color: 'purple' },
    { name: 'MediaOcean', logo: '🌊', color: 'blue' }
  ]
};

// Mock campaign data with platform-specific performance
const campaignData = {
  'Q1-2025-AUTO': {
    name: 'Q1 Auto Launch',
    totalBudget: 5200000,
    spent: 3120000,
    platforms: {
      'Hulu': { budget: 800000, spent: 480000, impressions: 24000000, cpm: 20, reach: 8000000, conversions: 4800 },
      'Disney+': { budget: 700000, spent: 420000, impressions: 19000000, cpm: 22, reach: 6500000, conversions: 3900 },
      'Fox': { budget: 600000, spent: 360000, impressions: 15000000, cpm: 24, reach: 5000000, conversions: 3000 },
      'NBC': { budget: 500000, spent: 300000, impressions: 12000000, cpm: 25, reach: 4000000, conversions: 2400 },
      'Paramount+': { budget: 400000, spent: 240000, impressions: 10000000, cpm: 24, reach: 3500000, conversions: 2000 },
      'Peacock': { budget: 350000, spent: 210000, impressions: 8400000, cpm: 25, reach: 2800000, conversions: 1680 },
      'CBS': { budget: 300000, spent: 180000, impressions: 7000000, cpm: 26, reach: 2300000, conversions: 1400 },
      'ABC': { budget: 250000, spent: 150000, impressions: 5500000, cpm: 27, reach: 1800000, conversions: 1100 },
      'Discovery+': { budget: 200000, spent: 120000, impressions: 4500000, cpm: 27, reach: 1500000, conversions: 900 },
      'MadHive': { budget: 1100000, spent: 660000, impressions: 30000000, cpm: 22, reach: 10000000, conversions: 6000 }
    },
    insights: [
      {
        source: 'Hulu',
        insight: 'Young professionals engage 3x more with auto content during weekday evenings',
        application: 'Fox Sports',
        impact: '25% efficiency gain',
        savings: 45000
      },
      {
        source: 'Disney+',
        insight: 'Family viewing patterns show high conversion for SUV models',
        application: 'NBC',
        impact: '18% better targeting',
        savings: 32000
      }
    ]
  }
};

export default function OMGUnifiedDashboard() {
  const [selectedView, setSelectedView] = useState<'unified' | 'platforms' | 'insights' | 'optimization' | 'internal'>('unified');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [selectedCampaign] = useState('Q1-2025-AUTO');
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [showReallocation, setShowReallocation] = useState(false);
  const [pivotView, setPivotView] = useState<'campaign' | 'channel'>('campaign');
  const [selectedPlatformDetail, setSelectedPlatformDetail] = useState<string | null>(null);

  const campaign = campaignData[selectedCampaign];

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes('all')) {
      setSelectedPlatforms([platform]);
    } else if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
      if (selectedPlatforms.length === 1) {
        setSelectedPlatforms(['all']);
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const getFilteredPlatforms = () => {
    if (selectedPlatforms.includes('all')) {
      return Object.keys(campaign.platforms);
    }
    return selectedPlatforms;
  };

  const calculateTotalSavings = () => {
    return campaign.insights.reduce((total, insight) => total + insight.savings, 0);
  };

  const calculateEfficiencyGain = () => {
    const totalSpent = Object.values(campaign.platforms).reduce((sum, p) => sum + p.spent, 0);
    const totalSavings = calculateTotalSavings();
    return ((totalSavings / totalSpent) * 100).toFixed(1);
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
                <span className="font-semibold">MadHive Unified System</span>
                <span className="text-gray-400">×</span>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span className="font-semibold">Precise Intelligence</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-700">Unified Execution Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setSelectedView('unified')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'unified'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Unified Overview
            </button>
            <button
              onClick={() => setSelectedView('platforms')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'platforms'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Platform Performance
            </button>
            <button
              onClick={() => setSelectedView('insights')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'insights'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Cross-Platform Insights
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
            <button
              onClick={() => setSelectedView('internal')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                selectedView === 'internal'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Internal Metrics
            </button>
          </div>
        </div>
      </div>

      {/* Platform Filter (when not in unified view) */}
      {selectedView !== 'unified' && (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">View:</span>
              <button
                onClick={() => setSelectedPlatforms(['all'])}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPlatforms.includes('all')
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Platforms
              </button>
              <div className="h-4 w-px bg-gray-300" />
              {Object.entries(platforms).map(([category, platformList]) => (
                <div key={category} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 capitalize">{category}:</span>
                  {platformList.map(platform => (
                    <button
                      key={platform.name}
                      onClick={() => togglePlatform(platform.name)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                        selectedPlatforms.includes(platform.name)
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span>{platform.logo}</span>
                      {platform.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedView === 'unified' && (
          <>
            {/* Campaign Summary with Media Credits */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{campaign.name}</h2>
                  <p className="text-purple-100">
                    Budget: ${(campaign.totalBudget / 1000000).toFixed(1)}M • 
                    Spent: ${(campaign.spent / 1000000).toFixed(1)}M • 
                    {((campaign.spent / campaign.totalBudget) * 100).toFixed(0)}% utilized
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <p className="text-sm text-purple-100">Cross-Platform Performance</p>
                    <p className="text-2xl font-bold">{Object.keys(campaign.platforms).length} Active</p>
                    <p className="text-sm text-purple-100 mt-1">
                      Real-time unified execution
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Performance Grid */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(campaign.platforms).map(([platform, data]) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer"
                  onClick={() => setSelectedPlatformDetail(platform)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {platforms.streaming.find(p => p.name === platform)?.logo ||
                         platforms.broadcast.find(p => p.name === platform)?.logo ||
                         platforms.integrated.find(p => p.name === platform)?.logo}
                      </span>
                      <h4 className="font-semibold">{platform}</h4>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedPlatform === platform ? 'rotate-90' : ''
                    }`} />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      Budget: ${(data.budget / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-gray-600">
                      Spent: ${(data.spent / 1000000).toFixed(1)}M
                    </p>
                    <p className="font-medium text-purple-600">
                      CPM: ${data.cpm}
                    </p>
                  </div>
                  {expandedPlatform === platform && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-200 space-y-1 text-sm"
                    >
                      <p className="text-gray-600">
                        Impressions: {(data.impressions / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-gray-600">
                        Reach: {(data.reach / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-gray-600">
                        Conversions: {data.conversions.toLocaleString()}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Cross-Platform Intelligence Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Active Intelligence Benefits</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {campaign.insights.slice(0, 2).map((insight, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {insight.source} → {insight.application}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {insight.insight}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-green-600">
                            {insight.impact}
                          </span>
                          <span className="text-sm text-gray-500">
                            +${insight.savings.toLocaleString()} saved
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedView === 'platforms' && (
          <>
            {/* Pivot Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Pivot by:</span>
                <button
                  onClick={() => setPivotView('campaign')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pivotView === 'campaign'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Campaign
                </button>
                <button
                  onClick={() => setPivotView('channel')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pivotView === 'channel'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Channel Type
                </button>
              </div>
            </div>

            {/* Platform Details */}
            <div className="space-y-6">
              {getFilteredPlatforms().map(platform => {
                const data = campaign.platforms[platform];
                const utilizationRate = (data.spent / data.budget) * 100;

                return (
                  <div key={platform} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">
                            {platforms.streaming.find(p => p.name === platform)?.logo ||
                             platforms.broadcast.find(p => p.name === platform)?.logo ||
                             platforms.integrated.find(p => p.name === platform)?.logo}
                          </span>
                          <div>
                            <h3 className="text-xl font-bold">{platform}</h3>
                            <p className="text-sm text-gray-600">
                              {platform === 'MadHive' ? 'Unified Execution Platform' : 
                               platform === 'MediaOcean' ? 'Workflow Integration' : 
                               'Premium Inventory'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">${data.cpm}</p>
                          <p className="text-sm text-gray-600">CPM</p>
                        </div>
                      </div>

                      {/* Budget Utilization */}
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Budget Utilization</span>
                          <span className="text-sm text-gray-600">
                            ${(data.spent / 1000000).toFixed(2)}M / ${(data.budget / 1000000).toFixed(2)}M
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                            style={{ width: `${utilizationRate}%` }}
                          />
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Impressions</p>
                          <p className="text-lg font-bold">{(data.impressions / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Reach</p>
                          <p className="text-lg font-bold">{(data.reach / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Frequency</p>
                          <p className="text-lg font-bold">
                            {(data.impressions / data.reach).toFixed(1)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Conversions</p>
                          <p className="text-lg font-bold">{data.conversions.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Platform-specific insights */}
                      {campaign.insights.find(i => i.source === platform) && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                This platform generated insights
                              </p>
                              <p className="text-sm text-green-700">
                                Applied to other platforms for +${
                                  campaign.insights
                                    .filter(i => i.source === platform)
                                    .reduce((sum, i) => sum + i.savings, 0)
                                    .toLocaleString()
                                } in savings
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {selectedView === 'insights' && (
          <div className="space-y-6">
            {/* Media Credits Summary */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Your Data Creates Value</h2>
                  <p className="text-green-100">
                    Campaign data from your network enhanced the MadHive system
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">${calculateTotalSavings().toLocaleString()}</p>
                  <p className="text-green-100">Total savings generated</p>
                  <p className="text-sm text-green-200 mt-1">
                    Additional efficiency: {calculateEfficiencyGain()}% lower CPM
                  </p>
                </div>
              </div>
            </div>

            {/* Cross-Platform Insights */}
            <h3 className="text-lg font-semibold text-gray-900">Cross-Platform Intelligence in Action</h3>
            <div className="space-y-4">
              {campaign.insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {platforms.streaming.find(p => p.name === insight.source)?.logo ||
                             platforms.broadcast.find(p => p.name === insight.source)?.logo}
                          </span>
                          <span className="font-semibold">{insight.source}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {platforms.streaming.find(p => p.name === insight.application)?.logo ||
                             platforms.broadcast.find(p => p.name === insight.application)?.logo}
                          </span>
                          <span className="font-semibold">{insight.application}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        <strong>Insight discovered:</strong> {insight.insight}
                      </p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">{insight.impact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">
                            +${insight.savings.toLocaleString()} in media credits
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* How It Works */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">How Your Data Generates Savings</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Learn</h4>
                  <p className="text-sm text-gray-600">
                    Your campaigns reveal audience behaviors on each platform
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Apply</h4>
                  <p className="text-sm text-gray-600">
                    MadHive AI applies insights across your network
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Earn</h4>
                  <p className="text-sm text-gray-600">
                    Efficiency gains convert to media credits
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'optimization' && (
          <div className="space-y-6">
            {/* AI Recommendations */}
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Recommendations</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Budget Reallocation */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shuffle className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold">Recommended Budget Shift</h4>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span>🏛️</span>
                        <span className="font-medium">NBC → </span>
                        <span>🟢</span>
                        <span className="font-medium">Hulu</span>
                      </div>
                      <span className="text-purple-700 font-bold">$50K</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Based on audience overlap analysis, young professionals watching NBC prime time
                      shows 87% match with Hulu's high-converting segments
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">
                        Projected: +2,100 conversions
                      </span>
                      <button
                        onClick={() => setShowReallocation(true)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                      >
                        Execute Shift
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span>👁️</span>
                        <span className="font-medium">CBS → </span>
                        <span>🔵</span>
                        <span className="font-medium">Disney+</span>
                      </div>
                      <span className="text-blue-700 font-bold">$30K</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Family viewing patterns on CBS align with Disney+ SUV campaign performance
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">
                        Projected: +1,400 conversions
                      </span>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        Execute Shift
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Predictions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">30-Day Performance Forecast</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Current Path</span>
                      <span className="text-sm text-gray-600">Baseline</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gray-600 h-3 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Projected conversions: 42,000</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">With Optimizations</span>
                      <span className="text-sm text-green-600">+18% lift</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Projected conversions: 49,560</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">With Full Intelligence</span>
                      <span className="text-sm text-purple-600">+32% lift</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">Projected conversions: 55,440</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-900">
                    <strong>Intelligence Impact:</strong> Cross-platform learnings compound
                    over time. Each optimization makes future campaigns smarter.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Health Scores */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">Platform Efficiency Scores</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(campaign.platforms).slice(0, 5).map(([platform, data]) => {
                  const efficiency = Math.round((data.conversions / data.spent) * 10000);
                  return (
                    <div key={platform} className="text-center">
                      <div className="relative">
                        <div className="w-20 h-20 mx-auto">
                          <svg className="w-20 h-20 transform -rotate-90">
                            <circle
                              cx="40"
                              cy="40"
                              r="36"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="36"
                              stroke={efficiency > 50 ? '#10b981' : efficiency > 30 ? '#f59e0b' : '#ef4444'}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${efficiency * 2.26} 226`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold">{efficiency}</span>
                          </div>
                        </div>
                      </div>
                      <p className="font-medium mt-2">{platform}</p>
                      <p className="text-xs text-gray-600">Efficiency Score</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'internal' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Internal Performance Metrics</h3>
            
            {/* Media Credits Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">Media Credits & Efficiency Gains</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Campaign Credits</p>
                  <p className="text-2xl font-bold text-green-600">${calculateTotalSavings().toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">From cross-platform optimization</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Efficiency Gain</p>
                  <p className="text-2xl font-bold text-purple-600">{calculateEfficiencyGain()}%</p>
                  <p className="text-xs text-gray-500 mt-1">Lower effective CPM</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Quarterly Total</p>
                  <p className="text-2xl font-bold text-blue-600">$250K+</p>
                  <p className="text-xs text-gray-500 mt-1">Across all campaigns</p>
                </div>
              </div>
            </div>

            {/* Platform Learning Matrix */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">Cross-Platform Intelligence Matrix</h4>
              <div className="space-y-3">
                {campaign.insights.map((insight, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{platforms.streaming.find(p => p.name === insight.source)?.logo || platforms.broadcast.find(p => p.name === insight.source)?.logo}</span>
                        <span className="font-medium">{insight.source}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-lg">{platforms.streaming.find(p => p.name === insight.application)?.logo || platforms.broadcast.find(p => p.name === insight.application)?.logo}</span>
                        <span className="font-medium">{insight.application}</span>
                      </div>
                      <span className="text-green-600 font-bold">+${insight.savings.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">System Performance</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Attribution Speed</p>
                  <p className="text-xl font-bold">< 500ms</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Platform Sync</p>
                  <p className="text-xl font-bold">Real-time</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Data Processing</p>
                  <p className="text-xl font-bold">24/7</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Uptime</p>
                  <p className="text-xl font-bold">99.99%</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
                <h3 className="text-xl font-semibold">Budget Reallocation Executed</h3>
              </div>
              <p className="text-gray-600 mb-4">
                $50K successfully moved from NBC to Hulu. The unified system is now optimizing
                delivery based on cross-platform intelligence.
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Expected Results:</strong> +2,100 conversions within 7 days
                  based on audience overlap insights.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Detail Modal */}
      <AnimatePresence>
        {selectedPlatformDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPlatformDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {platforms.streaming.find(p => p.name === selectedPlatformDetail)?.logo ||
                       platforms.broadcast.find(p => p.name === selectedPlatformDetail)?.logo ||
                       platforms.integrated.find(p => p.name === selectedPlatformDetail)?.logo}
                    </span>
                    <h2 className="text-2xl font-bold">{selectedPlatformDetail}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedPlatformDetail(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {selectedPlatformDetail === 'MadHive' ? (
                  // MadHive Publisher Partners
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Publisher Partners</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {['Fox', 'NBC', 'CBS', 'ABC', 'Hulu', 'Disney+', 'Paramount+', 'Peacock'].map(publisher => (
                        <div key={publisher} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">
                                {platforms.streaming.find(p => p.name === publisher)?.logo ||
                                 platforms.broadcast.find(p => p.name === publisher)?.logo}
                              </span>
                              <h4 className="font-semibold">{publisher}</h4>
                            </div>
                            <span className="text-sm text-green-600">Active</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Inventory: {Math.floor(Math.random() * 500 + 100)}M avails</p>
                            <p>Avg CPM: ${Math.floor(Math.random() * 10 + 20)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular Platform Campaign View
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Active Campaigns</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Q1 Auto Launch - Sedan Line</h4>
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Budget</p>
                            <p className="font-semibold">${(campaign.platforms[selectedPlatformDetail].budget * 0.4 / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Spent</p>
                            <p className="font-semibold">${(campaign.platforms[selectedPlatformDetail].spent * 0.4 / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-gray-600">CPM</p>
                            <p className="font-semibold">${campaign.platforms[selectedPlatformDetail].cpm}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Conversions</p>
                            <p className="font-semibold">{Math.floor(campaign.platforms[selectedPlatformDetail].conversions * 0.4).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Q1 Auto Launch - SUV Line</h4>
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Budget</p>
                            <p className="font-semibold">${(campaign.platforms[selectedPlatformDetail].budget * 0.3 / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Spent</p>
                            <p className="font-semibold">${(campaign.platforms[selectedPlatformDetail].spent * 0.3 / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-gray-600">CPM</p>
                            <p className="font-semibold">${campaign.platforms[selectedPlatformDetail].cpm + 2}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Conversions</p>
                            <p className="font-semibold">{Math.floor(campaign.platforms[selectedPlatformDetail].conversions * 0.3).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Q1 Auto Launch - EV Line</h4>
                          <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Optimizing</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Budget</p>
                            <p className="font-semibold">${(campaign.platforms[selectedPlatformDetail].budget * 0.3 / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Spent</p>
                            <p className="font-semibold">${(campaign.platforms[selectedPlatformDetail].spent * 0.3 / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-gray-600">CPM</p>
                            <p className="font-semibold">${campaign.platforms[selectedPlatformDetail].cpm - 1}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Conversions</p>
                            <p className="font-semibold">{Math.floor(campaign.platforms[selectedPlatformDetail].conversions * 0.3).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}