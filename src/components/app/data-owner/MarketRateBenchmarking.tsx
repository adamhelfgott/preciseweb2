"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, BarChart3, ArrowUp, ArrowDown, Info, Sparkles } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface MarketSegment {
  name: string;
  yourRate: number;
  marketAvg: number;
  marketHigh: number;
  marketLow: number;
  volume: number;
  demand: "high" | "medium" | "low";
}

interface Competitor {
  name: string;
  avgRate: number;
  quality: number;
  volume: number;
  trend: "up" | "down" | "stable";
}

const MARKET_SEGMENTS: MarketSegment[] = [
  {
    name: "Fitness Enthusiasts",
    yourRate: 5.20,
    marketAvg: 4.80,
    marketHigh: 7.50,
    marketLow: 3.20,
    volume: 2300000,
    demand: "high"
  },
  {
    name: "Premium Users",
    yourRate: 8.40,
    marketAvg: 9.20,
    marketHigh: 12.00,
    marketLow: 6.50,
    volume: 890000,
    demand: "high"
  },
  {
    name: "Location Data",
    yourRate: 3.80,
    marketAvg: 3.50,
    marketHigh: 5.00,
    marketLow: 2.00,
    volume: 1500000,
    demand: "medium"
  },
  {
    name: "Demographics",
    yourRate: 2.50,
    marketAvg: 3.20,
    marketHigh: 4.50,
    marketLow: 1.80,
    volume: 3200000,
    demand: "medium"
  },
  {
    name: "Purchase Intent",
    yourRate: 12.00,
    marketAvg: 10.50,
    marketHigh: 15.00,
    marketLow: 8.00,
    volume: 450000,
    demand: "high"
  }
];

const COMPETITORS: Competitor[] = [
  { name: "LiveRamp", avgRate: 5.80, quality: 88, volume: 15000000, trend: "up" },
  { name: "Oracle Data", avgRate: 6.20, quality: 85, volume: 12000000, trend: "stable" },
  { name: "Neustar", avgRate: 5.50, quality: 82, volume: 8000000, trend: "down" },
  { name: "Acxiom", avgRate: 4.90, quality: 80, volume: 10000000, trend: "stable" },
  { name: "Your Company", avgRate: 5.20, quality: 92, volume: 5700000, trend: "up" }
];

const PRICE_HISTORY = Array.from({ length: 12 }, (_, i) => {
  const month = new Date();
  month.setMonth(month.getMonth() - (11 - i));
  return {
    month: month.toLocaleDateString("en-US", { month: "short" }),
    yourRate: 4.50 + (i * 0.06) + Math.random() * 0.3,
    marketRate: 4.80 + (i * 0.04) + Math.random() * 0.2,
  };
});

const QUALITY_COMPARISON = [
  { metric: "Freshness", yours: 95, market: 78, weight: 0.25 },
  { metric: "Accuracy", yours: 92, market: 82, weight: 0.25 },
  { metric: "Coverage", yours: 88, market: 85, weight: 0.20 },
  { metric: "Uniqueness", yours: 94, market: 75, weight: 0.20 },
  { metric: "Compliance", yours: 100, market: 90, weight: 0.10 }
];

