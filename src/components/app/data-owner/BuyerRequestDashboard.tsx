"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, TrendingUp, Users, DollarSign, Clock, CheckCircle, X, ChevronRight, Filter, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BuyerRequest {
  id: string;
  buyerName: string;
  buyerType: "agency" | "brand" | "dsp";
  requestType: "specific" | "general" | "rfp";
  segments: string[];
  budget: number;
  timeline: string;
  status: "new" | "reviewing" | "negotiating" | "matched" | "declined";
  matchScore: number;
  estimatedRevenue: number;
  requirements: string[];
  createdAt: string;
}

interface MarketDemand {
  segment: string;
  requests: number;
  avgBudget: number;
  growth: number;
}

const ACTIVE_REQUESTS: BuyerRequest[] = [
  {
    id: "1",
    buyerName: "Omnicom Media Group",
    buyerType: "agency",
    requestType: "specific",
    segments: ["Fitness Enthusiasts", "High-Value Shoppers"],
    budget: 125000,
    timeline: "Q2 2025",
    status: "new",
    matchScore: 92,
    estimatedRevenue: 8500,
    requirements: [
      "2M+ verified users",
      "Real-time data refresh",
      "Cross-device matching",
      "90%+ accuracy rate"
    ],
    createdAt: "2 hours ago"
  },
  {
    id: "2",
    buyerName: "Nike Direct",
    buyerType: "brand",
    requestType: "rfp",
    segments: ["Athletic Performance", "Outdoor Activities"],
    budget: 250000,
    timeline: "Immediate",
    status: "reviewing",
    matchScore: 88,
    estimatedRevenue: 15200,
    requirements: [
      "Exclusive access option",
      "Custom segment creation",
      "Weekly performance reports",
      "API integration"
    ],
    createdAt: "1 day ago"
  },
  {
    id: "3",
    buyerName: "The Trade Desk",
    buyerType: "dsp",
    requestType: "general",
    segments: ["Premium Demographics", "Location Context"],
    budget: 75000,
    timeline: "Ongoing",
    status: "negotiating",
    matchScore: 78,
    estimatedRevenue: 5800,
    requirements: [
      "Programmatic activation",
      "Sub-second query response",
      "GDPR compliant",
      "Lookalike modeling"
    ],
    createdAt: "3 days ago"
  },
  {
    id: "4",
    buyerName: "Publicis Groupe",
    buyerType: "agency",
    requestType: "specific",
    segments: ["Health & Wellness", "Fitness Enthusiasts"],
    budget: 180000,
    timeline: "Q2-Q3 2025",
    status: "new",
    matchScore: 95,
    estimatedRevenue: 12400,
    requirements: [
      "Minimum 1M MAUs",
      "Behavioral targeting",
      "Attribution tracking",
      "Competitive exclusivity"
    ],
    createdAt: "5 hours ago"
  },
  {
    id: "5",
    buyerName: "Amazon DSP",
    buyerType: "dsp",
    requestType: "general",
    segments: ["Shopping Intent", "Brand Affinity"],
    budget: 300000,
    timeline: "Q2 2025",
    status: "matched",
    matchScore: 68,
    estimatedRevenue: 18900,
    requirements: [
      "E-commerce signals",
      "Purchase history indicators",
      "Real-time activation",
      "Multi-touch attribution"
    ],
    createdAt: "1 week ago"
  }
];

const MARKET_DEMAND: MarketDemand[] = [
  { segment: "Fitness & Health", requests: 42, avgBudget: 145000, growth: 35 },
  { segment: "Premium Shopping", requests: 38, avgBudget: 178000, growth: 28 },
  { segment: "Travel Intent", requests: 31, avgBudget: 92000, growth: 45 },
  { segment: "Auto Intenders", requests: 27, avgBudget: 210000, growth: 18 },
  { segment: "Financial Services", requests: 24, avgBudget: 165000, growth: 22 }
];

const DEMAND_TREND = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  requests: 20 + Math.random() * 15 + (i / 30) * 10,
  matched: 15 + Math.random() * 10 + (i / 30) * 8
}));

