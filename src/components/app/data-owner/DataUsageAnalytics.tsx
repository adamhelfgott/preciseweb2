"use client";

import { useState } from "react";
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
} from "lucide-react";
import { format } from "date-fns";

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
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    campaign: "Spring Wellness",
    advertiser: "Peloton",
    queryType: "Lookalike Modeling",
    recordsAccessed: 8920,
    privacyPreserved: true,
    revenue: 89.20,
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    campaign: "Athleisure Targeting",
    advertiser: "Lululemon",
    queryType: "Attribution Analysis",
    recordsAccessed: 15670,
    privacyPreserved: true,
    revenue: 156.70,
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    campaign: "Health & Wellness 2025",
    advertiser: "Apple",
    queryType: "Audience Segment",
    recordsAccessed: 22100,
    privacyPreserved: true,
    revenue: 221.00,
  },
];

const mockCampaignUsage: CampaignUsage[] = [
  {
    id: "1",
    name: "Q1 Fitness Campaign",
    advertiser: "Nike",
    queries: 1243,
    revenue: 12430,
    performance: 94,
    trend: "up",
  },
  {
    id: "2",
    name: "Spring Wellness",
    advertiser: "Peloton",
    queries: 892,
    revenue: 8920,
    performance: 87,
    trend: "up",
  },
  {
    id: "3",
    name: "Athleisure Targeting",
    advertiser: "Lululemon",
    queries: 567,
    revenue: 5670,
    performance: 72,
    trend: "neutral",
  },
];

const queryPatterns = [
  { type: "Audience Segment", count: 4521, percentage: 45 },
  { type: "Lookalike Modeling", count: 2513, percentage: 25 },
  { type: "Attribution Analysis", count: 1507, percentage: 15 },
  { type: "Predictive Scoring", count: 1005, percentage: 10 },
  { type: "Custom Queries", count: 502, percentage: 5 },
];

export default function DataUsageAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedQueryType, setSelectedQueryType] = useState("all");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-gray">
            Data Usage Analytics
          </h2>
          <p className="text-sm text-medium-gray mt-1">
            Real-time insights into how your data is being used
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 text-sm border border-silk-gray rounded-lg focus:outline-none focus:border-bright-purple"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <button className="p-2 border border-silk-gray rounded-lg hover:bg-light-gray transition-colors">
            <Filter size={16} className="text-medium-gray" />
          </button>
        </div>
      </div>

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
          <p className="text-2xl font-bold text-dark-gray">10,048</p>
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
          <p className="text-2xl font-bold text-dark-gray">23</p>
          <p className="text-xs text-medium-gray">Active Campaigns</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-light-gray/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Shield size={20} className="text-brand-green" />
            <span className="text-xs text-brand-green">100%</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">100%</p>
          <p className="text-xs text-medium-gray">Privacy Preserved</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-light-gray/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={20} className="text-brand-orange" />
            <span className="text-xs text-brand-green">+42%</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">$891.20</p>
          <p className="text-xs text-medium-gray">Revenue Today</p>
        </motion.div>
      </div>

      {/* Access Logs */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Recent Access Logs
        </h3>
        <div className="space-y-2">
          {mockAccessLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-light-gray/30 rounded-lg hover:bg-light-gray/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bright-purple/10 rounded-lg flex items-center justify-center">
                  <Eye size={16} className="text-bright-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-gray">
                    {log.campaign}
                  </p>
                  <p className="text-xs text-medium-gray">
                    {log.advertiser} • {log.queryType}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-dark-gray">
                  ${log.revenue.toFixed(2)}
                </p>
                <p className="text-xs text-medium-gray">
                  {format(log.timestamp, "HH:mm:ss")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Top Performing Campaigns
        </h3>
        <div className="space-y-3">
          {mockCampaignUsage.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-silk-gray rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-dark-gray">{campaign.name}</p>
                  <p className="text-xs text-medium-gray">
                    {campaign.advertiser}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      campaign.trend === "up"
                        ? "bg-brand-green/10 text-brand-green"
                        : campaign.trend === "down"
                        ? "bg-brand-red/10 text-brand-red"
                        : "bg-light-gray text-medium-gray"
                    }`}
                  >
                    {campaign.trend === "up" ? "↑" : campaign.trend === "down" ? "↓" : "→"} {campaign.performance}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-medium-gray">
                  {campaign.queries.toLocaleString()} queries
                </span>
                <span className="font-medium text-dark-gray">
                  ${campaign.revenue.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 w-full bg-light-gray rounded-full h-2">
                <div
                  className="bg-bright-purple h-2 rounded-full transition-all duration-500"
                  style={{ width: `${campaign.performance}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Query Patterns */}
      <div>
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Privacy-Preserved Query Patterns
        </h3>
        <div className="space-y-2">
          {queryPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1">
                <BarChart3 size={16} className="text-medium-gray" />
                <span className="text-sm text-dark-gray">{pattern.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-medium-gray">
                  {pattern.count.toLocaleString()}
                </span>
                <div className="w-24 bg-light-gray rounded-full h-2">
                  <div
                    className="bg-brand-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pattern.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-dark-gray w-10 text-right">
                  {pattern.percentage}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}