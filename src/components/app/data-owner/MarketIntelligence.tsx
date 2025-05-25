"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Search, DollarSign, Users, Zap, AlertCircle, BarChart3, Target, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DemandSignal {
  attribute: string;
  searches: number;
  growth: number;
  avgPrice: string;
  competition: "low" | "medium" | "high";
}

interface PricingPosition {
  category: string;
  yourPrice: number;
  marketMin: number;
  marketAvg: number;
  marketMax: number;
  percentile: number;
}

interface QualityBenchmark {
  metric: string;
  yourScore: number;
  industryAvg: number;
  topQuartile: number;
}

export default function MarketIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState("behavioral");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [showAlerts, setShowAlerts] = useState(true);

  // Real-time Demand Signals
  const demandSignals: DemandSignal[] = [
    {
      attribute: "High-value fitness enthusiasts",
      searches: 2847,
      growth: 156,
      avgPrice: "$18.50/1K",
      competition: "low"
    },
    {
      attribute: "Premium travel intenders",
      searches: 1923,
      growth: 89,
      avgPrice: "$24.30/1K",
      competition: "medium"
    },
    {
      attribute: "Sustainable product buyers",
      searches: 1654,
      growth: 234,
      avgPrice: "$21.80/1K",
      competition: "low"
    },
    {
      attribute: "Tech early adopters",
      searches: 3201,
      growth: 45,
      avgPrice: "$15.90/1K",
      competition: "high"
    },
    {
      attribute: "Luxury fashion shoppers",
      searches: 987,
      growth: 312,
      avgPrice: "$32.40/1K",
      competition: "medium"
    }
  ];

  // Pricing Power Analysis
  const pricingData: PricingPosition[] = [
    { category: "Behavioral", yourPrice: 12.5, marketMin: 8.2, marketAvg: 14.3, marketMax: 22.1, percentile: 45 },
    { category: "Demographic", yourPrice: 6.2, marketMin: 4.1, marketAvg: 7.8, marketMax: 12.3, percentile: 38 },
    { category: "Location", yourPrice: 4.8, marketMin: 3.2, marketAvg: 5.9, marketMax: 9.7, percentile: 42 },
    { category: "Interest", yourPrice: 8.9, marketMin: 5.4, marketAvg: 10.2, marketMax: 18.6, percentile: 40 },
    { category: "Intent", yourPrice: 15.3, marketMin: 9.8, marketAvg: 16.7, marketMax: 28.4, percentile: 48 }
  ];

  // Quality Benchmarks
  const qualityBenchmarks: QualityBenchmark[] = [
    { metric: "Completeness", yourScore: 94, industryAvg: 78, topQuartile: 89 },
    { metric: "Accuracy", yourScore: 91, industryAvg: 82, topQuartile: 92 },
    { metric: "Freshness", yourScore: 88, industryAvg: 71, topQuartile: 85 },
    { metric: "Compliance", yourScore: 98, industryAvg: 89, topQuartile: 96 },
    { metric: "Coverage", yourScore: 76, industryAvg: 73, topQuartile: 84 }
  ];

  // Market Movement Trends
  const marketTrends = [
    { date: "Jan 1", demandIndex: 100, priceIndex: 100, qualityPremium: 15 },
    { date: "Jan 8", demandIndex: 108, priceIndex: 103, qualityPremium: 17 },
    { date: "Jan 15", demandIndex: 115, priceIndex: 107, qualityPremium: 19 },
    { date: "Jan 22", demandIndex: 118, priceIndex: 109, qualityPremium: 22 },
    { date: "Jan 29", demandIndex: 125, priceIndex: 112, qualityPremium: 24 },
    { date: "Feb 5", demandIndex: 132, priceIndex: 116, qualityPremium: 27 },
    { date: "Feb 12", demandIndex: 138, priceIndex: 118, qualityPremium: 29 }
  ];

  // Opportunity Alerts
  const opportunities = [
    {
      type: "demand",
      title: "Surge in Fitness Data Demand",
      description: "156% increase in searches for high-value fitness enthusiasts. Your data matches 87% of requirements.",
      value: "+$34K/month potential",
      action: "Optimize pricing"
    },
    {
      type: "pricing",
      title: "Underpriced vs Market",
      description: "Your behavioral data is priced 13% below market average for comparable quality scores.",
      value: "+$18K/month potential",
      action: "Adjust pricing"
    },
    {
      type: "quality",
      title: "Coverage Enhancement Opportunity",
      description: "Increasing coverage to 85% would move you to top quartile and unlock premium pricing.",
      value: "+$22K/month potential",
      action: "View suggestions"
    }
  ];

  // Category Distribution
  const categoryData = [
    { name: "Behavioral", value: 45, fill: "#1DB954" },
    { name: "Demographic", value: 25, fill: "#1E90FF" },
    { name: "Location", value: 15, fill: "#7B4FFF" },
    { name: "Interest", value: 10, fill: "#FF6B6B" },
    { name: "Intent", value: 5, fill: "#FDCB6E" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-dark-gray">Market Intelligence</h2>
          <p className="text-medium-gray mt-1">
            Real-time demand signals and pricing insights
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              showAlerts 
                ? "bg-electric-blue text-white" 
                : "bg-light-gray text-medium-gray hover:text-dark-gray"
            }`}
          >
            {showAlerts ? "Hide" : "Show"} Alerts ({opportunities.length})
          </button>
          
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
        </div>
      </div>

      {/* Opportunity Alerts */}
      {showAlerts && opportunities.length > 0 && (
        <div className="mb-6 space-y-3">
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                opp.type === "demand" ? "bg-brand-green/5 border-brand-green/20" :
                opp.type === "pricing" ? "bg-electric-blue/5 border-electric-blue/20" :
                "bg-bright-purple/5 border-bright-purple/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    opp.type === "demand" ? "bg-brand-green/10" :
                    opp.type === "pricing" ? "bg-electric-blue/10" :
                    "bg-bright-purple/10"
                  }`}>
                    {opp.type === "demand" ? <TrendingUp className="w-4 h-4 text-brand-green" /> :
                     opp.type === "pricing" ? <DollarSign className="w-4 h-4 text-electric-blue" /> :
                     <BarChart3 className="w-4 h-4 text-bright-purple" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-dark-gray mb-1">{opp.title}</h4>
                    <p className="text-sm text-medium-gray mb-2">{opp.description}</p>
                    <p className="text-sm font-semibold text-brand-green">{opp.value}</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-electric-blue hover:text-blue-700">
                  {opp.action} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Market Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Demand Signals */}
        <div className="lg:col-span-2 bg-light-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-gray mb-4">
            Live Demand Signals
            <span className="ml-2 text-sm font-normal text-medium-gray">
              (Last 24 hours)
            </span>
          </h3>
          <div className="space-y-3">
            {demandSignals.map((signal) => (
              <div key={signal.attribute} className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-dark-gray mb-1">{signal.attribute}</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-medium-gray">
                        {signal.searches.toLocaleString()} searches
                      </span>
                      <span className={`flex items-center gap-1 font-medium ${
                        signal.growth > 100 ? "text-brand-green" : "text-medium-gray"
                      }`}>
                        <ArrowUp size={12} />
                        {signal.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-dark-gray">{signal.avgPrice}</p>
                    <p className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                      signal.competition === "low" ? "bg-brand-green/10 text-brand-green" :
                      signal.competition === "medium" ? "bg-warm-coral/10 text-warm-coral" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {signal.competition} competition
                    </p>
                  </div>
                </div>
                <div className="w-full bg-silk-gray rounded-full h-2 mt-3">
                  <div 
                    className="bg-brand-green h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((signal.searches / 3500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-gray mb-4">Market Demand by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.fill }} />
                  <span className="text-medium-gray">{cat.name}</span>
                </div>
                <span className="font-medium text-dark-gray">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Quality Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pricing Position */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-gray mb-4">Your Pricing Position</h3>
          <div className="space-y-4">
            {pricingData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-dark-gray">{item.category}</span>
                  <span className="text-medium-gray">${item.yourPrice}/1K records</span>
                </div>
                <div className="relative h-6 bg-white rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-silk-gray"
                    style={{ 
                      left: `${(item.marketMin / item.marketMax) * 100}%`,
                      width: `${((item.marketAvg - item.marketMin) / item.marketMax) * 100}%`
                    }}
                  />
                  <div 
                    className="absolute h-full w-1 bg-electric-blue"
                    style={{ left: `${(item.marketAvg / item.marketMax) * 100}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-green rounded-full border-2 border-white"
                    style={{ left: `${(item.yourPrice / item.marketMax) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-medium-gray">
                  <span>${item.marketMin}</span>
                  <span className="font-medium">Market Avg: ${item.marketAvg}</span>
                  <span>${item.marketMax}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Benchmarks */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-gray mb-4">Quality Benchmarks</h3>
          <div className="space-y-3">
            {qualityBenchmarks.map((benchmark) => (
              <div key={benchmark.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-dark-gray">{benchmark.metric}</span>
                  <span className={`text-sm font-semibold ${
                    benchmark.yourScore >= benchmark.topQuartile ? "text-brand-green" :
                    benchmark.yourScore >= benchmark.industryAvg ? "text-electric-blue" :
                    "text-warm-coral"
                  }`}>
                    {benchmark.yourScore}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        benchmark.yourScore >= benchmark.topQuartile ? "bg-brand-green" :
                        benchmark.yourScore >= benchmark.industryAvg ? "bg-electric-blue" :
                        "bg-warm-coral"
                      }`}
                      style={{ width: `${benchmark.yourScore}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-medium-gray">
                  <span>Industry: {benchmark.industryAvg}%</span>
                  <span>Top 25%: {benchmark.topQuartile}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="bg-light-gray rounded-lg p-6">
        <h3 className="text-lg font-semibold text-dark-gray mb-4">Market Movement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="demandIndex" 
              stroke="#1DB954" 
              strokeWidth={2}
              name="Demand Index"
              dot={{ fill: "#1DB954" }}
            />
            <Line 
              type="monotone" 
              dataKey="priceIndex" 
              stroke="#1E90FF" 
              strokeWidth={2}
              name="Price Index"
              dot={{ fill: "#1E90FF" }}
            />
            <Line 
              type="monotone" 
              dataKey="qualityPremium" 
              stroke="#7B4FFF" 
              strokeWidth={2}
              name="Quality Premium %"
              dot={{ fill: "#7B4FFF" }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-brand-green rounded-full"></div>
            <span className="text-sm text-medium-gray">Demand Index</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-electric-blue rounded-full"></div>
            <span className="text-sm text-medium-gray">Price Index</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-bright-purple rounded-full"></div>
            <span className="text-sm text-medium-gray">Quality Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
}