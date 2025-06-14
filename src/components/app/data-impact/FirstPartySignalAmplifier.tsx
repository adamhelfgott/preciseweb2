"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Upload, 
  Zap, 
  Target,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Info,
  Shield,
  Sparkles,
  BarChart3,
  Database,
  FileUp,
  Check,
  AlertCircle,
  Download,
  Brain,
  Network,
  Eye
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  ComposedChart
} from "recharts";
import FilesWidget from "./FilesWidget";

// Mock data for uploaded segments
const UPLOADED_SEGMENTS = [
  {
    id: "1",
    name: "High-Value Customers",
    source: "CRM",
    recordCount: 125000,
    uploadDate: "2025-05-15",
    matchRate: 78,
    avgLTV: 450,
    status: "active",
    performance: {
      campaigns: 12,
      avgROAS: 4.2,
      totalRevenue: 2340000,
      incrementalLift: 34
    }
  },
  {
    id: "2", 
    name: "Newsletter Subscribers",
    source: "Email Platform",
    recordCount: 340000,
    uploadDate: "2025-05-10",
    matchRate: 65,
    avgLTV: 180,
    status: "active",
    performance: {
      campaigns: 8,
      avgROAS: 3.1,
      totalRevenue: 890000,
      incrementalLift: 22
    }
  },
  {
    id: "3",
    name: "App Power Users",
    source: "Mobile Analytics",
    recordCount: 89000,
    uploadDate: "2025-05-20",
    matchRate: 82,
    avgLTV: 320,
    status: "processing",
    performance: {
      campaigns: 0,
      avgROAS: 0,
      totalRevenue: 0,
      incrementalLift: 0
    }
  }
];

// Lookalike expansion data
const LOOKALIKE_EXPANSION = [
  { segment: "High-Value", original: 125, expanded: 890, multiplier: 7.1 },
  { segment: "Subscribers", original: 340, expanded: 1850, multiplier: 5.4 },
  { segment: "App Users", original: 89, expanded: 520, multiplier: 5.8 }
];

// Performance by channel
const CHANNEL_PERFORMANCE = [
  { channel: "CTV", reach: 78, ctr: 2.8, roas: 4.5 },
  { channel: "Display", reach: 92, ctr: 0.8, roas: 2.1 },
  { channel: "Social", reach: 65, ctr: 3.2, roas: 3.8 },
  { channel: "Audio", reach: 45, ctr: 1.2, roas: 2.9 }
];

// Match rate by data type
const MATCH_RATE_DATA = [
  { type: "Email", rate: 72, quality: "High" },
  { type: "Phone", rate: 58, quality: "Medium" },
  { type: "Device ID", rate: 85, quality: "High" },
  { type: "Postal", rate: 45, quality: "Low" },
  { type: "Combined", rate: 91, quality: "Very High" }
];

// Time series performance
const PERFORMANCE_TIMELINE = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  firstParty: 100 + Math.random() * 20 + i * 2,
  lookalike: 100 + Math.random() * 15 + i * 1.5,
  thirdParty: 100 + Math.random() * 10 + i * 0.5,
}));

// Segment quality scores
const SEGMENT_QUALITY = [
  { attribute: "Recency", score: 85 },
  { attribute: "Frequency", score: 72 },
  { attribute: "Monetary", score: 90 },
  { attribute: "Engagement", score: 78 },
  { attribute: "Predictive", score: 82 },
  { attribute: "Coverage", score: 68 }
];

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"];

