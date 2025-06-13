"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { Database, TrendingUp, AlertCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataAsset {
  id: string;
  name: string;
  type: string;
  qualityScore: number;
  recordCount: number;
  updateFrequency: number;
  revenuePerK: number;
  industryAvgPerK: number;
  usageRate: number;
  monthlyRevenue: number;
  status: "active" | "paused" | "pending";
  recommendations?: {
    id: string;
    icon: string;
    text: string;
    value: string;
  }[];
}

const mockAssets: DataAsset[] = [
  {
    id: "1",
    name: "Fitness Activity Events",
    type: "behavioral",
    qualityScore: 94,
    recordCount: 2300000,
    updateFrequency: 24,
    revenuePerK: 12.5,
    industryAvgPerK: 8.3,
    usageRate: 78,
    monthlyRevenue: 23400,
    status: "active",
    recommendations: [
      {
        id: "add-sleep",
        icon: "💤",
        text: "Add sleep data for +$18.4K/mo",
        value: "high",
      },
      {
        id: "increase-freshness",
        icon: "⚡",
        text: "Update every 6hr for +18% quality",
        value: "quick",
      },
    ],
  },
  {
    id: "2",
    name: "User Demographics",
    type: "demographic",
    qualityScore: 88,
    recordCount: 1500000,
    updateFrequency: 168,
    revenuePerK: 6.2,
    industryAvgPerK: 7.1,
    usageRate: 45,
    monthlyRevenue: 11200,
    status: "active",
    recommendations: [
      {
        id: "add-income",
        icon: "💰",
        text: "Add income bands for premium CPMs",
        value: "medium",
      },
      {
        id: "verify-age",
        icon: "✓",
        text: "Age verification increases trust",
        value: "quick",
      },
    ],
  },
];

export default function DataAssetsOverview() {
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState<DataAsset | null>(null);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Fetch data assets from Convex
  const dataAssets = useQuery(api.dataAssets.getDataAssets,
    convexUser?._id ? { ownerId: convexUser._id } : "skip"
  );

  // Get recommendations from Convex
  const recommendations = useQuery(api.recommendations.getRecommendations,
    convexUser?._id ? { userId: convexUser._id, type: "data_optimization" } : "skip"
  );

  // Use Convex data if available, otherwise fall back to mock data
  const assets = dataAssets || mockAssets;

  // Map recommendations to assets
  const assetsWithRecommendations = assets.map((asset: any) => {
    const assetRecs = recommendations?.filter((rec: any) => 
      rec.description?.includes(asset.name) || rec.title?.includes("data")
    ).slice(0, 2).map((rec: any) => ({
      id: rec._id,
      icon: rec.priority === "high" ? "💰" : rec.priority === "medium" ? "⚡" : "✓",
      text: rec.title,
      value: rec.priority,
    })) || [];

    return {
      ...asset,
      recommendations: assetRecs.length > 0 ? assetRecs : asset.recommendations,
    };
  });

  const getQualityColor = (score: number) => {
    if (score >= 90) return "text-brand-green";
    if (score >= 80) return "text-electric-blue";
    if (score >= 70) return "text-warm-coral";
    return "text-medium-gray";
  };

  const getQualityBg = (score: number) => {
    if (score >= 90) return "bg-brand-green/10";
    if (score >= 80) return "bg-electric-blue/10";
    if (score >= 70) return "bg-warm-coral/10";
    return "bg-light-gray";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark-gray">Your Data Assets</h2>
        <button className="btn-primary text-sm">
          <Database size={16} />
          Add New Asset
        </button>
      </div>

      {/* Loading state */}
      {!user || !convexUser ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-2"></div>
            <p className="text-sm text-medium-gray">Loading assets...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {assetsWithRecommendations.map((asset: any, index: number) => (
          <motion.div
            key={asset._id || asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedAsset(asset)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-dark-gray mb-1">
                  {asset.name}
                </h3>
                <p className="text-sm text-medium-gray">
                  {(asset.recordCount / 1000000).toFixed(1)}M records • Updates every {asset.updateFrequency}h
                </p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                getQualityBg(asset.qualityScore),
                getQualityColor(asset.qualityScore)
              )}>
                {asset.qualityScore} Quality
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-medium-gray mb-1">Revenue/1K</p>
                <p className="text-lg font-semibold text-dark-gray">
                  ${asset.revenuePerK}
                </p>
                <p className="text-xs text-medium-gray">
                  Industry avg: ${asset.industryAvgPerK}
                  {asset.revenuePerK > asset.industryAvgPerK ? (
                    <span className="text-brand-green ml-1">↑</span>
                  ) : (
                    <span className="text-warm-coral ml-1">↓</span>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-medium-gray mb-1">Usage Rate</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-light-gray rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-green rounded-full"
                      style={{ width: `${asset.usageRate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-dark-gray">
                    {asset.usageRate}%
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-medium-gray mb-1">Monthly Revenue</p>
                <p className="text-lg font-semibold text-brand-green">
                  ${asset.monthlyRevenue.toLocaleString()}
                </p>
              </div>
            </div>

            {asset.recommendations && asset.recommendations.length > 0 && (
              <div className="border-t border-silk-gray pt-4">
                <p className="text-sm font-medium text-dark-gray mb-2 flex items-center gap-2">
                  <Zap size={16} className="text-brand-green" />
                  Optimization Opportunities
                </p>
                <div className="space-y-2">
                  {asset.recommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="text-lg">{rec.icon}</span>
                      <span className="text-medium-gray">{rec.text}</span>
                      {rec.value === "high" && (
                        <span className="ml-auto text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
                          High Value
                        </span>
                      )}
                      {rec.value === "quick" && (
                        <span className="ml-auto text-xs bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full">
                          Quick Win
                        </span>
                      )}
                    </div>
                  ))}
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