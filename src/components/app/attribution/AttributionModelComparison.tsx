"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Calculator, Brain, MousePointer } from "lucide-react";

interface AttributionModelComparisonProps {
  campaign: string;
}

const COMPARISON_DATA = [
  {
    channel: "YouTube",
    "Last-Click": 8,
    "Data-Driven": 18,
    "Shapley Value": 20,
    difference: 150
  },
  {
    channel: "Display",
    "Last-Click": 3,
    "Data-Driven": 8,
    "Shapley Value": 12,
    difference: 300
  },
  {
    channel: "TikTok",
    "Last-Click": 5,
    "Data-Driven": 12,
    "Shapley Value": 15,
    difference: 200
  },
  {
    channel: "Google Search",
    "Last-Click": 35,
    "Data-Driven": 28,
    "Shapley Value": 22,
    difference: -37
  },
  {
    channel: "Meta",
    "Last-Click": 25,
    "Data-Driven": 22,
    "Shapley Value": 18,
    difference: -28
  },
  {
    channel: "Email",
    "Last-Click": 15,
    "Data-Driven": 10,
    "Shapley Value": 8,
    difference: -47
  },
  {
    channel: "Direct",
    "Last-Click": 9,
    "Data-Driven": 2,
    "Shapley Value": 5,
    difference: -44
  }
];

const MODEL_DESCRIPTIONS = [
  {
    model: "Last-Click",
    icon: <MousePointer className="w-5 h-5" />,
    description: "Assigns 100% credit to the final touchpoint",
    pros: ["Simple to understand", "Easy to implement", "Clear accountability"],
    cons: ["Ignores upper-funnel impact", "Overvalues bottom-funnel", "No cross-channel insights"],
    color: "bg-gray-500"
  },
  {
    model: "Data-Driven",
    icon: <Brain className="w-5 h-5" />,
    description: "Uses ML to distribute credit based on conversion patterns",
    pros: ["Accounts for patterns", "Self-optimizing", "Platform-specific insights"],
    cons: ["Black box approach", "Requires significant data", "Platform-dependent"],
    color: "bg-indigo-500"
  },
  {
    model: "Shapley Value",
    icon: <Calculator className="w-5 h-5" />,
    description: "Game theory approach for fair contribution distribution",
    pros: ["Mathematically fair", "Order-independent", "Accounts for synergies"],
    cons: ["Complex calculation", "Requires all permutations", "Computationally intensive"],
    color: "bg-orange-500"
  }
];

export default function AttributionModelComparison({ campaign }: AttributionModelComparisonProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="font-medium text-dark-gray mb-2">{payload[0].payload.channel}</p>
          <div className="space-y-1 text-sm">
            {payload.map((entry: any) => (
              <p key={entry.name} className="text-medium-gray">
                {entry.name}: <span className="font-medium" style={{ color: entry.color }}>{entry.value}%</span>
              </p>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-light-gray">
            <p className="text-xs text-medium-gray">
              Difference: <span className={`font-medium ${payload[0].payload.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {payload[0].payload.difference > 0 ? '+' : ''}{payload[0].payload.difference}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Model Comparison Chart */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <h4 className="font-semibold text-dark-gray mb-4">Attribution Model Comparison</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARISON_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="channel" fontSize={12} angle={-45} textAnchor="end" height={80} />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Last-Click" fill="#6B7280" />
              <Bar dataKey="Data-Driven" fill="#6366F1" />
              <Bar dataKey="Shapley Value" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Descriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MODEL_DESCRIPTIONS.map((model, index) => (
          <motion.div
            key={model.model}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-light-gray p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`${model.color} text-white p-2 rounded-lg`}>
                {model.icon}
              </div>
              <h5 className="font-semibold text-dark-gray">{model.model}</h5>
            </div>
            
            <p className="text-sm text-medium-gray mb-4">{model.description}</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-green-700 mb-1">Pros:</p>
                <ul className="space-y-1">
                  {model.pros.map((pro, i) => (
                    <li key={i} className="text-xs text-medium-gray flex items-start gap-1">
                      <span className="text-green-600 mt-0.5">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-xs font-medium text-red-700 mb-1">Cons:</p>
                <ul className="space-y-1">
                  {model.cons.map((con, i) => (
                    <li key={i} className="text-xs text-medium-gray flex items-start gap-1">
                      <span className="text-red-600 mt-0.5">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Impact Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200"
      >
        <h4 className="font-semibold text-dark-gray mb-4">Model Impact on Budget Allocation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-medium-gray mb-1">Upper-Funnel Shift</p>
            <p className="text-2xl font-bold text-dark-gray">+$42K</p>
            <p className="text-xs text-green-600">with Shapley vs Last-Click</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-medium-gray mb-1">Efficiency Gain</p>
            <p className="text-2xl font-bold text-dark-gray">23%</p>
            <p className="text-xs text-green-600">higher ROAS potential</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-medium-gray mb-1">Hidden Value</p>
            <p className="text-2xl font-bold text-dark-gray">$68K</p>
            <p className="text-xs text-orange-600">in assist conversions</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-medium-gray mb-1">Precise Impact</p>
            <p className="text-2xl font-bold text-dark-gray">+31%</p>
            <p className="text-xs text-purple-600">attribution accuracy</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}