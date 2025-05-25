"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Activity,
  Zap
} from "lucide-react";

interface HealthMetric {
  name: string;
  score: number;
  trend: "up" | "down" | "stable";
  status: "healthy" | "warning" | "critical";
}

interface Campaign {
  id: string;
  name: string;
  brand: string;
  overallHealth: number;
  metrics: HealthMetric[];
  alerts: string[];
  recommendations: string[];
}

const CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Just Do It 2025",
    brand: "Nike",
    overallHealth: 92,
    metrics: [
      { name: "CTR Performance", score: 95, trend: "up", status: "healthy" },
      { name: "Budget Pacing", score: 88, trend: "stable", status: "healthy" },
      { name: "Creative Freshness", score: 91, trend: "up", status: "healthy" },
      { name: "Audience Reach", score: 94, trend: "up", status: "healthy" }
    ],
    alerts: [],
    recommendations: [
      "Consider increasing budget by 20% to capture high performance",
      "Test new creative variants while current ones are performing well"
    ]
  },
  {
    id: "2",
    name: "Model S Reveal",
    brand: "Tesla",
    overallHealth: 68,
    metrics: [
      { name: "CTR Performance", score: 45, trend: "down", status: "critical" },
      { name: "Budget Pacing", score: 72, trend: "stable", status: "warning" },
      { name: "Creative Freshness", score: 38, trend: "down", status: "critical" },
      { name: "Audience Reach", score: 85, trend: "stable", status: "healthy" }
    ],
    alerts: [
      "Creative fatigue detected - CTR dropped 32% in last 7 days",
      "Underdelivering by 23% - consider bid adjustments"
    ],
    recommendations: [
      "Urgent: Refresh creative assets immediately",
      "Expand audience targeting to Tech Professionals segment",
      "Increase bids on high-performing placements"
    ]
  },
  {
    id: "3",
    name: "Magic Happens",
    brand: "Disney+",
    overallHealth: 84,
    metrics: [
      { name: "CTR Performance", score: 82, trend: "stable", status: "healthy" },
      { name: "Budget Pacing", score: 90, trend: "up", status: "healthy" },
      { name: "Creative Freshness", score: 78, trend: "stable", status: "warning" },
      { name: "Audience Reach", score: 88, trend: "up", status: "healthy" }
    ],
    alerts: [
      "Creative approaching fatigue threshold - monitor closely"
    ],
    recommendations: [
      "Prepare new creative variants for next week",
      "Consider dayparting optimization for family viewing hours"
    ]
  }
];

const getHealthColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getHealthBg = (score: number): string => {
  if (score >= 80) return "bg-green-50";
  if (score >= 60) return "bg-yellow-50";
  return "bg-red-50";
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "healthy": return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    case "critical": return <XCircle className="w-4 h-4 text-red-600" />;
    default: return null;
  }
};

export default function CampaignHealthMonitor() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-dark-gray flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-orange" />
            Campaign Health Monitor
          </h3>
          <p className="text-sm text-medium-gray mt-1">
            Real-time health scores powered by Precise AI
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-medium-gray">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-medium-gray">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-medium-gray">Critical</span>
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CAMPAIGNS.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-light-gray hover:shadow-lg transition-all duration-300"
          >
            {/* Campaign Header */}
            <div className="p-6 border-b border-light-gray">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-medium-gray mb-1">{campaign.brand}</p>
                  <h4 className="font-semibold text-dark-gray">{campaign.name}</h4>
                </div>
                <div className={`${getHealthBg(campaign.overallHealth)} px-3 py-1 rounded-full`}>
                  <span className={`text-sm font-bold ${getHealthColor(campaign.overallHealth)}`}>
                    {campaign.overallHealth}%
                  </span>
                </div>
              </div>

              {/* Health Bar */}
              <div className="relative h-3 bg-light-gray rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.overallHealth}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    campaign.overallHealth >= 80 ? 'bg-green-500' :
                    campaign.overallHealth >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="p-6 space-y-3">
              {campaign.metrics.map((metric) => (
                <div key={metric.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metric.status)}
                    <span className="text-sm text-dark-gray">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getHealthColor(metric.score)}`}>
                      {metric.score}%
                    </span>
                    {metric.trend === "up" && <TrendingUp className="w-3 h-3 text-green-600" />}
                    {metric.trend === "down" && <TrendingDown className="w-3 h-3 text-red-600" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            {campaign.alerts.length > 0 && (
              <div className="px-6 pb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      {campaign.alerts.map((alert, i) => (
                        <p key={i} className="text-xs text-red-800">{alert}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {campaign.recommendations.length > 0 && (
              <div className="px-6 pb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-blue-900 mb-1">AI Recommendations:</p>
                      {campaign.recommendations.map((rec, i) => (
                        <p key={i} className="text-xs text-blue-800">• {rec}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}