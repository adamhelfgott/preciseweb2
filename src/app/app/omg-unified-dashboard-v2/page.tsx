'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import { 
  LayoutGrid, 
  TrendingUp, 
  Brain, 
  Settings2,
  ChevronDown,
  Search,
  Bell,
  Users,
  Zap,
  Pause,
  Play,
  Share2,
  Download,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Target,
  BarChart3,
  Layers,
  Plus,
  Minus,
  ArrowRight,
  Command,
  Keyboard
} from 'lucide-react';

// Types
interface Advertiser {
  id: string;
  name: string;
  industry: string;
  logo: string;
  campaigns: string[];
}

interface Campaign {
  id: string;
  name: string;
  advertiser: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  conversions: number;
  platforms: Record<string, PlatformData>;
  insights: Insight[];
  alerts: Alert[];
}

interface PlatformData {
  budget: number;
  spent: number;
  impressions: number;
  conversions: number;
  cpm: number;
  status: 'healthy' | 'attention' | 'action' | 'optimizing';
}

interface Insight {
  id: string;
  type: 'reach' | 'frequency' | 'performance';
  platform: string;
  message: string;
  impact: string;
  reachGain: number;
  timestamp: Date;
}

interface Alert {
  id: string;
  type: 'pacing' | 'fatigue' | 'opportunity';
  severity: 'low' | 'medium' | 'high';
  message: string;
  action?: string;
  platform?: string;
}

