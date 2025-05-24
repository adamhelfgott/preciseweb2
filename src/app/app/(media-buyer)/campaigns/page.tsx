"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Target, Activity, Plus, ChevronRight } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

// Mock campaign data
const mockCampaigns = [
  {
    id: "1",
    name: "Nike Summer Fitness 2025",
    status: "active",
    currentCAC: 31.20,
    previousCAC: 47.50,
    targetCAC: 28.00,
    ltv: 131.04,
    preciseLaunchDate: Date.now() - (30 * 24 * 60 * 60 * 1000),
    spend: 100000,
    revenue: 500000,
    roas: 5.0,
    dsps: ["madhive", "ttd", "amazon"],
    cacHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 47.50 - (i * 0.55),
    })),
    dspBreakdown: [
      { id: "madhive", name: "MadHive", spend: 45000, currentECPM: 42.50, ecpmTrend: -12, roas: 5.2, status: "optimizing" },
      { id: "ttd", name: "The Trade Desk", spend: 32000, currentECPM: 38.20, ecpmTrend: -18, roas: 4.8, status: "saturated" },
      { id: "amazon", name: "Amazon DSP", spend: 23000, currentECPM: 51.30, ecpmTrend: -5, roas: 4.2, status: "scaling" },
    ],
    topDataSources: [
      { id: "whoop", name: "Whoop Fitness Data", cacReduction: 12.30, percentage: 41 },
      { id: "liveramp", name: "LiveRamp Identity Graph", cacReduction: 8.70, percentage: 29 },
      { id: "precise", name: "Precise AI Model", cacReduction: 6.50, percentage: 22 },
    ],
  },
  {
    id: "2",
    name: "Adidas Morning Warriors",
    status: "active",
    currentCAC: 42.80,
    previousCAC: 52.30,
    targetCAC: 35.00,
    ltv: 145.20,
    spend: 75000,
    revenue: 340000,
    roas: 4.5,
    dsps: ["madhive", "ttd"],
  },
];

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);
  const [showDetails, setShowDetails] = useState(false);

  const totalSpend = mockCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const avgROAS = mockCampaigns.reduce((sum, c) => sum + c.roas, 0) / mockCampaigns.length;
  const avgCAC = mockCampaigns.reduce((sum, c) => sum + c.currentCAC, 0) / mockCampaigns.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-gray mb-2">Campaign Command Center</h1>
          <p className="text-medium-gray">
            Monitor and optimize your campaigns across all DSPs
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Target className="text-brand-green" size={24} />
            <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
              -34.3%
            </span>
          </div>
          <p className="text-sm text-medium-gray mb-1">Portfolio CAC</p>
          <p className="text-2xl font-bold text-dark-gray">${avgCAC.toFixed(2)}</p>
          <p className="text-xs text-medium-gray">was $47.50</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-bright-purple" size={24} />
            <span className="text-xs bg-bright-purple/10 text-bright-purple px-2 py-1 rounded-full">
              +50%
            </span>
          </div>
          <p className="text-sm text-medium-gray mb-1">Blended LTV:CAC</p>
          <p className="text-2xl font-bold text-dark-gray">4.2:1</p>
          <p className="text-xs text-medium-gray">was 2.8:1</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-electric-blue" size={24} />
          </div>
          <p className="text-sm text-medium-gray mb-1">Total Spend</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${(totalSpend / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-medium-gray">This month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-brand-green" size={24} />
          </div>
          <p className="text-sm text-medium-gray mb-1">Avg ROAS</p>
          <p className="text-2xl font-bold text-dark-gray">{avgROAS.toFixed(1)}x</p>
          <p className="text-xs text-brand-green">All campaigns</p>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-brand-green/10 to-bright-purple/10 rounded-xl p-6 border border-brand-green/20">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark-gray mb-2 flex items-center gap-2">
              💡 AI-Powered Optimizations
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <p className="text-sm text-dark-gray">
                  Add "Premium Fitness Enthusiasts" cohort to Nike campaign for projected -$8.20 CAC reduction
                </p>
                <button className="ml-auto btn-primary text-sm">Apply</button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <p className="text-sm text-dark-gray">
                  Shift 30% budget to 6-8am targeting based on attribution data showing 3.2x higher conversion
                </p>
                <button className="ml-auto btn-secondary text-sm">Test</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCampaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedCampaign(campaign);
              setShowDetails(true);
            }}
          >
            {/* Campaign Header */}
            <div className="p-6 border-b border-silk-gray">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-1">
                    {campaign.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-medium-gray">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-brand-green rounded-full" />
                      Active
                    </span>
                    <span>•</span>
                    <span>{campaign.dsps?.length || 0} DSPs</span>
                  </div>
                </div>
                <ChevronRight className="text-medium-gray" size={20} />
              </div>

              {/* CAC/LTV Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-medium-gray mb-1">CAC</p>
                  <p className="text-2xl font-bold text-dark-gray">
                    ${campaign.currentCAC.toFixed(2)}
                  </p>
                  <p className="text-xs text-brand-green">
                    -${(campaign.previousCAC - campaign.currentCAC).toFixed(2)} ({((campaign.previousCAC - campaign.currentCAC) / campaign.previousCAC * 100).toFixed(0)}%)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-medium-gray mb-1">LTV:CAC</p>
                  <p className="text-2xl font-bold text-dark-gray">
                    {(campaign.ltv / campaign.currentCAC).toFixed(1)}:1
                  </p>
                  <p className="text-xs text-medium-gray">
                    LTV ${campaign.ltv.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Chart */}
            {campaign.cacHistory && (
              <div className="p-6">
                <p className="text-sm font-medium text-dark-gray mb-3">CAC Trend (30 days)</p>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={campaign.cacHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1DB954" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {campaign.preciseLaunchDate && (
                  <div className="mt-3 text-xs text-medium-gray text-center">
                    ↑ Precise data activated
                  </div>
                )}
              </div>
            )}

            {/* DSP Performance */}
            {campaign.dspBreakdown && (
              <div className="px-6 pb-6">
                <p className="text-sm font-medium text-dark-gray mb-3">DSP Performance</p>
                <div className="space-y-2">
                  {campaign.dspBreakdown.map((dsp) => (
                    <div key={dsp.id} className="flex items-center justify-between">
                      <span className="text-sm text-dark-gray">{dsp.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-medium-gray">
                          ${dsp.currentECPM} eCPM
                        </span>
                        <span className={`text-xs ${
                          dsp.ecpmTrend < 0 ? "text-warm-coral" : "text-brand-green"
                        }`}>
                          {dsp.ecpmTrend}%
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          dsp.status === "scaling" 
                            ? "bg-brand-green/10 text-brand-green"
                            : dsp.status === "optimizing"
                            ? "bg-electric-blue/10 text-electric-blue"
                            : "bg-warm-coral/10 text-warm-coral"
                        }`}>
                          {dsp.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}