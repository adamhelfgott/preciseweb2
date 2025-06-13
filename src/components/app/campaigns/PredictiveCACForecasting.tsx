"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, TrendingDown, TrendingUp, AlertCircle, Zap, Calendar, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area } from "recharts";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";

interface Prediction {
  week: string;
  predicted: number;
  confidence: { min: number; max: number };
  trend: "improving" | "stable" | "declining";
  factors: string[];
}

interface CampaignPrediction {
  campaignId: string;
  campaignName: string;
  currentCAC: number;
  targetCAC: number;
  predictions: Prediction[];
  recommendations: string[];
  riskLevel: "low" | "medium" | "high";
  modelAccuracy?: number;
}

const MOCK_PREDICTIONS: CampaignPrediction[] = [
  {
    campaignId: "1",
    campaignName: "Nike Summer Fitness 2025",
    currentCAC: 31.20,
    targetCAC: 28.00,
    predictions: [
      {
        week: "Week 1",
        predicted: 29.80,
        confidence: { min: 28.50, max: 31.10 },
        trend: "improving",
        factors: ["Creative refresh scheduled", "Audience expansion"]
      },
      {
        week: "Week 2",
        predicted: 28.40,
        confidence: { min: 26.80, max: 30.00 },
        trend: "improving",
        factors: ["DSP optimization kicking in", "Seasonal boost"]
      },
      {
        week: "Week 3",
        predicted: 27.90,
        confidence: { min: 25.50, max: 30.30 },
        trend: "stable",
        factors: ["Audience saturation risk", "Competitor activity"]
      },
      {
        week: "Week 4",
        predicted: 28.20,
        confidence: { min: 25.00, max: 31.40 },
        trend: "declining",
        factors: ["Creative fatigue expected", "Market saturation"]
      }
    ],
    recommendations: [
      "Schedule creative refresh for Week 3",
      "Expand to lookalike audiences in Week 2",
      "Increase MadHive budget allocation by 15%"
    ],
    riskLevel: "medium"
  },
  {
    campaignId: "2",
    campaignName: "Adidas Morning Warriors",
    currentCAC: 42.80,
    targetCAC: 35.00,
    predictions: [
      {
        week: "Week 1",
        predicted: 40.20,
        confidence: { min: 38.00, max: 42.40 },
        trend: "improving",
        factors: ["New data segments activating", "Budget reallocation"]
      },
      {
        week: "Week 2",
        predicted: 37.80,
        confidence: { min: 35.20, max: 40.40 },
        trend: "improving",
        factors: ["Algorithm learning phase complete", "Better targeting"]
      },
      {
        week: "Week 3",
        predicted: 35.50,
        confidence: { min: 32.00, max: 39.00 },
        trend: "improving",
        factors: ["Premium inventory access", "Optimized bidding"]
      },
      {
        week: "Week 4",
        predicted: 34.90,
        confidence: { min: 31.00, max: 38.80 },
        trend: "stable",
        factors: ["Reached optimization plateau", "Stable performance"]
      }
    ],
    recommendations: [
      "Maintain current strategy - on track to hit target",
      "Consider testing new creative variants in Week 4",
      "Lock in current DSP allocations"
    ],
    riskLevel: "low"
  }
];

interface PredictiveCACForecastingProps {
  campaignId?: string;
}

