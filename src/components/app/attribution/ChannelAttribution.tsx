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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { TrendingUp, AlertCircle, Zap, DollarSign } from "lucide-react";

interface ChannelAttributionProps {
  campaign: string;
  model: string;
}

const CHANNEL_DATA = [
  { 
    channel: "Google Search", 
    lastClick: 35, 
    dataDriver: 28, 
    shapley: 22,
    spend: 45000,
    conversions: 3200,
    incrementality: 78
  },
  { 
    channel: "YouTube", 
    lastClick: 8, 
    dataDriver: 18, 
    shapley: 20,
    spend: 32000,
    conversions: 1800,
    incrementality: 92
  },
  { 
    channel: "Meta", 
    lastClick: 25, 
    dataDriver: 22, 
    shapley: 18,
    spend: 38000,
    conversions: 2400,
    incrementality: 65
  },
  { 
    channel: "TikTok", 
    lastClick: 5, 
    dataDriver: 12, 
    shapley: 15,
    spend: 28000,
    conversions: 1200,
    incrementality: 88
  },
  { 
    channel: "Display", 
    lastClick: 3, 
    dataDriver: 8, 
    shapley: 12,
    spend: 22000,
    conversions: 800,
    incrementality: 95
  },
  { 
    channel: "Email", 
    lastClick: 15, 
    dataDriver: 10, 
    shapley: 8,
    spend: 12000,
    conversions: 1600,
    incrementality: 45
  },
  { 
    channel: "Direct", 
    lastClick: 9, 
    dataDriver: 2, 
    shapley: 5,
    spend: 0,
    conversions: 1000,
    incrementality: 15
  }
];

const CROSS_CHANNEL_EFFECTS = [
  { subject: "Awareness", YouTube: 85, Display: 90, TikTok: 88, fullMark: 100 },
  { subject: "Consideration", YouTube: 72, Display: 65, TikTok: 78, fullMark: 100 },
  { subject: "Intent", YouTube: 45, Display: 38, TikTok: 52, fullMark: 100 },
  { subject: "Conversion", YouTube: 25, Display: 15, TikTok: 20, fullMark: 100 },
  { subject: "Retention", YouTube: 60, Display: 45, TikTok: 70, fullMark: 100 }
];

const BUDGET_RECOMMENDATIONS = [
  { channel: "YouTube", current: 32000, recommended: 45000, impact: "+420 conversions" },
  { channel: "TikTok", current: 28000, recommended: 38000, impact: "+320 conversions" },
  { channel: "Google Search", current: 45000, recommended: 35000, impact: "-180 conversions" },
  { channel: "Meta", current: 38000, recommended: 32000, impact: "-120 conversions" }
];

export default function ChannelAttribution({ campaign, model }: ChannelAttributionProps) {
  const getAttributionValue = (channel: any) => {
    switch (model) {
      case "shapley": return channel.shapley;
      case "data-driven": return channel.dataDriver;
      case "last-click": return channel.lastClick;
      default: return channel.shapley;
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="font-medium text-dark-gray mb-2">{data.channel}</p>
          <div className="space-y-1 text-sm">
            <p className="text-medium-gray">Attribution: <span className="font-medium text-dark-gray">{getAttributionValue(data)}%</span></p>
            <p className="text-medium-gray">Spend: <span className="font-medium text-dark-gray">${(data.spend / 1000).toFixed(0)}K</span></p>
            <p className="text-medium-gray">Conversions: <span className="font-medium text-dark-gray">{data.conversions.toLocaleString()}</span></p>
            <p className="text-medium-gray">Incrementality: <span className="font-medium text-green-600">{data.incrementality}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Channel Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attribution by Channel */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Channel Attribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHANNEL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="channel" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={model === "shapley" ? "shapley" : model === "data-driven" ? "dataDriver" : "lastClick"} 
                  fill="#F97316" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cross-Channel Effects */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Cross-Channel Funnel Impact</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={CROSS_CHANNEL_EFFECTS}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" fontSize={12} />
                <PolarRadiusAxis fontSize={10} />
                <Radar name="YouTube" dataKey="YouTube" stroke="#FF0000" fill="#FF0000" fillOpacity={0.3} />
                <Radar name="Display" dataKey="Display" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
                <Radar name="TikTok" dataKey="TikTok" stroke="#000000" fill="#000000" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-medium-gray">YouTube</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span className="text-medium-gray">Display</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black rounded" />
              <span className="text-medium-gray">TikTok</span>
            </div>
          </div>
        </div>
      </div>

      {/* Incrementality Testing Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-light-gray p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-dark-gray">Incrementality Testing Results</h4>
          <span className="text-sm text-medium-gray">Geo-lift experiments</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CHANNEL_DATA.slice(0, 6).map((channel) => (
            <div key={channel.channel} className="text-center">
              <p className="text-sm font-medium text-dark-gray mb-2">{channel.channel}</p>
              <div className="relative">
                <svg className="w-16 h-16 mx-auto">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#E5E7EB"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={channel.incrementality > 80 ? "#10B981" : channel.incrementality > 60 ? "#F59E0B" : "#EF4444"}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(channel.incrementality / 100) * 176} 176`}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                  <text
                    x="32"
                    y="36"
                    textAnchor="middle"
                    className="text-sm font-bold fill-current text-dark-gray"
                  >
                    {channel.incrementality}%
                  </text>
                </svg>
              </div>
              <p className="text-xs text-medium-gray mt-1">incremental</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Budget Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-dark-gray">AI Budget Recommendations</h4>
          </div>
          <button className="text-sm font-medium text-green-600 hover:text-green-700">
            Apply All Changes
          </button>
        </div>

        <div className="space-y-3">
          {BUDGET_RECOMMENDATIONS.map((rec) => (
            <div key={rec.channel} className="flex items-center justify-between bg-white rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="font-medium text-dark-gray">{rec.channel}</span>
                <span className="text-sm text-medium-gray">
                  ${(rec.current / 1000).toFixed(0)}K → ${(rec.recommended / 1000).toFixed(0)}K
                </span>
              </div>
              <span className={`text-sm font-medium ${
                rec.impact.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}>
                {rec.impact}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-sm text-green-800">
            Total impact: <span className="font-semibold">+440 conversions</span> with same budget
          </p>
        </div>
      </motion.div>

      {/* Warning for Last-Click */}
      {model === "last-click" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-dark-gray mb-2">
                Last-Click Attribution Limitations
              </h4>
              <p className="text-sm text-medium-gray">
                Last-click attribution significantly undervalues upper-funnel channels like YouTube (-60%) 
                and Display (-75%). Consider using Shapley value or data-driven attribution for more 
                accurate budget allocation decisions.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}