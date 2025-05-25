"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  Target, 
  Brain,
  Layers,
  UserCheck,
  AlertCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from "recharts";

interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  performance: {
    ctr: number;
    cvr: number;
    cpa: number;
    roas: number;
  };
  trend: "up" | "down" | "stable";
  insights: string[];
  verified: boolean;
}

interface OverlapData {
  segment1: string;
  segment2: string;
  overlap: number;
  opportunity: string;
}

const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: "1",
    name: "Verified Tech Professionals",
    size: 245000,
    performance: {
      ctr: 5.2,
      cvr: 8.4,
      cpa: 12.50,
      roas: 4.2
    },
    trend: "up",
    insights: [
      "32% higher engagement on weekday mornings",
      "Responds well to technical feature messaging",
      "High affinity for productivity tools"
    ],
    verified: true
  },
  {
    id: "2",
    name: "Fitness Enthusiasts 25-34",
    size: 189000,
    performance: {
      ctr: 4.8,
      cvr: 6.2,
      cpa: 18.75,
      roas: 3.5
    },
    trend: "up",
    insights: [
      "Peak engagement during lunch hours",
      "Strong response to motivational content",
      "Cross-sells well with nutrition products"
    ],
    verified: true
  },
  {
    id: "3",
    name: "Premium Streaming Subscribers",
    size: 312000,
    performance: {
      ctr: 3.9,
      cvr: 4.1,
      cpa: 24.00,
      roas: 2.8
    },
    trend: "stable",
    insights: [
      "Higher conversion on weekend evenings",
      "Responds to exclusive content offers",
      "Low price sensitivity"
    ],
    verified: true
  },
  {
    id: "4",
    name: "Luxury Auto Intenders",
    size: 78000,
    performance: {
      ctr: 2.1,
      cvr: 1.8,
      cpa: 145.00,
      roas: 1.5
    },
    trend: "down",
    insights: [
      "Showing fatigue after 1.2M impressions",
      "Better performance with video content",
      "Needs fresh creative approach"
    ],
    verified: true
  }
];

const PERFORMANCE_TIMELINE = [
  { day: "Mon", tech: 5.2, fitness: 4.5, streaming: 3.8, auto: 2.3 },
  { day: "Tue", tech: 5.4, fitness: 4.6, streaming: 3.9, auto: 2.2 },
  { day: "Wed", tech: 5.6, fitness: 4.8, streaming: 3.7, auto: 2.1 },
  { day: "Thu", tech: 5.8, fitness: 5.0, streaming: 4.0, auto: 2.0 },
  { day: "Fri", tech: 5.5, fitness: 4.7, streaming: 4.2, auto: 1.9 },
  { day: "Sat", tech: 4.2, fitness: 5.2, streaming: 4.5, auto: 2.2 },
  { day: "Sun", tech: 4.0, fitness: 5.4, streaming: 4.8, auto: 2.4 }
];

const OVERLAP_DATA: OverlapData[] = [
  {
    segment1: "Tech Professionals",
    segment2: "Fitness Enthusiasts",
    overlap: 34,
    opportunity: "Tech-savvy fitness apps"
  },
  {
    segment1: "Tech Professionals",
    segment2: "Premium Streaming",
    overlap: 58,
    opportunity: "Productivity content"
  },
  {
    segment1: "Fitness Enthusiasts",
    segment2: "Premium Streaming",
    overlap: 42,
    opportunity: "Wellness content"
  }
];

const RADAR_DATA = [
  { attribute: "Engagement", tech: 92, fitness: 88, streaming: 75, auto: 45 },
  { attribute: "Conversion", tech: 85, fitness: 78, streaming: 65, auto: 35 },
  { attribute: "Retention", tech: 88, fitness: 82, streaming: 80, auto: 40 },
  { attribute: "Value", tech: 90, fitness: 75, streaming: 70, auto: 60 },
  { attribute: "Growth", tech: 95, fitness: 90, streaming: 68, auto: 30 }
];

const TREEMAP_DATA = [
  { name: "Tech Professionals", size: 245000, fill: "#F97316" },
  { name: "Fitness Enthusiasts", size: 189000, fill: "#6366F1" },
  { name: "Premium Streaming", size: 312000, fill: "#10B981" },
  { name: "Luxury Auto", size: 78000, fill: "#F59E0B" },
  { name: "Lookalike: Tech", size: 156000, fill: "#EC4899" },
  { name: "Lookalike: Fitness", size: 98000, fill: "#8B5CF6" }
];

