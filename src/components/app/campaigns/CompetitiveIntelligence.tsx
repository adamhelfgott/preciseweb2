"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Zap, AlertCircle, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: any;
  description: string;
}

interface CompetitorInsight {
  category: string;
  yourScore: number;
  industryAvg: number;
  topPerformer: number;
}

export default function CompetitiveIntelligence() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [showDetails, setShowDetails] = useState(false);

  // Market Overview Metrics
  const marketMetrics: MetricCard[] = [
    {
      title: "Industry Avg CAC",
      value: "$47.23",
      change: -12.5,
      icon: DollarSign,
      description: "You're 23% below industry average"
    },
    {
      title: "Market CTR",
      value: "2.34%",
      change: 8.3,
      icon: Eye,
      description: "Your CTR: 2.89% (+23%)"
    },
    {
      title: "Avg ROAS",
      value: "3.2x",
      change: 15.2,
      icon: TrendingUp,
      description: "Your ROAS: 4.1x (+28%)"
    },
    {
      title: "Creative Refresh Rate",
      value: "14 days",
      change: -5.0,
      icon: Zap,
      description: "Industry refreshes 3 days faster"
    }
  ];

  // Performance Comparison Data
  const performanceData = [
    { metric: "Targeting Precision", you: 85, industry: 72, top10: 92 },
    { metric: "Creative Quality", you: 78, industry: 68, top10: 88 },
    { metric: "Data Utilization", you: 92, industry: 61, top10: 95 },
    { metric: "Attribution Accuracy", you: 88, industry: 54, top10: 90 },
    { metric: "Budget Efficiency", you: 81, industry: 69, top10: 87 },
    { metric: "Campaign Velocity", you: 75, industry: 71, top10: 93 }
  ];

  // Trend Analysis Data
  const trendData = [
    { date: "Jan 1", yourCAC: 52, industryCAC: 58, topCAC: 42 },
    { date: "Jan 8", yourCAC: 48, industryCAC: 57, topCAC: 41 },
    { date: "Jan 15", yourCAC: 45, industryCAC: 55, topCAC: 40 },
    { date: "Jan 22", yourCAC: 43, industryCAC: 54, topCAC: 38 },
    { date: "Jan 29", yourCAC: 41, industryCAC: 53, topCAC: 37 },
    { date: "Feb 5", yourCAC: 38, industryCAC: 52, topCAC: 35 },
    { date: "Feb 12", yourCAC: 36, industryCAC: 51, topCAC: 34 }
  ];

  // Creative Trends
  const creativeTrends = [
    { format: "Video 15s", adoption: 78, performance: "+23% CTR", momentum: "rising" },
    { format: "Interactive Cards", adoption: 45, performance: "+31% engagement", momentum: "rising" },
    { format: "Static Banner", adoption: 92, performance: "-12% CTR", momentum: "declining" },
    { format: "Carousel Ads", adoption: 67, performance: "+18% conversion", momentum: "stable" },
    { format: "AR Try-On", adoption: 23, performance: "+45% conversion", momentum: "emerging" }
  ];

  // Data Source Rankings
  const dataSourceRankings = [
    { provider: "Behavioral Signals Co", marketShare: 23, avgROAS: 4.2, trend: "up" },
    { provider: "Demographic Plus", marketShare: 19, avgROAS: 3.8, trend: "stable" },
    { provider: "Intent Stream", marketShare: 17, avgROAS: 4.5, trend: "up" },
    { provider: "Location Intel", marketShare: 15, avgROAS: 3.5, trend: "down" },
    { provider: "Premium Audiences", marketShare: 12, avgROAS: 4.1, trend: "up" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-dark-gray">Competitive Intelligence</h2>
          <p className="text-medium-gray mt-1">
            Industry benchmarks and market insights
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-light-gray rounded-lg p-1">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-white text-dark-gray shadow-sm"
                    : "text-medium-gray hover:text-dark-gray"
                }`}
              >
                {range === "7d" ? "7 days" : range === "30d" ? "30 days" : "90 days"}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-electric-blue hover:text-blue-700 font-medium text-sm"
          >
            {showDetails ? "Hide" : "Show"} Details
          </button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {marketMetrics.map((metric) => (
          <motion.div
            key={metric.title}
            whileHover={{ scale: 1.02 }}
            className="bg-light-gray rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <metric.icon className="w-5 h-5 text-medium-gray" />
              <div className={`flex items-center gap-1 text-xs font-medium ${
                metric.change > 0 ? "text-brand-green" : "text-warm-coral"
              }`}>
                {metric.change > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <h3 className="text-sm text-medium-gray mb-1">{metric.title}</h3>
            <p className="text-xl font-semibold text-dark-gray">{metric.value}</p>
            <p className="text-xs text-medium-gray mt-1">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-gray mb-4">Performance vs Market</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#E5E5E7" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="You" dataKey="you" stroke="#1DB954" fill="#1DB954" fillOpacity={0.3} />
              <Radar name="Industry Avg" dataKey="industry" stroke="#86868B" fill="#86868B" fillOpacity={0.2} />
              <Radar name="Top 10%" dataKey="top10" stroke="#7B4FFF" fill="#7B4FFF" fillOpacity={0.1} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand-green rounded-full"></div>
              <span className="text-sm text-medium-gray">You</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-medium-gray rounded-full"></div>
              <span className="text-sm text-medium-gray">Industry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-bright-purple rounded-full"></div>
              <span className="text-sm text-medium-gray">Top 10%</span>
            </div>
          </div>
        </div>

        {/* CAC Trend Analysis */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-gray mb-4">CAC Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="topCAC" stackId="1" stroke="#7B4FFF" fill="#7B4FFF" fillOpacity={0.1} name="Top Performers" />
              <Area type="monotone" dataKey="yourCAC" stackId="2" stroke="#1DB954" fill="#1DB954" fillOpacity={0.3} name="Your CAC" />
              <Area type="monotone" dataKey="industryCAC" stackId="3" stroke="#86868B" fill="#86868B" fillOpacity={0.2} name="Industry Avg" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Insights */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Creative Trends */}
          <div className="bg-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-dark-gray mb-4">Emerging Creative Trends</h3>
            <div className="space-y-3">
              {creativeTrends.map((trend) => (
                <div key={trend.format} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-electric-blue">{trend.adoption}%</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark-gray">{trend.format}</h4>
                      <p className="text-sm text-medium-gray">{trend.performance}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    trend.momentum === "rising" ? "bg-brand-green/10 text-brand-green" :
                    trend.momentum === "emerging" ? "bg-electric-blue/10 text-electric-blue" :
                    trend.momentum === "declining" ? "bg-warm-coral/10 text-warm-coral" :
                    "bg-medium-gray/10 text-medium-gray"
                  }`}>
                    {trend.momentum}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Source Performance */}
          <div className="bg-light-gray rounded-lg p-6">
            <h3 className="text-lg font-semibold text-dark-gray mb-4">Top Performing Data Sources</h3>
            <div className="space-y-3">
              {dataSourceRankings.map((source, index) => (
                <div key={source.provider} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-green/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-brand-green">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark-gray">{source.provider}</h4>
                      <p className="text-sm text-medium-gray">{source.marketShare}% market share</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-dark-gray">{source.avgROAS}x</p>
                      <p className="text-xs text-medium-gray">Avg ROAS</p>
                    </div>
                    {source.trend === "up" && <ArrowUp className="w-4 h-4 text-brand-green" />}
                    {source.trend === "down" && <ArrowDown className="w-4 h-4 text-warm-coral" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-dark-gray mb-2">Key Opportunity Detected</h4>
                <p className="text-medium-gray mb-3">
                  Your competitors are seeing 31% better performance with interactive ad formats, 
                  but you're only allocating 12% of budget to these formats. Consider testing 
                  interactive cards on your top 3 campaigns.
                </p>
                <button className="text-electric-blue hover:text-blue-700 font-medium text-sm">
                  View Recommended Strategy →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}