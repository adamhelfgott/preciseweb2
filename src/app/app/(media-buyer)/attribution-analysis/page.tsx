"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import AttributionModelComparison from "@/components/app/attribution/AttributionModelComparison";
import ChannelAttribution from "@/components/app/attribution/ChannelAttribution";
import ConversionPaths from "@/components/app/attribution/ConversionPaths";
import { BarChart3, GitBranch, TrendingUp, Filter } from "lucide-react";

export default function AttributionAnalysisPage() {
  const { user } = useAuth();
  const [selectedModel, setSelectedModel] = useState<"last-click" | "data-driven" | "mixed">("mixed");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Fetch campaigns from Convex
  const campaigns = useQuery(api.campaigns.getCampaigns, 
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Initialize selected campaign
  useEffect(() => {
    if (!selectedCampaignId && campaigns && campaigns.length > 0) {
      // Look for "Ticket Sales 2025" campaign first
      const ticketSalesCampaign = campaigns.find((c: any) => 
        c.name === "Ticket Sales 2025"
      );
      
      if (ticketSalesCampaign) {
        setSelectedCampaignId(ticketSalesCampaign._id);
      } else {
        // Fall back to first campaign if not found
        setSelectedCampaignId(campaigns[0]._id);
      }
    }
  }, [campaigns, selectedCampaignId]);

  // Get the selected campaign object
  const selectedCampaign = campaigns?.find((c: any) => c._id === selectedCampaignId);

  // Loading state
  if (!user || !convexUser || !campaigns) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto mb-4"></div>
          <p className="text-medium-gray">Loading attribution data...</p>
        </div>
      </div>
    );
  }

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
              value={selectedCampaignId || ''}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="w-full px-4 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            >
              {!selectedCampaignId && <option value="">Select a campaign</option>}
              {campaigns.map((campaign: any) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.name}
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
        <AttributionModelComparison campaign={selectedCampaign?.name} campaignId={selectedCampaignId} />
      </motion.div>

      {/* Channel Attribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ChannelAttribution campaign={selectedCampaign?.name} campaignId={selectedCampaignId} model={selectedModel} />
      </motion.div>

      {/* Conversion Paths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ConversionPaths campaign={selectedCampaign?.name} campaignId={selectedCampaignId} model={selectedModel} />
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
            <h3 className="font-semibold text-dark-gray mb-2">Attribution Insights for {selectedCampaign?.name || 'Campaign'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-dark-gray mb-2">Cross-Channel Impact</h4>
                <p className="text-sm text-medium-gray mb-2">
                  {selectedCampaign?.name === "Ticket Sales 2025" 
                    ? "Strong synergy between social media and search channels drives ticket purchases."
                    : "Your campaigns show strong synergy effects between YouTube and Meta channels."}
                </p>
                <p className="text-sm font-medium text-indigo-600">
                  {selectedCampaign?.name === "Ticket Sales 2025" ? "+34%" : "+23%"} when combined
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-dark-gray mb-2">Attribution Drift</h4>
                <p className="text-sm text-medium-gray mb-2">
                  {selectedCampaign?.name === "Ticket Sales 2025"
                    ? "Last-click is missing early awareness touchpoints from sports content sites."
                    : "Last-click attribution is under-crediting your upper-funnel investments."}
                </p>
                <p className="text-sm font-medium text-indigo-600">
                  {selectedCampaign?.name === "Ticket Sales 2025" ? "-28%" : "-31%"} {selectedCampaign?.name === "Ticket Sales 2025" ? "sports media" : "YouTube"} value
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-dark-gray mb-2">Optimization Opportunity</h4>
                <p className="text-sm text-medium-gray mb-2">
                  {selectedCampaign?.name === "Ticket Sales 2025"
                    ? "Increase budget on game-day targeting and retargeting campaigns."
                    : "Shifting 15% budget to assisted channels could improve overall ROAS."}
                </p>
                <p className="text-sm font-medium text-indigo-600">
                  {selectedCampaign?.name === "Ticket Sales 2025" ? "+42%" : "+18%"} projected ROAS
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}