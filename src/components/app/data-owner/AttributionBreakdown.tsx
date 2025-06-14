"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
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
    campaign: "Ticket Sales 2025",
    advertiser: "Pro Sports Team",
    totalConversions: 24580,
    yourContribution: 72320,
    shapleyValue: 0.21,
    fairShare: 72320,
    earnings: 7232,
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
  const { user } = useAuth();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get data assets for the user
  const dataAssets = useQuery(api.dataAssets.getDataAssets,
    convexUser?._id ? { ownerId: convexUser._id } : "skip"
  );

  // Get Shapley values for the user's assets
  const shapleyValues = useQuery(api.attribution.getShapleyValues,
    convexUser?._id ? { ownerId: convexUser._id } : "skip"
  );

  // Get campaigns that use the user's data
  const campaigns = useQuery(api.campaigns.getCampaigns, "skip"); // We'll need to filter these

  // Mutation for calculating Shapley values
  const calculateShapley = useMutation(api.attribution.calculateShapleyValues);

  // Simulate Shapley value calculations
  useEffect(() => {
    if (!convexUser?._id || !dataAssets?.length || !simulationActive) return;

    const interval = setInterval(async () => {
      try {
        // Simulate for first data asset
        const asset = dataAssets[0];
        const campaignNames = ["Nike Q4", "Adidas Winter", "Under Armour", "Lululemon Fall"];
        const randomCampaign = campaignNames[Math.floor(Math.random() * campaignNames.length)];
        
        await calculateShapley({
          assetId: asset._id,
          ownerId: convexUser._id,
          campaignId: asset._id as any, // In real app, would be actual campaign ID
          shapleyValue: 0.2 + Math.random() * 0.3,
          marginalContribution: 500 + Math.random() * 1000,
          coalitionSize: 3 + Math.floor(Math.random() * 5),
        });
      } catch (error) {
        console.error("Failed to calculate Shapley values:", error);
      }
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, dataAssets, simulationActive, calculateShapley]);

  // Map Shapley values to attribution format
  const attributions: ShapleyAttribution[] = shapleyValues?.length > 0 
    ? shapleyValues.slice(0, 4).map((sv: any, index: number) => {
        const asset = dataAssets?.find((a: any) => a._id === sv.assetId);
        return {
          id: sv._id,
          campaign: mockAttributions[index % mockAttributions.length].campaign,
          advertiser: mockAttributions[index % mockAttributions.length].advertiser,
          totalConversions: Math.floor(sv.marginalContribution * 20),
          yourContribution: Math.floor(sv.marginalContribution * sv.shapleyValue * 20),
          shapleyValue: sv.shapleyValue,
          fairShare: sv.marginalContribution,
          earnings: sv.marginalContribution,
          trend: sv.shapleyValue > 0.3 ? "up" : sv.shapleyValue > 0.2 ? "neutral" : "down",
        };
      })
    : mockAttributions;

  const totalEarnings = attributions.reduce(
    (sum, attr) => sum + attr.earnings,
    0
  );
  const avgShapleyValue =
    attributions.reduce((sum, attr) => sum + attr.shapleyValue, 0) /
    attributions.length;

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
        <div className="flex items-center gap-3">
          {/* Simulation Toggle */}
          {convexUser && (
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                simulationActive 
                  ? "bg-bright-purple text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {simulationActive ? "Simulation On" : "Simulation Off"}
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
        </div>
      </div>

      {/* Loading State */}
      {!user || !convexUser ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-purple mx-auto mb-4"></div>
            <p className="text-sm text-medium-gray">Loading attribution data...</p>
          </div>
        </div>
      ) : (
      <>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-bright-purple/10 to-brand-blue/10 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={20} className="text-bright-purple" />
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
            <div className="group relative">
              <Info size={14} className="text-medium-gray cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-dark-gray text-white text-xs p-2 rounded whitespace-nowrap z-10">
                Average Shapley value across all campaigns
              </div>
            </div>
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
          className="bg-gradient-to-br from-brand-orange/10 to-bright-purple/10 rounded-xl p-4"
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
          {attributions.map((attribution, index) => (
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
                  <p className="text-lg font-bold text-bright-purple">
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
                    className="bg-gradient-to-r from-bright-purple to-brand-blue h-3 rounded-full transition-all duration-500"
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
                <div className="group relative">
                  <Award size={14} className="text-brand-orange cursor-help" />
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-dark-gray text-white text-xs p-2 rounded whitespace-nowrap z-10">
                    You're in the {metric.percentile}th percentile
                  </div>
                </div>
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
        className="mt-6 p-4 bg-gradient-to-r from-bright-purple/10 to-brand-blue/10 rounded-lg"
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
          <button className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-white rounded-lg hover:bg-bright-purple/90 transition-colors">
            <span className="text-sm">View Tips</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
      </>
      )}
    </div>
  );
}