"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  TrendingUp, 
  Award,
  Building2,
  Sparkles,
  ChevronRight,
  Info
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface DataContribution {
  asset: string;
  owner: string;
  shapleyValue: number;
  contributionPercentage: number;
  contributionValue: number;
}

interface CampaignContributionData {
  campaignId: string;
  campaignName: string;
  totalValue: number;
  contributions: DataContribution[];
}

// Mock data for different campaigns
const CAMPAIGN_CONTRIBUTION_DATA: CampaignContributionData[] = [
  {
    campaignId: "1", // Ticket Sales 2025
    campaignName: "Ticket Sales 2025",
    totalValue: 33636,
    contributions: [
      { asset: "Household Income", owner: "Audience Acuity", shapleyValue: 2.0, contributionPercentage: 7, contributionValue: 2422 },
      { asset: "1P Seed Data", owner: "Pro Sports Club", shapleyValue: 3.8, contributionPercentage: 13, contributionValue: 4507 },
      { asset: "Identity Resolution", owner: "Audience Acuity", shapleyValue: 0.8, contributionPercentage: 3, contributionValue: 1009 },
      { asset: "User Affinities", owner: "Audience Acuity", shapleyValue: 3.2, contributionPercentage: 11, contributionValue: 3801 },
      { asset: "Precise AI Model", owner: "Precise.ai", shapleyValue: 11.7, contributionPercentage: 42, contributionValue: 14093 },
      { asset: "Return Path Data", owner: "Precise.ai", shapleyValue: 6.5, contributionPercentage: 23, contributionValue: 7804 }
    ]
  },
  {
    campaignId: "2", // Nike Summer Fitness
    campaignName: "Nike Summer Fitness 2025",
    totalValue: 48250,
    contributions: [
      { asset: "Fitness Tracking Data", owner: "Whoop", shapleyValue: 8.2, contributionPercentage: 28, contributionValue: 13510 },
      { asset: "Purchase History", owner: "Nike Direct", shapleyValue: 5.4, contributionPercentage: 18, contributionValue: 8685 },
      { asset: "Location Intelligence", owner: "SafeGraph", shapleyValue: 3.1, contributionPercentage: 11, contributionValue: 5308 },
      { asset: "Social Signals", owner: "Meta Partners", shapleyValue: 2.8, contributionPercentage: 10, contributionValue: 4825 },
      { asset: "Precise AI Model", owner: "Precise.ai", shapleyValue: 9.8, contributionPercentage: 33, contributionValue: 15923 }
    ]
  },
  {
    campaignId: "3", // Adidas Morning Warriors
    campaignName: "Adidas Morning Warriors",
    totalValue: 31450,
    contributions: [
      { asset: "Running App Data", owner: "Strava", shapleyValue: 6.9, contributionPercentage: 25, contributionValue: 7863 },
      { asset: "Weather Patterns", owner: "Weather Company", shapleyValue: 2.3, contributionPercentage: 8, contributionValue: 2516 },
      { asset: "Retail Footfall", owner: "Placer.ai", shapleyValue: 4.1, contributionPercentage: 15, contributionValue: 4718 },
      { asset: "Demographics", owner: "Experian", shapleyValue: 3.5, contributionPercentage: 13, contributionValue: 4089 },
      { asset: "Precise AI Model", owner: "Precise.ai", shapleyValue: 10.9, contributionPercentage: 39, contributionValue: 12266 }
    ]
  }
];

// Colors for visualization
const COLORS = ["#1DB954", "#F97316", "#6366F1", "#F59E0B", "#EC4899", "#8B5CF6", "#10B981"];

interface PerformanceBasedDataContributionProps {
  campaignId?: string;
}

