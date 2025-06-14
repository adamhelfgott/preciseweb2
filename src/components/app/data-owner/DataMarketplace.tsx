"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Info,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { isMockDataEnabled } from "@/lib/utils/mockDataConfig";

interface MarketDemand {
  category: string;
  demand: "high" | "medium" | "low";
  avgPrice: number;
  growth: number;
  opportunities: number;
}

interface PricingRecommendation {
  dataType: string;
  currentPrice: number;
  recommendedPrice: number;
  marketAvg: number;
  priceChange: number;
  reasoning: string;
}

interface CompetitorBenchmark {
  name: string;
  category: string;
  qualityScore: number;
  avgPrice: number;
  marketShare: number;
  trend: "up" | "down" | "neutral";
}

interface IntegrationOpportunity {
  partner: string;
  type: string;
  potentialRevenue: number;
  effort: "low" | "medium" | "high";
  compatibility: number;
  description: string;
}

const marketDemandData: MarketDemand[] = [
  {
    category: "Fitness & Wearables",
    demand: "high",
    avgPrice: 0.12,
    growth: 34,
    opportunities: 47,
  },
  {
    category: "Identity Resolution",
    demand: "high",
    avgPrice: 0.18,
    growth: 28,
    opportunities: 32,
  },
  {
    category: "Purchase Intent",
    demand: "medium",
    avgPrice: 0.15,
    growth: 15,
    opportunities: 21,
  },
  {
    category: "Location Data",
    demand: "medium",
    avgPrice: 0.08,
    growth: 12,
    opportunities: 18,
  },
  {
    category: "Social Signals",
    demand: "low",
    avgPrice: 0.06,
    growth: -5,
    opportunities: 8,
  },
];

const pricingRecommendations: PricingRecommendation[] = [
  {
    dataType: "Real-time Heart Rate",
    currentPrice: 0.10,
    recommendedPrice: 0.14,
    marketAvg: 0.12,
    priceChange: 40,
    reasoning: "High demand for health metrics in Q1 campaigns",
  },
  {
    dataType: "Workout Patterns",
    currentPrice: 0.08,
    recommendedPrice: 0.11,
    marketAvg: 0.10,
    priceChange: 37.5,
    reasoning: "Premium value for predictive fitness insights",
  },
  {
    dataType: "Sleep Quality",
    currentPrice: 0.09,
    recommendedPrice: 0.09,
    marketAvg: 0.09,
    priceChange: 0,
    reasoning: "Optimal pricing for current market conditions",
  },
];

const competitorBenchmarks: CompetitorBenchmark[] = [
  {
    name: "FitData Pro",
    category: "Fitness & Wearables",
    qualityScore: 92,
    avgPrice: 0.13,
    marketShare: 18,
    trend: "up",
  },
  {
    name: "HealthSync Analytics",
    category: "Fitness & Wearables",
    qualityScore: 88,
    avgPrice: 0.11,
    marketShare: 15,
    trend: "neutral",
  },
  {
    name: "WellnessMetrics",
    category: "Fitness & Wearables",
    qualityScore: 85,
    avgPrice: 0.09,
    marketShare: 12,
    trend: "down",
  },
  {
    name: "Your Data (Current)",
    category: "Fitness & Wearables",
    qualityScore: 94,
    avgPrice: 0.10,
    marketShare: 8,
    trend: "up",
  },
];

const integrationOpportunities: IntegrationOpportunity[] = [
  {
    partner: "Apple Health",
    type: "Direct API Integration",
    potentialRevenue: 45000,
    effort: "medium",
    compatibility: 95,
    description: "Seamless integration with iOS ecosystem",
  },
  {
    partner: "Google Fit",
    type: "SDK Partnership",
    potentialRevenue: 38000,
    effort: "low",
    compatibility: 92,
    description: "Access Android fitness tracking data",
  },
  {
    partner: "Peloton",
    type: "Premium Data Exchange",
    potentialRevenue: 52000,
    effort: "high",
    compatibility: 88,
    description: "High-value fitness enthusiast segments",
  },
  {
    partner: "Strava",
    type: "Activity Enrichment",
    potentialRevenue: 28000,
    effort: "low",
    compatibility: 90,
    description: "Social fitness data enhancement",
  },
];

