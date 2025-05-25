"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Calendar, Download, TrendingUp, Clock, Filter } from "lucide-react";
import EarningsPredictor from "@/components/app/data-owner/EarningsPredictor";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock earnings data
const mockEarnings = [
  { id: "1", date: "2025-05-23", amount: 1234.56, campaign: "Nike Summer Fitness", impressions: 45230, asset: "Fitness Activity Events", status: "distributed" },
  { id: "2", date: "2025-05-23", amount: 823.12, campaign: "Adidas Morning Warriors", impressions: 32100, asset: "User Demographics", status: "distributed" },
  { id: "3", date: "2025-05-23", amount: 567.89, campaign: "Under Armour Premium", impressions: 21500, asset: "Fitness Activity Events", status: "pending" },
  { id: "4", date: "2025-05-22", amount: 1456.78, campaign: "Peloton Acquisition", impressions: 53400, asset: "User Demographics", status: "distributed" },
  { id: "5", date: "2025-05-22", amount: 901.23, campaign: "Apple Fitness+", impressions: 38900, asset: "Fitness Activity Events", status: "distributed" },
];

// Generate daily earnings data
const generateDailyData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const earnings = 1200 + Math.random() * 800 + (29 - i) * 30;
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      earnings: Math.round(earnings),
      distributed: Math.round(earnings * 0.8),
      pending: Math.round(earnings * 0.2),
    });
  }
  return data;
};

const dailyData = generateDailyData();

// Asset breakdown data
const assetBreakdown = [
  { name: "Fitness Activity Events", value: 23400, percentage: 60 },
  { name: "User Demographics", value: 11200, percentage: 30 },
  { name: "Location Context", value: 4200, percentage: 10 },
];

const COLORS = ["#1DB954", "#7B4FFF", "#1E90FF"];

export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [viewType, setViewType] = useState<"overview" | "transactions" | "analytics">("overview");

  const totalEarnings = dailyData.reduce((sum, d) => sum + d.earnings, 0);
  const distributedEarnings = dailyData.reduce((sum, d) => sum + d.distributed, 0);
  const pendingEarnings = dailyData.reduce((sum, d) => sum + d.pending, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-gray mb-2">Earnings</h1>
          <p className="text-medium-gray">
            Track your revenue and payment history
          </p>
        </div>
        <button className="btn-secondary">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-1">
        <div className="flex">
          <button
            onClick={() => setViewType("overview")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === "overview"
                ? "bg-brand-green text-white"
                : "text-medium-gray hover:text-dark-gray"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewType("transactions")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === "transactions"
                ? "bg-brand-green text-white"
                : "text-medium-gray hover:text-dark-gray"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setViewType("analytics")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === "analytics"
                ? "bg-brand-green text-white"
                : "text-medium-gray hover:text-dark-gray"
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {viewType === "overview" && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="text-brand-green" size={24} />
                <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
                  +23.5%
                </span>
              </div>
              <p className="text-sm text-medium-gray mb-1">Total Earnings (30d)</p>
              <p className="text-2xl font-bold text-dark-gray">
                ${totalEarnings.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Clock className="text-electric-blue" size={24} />
                <span className="text-xs bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full">
                  Processing
                </span>
              </div>
              <p className="text-sm text-medium-gray mb-1">Pending</p>
              <p className="text-2xl font-bold text-dark-gray">
                ${pendingEarnings.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="text-brand-green" size={24} />
              </div>
              <p className="text-sm text-medium-gray mb-1">Next Payout</p>
              <p className="text-2xl font-bold text-dark-gray">
                ${(pendingEarnings * 0.7).toLocaleString()}
              </p>
              <p className="text-xs text-medium-gray mt-1">In 2 days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Calendar className="text-bright-purple" size={24} />
              </div>
              <p className="text-sm text-medium-gray mb-1">Avg Daily</p>
              <p className="text-2xl font-bold text-dark-gray">
                ${Math.round(totalEarnings / 30).toLocaleString()}
              </p>
              <p className="text-xs text-medium-gray mt-1">Last 30 days</p>
            </motion.div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-dark-gray">Earnings Trend</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-silk-gray rounded-lg px-3 py-1"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorDistributed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7B4FFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7B4FFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                  <XAxis dataKey="date" stroke="#86868B" />
                  <YAxis stroke="#86868B" tickFormatter={(value) => `$${value}`} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="distributed" 
                    stackId="1"
                    stroke="#1DB954" 
                    fill="url(#colorDistributed)" 
                    name="Distributed"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    stackId="1"
                    stroke="#7B4FFF" 
                    fill="url(#colorPending)" 
                    name="Pending"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earnings Predictor */}
          <EarningsPredictor />

          {/* Asset Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
              <h2 className="text-xl font-semibold text-dark-gray mb-6">Revenue by Asset</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-6">
                {assetBreakdown.map((asset, index) => (
                  <div key={asset.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-dark-gray">{asset.name}</span>
                    </div>
                    <span className="text-sm font-medium text-dark-gray">
                      ${asset.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
              <h2 className="text-xl font-semibold text-dark-gray mb-6">Top Campaigns</h2>
              <div className="space-y-4">
                {[
                  { name: "Nike Summer Fitness", revenue: 12340, change: "+15%" },
                  { name: "Adidas Morning Warriors", revenue: 8230, change: "+8%" },
                  { name: "Peloton Acquisition", revenue: 7560, change: "+23%" },
                  { name: "Under Armour Premium", revenue: 5670, change: "-5%" },
                  { name: "Apple Fitness+", revenue: 4510, change: "+12%" },
                ].map((campaign) => (
                  <div key={campaign.name} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-dark-gray">{campaign.name}</p>
                      <div className="w-full bg-light-gray rounded-full h-2 mt-2">
                        <div 
                          className="bg-brand-green h-2 rounded-full"
                          style={{ width: `${(campaign.revenue / 12340) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium text-dark-gray">
                        ${campaign.revenue.toLocaleString()}
                      </p>
                      <p className={`text-xs ${
                        campaign.change.startsWith("+") ? "text-brand-green" : "text-warm-coral"
                      }`}>
                        {campaign.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {viewType === "transactions" && (
        <div className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden">
          <div className="p-6 border-b border-silk-gray">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark-gray">Transaction History</h2>
              <button className="btn-secondary text-sm">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-gray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-silk-gray">
                {mockEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-light-gray/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-gray">
                      {new Date(earning.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-gray">
                      {earning.campaign}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-gray">
                      {earning.asset}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-gray">
                      {earning.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-gray">
                      ${earning.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        earning.status === "distributed"
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-electric-blue/10 text-electric-blue"
                      }`}>
                        {earning.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}