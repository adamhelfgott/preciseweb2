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
  { metric: "CTR", withData: 5.2, withoutData: 2.1, lift: 147 },
  { metric: "CVR", withData: 8.4, withoutData: 3.2, lift: 162 },
  { metric: "ROAS", withData: 4.2, withoutData: 1.8, lift: 133 },
  { metric: "LTV", withData: 156, withoutData: 89, lift: 75 },
  { metric: "CAC", withData: 31, withoutData: 58, lift: -47 }
];

const COHORT_IMPACT = [
  { 
    month: "Jan", 
    soloPerformance: 2.1, 
    withFitnessCohort: 3.2, 
    withAutoCohort: 3.8,
    withBothCohorts: 4.5
  },
  { 
    month: "Feb", 
    soloPerformance: 2.2, 
    withFitnessCohort: 3.4, 
    withAutoCohort: 3.9,
    withBothCohorts: 4.7
  },
  { 
    month: "Mar", 
    soloPerformance: 2.0, 
    withFitnessCohort: 3.5, 
    withAutoCohort: 4.1,
    withBothCohorts: 4.9
  },
  { 
    month: "Apr", 
    soloPerformance: 2.3, 
    withFitnessCohort: 3.6, 
    withAutoCohort: 4.2,
    withBothCohorts: 5.1
  },
  { 
    month: "May", 
    soloPerformance: 2.1, 
    withFitnessCohort: 3.8, 
    withAutoCohort: 4.3,
    withBothCohorts: 5.3
  },
  { 
    month: "Jun", 
    soloPerformance: 2.2, 
    withFitnessCohort: 3.9, 
    withAutoCohort: 4.5,
    withBothCohorts: 5.6
  }
];

const CATEGORY_LIFT = [
  { category: "Fitness", yourData: 3.2, marketAvg: 1.8, premium: 78 },
  { category: "Automotive", yourData: 3.8, marketAvg: 2.1, premium: 81 },
  { category: "Tech", yourData: 2.8, marketAvg: 1.9, premium: 47 },
  { category: "Entertainment", yourData: 2.5, marketAvg: 1.7, premium: 47 },
  { category: "Retail", yourData: 2.2, marketAvg: 1.5, premium: 47 }
];

const MISSED_OPPORTUNITIES = [
  {
    cohort: "Streaming Media Consortium",
    missedRevenue: 120000,
    missedLift: 2.8,
    campaigns: 45,
    requirement: "Add viewing history data"
  },
  {
    cohort: "Sustainable Lifestyle Collective",
    missedRevenue: 85000,
    missedLift: 3.2,
    campaigns: 32,
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
          <h4 className="font-semibold text-dark-gray mb-4">With vs Without Your Data</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LIFT_COMPARISON}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="metric" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="withoutData" fill="#9CA3AF" name="Without Your Data" />
                <Bar dataKey="withData" fill="#10B981" name="With Your Data" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Your Data Premium by Category</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_LIFT} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" fontSize={12} width={80} />
                <Tooltip />
                <Bar dataKey="marketAvg" fill="#E5E7EB" name="Market Avg" />
                <Bar dataKey="yourData" fill="#F97316" name="Your Data" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cohort Performance Impact */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <h4 className="font-semibold text-dark-gray mb-4">Cohort Participation Impact on ROAS</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={COHORT_IMPACT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="soloPerformance" 
                stroke="#9CA3AF" 
                fill="#9CA3AF" 
                fillOpacity={0.3}
                name="Solo Performance"
              />
              <Area 
                type="monotone" 
                dataKey="withFitnessCohort" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
                name="With Fitness Cohort"
              />
              <Area 
                type="monotone" 
                dataKey="withAutoCohort" 
                stroke="#6366F1" 
                fill="#6366F1" 
                fillOpacity={0.3}
                name="With Auto Cohort"
              />
              <Area 
                type="monotone" 
                dataKey="withBothCohorts" 
                stroke="#F97316" 
                fill="#F97316" 
                fillOpacity={0.3}
                name="With Both Cohorts"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-medium-gray">Solo</p>
            <p className="text-lg font-bold text-dark-gray">2.2x</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-medium-gray">+Fitness</p>
            <p className="text-lg font-bold text-green-600">3.9x</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-medium-gray">+Auto</p>
            <p className="text-lg font-bold text-indigo-600">4.5x</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-medium-gray">+Both</p>
            <p className="text-lg font-bold text-primary-orange">5.6x</p>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-medium-gray">Missed Revenue</p>
                    <p className="text-xl font-bold text-red-600">
                      -${(opp.missedRevenue / 1000).toFixed(0)}K/mo
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-medium-gray">Potential Lift</p>
                    <p className="text-xl font-bold text-orange-600">{opp.missedLift}x</p>
                  </div>
                  <div>
                    <p className="text-sm text-medium-gray">Campaigns</p>
                    <p className="text-xl font-bold text-dark-gray">{opp.campaigns}</p>
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