"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, TrendingUp, DollarSign, Users, Info } from "lucide-react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";
import ShapleyValueVisualization from "@/components/app/visualizations/ShapleyValueVisualization";

// Mock attribution data
const sankeyData = {
  nodes: [
    { name: "Fitness Activity Events" },
    { name: "User Demographics" },
    { name: "Location Context" },
    { name: "Nike Summer Campaign" },
    { name: "Adidas Morning Warriors" },
    { name: "Under Armour Premium" },
    { name: "Conversions" },
  ],
  links: [
    { source: 0, target: 3, value: 12300 },
    { source: 0, target: 4, value: 8700 },
    { source: 0, target: 5, value: 6500 },
    { source: 1, target: 3, value: 5400 },
    { source: 1, target: 4, value: 3200 },
    { source: 1, target: 5, value: 2600 },
    { source: 2, target: 3, value: 2100 },
    { source: 2, target: 4, value: 1800 },
    { source: 3, target: 6, value: 19800 },
    { source: 4, target: 6, value: 13700 },
    { source: 5, target: 6, value: 9100 },
  ],
};

// Mock campaign attribution details
const campaignAttributions = [
  {
    id: "1",
    campaign: "Nike Summer Fitness",
    totalValue: 40000,
    contributors: [
      { name: "Fitness Activity Events", percentage: 41, value: 16400, cacReduction: 12.30 },
      { name: "User Demographics", percentage: 29, value: 11600, cacReduction: 8.70 },
      { name: "Location Context", percentage: 22, value: 8800, cacReduction: 6.60 },
      { name: "Precise AI Model", percentage: 8, value: 3200, cacReduction: 2.40 },
    ],
  },
  {
    id: "2",
    campaign: "Adidas Morning Warriors",
    totalValue: 28000,
    contributors: [
      { name: "Fitness Activity Events", percentage: 45, value: 12600, cacReduction: 9.45 },
      { name: "User Demographics", percentage: 32, value: 8960, cacReduction: 6.72 },
      { name: "Location Context", percentage: 23, value: 6440, cacReduction: 4.83 },
    ],
  },
];

export default function AttributionPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaignAttributions[0]);
  const [timeRange, setTimeRange] = useState("30d");

  const totalAttributedValue = campaignAttributions.reduce((sum, c) => sum + c.totalValue, 0);
  const avgContribution = Math.round(totalAttributedValue / campaignAttributions.length / 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-gray mb-2">Attribution</h1>
        <p className="text-medium-gray">
          See how your data contributes to campaign success
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <GitBranch className="text-brand-green" size={24} />
          </div>
          <p className="text-sm text-medium-gray mb-1">Total Attributed Value</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${totalAttributedValue.toLocaleString()}
          </p>
          <p className="text-xs text-brand-green mt-1">Last 30 days</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-bright-purple" size={24} />
          </div>
          <p className="text-sm text-medium-gray mb-1">Avg CAC Reduction</p>
          <p className="text-2xl font-bold text-dark-gray">
            $8.70
          </p>
          <p className="text-xs text-bright-purple mt-1">-31% improvement</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="text-electric-blue" size={24} />
          </div>
          <p className="text-sm text-medium-gray mb-1">Active Campaigns</p>
          <p className="text-2xl font-bold text-dark-gray">
            47
          </p>
          <p className="text-xs text-electric-blue mt-1">Using your data</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-brand-green" size={24} />
          </div>
          <p className="text-sm text-medium-gray mb-1">Your Share</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${Math.round(totalAttributedValue * 0.45).toLocaleString()}
          </p>
          <p className="text-xs text-medium-gray mt-1">45% after fees</p>
        </motion.div>
      </div>

      {/* Attribution Flow Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-dark-gray mb-1">Value Flow</h2>
            <p className="text-sm text-medium-gray">How your data flows through campaigns to create value</p>
          </div>
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

        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={sankeyData}
              node={{
                fill: "#1D1D1F",
                fillOpacity: 0.8,
              }}
              link={{
                stroke: "#1DB954",
                strokeOpacity: 0.3,
              }}
              nodeWidth={20}
              nodePadding={20}
              margin={{ top: 20, right: 150, bottom: 20, left: 150 }}
            >
              <Tooltip />
            </Sankey>
          </ResponsiveContainer>
        </div>

        <div className="bg-light-gray rounded-lg p-4 flex items-start gap-3">
          <Info size={20} className="text-medium-gray mt-0.5" />
          <div>
            <p className="text-sm font-medium text-dark-gray mb-1">
              Understanding Shapley Value Attribution
            </p>
            <p className="text-sm text-medium-gray">
              Each data source receives fair compensation based on their marginal contribution to campaign success. 
              The algorithm considers all possible combinations to ensure mathematical fairness in value distribution.
            </p>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-4">Top Campaigns</h2>
          <div className="space-y-3">
            {campaignAttributions.map((campaign) => (
              <button
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedCampaign.id === campaign.id
                    ? "border-brand-green bg-brand-green/5"
                    : "border-silk-gray hover:border-medium-gray"
                }`}
              >
                <p className="font-medium text-dark-gray mb-1">{campaign.campaign}</p>
                <p className="text-sm text-medium-gray mb-2">
                  {campaign.contributors.length} data sources
                </p>
                <p className="text-lg font-semibold text-brand-green">
                  ${campaign.totalValue.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Attribution Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-silk-gray p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-6">
            Attribution Breakdown: {selectedCampaign.campaign}
          </h2>

          <div className="space-y-4">
            {selectedCampaign.contributors.map((contributor, index) => (
              <motion.div
                key={contributor.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-silk-gray rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-dark-gray">{contributor.name}</h3>
                    <p className="text-sm text-medium-gray">
                      CAC Reduction: -${contributor.cacReduction}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-green">
                      {contributor.percentage}%
                    </p>
                    <p className="text-sm text-medium-gray">
                      ${contributor.value.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="w-full bg-light-gray rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${contributor.percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-brand-green h-3 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shapley Value Explanation */}
          <div className="mt-6 p-4 bg-brand-green/5 border border-brand-green/20 rounded-lg">
            <h4 className="font-medium text-dark-gray mb-2">Your Earnings Calculation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-medium-gray">Campaign Value</span>
                <span className="font-medium text-dark-gray">
                  ${selectedCampaign.totalValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Your Contribution</span>
                <span className="font-medium text-dark-gray">
                  {selectedCampaign.contributors[0].percentage + selectedCampaign.contributors[1].percentage}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Precise Fee (45%)</span>
                <span className="font-medium text-dark-gray">
                  -${Math.round(selectedCampaign.totalValue * 0.45).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Network Fee (10%)</span>
                <span className="font-medium text-dark-gray">
                  -${Math.round(selectedCampaign.totalValue * 0.10).toLocaleString()}
                </span>
              </div>
              <div className="border-t border-brand-green/20 pt-2 flex justify-between">
                <span className="font-medium text-dark-gray">Your Earnings</span>
                <span className="font-bold text-brand-green text-lg">
                  ${Math.round(selectedCampaign.totalValue * 0.45).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shapley Value Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <ShapleyValueVisualization />
      </motion.div>
    </div>
  );
}