interface Widget {
  id: string;
  type: 'platforms' | 'insights' | 'alerts' | 'metrics' | 'ml-credits';
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface CollaboratorCursor {
  userId: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

// Mock data
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

const campaignData: Record<string, Campaign> = {
  'genesis-q1-launch': {
    id: 'genesis-q1-launch',
    name: 'Q1 2025 Model Launch',
    advertiser: 'genesis-motors',
    status: 'active',
    budget: 5000000,
    spent: 2847293,
    impressions: 89472938,
    conversions: 3847,
    platforms: {
      'Hulu': { budget: 1500000, spent: 892736, impressions: 28374628, conversions: 1204, cpm: 31.5, status: 'healthy' },
      'Disney+': { budget: 1000000, spent: 674829, impressions: 19384729, conversions: 892, cpm: 34.8, status: 'attention' },
      'Fox': { budget: 800000, spent: 523847, impressions: 14738293, conversions: 673, cpm: 35.5, status: 'healthy' },
      'NBC': { budget: 700000, spent: 456381, impressions: 12384938, conversions: 528, cpm: 36.8, status: 'optimizing' },
      'MadHive': { budget: 1000000, spent: 299500, impressions: 14590350, conversions: 550, cpm: 20.5, status: 'healthy' }
    },
    insights: [
      {
        id: '1',
        type: 'reach',
        platform: 'Cross-Platform',
        message: 'Disney+ viewers showing 47% overlap with Hulu, opportunity to expand reach on NBC',
        impact: '+830K unique reach available',
        reachGain: 830000,
        timestamp: new Date()
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
      }
    ]
  },
  // ... Additional campaigns would be here
};

// Platform definitions
const platforms = {
  streaming: [
    { name: 'Hulu', logo: '📺', color: 'from-green-400 to-green-600' },
    { name: 'Disney+', logo: '🏰', color: 'from-blue-400 to-blue-600' },
  ],
  broadcast: [
    { name: 'Fox', logo: '🦊', color: 'from-orange-400 to-red-500' },
    { name: 'NBC', logo: '🦚', color: 'from-purple-400 to-purple-600' },
  ],
  integrated: [
    { name: 'MadHive', logo: '🔮', color: 'from-purple-500 to-pink-500' },
  ]
};

export default function OMGUnifiedDashboardV2() {
  // State
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'platforms' | 'insights' | 'alerts' | 'settings'>('platforms');
  const [isLive, setIsLive] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: '1', type: 'platforms', position: { x: 0, y: 0 }, size: { width: 12, height: 6 } },
    { id: '2', type: 'insights', position: { x: 0, y: 6 }, size: { width: 8, height: 4 } },
    { id: '3', type: 'alerts', position: { x: 8, y: 6 }, size: { width: 4, height: 4 } },
  ]);
  const [collaborators, setCollaborators] = useState<CollaboratorCursor[]>([
    { userId: '1', name: 'Sarah M.', x: 450, y: 300, color: '#FF6B6B' },
    { userId: '2', name: 'Mike R.', x: 800, y: 450, color: '#4ECDC4' }
  ]);
  const [recentCampaigns, setRecentCampaigns] = useState<string[]>(['genesis-q1-launch']);
  const [customAlerts, setCustomAlerts] = useState<any[]>([]);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  // Refs
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      
      switch(e.key) {
        case 'p':
          setActiveTab('platforms');
          break;
        case 'c':
          // Open campaign selector
          document.getElementById('campaign-selector')?.click();
          break;
        case 'i':
          setActiveTab('insights');
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
  }, [isLive, showShortcuts]);

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

  // Helper functions
  const getFilteredCampaigns = () => {
    if (selectedAdvertiser === 'all') {
      return Object.keys(campaignData);
    }
    return advertisers[selectedAdvertiser]?.campaigns || [];
  };

  const addToRecentCampaigns = (campaignId: string) => {
    setRecentCampaigns(prev => {
      const filtered = prev.filter(id => id !== campaignId);
      return [campaignId, ...filtered].slice(0, 5);
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'healthy':
        return <span className="text-green-500">🟢</span>;
      case 'attention':
        return <span className="text-yellow-500">🟡</span>;
      case 'action':
        return <span className="text-red-500">🔴</span>;
      case 'optimizing':
        return <span className="text-blue-500 animate-pulse">⚡</span>;
      default:
        return null;
    }
  };

  const handleQuickAction = (action: string, platform?: string) => {
    // Simulate action
    console.log(`Executing: ${action} on ${platform || 'all platforms'}`);
    // In real app, this would trigger API calls
  };

  const generateShareLink = () => {
    const link = `${window.location.origin}/shared-view/${Date.now()}`;
    navigator.clipboard.writeText(link);
    alert('Share link copied to clipboard!');
  };

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
                <Icon size={24} />
                <span className="text-sm text-gray-500">Unified Command Center</span>
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
        <div className="px-6 flex items-center gap-6 border-t border-gray-100">
          <button
            onClick={() => setActiveTab('platforms')}
            className={`py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'platforms'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 inline-block mr-2" />
            Platforms
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'insights'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Brain className="w-4 h-4 inline-block mr-2" />
            Insights
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`relative py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'alerts'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertCircle className="w-4 h-4 inline-block mr-2" />
            Alerts
            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">3</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'settings'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings2 className="w-4 h-4 inline-block mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {activeTab === 'platforms' && (
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
            
            {/* Platform Grid with Status Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(campaignData[selectedCampaign || 'genesis-q1-launch']?.platforms || {}).map(([platform, data]) => {
                const platformInfo = [...platforms.streaming, ...platforms.broadcast, ...platforms.integrated]
                  .find(p => p.name === platform);
                
                return (
                  <motion.div
                    key={platform}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{platformInfo?.logo}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold">{platform}</h3>
                              {getStatusBadge(data.status)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {data.status === 'optimizing' ? 'Optimizing now...' : `${data.status} status`}
                            </p>
                          </div>
                        </div>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setShowComments({ ...showComments, [platform]: !showComments[platform] })}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Metrics */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Spend Pacing</span>
                          <span className="text-sm font-medium">
                            ${(data.spent / 1000).toFixed(0)}K / ${(data.budget / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              data.status === 'action' ? 'bg-red-500' :
                              data.status === 'attention' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${(data.spent / data.budget) * 100}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-600">CPM</p>
                            <p className="text-lg font-semibold">${data.cpm}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Conversions</p>
                            <p className="text-lg font-semibold">{data.conversions.toLocaleString()}</p>
                          </div>
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
                            Pause Platform
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
              })}
            </div>
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Insights Grid */}
            <div className="grid gap-4">
              {campaignData[selectedCampaign || 'genesis-q1-launch']?.insights.map(insight => (
                <div key={insight.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">{insight.type === 'reach' ? 'Reach Opportunity' : 'Performance Insight'}</span>
                        <span className="text-sm text-gray-500">• {insight.platform}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{insight.message}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-green-600">{insight.impact}</span>
                        <button className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
                          Apply This Learning
                        </button>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Custom Alert Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Alert Rules</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">Alert when any platform is 20% under pacing</span>
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Notify when cross-platform reach exceeds 80%</span>
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
                </div>
                <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors">
                  + Add Custom Alert Rule
                </button>
              </div>
            </div>
            
            {/* Active Alerts */}
            <div className="space-y-4">
              {campaignData[selectedCampaign || 'genesis-q1-launch']?.alerts.map(alert => (
                <div key={alert.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {alert.severity === 'high' && <XCircle className="w-5 h-5 text-red-500" />}
                        {alert.severity === 'medium' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                        {alert.severity === 'low' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        <span className="font-semibold capitalize">{alert.type} Alert</span>
                        {alert.platform && <span className="text-sm text-gray-500">• {alert.platform}</span>}
                      </div>
                      <p className="text-gray-700 mb-3">{alert.message}</p>
                      {alert.action && (
                        <button
                          onClick={() => handleQuickAction(alert.action!, alert.platform)}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                        >
                          {alert.action}
                        </button>
                      )}
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Dashboard Settings</h3>
              
              {/* Widget Layout */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Customize Layout</h4>
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500">
                    Drag widgets here
                  </div>
                  <div className="aspect-square bg-purple-100 rounded-lg flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="aspect-square bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              {/* Notification Preferences */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Alert me when campaigns need attention</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Notify about new cross-platform insights</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Daily performance summary</span>
                  </label>
                </div>
              </div>
              
              {/* Saved Views */}
              <div>
                <h4 className="font-medium mb-4">Saved Views</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">High-Spend Campaigns</span>
                    <button className="text-sm text-purple-600 hover:text-purple-700">Load</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Optimization Opportunities</span>
                    <button className="text-sm text-purple-600 hover:text-purple-700">Load</button>
                  </div>
                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors">
                    + Save Current View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
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