"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { TrendingUp, DollarSign, Target, Activity, Plus, ChevronRight, Brain, Layers, LayoutGrid, BarChart3, Image as ImageIcon } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import CreativeCarousel from "@/components/app/campaigns/CreativeCarousel";
import DSPArbitrage from "@/components/app/campaigns/DSPArbitrage";
import MultiTouchAttribution from "@/components/app/campaigns/MultiTouchAttribution";
import CampaignHealthMonitor from "@/components/app/campaigns/CampaignHealthMonitor";
import BudgetPacing from "@/components/app/campaigns/BudgetPacing";
import AudienceInsights from "@/components/app/campaigns/AudienceInsights";
import CreativeFatigueAlert from "@/components/app/campaigns/CreativeFatigueAlert";
import PredictiveCACForecasting from "@/components/app/campaigns/PredictiveCACForecasting";
import CustomAttributionWindows from "@/components/app/campaigns/CustomAttributionWindows";
import IncrementalityTesting from "@/components/app/campaigns/IncrementalityTesting";
import CompetitiveIntelligence from "@/components/app/campaigns/CompetitiveIntelligence";
import { Campaign } from '@/services/DataService';

interface CampaignsClientProps {
  initialCampaigns: Campaign[];
}

export default function CampaignsClient({ initialCampaigns }: CampaignsClientProps) {
  const searchParams = useSearchParams();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [activeView, setActiveView] = useState<"overview" | "health" | "budget" | "audience" | "creatives">("overview");

  // Calculate portfolio metrics
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.metrics?.spend || 0), 0);
  const avgROAS = campaigns.reduce((sum, c) => sum + ((c.metrics?.revenue || 0) / (c.metrics?.spend || 1)), 0) / campaigns.length;
  const avgCAC = campaigns.reduce((sum, c) => {
    const cac = (c.metrics?.spend || 0) / (c.metrics?.conversions || 1);
    return sum + cac;
  }, 0) / campaigns.length;

  // Handle campaign selection from URL
  useEffect(() => {
    const campaignId = searchParams.get('campaign');
    if (campaignId) {
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        setSelectedCampaign(campaign);
        setShowDetails(true);
        setTimeout(() => {
          const element = document.getElementById('campaign-details');
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [searchParams, campaigns]);

  return (
    <div>
      <CreativeFatigueAlert />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-gray mb-2">Ad Ops Command Center</h1>
            <p className="text-sm sm:text-base text-medium-gray">
              AI-powered campaign optimization with Precise data infrastructure
            </p>
          </div>
          <button className="btn-primary w-full sm:w-auto">
            <Plus size={20} />
            New Campaign
          </button>
        </div>

        {/* View Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveView("overview")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeView === "overview"
                ? "bg-dark-gray text-white"
                : "bg-white border border-light-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            <LayoutGrid className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveView("creatives")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeView === "creatives"
                ? "bg-dark-gray text-white"
                : "bg-white border border-light-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Creatives
          </button>
          <button
            onClick={() => setActiveView("health")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeView === "health"
                ? "bg-dark-gray text-white"
                : "bg-white border border-light-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Health Monitor
          </button>
          <button
            onClick={() => setActiveView("budget")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeView === "budget"
                ? "bg-dark-gray text-white"
                : "bg-white border border-light-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            Budget Pacing
          </button>
          <button
            onClick={() => setActiveView("audience")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeView === "audience"
                ? "bg-dark-gray text-white"
                : "bg-white border border-light-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Audiences
          </button>
        </div>

        {/* View Content */}
        {activeView === "overview" && (
          <>
            {/* Portfolio Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                <p className="text-xs sm:text-sm text-medium-gray mb-1">Portfolio CAC</p>
                <p className="text-xl sm:text-2xl font-bold text-dark-gray">${avgCAC.toFixed(2)}</p>
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
                <p className="text-sm text-medium-gray mb-1">Avg ROAS</p>
                <p className="text-2xl font-bold text-dark-gray">{avgROAS.toFixed(1)}x</p>
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
                <p className="text-sm text-medium-gray mb-1">Active Campaigns</p>
                <p className="text-2xl font-bold text-dark-gray">{campaigns.length}</p>
              </motion.div>
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
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
                  <div className="p-4 sm:p-6 border-b border-silk-gray">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-dark-gray mb-1">
                          {campaign.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-medium-gray">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-brand-green rounded-full" />
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-medium-gray hidden sm:block" size={20} />
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-medium-gray mb-1">Spend</p>
                        <p className="text-xl font-bold text-dark-gray">
                          ${((campaign.metrics?.spend || 0) / 1000).toFixed(1)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-medium-gray mb-1">ROAS</p>
                        <p className="text-xl font-bold text-dark-gray">
                          {((campaign.metrics?.revenue || 0) / (campaign.metrics?.spend || 1)).toFixed(1)}x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Creative Preview Section */}
                  {campaign.properties?.creatives && campaign.properties.creatives.length > 0 && (
                    <div className="p-4">
                      <p className="text-sm font-medium text-dark-gray mb-3">Active Creatives</p>
                      <div className="grid grid-cols-3 gap-2">
                        {campaign.properties.creatives.slice(0, 3).map((creative: any, idx: number) => (
                          <div key={idx} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                              {creative.thumbnail || creative.url ? (
                                <img 
                                  src={creative.thumbnail || creative.url}
                                  alt={creative.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                              
                              {/* Fatigue Indicator */}
                              {creative.fatigue_score > 7 && (
                                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                                  {creative.fatigue_score}/10
                                </div>
                              )}
                              
                              {/* CTR Badge */}
                              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                {creative.ctr}% CTR
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {campaign.properties.creatives.length > 3 && (
                        <p className="text-xs text-medium-gray mt-2 text-center">
                          +{campaign.properties.creatives.length - 3} more creatives
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Creatives View */}
        {activeView === "creatives" && (
          <div className="space-y-6">
            <CreativeCarousel campaigns={campaigns} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DSPArbitrage />
              <MultiTouchAttribution />
            </div>
          </div>
        )}

        {/* Other Views */}
        {activeView === "health" && <CampaignHealthMonitor />}
        {activeView === "budget" && <BudgetPacing />}
        {activeView === "audience" && <AudienceInsights />}
      </div>
    </div>
  );
}