'use client';

import { useState, useEffect, useRef } from 'react';
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
  Lightbulb,
  Settings2,
  Search,
  Bell,
  Pause,
  Share2,
  Download,
  MessageSquare,
  X,
  Keyboard,
  XCircle,
  Layers,
  Plus,
  Minus,
  Command,
  MapPin,
  Map
} from 'lucide-react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  Marker
} from 'react-simple-maps';

// Real platforms OMG works with
const platforms = {
  streaming: [
    { name: 'Hulu', logo: 'H', color: 'green' },
    { name: 'Disney+', logo: 'D+', color: 'blue' },
    { name: 'Paramount+', logo: 'P+', color: 'yellow' },
    { name: 'Peacock', logo: 'P', color: 'purple' },
    { name: 'Discovery+', logo: 'D', color: 'orange' }
  ],
  broadcast: [
    { name: 'Fox', logo: 'F', color: 'red' },
    { name: 'NBC', logo: 'N', color: 'blue' },
    { name: 'CBS', logo: 'C', color: 'blue' },
    { name: 'ABC', logo: 'A', color: 'red' }
  ],
  integrated: [
    { name: 'MadHive', logo: 'M', color: 'purple' },
    { name: 'MediaOcean', logo: 'MO', color: 'blue' }
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
  status?: 'healthy' | 'attention' | 'action' | 'optimizing';
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
  alerts?: Alert[];
};

type Alert = {
  id: string;
  type: 'pacing' | 'fatigue' | 'opportunity';
  severity: 'low' | 'medium' | 'high';
  message: string;
  action?: string;
  platform?: string;
};

// Advertiser data structure
type Advertiser = {
  id: string;
  name: string;
  industry: string;
  logo: string;
  campaigns: string[];
};

interface CollaboratorCursor {
  userId: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

const advertisers: Record<string, Advertiser> = {
  'genesis-motors': {
    id: 'genesis-motors',
    name: 'Genesis Motors',
    industry: 'Automotive',
    logo: 'GM',
    campaigns: ['genesis-q1-launch', 'genesis-ev-push', 'genesis-holiday']
  },
  'burger-king': {
    id: 'burger-king',
    name: 'Burger King',
    industry: 'Fast Food',
    logo: 'BK',
    campaigns: ['bk-breakfast-battle', 'bk-summer-value', 'bk-app-downloads']
  },
  'target': {
    id: 'target',
    name: 'Target',
    industry: 'Retail',
    logo: 'TG',
    campaigns: ['target-back-to-school', 'target-black-friday', 'target-circle-week']
  }
};

// Mock DMA data for heat map
const dmaMarkets: DMAData[] = [
  { id: '501', name: 'New York', state: 'NY', coordinates: [-74.006, 40.7128], streamingReach: 2340000, linearReach: 3450000, blendedReach: 5790000, targetDelivery: 68.2, population: 8500000 },
  { id: '803', name: 'Los Angeles', state: 'CA', coordinates: [-118.2437, 34.0522], streamingReach: 1890000, linearReach: 2560000, blendedReach: 4450000, targetDelivery: 62.5, population: 7100000 },
  { id: '602', name: 'Chicago', state: 'IL', coordinates: [-87.6298, 41.8781], streamingReach: 1560000, linearReach: 1980000, blendedReach: 3540000, targetDelivery: 71.3, population: 4970000 },
  { id: '504', name: 'Philadelphia', state: 'PA', coordinates: [-75.1652, 39.9526], streamingReach: 980000, linearReach: 1240000, blendedReach: 2220000, targetDelivery: 64.8, population: 3420000 },
  { id: '623', name: 'Dallas', state: 'TX', coordinates: [-96.7970, 32.7767], streamingReach: 1120000, linearReach: 1450000, blendedReach: 2570000, targetDelivery: 58.9, population: 4360000 },
  { id: '506', name: 'Boston', state: 'MA', coordinates: [-71.0589, 42.3601], streamingReach: 890000, linearReach: 1100000, blendedReach: 1990000, targetDelivery: 72.1, population: 2760000 },
  { id: '511', name: 'Washington DC', state: 'DC', coordinates: [-77.0369, 38.9072], streamingReach: 1120000, linearReach: 1380000, blendedReach: 2500000, targetDelivery: 69.5, population: 3600000 },
  { id: '524', name: 'Atlanta', state: 'GA', coordinates: [-84.3880, 33.7490], streamingReach: 980000, linearReach: 1290000, blendedReach: 2270000, targetDelivery: 61.2, population: 3710000 },
  { id: '807', name: 'San Francisco', state: 'CA', coordinates: [-122.4194, 37.7749], streamingReach: 760000, linearReach: 890000, blendedReach: 1650000, targetDelivery: 75.8, population: 2180000 },
  { id: '505', name: 'Detroit', state: 'MI', coordinates: [-83.0458, 42.3314], streamingReach: 670000, linearReach: 950000, blendedReach: 1620000, targetDelivery: 59.3, population: 2730000 }
];

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Mock campaign data with platform-specific performance
const campaignData: Record<string, CampaignData & { advertiserId: string }> = {
  // Genesis Motors Campaigns
  'genesis-q1-launch': {
    name: 'Q1 Luxury Launch',
    advertiserId: 'genesis-motors',
    totalBudget: 5200000,
    spent: 3120000,
    targetAudience: {
      definition: 'Adults 35-54, HHI $100K+',
      totalSize: 28000000,
      demographics: { gender: 'All', ageRange: '35-54', income: '$100K+' }
    },
    dmaData: dmaMarkets,
    platforms: {
      'Hulu': { budget: 800000, spent: 480000, impressions: 24000000, cpm: 20, reach: 8000000, conversions: 4800, status: 'healthy', grp: 28.6, reachPercentage: 28.6, targetReachPercentage: 71.4 },
      'Disney+': { budget: 700000, spent: 420000, impressions: 19000000, cpm: 22, reach: 6500000, conversions: 3900, status: 'attention', grp: 23.2, reachPercentage: 23.2, targetReachPercentage: 68.7 },
      'Fox': { budget: 600000, spent: 360000, impressions: 15000000, cpm: 24, reach: 5000000, conversions: 3000, status: 'healthy', grp: 17.9, reachPercentage: 17.9, targetReachPercentage: 65.2 },
      'NBC': { budget: 500000, spent: 300000, impressions: 12000000, cpm: 25, reach: 4000000, conversions: 2400, status: 'optimizing' },
      'Paramount+': { budget: 400000, spent: 240000, impressions: 10000000, cpm: 24, reach: 3500000, conversions: 2000, status: 'healthy' },
      'Peacock': { budget: 350000, spent: 210000, impressions: 8400000, cpm: 25, reach: 2800000, conversions: 1680, status: 'healthy' },
      'CBS': { budget: 300000, spent: 180000, impressions: 7000000, cpm: 26, reach: 2300000, conversions: 1400, status: 'healthy' },
      'ABC': { budget: 250000, spent: 150000, impressions: 5500000, cpm: 27, reach: 1800000, conversions: 1100, status: 'action' },
      'Discovery+': { budget: 200000, spent: 120000, impressions: 4500000, cpm: 27, reach: 1500000, conversions: 900, status: 'healthy' },
      'MadHive': { budget: 1100000, spent: 660000, impressions: 30000000, cpm: 22, reach: 10000000, conversions: 6000, status: 'healthy' }
    },
    insights: [
      {
        source: 'Hulu',
        insight: 'Young professionals engage 3x more with luxury auto content during weekday evenings',
        application: 'Fox Sports',
        impact: '+2.5M incremental reach among Adults 35-54',
        reachGain: 2500000,
        targetDemo: 'Adults 35-54'
      },
      {
        source: 'Disney+',
        insight: 'Family viewing patterns show high conversion for SUV models',
        application: 'NBC',
        impact: '+1.8M new impressions among HHI $100K+',
        reachGain: 1800000,
        targetDemo: 'HHI $100K+'
      }
    ],
    alerts: [
      {
        id: '1',
        type: 'pacing',
        severity: 'medium',
        message: 'Disney+ pacing 15% behind schedule',
        action: 'Increase bid by 10%',
        platform: 'Disney+'
      },
      {
        id: '2',
        type: 'fatigue',
        severity: 'low',
        message: 'Creative showing early fatigue signs on ABC',
        action: 'Refresh creative',
        platform: 'ABC'
      }
    ]
  },
  'genesis-ev-push': {
    name: 'Electric Vehicle Campaign',
    advertiserId: 'genesis-motors',
    totalBudget: 3800000,
    spent: 1900000,
    platforms: {
      'Hulu': { budget: 900000, spent: 450000, impressions: 18000000, cpm: 25, reach: 6000000, conversions: 3600, status: 'healthy' },
      'Disney+': { budget: 600000, spent: 300000, impressions: 12000000, cpm: 25, reach: 4000000, conversions: 2400, status: 'healthy' },
      'NBC': { budget: 700000, spent: 350000, impressions: 13000000, cpm: 27, reach: 4300000, conversions: 2600, status: 'healthy' },
      'Peacock': { budget: 500000, spent: 250000, impressions: 9000000, cpm: 28, reach: 3000000, conversions: 1800, status: 'attention' },
      'MadHive': { budget: 1100000, spent: 550000, impressions: 20000000, cpm: 28, reach: 7000000, conversions: 4200, status: 'healthy' }
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
      'Fox': { budget: 800000, spent: 160000, impressions: 5300000, cpm: 30, reach: 1800000, conversions: 1100, status: 'healthy' },
      'NBC': { budget: 800000, spent: 160000, impressions: 5000000, cpm: 32, reach: 1700000, conversions: 1000, status: 'healthy' },
      'CBS': { budget: 400000, spent: 80000, impressions: 2400000, cpm: 33, reach: 800000, conversions: 480, status: 'healthy' },
      'ABC': { budget: 400000, spent: 80000, impressions: 2300000, cpm: 35, reach: 760000, conversions: 460, status: 'healthy' }
    },
    insights: []
  },
  
  // Burger King Campaigns
  'bk-breakfast-battle': {
    name: 'Breakfast Wars 2025',
    advertiserId: 'burger-king',
    totalBudget: 2800000,
    spent: 2100000,
    targetAudience: {
      definition: 'Adults 18-34',
      totalSize: 45000000,
      demographics: { gender: 'All', ageRange: '18-34' }
    },
    dmaData: dmaMarkets,
    platforms: {
      'Hulu': { budget: 500000, spent: 375000, impressions: 18750000, cpm: 20, reach: 6250000, conversions: 37500, status: 'healthy' },
      'Fox': { budget: 600000, spent: 450000, impressions: 20000000, cpm: 23, reach: 6700000, conversions: 40000, status: 'healthy' },
      'NBC': { budget: 500000, spent: 375000, impressions: 15000000, cpm: 25, reach: 5000000, conversions: 30000, status: 'healthy' },
      'Peacock': { budget: 400000, spent: 300000, impressions: 13000000, cpm: 23, reach: 4300000, conversions: 26000, status: 'healthy' },
      'MadHive': { budget: 800000, spent: 600000, impressions: 30000000, cpm: 20, reach: 10000000, conversions: 60000, status: 'healthy' }
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
      'Hulu': { budget: 400000, spent: 300000, impressions: 15000000, cpm: 20, reach: 5000000, conversions: 30000, status: 'healthy' },
      'Disney+': { budget: 300000, spent: 225000, impressions: 9000000, cpm: 25, reach: 3000000, conversions: 18000, status: 'healthy' },
      'Paramount+': { budget: 350000, spent: 262500, impressions: 10500000, cpm: 25, reach: 3500000, conversions: 21000, status: 'healthy' },
      'Discovery+': { budget: 250000, spent: 187500, impressions: 7000000, cpm: 27, reach: 2300000, conversions: 14000, status: 'attention' },
      'MadHive': { budget: 500000, spent: 375000, impressions: 17000000, cpm: 22, reach: 5700000, conversions: 34000, status: 'healthy' }
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
      'Hulu': { budget: 400000, spent: 320000, impressions: 13000000, cpm: 25, reach: 4300000, conversions: 86000, status: 'healthy' },
      'Peacock': { budget: 300000, spent: 240000, impressions: 9000000, cpm: 27, reach: 3000000, conversions: 60000, status: 'healthy' },
      'MadHive': { budget: 500000, spent: 400000, impressions: 16000000, cpm: 25, reach: 5300000, conversions: 106000, status: 'healthy' }
    },
    insights: []
  },
  
  // Target Campaigns
  'target-back-to-school': {
    name: 'Back to School 2025',
    advertiserId: 'target',
    totalBudget: 4500000,
    spent: 3600000,
    targetAudience: {
      definition: 'Parents with children 5-17',
      totalSize: 32000000,
      demographics: { gender: 'All', ageRange: '25-54' }
    },
    dmaData: dmaMarkets,
    platforms: {
      'Hulu': { budget: 700000, spent: 560000, impressions: 28000000, cpm: 20, reach: 9300000, conversions: 56000, status: 'healthy' },
      'Disney+': { budget: 900000, spent: 720000, impressions: 32000000, cpm: 23, reach: 10700000, conversions: 64000, status: 'healthy' },
      'NBC': { budget: 600000, spent: 480000, impressions: 19200000, cpm: 25, reach: 6400000, conversions: 38400, status: 'healthy' },
      'Peacock': { budget: 500000, spent: 400000, impressions: 16000000, cpm: 25, reach: 5300000, conversions: 32000, status: 'healthy' },
      'Paramount+': { budget: 400000, spent: 320000, impressions: 12800000, cpm: 25, reach: 4300000, conversions: 25600, status: 'healthy' },
      'ABC': { budget: 400000, spent: 320000, impressions: 11500000, cpm: 28, reach: 3800000, conversions: 23000, status: 'attention' },
      'MadHive': { budget: 1000000, spent: 800000, impressions: 36000000, cpm: 22, reach: 12000000, conversions: 72000, status: 'healthy' }
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
      'Hulu': { budget: 1000000, spent: 200000, impressions: 8000000, cpm: 25, reach: 2700000, conversions: 16000, status: 'healthy' },
      'Fox': { budget: 1200000, spent: 240000, impressions: 9000000, cpm: 27, reach: 3000000, conversions: 18000, status: 'healthy' },
      'NBC': { budget: 1000000, spent: 200000, impressions: 7400000, cpm: 27, reach: 2500000, conversions: 14800, status: 'healthy' },
      'CBS': { budget: 800000, spent: 160000, impressions: 5600000, cpm: 29, reach: 1900000, conversions: 11200, status: 'healthy' },
      'ABC': { budget: 600000, spent: 120000, impressions: 4000000, cpm: 30, reach: 1300000, conversions: 8000, status: 'healthy' },
      'MadHive': { budget: 1400000, spent: 280000, impressions: 11200000, cpm: 25, reach: 3700000, conversions: 22400, status: 'healthy' }
    },
    insights: []
  },
  'target-circle-week': {
    name: 'Target Circle Week',
    advertiserId: 'target',
    totalBudget: 3200000,
    spent: 2560000,
    platforms: {
      'Hulu': { budget: 800000, spent: 640000, impressions: 32000000, cpm: 20, reach: 10700000, conversions: 128000, status: 'healthy' },
      'Peacock': { budget: 600000, spent: 480000, impressions: 20000000, cpm: 24, reach: 6700000, conversions: 80000, status: 'healthy' },
      'Paramount+': { budget: 500000, spent: 400000, impressions: 16000000, cpm: 25, reach: 5300000, conversions: 64000, status: 'healthy' },
      'Discovery+': { budget: 400000, spent: 320000, impressions: 11500000, cpm: 28, reach: 3800000, conversions: 46000, status: 'healthy' },
      'MadHive': { budget: 900000, spent: 720000, impressions: 30000000, cpm: 24, reach: 10000000, conversions: 120000, status: 'healthy' }
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

export default function OMGUnifiedDashboardV3() {
  // State management
  const [selectedView, setSelectedView] = useState<'unified' | 'platforms' | 'insights' | 'optimization' | 'internal' | 'dma'>('unified');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [showReallocation, setShowReallocation] = useState(false);
  const [pivotView, setPivotView] = useState<'advertiser' | 'campaign' | 'channel'>('advertiser');
  const [selectedPlatformDetail, setSelectedPlatformDetail] = useState<string | null>(null);
  
  // New V2 states
  const [isLive, setIsLive] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [collaborators, setCollaborators] = useState<CollaboratorCursor[]>([
    { userId: '1', name: 'Sarah M.', x: 450, y: 300, color: '#FF6B6B' },
    { userId: '2', name: 'Mike R.', x: 800, y: 450, color: '#4ECDC4' }
  ]);
  const [recentCampaigns, setRecentCampaigns] = useState<string[]>(['genesis-q1-launch']);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [customAlerts, setCustomAlerts] = useState<any[]>([]);

  // Refs
  const dashboardRef = useRef<HTMLDivElement>(null);

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
    if (!campaign) return [];
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
    const platformTotals: Record<string, { budget: number; spent: number; impressions: number; reach: number; conversions: number; grp?: number; reachPercentage?: number }> = {};

    campaigns.forEach(campaignId => {
      const camp = campaignData[campaignId];
      totalBudget += camp.totalBudget;
      totalSpent += camp.spent;
      
      Object.entries(camp.platforms).forEach(([platform, data]) => {
        if (!platformTotals[platform]) {
          platformTotals[platform] = { budget: 0, spent: 0, impressions: 0, reach: 0, conversions: 0, grp: 0, reachPercentage: 0 };
        }
        platformTotals[platform].budget += data.budget;
        platformTotals[platform].spent += data.spent;
        platformTotals[platform].impressions += data.impressions;
        platformTotals[platform].reach += data.reach;
        platformTotals[platform].conversions += data.conversions;
        
        // Aggregate GRP if available
        if (data.grp) {
          platformTotals[platform].grp = (platformTotals[platform].grp || 0) + data.grp;
        }
        if (data.reachPercentage) {
          platformTotals[platform].reachPercentage = (platformTotals[platform].reachPercentage || 0) + data.reachPercentage;
        }
        
        totalImpressions += data.impressions;
        totalReach += data.reach;
        totalConversions += data.conversions;
      });
    });

    return { totalBudget, totalSpent, totalImpressions, totalReach, totalConversions, platformTotals };
  };

  const addToRecentCampaigns = (campaignId: string) => {
    setRecentCampaigns(prev => {
      const filtered = prev.filter(id => id !== campaignId);
      return [campaignId, ...filtered].slice(0, 5);
    });
  };

  const getStatusBadge = (status?: string) => {
    switch(status) {
      case 'healthy':
        return (
          <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-green-200" />
        );
      case 'attention':
        return (
          <div className="w-3 h-3 bg-yellow-500 rounded-full ring-2 ring-yellow-200" />
        );
      case 'action':
        return (
          <div className="w-3 h-3 bg-red-500 rounded-full ring-2 ring-red-200" />
        );
      case 'optimizing':
        return (
          <div className="relative">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" />
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
          </div>
        );
      default:
        return (
          <div className="w-3 h-3 bg-gray-300 rounded-full ring-2 ring-gray-200" />
        );
    }
  };

  const renderPlatformLogo = (platform: any) => {
    const colorMap: Record<string, string> = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };

    return (
      <div className={`w-10 h-10 ${colorMap[platform.color]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
        {platform.logo}
      </div>
    );
  };

  const renderAdvertiserLogo = (advertiser: Advertiser) => {
    const colorMap: Record<string, string> = {
      'genesis-motors': 'bg-gradient-to-br from-gray-700 to-black',
      'burger-king': 'bg-gradient-to-br from-orange-500 to-red-600',
      'target': 'bg-gradient-to-br from-red-500 to-red-700'
    };

    return (
      <div className={`w-8 h-8 ${colorMap[advertiser.id]} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
        {advertiser.logo}
      </div>
    );
  };

  const handleQuickAction = (action: string, platform?: string) => {
    console.log(`Executing: ${action} on ${platform || 'all platforms'}`);
  };

  const generateShareLink = () => {
    const link = `${window.location.origin}/shared-view/${Date.now()}`;
    navigator.clipboard.writeText(link);
    alert('Share link copied to clipboard!');
  };

  // Platform data calculation helper
  const calculateTotalReachGain = () => {
    const campaigns = getFilteredCampaigns();
    let totalGain = 0;
    campaigns.forEach(campaignId => {
      const camp = campaignData[campaignId];
      camp.insights.forEach(insight => {
        totalGain += insight.reachGain;
      });
    });
    return totalGain;
  };

  const calculateMLCredits = () => {
    const credits = {
      'genesis-motors': 156000,
      'burger-king': 82000,
      'target': 92000,
      'all': 214000
    };
    return credits[selectedAdvertiser] || credits['all'];
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      
      switch(e.key) {
        case 'p':
          setSelectedView('platforms');
          break;
        case 'c':
          document.getElementById('campaign-selector')?.click();
          break;
        case 'i':
          setSelectedView('insights');
          break;
        case 'd':
          setSelectedView('dma');
          break;
        case ' ':
          e.preventDefault();
          setIsLive(!isLive);
          break;
        case '?':
          setShowShortcuts(!showShortcuts);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          const campaigns = getFilteredCampaigns();
          const index = parseInt(e.key) - 1;
          if (campaigns[index]) {
            setSelectedCampaign(campaigns[index]);
            addToRecentCampaigns(campaigns[index]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLive, showShortcuts, selectedAdvertiser]);

  // Simulate live cursor movement
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setCollaborators(prev => prev.map(c => ({
        ...c,
        x: Math.max(0, Math.min(window.innerWidth - 100, c.x + (Math.random() - 0.5) * 50)),
        y: Math.max(0, Math.min(window.innerHeight - 100, c.y + (Math.random() - 0.5) * 50))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gray-50" ref={dashboardRef}>
      {/* Sticky Header with Campaign Context */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Campaign Selector */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">OMG</span>
                <span className="text-gray-400">×</span>
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
                <span className="font-semibold">MadHive Unified System</span>
                <span className="text-gray-400">×</span>
                <Icon size={24} />
              </div>
              
              {/* Campaign Selector with Recent */}
              <div className="relative">
                <button
                  id="campaign-selector"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => document.getElementById('campaign-dropdown')?.classList.toggle('hidden')}
                >
                  <Layers className="w-4 h-4" />
                  <span className="font-medium">
                    {selectedCampaign ? campaignData[selectedCampaign]?.name : 'All Campaigns'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div id="campaign-dropdown" className="hidden absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Recent Campaigns */}
                  {recentCampaigns.length > 0 && (
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-2">RECENT</p>
                      {recentCampaigns.map((id, idx) => (
                        <button
                          key={id}
                          onClick={() => {
                            setSelectedCampaign(id);
                            document.getElementById('campaign-dropdown')?.classList.add('hidden');
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg text-sm"
                        >
                          <span>{campaignData[id]?.name}</span>
                          <kbd className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{idx + 1}</kbd>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* All Campaigns */}
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">ALL CAMPAIGNS</p>
                    <button
                      onClick={() => {
                        setSelectedCampaign(null);
                        document.getElementById('campaign-dropdown')?.classList.add('hidden');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium"
                    >
                      View All Campaigns
                    </button>
                    {getFilteredCampaigns().map(id => (
                      <button
                        key={id}
                        onClick={() => {
                          setSelectedCampaign(id);
                          addToRecentCampaigns(id);
                          document.getElementById('campaign-dropdown')?.classList.add('hidden');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm"
                      >
                        {campaignData[id]?.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Advertiser Selector */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                <span className="text-sm text-purple-700">Advertiser:</span>
                <select
                  value={selectedAdvertiser}
                  onChange={(e) => {
                    setSelectedAdvertiser(e.target.value);
                    setSelectedCampaign(null);
                  }}
                  className="bg-transparent text-sm font-medium text-purple-900 focus:outline-none"
                >
                  <option value="all">All Advertisers</option>
                  {Object.entries(advertisers).map(([id, advertiser]) => (
                    <option key={id} value={id}>{advertiser.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Center: Live Status and Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isLive 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isLive ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Live</span>
                    <Pause className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Paused</span>
                    <Play className="w-4 h-4" />
                  </>
                )}
              </button>
              
              <button
                onClick={() => generateShareLink()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share View"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export Dashboard"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            
            {/* Right: User Actions */}
            <div className="flex items-center gap-4">
              {/* Active Collaborators */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <div className="flex -space-x-2">
                  {collaborators.map(c => (
                    <div
                      key={c.userId}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                    >
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
                    +3
                  </div>
                </div>
              </div>
              
              {/* Shortcuts */}
              <button
                onClick={() => setShowShortcuts(!showShortcuts)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Keyboard Shortcuts"
              >
                <Keyboard className="w-4 h-4" />
              </button>
              
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="px-6 flex items-center gap-1">
          <button
            onClick={() => setSelectedView('unified')}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              selectedView === 'unified'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 inline-block mr-2" />
            Unified View
          </button>
          <button
            onClick={() => setSelectedView('platforms')}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              selectedView === 'platforms'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor className="w-4 h-4 inline-block mr-2" />
            Platform Control
          </button>
          <button
            onClick={() => setSelectedView('insights')}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              selectedView === 'insights'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="w-4 h-4 inline-block mr-2" />
            Cross-Platform Insights
          </button>
          <button
            onClick={() => setSelectedView('optimization')}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              selectedView === 'optimization'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="w-4 h-4 inline-block mr-2" />
            AI Optimizations
            <span className="ml-1 text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">Real-time</span>
          </button>
          <button
            onClick={() => setSelectedView('internal')}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              selectedView === 'internal'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings2 className="w-4 h-4 inline-block mr-2" />
            Internal Metrics
            <span className="ml-2 text-xs text-gray-500">(OMG Only)</span>
          </button>
          <button
            onClick={() => setSelectedView('dma')}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              selectedView === 'dma'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Map className="w-4 h-4 inline-block mr-2" />
            DMA Performance
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* Unified View */}
        {selectedView === 'unified' && (
          <div className="space-y-6">
            {/* Quick Actions Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Quick Actions</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuickAction('pause-underperforming')}
                    className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Pause Underperforming
                  </button>
                  <button
                    onClick={() => handleQuickAction('shift-to-top')}
                    className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    Shift to Top Performer
                  </button>
                  <button
                    onClick={() => handleQuickAction('apply-learnings')}
                    className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    Apply Learnings
                  </button>
                </div>
              </div>
            </div>
            
            {/* Top Metrics Overview */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Spend</span>
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  ${campaign ? (campaign.spent / 1000000).toFixed(2) : (getAggregatedData().totalSpent / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  of ${campaign ? (campaign.totalBudget / 1000000).toFixed(2) : (getAggregatedData().totalBudget / 1000000).toFixed(2)}M budget
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Cross-Platform Reach</span>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  {campaign ? 
                    Object.values(campaign.platforms).reduce((acc, p) => acc + p.reach, 0) / 1000000 :
                    getAggregatedData().totalReach / 1000000
                  }M
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +{(calculateTotalReachGain() / 1000000).toFixed(1)}M from insights
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Avg CPM</span>
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  ${campaign ? 
                    (campaign.spent / Object.values(campaign.platforms).reduce((acc, p) => acc + p.impressions, 0) * 1000).toFixed(2) :
                    (getAggregatedData().totalSpent / getAggregatedData().totalImpressions * 1000).toFixed(2)
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  across all platforms
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Conversions</span>
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  {campaign ? 
                    Object.values(campaign.platforms).reduce((acc, p) => acc + p.conversions, 0).toLocaleString() :
                    getAggregatedData().totalConversions.toLocaleString()
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ${campaign ?
                    (campaign.spent / Object.values(campaign.platforms).reduce((acc, p) => acc + p.conversions, 0)).toFixed(0) :
                    (getAggregatedData().totalSpent / getAggregatedData().totalConversions).toFixed(0)
                  } per conversion
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Active Platforms</span>
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  {campaign ? Object.keys(campaign.platforms).length : 11}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  All optimizing
                </div>
              </div>
            </div>

            {/* Platform Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                if (campaign) {
                  return getFilteredPlatforms().map((platform) => {
                    const data = campaign.platforms[platform];
                    const platformInfo = [...platforms.streaming, ...platforms.broadcast, ...platforms.integrated]
                      .find(p => p.name === platform);
                    const utilizationRate = (data.spent / data.budget) * 100;
                    
                    return (
                      <motion.div
                        key={platform}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedPlatformDetail(platform)}
                        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all border border-gray-200"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {platformInfo && renderPlatformLogo(platformInfo)}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-xl font-bold">{platform}</h3>
                                  {getStatusBadge(data.status)}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {platform === 'MadHive' ? 'Unified Execution Platform' : 
                                   platform === 'MediaOcean' ? 'Workflow Integration' : 
                                   'Premium Inventory'}
                                </p>
                              </div>
                            </div>
                            <button
                              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowComments({ ...showComments, [platform]: !showComments[platform] });
                              }}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
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
                                className={`h-3 rounded-full transition-all ${
                                  data.status === 'action' ? 'bg-red-500' :
                                  data.status === 'attention' ? 'bg-yellow-500' :
                                  'bg-gradient-to-r from-purple-500 to-purple-600'
                                }`}
                                style={{ width: `${utilizationRate}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-600">CPM</p>
                              <p className="text-lg font-semibold">${data.cpm}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Reach</p>
                              <p className="text-lg font-semibold">{(data.reach / 1000000).toFixed(1)}M</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Impressions</p>
                              <p className="text-lg font-semibold">{(data.impressions / 1000000).toFixed(0)}M</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Conversions</p>
                              <p className="text-lg font-semibold">{data.conversions.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4">
                            {data.status === 'attention' && (
                              <button className="flex-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors">
                                Increase Bid 10%
                              </button>
                            )}
                            {data.status === 'action' && (
                              <button className="flex-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                                Refresh Creative
                              </button>
                            )}
                            {data.status === 'healthy' && (
                              <button className="flex-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                                Increase Budget 15%
                              </button>
                            )}
                          </div>
                          
                          {/* Comments Section */}
                          {showComments[platform] && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                                    JD
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm"><span className="font-medium">John D:</span> CPMs trending up, might need to adjust targeting</p>
                                    <p className="text-xs text-gray-500">2 mins ago</p>
                                  </div>
                                </div>
                              </div>
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                className="mt-2 w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  });
                }
                
                // Default to showing all platforms with aggregated data
                const aggregatedData = getAggregatedData();
                return Object.entries(aggregatedData.platformTotals)
                  .filter(([_, data]) => data.budget > 0)
                  .sort((a, b) => b[1].spent - a[1].spent)
                  .map(([platform, data]) => {
                    const utilizationRate = (data.spent / data.budget) * 100;
                    
                    return (
                      <motion.div
                        key={platform}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedPlatformDetail(platform)}
                        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {(() => {
                                const platformInfo = [...platforms.streaming, ...platforms.broadcast, ...platforms.integrated]
                                  .find(p => p.name === platform);
                                return platformInfo ? renderPlatformLogo(platformInfo) : null;
                              })()}
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

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-600">Total Reach</p>
                              <p className="text-lg font-semibold">{(data.reach / 1000000).toFixed(1)}M</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Conversions</p>
                              <p className="text-lg font-semibold">{data.conversions.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  });
              })()}
            </div>
          </div>
        )}

        {/* Platform Control View */}
        {selectedView === 'platforms' && (
          <div className="space-y-6">
            {/* MadHive Integration Highlight */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">MadHive Unified Platform</h2>
                  <p className="text-purple-100">
                    Execute across all premium streaming and broadcast inventory from one platform
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    {campaign ? Object.keys(campaign.platforms).length : 11}
                  </div>
                  <div className="text-purple-200">Active Platforms</div>
                </div>
              </div>
            </div>

            {/* Platform Categories */}
            <div className="space-y-6">
              {/* Streaming Platforms */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tv className="w-5 h-5" />
                  Streaming Platforms
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  {platforms.streaming.map(platform => {
                    const data = campaign?.platforms[platform.name] || getAggregatedData().platformTotals[platform.name];
                    if (!data) return null;
                    
                    return (
                      <div
                        key={platform.name}
                        className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => setSelectedPlatformDetail(platform.name)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{platform.logo}</span>
                          {getStatusBadge(campaign?.platforms[platform.name]?.status)}
                        </div>
                        <h4 className="font-semibold mb-1">{platform.name}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">GRP</span>
                            <span className="font-medium">{data.grp ? data.grp.toFixed(1) : (campaign?.targetAudience ? ((data.reach / campaign.targetAudience.totalSize) * 100 * 3.2).toFixed(1) : '-')}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Reach</span>
                            <span className="font-medium">{data.reachPercentage ? data.reachPercentage.toFixed(1) : (campaign?.targetAudience ? ((data.reach / campaign.targetAudience.totalSize) * 100).toFixed(1) : '-')}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Spend</span>
                            <span className="font-medium">${(data.spent / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Broadcast Networks */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Broadcast Networks
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {platforms.broadcast.map(platform => {
                    const data = campaign?.platforms[platform.name] || getAggregatedData().platformTotals[platform.name];
                    if (!data) return null;
                    
                    return (
                      <div
                        key={platform.name}
                        className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => setSelectedPlatformDetail(platform.name)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{platform.logo}</span>
                          {getStatusBadge(campaign?.platforms[platform.name]?.status)}
                        </div>
                        <h4 className="font-semibold mb-1">{platform.name}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">GRP</span>
                            <span className="font-medium">{data.grp ? data.grp.toFixed(1) : (campaign?.targetAudience ? ((data.reach / campaign.targetAudience.totalSize) * 100 * 3.2).toFixed(1) : '-')}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Reach</span>
                            <span className="font-medium">{data.reachPercentage ? data.reachPercentage.toFixed(1) : (campaign?.targetAudience ? ((data.reach / campaign.targetAudience.totalSize) * 100).toFixed(1) : '-')}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Spend</span>
                            <span className="font-medium">${(data.spent / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Integrated Solutions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Integrated Solutions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {platforms.integrated.map(platform => {
                    const data = campaign?.platforms[platform.name] || getAggregatedData().platformTotals[platform.name];
                    if (!data) return null;
                    
                    return (
                      <div
                        key={platform.name}
                        className="bg-white rounded-lg shadow-sm p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{platform.logo}</span>
                          <span className="text-green-500">Connected</span>
                        </div>
                        <h4 className="font-semibold mb-1">{platform.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {platform.name === 'MadHive' ? 'Unified execution layer' : 'Workflow automation'}
                        </p>
                        <div className="text-sm font-medium text-purple-600">
                          {platform.name === 'MadHive' ? `${(data.spent / 1000000).toFixed(1)}M processed` : 'Active'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cross-Platform Insights View */}
        {selectedView === 'insights' && (
          <div className="space-y-6">
            {/* Total Reach Gain */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-1">Total Incremental Reach Gained</h3>
                  <p className="text-green-700">From cross-platform intelligence sharing</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-900">
                    +{(calculateTotalReachGain() / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-green-600">additional users reached</div>
                </div>
              </div>
            </div>

            {/* Insights Grid */}
            <div className="grid gap-4">
              {(() => {
                const campaigns = getFilteredCampaigns();
                const allInsights: any[] = [];
                
                campaigns.forEach(campaignId => {
                  const camp = campaignData[campaignId];
                  camp.insights.forEach(insight => {
                    allInsights.push({
                      ...insight,
                      campaignName: camp.name,
                      advertiserName: advertisers[camp.advertiserId].name
                    });
                  });
                });
                
                return allInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">Cross-Platform Intelligence</span>
                          <span className="text-sm text-gray-500">• {insight.campaignName}</span>
                        </div>
                        <div className="mb-3">
                          <p className="text-gray-700">{insight.insight}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Source:</span>
                            <span className="font-medium">{insight.source}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Applied to:</span>
                            <span className="font-medium">{insight.application}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">{insight.impact}</span>
                          <button
                            onClick={() => handleQuickAction('apply-learning', insight.application)}
                            className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                          >
                            Apply to Similar Campaigns
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* AI Optimizations View */}
        {selectedView === 'optimization' && (
          <div className="space-y-6">
            {/* AI Intelligence Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">MadHive AI + Precise Intelligence</h2>
                  <p className="text-purple-100">
                    Unified AI system optimizing across all platforms in real-time, powered by cross-platform learning
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{isLive ? '⚡ Live' : '⏸️ Paused'}</div>
                  <div className="text-purple-200">Optimization Engine</div>
                </div>
              </div>
            </div>

            {/* Budget Shift Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">AI-Recommended Budget Shifts</h3>
                <span className="text-sm text-gray-500">Based on real-time performance</span>
              </div>
              
              <div className="space-y-4">
                {/* High Impact Shift */}
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">High-Impact Opportunity</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Shift $247K from ABC (underperforming at 0.8x target) to Hulu (overperforming at 2.3x target)
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-green-700">Expected gain: +3.2M reach</span>
                        <span className="text-green-700">ROI improvement: +34%</span>
                        <span className="text-green-700">CAC reduction: -$12</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleQuickAction('execute-shift', 'ABC-to-Hulu');
                        setShowReallocation(true);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all"
                    >
                      Execute Shift
                    </motion.button>
                  </div>
                </div>

                {/* Medium Impact Shifts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shuffle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Cross-Platform Arbitrage</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Peacock → Disney+ shift opportunity
                    </p>
                    <p className="text-xs text-blue-700">+1.1M reach, -$8 CAC</p>
                    <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                      Review Details
                    </button>
                  </div>
                  
                  <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Creative Optimization</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Fox creative showing fatigue
                    </p>
                    <p className="text-xs text-purple-700">Refresh for +18% CTR</p>
                    <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700">
                      Deploy New Creative
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active AI Optimizations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Active AI Optimizations</h3>
              <div className="space-y-4">
                {/* Real-time optimization in progress */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium">Cross-Platform Audience Discovery</p>
                      <p className="text-sm text-gray-600">Finding new high-value segments across Hulu + NBC + Fox</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-blue-600">47% complete</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Completed optimization */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">MadHive Platform Bid Optimization</p>
                      <p className="text-sm text-gray-600">Adjusted bids based on Precise attribution data</p>
                    </div>
                  </div>
                  <div className="text-sm text-green-600">+22% efficiency gain</div>
                </div>
                
                {/* Scheduled optimization */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Weekend Daypart Optimization</p>
                      <p className="text-sm text-gray-600">Scheduled for Saturday 6:00 AM</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">In 14 hours</div>
                </div>
              </div>
            </div>

            {/* MadHive Unified Intelligence */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">MadHive Unified Intelligence</h3>
                <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  Powered by Precise Attribution
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Platform Orchestration */}
                <div>
                  <h4 className="font-medium mb-3">Platform Orchestration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Connected Platforms</span>
                      <span className="font-medium">11 active</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Unified Campaigns</span>
                      <span className="font-medium">9 running</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Cross-Platform Insights/Hour</span>
                      <span className="font-medium">847</span>
                    </div>
                  </div>
                </div>
                
                {/* MadHive as Platform */}
                <div>
                  <h4 className="font-medium mb-3">MadHive Platform Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Direct Inventory Value</span>
                      <span className="font-medium text-purple-700">$3.4M</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Precise-Verified Impressions</span>
                      <span className="font-medium text-purple-700">147M</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Attribution Accuracy</span>
                      <span className="font-medium text-purple-700">99.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Predictions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">AI Performance Predictions</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Lightbulb className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-700">+28%</p>
                  <p className="text-sm text-gray-600">Projected efficiency gain</p>
                  <p className="text-xs text-gray-500 mt-1">Next 7 days</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-700">$42</p>
                  <p className="text-sm text-gray-600">Target CAC achievable</p>
                  <p className="text-xs text-gray-500 mt-1">With optimizations</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-700">+5.7M</p>
                  <p className="text-sm text-gray-600">Additional reach potential</p>
                  <p className="text-xs text-gray-500 mt-1">Untapped segments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Internal Metrics View */}
        {selectedView === 'internal' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-800">
                  Internal OMG Metrics - Not for External Distribution
                </p>
              </div>
            </div>

            {/* Target Audience Context */}
            {campaign?.targetAudience && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-1">Campaign Target Audience</h3>
                    <p className="text-purple-700 font-medium">{campaign.targetAudience.definition}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-900">
                      {((Object.values(campaign.platforms).reduce((sum, p) => sum + p.reach, 0) / campaign.targetAudience.totalSize) * 100).toFixed(1)}%
                    </div>
                    <div className="text-purple-600">Total Reached</div>
                  </div>
                </div>
              </div>
            )}

            {/* ML Credits Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">MadHive ML Credits</h3>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    ${(calculateMLCredits() / 1000).toFixed(0)}K
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Total Credits Generated</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">8.2%</div>
                  <p className="text-sm text-gray-600 mt-1">Model Improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">Q2 2025</div>
                  <p className="text-sm text-gray-600 mt-1">Next Credit Distribution</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Credit Breakdown by Advertiser</h4>
                <div className="space-y-3">
                  {Object.entries(advertisers).map(([id, advertiser]) => {
                    const credits = id === 'genesis-motors' ? 156000 : 
                                  id === 'burger-king' ? 82000 : 
                                  id === 'target' ? 92000 : 0;
                    
                    return (
                      <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{advertiser.logo}</span>
                          <span className="font-medium">{advertiser.name}</span>
                        </div>
                        <span className="text-lg font-semibold">${(credits / 1000).toFixed(0)}K</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cross-Platform Intelligence Matrix */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-semibold mb-4">Cross-Platform Intelligence Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Source Platform</th>
                      <th className="text-left py-2">Target Platform</th>
                      <th className="text-left py-2">Insight Type</th>
                      <th className="text-right py-2">Reach Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const allInsights = getFilteredCampaigns()
                        .flatMap(campaignId => campaignData[campaignId].insights)
                        .filter(insight => insight && insight.reachGain > 0);
                      
                      return allInsights.map((insight, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2">{insight.source}</td>
                          <td className="py-2">{insight.application}</td>
                          <td className="py-2 text-sm text-gray-600">Audience Discovery</td>
                          <td className="text-right py-2 font-medium">
                            +{(insight.reachGain / 1000000).toFixed(1)}M
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform Efficiency Scores */}
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

        {/* DMA Performance View */}
        {selectedView === 'dma' && (
          <div className="space-y-6">
            {/* DMA Overview Header */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">DMA Performance Analysis</h3>
                  <p className="text-blue-700">Blended streaming and linear reach by market</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-900">
                    {campaign?.targetAudience ? 
                      `${((campaign.dmaData?.reduce((sum, dma) => sum + dma.blendedReach, 0) || 0) / campaign.targetAudience.totalSize * 100).toFixed(1)}%` : 
                      '-'}
                  </div>
                  <div className="text-blue-600">National Target Coverage</div>
                </div>
              </div>
            </div>

            {/* DMA Heat Map */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Market Coverage Heat Map</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>High Coverage (70%+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Medium (50-70%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Low (&lt;50%)</span>
                  </div>
                </div>
              </div>
              <div className="h-[500px] relative">
                <ComposableMap projection="geoAlbersUsa" className="w-full h-full">
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#E5E7EB"
                          stroke="#D1D5DB"
                          strokeWidth={0.5}
                        />
                      ))
                    }
                  </Geographies>
                  {dmaMarkets.map((dma) => {
                    const targetDelivery = dma.targetDelivery;
                    const color = targetDelivery >= 70 ? '#10B981' : targetDelivery >= 50 ? '#F59E0B' : '#EF4444';
                    const radius = Math.sqrt(dma.blendedReach) / 400;
                    
                    return (
                      <Marker key={dma.id} coordinates={dma.coordinates}>
                        <motion.g
                          whileHover={{ scale: 1.2 }}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            r={radius}
                            fill={color}
                            fillOpacity={0.7}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                          <text
                            textAnchor="middle"
                            y={-radius - 10}
                            className="text-xs font-medium fill-gray-700"
                          >
                            {dma.name}
                          </text>
                          <text
                            textAnchor="middle"
                            y={-radius - 25}
                            className="text-xs font-bold fill-gray-900"
                          >
                            {targetDelivery.toFixed(0)}%
                          </text>
                        </motion.g>
                      </Marker>
                    );
                  })}
                </ComposableMap>
              </div>
            </div>

            {/* DMA Performance Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">DMA Performance Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DMA</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Streaming Reach</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Linear Reach</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Blended Reach</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Target Delivery %</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Population</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dmaMarkets.sort((a, b) => b.blendedReach - a.blendedReach).map(dma => (
                        <tr key={dma.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="font-medium text-gray-900">{dma.name}</div>
                                <div className="text-sm text-gray-500">{dma.state}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            {(dma.streamingReach / 1000000).toFixed(1)}M
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            {(dma.linearReach / 1000000).toFixed(1)}M
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap font-semibold">
                            {(dma.blendedReach / 1000000).toFixed(1)}M
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <span className={`font-medium ${
                                dma.targetDelivery >= 70 ? 'text-green-600' : 
                                dma.targetDelivery >= 50 ? 'text-yellow-600' : 
                                'text-red-600'
                              }`}>
                                {dma.targetDelivery.toFixed(1)}%
                              </span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    dma.targetDelivery >= 70 ? 'bg-green-500' : 
                                    dma.targetDelivery >= 50 ? 'bg-yellow-500' : 
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(dma.targetDelivery, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap text-gray-500">
                            {(dma.population / 1000000).toFixed(1)}M
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td className="px-4 py-3 font-semibold">Total</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {(dmaMarkets.reduce((sum, dma) => sum + dma.streamingReach, 0) / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {(dmaMarkets.reduce((sum, dma) => sum + dma.linearReach, 0) / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {(dmaMarkets.reduce((sum, dma) => sum + dma.blendedReach, 0) / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {(dmaMarkets.reduce((sum, dma) => sum + dma.targetDelivery * dma.population, 0) / 
                            dmaMarkets.reduce((sum, dma) => sum + dma.population, 0)).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {(dmaMarkets.reduce((sum, dma) => sum + dma.population, 0) / 1000000).toFixed(1)}M
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {[...platforms.streaming, ...platforms.broadcast, ...platforms.integrated]
                        .find(p => p.name === selectedPlatformDetail)?.logo}
                    </span>
                    <h2 className="text-2xl font-bold">{selectedPlatformDetail}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedPlatformDetail(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold mb-4">Campaigns Running on {selectedPlatformDetail}</h3>
                <div className="space-y-4">
                  {selectedPlatformDetail === 'MadHive' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">Fox</div>
                          <p className="text-sm text-gray-600 mt-1">Publisher Partner</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">NBC</div>
                          <p className="text-sm text-gray-600 mt-1">Publisher Partner</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">CBS</div>
                          <p className="text-sm text-gray-600 mt-1">Publisher Partner</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Unified Campaigns</h4>
                        {getFilteredCampaigns()
                          .filter(campaignId => campaignData[campaignId].platforms[selectedPlatformDetail])
                          .map(campaignId => {
                            const camp = campaignData[campaignId];
                            const data = camp.platforms[selectedPlatformDetail];
                            
                            return (
                              <div key={campaignId} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">{camp.name}</p>
                                  <p className="text-sm text-gray-600">{advertisers[camp.advertiserId].name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">${(data.spent / 1000).toFixed(0)}K spent</p>
                                  <p className="text-sm text-gray-600">{(data.impressions / 1000000).toFixed(1)}M impressions</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(advertisers).map(([advertiserId, advertiser]) => {
                        const campaigns = advertiser.campaigns.filter(campaignId => 
                          campaignData[campaignId].platforms[selectedPlatformDetail]
                        );
                        
                        if (campaigns.length === 0) return null;
                        
                        return (
                          <div key={advertiserId} className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-2xl">{advertiser.logo}</span>
                              <h4 className="font-semibold">{advertiser.name}</h4>
                            </div>
                            <div className="space-y-2">
                              {campaigns.map(campaignId => {
                                const camp = campaignData[campaignId];
                                const data = camp.platforms[selectedPlatformDetail];
                                
                                return (
                                  <div key={campaignId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm font-medium">{camp.name}</span>
                                    <span className="text-sm text-gray-600">
                                      ${(data.spent / 1000).toFixed(0)}K spent
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Switch to Platforms</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">P</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Open Campaign Selector</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">C</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Switch to Insights</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">I</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Switch to DMA View</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">D</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quick Campaign Switch</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">1-9</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pause/Resume Live Updates</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Show Shortcuts</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">?</kbd>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Live Collaborator Cursors */}
      {isLive && collaborators.map(collab => (
        <motion.div
          key={collab.userId}
          className="fixed pointer-events-none z-40"
          animate={{ x: collab.x, y: collab.y }}
          transition={{ type: "spring", damping: 30 }}
        >
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M0 0L0 14.5L4.5 10L10 10L0 0Z" fill={collab.color} />
            </svg>
            <div 
              className="absolute top-4 left-4 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
              style={{ backgroundColor: collab.color }}
            >
              {collab.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}