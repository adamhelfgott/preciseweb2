"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Users, TrendingUp, AlertTriangle, Play, Pause, CheckCircle, ChevronRight, Info } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

interface TestGroup {
  name: string;
  size: number;
  spend: number;
  conversions: number;
  revenue: number;
  isControl: boolean;
}

interface IncrementalityTest {
  id: string;
  name: string;
  campaign: string;
  status: "planning" | "running" | "completed";
  startDate: string;
  duration: number; // days
  progress: number; // percentage
  groups: TestGroup[];
  lift: {
    conversions: number;
    revenue: number;
    confidence: number;
  };
  insights: string[];
}

const ACTIVE_TESTS: IncrementalityTest[] = [
  {
    id: "1",
    name: "Nike Precise Data Impact Test",
    campaign: "Nike Summer Fitness 2025",
    status: "running",
    startDate: "2025-05-10",
    duration: 14,
    progress: 65,
    groups: [
      {
        name: "Test (with Precise)",
        size: 45000,
        spend: 12500,
        conversions: 342,
        revenue: 45280,
        isControl: false
      },
      {
        name: "Control (without Precise)",
        size: 45000,
        spend: 12500,
        conversions: 198,
        revenue: 26136,
        isControl: true
      }
    ],
    lift: {
      conversions: 72.7,
      revenue: 73.3,
      confidence: 94.2
    },
    insights: [
      "Precise data drives 73% incremental revenue",
      "Test group CAC is 45% lower than control",
      "Statistical significance reached at 94% confidence"
    ]
  },
  {
    id: "2",
    name: "Creative Messaging A/B Test",
    campaign: "Adidas Morning Warriors",
    status: "completed",
    startDate: "2025-05-01",
    duration: 21,
    progress: 100,
    groups: [
      {
        name: "Performance Focus",
        size: 30000,
        spend: 8000,
        conversions: 256,
        revenue: 31232,
        isControl: false
      },
      {
        name: "Lifestyle Focus",
        size: 30000,
        spend: 8000,
        conversions: 189,
        revenue: 23058,
        isControl: true
      }
    ],
    lift: {
      conversions: 35.4,
      revenue: 35.5,
      confidence: 99.1
    },
    insights: [
      "Performance messaging outperforms lifestyle by 35%",
      "Higher engagement rates with athletic imagery",
      "Recommend shifting all creatives to performance focus"
    ]
  },
  {
    id: "3",
    name: "Geo Holdout Test - West Coast",
    campaign: "Under Armour Premium",
    status: "planning",
    startDate: "2025-06-01",
    duration: 28,
    progress: 0,
    groups: [
      {
        name: "Test Markets",
        size: 120000,
        spend: 0,
        conversions: 0,
        revenue: 0,
        isControl: false
      },
      {
        name: "Holdout Markets",
        size: 40000,
        spend: 0,
        conversions: 0,
        revenue: 0,
        isControl: true
      }
    ],
    lift: {
      conversions: 0,
      revenue: 0,
      confidence: 0
    },
    insights: [
      "Test design: 75/25 split across West Coast DMAs",
      "Expected 4-week runtime for statistical significance",
      "Measuring true incremental impact of campaign"
    ]
  }
];

const DAILY_RESULTS = Array.from({ length: 14 }, (_, i) => ({
  day: i + 1,
  test: 20 + Math.random() * 15 + i * 2,
  control: 15 + Math.random() * 10,
  lift: ((20 + Math.random() * 15 + i * 2) / (15 + Math.random() * 10) - 1) * 100
}));

