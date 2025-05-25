"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { Database, Shield, TrendingUp, Award } from "lucide-react";

const CATEGORY_IMPACT = [
  { category: "Fitness & Wellness", campaigns: 45, lift: 3.2, revenue: 125000 },
  { category: "Technology", campaigns: 38, lift: 2.8, revenue: 98000 },
  { category: "Entertainment", campaigns: 32, lift: 2.5, revenue: 87000 },
  { category: "Automotive", campaigns: 28, lift: 3.8, revenue: 156000 },
  { category: "Retail", campaigns: 52, lift: 2.2, revenue: 143000 },
  { category: "Travel", campaigns: 19, lift: 4.1, revenue: 78000 }
];

const DATA_TYPES = [
  { name: "First-party CRM", value: 35, color: "#F97316" },
  { name: "Website Analytics", value: 28, color: "#6366F1" },
  { name: "App Engagement", value: 22, color: "#10B981" },
  { name: "Purchase History", value: 15, color: "#F59E0B" }
];

const CONTRIBUTION_TIMELINE = [
  { month: "Jan", dataPoints: 1200000, campaigns: 145, credits: 28000 },
  { month: "Feb", dataPoints: 1450000, campaigns: 167, credits: 32000 },
  { month: "Mar", dataPoints: 1680000, campaigns: 189, credits: 35000 },
  { month: "Apr", dataPoints: 1920000, campaigns: 203, credits: 38000 },
  { month: "May", dataPoints: 2100000, campaigns: 224, credits: 40000 },
  { month: "Jun", dataPoints: 2400000, campaigns: 248, credits: 42000 }
];

export default function DataContribution() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="font-medium text-dark-gray mb-2">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm text-medium-gray">
              {entry.name}: <span className="font-medium text-dark-gray">
                {entry.name.includes("credits") ? `$${(entry.value / 1000).toFixed(0)}K` : entry.value.toLocaleString()}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Category Impact */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <h4 className="font-semibold text-dark-gray mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary-orange" />
          Categories Your Data Powers
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div>
            <p className="text-sm text-medium-gray mb-4">Active campaigns using your data</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_IMPACT} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="campaigns" />
                  <YAxis dataKey="category" type="category" fontSize={12} width={100} />
                  <Tooltip />
                  <Bar dataKey="campaigns" fill="#F97316" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impact Cards */}
          <div className="grid grid-cols-2 gap-4">
            {CATEGORY_IMPACT.slice(0, 4).map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200"
              >
                <p className="text-sm font-medium text-dark-gray mb-2">{category.category}</p>
                <p className="text-2xl font-bold text-dark-gray mb-1">{category.lift}x</p>
                <p className="text-xs text-medium-gray">Average lift</p>
                <p className="text-sm font-medium text-green-600 mt-2">
                  +${(category.revenue / 1000).toFixed(0)}K revenue impact
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Data Type Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA_TYPES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DATA_TYPES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {DATA_TYPES.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: type.color }} />
                  <span className="text-sm text-dark-gray">{type.name}</span>
                </div>
                <span className="text-sm font-medium text-dark-gray">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Growth */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Contribution Growth</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CONTRIBUTION_TIMELINE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis yAxisId="left" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="campaigns" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  name="Campaigns"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="credits" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Credits earned"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Value Creation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <Award className="w-8 h-8 text-white/80" />
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-2">Your Data Creates Real Value</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Total Revenue Impact</p>
                <p className="text-3xl font-bold">$687K</p>
                <p className="text-white/60 text-xs">Across all campaigns</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Average Campaign Lift</p>
                <p className="text-3xl font-bold">3.1x</p>
                <p className="text-white/60 text-xs">With your data</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Partner Brands</p>
                <p className="text-3xl font-bold">124</p>
                <p className="text-white/60 text-xs">Using your insights</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Privacy Shield */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">Your Data, Your Control</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-medium-gray">Privacy Budget Used</span>
                  <span className="text-sm font-medium text-dark-gray">42%</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-medium-gray">Query Limit</span>
                  <span className="text-sm font-medium text-dark-gray">156K/500K</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "31%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}