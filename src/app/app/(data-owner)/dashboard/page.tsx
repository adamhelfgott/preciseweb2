"use client";

import { useAuth } from "@/contexts/AuthContext";
import LiveEarningsTicker from "@/components/app/dashboards/LiveEarningsTicker";
import DataAssetsOverview from "@/components/app/dashboards/DataAssetsOverview";
import RecommendationsPanel from "@/components/app/dashboards/RecommendationsPanel";
import EarningsChart from "@/components/app/dashboards/EarningsChart";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Database, Zap } from "lucide-react";
import RealtimeActivityFeed from "@/components/app/visualizations/RealtimeActivityFeed";

export default function DataOwnerDashboard() {
  const { user } = useAuth();

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
    </div>
  );
}