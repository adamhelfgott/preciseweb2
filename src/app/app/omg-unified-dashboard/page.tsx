'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
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

// Type definitions
type PlatformData = {
  budget: number;
  spent: number;
  impressions: number;
  cpm: number;
  reach: number;
  conversions: number;
};

type CampaignData = {
  name: string;
  totalBudget: number;
  spent: number;
  platforms: Record<string, PlatformData>;
  insights: Array<{
    source: string;
    insight: string;
    application: string;
    impact: string;
    reachGain: number;
  }>;
};

// Advertiser data structure
type Advertiser = {
  id: string;
  name: string;
  industry: string;
  logo: string;
  campaigns: string[];
};

const advertisers: Record<string, Advertiser> = {
  'genesis-motors': {
    id: 'genesis-motors',
    name: 'Genesis Motors',
    industry: 'Automotive',
    logo: '🚗',
    campaigns: ['genesis-q1-launch', 'genesis-ev-push', 'genesis-holiday']
  },
  'burger-king': {
    id: 'burger-king',
    name: 'Burger King',
    industry: 'Fast Food',
    logo: '🍔',
    campaigns: ['bk-breakfast-battle', 'bk-summer-value', 'bk-app-downloads']
  },
  'target': {
    id: 'target',
    name: 'Target',
    industry: 'Retail',
    logo: '🎯',
    campaigns: ['target-back-to-school', 'target-black-friday', 'target-circle-week']
  }
};

