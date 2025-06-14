"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  Target,
  Database,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Sector } from "recharts";

interface CohortData {
  name: string;
  roas: number;
  impressions?: number;
  conversions?: number;
  trend?: "up" | "down" | "stable";
}

interface CampaignCohortData {
  campaignId: string;
  campaignName: string;
  cohorts: CohortData[];
  topPerformer: string;
  avgROAS: number;
}

// Mock data for different campaigns
const CAMPAIGN_COHORT_DATA: CampaignCohortData[] = [
  {
    campaignId: "1", // Ticket Sales 2025
    campaignName: "Ticket Sales 2025",
    cohorts: [
      { name: "Run Of Sports", roas: 14.6, impressions: 2450000, conversions: 3200, trend: "up" },
      { name: "Precise LookALikes (LaL)", roas: 34.7, impressions: 1820000, conversions: 5400, trend: "up" },
      { name: "Seed Data Only", roas: 40.8, impressions: 980000, conversions: 3900, trend: "stable" },
      { name: "Return Path Data", roas: 80.9, impressions: 560000, conversions: 4200, trend: "up" }
    ],
    topPerformer: "Return Path Data",
    avgROAS: 42.75
  },
  {
    campaignId: "2", // Nike Summer Fitness
    campaignName: "Nike Summer Fitness 2025",
    cohorts: [
      { name: "Fitness Enthusiasts", roas: 22.4, impressions: 3200000, conversions: 7100, trend: "up" },
      { name: "Health & Wellness LaL", roas: 18.9, impressions: 2100000, conversions: 3900, trend: "stable" },
      { name: "Premium Gym Members", roas: 45.2, impressions: 890000, conversions: 4000, trend: "up" },
      { name: "Athletic Apparel Buyers", roas: 38.6, impressions: 1500000, conversions: 5800, trend: "down" }
    ],
    topPerformer: "Premium Gym Members",
    avgROAS: 31.28
  },
  {
    campaignId: "3", // Adidas Morning Warriors
    campaignName: "Adidas Morning Warriors",
    cohorts: [
      { name: "Early Morning Runners", roas: 28.3, impressions: 1400000, conversions: 3900, trend: "up" },
      { name: "Marathon Participants", roas: 52.1, impressions: 780000, conversions: 4100, trend: "up" },
      { name: "Fitness App Users", roas: 19.7, impressions: 2300000, conversions: 4500, trend: "stable" },
      { name: "Running Gear Shoppers", roas: 33.5, impressions: 1100000, conversions: 3700, trend: "down" }
    ],
    topPerformer: "Marathon Participants",
    avgROAS: 33.4
  }
];

// Color palette for bars
const COLORS = ["#F97316", "#6366F1", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"];

interface CampaignCohortPerformanceProps {
  campaignId?: string;
}

export default function CampaignCohortPerformance({ campaignId }: CampaignCohortPerformanceProps) {
  // Find the cohort data for the selected campaign
  const cohortData = campaignId 
    ? CAMPAIGN_COHORT_DATA.find(c => c.campaignId === campaignId) || CAMPAIGN_COHORT_DATA[0]
    : CAMPAIGN_COHORT_DATA[0];

  // Sort cohorts by ROAS for the bar chart
  const sortedCohorts = [...cohortData.cohorts].sort((a, b) => b.roas - a.roas);

  const getROASColor = (roas: number): string => {
    if (roas >= 50) return "text-green-600";
    if (roas >= 30) return "text-blue-600";
    if (roas >= 20) return "text-yellow-600";
    return "text-orange-600";
  };

  const getROASBgColor = (roas: number): string => {
    if (roas >= 50) return "bg-green-50";
    if (roas >= 30) return "bg-blue-50";
    if (roas >= 20) return "bg-yellow-50";
    return "bg-orange-50";
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (trend === "down") return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
    return <span className="w-3 h-3 inline-block bg-gray-400 rounded-full" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-bright-purple/10 rounded-lg">
            <Users className="w-5 h-5 text-bright-purple" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Campaign Cohort Performance</h2>
            <p className="text-sm text-medium-gray">
              {cohortData.campaignName} - ROAS by audience segment
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-medium-gray">Avg. ROAS</p>
            <p className="text-lg font-semibold text-dark-gray">{cohortData.avgROAS.toFixed(1)}x</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-medium-gray">Top Performer</p>
            <p className="text-sm font-medium text-bright-purple">{cohortData.topPerformer}</p>
          </div>
        </div>
      </div>

      {/* Main Content - Flex Grow */}
      <div className="flex-grow">
        {/* Full Width Visualization */}
        <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-dark-gray">Performance by Cohort</h3>
          <div className="flex items-center gap-4 text-sm text-medium-gray">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-electric-blue rounded-full"></div>
              <span>ROAS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Volume</span>
            </div>
          </div>
        </div>
        
        {sortedCohorts.map((cohort, index) => {
          const maxROAS = Math.max(...sortedCohorts.map(c => c.roas));
          const roasPercentage = (cohort.roas / maxROAS) * 100;
          const maxImpressions = Math.max(...sortedCohorts.map(c => c.impressions || 0));
          const volumePercentage = ((cohort.impressions || 0) / maxImpressions) * 100;
          
          return (
            <motion.div
              key={cohort.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-silk-gray rounded-xl p-5 hover:shadow-lg transition-all duration-300"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-dark-gray text-lg">{cohort.name}</h4>
                    {index === 0 && (
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Top Performer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-medium-gray">
                    {cohort.impressions && (
                      <span>{(cohort.impressions / 1000000).toFixed(1)}M impressions</span>
                    )}
                    {cohort.conversions && (
                      <>
                        <span>•</span>
                        <span>{cohort.conversions.toLocaleString()} conversions</span>
                      </>
                    )}
                    {cohort.conversions && cohort.impressions && (
                      <>
                        <span>•</span>
                        <span>CVR: {((cohort.conversions / cohort.impressions) * 100).toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className={`text-3xl font-bold ${getROASColor(cohort.roas)}`}>
                      {cohort.roas}x
                    </p>
                    {cohort.trend && getTrendIcon(cohort.trend)}
                  </div>
                  <p className="text-xs text-medium-gray mt-1">ROAS</p>
                </div>
              </div>
              
              {/* Dual Progress Bars */}
              <div className="space-y-2">
                {/* ROAS Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-medium-gray">ROAS Performance</span>
                    <span className="text-xs font-medium text-dark-gray">{roasPercentage.toFixed(0)}% of best</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${roasPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                      className="absolute top-0 left-0 h-full rounded-full bg-electric-blue"
                    />
                  </div>
                </div>
                
                {/* Volume Bar */}
                {cohort.impressions && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-medium-gray">Reach Volume</span>
                      <span className="text-xs font-medium text-dark-gray">{volumePercentage.toFixed(0)}% of max</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${volumePercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 + 0.2 }}
                        className="absolute top-0 left-0 h-full rounded-full bg-gray-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>

      {/* Insights Section - Anchored to Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200"
      >
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-dark-gray mb-1">Performance Insight</h4>
            <p className="text-sm text-medium-gray">
              {cohortData.topPerformer} is outperforming the average by {((sortedCohorts[0].roas / cohortData.avgROAS - 1) * 100).toFixed(0)}%. 
              Consider increasing budget allocation to this high-performing cohort while optimizing underperformers.
            </p>
            <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View Optimization Strategy <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}