export default function PerformanceBasedDataContribution({ campaignId }: PerformanceBasedDataContributionProps) {
  // Find the contribution data for the selected campaign
  const contributionData = campaignId 
    ? CAMPAIGN_CONTRIBUTION_DATA.find(c => c.campaignId === campaignId) || CAMPAIGN_CONTRIBUTION_DATA[0]
    : CAMPAIGN_CONTRIBUTION_DATA[0];

  // Sort contributions by value
  const sortedContributions = [...contributionData.contributions].sort((a, b) => b.contributionValue - a.contributionValue);

  // Group contributions by owner for pie chart
  const ownerGroups = contributionData.contributions.reduce((acc, contrib) => {
    if (!acc[contrib.owner]) {
      acc[contrib.owner] = {
        owner: contrib.owner,
        totalValue: 0,
        totalPercentage: 0,
        assets: []
      };
    }
    acc[contrib.owner].totalValue += contrib.contributionValue;
    acc[contrib.owner].totalPercentage += contrib.contributionPercentage;
    acc[contrib.owner].assets.push(contrib.asset);
    return acc;
  }, {} as Record<string, any>);

  const pieData = Object.values(ownerGroups).sort((a: any, b: any) => b.totalValue - a.totalValue);

  const getOwnerColor = (owner: string): string => {
    if (owner.includes("Precise")) return "#1DB954";
    if (owner.includes("Pro Sports")) return "#F97316";
    if (owner.includes("Nike")) return "#6366F1";
    if (owner.includes("Audience")) return "#EC4899";
    return "#8B5CF6";
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="text-sm font-medium text-dark-gray">{payload[0].payload.owner}</p>
          <p className="text-xs text-medium-gray">Value: ${payload[0].value.toLocaleString()}</p>
          <p className="text-xs text-medium-gray">Share: {payload[0].payload.totalPercentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-green/10 rounded-lg">
            <Database className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Data Contribution Value</h2>
            <p className="text-sm text-medium-gray">
              Shapley value attribution for {contributionData.campaignName}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-medium-gray">Total Value</p>
          <p className="text-lg font-semibold text-dark-gray">${contributionData.totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Table View */}
      <div className="space-y-3 mb-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-medium-gray uppercase tracking-wider">
            <div className="col-span-4">Asset</div>
            <div className="col-span-3">Owner</div>
            <div className="col-span-2 text-center">Shapley Value</div>
            <div className="col-span-1 text-center">Share</div>
            <div className="col-span-2 text-right">Value</div>
          </div>

          {/* Table Rows */}
          {sortedContributions.map((contrib, index) => (
            <motion.div
              key={`${contrib.asset}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 px-4 py-3 bg-light-gray rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="col-span-4 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-medium text-dark-gray">{contrib.asset}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <Building2 className="w-3 h-3 text-medium-gray" />
                <span className="text-sm text-dark-gray">{contrib.owner}</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-semibold text-dark-gray">{contrib.shapleyValue.toFixed(1)}</span>
              </div>
              <div className="col-span-1 text-center">
                <span className={`inline-flex items-center justify-center w-12 h-6 rounded-full text-xs font-medium ${
                  contrib.contributionPercentage >= 20 ? 'bg-brand-green/10 text-brand-green' :
                  contrib.contributionPercentage >= 10 ? 'bg-electric-blue/10 text-electric-blue' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {contrib.contributionPercentage}%
                </span>
              </div>
              <div className="col-span-2 text-right font-semibold text-dark-gray">
                ${contrib.contributionValue.toLocaleString()}
              </div>
            </motion.div>
          ))}
      </div>

      {/* Chart View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <div className="bg-light-gray rounded-lg p-4">
            <h3 className="font-medium text-dark-gray mb-4">Value Distribution by Owner</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="totalValue"
                  >
                    {pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={getOwnerColor(entry.owner)} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.map((owner: any, index: number) => (
                <div key={owner.owner} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getOwnerColor(owner.owner) }}
                    />
                    <span className="text-dark-gray">{owner.owner}</span>
                  </div>
                  <span className="font-medium text-dark-gray">{owner.totalPercentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-light-gray rounded-lg p-4">
            <h3 className="font-medium text-dark-gray mb-4">Shapley Values by Asset</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedContributions} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                  <XAxis 
                    dataKey="asset" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80} 
                    fontSize={11}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip formatter={(value: any) => value.toFixed(1)} />
                  <Bar dataKey="shapleyValue" radius={[4, 4, 0, 0]}>
                    {sortedContributions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
      </div>

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200"
      >
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Sparkles className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-dark-gray mb-1">Attribution Insight</h4>
            <p className="text-sm text-medium-gray">
              {sortedContributions[0].owner}'s {sortedContributions[0].asset} is the highest value contributor at {sortedContributions[0].contributionPercentage}% 
              (${sortedContributions[0].contributionValue.toLocaleString()}). Consider increasing investment in similar high-performing data assets.
            </p>
            <button className="mt-2 text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
              View Attribution Model Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}