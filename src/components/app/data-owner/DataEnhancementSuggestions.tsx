"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Database, TrendingUp, Lock, ChevronRight, DollarSign, Users, Zap, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Enhancement {
  id: string;
  title: string;
  description: string;
  dataType: string;
  effort: "low" | "medium" | "high";
  impact: {
    revenueIncrease: number;
    demandIncrease: number;
    qualityScore: number;
  };
  requirements: string[];
  estimatedTime: string;
  category: "enrich" | "expand" | "quality" | "compliance";
}

interface DataAssetContext {
  name: string;
  currentValue: number;
  potentialValue: number;
  activeEnhancements: number;
}

const SUGGESTED_ENHANCEMENTS: Enhancement[] = [
  {
    id: "1",
    title: "Add Real-Time Heart Rate Data",
    description: "Integrate continuous heart rate monitoring to fitness events for premium health segments",
    dataType: "Fitness Activity Events",
    effort: "medium",
    impact: {
      revenueIncrease: 35,
      demandIncrease: 45,
      qualityScore: 15
    },
    requirements: [
      "API integration with wearable devices",
      "User consent for health data",
      "HIPAA compliance certification"
    ],
    estimatedTime: "2-3 weeks",
    category: "enrich"
  },
  {
    id: "2",
    title: "Demographic Enrichment with ML",
    description: "Use machine learning to predict missing age and income demographics",
    dataType: "User Demographics",
    effort: "low",
    impact: {
      revenueIncrease: 22,
      demandIncrease: 18,
      qualityScore: 25
    },
    requirements: [
      "ML model training on existing data",
      "Validation against known segments",
      "90%+ accuracy threshold"
    ],
    estimatedTime: "1 week",
    category: "quality"
  },
  {
    id: "3",
    title: "Location Visit Frequency",
    description: "Add visit frequency and dwell time to location events for retail insights",
    dataType: "Location Context",
    effort: "low",
    impact: {
      revenueIncrease: 28,
      demandIncrease: 32,
      qualityScore: 12
    },
    requirements: [
      "Timestamp aggregation logic",
      "Privacy-safe clustering algorithm",
      "Venue categorization mapping"
    ],
    estimatedTime: "3-5 days",
    category: "enrich"
  },
  {
    id: "4",
    title: "Cross-Device Identity Graph",
    description: "Link user activities across devices for holistic customer view",
    dataType: "All Assets",
    effort: "high",
    impact: {
      revenueIncrease: 55,
      demandIncrease: 60,
      qualityScore: 20
    },
    requirements: [
      "Deterministic matching algorithm",
      "Privacy-preserving ID system",
      "Integration with identity providers"
    ],
    estimatedTime: "4-6 weeks",
    category: "expand"
  },
  {
    id: "5",
    title: "Predictive Churn Indicators",
    description: "Add ML-based churn probability scores to user profiles",
    dataType: "User Demographics",
    effort: "medium",
    impact: {
      revenueIncrease: 42,
      demandIncrease: 38,
      qualityScore: 18
    },
    requirements: [
      "Historical behavior analysis",
      "Churn model development",
      "Weekly score updates"
    ],
    estimatedTime: "2-3 weeks",
    category: "enrich"
  },
  {
    id: "6",
    title: "GDPR Auto-Compliance Layer",
    description: "Automatic data anonymization and consent management",
    dataType: "All Assets",
    effort: "medium",
    impact: {
      revenueIncrease: 15,
      demandIncrease: 25,
      qualityScore: 30
    },
    requirements: [
      "Consent management system",
      "Automated PII detection",
      "Audit trail implementation"
    ],
    estimatedTime: "3-4 weeks",
    category: "compliance"
  }
];

const ASSET_CONTEXTS: DataAssetContext[] = [
  {
    name: "Fitness Activity Events",
    currentValue: 23400,
    potentialValue: 38500,
    activeEnhancements: 1
  },
  {
    name: "User Demographics",
    currentValue: 11200,
    potentialValue: 19800,
    activeEnhancements: 0
  },
  {
    name: "Location Context",
    currentValue: 8900,
    potentialValue: 14200,
    activeEnhancements: 2
  }
];