export default function DataMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPricingDetails, setShowPricingDetails] = useState(false);

  // Fetch data from Convex
  const convexMarketDemand = useQuery(api.marketplace.getMarketplaceDemand);
  const convexCompetitors = useQuery(api.marketplace.getCompetitorBenchmarks);
  const convexIntegrations = useQuery(api.marketplace.getIntegrationOpportunities);

  // Use Convex data if available and mock data is disabled, otherwise use hardcoded data
  const useMockData = isMockDataEnabled();
  const marketDemand = (!useMockData && convexMarketDemand) || marketDemandData;
  const competitors = (!useMockData && convexCompetitors) || competitorBenchmarks;
  const integrations = (!useMockData && convexIntegrations) || integrationOpportunities;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-gray">
            Data Marketplace Insights
          </h2>
          <p className="text-sm text-medium-gray mt-1">
            Market demand, pricing optimization, and growth opportunities
          </p>
        </div>
        <button className="px-4 py-2 bg-bright-purple text-white rounded-lg hover:bg-bright-purple/90 transition-colors text-sm">
          View Full Market Report
        </button>
      </div>

      {/* Market Demand Overview */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Current Market Demand
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketDemand.map((market, index) => (
            <motion.div
              key={market.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-silk-gray rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-dark-gray text-sm">
                    {market.category}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        market.demand === "high"
                          ? "bg-brand-green/10 text-brand-green"
                          : market.demand === "medium"
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "bg-light-gray text-medium-gray"
                      }`}
                    >
                      {market.demand || (market.growth > 20 ? "high" : market.growth > 10 ? "medium" : "low")} demand
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-medium-gray">Avg CPM</p>
                  <p className="text-lg font-bold text-dark-gray">
                    ${market.avgPrice || market.avgCPM || 0}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-medium-gray">Growth</span>
                  <span
                    className={`flex items-center gap-1 ${
                      market.growth > 0 ? "text-brand-green" : "text-brand-red"
                    }`}
                  >
                    {market.growth > 0 ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {Math.abs(market.growth)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-medium-gray">Opportunities</span>
                  <span className="font-medium text-dark-gray">
                    {market.opportunities} active
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Recommendations */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-dark-gray">
            AI-Powered Pricing Recommendations
          </h3>
          <button
            onClick={() => setShowPricingDetails(!showPricingDetails)}
            className="text-xs text-bright-purple hover:text-bright-purple/80"
          >
            {showPricingDetails ? "Hide" : "Show"} Details
          </button>
        </div>
        <div className="space-y-3">
          {pricingRecommendations.map((rec, index) => (
            <motion.div
              key={rec.dataType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-light-gray/30 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-dark-gray text-sm">
                  {rec.dataType}
                </p>
                {showPricingDetails && (
                  <p className="text-xs text-medium-gray mt-1">
                    {rec.reasoning}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-medium-gray">Current</p>
                  <p className="text-sm font-medium text-dark-gray">
                    ${rec.currentPrice}
                  </p>
                </div>
                <div className="text-center px-3">
                  <ArrowUpRight
                    size={16}
                    className={`${
                      rec.priceChange > 0
                        ? "text-brand-green"
                        : rec.priceChange < 0
                        ? "text-brand-red"
                        : "text-medium-gray"
                    }`}
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs text-medium-gray">Recommended</p>
                  <p className="text-sm font-bold text-bright-purple">
                    ${rec.recommendedPrice}
                  </p>
                </div>
                {rec.priceChange > 0 && (
                  <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
                    +{rec.priceChange}%
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitor Benchmarks */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Competitor Benchmarks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-medium-gray border-b border-silk-gray">
                <th className="text-left pb-2">Provider</th>
                <th className="text-center pb-2">Quality Score</th>
                <th className="text-center pb-2">Avg Price</th>
                <th className="text-center pb-2">Market Share</th>
                <th className="text-center pb-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor, index) => (
                <motion.tr
                  key={competitor.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-silk-gray/50 ${
                    competitor.name.includes("Your Data")
                      ? "bg-bright-purple/5"
                      : ""
                  }`}
                >
                  <td className="py-3 text-sm">
                    <p className="font-medium text-dark-gray">
                      {competitor.name}
                    </p>
                    <p className="text-xs text-medium-gray">
                      {competitor.category}
                    </p>
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-medium text-dark-gray">
                        {competitor.qualityScore || competitor.dataQuality || 0}
                      </span>
                      <div className="w-16 bg-light-gray rounded-full h-2">
                        <div
                          className="bg-bright-purple h-2 rounded-full"
                          style={{ width: `${competitor.qualityScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center text-sm text-dark-gray">
                    ${competitor.avgPrice || competitor.avgCPM || 0}
                  </td>
                  <td className="py-3 text-center text-sm text-dark-gray">
                    {competitor.marketShare}%
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 text-xs ${
                        competitor.trend === "up"
                          ? "text-brand-green"
                          : competitor.trend === "down"
                          ? "text-brand-red"
                          : "text-medium-gray"
                      }`}
                    >
                      {competitor.trend === "up" ? (
                        <ArrowUpRight size={12} />
                      ) : competitor.trend === "down" ? (
                        <ArrowDownRight size={12} />
                      ) : (
                        "→"
                      )}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integration Opportunities */}
      <div>
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Integration Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {integrations.map((opportunity, index) => (
            <motion.div
              key={opportunity.partner}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-silk-gray rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-dark-gray">
                    {opportunity.partner}
                  </p>
                  <p className="text-xs text-medium-gray mt-1">
                    {opportunity.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      opportunity.effort === "low"
                        ? "bg-brand-green/10 text-brand-green"
                        : opportunity.effort === "medium"
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "bg-brand-red/10 text-brand-red"
                    }`}
                  >
                    {opportunity.effort} effort
                  </span>
                </div>
              </div>
              <p className="text-xs text-medium-gray mb-3">
                {opportunity.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-medium-gray">Potential Revenue</p>
                  <p className="text-lg font-bold text-bright-purple">
                    ${opportunity.potentialRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-medium-gray">Compatibility</p>
                  <p className="text-sm font-medium text-dark-gray">
                    {opportunity.compatibility}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}