export default function AudienceInsights() {
  const totalReach = AUDIENCE_SEGMENTS.reduce((sum, s) => sum + s.size, 0);
  const avgCTR = AUDIENCE_SEGMENTS.reduce((sum, s) => sum + s.performance.ctr, 0) / AUDIENCE_SEGMENTS.length;
  const verifiedPercentage = (AUDIENCE_SEGMENTS.filter(s => s.verified).length / AUDIENCE_SEGMENTS.length) * 100;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-light-gray rounded-lg shadow-lg">
          <p className="text-sm font-medium text-dark-gray mb-1">{payload[0].payload.name}</p>
          <p className="text-xs text-medium-gray">Size: {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <Users className="w-6 h-6" />
              Audience Intelligence Center
            </h3>
            <p className="text-white/80">
              Verified audience insights powered by Precise's credential system
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-white/80 text-sm">Total Reach</p>
              <p className="text-2xl font-bold">{(totalReach / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Avg. CTR</p>
              <p className="text-2xl font-bold">{avgCTR.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Verified Data</p>
              <p className="text-2xl font-bold">{verifiedPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Timeline and Audience Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Day */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">CTR Performance by Day</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_TIMELINE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
                  formatter={(value) => `${value}%`}
                />
                <Line type="monotone" dataKey="tech" stroke="#F97316" strokeWidth={2} name="Tech" />
                <Line type="monotone" dataKey="fitness" stroke="#6366F1" strokeWidth={2} name="Fitness" />
                <Line type="monotone" dataKey="streaming" stroke="#10B981" strokeWidth={2} name="Streaming" />
                <Line type="monotone" dataKey="auto" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="Auto" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Size Map */}
        <div className="bg-white rounded-xl border border-light-gray p-6">
          <h4 className="font-semibold text-dark-gray mb-4">Audience Size Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={TREEMAP_DATA}
                dataKey="size"
                content={<CustomTooltip />}
              />
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Segment Performance Cards */}
      <div className="space-y-4">
        <h4 className="font-semibold text-dark-gray flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-orange" />
          Segment Performance Analysis
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {AUDIENCE_SEGMENTS.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-light-gray p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-dark-gray">{segment.name}</h5>
                    {segment.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-medium-gray">
                    {(segment.size / 1000).toFixed(0)}K users
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {segment.trend === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {segment.trend === "down" && <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />}
                  <span className={`text-sm font-medium ${
                    segment.trend === "up" ? "text-green-600" : 
                    segment.trend === "down" ? "text-red-600" : 
                    "text-medium-gray"
                  }`}>
                    {segment.trend === "up" ? "+12%" : segment.trend === "down" ? "-8%" : "0%"}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <p className="text-xs text-medium-gray">CTR</p>
                  <p className="text-sm font-semibold text-dark-gray">{segment.performance.ctr}%</p>
                </div>
                <div>
                  <p className="text-xs text-medium-gray">CVR</p>
                  <p className="text-sm font-semibold text-dark-gray">{segment.performance.cvr}%</p>
                </div>
                <div>
                  <p className="text-xs text-medium-gray">CPA</p>
                  <p className="text-sm font-semibold text-dark-gray">${segment.performance.cpa}</p>
                </div>
                <div>
                  <p className="text-xs text-medium-gray">ROAS</p>
                  <p className="text-sm font-semibold text-dark-gray">{segment.performance.roas}x</p>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-purple-900">AI Insights:</p>
                    {segment.insights.map((insight, i) => (
                      <p key={i} className="text-xs text-purple-800">• {insight}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audience Overlap Analysis */}
      <div className="bg-white rounded-xl border border-light-gray p-6">
        <h4 className="font-semibold text-dark-gray mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary-orange" />
          Audience Overlap Opportunities
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {OVERLAP_DATA.map((overlap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-dark-gray">{overlap.overlap}% Overlap</p>
                <Sparkles className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs text-medium-gray mb-1">
                {overlap.segment1} × {overlap.segment2}
              </p>
              <p className="text-xs font-medium text-indigo-700 mt-2">
                Opportunity: {overlap.opportunity}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lookalike Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
      >
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <Brain className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-dark-gray mb-2">Lookalike Expansion Opportunity</h4>
            <p className="text-sm text-medium-gray mb-3">
              Based on your top-performing "Tech Professionals" segment, we've identified 156K lookalike users 
              with 89% similarity score. Expected performance: 4.8% CTR, 3.8x ROAS.
            </p>
            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
                Activate Lookalike <ChevronRight className="w-4 h-4" />
              </button>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Similarity Analysis
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}