export default function MarketRateBenchmarking() {
  const [selectedSegment, setSelectedSegment] = useState<MarketSegment>(MARKET_SEGMENTS[0]);
  const [viewMode, setViewMode] = useState<"segments" | "competitors" | "trends">("segments");

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high": return "text-brand-green bg-brand-green/10";
      case "medium": return "text-electric-blue bg-electric-blue/10";
      case "low": return "text-medium-gray bg-light-gray";
      default: return "text-medium-gray bg-light-gray";
    }
  };

  const getPositionColor = (yourRate: number, marketAvg: number) => {
    const diff = ((yourRate - marketAvg) / marketAvg) * 100;
    if (diff > 5) return "#1DB954";
    if (diff > -5) return "#1E90FF";
    return "#FF6B6B";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUp className="w-3 h-3 text-brand-green" />;
      case "down": return <ArrowDown className="w-3 h-3 text-warm-coral" />;
      default: return <span className="w-3 h-3 inline-block bg-medium-gray rounded-full" />;
    }
  };

  const overallPosition = MARKET_SEGMENTS.reduce((sum, seg) => {
    return sum + ((seg.yourRate - seg.marketAvg) / seg.marketAvg);
  }, 0) / MARKET_SEGMENTS.length * 100;

  const qualityScore = QUALITY_COMPARISON.reduce((sum, metric) => {
    return sum + (metric.yours * metric.weight);
  }, 0);

  const marketQualityScore = QUALITY_COMPARISON.reduce((sum, metric) => {
    return sum + (metric.market * metric.weight);
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-electric-blue/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-electric-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Market Rate Benchmarking</h2>
            <p className="text-sm text-medium-gray">Compare your pricing to market standards</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-medium-gray">Overall Position:</span>
          <span className={`text-lg font-bold ${overallPosition > 0 ? "text-brand-green" : "text-warm-coral"}`}>
            {overallPosition > 0 ? "+" : ""}{overallPosition.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode("segments")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            viewMode === "segments"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          By Segment
        </button>
        <button
          onClick={() => setViewMode("competitors")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            viewMode === "competitors"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          Competitors
        </button>
        <button
          onClick={() => setViewMode("trends")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            viewMode === "trends"
              ? "bg-dark-gray text-white"
              : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
          }`}
        >
          Price Trends
        </button>
      </div>

      {/* Segments View */}
      {viewMode === "segments" && (
        <>
          {/* Segment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {MARKET_SEGMENTS.map((segment) => (
              <button
                key={segment.name}
                onClick={() => setSelectedSegment(segment)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  selectedSegment.name === segment.name
                    ? "border-electric-blue bg-electric-blue/5"
                    : "border-silk-gray hover:border-medium-gray"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-dark-gray text-sm">{segment.name}</h3>
                    <p className="text-xs text-medium-gray mt-1">
                      {(segment.volume / 1000000).toFixed(1)}M records
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDemandColor(segment.demand)}`}>
                    {segment.demand} demand
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-medium-gray">Your rate</span>
                    <span className="text-lg font-bold text-dark-gray">
                      ${segment.yourRate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-medium-gray">Market avg</span>
                    <span className="text-sm text-medium-gray">
                      ${segment.marketAvg.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-1">
                    <span 
                      className="text-xs font-medium"
                      style={{ color: getPositionColor(segment.yourRate, segment.marketAvg) }}
                    >
                      {segment.yourRate > segment.marketAvg ? "+" : ""}
                      {((segment.yourRate - segment.marketAvg) / segment.marketAvg * 100).toFixed(0)}%
                    </span>
                    <span className="text-xs text-medium-gray">vs market</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Segment Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Range Chart */}
            <div className="bg-light-gray rounded-lg p-6">
              <h3 className="font-medium text-dark-gray mb-4">{selectedSegment.name} - Price Range</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-medium-gray">Market Range</span>
                      <span className="text-sm font-medium text-dark-gray">
                        ${selectedSegment.marketLow.toFixed(2)} - ${selectedSegment.marketHigh.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-8 bg-white rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-electric-blue/20"
                        style={{
                          left: `${(selectedSegment.marketLow / selectedSegment.marketHigh) * 100}%`,
                          width: `${((selectedSegment.marketHigh - selectedSegment.marketLow) / selectedSegment.marketHigh) * 100}%`
                        }}
                      />
                      <div 
                        className="absolute top-0 h-full w-1 bg-electric-blue"
                        style={{
                          left: `${(selectedSegment.marketAvg / selectedSegment.marketHigh) * 100}%`
                        }}
                      />
                      <div 
                        className="absolute top-0 h-full w-2 bg-brand-green rounded-full"
                        style={{
                          left: `${(selectedSegment.yourRate / selectedSegment.marketHigh) * 100}%`,
                          transform: "translateX(-50%)"
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-medium-gray">
                      <span>Low</span>
                      <span>Average</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm text-medium-gray">Your Position</span>
                      <span className="text-lg font-bold" style={{ color: getPositionColor(selectedSegment.yourRate, selectedSegment.marketAvg) }}>
                        ${selectedSegment.yourRate.toFixed(2)}/CPM
                      </span>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-lg">
                      <p className="text-sm font-medium text-dark-gray mb-1">Pricing Opportunity</p>
                      <p className="text-xs text-medium-gray">
                        {selectedSegment.yourRate < selectedSegment.marketAvg 
                          ? `You could increase rates by $${(selectedSegment.marketAvg - selectedSegment.yourRate).toFixed(2)} to match market average`
                          : `You're ${((selectedSegment.yourRate - selectedSegment.marketAvg) / selectedSegment.marketAvg * 100).toFixed(0)}% above market average - ensure quality justifies premium`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality vs Price */}
            <div className="bg-light-gray rounded-lg p-6">
              <h3 className="font-medium text-dark-gray mb-4">Quality Score Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={QUALITY_COMPARISON}>
                    <PolarGrid stroke="#E5E5E7" />
                    <PolarAngleAxis dataKey="metric" stroke="#86868B" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#86868B" />
                    <Radar name="Your Data" dataKey="yours" stroke="#1DB954" fill="#1DB954" fillOpacity={0.6} />
                    <Radar name="Market Avg" dataKey="market" stroke="#86868B" fill="#86868B" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-medium-gray">Quality Premium Justified</span>
                  <span className="text-lg font-bold text-brand-green">
                    +{((qualityScore - marketQualityScore) / marketQualityScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Competitors View */}
      {viewMode === "competitors" && (
        <div className="space-y-6">
          <div className="bg-light-gray rounded-lg p-6">
            <h3 className="font-medium text-dark-gray mb-4">Competitor Landscape</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COMPETITORS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                  <XAxis dataKey="name" stroke="#86868B" />
                  <YAxis stroke="#86868B" />
                  <Tooltip />
                  <Bar dataKey="avgRate" name="Avg CPM Rate ($)">
                    {COMPETITORS.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name === "Your Company" ? "#1DB954" : "#86868B"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPETITORS.filter(c => c.name !== "Your Company").map((competitor) => (
              <div key={competitor.name} className="bg-light-gray rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-dark-gray">{competitor.name}</h4>
                  {getTrendIcon(competitor.trend)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Avg Rate</span>
                    <span className="font-medium text-dark-gray">${competitor.avgRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Quality</span>
                    <span className="font-medium text-dark-gray">{competitor.quality}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Volume</span>
                    <span className="font-medium text-dark-gray">{(competitor.volume / 1000000).toFixed(0)}M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trends View */}
      {viewMode === "trends" && (
        <div className="space-y-6">
          <div className="bg-light-gray rounded-lg p-6">
            <h3 className="font-medium text-dark-gray mb-4">12-Month Price Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PRICE_HISTORY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                  <XAxis dataKey="month" stroke="#86868B" />
                  <YAxis stroke="#86868B" tickFormatter={(value) => `$${value.toFixed(2)}`} />
                  <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="yourRate" stroke="#1DB954" strokeWidth={2} name="Your Rate" dot={{ fill: "#1DB954", r: 3 }} />
                  <Line type="monotone" dataKey="marketRate" stroke="#86868B" strokeWidth={2} name="Market Avg" strokeDasharray="5 5" dot={{ fill: "#86868B", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-brand-green" />
                <h4 className="font-medium text-dark-gray">Growth Rate</h4>
              </div>
              <p className="text-2xl font-bold text-dark-gray">+15.6%</p>
              <p className="text-sm text-medium-gray">Your prices vs 12 months ago</p>
            </div>
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-electric-blue" />
                <h4 className="font-medium text-dark-gray">Market Growth</h4>
              </div>
              <p className="text-2xl font-bold text-dark-gray">+10.2%</p>
              <p className="text-sm text-medium-gray">Industry average growth</p>
            </div>
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-bright-purple" />
                <h4 className="font-medium text-dark-gray">Premium Position</h4>
              </div>
              <p className="text-2xl font-bold text-dark-gray">Top 15%</p>
              <p className="text-sm text-medium-gray">Quality-adjusted pricing</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex items-center justify-between p-4 bg-electric-blue/10 rounded-lg">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-electric-blue" />
          <div>
            <p className="font-medium text-dark-gray">Pricing Optimization Available</p>
            <p className="text-sm text-medium-gray">
              AI analysis suggests 18% revenue increase opportunity
            </p>
          </div>
        </div>
        <button className="bg-electric-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Recommendations
        </button>
      </div>
    </div>
  );
}