export default function BuyerRequestDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);

  const filteredRequests = ACTIVE_REQUESTS.filter(req => {
    if (filterStatus !== "all" && req.status !== filterStatus) return false;
    if (showOnlyMatches && req.matchScore < 80) return false;
    return true;
  });

  const totalPotentialRevenue = filteredRequests.reduce((sum, req) => sum + req.estimatedRevenue, 0);
  const avgMatchScore = filteredRequests.reduce((sum, req) => sum + req.matchScore, 0) / filteredRequests.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "text-brand-green bg-brand-green/10";
      case "reviewing": return "text-electric-blue bg-electric-blue/10";
      case "negotiating": return "text-vibrant-orange bg-vibrant-orange/10";
      case "matched": return "text-bright-purple bg-bright-purple/10";
      case "declined": return "text-medium-gray bg-light-gray";
      default: return "text-medium-gray bg-light-gray";
    }
  };

  const getBuyerTypeIcon = (type: string) => {
    switch (type) {
      case "agency": return <Users className="w-4 h-4" />;
      case "brand": return <TrendingUp className="w-4 h-4" />;
      case "dsp": return <Sparkles className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warm-coral/10 rounded-lg">
            <Bell className="w-5 h-5 text-warm-coral" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Buyer Request Dashboard</h2>
            <p className="text-sm text-medium-gray">Match your data with active buyer needs</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-brand-green">
              ${(totalPotentialRevenue / 1000).toFixed(0)}k
            </p>
            <p className="text-sm text-medium-gray">Potential revenue</p>
          </div>
          <button className="bg-warm-coral text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Find Buyers
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-light-gray rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Bell className="w-5 h-5 text-warm-coral" />
            <span className="text-xs bg-warm-coral/10 text-warm-coral px-2 py-1 rounded-full">
              +12 today
            </span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">{ACTIVE_REQUESTS.length}</p>
          <p className="text-sm text-medium-gray">Active Requests</p>
        </div>
        <div className="bg-light-gray rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-brand-green" />
          </div>
          <p className="text-2xl font-bold text-dark-gray">{avgMatchScore.toFixed(0)}%</p>
          <p className="text-sm text-medium-gray">Avg Match Score</p>
        </div>
        <div className="bg-light-gray rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-electric-blue" />
          </div>
          <p className="text-2xl font-bold text-dark-gray">
            ${(ACTIVE_REQUESTS.reduce((sum, req) => sum + req.budget, 0) / 1000).toFixed(0)}k
          </p>
          <p className="text-sm text-medium-gray">Total Budget</p>
        </div>
        <div className="bg-light-gray rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-bright-purple" />
          </div>
          <p className="text-2xl font-bold text-dark-gray">2.3 days</p>
          <p className="text-sm text-medium-gray">Avg Response Time</p>
        </div>
      </div>

      {/* Market Demand Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="font-medium text-dark-gray mb-4">Request Volume Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DEMAND_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                <XAxis dataKey="day" stroke="#86868B" />
                <YAxis stroke="#86868B" />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#FF6B6B" strokeWidth={2} name="New Requests" />
                <Line type="monotone" dataKey="matched" stroke="#1DB954" strokeWidth={2} name="Matched" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-light-gray rounded-lg p-6">
          <h3 className="font-medium text-dark-gray mb-4">Hot Segments</h3>
          <div className="space-y-3">
            {MARKET_DEMAND.map((segment) => (
              <div key={segment.segment} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-dark-gray">{segment.segment}</span>
                    <span className="text-xs text-brand-green">+{segment.growth}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-warm-coral to-vibrant-orange h-2 rounded-full"
                      style={{ width: `${(segment.requests / 42) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-medium-gray">{segment.requests} requests</span>
                    <span className="text-xs text-medium-gray">
                      Avg ${(segment.avgBudget / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filterStatus === "all"
                ? "bg-dark-gray text-white"
                : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
            }`}
          >
            All Requests
          </button>
          {["new", "reviewing", "negotiating", "matched"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                filterStatus === status
                  ? "bg-dark-gray text-white"
                  : "bg-white border border-silk-gray text-medium-gray hover:border-dark-gray"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showOnlyMatches}
            onChange={(e) => setShowOnlyMatches(e.target.checked)}
            className="w-4 h-4 text-brand-green rounded focus:ring-brand-green"
          />
          <span className="text-medium-gray">Show only 80%+ matches</span>
        </label>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <motion.div
            key={request.id}
            layout
            className="bg-white border border-silk-gray rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedRequest(request)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  request.buyerType === "agency" ? "bg-electric-blue/10" :
                  request.buyerType === "brand" ? "bg-brand-green/10" :
                  "bg-bright-purple/10"
                }`}>
                  {getBuyerTypeIcon(request.buyerType)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-dark-gray">{request.buyerName}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-xs text-medium-gray">{request.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-medium-gray">
                    <span>Budget: ${(request.budget / 1000).toFixed(0)}k</span>
                    <span>•</span>
                    <span>Timeline: {request.timeline}</span>
                    <span>•</span>
                    <span className="capitalize">{request.requestType} request</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-medium-gray">Match</span>
                  <span className={`text-2xl font-bold ${
                    request.matchScore >= 90 ? "text-brand-green" :
                    request.matchScore >= 80 ? "text-electric-blue" :
                    request.matchScore >= 70 ? "text-vibrant-orange" :
                    "text-warm-coral"
                  }`}>
                    {request.matchScore}%
                  </span>
                </div>
                <p className="text-sm text-medium-gray">
                  Est. ${(request.estimatedRevenue / 1000).toFixed(1)}k/mo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {request.segments.map((segment) => (
                <span key={segment} className="px-3 py-1 bg-light-gray rounded-full text-xs text-dark-gray">
                  {segment}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                {request.requirements.slice(0, 2).map((req, index) => (
                  <span key={index} className="text-medium-gray flex items-center gap-1">
                    <Check className="w-3 h-3 text-brand-green" />
                    {req}
                  </span>
                ))}
                {request.requirements.length > 2 && (
                  <span className="text-medium-gray">
                    +{request.requirements.length - 2} more
                  </span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-medium-gray" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Request Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedRequest(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-dark-gray">{selectedRequest.buyerName}</h2>
                  <p className="text-medium-gray capitalize">{selectedRequest.buyerType} • {selectedRequest.requestType} Request</p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-light-gray rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-medium-gray" />
                </button>
              </div>

              {/* Match Score */}
              <div className="bg-gradient-to-r from-brand-green/10 to-electric-blue/10 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-medium-gray mb-1">Match Score</p>
                    <p className={`text-4xl font-bold ${
                      selectedRequest.matchScore >= 90 ? "text-brand-green" :
                      selectedRequest.matchScore >= 80 ? "text-electric-blue" :
                      "text-vibrant-orange"
                    }`}>
                      {selectedRequest.matchScore}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-medium-gray mb-1">Estimated Monthly Revenue</p>
                    <p className="text-2xl font-bold text-dark-gray">
                      ${selectedRequest.estimatedRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-medium-gray">Budget:</span>
                    <span className="ml-2 font-medium text-dark-gray">
                      ${selectedRequest.budget.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-medium-gray">Timeline:</span>
                    <span className="ml-2 font-medium text-dark-gray">{selectedRequest.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="font-medium text-dark-gray mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedRequest.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-medium-gray">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Segments */}
              <div className="mb-6">
                <h3 className="font-medium text-dark-gray mb-3">Requested Segments</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.segments.map((segment) => (
                    <span key={segment} className="px-4 py-2 bg-light-gray rounded-lg text-sm text-dark-gray">
                      {segment}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-brand-green text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Accept & Connect
                </button>
                <button className="flex-1 bg-white text-dark-gray py-3 rounded-lg border border-silk-gray hover:bg-light-gray transition-colors">
                  Request More Info
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}