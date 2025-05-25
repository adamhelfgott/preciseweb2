"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Brain, Calendar, DollarSign, Info, ChevronRight, Sparkles } from "lucide-react";
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface PredictionFactor {
  name: string;
  impact: "positive" | "negative" | "neutral";
  value: string;
  description: string;
}

interface MonthlyPrediction {
  month: string;
  predicted: number;
  confidence: { min: number; max: number };
  factors: PredictionFactor[];
}

const HISTORICAL_DATA = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  const base = 35000 + Math.random() * 15000;
  const trend = i * 800;
  const seasonality = Math.sin((i + 5) * Math.PI / 6) * 5000;
  return {
    month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    actual: Math.round(base + trend + seasonality),
  };
});

const PREDICTED_DATA: MonthlyPrediction[] = [
  {
    month: "Jun 2025",
    predicted: 52400,
    confidence: { min: 48200, max: 56600 },
    factors: [
      {
        name: "Nike Summer Campaign",
        impact: "positive",
        value: "+$4,200",
        description: "Historical pattern shows 35% increase in fitness data usage"
      },
      {
        name: "New Premium Segments",
        impact: "positive",
        value: "+$2,800",
        description: "3 new high-value segments launching"
      },
      {
        name: "Market Seasonality",
        impact: "positive",
        value: "+$1,500",
        description: "Summer fitness campaigns typically drive higher demand"
      }
    ]
  },
  {
    month: "Jul 2025",
    predicted: 58900,
    confidence: { min: 53100, max: 64700 },
    factors: [
      {
        name: "Q3 Campaign Launches",
        impact: "positive",
        value: "+$6,500",
        description: "Multiple enterprise campaigns scheduled"
      },
      {
        name: "Data Quality Improvements",
        impact: "positive",
        value: "+$3,200",
        description: "Enhanced validation increasing data value by 15%"
      }
    ]
  },
  {
    month: "Aug 2025",
    predicted: 61200,
    confidence: { min: 54800, max: 67600 },
    factors: [
      {
        name: "Back-to-School Campaigns",
        impact: "positive",
        value: "+$5,100",
        description: "Education and lifestyle brands increase spending"
      },
      {
        name: "Platform Fee Adjustment",
        impact: "negative",
        value: "-$1,200",
        description: "Standard Q3 pricing update"
      }
    ]
  }
];

const COMBINED_DATA = [
  ...HISTORICAL_DATA,
  ...PREDICTED_DATA.map(p => ({
    month: p.month,
    predicted: p.predicted,
    confidenceMin: p.confidence.min,
    confidenceMax: p.confidence.max,
  }))
];

