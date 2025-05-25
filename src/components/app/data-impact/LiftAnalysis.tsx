"use client";

import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertCircle,
  CheckCircle,
  Zap
} from "lucide-react";

const LIFT_COMPARISON = [
  { metric: "CTR", improvement: "High", direction: "up", intensity: 85 },
  { metric: "CVR", improvement: "Very High", direction: "up", intensity: 92 },
  { metric: "ROAS", improvement: "High", direction: "up", intensity: 78 },
  { metric: "LTV", improvement: "Moderate", direction: "up", intensity: 65 },
  { metric: "CAC", improvement: "Significant", direction: "down", intensity: 73 }
];

const COHORT_IMPACT = [
  { 
    month: "Jan", 
    baseline: 100, 
    singleCohort: 152, 
    multiCohort: 214
  },
  { 
    month: "Feb", 
    baseline: 100, 
    singleCohort: 155, 
    multiCohort: 214
  },
  { 
    month: "Mar", 
    baseline: 100, 
    singleCohort: 175, 
    multiCohort: 245
  },
  { 
    month: "Apr", 
    baseline: 100, 
    singleCohort: 157, 
    multiCohort: 222
  },
  { 
    month: "May", 
    baseline: 100, 
    singleCohort: 181, 
    multiCohort: 252
  },
  { 
    month: "Jun", 
    baseline: 100, 
    singleCohort: 177, 
    multiCohort: 255
  }
];

const CATEGORY_LIFT = [
  { category: "Fitness", performance: "Premium", rank: 1, trend: "up" },
  { category: "Automotive", performance: "Premium", rank: 2, trend: "up" },
  { category: "Tech", performance: "Strong", rank: 3, trend: "stable" },
  { category: "Entertainment", performance: "Strong", rank: 4, trend: "up" },
  { category: "Retail", performance: "Good", rank: 5, trend: "stable" }
];

const MISSED_OPPORTUNITIES = [
  {
    cohort: "Streaming Media Consortium",
    potential: "Very High",
    matchScore: 82,
    requirement: "Add viewing history data"
  },
  {
    cohort: "Sustainable Lifestyle Collective",
    potential: "High",
    matchScore: 75,
    requirement: "Complete values survey"
  }
];

export default function LiftAnalysis() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="font-medium text-dark-gray mb-2">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Lift Overview */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-white/80" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Your Data Drives Real Lift</h3>
            <p className="text-white/80 mb-4">
              Campaigns using your data consistently outperform baseline by 2-4x across all metrics
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-3xl font-bold">147%</p>
                <p className="text-white/60 text-xs">Higher CTR</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-3xl font-bold">162%</p>
                <p className="text-white/60 text-xs">Higher CVR</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-3xl font-bold">47%</p>
                <p className="text-white/60 text-xs">Lower CAC</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-3xl font-bold">75%</p>
                <p className="text-white/60 text-xs">Higher LTV</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* With vs Without Data */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Campaign Performance Impact</h4>
          <div className="space-y-4">
            {LIFT_COMPARISON.map((metric) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-dark-gray">{metric.metric}</span>
                  <span className={`text-sm font-medium ${
                    metric.improvement === "Very High" ? "text-green-600" :
                    metric.improvement === "High" ? "text-blue-600" :
                    metric.improvement === "Significant" ? "text-purple-600" :
                    "text-indigo-600"
                  }`}>
                    {metric.improvement} {metric.direction === "up" ? "↑" : "↓"}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      metric.direction === "up" ? "bg-gradient-to-r from-green-400 to-green-600" :
                      "bg-gradient-to-r from-purple-400 to-purple-600"
                    }`}
                    style={{ width: `${metric.intensity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Performance by Category</h4>
          <div className="space-y-3">
            {CATEGORY_LIFT.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    category.rank <= 2 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
                    category.rank <= 4 ? "bg-gradient-to-br from-blue-400 to-indigo-500" :
                    "bg-gradient-to-br from-gray-400 to-gray-500"
                  }`}>
                    {category.rank}
                  </div>
                  <div>
                    <p className="font-medium text-dark-gray">{category.category}</p>
                    <p className="text-xs text-medium-gray">{category.performance} tier</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${
                  category.trend === "up" ? "text-green-600" : "text-gray-600"
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {category.trend === "up" ? "Rising" : "Stable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort Performance Impact */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <h4 className="font-semibold text-dark-gray mb-4">Performance Index with Data Collaboration</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={COHORT_IMPACT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} domain={[0, 300]} />
              <Tooltip 
                formatter={(value: any) => [`${value}%`, "Performance Index"]}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="baseline" 
                stroke="#9CA3AF" 
                fill="#9CA3AF" 
                fillOpacity={0.3}
                name="Baseline"
              />
              <Area 
                type="monotone" 
                dataKey="singleCohort" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
                name="Single Cohort"
              />
              <Area 
                type="monotone" 
                dataKey="multiCohort" 
                stroke="#F97316" 
                fill="#F97316" 
                fillOpacity={0.3}
                name="Multi-Cohort"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-medium-gray">Baseline</p>
            <p className="text-lg font-bold text-dark-gray">Standard</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-medium-gray">Single Cohort</p>
            <p className="text-lg font-bold text-green-600">+77% avg</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-medium-gray">Multi-Cohort</p>
            <p className="text-lg font-bold text-primary-orange">+155% avg</p>
          </div>
        </div>
      </div>

      {/* Missed Opportunities */}
      <div className="space-y-4">
        <h4 className="font-semibold text-dark-gray flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          Lift You're Missing Out On
        </h4>
        
        {MISSED_OPPORTUNITIES.map((opp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-orange-50 border border-orange-200 rounded-xl p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h5 className="font-semibold text-dark-gray mb-2">{opp.cohort}</h5>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-medium-gray">Opportunity</p>
                    <p className={`text-xl font-bold ${
                      opp.potential === "Very High" ? "text-orange-600" : "text-yellow-600"
                    }`}>
                      {opp.potential}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-medium-gray">Match Score</p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full"
                          style={{ width: `${opp.matchScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-dark-gray">{opp.matchScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white rounded-lg p-4 border border-orange-300">
                  <p className="text-sm font-medium text-dark-gray mb-1">To unlock:</p>
                  <p className="text-sm text-orange-700">{opp.requirement}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
      >
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">
              Success Story: Nike Campaign
            </h4>
            <p className="text-sm text-medium-gray mb-3">
              After joining the Fitness Enthusiasts Alliance cohort, the Nike "Just Do It 2025" campaign saw:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-purple-600">312%</p>
                <p className="text-xs text-medium-gray">CTR increase</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-purple-600">$47→$31</p>
                <p className="text-xs text-medium-gray">CAC reduction</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-purple-600">5.2x</p>
                <p className="text-xs text-medium-gray">ROAS achieved</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-purple-600">$156K</p>
                <p className="text-xs text-medium-gray">Monthly credits</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}