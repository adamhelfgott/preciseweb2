'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  DollarSign, 
  Users, 
  Zap,
  ChevronRight,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface OptimizationRecommendation {
  id: string;
  type: 'urgent' | 'opportunity' | 'insight';
  category: 'budget' | 'audience' | 'creative' | 'bidding' | 'timing';
  title: string;
  description: string;
  impact: {
    metric: string;
    potential: number;
    confidence: number;
  };
  action: string;
  effort: 'low' | 'medium' | 'high';
  status: 'new' | 'in-progress' | 'completed' | 'dismissed';
}

const recommendations: OptimizationRecommendation[] = [
  {
    id: '1',
    type: 'urgent',
    category: 'budget',
    title: 'Shift budget from underperforming campaigns',
    description: 'Nike Fall Collection is underperforming with 0.8x ROAS. Reallocate 30% to Summer Fitness campaign.',
    impact: {
      metric: 'Overall ROAS',
      potential: 15,
      confidence: 85
    },
    action: 'Reallocate Budget',
    effort: 'low',
    status: 'new'
  },
  {
    id: '2',
    type: 'opportunity',
    category: 'audience',
    title: 'Expand high-converting audience segment',
    description: 'Fitness Enthusiasts 25-34 segment showing 4.2x ROAS. Similar audiences available for targeting.',
    impact: {
      metric: 'Conversions',
      potential: 32,
      confidence: 78
    },
    action: 'Expand Audience',
    effort: 'medium',
    status: 'new'
  },
  {
    id: '3',
    type: 'insight',
    category: 'creative',
    title: 'Video creatives outperforming static by 2.5x',
    description: 'Consider shifting more budget to video formats, especially for mobile placements.',
    impact: {
      metric: 'CTR',
      potential: 45,
      confidence: 92
    },
    action: 'Update Creative Mix',
    effort: 'high',
    status: 'in-progress'
  },
  {
    id: '4',
    type: 'urgent',
    category: 'bidding',
    title: 'Bid caps limiting reach in key markets',
    description: 'Current bid caps preventing wins in NYC and LA markets. Increase by 15% to maintain competitiveness.',
    impact: {
      metric: 'Impressions',
      potential: 28,
      confidence: 88
    },
    action: 'Adjust Bids',
    effort: 'low',
    status: 'new'
  }
];

const performanceTrend = [
  { date: 'Mon', spend: 12000, conversions: 320, roas: 2.8 },
  { date: 'Tue', spend: 13500, conversions: 380, roas: 3.1 },
  { date: 'Wed', spend: 14200, conversions: 410, roas: 3.3 },
  { date: 'Thu', spend: 13800, conversions: 390, roas: 3.0 },
  { date: 'Fri', spend: 15600, conversions: 480, roas: 3.5 },
  { date: 'Sat', spend: 16200, conversions: 520, roas: 3.7 },
  { date: 'Sun', spend: 14800, conversions: 450, roas: 3.4 }
];

const channelPerformance = [
  { channel: 'Precise Data', value: 45, roas: 4.2 },
  { channel: 'Google', value: 25, roas: 2.8 },
  { channel: 'Meta', value: 20, roas: 2.5 },
  { channel: 'TikTok', value: 10, roas: 3.1 }
];

const audienceInsights = [
  { segment: 'Performance', A: 85, B: 92, fullMark: 100 },
  { segment: 'Reach', A: 78, B: 85, fullMark: 100 },
  { segment: 'Engagement', A: 90, B: 88, fullMark: 100 },
  { segment: 'Conversion', A: 82, B: 95, fullMark: 100 },
  { segment: 'Retention', A: 70, B: 85, fullMark: 100 }
];

const COLORS = ['#000000', '#666666', '#999999', '#CCCCCC'];

export default function OptimizationPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'opportunity':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'insight':
        return <Brain className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'dismissed':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Campaign Optimization</h1>
              <p className="text-gray-600 mt-1">AI-powered insights to maximize your campaign performance</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Run Analysis
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* AI Recommendations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl border ${
                  selectedRecommendation === rec.id ? 'border-black' : 'border-gray-200'
                } p-6 cursor-pointer hover:shadow-lg transition-all`}
                onClick={() => setSelectedRecommendation(rec.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(rec.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <span className="text-xs text-gray-500 capitalize">{rec.category}</span>
                    </div>
                  </div>
                  {getStatusIcon(rec.status)}
                </div>

                <p className="text-sm text-gray-600 mb-4">{rec.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Potential Impact</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">+{rec.impact.potential}%</span>
                      <span className="text-sm text-gray-600">{rec.impact.metric}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Confidence</div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black rounded-full"
                          style={{ width: `${rec.impact.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{rec.impact.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-md ${
                    rec.effort === 'low' ? 'bg-green-100 text-green-800' :
                    rec.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {rec.effort} effort
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-sm font-medium text-black hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle action
                    }}
                  >
                    {rec.action}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis yAxisId="left" stroke="#666" />
                <YAxis yAxisId="right" orientation="right" stroke="#666" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={{ fill: '#000000' }}
                  name="Spend ($)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="roas" 
                  stroke="#666666" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#666666' }}
                  name="ROAS"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Mix */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={channelPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {channelPerformance.map((channel, index) => (
                <div key={channel.channel} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-700">{channel.channel}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{channel.roas}x ROAS</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Insights */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Performance Comparison</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={audienceInsights}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="segment" stroke="#666" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
                  <Radar 
                    name="Current Strategy" 
                    dataKey="A" 
                    stroke="#000000" 
                    fill="#000000" 
                    fillOpacity={0.3}
                  />
                  <Radar 
                    name="With Precise Data" 
                    dataKey="B" 
                    stroke="#666666" 
                    fill="#666666" 
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Precise Data audiences show 15% higher conversion rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Improved reach without sacrificing performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Retention metrics show room for improvement</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Activate Lookalike Audiences</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Implement Retention Strategy</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}