export default function EarningsPredictor() {
  const [selectedMonth, setSelectedMonth] = useState<MonthlyPrediction>(PREDICTED_DATA[0]);
  const [showDetails, setShowDetails] = useState(false);

  const nextMonthGrowth = Math.round(
    ((PREDICTED_DATA[0].predicted - HISTORICAL_DATA[HISTORICAL_DATA.length - 1].actual) / 
    HISTORICAL_DATA[HISTORICAL_DATA.length - 1].actual) * 100
  );

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "text-brand-green";
      case "negative": return "text-warm-coral";
      default: return "text-medium-gray";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive": return "↑";
      case "negative": return "↓";
      default: return "→";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-green/10 rounded-lg">
            <Brain className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">AI Earnings Predictor</h2>
            <p className="text-sm text-medium-gray">ML-powered revenue forecasting</p>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-electric-blue hover:text-blue-700 font-medium flex items-center gap-1"
        >
          How it works
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Key Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-lg p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-medium-gray mb-1">Next Month Prediction</p>
            <p className="text-3xl font-bold text-dark-gray">
              ${PREDICTED_DATA[0].predicted.toLocaleString()}
            </p>
            <p className="text-sm text-brand-green mt-1">
              {nextMonthGrowth > 0 ? "+" : ""}{nextMonthGrowth}% vs current
            </p>
          </div>
          <div>
            <p className="text-sm text-medium-gray mb-1">Confidence Range</p>
            <p className="text-lg font-semibold text-dark-gray">
              ${PREDICTED_DATA[0].confidence.min.toLocaleString()} - ${PREDICTED_DATA[0].confidence.max.toLocaleString()}
            </p>
            <p className="text-sm text-medium-gray mt-1">95% confidence interval</p>
          </div>
          <div>
            <p className="text-sm text-medium-gray mb-1">Key Growth Driver</p>
            <p className="text-lg font-semibold text-dark-gray">Summer Campaigns</p>
            <p className="text-sm text-brand-green mt-1">+$8,500 impact</p>
          </div>
        </div>
      </motion.div>

      {/* Prediction Chart */}
      <div className="mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COMBINED_DATA}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis dataKey="month" stroke="#86868B" />
              <YAxis stroke="#86868B" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
              
              {/* Historical Data */}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#1DB954" 
                strokeWidth={2}
                dot={{ fill: "#1DB954", r: 4 }}
                name="Actual Earnings"
              />
              
              {/* Predicted Data */}
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#7B4FFF" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#7B4FFF", r: 4 }}
                name="Predicted Earnings"
              />
              
              {/* Confidence Interval */}
              <Area
                type="monotone"
                dataKey="confidenceMax"
                fill="url(#confidenceGradient)"
                stroke="none"
                name="Confidence Range"
              />
              <Area
                type="monotone"
                dataKey="confidenceMin"
                fill="white"
                stroke="none"
              />
              
              {/* Current Month Marker */}
              <ReferenceLine 
                x={HISTORICAL_DATA[HISTORICAL_DATA.length - 1].month} 
                stroke="#86868B" 
                strokeDasharray="3 3"
                label={{ value: "Today", position: "top" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Predictions */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-dark-gray mb-3">3-Month Forecast</h3>
        {PREDICTED_DATA.map((prediction) => (
          <motion.button
            key={prediction.month}
            onClick={() => setSelectedMonth(prediction)}
            className={`w-full p-4 rounded-lg border transition-all text-left ${
              selectedMonth.month === prediction.month
                ? "border-brand-green bg-brand-green/5"
                : "border-silk-gray hover:border-medium-gray"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-dark-gray">{prediction.month}</p>
                <p className="text-sm text-medium-gray">
                  ${prediction.confidence.min.toLocaleString()} - ${prediction.confidence.max.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-dark-gray">
                  ${prediction.predicted.toLocaleString()}
                </p>
                <p className="text-sm text-brand-green">
                  {prediction.factors.filter(f => f.impact === "positive").length} growth factors
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected Month Factors */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMonth.month}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-light-gray rounded-lg p-4"
        >
          <h3 className="font-medium text-dark-gray mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-green" />
            Impact Factors for {selectedMonth.month}
          </h3>
          <div className="space-y-3">
            {selectedMonth.factors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className={`text-lg ${getImpactColor(factor.impact)}`}>
                  {getImpactIcon(factor.impact)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-dark-gray">{factor.name}</p>
                    <span className={`font-semibold ${getImpactColor(factor.impact)}`}>
                      {factor.value}
                    </span>
                  </div>
                  <p className="text-sm text-medium-gray mt-1">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Button */}
      <button className="w-full mt-6 bg-brand-green text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Optimize for Maximum Earnings
      </button>

      {/* How It Works */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-silk-gray"
          >
            <h4 className="font-medium text-dark-gray mb-3">How Our AI Predicts Earnings</h4>
            <div className="space-y-2 text-sm text-medium-gray">
              <p>• Analyzes 24 months of historical earnings patterns</p>
              <p>• Tracks campaign schedules from major advertisers</p>
              <p>• Monitors seasonal trends in data usage</p>
              <p>• Factors in market conditions and industry growth</p>
              <p>• Updates predictions daily with new data signals</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}