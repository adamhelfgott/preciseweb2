"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  DollarSign,
  BarChart3,
  Info,
  ArrowRight,
  Sparkles,
  Target,
} from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

interface ShapleyAttribution {
  id: string;
  campaign: string;
  advertiser: string;
  totalConversions: number;
  yourContribution: number;
  shapleyValue: number;
  fairShare: number;
  earnings: number;
  trend: "up" | "down" | "neutral";
}

interface ContributionMetric {
  metric: string;
  value: number;
  benchmark: number;
  percentile: number;
}

const mockAttributions: ShapleyAttribution[] = [
  {
    id: "1",
    campaign: "Q1 Fitness Campaign",
    advertiser: "Nike",
    totalConversions: 24580,
    yourContribution: 8920,
    shapleyValue: 0.363,
    fairShare: 8923.54,
    earnings: 892.35,
    trend: "up",
  },
  {
    id: "2",
    campaign: "Spring Wellness",
    advertiser: "Peloton",
    totalConversions: 18340,
    yourContribution: 5120,
    shapleyValue: 0.279,
    fairShare: 5116.86,
    earnings: 511.69,
    trend: "up",
  },
  {
    id: "3",
    campaign: "Athleisure Targeting",
    advertiser: "Lululemon",
    totalConversions: 15670,
    yourContribution: 3920,
    shapleyValue: 0.250,
    fairShare: 3917.50,
    earnings: 391.75,
    trend: "neutral",
  },
  {
    id: "4",
    campaign: "Health & Wellness 2025",
    advertiser: "Apple",
    totalConversions: 32100,
    yourContribution: 12840,
    shapleyValue: 0.400,
    fairShare: 12840.00,
    earnings: 1284.00,
    trend: "up",
  },
];

const contributionMetrics: ContributionMetric[] = [
  {
    metric: "Conversion Lift",
    value: 34.2,
    benchmark: 15.0,
    percentile: 92,
  },
  {
    metric: "Audience Quality",
    value: 94.5,
    benchmark: 75.0,
    percentile: 98,
  },
  {
    metric: "Data Freshness",
    value: 98.2,
    benchmark: 85.0,
    percentile: 95,
  },
  {
    metric: "Match Rate",
    value: 78.9,
    benchmark: 65.0,
    percentile: 88,
  },
];

export default function AttributionBreakdown() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const totalEarnings = mockAttributions.reduce(
    (sum, attr) => sum + attr.earnings,
    0
  );
  const avgShapleyValue =
    mockAttributions.reduce((sum, attr) => sum + attr.shapleyValue, 0) /
    mockAttributions.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-gray">
            Attribution Breakdown
          </h2>
          <p className="text-sm text-medium-gray mt-1">
            Your Shapley value contribution to campaign success
          </p>
        </div>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="px-3 py-2 text-sm border border-silk-gray rounded-lg focus:outline-none focus:border-brand-purple"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={20} className="text-brand-purple" />
            <span className="text-xs text-brand-green">+28%</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">
            ${totalEarnings.toFixed(2)}
          </p>
          <p className="text-xs text-medium-gray">Total Attribution Earnings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles size={20} className="text-brand-green" />
            <Tooltip content="Average Shapley value across all campaigns">
              <Info size={14} className="text-medium-gray" />
            </Tooltip>
          </div>
          <p className="text-2xl font-bold text-dark-gray">
            {(avgShapleyValue * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-medium-gray">Avg. Shapley Value</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-brand-orange/10 to-brand-purple/10 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Target size={20} className="text-brand-orange" />
            <span className="text-xs text-brand-green">+15%</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">30.7K</p>
          <p className="text-xs text-medium-gray">Total Conversions</p>
        </motion.div>
      </div>

      {/* Attribution Details */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Campaign Attribution Details
        </h3>
        <div className="space-y-3">
          {mockAttributions.map((attribution, index) => (
            <motion.div
              key={attribution.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-silk-gray rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
              onClick={() =>
                setShowDetails(
                  showDetails === attribution.id ? null : attribution.id
                )
              }
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-dark-gray">
                    {attribution.campaign}
                  </p>
                  <p className="text-xs text-medium-gray">
                    {attribution.advertiser}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      attribution.trend === "up"
                        ? "bg-brand-green/10 text-brand-green"
                        : attribution.trend === "down"
                        ? "bg-brand-red/10 text-brand-red"
                        : "bg-light-gray text-medium-gray"
                    }`}
                  >
                    {attribution.trend === "up"
                      ? "↑"
                      : attribution.trend === "down"
                      ? "↓"
                      : "→"}{" "}
                    Trending
                  </span>
                  <p className="text-lg font-bold text-brand-purple">
                    ${attribution.earnings.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Shapley Value Visualization */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-medium-gray mb-1">
                    Your Contribution
                  </p>
                  <p className="text-sm font-medium text-dark-gray">
                    {attribution.yourContribution.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-medium-gray mb-1">Shapley Value</p>
                  <p className="text-sm font-medium text-dark-gray">
                    {(attribution.shapleyValue * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-medium-gray mb-1">Fair Share</p>
                  <p className="text-sm font-medium text-dark-gray">
                    {attribution.fairShare.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-light-gray rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-brand-purple to-brand-blue h-3 rounded-full transition-all duration-500"
                    style={{ width: `${attribution.shapleyValue * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-medium-gray mt-1">
                  <span>0%</span>
                  <span>
                    {attribution.totalConversions.toLocaleString()} total
                    conversions
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Expanded Details */}
              {showDetails === attribution.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-silk-gray"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-medium-gray mb-1">Attribution Method</p>
                      <p className="font-medium text-dark-gray">
                        Shapley Value (Game Theory)
                      </p>
                    </div>
                    <div>
                      <p className="text-medium-gray mb-1">Calculation Period</p>
                      <p className="font-medium text-dark-gray">
                        7-day click, 1-day view
                      </p>
                    </div>
                    <div>
                      <p className="text-medium-gray mb-1">
                        Data Points Contributed
                      </p>
                      <p className="font-medium text-dark-gray">
                        2.4M unique records
                      </p>
                    </div>
                    <div>
                      <p className="text-medium-gray mb-1">Revenue per Conv</p>
                      <p className="font-medium text-dark-gray">
                        ${(attribution.earnings / attribution.yourContribution).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contribution Metrics */}
      <div>
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Your Contribution Quality Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {contributionMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-light-gray/50 rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-medium-gray">{metric.metric}</p>
                <Tooltip
                  content={`You're in the ${metric.percentile}th percentile`}
                >
                  <Award size={14} className="text-brand-orange" />
                </Tooltip>
              </div>
              <p className="text-lg font-bold text-dark-gray">
                {metric.value}%
              </p>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className="text-medium-gray">vs</span>
                <span className="text-brand-green">
                  +{(metric.value - metric.benchmark).toFixed(1)}%
                </span>
                <span className="text-medium-gray">benchmark</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-dark-gray">
              Maximize your attribution value
            </p>
            <p className="text-xs text-medium-gray mt-1">
              Learn how to increase your Shapley value contribution
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/90 transition-colors">
            <span className="text-sm">View Tips</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}