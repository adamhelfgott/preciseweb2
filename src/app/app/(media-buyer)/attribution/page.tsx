"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GitBranch, 
  TrendingUp, 
  Target, 
  BarChart3,
  Layers,
  Zap,
  Info
} from "lucide-react";
import ConversionPaths from "@/components/app/attribution/ConversionPaths";
import ChannelAttribution from "@/components/app/attribution/ChannelAttribution";
import AttributionModelComparison from "@/components/app/attribution/AttributionModelComparison";

export default function AttributionPage() {
  const [activeModel, setActiveModel] = useState<"shapley" | "data-driven" | "last-click">("shapley");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  const campaigns = [
    { id: "all", name: "All Campaigns" },
    { id: "nike", name: "Nike - Just Do It 2025" },
    { id: "tesla", name: "Tesla - Model S" },
    { id: "disney", name: "Disney+ - Magic Happens" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-gray mb-2">
            Attribution Intelligence
          </h1>
          <p className="text-sm sm:text-base text-medium-gray">
            Multi-touch attribution powered by Precise's verified data ecosystem
          </p>
        </div>
        
        {/* Campaign Selector */}
        <select
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
          className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-primary-orange"
        >
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <GitBranch className="w-5 h-5 text-primary-orange" />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              +23%
            </span>
          </div>
          <p className="text-sm text-medium-gray mb-1">Avg. Path Length</p>
          <p className="text-2xl font-bold text-dark-gray">4.2</p>
          <p className="text-xs text-medium-gray">touchpoints</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              +18%
            </span>
          </div>
          <p className="text-sm text-medium-gray mb-1">Conversion Rate</p>
          <p className="text-2xl font-bold text-dark-gray">5.8%</p>
          <p className="text-xs text-medium-gray">with Precise data</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-medium-gray mb-1">Attribution Lift</p>
          <p className="text-2xl font-bold text-dark-gray">31%</p>
          <p className="text-xs text-medium-gray">vs last-click</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Layers className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-sm text-medium-gray mb-1">Cross-Channel</p>
          <p className="text-2xl font-bold text-dark-gray">67%</p>
          <p className="text-xs text-medium-gray">of conversions</p>
        </motion.div>
      </div>

      {/* Attribution Model Selector */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Attribution Model Comparison
            </h3>
            <p className="text-sm text-white/80">
              Compare different attribution models to understand true channel value
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveModel("shapley")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeModel === "shapley"
                  ? "bg-white text-indigo-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Shapley Value
            </button>
            <button
              onClick={() => setActiveModel("data-driven")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeModel === "data-driven"
                  ? "bg-white text-indigo-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Data-Driven
            </button>
            <button
              onClick={() => setActiveModel("last-click")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeModel === "last-click"
                  ? "bg-white text-indigo-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Last-Click
            </button>
          </div>
        </div>
      </div>

      {/* Conversion Paths Visualization */}
      <ConversionPaths campaign={selectedCampaign} model={activeModel} />

      {/* Channel Attribution Breakdown */}
      <ChannelAttribution campaign={selectedCampaign} model={activeModel} />

      {/* Model Comparison */}
      <AttributionModelComparison campaign={selectedCampaign} />

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">
              Why Shapley Value Attribution?
            </h4>
            <p className="text-sm text-medium-gray mb-3">
              Shapley value attribution, borrowed from game theory, fairly distributes conversion credit 
              based on each touchpoint's marginal contribution. This method accounts for:
            </p>
            <ul className="text-sm text-medium-gray space-y-1 ml-4">
              <li>• Channel interactions and synergies</li>
              <li>• Order-independent contribution measurement</li>
              <li>• Fairness principles ensuring no channel is over/under-credited</li>
              <li>• Data quality and verification status through Precise's ecosystem</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}