export default function DataEnhancementSuggestions() {
  const [selectedEnhancement, setSelectedEnhancement] = useState<Enhancement | null>(null);
  const [implementingIds, setImplementingIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredEnhancements = SUGGESTED_ENHANCEMENTS.filter(
    e => filterCategory === "all" || e.category === filterCategory
  );

  const handleImplement = (enhancementId: string) => {
    setImplementingIds([...implementingIds, enhancementId]);
    setTimeout(() => {
      setImplementingIds(prev => prev.filter(id => id !== enhancementId));
    }, 2000);
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "low": return "text-brand-green bg-brand-green/10";
      case "medium": return "text-electric-blue bg-electric-blue/10";
      case "high": return "text-vibrant-orange bg-vibrant-orange/10";
      default: return "text-medium-gray bg-light-gray";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "enrich": return <Plus className="w-4 h-4" />;
      case "expand": return <Database className="w-4 h-4" />;
      case "quality": return <Sparkles className="w-4 h-4" />;
      case "compliance": return <Lock className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const totalPotentialRevenue = ASSET_CONTEXTS.reduce((sum, asset) => 
    sum + (asset.potentialValue - asset.currentValue), 0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-bright-purple/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-bright-purple" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Data Enhancement Suggestions</h2>
            <p className="text-sm text-medium-gray">AI-powered recommendations to increase data value</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-brand-green">
            +${(totalPotentialRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-sm text-medium-gray">Potential monthly revenue</p>
        </div>
      </div>

      {/* Asset Value Overview */}
      <div className="bg-gradient-to-r from-bright-purple/10 to-electric-blue/10 rounded-lg p-6 mb-6">
        <h3 className="font-medium text-dark-gray mb-4">Revenue Potential by Asset</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ASSET_CONTEXTS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis dataKey="name" stroke="#86868B" tick={{ fontSize: 12 }} />
              <YAxis stroke="#86868B" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
              <Bar dataKey="currentValue" fill="#86868B" name="Current Value" />
              <Bar dataKey="potentialValue" fill="#7B4FFF" name="Potential Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filterCategory === "all"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          All Suggestions
        </button>
        {["enrich", "expand", "quality", "compliance"].map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              filterCategory === category
                ? "bg-dark-gray text-white"
                : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Enhancement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {filteredEnhancements.map((enhancement) => (
          <motion.div
            key={enhancement.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-light-gray rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedEnhancement(enhancement)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  enhancement.category === "enrich" ? "bg-brand-green/10" :
                  enhancement.category === "expand" ? "bg-electric-blue/10" :
                  enhancement.category === "quality" ? "bg-bright-purple/10" :
                  "bg-warm-coral/10"
                }`}>
                  {getCategoryIcon(enhancement.category)}
                </div>
                <div>
                  <h3 className="font-medium text-dark-gray">{enhancement.title}</h3>
                  <p className="text-xs text-medium-gray mt-1">{enhancement.dataType}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getEffortColor(enhancement.effort)}`}>
                {enhancement.effort} effort
              </span>
            </div>

            <p className="text-sm text-medium-gray mb-4">{enhancement.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-brand-green">+{enhancement.impact.revenueIncrease}%</p>
                <p className="text-xs text-medium-gray">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-electric-blue">+{enhancement.impact.demandIncrease}%</p>
                <p className="text-xs text-medium-gray">Demand</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-bright-purple">+{enhancement.impact.qualityScore}</p>
                <p className="text-xs text-medium-gray">Quality</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-medium-gray">{enhancement.estimatedTime}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleImplement(enhancement.id);
                }}
                disabled={implementingIds.includes(enhancement.id)}
                className="bg-bright-purple text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {implementingIds.includes(enhancement.id) ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Implementing
                  </>
                ) : (
                  <>
                    <Zap className="w-3 h-3" />
                    Quick Start
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedEnhancement && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedEnhancement(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-dark-gray">{selectedEnhancement.title}</h2>
                  <p className="text-medium-gray">{selectedEnhancement.dataType}</p>
                </div>
                <button
                  onClick={() => setSelectedEnhancement(null)}
                  className="p-2 hover:bg-light-gray rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <p className="text-medium-gray mb-6">{selectedEnhancement.description}</p>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-brand-green/10 rounded-lg p-4 text-center">
                  <DollarSign className="w-8 h-8 text-brand-green mx-auto mb-2" />
                  <p className="text-2xl font-bold text-dark-gray">+{selectedEnhancement.impact.revenueIncrease}%</p>
                  <p className="text-sm text-medium-gray">Revenue Increase</p>
                </div>
                <div className="bg-electric-blue/10 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-dark-gray">+{selectedEnhancement.impact.demandIncrease}%</p>
                  <p className="text-sm text-medium-gray">Demand Increase</p>
                </div>
                <div className="bg-bright-purple/10 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-bright-purple mx-auto mb-2" />
                  <p className="text-2xl font-bold text-dark-gray">+{selectedEnhancement.impact.qualityScore}</p>
                  <p className="text-sm text-medium-gray">Quality Score</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="font-medium text-dark-gray mb-3">Implementation Requirements</h3>
                <ul className="space-y-2">
                  {selectedEnhancement.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-medium-gray">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline */}
              <div className="bg-light-gray rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-dark-gray">Estimated Timeline</p>
                    <p className="text-sm text-medium-gray">{selectedEnhancement.estimatedTime}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getEffortColor(selectedEnhancement.effort)}`}>
                    {selectedEnhancement.effort} effort
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleImplement(selectedEnhancement.id);
                    setSelectedEnhancement(null);
                  }}
                  className="flex-1 bg-bright-purple text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Start Implementation
                </button>
                <button
                  onClick={() => setSelectedEnhancement(null)}
                  className="flex-1 bg-white text-dark-gray py-3 rounded-lg border border-silk-gray hover:bg-light-gray transition-colors"
                >
                  View Implementation Guide
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-electric-blue/10 to-bright-purple/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-dark-gray">Automated Enhancement Pipeline</p>
            <p className="text-sm text-medium-gray">Let AI continuously improve your data quality</p>
          </div>
          <button className="bg-dark-gray text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Enable Auto-Enhance
          </button>
        </div>
      </div>
    </div>
  );
}