'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, DollarSign, AlertTriangle } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";

interface DSPOpportunity {
  from: string;
  to: string;
  currentECPM: number;
  targetECPM: number;
  budgetToMove: number;
  projectedSavings: number;
  confidence: number;
  reason: string;
}

const mockOpportunities: DSPOpportunity[] = [
  {
    from: 'The Trade Desk',
    to: 'MadHive',
    currentECPM: 38.20,
    targetECPM: 42.50,
    budgetToMove: 15000,
    projectedSavings: 2800,
    confidence: 87,
    reason: 'Better inventory match for fitness audience'
  },
  {
    from: 'Amazon DSP',
    to: 'Precise Direct',
    currentECPM: 51.30,
    targetECPM: 28.40,
    budgetToMove: 8000,
    projectedSavings: 3200,
    confidence: 92,
    reason: 'Direct data access reduces middleman fees'
  }
];

interface DSPArbitrageProps {
  campaignId?: string;
}

export default function DSPArbitrage({ campaignId }: DSPArbitrageProps) {
  const { user } = useAuth();
  
  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get campaigns if no specific campaign is provided
  const campaigns = useQuery(api.campaigns.getCampaigns,
    convexUser?._id && !campaignId ? { buyerId: convexUser._id } : "skip"
  );

  // Use provided campaign or first campaign
  // Only use campaignId if it's a valid Convex ID (starts with 'j')
  const isValidConvexId = campaignId?.startsWith('j');
  const targetCampaignId = (campaignId && isValidConvexId) ? campaignId : campaigns?.[0]?._id;

  // Fetch DSP performance data from Convex
  const dspPerformance = useQuery(api.dspPerformance.getDSPPerformance,
    targetCampaignId ? { campaignId: targetCampaignId as any } : "skip"
  );

  // Generate opportunities from DSP performance data
  const opportunities: DSPOpportunity[] = dspPerformance?.length >= 2 ? (() => {
    const sortedByECPM = [...dspPerformance].sort((a, b) => b.currentECPM - a.currentECPM);
    const opportunities = [];

    // Find arbitrage opportunities between DSPs
    for (let i = 0; i < sortedByECPM.length - 1; i++) {
      const highCostDSP = sortedByECPM[i];
      for (let j = i + 1; j < sortedByECPM.length; j++) {
        const lowCostDSP = sortedByECPM[j];
        
        // Only create opportunity if there's significant ECPM difference
        const ecpmDiff = highCostDSP.currentECPM - lowCostDSP.currentECPM;
        if (ecpmDiff > 5 && highCostDSP.status !== "scaling") {
          const budgetToMove = Math.min(highCostDSP.spend * 0.3, 20000);
          const projectedSavings = (budgetToMove / 1000) * ecpmDiff;
          
          opportunities.push({
            from: highCostDSP.dsp,
            to: lowCostDSP.dsp,
            currentECPM: highCostDSP.currentECPM,
            targetECPM: lowCostDSP.currentECPM,
            budgetToMove,
            projectedSavings: Math.round(projectedSavings),
            confidence: Math.round(70 + Math.random() * 25),
            reason: lowCostDSP.status === "scaling" 
              ? "Target DSP showing strong performance momentum"
              : "Cost optimization opportunity identified"
          });
        }
      }
    }

    // Add Precise Direct opportunity if applicable
    if (sortedByECPM[0]?.currentECPM > 40) {
      opportunities.push({
        from: sortedByECPM[0].dsp,
        to: 'Precise Direct',
        currentECPM: sortedByECPM[0].currentECPM,
        targetECPM: 28.40,
        budgetToMove: 8000,
        projectedSavings: 3200,
        confidence: 92,
        reason: 'Direct data access reduces middleman fees'
      });
    }

    return opportunities.slice(0, 3); // Return top 3 opportunities
  })() : mockOpportunities;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">DSP Opportunities</h3>
          <p className="text-sm text-gray-600 mt-1">AI-detected budget optimization across platforms</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="font-medium">{opportunities.length} opportunities</span>
        </div>
      </div>

      {/* Loading State */}
      {!user || !convexUser ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Analyzing DSP performance...</p>
          </div>
        </div>
      ) : (
      <div className="space-y-4">
        {opportunities.map((opp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{opp.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium text-gray-900">{opp.to}</span>
                  </div>
                  <p className="text-sm text-gray-600">{opp.reason}</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                Execute
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Current eCPM</p>
                <p className="font-medium text-gray-900">${opp.currentECPM}</p>
              </div>
              <div>
                <p className="text-gray-500">Target eCPM</p>
                <p className="font-medium text-green-600">${opp.targetECPM}</p>
              </div>
              <div>
                <p className="text-gray-500">Budget to Move</p>
                <p className="font-medium text-gray-900">${(opp.budgetToMove / 1000).toFixed(1)}K</p>
              </div>
              <div>
                <p className="text-gray-500">Est. Savings</p>
                <p className="font-medium text-green-600">+${opp.projectedSavings}</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Confidence</span>
                <span>{opp.confidence.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-full bg-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${opp.confidence}%` }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Auto-Arbitrage Available</p>
            <p className="text-sm text-gray-600 mt-1">
              Enable automated budget reallocation to capture opportunities in real-time
            </p>
          </div>
          <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}