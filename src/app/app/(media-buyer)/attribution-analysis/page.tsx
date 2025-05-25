"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AttributionModelComparison from "@/components/app/attribution/AttributionModelComparison";
import ChannelAttribution from "@/components/app/attribution/ChannelAttribution";
import ConversionPaths from "@/components/app/attribution/ConversionPaths";
import { BarChart3, GitBranch, TrendingUp, Filter } from "lucide-react";

export default function AttributionAnalysisPage() {
  const [selectedModel, setSelectedModel] = useState<"last-click" | "data-driven" | "mixed">("mixed");
  const [selectedCampaign, setSelectedCampaign] = useState("Nike Summer Fitness 2025");

  const campaigns = [
    "Nike Summer Fitness 2025",
    "Adidas Morning Warriors",
    "Under Armour Elite Performance",
    "Lululemon Mindful Movement"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-gray mb-2">Attribution Analysis</h1>
          <p className="text-sm sm:text-base text-medium-gray">
            Understand the true impact of every touchpoint with advanced attribution modeling
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Selection */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Campaign
            </label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full px-4 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            >
              {campaigns.map((campaign) => (
                <option key={campaign} value={campaign}>
                  {campaign}
                </option>
              ))}
            </select>
          </div>

          {/* Attribution Model */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Attribution Model
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedModel("last-click")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedModel === "last-click"
                    ? "bg-dark-gray text-white"
                    : "bg-light-gray text-medium-gray hover:bg-silk-gray"
                }`}
              >
                Last-Click
              </button>
              <button
                onClick={() => setSelectedModel("data-driven")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedModel === "data-driven"
                    ? "bg-dark-gray text-white"
                    : "bg-light-gray text-medium-gray hover:bg-silk-gray"
                }`}
              >
                Data-Driven
              </button>
              <button
                onClick={() => setSelectedModel("mixed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedModel === "mixed"
                    ? "bg-dark-gray text-white"
                    : "bg-light-gray text-medium-gray hover:bg-silk-gray"
                }`}
              >
                Marketing Mix Model
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Model Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AttributionModelComparison campaign={selectedCampaign} />
      </motion.div>

      {/* Channel Attribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ChannelAttribution campaign={selectedCampaign} model={selectedModel} />
      </motion.div>

      {/* Conversion Paths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ConversionPaths campaign={selectedCampaign} model={selectedModel} />
      </motion.div>

      {/* Attribution Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
      >
        <div className="flex items-start gap-3">
          <BarChart3 className="w-6 h-6 text-indigo-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-dark-gray mb-2">Attribution Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-dark-gray mb-2">Cross-Channel Impact</h4>
                <p className="text-sm text-medium-gray mb-2">
                  Your campaigns show strong synergy effects between YouTube and Meta channels.
                </p>
                <p className="text-sm font-medium text-indigo-600">+23% when combined</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-dark-gray mb-2">Attribution Drift</h4>
                <p className="text-sm text-medium-gray mb-2">
                  Last-click attribution is under-crediting your upper-funnel investments.
                </p>
                <p className="text-sm font-medium text-indigo-600">-31% YouTube value</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-dark-gray mb-2">Optimization Opportunity</h4>
                <p className="text-sm text-medium-gray mb-2">
                  Shifting 15% budget to assisted channels could improve overall ROAS.
                </p>
                <p className="text-sm font-medium text-indigo-600">+18% projected ROAS</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}