"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, RefreshCw, Shield, Zap, Clock } from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HealthMetric {
  name: string;
  score: number;
  status: "excellent" | "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  impact: string;
}

interface DataAsset {
  id: string;
  name: string;
  overallScore: number;
  lastUpdated: string;
  recordCount: number;
  fillRate: number;
  metrics: HealthMetric[];
  recommendations: string[];
  scoreHistory: Array<{ date: string; score: number }>;
}

const MOCK_ASSETS: DataAsset[] = [
  {
    id: "1",
    name: "Fitness Activity Events",
    overallScore: 92,
    lastUpdated: "2 hours ago",
    recordCount: 2345000,
    fillRate: 98.5,
    metrics: [
      {
        name: "Data Freshness",
        score: 95,
        status: "excellent",
        trend: "stable",
        impact: "Real-time updates maintaining high value"
      },
      {
        name: "Completeness",
        score: 98,
        status: "excellent",
        trend: "up",
        impact: "98.5% fill rate across all required fields"
      },
      {
        name: "Accuracy",
        score: 88,
        status: "good",
        trend: "up",
        impact: "Minor discrepancies in 12% of records"
      },
      {
        name: "Consistency",
        score: 90,
        status: "excellent",
        trend: "stable",
        impact: "Standardized format across all events"
      },
      {
        name: "Uniqueness",
        score: 92,
        status: "excellent",
        trend: "stable",
        impact: "Low duplicate rate (0.8%)"
      }
    ],
    recommendations: [
      "Address timestamp formatting inconsistencies in 12% of events",
      "Consider adding heart rate data to increase value by 25%",
      "Enable real-time validation to maintain quality"
    ],
    scoreHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      score: 85 + Math.random() * 10 + (i / 30) * 5
    }))
  },
  {
    id: "2",
    name: "User Demographics",
    overallScore: 78,
    lastUpdated: "5 days ago",
    recordCount: 892000,
    fillRate: 85.2,
    metrics: [
      {
        name: "Data Freshness",
        score: 65,
        status: "warning",
        trend: "down",
        impact: "5 days since last update - buyers prefer < 24h"
      },
      {
        name: "Completeness",
        score: 85,
        status: "good",
        trend: "stable",
        impact: "Missing age data for 15% of users"
      },
      {
        name: "Accuracy",
        score: 92,
        status: "excellent",
        trend: "up",
        impact: "Verified data with high confidence"
      },
      {
        name: "Consistency",
        score: 75,
        status: "warning",
        trend: "down",
        impact: "Mixed formats in location data"
      },
      {
        name: "Uniqueness",
        score: 73,
        status: "warning",
        trend: "stable",
        impact: "27% duplicate entries detected"
      }
    ],
    recommendations: [
      "URGENT: Update data to improve freshness score",
      "Deduplicate records to increase uniqueness by 27%",
      "Standardize location format (ZIP vs City/State)",
      "Fill missing age demographics using ML predictions"
    ],
    scoreHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      score: 82 - (i > 25 ? (i - 25) * 2 : 0) + Math.random() * 5
    }))
  },
  {
    id: "3",
    name: "Location Context",
    overallScore: 85,
    lastUpdated: "12 hours ago",
    recordCount: 567000,
    fillRate: 92.3,
    metrics: [
      {
        name: "Data Freshness",
        score: 88,
        status: "good",
        trend: "stable",
        impact: "Updated twice daily"
      },
      {
        name: "Completeness",
        score: 92,
        status: "excellent",
        trend: "up",
        impact: "High coverage across metro areas"
      },
      {
        name: "Accuracy",
        score: 82,
        status: "good",
        trend: "stable",
        impact: "GPS accuracy within 50m"
      },
      {
        name: "Consistency",
        score: 85,
        status: "good",
        trend: "up",
        impact: "Standardized coordinate system"
      },
      {
        name: "Uniqueness",
        score: 78,
        status: "good",
        trend: "stable",
        impact: "Some overlapping location events"
      }
    ],
    recommendations: [
      "Increase update frequency to real-time for 20% value boost",
      "Add venue categorization for richer context",
      "Implement privacy-preserving aggregation for sensitive locations"
    ],
    scoreHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      score: 80 + Math.sin(i / 5) * 5 + (i / 30) * 5
    }))
  }
];

