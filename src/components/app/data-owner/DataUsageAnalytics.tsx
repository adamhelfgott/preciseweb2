"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Eye,
  Shield,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
  Filter,
  Download,
  Search,
  Database,
  Zap,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, AreaChart, Area 
} from "recharts";

// Types remain the same
interface AccessLog {
  id: string;
  timestamp: Date;
  campaign: string;
  advertiser: string;
  queryType: string;
  recordsAccessed: number;
  privacyPreserved: boolean;
  revenue: number;
}

interface CampaignUsage {
  id: string;
  name: string;
  advertiser: string;
  queries: number;
  revenue: number;
  performance: number;
  trend: "up" | "down" | "neutral";
}

// Mock data (fallback)
const mockAccessLogs: AccessLog[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    campaign: "Q1 Fitness Campaign",
    advertiser: "Nike",
    queryType: "Audience Segment",
    recordsAccessed: 12430,
    privacyPreserved: true,
    revenue: 124.30,
  },
  // ... add more mock data
];

const mockCampaignUsage: CampaignUsage[] = [
  {
    id: "1",
    name: "Winter Athletic Collection",
    advertiser: "Nike",
    queries: 1235,
    revenue: 12350,
    performance: 94,
    trend: "up",
  },
  // ... add more mock data
];

const queryPatterns = [
  { type: "Audience Segment", count: 4521, percentage: 45 },
  { type: "Lookalike Modeling", count: 2513, percentage: 25 },
  { type: "Attribution Analysis", count: 1507, percentage: 15 },
  { type: "Predictive Scoring", count: 1005, percentage: 10 },
  { type: "Custom Queries", count: 502, percentage: 5 },
];

const COLORS = ["#0984E3", "#00B894", "#A29BFE", "#FF6B6B", "#FDCB6E"];

