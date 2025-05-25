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
  { category: "Fitness & Wellness", campaigns: "High", impact: "Very Strong", color: "#22C55E" },
  { category: "Technology", campaigns: "High", impact: "Strong", color: "#3B82F6" },
  { category: "Entertainment", campaigns: "Medium", impact: "Strong", color: "#8B5CF6" },
  { category: "Automotive", campaigns: "Medium", impact: "Very Strong", color: "#F59E0B" },
  { category: "Retail", campaigns: "Very High", impact: "Moderate", color: "#EC4899" },
  { category: "Travel", campaigns: "Low", impact: "Exceptional", color: "#10B981" }
];

const DATA_TYPES = [
  { name: "First-party CRM", value: 35, color: "#F97316" },
  { name: "Website Analytics", value: 28, color: "#6366F1" },
  { name: "App Engagement", value: 22, color: "#10B981" },
  { name: "Purchase History", value: 15, color: "#F59E0B" }
];

const CONTRIBUTION_TIMELINE = [
  { month: "Jan", activity: 65, growth: 0 },
  { month: "Feb", activity: 72, growth: 10.8 },
  { month: "Mar", activity: 78, growth: 8.3 },
  { month: "Apr", activity: 84, growth: 7.7 },
  { month: "May", activity: 91, growth: 8.3 },
  { month: "Jun", activity: 100, growth: 9.9 }
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
          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-3">
            {CATEGORY_IMPACT.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-light-gray rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    category.campaigns === "Very High" ? "bg-red-100 text-red-700" :
                    category.campaigns === "High" ? "bg-orange-100 text-orange-700" :
                    category.campaigns === "Medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {category.campaigns}
                  </span>
                </div>
                <p className="text-sm font-medium text-dark-gray mb-1">{category.category}</p>
                <p className="text-xs text-medium-gray">Campaign Activity</p>
              </motion.div>
            ))}
          </div>

          {/* Impact Meters */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-dark-gray mb-2">Performance Impact</h5>
            {CATEGORY_IMPACT.map((category) => (
              <div key={category.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-medium-gray">{category.category}</span>
                  <span className={`text-xs font-medium ${
                    category.impact === "Exceptional" ? "text-green-600" :
                    category.impact === "Very Strong" ? "text-blue-600" :
                    category.impact === "Strong" ? "text-indigo-600" :
                    "text-gray-600"
                  }`}>
                    {category.impact}
                  </span>
                </div>
                <div className="w-full bg-light-gray rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      backgroundColor: category.color,
                      width: category.impact === "Exceptional" ? "95%" :
                             category.impact === "Very Strong" ? "85%" :
                             category.impact === "Strong" ? "70%" :
                             "55%"
                    }}
                  />
                </div>
              </div>
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
          <h4 className="font-semibold text-dark-gray mb-4">Activity Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CONTRIBUTION_TIMELINE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === "Activity Index") return [`${value}%`, name];
                    if (name === "Growth Rate") return [`+${value}%`, name];
                    return [value, name];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  name="Activity Index"
                  dot={{ fill: '#F97316', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-medium-gray">6-month trend</span>
            <span className="text-green-600 font-medium">+53.8% overall growth</span>
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
                <p className="text-white/80 text-sm mb-1">Performance Tier</p>
                <p className="text-3xl font-bold">Premium</p>
                <p className="text-white/60 text-xs">Top 15% of partners</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Impact Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-6 h-6 bg-white rounded" />
                  ))}
                </div>
                <p className="text-white/60 text-xs mt-1">Exceptional performance</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Partner Status</p>
                <p className="text-3xl font-bold">Gold</p>
                <p className="text-white/60 text-xs">Verified contributor</p>
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
                  <span className="text-sm text-medium-gray">Privacy Budget</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-medium-gray">Query Capacity</span>
                  <span className="text-sm font-medium text-green-600">Optimal</span>
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