export default function DataAssetHealthScore() {
  const [selectedAsset, setSelectedAsset] = useState<DataAsset>(MOCK_ASSETS[0]);
  const [showDetails, setShowDetails] = useState(true);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#1DB954";
    if (score >= 80) return "#1E90FF";
    if (score >= 70) return "#FFA500";
    return "#FF6B6B";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="w-4 h-4 text-brand-green" />;
      case "good": return <CheckCircle className="w-4 h-4 text-electric-blue" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-vibrant-orange" />;
      case "critical": return <AlertTriangle className="w-4 h-4 text-warm-coral" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-brand-green" />;
      case "down": return <TrendingDown className="w-3 h-3 text-warm-coral" />;
      default: return <span className="w-3 h-3 inline-block bg-medium-gray rounded-full" />;
    }
  };

  const radialData = [{
    name: selectedAsset.name,
    score: selectedAsset.overallScore,
    fill: getScoreColor(selectedAsset.overallScore)
  }];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-green/10 rounded-lg">
            <Activity className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Data Asset Health Score</h2>
            <p className="text-sm text-medium-gray">Monitor and improve your data quality</p>
          </div>
        </div>
        <button className="text-sm text-electric-blue hover:text-blue-700 font-medium flex items-center gap-1">
          <RefreshCw className="w-4 h-4" />
          Run Full Scan
        </button>
      </div>

      {/* Asset Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {MOCK_ASSETS.map((asset) => (
          <button
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className={`p-4 rounded-lg border transition-all text-left ${
              selectedAsset.id === asset.id
                ? "border-brand-green bg-brand-green/5"
                : "border-silk-gray hover:border-medium-gray"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-dark-gray">{asset.name}</h3>
                <p className="text-xs text-medium-gray mt-1">
                  {(asset.recordCount / 1000000).toFixed(1)}M records • {asset.fillRate}% complete
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: getScoreColor(asset.overallScore) }}>
                  {asset.overallScore}
                </p>
                <p className="text-xs text-medium-gray">score</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-medium-gray">Updated {asset.lastUpdated}</span>
              {asset.overallScore < 80 && (
                <span className="text-warm-coral font-medium">Needs attention</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Score */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="font-medium text-dark-gray mb-4 text-center">Overall Health Score</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData}>
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  dataKey="score"
                  cornerRadius={10}
                  fill={getScoreColor(selectedAsset.overallScore)}
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-dark-gray">
                  <tspan x="50%" className="text-4xl font-bold">{selectedAsset.overallScore}</tspan>
                  <tspan x="50%" dy="1.5em" className="text-sm">out of 100</tspan>
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-medium-gray">
              {selectedAsset.overallScore >= 90 ? "Premium Quality" : 
               selectedAsset.overallScore >= 80 ? "High Quality" :
               selectedAsset.overallScore >= 70 ? "Good Quality" : "Needs Improvement"}
            </span>
          </div>
        </div>

        {/* Metrics Breakdown */}
        <div className="lg:col-span-2 bg-light-gray rounded-lg p-6">
          <h3 className="font-medium text-dark-gray mb-4">Quality Metrics</h3>
          <div className="space-y-3">
            {selectedAsset.metrics.map((metric) => (
              <div key={metric.name} className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metric.status)}
                    <span className="font-medium text-dark-gray">{metric.name}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <span className="text-lg font-bold" style={{ color: getScoreColor(metric.score) }}>
                    {metric.score}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-medium-gray">{metric.impact}</p>
                  <div className="w-24 bg-light-gray rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${metric.score}%`,
                        backgroundColor: getScoreColor(metric.score)
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score History */}
      <div className="bg-light-gray rounded-lg p-6 mb-6">
        <h3 className="font-medium text-dark-gray mb-4">30-Day Score Trend</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedAsset.scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis dataKey="date" stroke="#86868B" hide />
              <YAxis domain={[60, 100]} stroke="#86868B" />
              <Tooltip formatter={(value: any) => value.toFixed(0)} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke={getScoreColor(selectedAsset.overallScore)}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <Zap className="w-5 h-5 text-brand-green flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-dark-gray mb-3">Improvement Recommendations</h3>
            <ul className="space-y-2">
              {selectedAsset.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-medium-gray">
                  <span className="text-brand-green">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="w-full bg-brand-green text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          Apply Auto-Improvements
        </button>
      </div>

      {/* Impact Analysis */}
      <div className="mt-6 p-4 bg-electric-blue/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-electric-blue" />
            <div>
              <p className="font-medium text-dark-gray">Revenue Impact</p>
              <p className="text-sm text-medium-gray">
                Improving to 90+ score could increase earnings by ~$3,200/month
              </p>
            </div>
          </div>
          <button className="text-sm text-electric-blue hover:text-blue-700 font-medium">
            View Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}