// Mock campaign data with platform-specific performance
const campaignData: Record<string, CampaignData & { advertiserId: string }> = {
  // Genesis Motors Campaigns
  'genesis-q1-launch': {
    name: 'Q1 Luxury Launch',
    advertiserId: 'genesis-motors',
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
        insight: 'Young professionals engage 3x more with luxury auto content during weekday evenings',
        application: 'Fox Sports',
        impact: '+2.5M incremental reach',
        reachGain: 2500000
      },
      {
        source: 'Disney+',
        insight: 'Family viewing patterns show high conversion for SUV models',
        application: 'NBC',
        impact: '+1.8M new impressions',
        reachGain: 1800000
      }
    ]
  },
  'genesis-ev-push': {
    name: 'Electric Vehicle Campaign',
    advertiserId: 'genesis-motors',
    totalBudget: 3800000,
    spent: 1900000,
    platforms: {
      'Hulu': { budget: 900000, spent: 450000, impressions: 18000000, cpm: 25, reach: 6000000, conversions: 3600 },
      'Disney+': { budget: 600000, spent: 300000, impressions: 12000000, cpm: 25, reach: 4000000, conversions: 2400 },
      'NBC': { budget: 700000, spent: 350000, impressions: 13000000, cpm: 27, reach: 4300000, conversions: 2600 },
      'Peacock': { budget: 500000, spent: 250000, impressions: 9000000, cpm: 28, reach: 3000000, conversions: 1800 },
      'MadHive': { budget: 1100000, spent: 550000, impressions: 20000000, cpm: 28, reach: 7000000, conversions: 4200 }
    },
    insights: [
      {
        source: 'Peacock',
        insight: 'Tech-savvy millennials show 5x engagement with EV content during streaming premieres',
        application: 'Hulu',
        impact: '+3.2M tech audience reach',
        reachGain: 3200000
      }
    ]
  },
  'genesis-holiday': {
    name: 'Holiday Sales Event',
    advertiserId: 'genesis-motors',
    totalBudget: 2400000,
    spent: 480000,
    platforms: {
      'Fox': { budget: 800000, spent: 160000, impressions: 5300000, cpm: 30, reach: 1800000, conversions: 1100 },
      'NBC': { budget: 800000, spent: 160000, impressions: 5000000, cpm: 32, reach: 1700000, conversions: 1000 },
      'CBS': { budget: 400000, spent: 80000, impressions: 2400000, cpm: 33, reach: 800000, conversions: 480 },
      'ABC': { budget: 400000, spent: 80000, impressions: 2300000, cpm: 35, reach: 760000, conversions: 460 }
    },
    insights: []
  },
  
  // Burger King Campaigns
  'bk-breakfast-battle': {
    name: 'Breakfast Wars 2025',
    advertiserId: 'burger-king',
    totalBudget: 2800000,
    spent: 2100000,
    platforms: {
      'Hulu': { budget: 500000, spent: 375000, impressions: 18750000, cpm: 20, reach: 6250000, conversions: 37500 },
      'Fox': { budget: 600000, spent: 450000, impressions: 20000000, cpm: 23, reach: 6700000, conversions: 40000 },
      'NBC': { budget: 500000, spent: 375000, impressions: 15000000, cpm: 25, reach: 5000000, conversions: 30000 },
      'Peacock': { budget: 400000, spent: 300000, impressions: 13000000, cpm: 23, reach: 4300000, conversions: 26000 },
      'MadHive': { budget: 800000, spent: 600000, impressions: 30000000, cpm: 20, reach: 10000000, conversions: 60000 }
    },
    insights: [
      {
        source: 'Fox',
        insight: 'Morning news viewers convert 4x higher for breakfast offers before 9am',
        application: 'NBC',
        impact: '+4.1M morning reach',
        reachGain: 4100000
      },
      {
        source: 'MadHive',
        insight: 'Cross-platform breakfast seekers respond to mobile app incentives',
        application: 'Peacock',
        impact: '+2.8M app downloads',
        reachGain: 2800000
      }
    ]
  },
  'bk-summer-value': {
    name: 'Summer Value Menu',
    advertiserId: 'burger-king',
    totalBudget: 1800000,
    spent: 1350000,
    platforms: {
      'Hulu': { budget: 400000, spent: 300000, impressions: 15000000, cpm: 20, reach: 5000000, conversions: 30000 },
      'Disney+': { budget: 300000, spent: 225000, impressions: 9000000, cpm: 25, reach: 3000000, conversions: 18000 },
      'Paramount+': { budget: 350000, spent: 262500, impressions: 10500000, cpm: 25, reach: 3500000, conversions: 21000 },
      'Discovery+': { budget: 250000, spent: 187500, impressions: 7000000, cpm: 27, reach: 2300000, conversions: 14000 },
      'MadHive': { budget: 500000, spent: 375000, impressions: 17000000, cpm: 22, reach: 5700000, conversions: 34000 }
    },
    insights: [
      {
        source: 'Discovery+',
        insight: 'Food show viewers have 3.5x higher QSR engagement during episodes',
        application: 'Paramount+',
        impact: '+1.9M food enthusiasts',
        reachGain: 1900000
      }
    ]
  },
  'bk-app-downloads': {
    name: 'BK App Install Campaign',
    advertiserId: 'burger-king',
    totalBudget: 1200000,
    spent: 960000,
    platforms: {
      'Hulu': { budget: 400000, spent: 320000, impressions: 13000000, cpm: 25, reach: 4300000, conversions: 86000 },
      'Peacock': { budget: 300000, spent: 240000, impressions: 9000000, cpm: 27, reach: 3000000, conversions: 60000 },
      'MadHive': { budget: 500000, spent: 400000, impressions: 16000000, cpm: 25, reach: 5300000, conversions: 106000 }
    },
    insights: []
  },
  
  // Target Campaigns
  'target-back-to-school': {
    name: 'Back to School 2025',
    advertiserId: 'target',
    totalBudget: 4500000,
    spent: 3600000,
    platforms: {
      'Hulu': { budget: 700000, spent: 560000, impressions: 28000000, cpm: 20, reach: 9300000, conversions: 56000 },
      'Disney+': { budget: 900000, spent: 720000, impressions: 32000000, cpm: 23, reach: 10700000, conversions: 64000 },
      'NBC': { budget: 600000, spent: 480000, impressions: 19200000, cpm: 25, reach: 6400000, conversions: 38400 },
      'Peacock': { budget: 500000, spent: 400000, impressions: 16000000, cpm: 25, reach: 5300000, conversions: 32000 },
      'Paramount+': { budget: 400000, spent: 320000, impressions: 12800000, cpm: 25, reach: 4300000, conversions: 25600 },
      'ABC': { budget: 400000, spent: 320000, impressions: 11500000, cpm: 28, reach: 3800000, conversions: 23000 },
      'MadHive': { budget: 1000000, spent: 800000, impressions: 36000000, cpm: 22, reach: 12000000, conversions: 72000 }
    },
    insights: [
      {
        source: 'Disney+',
        insight: 'Parents streaming kids content convert 6x for school supplies during commercial breaks',
        application: 'ABC',
        impact: '+5.2M parent reach',
        reachGain: 5200000
      },
      {
        source: 'NBC',
        insight: 'Morning show viewers plan weekend shopping trips based on deals',
        application: 'Peacock',
        impact: '+3.1M weekend shoppers',
        reachGain: 3100000
      }
    ]
  },
  'target-black-friday': {
    name: 'Black Friday Mega Sale',
    advertiserId: 'target',
    totalBudget: 6000000,
    spent: 1200000,
    platforms: {
      'Hulu': { budget: 1000000, spent: 200000, impressions: 8000000, cpm: 25, reach: 2700000, conversions: 16000 },
      'Fox': { budget: 1200000, spent: 240000, impressions: 9000000, cpm: 27, reach: 3000000, conversions: 18000 },
      'NBC': { budget: 1000000, spent: 200000, impressions: 7400000, cpm: 27, reach: 2500000, conversions: 14800 },
      'CBS': { budget: 800000, spent: 160000, impressions: 5600000, cpm: 29, reach: 1900000, conversions: 11200 },
      'ABC': { budget: 600000, spent: 120000, impressions: 4000000, cpm: 30, reach: 1300000, conversions: 8000 },
      'MadHive': { budget: 1400000, spent: 280000, impressions: 11200000, cpm: 25, reach: 3700000, conversions: 22400 }
    },
    insights: []
  },
  'target-circle-week': {
    name: 'Target Circle Week',
    advertiserId: 'target',
    totalBudget: 3200000,
    spent: 2560000,
    platforms: {
      'Hulu': { budget: 800000, spent: 640000, impressions: 32000000, cpm: 20, reach: 10700000, conversions: 128000 },
      'Peacock': { budget: 600000, spent: 480000, impressions: 20000000, cpm: 24, reach: 6700000, conversions: 80000 },
      'Paramount+': { budget: 500000, spent: 400000, impressions: 16000000, cpm: 25, reach: 5300000, conversions: 64000 },
      'Discovery+': { budget: 400000, spent: 320000, impressions: 11500000, cpm: 28, reach: 3800000, conversions: 46000 },
      'MadHive': { budget: 900000, spent: 720000, impressions: 30000000, cpm: 24, reach: 10000000, conversions: 120000 }
    },
    insights: [
      {
        source: 'Hulu',
        insight: 'Target Circle members binge-watch and shop simultaneously, 8x conversion during shows',
        application: 'Paramount+',
        impact: '+4.5M member activations',
        reachGain: 4500000
      }
    ]
  }
};

