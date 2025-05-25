"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LiveEarningsTicker from "@/components/app/dashboards/LiveEarningsTicker";
import DataAssetsOverview from "@/components/app/dashboards/DataAssetsOverview";
import RecommendationsPanel from "@/components/app/dashboards/RecommendationsPanel";
import EarningsChart from "@/components/app/dashboards/EarningsChart";
import DataUsageAnalytics from "@/components/app/data-owner/DataUsageAnalytics";
import AttributionBreakdown from "@/components/app/data-owner/AttributionBreakdown";
import DataMarketplace from "@/components/app/data-owner/DataMarketplace";
import PrivacyDashboard from "@/components/app/data-owner/PrivacyDashboard";
import AIInsights from "@/components/app/data-owner/AIInsights";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Database, 
  Zap,
  Activity,
  Award,
  Store,
  Shield,
  Brain,
  ChevronRight
} from "lucide-react";
import RealtimeActivityFeed from "@/components/app/visualizations/RealtimeActivityFeed";

type TabType = "overview" | "analytics" | "attribution" | "marketplace" | "privacy" | "insights";

export default function DataOwnerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const stats = [
    {
      label: "Monthly Recurring Revenue",
      value: "$47,230",
      change: "+127%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Active Data Assets",
      value: "2",
      change: "94 avg quality",
      trend: "neutral",
      icon: Database,
    },
    {
      label: "Usage Rate",
      value: "62%",
      change: "+18%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Next Payout",
      value: "$8,432",
      change: "In 2 days",
      trend: "neutral",
      icon: Zap,
    },
  ];

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: Activity },
    { id: "analytics" as TabType, label: "Usage Analytics", icon: Activity },
    { id: "attribution" as TabType, label: "Attribution", icon: Award },
    { id: "marketplace" as TabType, label: "Marketplace", icon: Store },
    { id: "privacy" as TabType, label: "Privacy", icon: Shield },
    { id: "insights" as TabType, label: "AI Insights", icon: Brain },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-gray mb-2">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-medium-gray">
          Your data is creating value across 47 active campaigns
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-light-gray rounded-xl flex items-center justify-center">
                <stat.icon size={24} className="text-medium-gray" />
              </div>
              {stat.trend === "up" && (
                <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
              {stat.trend === "neutral" && (
                <span className="text-xs bg-light-gray text-medium-gray px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-sm text-medium-gray mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-dark-gray">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-brand-purple text-white"
                  : "text-medium-gray hover:bg-light-gray"
              }`}
            >
              <tab.icon size={16} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <>
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Live Earnings */}
              <div className="lg:col-span-1">
                <LiveEarningsTicker />
              </div>

              {/* Right Column - Chart and Recommendations */}
              <div className="lg:col-span-2 space-y-6">
                <EarningsChart />
                <RecommendationsPanel />
              </div>
            </div>

            {/* Data Assets Section */}
            <DataAssetsOverview />

            {/* Real-time Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <RealtimeActivityFeed showStats={true} maxEvents={8} />
            </motion.div>
          </>
        )}

        {activeTab === "analytics" && <DataUsageAnalytics />}
        {activeTab === "attribution" && <AttributionBreakdown />}
        {activeTab === "marketplace" && <DataMarketplace />}
        {activeTab === "privacy" && <PrivacyDashboard />}
        {activeTab === "insights" && <AIInsights />}
      </motion.div>

      {/* Quick Actions */}
      {activeTab !== "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-silk-gray hover:shadow-md transition-all"
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-purple/10 rounded-lg flex items-center justify-center">
                <Activity size={20} className="text-brand-purple" />
              </div>
              <span className="text-sm font-medium text-dark-gray">
                Back to Overview
              </span>
            </div>
            <ChevronRight size={16} className="text-medium-gray" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-silk-gray hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center">
                <Database size={20} className="text-brand-green" />
              </div>
              <span className="text-sm font-medium text-dark-gray">
                Manage Data Assets
              </span>
            </div>
            <ChevronRight size={16} className="text-medium-gray" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-silk-gray hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-brand-blue" />
              </div>
              <span className="text-sm font-medium text-dark-gray">
                View Earnings Report
              </span>
            </div>
            <ChevronRight size={16} className="text-medium-gray" />
          </motion.button>
        </div>
      )}
    </div>
  );
}