export default function PredictiveCACForecasting({ campaignId }: PredictiveCACForecastingProps) {
  const { user } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignPrediction | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get campaigns
  const campaigns = useQuery(api.campaigns.getCampaigns,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Use provided campaign or first campaign
  const isValidConvexId = campaignId?.startsWith('j');
  const targetCampaignId = (campaignId && isValidConvexId) ? campaignId : campaigns?.[0]?._id;

  // Get the campaign details
  const campaign = campaigns?.find((c: any) => c._id === targetCampaignId);

  // Fetch CAC predictions from Convex
  const cacPredictions = useQuery(api.attribution.getCACPredictions,
    targetCampaignId ? { campaignId: targetCampaignId as any } : "skip"
  );

  // Mutation for simulating predictions
  const simulatePredictions = useMutation(api.attribution.simulateCACPredictions);

  // Build campaign prediction from Convex data
  const convexPrediction: CampaignPrediction | null = cacPredictions && campaign ? {
    campaignId: campaign._id,
    campaignName: campaign.name,
    currentCAC: cacPredictions.currentCAC,
    targetCAC: campaign.targetCAC || 28.00,
    predictions: cacPredictions.predictions.map((p: any) => ({
      week: `Week ${p.week}`,
      predicted: p.predictedCAC,
      confidence: { min: p.confidenceLow, max: p.confidenceHigh },
      trend: p.predictedCAC < cacPredictions.currentCAC ? "improving" : 
             p.predictedCAC === cacPredictions.currentCAC ? "stable" : "declining",
      factors: p.factors.filter((f: any) => f.direction === "positive").map((f: any) => f.name).slice(0, 2),
    })),
    recommendations: [
      cacPredictions.predictions[0]?.factors.find((f: any) => f.direction === "negative")?.name 
        ? `Address ${cacPredictions.predictions[0].factors.find((f: any) => f.direction === "negative").name}`
        : "Maintain current optimization strategy",
      "Monitor creative performance closely",
      "Consider audience expansion if CAC improves"
    ],
    riskLevel: cacPredictions.modelAccuracy > 90 ? "low" : cacPredictions.modelAccuracy > 80 ? "medium" : "high",
    modelAccuracy: cacPredictions.modelAccuracy,
  } : null;

  // Use Convex data or fall back to mock
  useEffect(() => {
    if (convexPrediction) {
      setSelectedCampaign(convexPrediction);
    } else if (!selectedCampaign && MOCK_PREDICTIONS.length > 0) {
      setSelectedCampaign(MOCK_PREDICTIONS[0]);
    }
  }, [convexPrediction, selectedCampaign]);

  // Simulate predictions
  useEffect(() => {
    if (!convexUser?._id || !targetCampaignId || !simulationActive) return;

    // Simulate immediately on activation
    const simulate = async () => {
      try {
        await simulatePredictions({ 
          campaignId: targetCampaignId as any,
          buyerId: convexUser._id 
        });
      } catch (error) {
        console.error("Failed to simulate predictions:", error);
      }
    };
    
    simulate(); // Run immediately
    
    const interval = setInterval(simulate, 30000); // Then every 30 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, targetCampaignId, simulationActive, simulatePredictions]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-brand-green bg-brand-green/10";
      case "medium": return "text-vibrant-orange bg-vibrant-orange/10";
      case "high": return "text-warm-coral bg-warm-coral/10";
      default: return "text-medium-gray bg-light-gray";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingDown className="w-4 h-4 text-brand-green" />;
      case "declining": return <TrendingUp className="w-4 h-4 text-warm-coral" />;
      default: return <span className="w-4 h-4 inline-block bg-electric-blue rounded-full" />;
    }
  };

  const chartData = selectedCampaign?.predictions.map((pred, index) => ({
    week: pred.week,
    current: index === 0 ? selectedCampaign.currentCAC : null,
    predicted: pred.predicted,
    min: pred.confidence.min,
    max: pred.confidence.max,
    target: selectedCampaign.targetCAC,
  })) || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-electric-blue/10 rounded-lg">
            <Brain className="w-5 h-5 text-electric-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Predictive CAC Forecasting</h2>
            <p className="text-sm text-medium-gray">AI-powered 4-week predictions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Simulation Toggle */}
          {convexUser && (
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                simulationActive 
                  ? "bg-electric-blue text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {simulationActive ? "Simulation On" : "Simulation Off"}
            </button>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-electric-blue hover:text-blue-700 font-medium"
          >
            {showDetails ? "Hide" : "Show"} Analysis
          </button>
        </div>
      </div>

      {/* Campaign Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {MOCK_PREDICTIONS.map((campaign) => (
          <button
            key={campaign.campaignId}
            onClick={() => setSelectedCampaign(campaign)}
            className={`p-4 rounded-lg border transition-all text-left ${
              selectedCampaign?.campaignId === campaign.campaignId
                ? "border-electric-blue bg-electric-blue/5"
                : "border-silk-gray hover:border-medium-gray"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-dark-gray">{campaign.campaignName}</h3>
                <p className="text-sm text-medium-gray">
                  Current: ${campaign.currentCAC} → Target: ${campaign.targetCAC}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(campaign.riskLevel)}`}>
                {campaign.riskLevel} risk
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {getTrendIcon(campaign.predictions[0].trend)}
              <span className="text-medium-gray">
                Week 1: ${campaign.predictions[0].predicted} 
                ({campaign.predictions[0].trend})
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Prediction Chart */}
      {selectedCampaign && (
      <div className="bg-light-gray rounded-lg p-4 mb-6">
        <h3 className="font-medium text-dark-gray mb-4">4-Week CAC Forecast</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1E90FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis dataKey="week" stroke="#86868B" />
              <YAxis stroke="#86868B" tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value: any) => `$${value?.toFixed(2)}`} />
              
              {/* Confidence Interval */}
              <Area
                type="monotone"
                dataKey="max"
                fill="url(#confidenceGradient)"
                stroke="none"
                name="Confidence Max"
              />
              <Area
                type="monotone"
                dataKey="min"
                fill="white"
                stroke="none"
                name="Confidence Min"
              />
              
              {/* Target Line */}
              <ReferenceLine 
                y={selectedCampaign?.targetCAC} 
                stroke="#1DB954" 
                strokeDasharray="5 5"
                label={{ value: "Target CAC", position: "right" }}
              />
              
              {/* Current CAC Point */}
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#FF6B6B" 
                strokeWidth={0}
                dot={{ fill: "#FF6B6B", r: 6 }}
                name="Current CAC"
              />
              
              {/* Predicted Line */}
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#1E90FF" 
                strokeWidth={3}
                dot={{ fill: "#1E90FF", r: 4 }}
                name="Predicted CAC"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}

      {/* Weekly Predictions */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-dark-gray">Weekly Breakdown</h3>
        {selectedCampaign?.predictions.map((prediction, index) => (
          <motion.div
            key={prediction.week}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-light-gray rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getTrendIcon(prediction.trend)}
                <span className="font-medium text-dark-gray">{prediction.week}</span>
              </div>
              <span className="text-lg font-semibold text-dark-gray">
                ${prediction.predicted}
              </span>
              <span className="text-sm text-medium-gray">
                (${prediction.confidence.min} - ${prediction.confidence.max})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {prediction.factors.slice(0, 2).map((factor, i) => (
                <span key={i} className="text-xs bg-white px-2 py-1 rounded text-medium-gray">
                  {factor}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-electric-blue/10 to-brand-green/10 rounded-lg p-4">
        <div className="flex items-start gap-3 mb-3">
          <Zap className="w-5 h-5 text-electric-blue flex-shrink-0" />
          <div>
            <h3 className="font-medium text-dark-gray mb-2">AI Recommendations</h3>
            <ul className="space-y-2">
              {selectedCampaign?.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-medium-gray">
                  <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="w-full mt-4 bg-electric-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          Apply AI Optimizations
        </button>
      </div>

      {/* Detailed Analysis */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-silk-gray"
        >
          <h4 className="font-medium text-dark-gray mb-3">Prediction Methodology</h4>
          <div className="space-y-2 text-sm text-medium-gray">
            <p>• Historical CAC patterns from past 90 days</p>
            <p>• Creative performance decay modeling</p>
            <p>• Audience saturation predictions</p>
            <p>• Competitive landscape analysis</p>
            <p>• Seasonal trend adjustments</p>
            <p>• DSP-specific optimization curves</p>
          </div>
          {selectedCampaign?.modelAccuracy && (
            <div className="mt-3 p-3 bg-electric-blue/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-dark-gray">Model Accuracy</span>
                <span className="text-sm font-bold text-electric-blue">{selectedCampaign.modelAccuracy}%</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}