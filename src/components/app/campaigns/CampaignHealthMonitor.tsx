"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";

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

const MOCK_CAMPAIGNS: Campaign[] = [
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

interface CampaignHealthMonitorProps {
  campaignId?: string;
}

export default function CampaignHealthMonitor({ campaignId }: CampaignHealthMonitorProps) {
  const { user } = useAuth();
  const [simulationActive, setSimulationActive] = useState(false);
  
  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Fetch campaigns from Convex
  const convexCampaigns = useQuery(api.campaigns.getCampaigns,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Mutation for simulating DSP performance
  const simulateDSP = useMutation(api.dspPerformance.simulateDSPPerformance);

  // Get health data for the specified campaign or first campaign
  const targetCampaignId = campaignId || convexCampaigns?.[0]?._id;
  const campaignHealth = useQuery(api.creatives.getCampaignHealth,
    targetCampaignId ? { campaignId: targetCampaignId } : "skip"
  );

  // Filter campaigns based on campaignId prop
  const filteredCampaigns = campaignId 
    ? convexCampaigns?.filter((c: any) => c._id === campaignId) || []
    : convexCampaigns || [];

  // Build campaign health data from Convex or use mock data
  const campaigns: Campaign[] = filteredCampaigns?.length ? filteredCampaigns.map((campaign: any, index: number) => {
    // Use the campaign health data if it matches the current campaign
    const health = campaign._id === targetCampaignId ? campaignHealth : null;

    if (!health) {
      // Return mock data variant for this campaign
      return {
        ...MOCK_CAMPAIGNS[index % MOCK_CAMPAIGNS.length],
        id: campaign._id,
        name: campaign.name,
        brand: campaign.name.split(' ')[0],
      };
    }

    // Calculate metric scores from health data
    const ctrScore = Math.max(0, Math.min(100, 80 + health.metrics.ctrTrend * 2));
    const budgetScore = Math.max(0, Math.min(100, health.metrics.budgetUtilization));
    const freshnessScore = Math.max(0, Math.min(100, health.metrics.creativeFreshness));
    const roasScore = Math.max(0, Math.min(100, 80 + health.metrics.roasTrend));

    const metrics: HealthMetric[] = [
      { 
        name: "CTR Performance", 
        score: ctrScore, 
        trend: health.metrics.ctrTrend > 0 ? "up" : health.metrics.ctrTrend < 0 ? "down" : "stable",
        status: ctrScore >= 80 ? "healthy" : ctrScore >= 60 ? "warning" : "critical"
      },
      { 
        name: "Budget Pacing", 
        score: budgetScore,
        trend: "stable",
        status: budgetScore >= 80 ? "healthy" : budgetScore >= 60 ? "warning" : "critical"
      },
      { 
        name: "Creative Freshness", 
        score: freshnessScore,
        trend: health.metrics.creativeFreshness > 70 ? "up" : "down",
        status: freshnessScore >= 80 ? "healthy" : freshnessScore >= 60 ? "warning" : "critical"
      },
      { 
        name: "ROAS Performance", 
        score: roasScore,
        trend: health.metrics.roasTrend > 0 ? "up" : health.metrics.roasTrend < 0 ? "down" : "stable",
        status: roasScore >= 80 ? "healthy" : roasScore >= 60 ? "warning" : "critical"
      }
    ];

    const alerts = health.alerts.map((a: any) => a.message);
    
    // Generate recommendations based on metrics
    const recommendations = [];
    if (ctrScore < 70) recommendations.push("Refresh creative assets to improve CTR");
    if (budgetScore < 70) recommendations.push("Adjust bid strategy to improve pacing");
    if (freshnessScore < 70) recommendations.push("Upload new creative variants");
    if (roasScore > 85) recommendations.push("Consider scaling budget to capture opportunity");

    return {
      id: campaign._id,
      name: campaign.name,
      brand: campaign.name.split(' ')[0], // Extract brand from campaign name
      overallHealth: Math.round(health.healthScore),
      metrics,
      alerts,
      recommendations
    };
  }) : MOCK_CAMPAIGNS;

  // Simulate performance updates
  useEffect(() => {
    if (!convexUser?._id || !simulationActive || !convexCampaigns?.length) return;

    const interval = setInterval(async () => {
      try {
        // Simulate for first campaign
        if (convexCampaigns[0]?._id) {
          await simulateDSP({ campaignId: convexCampaigns[0]._id });
        }
      } catch (error) {
        console.error("Failed to simulate DSP performance:", error);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive, convexCampaigns]); // Removed simulateDSP - mutations are stable

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
        <div className="flex items-center gap-4">
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
              {simulationActive ? "Simulation On" : "Simulation Off"}
            </button>
          )}
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
      </div>

      {/* Loading State */}
      {!user || !convexUser ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
            <p className="text-medium-gray">Loading campaign health data...</p>
          </div>
        </div>
      ) : (
      /* Campaign Cards */
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
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
                    {campaign.overallHealth.toFixed(0)}%
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
                      {metric.score.toFixed(0)}%
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
      )}
    </div>
  );
}