export default function FirstPartySignalAmplifier() {
  const [activeSegment, setActiveSegment] = useState(UPLOADED_SEGMENTS[0]);
  const [viewMode, setViewMode] = useState<"overview" | "expansion" | "performance">("overview");
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const totalRecords = UPLOADED_SEGMENTS.reduce((sum, seg) => sum + seg.recordCount, 0);
  const avgMatchRate = UPLOADED_SEGMENTS.reduce((sum, seg) => sum + seg.matchRate, 0) / UPLOADED_SEGMENTS.length;
  const totalRevenue = UPLOADED_SEGMENTS.reduce((sum, seg) => sum + seg.performance.totalRevenue, 0);

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with upload button */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-green/10 rounded-lg">
              <Users className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-dark-gray">First-Party Signal Amplifier</h2>
              <p className="text-sm text-medium-gray">Transform your customer data into powerful audience segments</p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Data
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Database className="text-brand-green" size={20} />
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(totalRecords / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">Total Records</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Target className="text-blue-600" size={20} />
              <span className="text-xs text-blue-600 font-medium">{avgMatchRate.toFixed(0)}%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {UPLOADED_SEGMENTS.length}
            </div>
            <div className="text-sm text-gray-600">Active Segments</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-purple-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+34%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              5.8x
            </div>
            <div className="text-sm text-gray-600">Avg. Expansion</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+42%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </motion.div>
        </div>
      </div>

      {/* Files Widget */}
      <FilesWidget />

      {/* View Mode Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-1">
        <div className="flex">
          <button
            onClick={() => setViewMode("overview")}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "overview" 
                ? "bg-brand-green text-white" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Segment Overview
          </button>
          <button
            onClick={() => setViewMode("expansion")}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "expansion" 
                ? "bg-brand-green text-white" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lookalike Expansion
          </button>
          <button
            onClick={() => setViewMode("performance")}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === "performance" 
                ? "bg-brand-green text-white" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Performance Tracking
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "overview" && (
        <div className="grid grid-cols-12 gap-6">
          {/* Segment List */}
          <div className="col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Segments</h3>
              <div className="space-y-3">
                {UPLOADED_SEGMENTS.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setActiveSegment(segment)}
                    className={`w-full p-4 rounded-lg border transition-all text-left ${
                      activeSegment.id === segment.id
                        ? "border-brand-green bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{segment.name}</h4>
                        <p className="text-sm text-gray-600">{segment.source}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        segment.status === "active" 
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {segment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Records</p>
                        <p className="font-medium">{(segment.recordCount / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Match Rate</p>
                        <p className="font-medium">{segment.matchRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">ROAS</p>
                        <p className="font-medium">{segment.performance.avgROAS}x</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload New Segment
              </button>
            </div>
          </div>

          {/* Segment Details */}
          <div className="col-span-7 space-y-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {activeSegment.name} Performance
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Segment Quality Score</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={SEGMENT_QUALITY}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="attribute" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar
                          name="Score"
                          dataKey="score"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Channel Performance</h4>
                  <div className="space-y-3">
                    {CHANNEL_PERFORMANCE.map((channel) => (
                      <div key={channel.channel} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{channel.channel}</span>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{channel.roas}x</p>
                            <p className="text-xs text-gray-500">ROAS</p>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brand-green h-2 rounded-full"
                              style={{ width: `${channel.reach}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Match Rate Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Resolution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MATCH_RATE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                      {MATCH_RATE_DATA.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.quality === "Very High" ? "#10B981" :
                            entry.quality === "High" ? "#3B82F6" :
                            entry.quality === "Medium" ? "#F59E0B" : "#EF4444"
                          } 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "expansion" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Lookalike Builder */}
          <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lookalike Audience Builder</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Source Segment</label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg">
                  {UPLOADED_SEGMENTS.map((segment) => (
                    <option key={segment.id} value={segment.id}>{segment.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Expansion Factor</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="5"
                  className="w-full mt-1"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Conservative (1x)</span>
                  <span>Aggressive (10x)</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Model Type</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button className="px-3 py-2 border border-brand-green bg-green-50 text-brand-green rounded-lg text-sm">
                    <Brain className="w-4 h-4 inline mr-1" />
                    AI Similarity
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
                    <BarChart3 className="w-4 h-4 inline mr-1" />
                    Statistical
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Projected Results</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Expanded Reach</p>
                  <p className="text-xl font-bold text-gray-900">625K</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected Match Rate</p>
                  <p className="text-xl font-bold text-gray-900">72%</p>
                </div>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Lookalike Audience
            </button>
          </div>

          {/* Expansion Visualization */}
          <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Expansion Impact</h3>
            
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={LOOKALIKE_EXPANSION}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="segment" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="original" fill="#E5E7EB" name="Original" />
                  <Bar yAxisId="left" dataKey="expanded" fill="#10B981" name="Expanded" />
                  <Line yAxisId="right" type="monotone" dataKey="multiplier" stroke="#8B5CF6" strokeWidth={2} name="Multiplier" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Network className="text-purple-600 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Privacy-Preserving Expansion</h4>
                  <p className="text-sm text-gray-600">
                    Our AI models identify similar users without exposing individual data. 
                    Lookalike audiences maintain an average 85% behavioral similarity while 
                    expanding reach by 5-10x.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expansion Use Cases */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-silk-gray p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Lookalike Campaigns</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Campaign</th>
                    <th className="text-right py-3 px-4">Source Size</th>
                    <th className="text-right py-3 px-4">Expanded Size</th>
                    <th className="text-right py-3 px-4">Performance</th>
                    <th className="text-right py-3 px-4">Revenue</th>
                    <th className="text-center py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Summer Sale Retargeting</td>
                    <td className="text-right py-3 px-4">125K</td>
                    <td className="text-right py-3 px-4">890K</td>
                    <td className="text-right py-3 px-4">
                      <span className="text-green-600 font-medium">4.2x ROAS</span>
                    </td>
                    <td className="text-right py-3 px-4">$1.2M</td>
                    <td className="text-center py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">New Product Launch</td>
                    <td className="text-right py-3 px-4">89K</td>
                    <td className="text-right py-3 px-4">520K</td>
                    <td className="text-right py-3 px-4">
                      <span className="text-green-600 font-medium">3.8x ROAS</span>
                    </td>
                    <td className="text-right py-3 px-4">$780K</td>
                    <td className="text-center py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Holiday Shoppers</td>
                    <td className="text-right py-3 px-4">340K</td>
                    <td className="text-right py-3 px-4">1.85M</td>
                    <td className="text-right py-3 px-4">
                      <span className="text-yellow-600 font-medium">Pending</span>
                    </td>
                    <td className="text-right py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Building</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {viewMode === "performance" && (
        <div className="space-y-6">
          {/* Performance Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">30-Day Performance Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PERFORMANCE_TIMELINE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="firstParty" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="First-Party Data"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lookalike" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    name="Lookalike Audiences"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="thirdParty" 
                    stroke="#6B7280" 
                    strokeWidth={2}
                    name="Third-Party (Benchmark)"
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROI Analysis */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="text-green-600" size={24} />
                <span className="text-sm font-medium text-green-600">First-Party</span>
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">156%</h4>
              <p className="text-sm text-gray-600">Better performance vs. third-party data</p>
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. CAC</span>
                  <span className="font-medium">$24.50</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">LTV:CAC</span>
                  <span className="font-medium text-green-600">5.2:1</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
            >
              <div className="flex items-center justify-between mb-4">
                <Sparkles className="text-purple-600" size={24} />
                <span className="text-sm font-medium text-purple-600">Lookalike</span>
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">89%</h4>
              <p className="text-sm text-gray-600">Match quality vs. seed audience</p>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expansion</span>
                  <span className="font-medium">5.8x</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">New Customers</span>
                  <span className="font-medium text-purple-600">+34K</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <Eye className="text-blue-600" size={24} />
                <span className="text-sm font-medium text-blue-600">Transparency</span>
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">100%</h4>
              <p className="text-sm text-gray-600">Full visibility into data usage</p>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Campaigns</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Privacy Score</span>
                  <span className="font-medium text-blue-600">A+</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Best Practices */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <div className="flex items-start gap-3">
              <Info className="text-indigo-600 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">First-Party Data Best Practices</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <ul className="space-y-1">
                    <li>• Upload fresh data monthly for best results</li>
                    <li>• Combine multiple identifiers for higher match rates</li>
                    <li>• Segment by value tiers for precise targeting</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Use lookalikes for prospecting campaigns</li>
                    <li>• Monitor performance weekly and optimize</li>
                    <li>• Test different expansion factors by vertical</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload First-Party Data</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mb-4" />
                    <p className="text-gray-600">Processing your data...</p>
                  </div>
                ) : (
                  <>
                    <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-sm text-gray-500">Supported formats: CSV, JSON, TXT (max 50MB)</p>
                    <input type="file" className="hidden" />
                  </>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-600 flex-shrink-0" size={20} />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Privacy Protection</p>
                    <p>Your data is hashed locally before upload. We never see or store raw customer information.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  className="flex-1 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700"
                >
                  Upload & Process
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}