export default function OMGUnifiedDashboard() {
  const [selectedView, setSelectedView] = useState<'unified' | 'platforms' | 'insights' | 'optimization' | 'internal'>('unified');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [showReallocation, setShowReallocation] = useState(false);
  const [pivotView, setPivotView] = useState<'advertiser' | 'campaign' | 'channel'>('advertiser');
  const [selectedPlatformDetail, setSelectedPlatformDetail] = useState<string | null>(null);

  // Get campaigns based on selected advertiser
  const getFilteredCampaigns = () => {
    if (selectedAdvertiser === 'all') {
      return Object.keys(campaignData);
    }
    return advertisers[selectedAdvertiser]?.campaigns || [];
  };

  // Get campaign data for display
  const campaign = selectedCampaign ? campaignData[selectedCampaign] : null;

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

  // Calculate aggregated data for all campaigns or specific advertiser
  const getAggregatedData = () => {
    const campaigns = getFilteredCampaigns();
    let totalBudget = 0;
    let totalSpent = 0;
    let totalImpressions = 0;
    let totalReach = 0;
    let totalConversions = 0;
    const platformTotals: Record<string, { budget: number; spent: number; impressions: number; reach: number; conversions: number }> = {};

    campaigns.forEach(campaignId => {
      const camp = campaignData[campaignId];
      totalBudget += camp.totalBudget;
      totalSpent += camp.spent;
      
      Object.entries(camp.platforms).forEach(([platform, data]) => {
        if (!platformTotals[platform]) {
          platformTotals[platform] = { budget: 0, spent: 0, impressions: 0, reach: 0, conversions: 0 };
        }
        platformTotals[platform].budget += data.budget;
        platformTotals[platform].spent += data.spent;
        platformTotals[platform].impressions += data.impressions;
        platformTotals[platform].reach += data.reach;
        platformTotals[platform].conversions += data.conversions;
        
        totalImpressions += data.impressions;
        totalReach += data.reach;
        totalConversions += data.conversions;
      });
    });

    return { totalBudget, totalSpent, totalImpressions, totalReach, totalConversions, platformTotals };
  };

  const calculateTotalReachGain = () => {
    if (campaign) {
      return campaign.insights.reduce((total, insight) => total + insight.reachGain, 0);
    }
    // Calculate across all filtered campaigns
    const campaigns = getFilteredCampaigns();
    return campaigns.reduce((total, campaignId) => {
      const camp = campaignData[campaignId];
      return total + camp.insights.reduce((sum, insight) => sum + insight.reachGain, 0);
    }, 0);
  };

  const calculateMediaCredits = () => {
    // Media credits from MadHive for contributing to ML models
    // Different amounts per advertiser
    const credits = {
      'genesis-motors': 77000,
      'burger-king': 45000,
      'target': 92000,
      'all': 214000
    };
    return credits[selectedAdvertiser] || credits['all'];
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
                <Icon size={24} />
                <span className="font-semibold">Precise Intelligence</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Advertiser Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Advertiser:</span>
                <select
                  value={selectedAdvertiser}
                  onChange={(e) => {
                    setSelectedAdvertiser(e.target.value);
                    setSelectedCampaign(null); // Reset campaign selection
                  }}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Advertisers</option>
                  {Object.values(advertisers).map(advertiser => (
                    <option key={advertiser.id} value={advertiser.id}>
                      {advertiser.logo} {advertiser.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-700">Unified Execution Active</span>
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
            {/* Campaign Selector */}
            {selectedAdvertiser !== 'all' && (
              <div className="mb-6 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">Campaign:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !selectedCampaign
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Campaigns
                  </button>
                  {getFilteredCampaigns().map(campaignId => (
                    <button
                      key={campaignId}
                      onClick={() => setSelectedCampaign(campaignId)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCampaign === campaignId
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {campaignData[campaignId].name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Campaign Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  {campaign ? (
                    <>
                      <h2 className="text-2xl font-bold mb-2">{campaign.name}</h2>
                      <p className="text-purple-100">
                        Budget: ${(campaign.totalBudget / 1000000).toFixed(1)}M • 
                        Spent: ${(campaign.spent / 1000000).toFixed(1)}M • 
                        {((campaign.spent / campaign.totalBudget) * 100).toFixed(0)}% utilized
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedAdvertiser === 'all' ? 'All Advertisers' : advertisers[selectedAdvertiser].name}
                      </h2>
                      <p className="text-purple-100">
                        {(() => {
                          const data = getAggregatedData();
                          return `Budget: $${(data.totalBudget / 1000000).toFixed(1)}M • 
                                  Spent: $${(data.totalSpent / 1000000).toFixed(1)}M • 
                                  ${((data.totalSpent / data.totalBudget) * 100).toFixed(0)}% utilized`;
                        })()}
                      </p>
                    </>
                  )}
                </div>
                <div className="text-right">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <p className="text-sm text-purple-100">Active Campaigns</p>
                    <p className="text-2xl font-bold">{getFilteredCampaigns().length}</p>
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
              {campaign ? (
                // Show specific campaign data
                Object.entries(campaign.platforms).map(([platform, data]) => (
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
              ))
              ) : (
                // Show aggregated data
                Object.entries(getAggregatedData().platformTotals)
                  .sort((a, b) => b[1].spent - a[1].spent) // Sort by spent
                  .map(([platform, data]) => (
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
                        Avg CPM: ${(data.spent / data.impressions * 1000).toFixed(0)}
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
                ))
              )}
            </div>

            {/* Cross-Platform Intelligence Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Active Intelligence Benefits</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(() => {
                  const insights = campaign 
                    ? campaign.insights.slice(0, 2)
                    : getFilteredCampaigns()
                        .flatMap(campaignId => campaignData[campaignId].insights)
                        .slice(0, 2);
                  return insights.map((insight, idx) => (
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
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                            {insight.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  ));
                })()}
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
                  onClick={() => setPivotView('advertiser')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pivotView === 'advertiser'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Advertiser
                </button>
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
              {(() => {
                if (pivotView === 'advertiser') {
                  // Show platforms grouped by advertiser
                  const advertisersToShow = selectedAdvertiser === 'all' 
                    ? Object.values(advertisers)
                    : [advertisers[selectedAdvertiser]];
                  
                  return advertisersToShow.map(advertiser => (
                    <div key={advertiser.id} className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="text-2xl">{advertiser.logo}</span>
                        {advertiser.name}
                      </h3>
                      {Object.entries(getAggregatedData().platformTotals)
                        .filter(([platform]) => {
                          // Only show platforms this advertiser uses
                          return advertiser.campaigns.some(campaignId => 
                            campaignData[campaignId].platforms[platform]
                          );
                        })
                        .map(([platform, data]) => {
                          const advertiserData = advertiser.campaigns.reduce((acc, campaignId) => {
                            const campData = campaignData[campaignId].platforms[platform];
                            if (campData) {
                              acc.budget += campData.budget;
                              acc.spent += campData.spent;
                              acc.impressions += campData.impressions;
                              acc.reach += campData.reach;
                              acc.conversions += campData.conversions;
                            }
                            return acc;
                          }, { budget: 0, spent: 0, impressions: 0, reach: 0, conversions: 0 });
                          
                          const utilizationRate = advertiserData.budget > 0 ? (advertiserData.spent / advertiserData.budget) * 100 : 0;
                          
                          if (advertiserData.budget === 0) return null;
                          
                          return (
                            <div key={platform} className="bg-white rounded-xl shadow-sm overflow-hidden ml-8 mb-4">
                              <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">
                                      {platforms.streaming.find(p => p.name === platform)?.logo ||
                                       platforms.broadcast.find(p => p.name === platform)?.logo ||
                                       platforms.integrated.find(p => p.name === platform)?.logo}
                                    </span>
                                    <div>
                                      <h4 className="text-lg font-bold">{platform}</h4>
                                      <p className="text-sm text-gray-600">
                                        {platform === 'MadHive' ? 'Unified Execution Platform' : 
                                         platform === 'MediaOcean' ? 'Workflow Integration' : 
                                         'Premium Inventory'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-2xl font-bold">${advertiserData.spent > 0 ? (advertiserData.spent / advertiserData.impressions * 1000).toFixed(0) : 0}</p>
                                    <p className="text-sm text-gray-600">Avg CPM</p>
                                  </div>
                                </div>

                                {/* Budget Utilization */}
                                <div className="mb-6">
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Budget Utilization</span>
                                    <span className="text-sm text-gray-600">
                                      ${(advertiserData.spent / 1000000).toFixed(2)}M / ${(advertiserData.budget / 1000000).toFixed(2)}M
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
                                    <p className="text-lg font-bold">{(advertiserData.impressions / 1000000).toFixed(1)}M</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-600 mb-1">Reach</p>
                                    <p className="text-lg font-bold">{(advertiserData.reach / 1000000).toFixed(1)}M</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-600 mb-1">Frequency</p>
                                    <p className="text-lg font-bold">
                                      {advertiserData.reach > 0 ? (advertiserData.impressions / advertiserData.reach).toFixed(1) : 0}
                                    </p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-600 mb-1">Conversions</p>
                                    <p className="text-lg font-bold">{advertiserData.conversions.toLocaleString()}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ));
                }
                
                // Default to showing all platforms with aggregated data
                const aggregatedData = getAggregatedData();
                return Object.entries(aggregatedData.platformTotals)
                  .filter(([_, data]) => data.budget > 0)
                  .sort((a, b) => b[1].spent - a[1].spent)
                  .map(([platform, data]) => {
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
                              <p className="text-2xl font-bold">${data.spent > 0 ? (data.spent / data.impressions * 1000).toFixed(0) : 0}</p>
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
                      {(() => {
                        const platformInsights = getFilteredCampaigns()
                          .flatMap(campaignId => campaignData[campaignId].insights)
                          .filter(i => i.source === platform);
                        
                        if (platformInsights.length > 0) {
                          return (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-green-900">
                                    This platform generated {platformInsights.length} insights
                                  </p>
                                  <p className="text-sm text-green-700">
                                    Applied to other platforms for {
                                      platformInsights
                                        .map(i => i.impact)
                                        .join(', ')
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                );
              });
              })()}
            </div>
          </>
        )}

        {selectedView === 'insights' && (
          <div className="space-y-6">
            {/* Reach Gains Summary */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Cross-Platform Intelligence Creates Reach</h2>
                  <p className="text-purple-100">
                    Platform insights unlock new audiences and incremental impressions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">+{(calculateTotalReachGain() / 1000000).toFixed(1)}M</p>
                  <p className="text-purple-100">Incremental reach gained</p>
                  <p className="text-sm text-purple-200 mt-1">
                    From cross-platform optimization
                  </p>
                </div>
              </div>
            </div>

            {/* Cross-Platform Insights */}
            <h3 className="text-lg font-semibold text-gray-900">Cross-Platform Intelligence in Action</h3>
            <div className="space-y-4">
              {(() => {
                const allInsights = getFilteredCampaigns()
                  .flatMap(campaignId => campaignData[campaignId].insights)
                  .filter(insight => insight.reachGain > 0); // Only show insights with reach gains
                
                return allInsights.map((insight, idx) => (
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
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded">
                          {insight.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ));
              })()}
            </div>

            {/* How It Works */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">How Cross-Platform Intelligence Creates Reach</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Discover</h4>
                  <p className="text-sm text-gray-600">
                    Hulu reveals high-value audience segments
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Apply</h4>
                  <p className="text-sm text-gray-600">
                    Fox Sports targets those same audiences
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Expand</h4>
                  <p className="text-sm text-gray-600">
                    Unlock incremental reach and impressions
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
                {(() => {
                  const platformData = campaign 
                    ? Object.entries(campaign.platforms).slice(0, 5)
                    : Object.entries(getAggregatedData().platformTotals)
                        .filter(([_, data]) => data.spent > 0)
                        .slice(0, 5);
                  
                  return platformData.map(([platform, data]) => {
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
                  });
                })()}
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
                  <p className="text-sm text-gray-600 mb-1">MadHive ML Credits</p>
                  <p className="text-2xl font-bold text-green-600">${calculateMediaCredits().toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">For contributing to ML models</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Data Value Score</p>
                  <p className="text-2xl font-bold text-purple-600">92/100</p>
                  <p className="text-xs text-gray-500 mt-1">Quality of campaign data</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Quarterly Total</p>
                  <p className="text-2xl font-bold text-blue-600">$250K+</p>
                  <p className="text-xs text-gray-500 mt-1">Total ML contribution credits</p>
                </div>
              </div>
            </div>

            {/* Platform Learning Matrix */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">Cross-Platform Intelligence Matrix</h4>
              <div className="space-y-3">
                {(() => {
                  const allInsights = getFilteredCampaigns()
                    .flatMap(campaignId => campaignData[campaignId].insights)
                    .filter(insight => insight && insight.reachGain > 0);
                  
                  return allInsights.map((insight, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{platforms.streaming.find(p => p.name === insight.source)?.logo || platforms.broadcast.find(p => p.name === insight.source)?.logo}</span>
                          <span className="font-medium">{insight.source}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <span className="text-lg">{platforms.streaming.find(p => p.name === insight.application)?.logo || platforms.broadcast.find(p => p.name === insight.application)?.logo}</span>
                          <span className="font-medium">{insight.application}</span>
                        </div>
                        <span className="text-green-600 font-bold">{insight.impact}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{insight.insight}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Technical Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">System Performance</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Attribution Speed</p>
                  <p className="text-xl font-bold">&lt; 500ms</p>
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
                ) : selectedPlatformDetail ? (
                  // Regular Platform Campaign View
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Active Campaigns on {selectedPlatformDetail}</h3>
                    <div className="space-y-4">
                      {(() => {
                        // Group campaigns by advertiser
                        const campaignsByAdvertiser = getFilteredCampaigns()
                          .filter(campaignId => campaignData[campaignId].platforms[selectedPlatformDetail])
                          .reduce((acc, campaignId) => {
                            const campaign = campaignData[campaignId];
                            const advertiser = advertisers[campaign.advertiserId];
                            if (!acc[campaign.advertiserId]) {
                              acc[campaign.advertiserId] = {
                                advertiser,
                                campaigns: []
                              };
                            }
                            acc[campaign.advertiserId].campaigns.push({ id: campaignId, ...campaign });
                            return acc;
                          }, {} as Record<string, { advertiser: Advertiser; campaigns: any[] }>);
                        
                        return Object.entries(campaignsByAdvertiser).map(([advertiserId, data]) => (
                          <div key={advertiserId} className="space-y-3">
                            <h4 className="font-medium text-gray-700 flex items-center gap-2">
                              <span className="text-xl">{data.advertiser.logo}</span>
                              {data.advertiser.name}
                            </h4>
                            {data.campaigns.map(campaign => {
                              const platformData = campaign.platforms[selectedPlatformDetail];
                              const spentPercentage = (platformData.spent / platformData.budget * 100).toFixed(0);
                              
                              return (
                                <div key={campaign.id} className="bg-gray-50 rounded-lg p-4 ml-8">
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-semibold">{campaign.name}</h5>
                                    <span className={`text-sm px-2 py-1 rounded ${
                                      spentPercentage < 50 ? 'bg-green-100 text-green-700' :
                                      spentPercentage < 80 ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {spentPercentage}% Spent
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-600">Budget</p>
                                      <p className="font-semibold">${(platformData.budget / 1000000).toFixed(2)}M</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Spent</p>
                                      <p className="font-semibold">${(platformData.spent / 1000000).toFixed(2)}M</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">CPM</p>
                                      <p className="font-semibold">${platformData.cpm}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Conversions</p>
                                      <p className="font-semibold">{platformData.conversions.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}