export default function DataUsageAnalytics() {
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedQueryType, setSelectedQueryType] = useState("all");
  const [viewMode, setViewMode] = useState<"overview" | "logs" | "patterns" | "campaigns">("overview");
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get usage analytics from Convex
  const usageAnalytics = useQuery(api.usageAnalytics.getUsageAnalytics,
    convexUser?._id ? { ownerId: convexUser._id, timeframe: selectedTimeframe } : "skip"
  );

  // Get query logs
  const queryLogs = useQuery(api.usageAnalytics.getQueryLogs,
    convexUser?._id ? { ownerId: convexUser._id, limit: 100 } : "skip"
  );

  // Get usage patterns
  const usagePatterns = useQuery(api.usageAnalytics.getUsagePatterns,
    convexUser?._id ? { ownerId: convexUser._id } : "skip"
  );

  // Get campaign usage
  const campaignUsage = useQuery(api.usageAnalytics.getCampaignUsage,
    convexUser?._id ? { ownerId: convexUser._id } : "skip"
  );

  // Mutations
  const simulateUsage = useMutation(api.usageAnalytics.simulateUsage);

  // Simulate usage periodically
  useEffect(() => {
    if (!simulationActive || !convexUser?._id) return;

    const interval = setInterval(async () => {
      try {
        await simulateUsage({ ownerId: convexUser._id });
      } catch (error) {
        console.error("Failed to simulate usage:", error);
      }
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [simulationActive, convexUser?._id, simulateUsage]);

  // Use Convex data if available, otherwise fall back to mock data
  const logs = queryLogs || mockAccessLogs;
  const campaigns = campaignUsage || mockCampaignUsage;
  const patterns = usagePatterns?.queryPatterns || queryPatterns;

  // Calculate stats
  const totalQueries = usagePatterns?.totalQueries || 10048;
  const activeCampaigns = campaigns.length;
  const avgResponseTime = queryLogs ? 
    queryLogs.reduce((sum: number, log: any) => sum + log.responseTime, 0) / (queryLogs.length || 1) : 125;
  const totalRevenue = campaigns.reduce((sum: number, c: any) => sum + c.revenue, 0);

  // Loading state
  if (!user || !convexUser) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-purple mx-auto mb-4"></div>
            <p className="text-medium-gray">Loading usage analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-gray">
            Usage Analytics Deep Dive
          </h2>
          <p className="text-sm text-medium-gray mt-1">
            Comprehensive insights into data usage patterns and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Simulation Toggle */}
          {convexUser && (
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                simulationActive 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {simulationActive ? "Live Usage On" : "Live Usage Off"}
            </button>
          )}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 text-sm border border-silk-gray rounded-lg focus:outline-none focus:border-bright-purple"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <button className="px-3 py-2 text-sm border border-silk-gray rounded-lg hover:bg-light-gray transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode("overview")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "overview"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setViewMode("logs")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "logs"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          Query Logs
        </button>
        <button
          onClick={() => setViewMode("patterns")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "patterns"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          Usage Patterns
        </button>
        <button
          onClick={() => setViewMode("campaigns")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "campaigns"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          Campaign Performance
        </button>
      </div>

      {/* Overview View */}
      {viewMode === "overview" && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-light-gray/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Activity size={20} className="text-bright-purple" />
                <span className="text-xs text-brand-green">+23%</span>
              </div>
              <p className="text-2xl font-bold text-dark-gray">{totalQueries.toLocaleString()}</p>
              <p className="text-xs text-medium-gray">Total Queries</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-light-gray/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Users size={20} className="text-brand-blue" />
                <span className="text-xs text-brand-green">+15%</span>
              </div>
              <p className="text-2xl font-bold text-dark-gray">{activeCampaigns}</p>
              <p className="text-xs text-medium-gray">Active Campaigns</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-light-gray/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Clock size={20} className="text-vibrant-orange" />
              </div>
              <p className="text-2xl font-bold text-dark-gray">{Math.round(avgResponseTime)}ms</p>
              <p className="text-xs text-medium-gray">Avg Response Time</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-gray/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={20} className="text-brand-green" />
                <span className="text-xs text-brand-green">+42%</span>
              </div>
              <p className="text-2xl font-bold text-dark-gray">${(totalRevenue / 1000).toFixed(1)}k</p>
              <p className="text-xs text-medium-gray">Total Revenue</p>
            </motion.div>
          </div>

          {/* Usage Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-light-gray/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-dark-gray mb-4">Query Volume Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={Array.from({ length: 24 }, (_, i) => ({
                    hour: `${i}:00`,
                    queries: usagePatterns?.hourlyDistribution?.[i] || Math.floor(Math.random() * 100) + 50
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                    <XAxis dataKey="hour" stroke="#86868B" />
                    <YAxis stroke="#86868B" />
                    <Tooltip />
                    <Area type="monotone" dataKey="queries" stroke="#A29BFE" fill="#A29BFE" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-light-gray/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-dark-gray mb-4">Query Type Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patterns}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.type}: ${entry.percentage}%`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {patterns.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Assets by Usage */}
          <div className="bg-light-gray/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-dark-gray mb-4">Asset Performance Overview</h3>
            <div className="space-y-3">
              {(usagePatterns?.assetPerformance || []).slice(0, 5).map((asset: any, index: number) => (
                <div key={asset.assetId} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database size={20} className="text-bright-purple" />
                    <div>
                      <p className="font-medium text-dark-gray">{asset.assetName}</p>
                      <p className="text-xs text-medium-gray">
                        {asset.totalQueries} queries • {Math.round(asset.avgResponseTime)}ms avg
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-dark-gray">${(asset.totalRevenue / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-brand-green">
                      ${asset.revenuePerQuery.toFixed(2)}/query
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Query Logs View */}
      {viewMode === "logs" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-dark-gray">Real-time Query Logs</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search logs..."
                className="px-3 py-1 text-sm border border-silk-gray rounded-lg focus:outline-none focus:border-bright-purple"
              />
              <button className="px-3 py-1 text-sm bg-bright-purple text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-gray">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase">Timestamp</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase">Query Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase">Buyer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase">Response Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-silk-gray">
                {(queryLogs || logs).slice(0, 20).map((log: any, index: number) => (
                  <tr key={log.id || index} className="hover:bg-light-gray/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-dark-gray">
                      {format(new Date(log.timestamp), "HH:mm:ss")}
                    </td>
                    <td className="px-4 py-3 text-sm text-dark-gray">{log.assetName || log.campaign}</td>
                    <td className="px-4 py-3 text-sm text-dark-gray">{log.queryType}</td>
                    <td className="px-4 py-3 text-sm text-dark-gray">{log.userName || log.advertiser}</td>
                    <td className="px-4 py-3 text-sm text-dark-gray">
                      <span className={`font-medium ${log.responseTime < 100 ? "text-brand-green" : log.responseTime < 300 ? "text-vibrant-orange" : "text-warm-coral"}`}>
                        {Math.round(log.responseTime || 0)}ms
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-dark-gray">
                      ${(log.revenue || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Usage Patterns View */}
      {viewMode === "patterns" && (
        <div className="space-y-6">
          {/* Hourly Pattern */}
          <div className="bg-light-gray/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-dark-gray mb-4">Hourly Usage Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Array.from({ length: 24 }, (_, i) => ({
                  hour: `${i}:00`,
                  queries: usagePatterns?.hourlyDistribution?.[i] || Math.floor(Math.random() * 100) + 50
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                  <XAxis dataKey="hour" stroke="#86868B" />
                  <YAxis stroke="#86868B" />
                  <Tooltip />
                  <Bar dataKey="queries" fill="#A29BFE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Query Types Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-light-gray/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-dark-gray mb-4">Query Type Performance</h3>
              <div className="space-y-3">
                {patterns.map((pattern: any) => (
                  <div key={pattern.type} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-dark-gray">{pattern.type}</span>
                        <span className="text-xs text-medium-gray">{pattern.count.toLocaleString()} queries</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-bright-purple to-electric-blue h-2 rounded-full"
                          style={{ width: `${pattern.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-dark-gray w-12 text-right">
                      {pattern.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-light-gray/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-dark-gray mb-4">Usage Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-vibrant-orange mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark-gray">Peak Usage Hours</p>
                    <p className="text-xs text-medium-gray">Most queries occur between 2-4 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-brand-green mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark-gray">Growing Demand</p>
                    <p className="text-xs text-medium-gray">Predictive scoring queries up 45% this month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-electric-blue mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark-gray">Privacy Compliance</p>
                    <p className="text-xs text-medium-gray">100% queries meet privacy thresholds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warm-coral mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark-gray">Optimization Opportunity</p>
                    <p className="text-xs text-medium-gray">Consider caching frequent audience segments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Performance View */}
      {viewMode === "campaigns" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-xl p-4">
              <h4 className="text-sm font-medium text-dark-gray mb-2">Top Campaign</h4>
              <p className="text-xl font-bold text-dark-gray">{campaigns[0]?.name || "Nike Fitness"}</p>
              <p className="text-sm text-medium-gray">${((campaigns[0]?.revenue || 0) / 1000).toFixed(1)}k revenue</p>
            </div>
            <div className="bg-light-gray/50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-dark-gray mb-2">Avg Campaign Value</h4>
              <p className="text-xl font-bold text-dark-gray">
                ${(totalRevenue / (campaigns.length || 1) / 1000).toFixed(1)}k
              </p>
              <p className="text-sm text-medium-gray">Per campaign</p>
            </div>
            <div className="bg-light-gray/50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-dark-gray mb-2">Query Efficiency</h4>
              <p className="text-xl font-bold text-dark-gray">
                ${(totalRevenue / totalQueries).toFixed(2)}
              </p>
              <p className="text-sm text-medium-gray">Per query</p>
            </div>
          </div>

          <div className="bg-light-gray/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-dark-gray mb-4">Campaign Performance Details</h3>
            <div className="space-y-3">
              {campaigns.map((campaign: any, index: number) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white rounded-lg border border-silk-gray"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-dark-gray">{campaign.name}</p>
                      <p className="text-xs text-medium-gray">{campaign.advertiser}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campaign.trend === "up"
                          ? "bg-brand-green/10 text-brand-green"
                          : campaign.trend === "down"
                          ? "bg-warm-coral/10 text-warm-coral"
                          : "bg-light-gray text-medium-gray"
                      }`}>
                        {campaign.trend === "up" ? "↑" : campaign.trend === "down" ? "↓" : "→"} 
                        {campaign.performance > 0 ? `+${campaign.performance}%` : `${campaign.performance}%`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-medium-gray">Queries</p>
                      <p className="font-medium text-dark-gray">{campaign.queries.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-medium-gray">Revenue</p>
                      <p className="font-medium text-dark-gray">${campaign.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-medium-gray">Avg Value</p>
                      <p className="font-medium text-dark-gray">
                        ${(campaign.revenue / campaign.queries).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-medium-gray mb-1">
                      <span>Performance</span>
                      <span>{Math.abs(campaign.performance)}%</span>
                    </div>
                    <div className="w-full bg-light-gray rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          campaign.performance > 0 ? "bg-brand-green" : "bg-warm-coral"
                        }`}
                        style={{ width: `${Math.min(Math.abs(campaign.performance), 100)}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}