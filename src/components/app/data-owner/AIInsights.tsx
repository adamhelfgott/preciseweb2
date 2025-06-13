"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Lightbulb,
  Target,
  DollarSign,
  Users,
  Sparkles,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Insight {
  id: string;
  category: "revenue" | "quality" | "partnership" | "market";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  action: string;
  potentialValue?: number;
  effort: "low" | "medium" | "high";
  timeframe: string;
}

interface TrendAnalysis {
  trend: string;
  direction: "up" | "down" | "stable";
  impact: string;
  recommendation: string;
}

interface DataQualityTip {
  metric: string;
  currentScore: number;
  targetScore: number;
  improvement: string;
  impact: string;
}

const mockInsights: Insight[] = [
  {
    id: "1",
    category: "revenue",
    priority: "high",
    title: "Peak Performance Hours Underutilized",
    description: "Your data shows highest value during 6-9 PM but pricing doesn't reflect demand",
    impact: "Could increase revenue by 32% during peak hours",
    action: "Implement dynamic pricing for evening workout data",
    potentialValue: 15600,
    effort: "low",
    timeframe: "1 week",
  },
  {
    id: "2",
    category: "quality",
    priority: "high",
    title: "Heart Rate Variability Data Gap",
    description: "HRV data is missing for 18% of workout sessions, reducing attribution accuracy",
    impact: "Improving data completeness could increase Shapley value by 0.08",
    action: "Update SDK to capture HRV data during all workout types",
    effort: "medium",
    timeframe: "2 weeks",
  },
  {
    id: "3",
    category: "partnership",
    priority: "medium",
    title: "Synergy Opportunity with Nutrition Apps",
    description: "Combining fitness data with nutrition tracking increases campaign performance by 45%",
    impact: "Access to 12 new high-value campaigns worth $28K/month",
    action: "Integrate with MyFitnessPal or Cronometer API",
    potentialValue: 28000,
    effort: "medium",
    timeframe: "3 weeks",
  },
  {
    id: "4",
    category: "market",
    priority: "medium",
    title: "Emerging Demand for Recovery Metrics",
    description: "Sleep quality and recovery data seeing 120% YoY growth in advertiser demand",
    impact: "Early entry could capture 15% market share in growing segment",
    action: "Add sleep tracking and recovery score calculations",
    potentialValue: 18500,
    effort: "high",
    timeframe: "1 month",
  },
  {
    id: "5",
    category: "revenue",
    priority: "low",
    title: "Geographic Data Premium",
    description: "Location-enriched workout data commands 25% premium in urban markets",
    impact: "Additional $4.2K monthly revenue from existing data",
    action: "Enable opt-in location tracking for workouts",
    potentialValue: 4200,
    effort: "low",
    timeframe: "1 week",
  },
];

const trendAnalyses: TrendAnalysis[] = [
  {
    trend: "Wearable Integration Demand",
    direction: "up",
    impact: "78% of advertisers prefer integrated wearable data",
    recommendation: "Prioritize Apple Watch and Garmin integrations",
  },
  {
    trend: "Privacy-First Analytics",
    direction: "up",
    impact: "Campaigns using differential privacy see 2.3x higher bids",
    recommendation: "Highlight privacy features in data asset descriptions",
  },
  {
    trend: "Real-Time Data Streaming",
    direction: "up",
    impact: "Live data feeds command 40% price premium",
    recommendation: "Implement WebSocket API for real-time access",
  },
  {
    trend: "Batch Processing",
    direction: "down",
    impact: "Daily batch uploads losing favor vs. streaming",
    recommendation: "Transition to continuous data updates",
  },
];

const dataQualityTips: DataQualityTip[] = [
  {
    metric: "Data Freshness",
    currentScore: 82,
    targetScore: 95,
    improvement: "Reduce update latency from 4 hours to 30 minutes",
    impact: "Increase campaign match rate by 23%",
  },
  {
    metric: "Schema Consistency",
    currentScore: 88,
    targetScore: 98,
    improvement: "Standardize timestamp formats across all events",
    impact: "Reduce integration errors by 90%",
  },
  {
    metric: "Attribute Coverage",
    currentScore: 76,
    targetScore: 90,
    improvement: "Add device type and OS version to all records",
    impact: "Enable premium targeting segments worth $12K/month",
  },
  {
    metric: "Identity Resolution",
    currentScore: 71,
    targetScore: 85,
    improvement: "Implement cross-device user matching",
    impact: "Improve attribution accuracy by 34%",
  },
];

