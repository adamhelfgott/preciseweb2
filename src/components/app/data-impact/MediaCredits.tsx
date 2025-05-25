"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  Award, 
  ArrowUpRight,
  Calendar,
  ShoppingCart,
  Zap
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const CREDIT_HISTORY = [
  { month: "Jan", earned: 28000, used: 15000, balance: 13000 },
  { month: "Feb", earned: 32000, used: 18000, balance: 27000 },
  { month: "Mar", earned: 35000, used: 22000, balance: 40000 },
  { month: "Apr", earned: 38000, used: 20000, balance: 58000 },
  { month: "May", earned: 40000, used: 25000, balance: 73000 },
  { month: "Jun", earned: 42000, used: 30000, balance: 85000 }
];

const CREDIT_SOURCES = [
  { name: "Fitness Data", value: 12600, percentage: 30, color: "#F97316" },
  { name: "Purchase History", value: 10920, percentage: 26, color: "#6366F1" },
  { name: "App Engagement", value: 9240, percentage: 22, color: "#10B981" },
  { name: "Location Patterns", value: 5880, percentage: 14, color: "#F59E0B" },
  { name: "Other", value: 3360, percentage: 8, color: "#9CA3AF" }
];

const REDEMPTION_OPTIONS = [
  {
    id: "1",
    name: "Premium DSP Access",
    description: "Access to MadHive, The Trade Desk premium inventory",
    cost: 50000,
    value: "$75K inventory value",
    savings: "33% discount"
  },
  {
    id: "2",
    name: "Creative Production",
    description: "Professional video and display creative services",
    cost: 25000,
    value: "$40K service value",
    savings: "38% discount"
  },
  {
    id: "3",
    name: "Data Enhancement",
    description: "Premium third-party data segments",
    cost: 30000,
    value: "$45K data value",
    savings: "33% discount"
  },
  {
    id: "4",
    name: "Campaign Optimization",
    description: "Managed service campaign optimization",
    cost: 20000,
    value: "$35K service value",
    savings: "43% discount"
  }
];

const RECENT_TRANSACTIONS = [
  { date: "Jun 28", description: "Nike campaign contribution", amount: 3200, type: "earned" },
  { date: "Jun 26", description: "MadHive inventory purchase", amount: -15000, type: "redeemed" },
  { date: "Jun 24", description: "Tesla campaign contribution", amount: 2800, type: "earned" },
  { date: "Jun 22", description: "Disney+ campaign contribution", amount: 4200, type: "earned" },
  { date: "Jun 20", description: "Creative services", amount: -10000, type: "redeemed" }
];

export default function MediaCredits() {
  const currentBalance = 85000;
  const monthlyAverage = 35833;
  const totalEarned = 215000;
  const totalRedeemed = 130000;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="font-medium text-dark-gray mb-2">{payload[0].payload.month}</p>
          <div className="space-y-1 text-sm">
            <p className="text-green-600">Earned: ${(payload[0].payload.earned / 1000).toFixed(0)}K</p>
            <p className="text-red-600">Used: ${(payload[0].payload.used / 1000).toFixed(0)}K</p>
            <p className="text-dark-gray font-medium">Balance: ${(payload[0].payload.balance / 1000).toFixed(0)}K</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-white/80" />
            <TrendingUp className="w-5 h-5 text-white/80" />
          </div>
          <p className="text-white/80 text-sm mb-1">Current Balance</p>
          <p className="text-3xl font-bold">${(currentBalance / 1000).toFixed(0)}K</p>
          <p className="text-white/60 text-xs mt-1">+14% this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <Award className="w-5 h-5 text-primary-orange mb-2" />
          <p className="text-sm text-medium-gray mb-1">Monthly Average</p>
          <p className="text-2xl font-bold text-dark-gray">${(monthlyAverage / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600">+23% vs last quarter</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <ArrowUpRight className="w-5 h-5 text-green-600 mb-2" />
          <p className="text-sm text-medium-gray mb-1">Total Earned</p>
          <p className="text-2xl font-bold text-dark-gray">${(totalEarned / 1000).toFixed(0)}K</p>
          <p className="text-xs text-medium-gray">Lifetime</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <ShoppingCart className="w-5 h-5 text-purple-600 mb-2" />
          <p className="text-sm text-medium-gray mb-1">Total Redeemed</p>
          <p className="text-2xl font-bold text-dark-gray">${(totalRedeemed / 1000).toFixed(0)}K</p>
          <p className="text-xs text-medium-gray">$195K value</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Credit History</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CREDIT_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="earned" 
                  stroke="#F97316" 
                  fill="#F97316" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credit Sources */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Credit Sources</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CREDIT_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CREDIT_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(value as number / 1000).toFixed(1)}K`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {CREDIT_SOURCES.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-dark-gray">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-dark-gray">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redemption Options */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-dark-gray">Redemption Marketplace</h4>
          <span className="text-sm text-medium-gray">Your balance: ${(currentBalance / 1000).toFixed(0)}K</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REDEMPTION_OPTIONS.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-light-gray rounded-lg p-4 hover:border-primary-orange transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h5 className="font-medium text-dark-gray">{option.name}</h5>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {option.savings}
                </span>
              </div>
              <p className="text-sm text-medium-gray mb-3">{option.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-medium-gray">Cost</p>
                  <p className="font-semibold text-dark-gray">${(option.cost / 1000).toFixed(0)}K credits</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-medium-gray">Value</p>
                  <p className="text-sm font-medium text-green-600">{option.value}</p>
                </div>
              </div>
              <button 
                className="mt-3 w-full py-2 border border-primary-orange text-primary-orange rounded-lg hover:bg-primary-orange hover:text-white transition-all text-sm font-medium"
                disabled={option.cost > currentBalance}
              >
                {option.cost > currentBalance ? "Insufficient Credits" : "Redeem"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <h4 className="font-semibold text-dark-gray mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-orange" />
          Recent Transactions
        </h4>
        
        <div className="space-y-3">
          {RECENT_TRANSACTIONS.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-light-gray last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  transaction.type === "earned" ? "bg-green-500" : "bg-red-500"
                }`} />
                <div>
                  <p className="text-sm font-medium text-dark-gray">{transaction.description}</p>
                  <p className="text-xs text-medium-gray">{transaction.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${
                transaction.type === "earned" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "earned" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <Zap className="w-8 h-8 text-white/80" />
          <div>
            <h4 className="text-xl font-semibold mb-2">Your Credits = Real Value</h4>
            <p className="text-white/80 mb-4">
              Every credit earned represents the real value your data brings to campaigns. 
              So far, you've saved $65K on media and services through the credit system.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-2xl font-bold">1.5x</p>
                <p className="text-white/60 text-xs">Credit value multiplier</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-2xl font-bold">38%</p>
                <p className="text-white/60 text-xs">Avg. discount rate</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-2xl font-bold">$65K</p>
                <p className="text-white/60 text-xs">Total savings</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}