"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Calendar,
  Target,
  Zap,
  ArrowRight
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface PacingData {
  date: string;
  planned: number;
  actual: number;
  projected: number;
}

interface CampaignBudget {
  id: string;
  name: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  dailyTarget: number;
  currentPace: number;
  projectedSpend: number;
  daysRemaining: number;
  status: "on-track" | "overpacing" | "underpacing";
  recommendation?: string;
}

const PACING_DATA: PacingData[] = [
  { date: "Jan 1", planned: 5000, actual: 4800, projected: 4900 },
  { date: "Jan 2", planned: 10000, actual: 9500, projected: 9700 },
  { date: "Jan 3", planned: 15000, actual: 14200, projected: 14500 },
  { date: "Jan 4", planned: 20000, actual: 19800, projected: 20000 },
  { date: "Jan 5", planned: 25000, actual: 26500, projected: 27000 },
  { date: "Jan 6", planned: 30000, actual: 33000, projected: 35000 },
  { date: "Jan 7", planned: 35000, actual: 38500, projected: 42000 },
];

const CAMPAIGN_BUDGETS: CampaignBudget[] = [
  {
    id: "1",
    name: "Nike - Just Do It 2025",
    totalBudget: 150000,
    spent: 38500,
    remaining: 111500,
    dailyTarget: 5000,
    currentPace: 5500,
    projectedSpend: 165000,
    daysRemaining: 23,
    status: "overpacing",
    recommendation: "Reduce daily spend by $500 to stay within budget"
  },
  {
    id: "2",
    name: "Tesla - Model S",
    totalBudget: 75000,
    spent: 12000,
    remaining: 63000,
    dailyTarget: 2500,
    currentPace: 1700,
    projectedSpend: 51000,
    daysRemaining: 23,
    status: "underpacing",
    recommendation: "Increase bids by 15% to improve delivery"
  },
  {
    id: "3",
    name: "Disney+ - Magic Happens",
    totalBudget: 100000,
    spent: 25000,
    remaining: 75000,
    dailyTarget: 3333,
    currentPace: 3300,
    projectedSpend: 99000,
    daysRemaining: 23,
    status: "on-track",
    recommendation: "Maintain current pacing strategy"
  }
];

// const BUDGET_ALLOCATION = [
//   { name: "Nike", value: 38500, percentage: 48 },
//   { name: "Tesla", value: 12000, percentage: 15 },
//   { name: "Disney+", value: 25000, percentage: 31 },
//   { name: "Available", value: 48500, percentage: 6 }
// ];

const COLORS = ["#F97316", "#6366F1", "#10B981", "#E5E7EB"];

interface BudgetPacingProps {
  campaignId?: string;
}

export default function BudgetPacing({ campaignId }: BudgetPacingProps) {
  // Filter campaigns based on campaignId if provided
  const campaigns = campaignId 
    ? CAMPAIGN_BUDGETS.filter(c => c.id === campaignId)
    : CAMPAIGN_BUDGETS;

  const totalBudget = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const utilizationRate = (totalSpent / totalBudget) * 100;

  // Create budget allocation data dynamically
  const budgetAllocation = campaigns.map(c => ({
    name: c.name.split(' ')[0], // Extract brand name
    value: c.spent,
    percentage: Math.round((c.spent / totalBudget) * 100)
  }));
  
  // Add available budget
  if (totalBudget > totalSpent) {
    budgetAllocation.push({
      name: "Available",
      value: totalBudget - totalSpent,
      percentage: Math.round(((totalBudget - totalSpent) / totalBudget) * 100)
    });
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "text-green-600 bg-green-50";
      case "overpacing": return "text-orange-600 bg-orange-50";
      case "underpacing": return "text-blue-600 bg-blue-50";
      default: return "text-medium-gray bg-light-gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track": return <Target className="w-4 h-4" />;
      case "overpacing": return <TrendingUp className="w-4 h-4" />;
      case "underpacing": return <TrendingDown className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Overview */}
      <div className="bg-gradient-to-r from-warm-coral to-electric-blue rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <DollarSign className="w-6 h-6" />
              Budget Pacing Intelligence
            </h3>
            <p className="text-white/80">
              AI-powered budget optimization across all campaigns
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-white/80 text-sm">Total Budget</p>
              <p className="text-2xl font-bold">${(totalBudget / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Spent</p>
              <p className="text-2xl font-bold">${(totalSpent / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Utilization</p>
              <p className="text-2xl font-bold">{utilizationRate.toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pacing Chart and Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pacing Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Budget Pacing Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PACING_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#6B7280" 
                  fill="#E5E7EB" 
                  strokeWidth={2}
                  name="Planned"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#F97316" 
                  fill="#FED7AA" 
                  strokeWidth={2}
                  name="Actual"
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#6366F1" 
                  fill="#C7D2FE" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Projected"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-light-gray rounded" />
              <span className="text-sm text-medium-gray">Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-orange rounded" />
              <span className="text-sm text-medium-gray">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded" />
              <span className="text-sm text-medium-gray">Projected</span>
            </div>
          </div>
        </div>

        {/* Budget Allocation */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Budget Allocation</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {budgetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {budgetAllocation.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded`} style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-dark-gray">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-dark-gray">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Budget Details */}
      <div className="space-y-4">
        <h4 className="font-semibold text-dark-gray">Campaign Budget Status</h4>
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-light-gray p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Campaign Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h5 className="font-semibold text-dark-gray">{campaign.name}</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    {campaign.status.replace("-", " ")}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-medium-gray">Spent: ${(campaign.spent / 1000).toFixed(0)}K</span>
                    <span className="text-medium-gray">Budget: ${(campaign.totalBudget / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="relative h-2 bg-light-gray rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(campaign.spent / campaign.totalBudget) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        campaign.status === "overpacing" ? "bg-orange-500" :
                        campaign.status === "underpacing" ? "bg-blue-500" :
                        "bg-green-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-medium-gray">Daily Target</p>
                    <p className="text-sm font-medium text-dark-gray">${campaign.dailyTarget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray">Current Pace</p>
                    <p className="text-sm font-medium text-dark-gray">${campaign.currentPace.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray">Days Remaining</p>
                    <p className="text-sm font-medium text-dark-gray">{campaign.daysRemaining}</p>
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray">Projected Total</p>
                    <p className="text-sm font-medium text-dark-gray">${(campaign.projectedSpend / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              {campaign.recommendation && (
                <div className="lg:w-80">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-900 mb-1">AI Recommendation</p>
                        <p className="text-xs text-blue-800">{campaign.recommendation}</p>
                        <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          Apply Optimization <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Budget Reallocation Opportunity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
      >
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Zap className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-dark-gray mb-2">Budget Optimization Opportunity</h4>
            <p className="text-sm text-medium-gray mb-3">
              Reallocating $15K from underperforming Tesla campaign to high-performing Nike campaign 
              could increase overall ROAS by 23% (+$42K projected revenue).
            </p>
            <div className="flex gap-3">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Apply Optimization
              </button>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}