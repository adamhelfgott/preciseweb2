'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, DollarSign, AlertTriangle } from 'lucide-react';

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

const opportunities: DSPOpportunity[] = [
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

export default function DSPArbitrage() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">DSP Arbitrage Opportunities</h3>
          <p className="text-sm text-gray-600 mt-1">AI-detected budget optimization across platforms</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="font-medium">2 opportunities</span>
        </div>
      </div>

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
                <span>{opp.confidence}%</span>
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