export default function IncrementalityTesting() {
  const [selectedTest, setSelectedTest] = useState<IncrementalityTest>(ACTIVE_TESTS[0]);
  const [showMethodology, setShowMethodology] = useState(false);
  const [isCreatingTest, setIsCreatingTest] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-brand-green bg-brand-green/10";
      case "completed": return "text-electric-blue bg-electric-blue/10";
      case "planning": return "text-vibrant-orange bg-vibrant-orange/10";
      default: return "text-medium-gray bg-light-gray";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-brand-green";
    if (confidence >= 90) return "text-vibrant-orange";
    return "text-warm-coral";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warm-coral/10 rounded-lg">
            <FlaskConical className="w-5 h-5 text-warm-coral" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Incrementality Testing</h2>
            <p className="text-sm text-medium-gray">Measure true campaign impact with holdout groups</p>
          </div>
        </div>
        <button
          onClick={() => setIsCreatingTest(true)}
          className="bg-warm-coral text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FlaskConical className="w-4 h-4" />
          New Test
        </button>
      </div>

      {/* Active Tests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {ACTIVE_TESTS.map((test) => (
          <button
            key={test.id}
            onClick={() => setSelectedTest(test)}
            className={`p-4 rounded-lg border transition-all text-left ${
              selectedTest.id === test.id
                ? "border-warm-coral bg-warm-coral/5"
                : "border-silk-gray hover:border-medium-gray"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-medium text-dark-gray text-sm">{test.name}</h3>
                <p className="text-xs text-medium-gray mt-1">{test.campaign}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(test.status)}`}>
                {test.status}
              </span>
            </div>

            {test.status === "running" && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-medium-gray mb-1">
                  <span>Progress</span>
                  <span>{test.progress}%</span>
                </div>
                <div className="w-full bg-light-gray rounded-full h-2">
                  <div 
                    className="bg-warm-coral h-2 rounded-full transition-all"
                    style={{ width: `${test.progress}%` }}
                  />
                </div>
              </div>
            )}

            {test.lift.confidence > 0 && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-dark-gray">
                    +{test.lift.revenue.toFixed(1)}%
                  </p>
                  <p className="text-xs text-medium-gray">Revenue Lift</p>
                </div>
                <div className={`text-right ${getConfidenceColor(test.lift.confidence)}`}>
                  <p className="text-sm font-medium">{test.lift.confidence}%</p>
                  <p className="text-xs">Confidence</p>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Test Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Group Comparison */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="font-medium text-dark-gray mb-4">Test vs Control Groups</h3>
          
          {/* Group Stats */}
          <div className="space-y-4 mb-6">
            {selectedTest.groups.map((group) => (
              <div
                key={group.name}
                className={`p-4 rounded-lg ${
                  group.isControl ? "bg-white border border-silk-gray" : "bg-warm-coral/10 border border-warm-coral/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-medium-gray" />
                    <span className="font-medium text-dark-gray">{group.name}</span>
                  </div>
                  <span className="text-sm text-medium-gray">
                    {group.size.toLocaleString()} users
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-medium-gray">Spend</p>
                    <p className="font-medium text-dark-gray">
                      ${group.spend.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-medium-gray">Conversions</p>
                    <p className="font-medium text-dark-gray">
                      {group.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-medium-gray">Revenue</p>
                    <p className="font-medium text-dark-gray">
                      ${group.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lift Metrics */}
          {selectedTest.lift.confidence > 0 && (
            <div className="bg-gradient-to-r from-warm-coral/20 to-vibrant-orange/20 rounded-lg p-4">
              <h4 className="font-medium text-dark-gray mb-3">Incremental Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-dark-gray">
                      +{selectedTest.lift.conversions.toFixed(1)}%
                    </span>
                    <TrendingUp className="w-4 h-4 text-warm-coral" />
                  </div>
                  <p className="text-sm text-medium-gray">Conversion Lift</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-dark-gray">
                      +{selectedTest.lift.revenue.toFixed(1)}%
                    </span>
                    <TrendingUp className="w-4 h-4 text-warm-coral" />
                  </div>
                  <p className="text-sm text-medium-gray">Revenue Lift</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-warm-coral/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-medium-gray">Statistical Confidence</span>
                  <span className={`text-sm font-medium ${getConfidenceColor(selectedTest.lift.confidence)}`}>
                    {selectedTest.lift.confidence}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Performance Over Time */}
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="font-medium text-dark-gray mb-4">Daily Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DAILY_RESULTS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                <XAxis dataKey="day" stroke="#86868B" />
                <YAxis stroke="#86868B" />
                <Tooltip formatter={(value: any) => value.toFixed(1)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="test" 
                  stroke="#FF6B6B" 
                  strokeWidth={2}
                  name="Test Group"
                  dot={{ fill: "#FF6B6B", r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="control" 
                  stroke="#86868B" 
                  strokeWidth={2}
                  name="Control Group"
                  dot={{ fill: "#86868B", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-electric-blue/10 to-warm-coral/10 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warm-coral flex-shrink-0" />
          <div>
            <h3 className="font-medium text-dark-gray mb-3">Key Insights</h3>
            <ul className="space-y-2">
              {selectedTest.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-medium-gray">
                  <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="text-sm text-medium-gray hover:text-dark-gray flex items-center gap-1"
        >
          <Info className="w-4 h-4" />
          {showMethodology ? "Hide" : "Show"} Methodology
        </button>

        <div className="flex items-center gap-3">
          {selectedTest.status === "running" && (
            <button className="bg-white text-dark-gray px-4 py-2 rounded-lg border border-silk-gray hover:bg-light-gray transition-colors flex items-center gap-2">
              <Pause className="w-4 h-4" />
              Pause Test
            </button>
          )}
          {selectedTest.status === "completed" && (
            <button className="bg-warm-coral text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Apply Learnings
            </button>
          )}
          {selectedTest.status === "planning" && (
            <button className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Start Test
            </button>
          )}
        </div>
      </div>

      {/* Methodology */}
      <AnimatePresence>
        {showMethodology && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-silk-gray"
          >
            <h4 className="font-medium text-dark-gray mb-3">Testing Methodology</h4>
            <div className="space-y-2 text-sm text-medium-gray">
              <p>• Random assignment ensures unbiased group selection</p>
              <p>• Minimum 10,000 users per group for statistical power</p>
              <p>• Tests run for 14-28 days to capture full conversion cycles</p>
              <p>• Statistical significance calculated using two-tailed t-tests</p>
              <p>• 95% confidence level required for conclusive results</p>
              <p>• Automatic alerts when significance is reached</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}