export default function AIInsights() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const filteredInsights =
    selectedCategory === "all"
      ? mockInsights
      : mockInsights.filter((insight) => insight.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "revenue":
        return DollarSign;
      case "quality":
        return Target;
      case "partnership":
        return Users;
      case "market":
        return TrendingUp;
      default:
        return Lightbulb;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "revenue":
        return "text-brand-green bg-brand-green/10";
      case "quality":
        return "text-brand-blue bg-brand-blue/10";
      case "partnership":
        return "text-bright-purple bg-bright-purple/10";
      case "market":
        return "text-brand-orange bg-brand-orange/10";
      default:
        return "text-medium-gray bg-light-gray";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-brand-red/10 text-brand-red";
      case "medium":
        return "bg-brand-orange/10 text-brand-orange";
      case "low":
        return "bg-light-gray text-medium-gray";
      default:
        return "bg-light-gray text-medium-gray";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-bright-purple to-brand-blue rounded-xl flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">
              AI-Powered Insights
            </h2>
            <p className="text-sm text-medium-gray mt-1">
              Personalized recommendations to maximize your data value
            </p>
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-silk-gray rounded-lg focus:outline-none focus:border-bright-purple"
        >
          <option value="all">All Categories</option>
          <option value="revenue">Revenue Optimization</option>
          <option value="quality">Data Quality</option>
          <option value="partnership">Partnerships</option>
          <option value="market">Market Trends</option>
        </select>
      </div>

      {/* Top Insights */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Priority Actions
        </h3>
        <div className="space-y-3">
          {filteredInsights.map((insight, index) => {
            const Icon = getCategoryIcon(insight.category);
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-silk-gray rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() =>
                  setExpandedInsight(
                    expandedInsight === insight.id ? null : insight.id
                  )
                }
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getCategoryColor(
                      insight.category
                    )}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-dark-gray">
                          {insight.title}
                        </p>
                        <p className="text-sm text-medium-gray mt-1">
                          {insight.description}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                          insight.priority
                        )}`}
                      >
                        {insight.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-medium-gray">
                      <span className="flex items-center gap-1">
                        <Sparkles size={12} />
                        {insight.impact}
                      </span>
                      {insight.potentialValue && (
                        <span className="font-medium text-brand-green">
                          +${insight.potentialValue.toLocaleString()}/mo
                        </span>
                      )}
                    </div>
                    {expandedInsight === insight.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-silk-gray"
                      >
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-dark-gray mb-1">
                              Recommended Action
                            </p>
                            <p className="text-sm text-medium-gray">
                              {insight.action}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-medium-gray">Effort: </span>
                              <span
                                className={`font-medium ${
                                  insight.effort === "low"
                                    ? "text-brand-green"
                                    : insight.effort === "medium"
                                    ? "text-brand-orange"
                                    : "text-brand-red"
                                }`}
                              >
                                {insight.effort}
                              </span>
                            </div>
                            <div>
                              <span className="text-medium-gray">
                                Timeframe:{" "}
                              </span>
                              <span className="font-medium text-dark-gray">
                                {insight.timeframe}
                              </span>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-white rounded-lg hover:bg-bright-purple/90 transition-colors text-sm">
                            <span>Get Started</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Market Trends */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Market Trends Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trendAnalyses.map((trend, index) => (
            <motion.div
              key={trend.trend}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-light-gray/30 rounded-lg p-3"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-dark-gray text-sm">
                  {trend.trend}
                </p>
                <span
                  className={`text-xs ${
                    trend.direction === "up"
                      ? "text-brand-green"
                      : trend.direction === "down"
                      ? "text-brand-red"
                      : "text-medium-gray"
                  }`}
                >
                  {trend.direction === "up"
                    ? "↑"
                    : trend.direction === "down"
                    ? "↓"
                    : "→"}
                </span>
              </div>
              <p className="text-xs text-medium-gray mb-2">{trend.impact}</p>
              <p className="text-xs text-bright-purple font-medium">
                {trend.recommendation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Quality Improvements */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-dark-gray mb-3">
          Data Quality Optimization
        </h3>
        <div className="space-y-3">
          {dataQualityTips.map((tip, index) => (
            <motion.div
              key={tip.metric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-light-gray/30 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-dark-gray text-sm">
                    {tip.metric}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-medium-gray">
                      {tip.currentScore}
                    </span>
                    <ChevronRight size={14} className="text-medium-gray" />
                    <span className="text-sm font-medium text-brand-green">
                      {tip.targetScore}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-medium-gray mb-1">
                  {tip.improvement}
                </p>
                <p className="text-xs text-bright-purple">{tip.impact}</p>
              </div>
              <div className="ml-4">
                <div className="w-12 h-12 relative">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-light-gray"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${
                        (tip.currentScore / 100) * 126
                      } 126`}
                      className="text-bright-purple"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-dark-gray">
                    {tip.currentScore}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gradient-to-r from-bright-purple/10 to-brand-blue/10 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-dark-gray">
              Total Optimization Potential
            </p>
            <p className="text-2xl font-bold text-bright-purple mt-1">
              +$84,300/month
            </p>
            <p className="text-xs text-medium-gray mt-1">
              Based on implementing top 5 recommendations
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-bright-purple text-bright-purple rounded-lg hover:bg-bright-purple hover:text-white transition-colors">
            <span className="text-sm">View Full Report</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}