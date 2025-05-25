"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingDown, RefreshCw, X, ChevronRight, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FatiguedCreative {
  id: string;
  campaignName: string;
  creativeName: string;
  impressions: number;
  currentCTR: number;
  peakCTR: number;
  declineRate: number;
  daysActive: number;
  recommendation: string;
  urgency: "high" | "medium" | "low";
  performanceData: Array<{ date: string; ctr: number }>;
}

const MOCK_FATIGUED_CREATIVES: FatiguedCreative[] = [
  {
    id: "1",
    campaignName: "Nike Summer Fitness",
    creativeName: "Beach Runner Hero v2",
    impressions: 2145000,
    currentCTR: 1.2,
    peakCTR: 2.8,
    declineRate: -57,
    daysActive: 21,
    recommendation: "Replace immediately - CTR below threshold",
    urgency: "high",
    performanceData: Array.from({ length: 21 }, (_, i) => ({
      date: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      ctr: 2.8 - (i * 0.08),
    })),
  },
  {
    id: "2",
    campaignName: "Adidas Morning Warriors",
    creativeName: "Sunrise Stretch Static",
    impressions: 892000,
    currentCTR: 1.8,
    peakCTR: 2.4,
    declineRate: -25,
    daysActive: 14,
    recommendation: "Refresh in next 3-5 days",
    urgency: "medium",
    performanceData: Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      ctr: 2.4 - (i * 0.04),
    })),
  },
  {
    id: "3",
    campaignName: "Under Armour Premium",
    creativeName: "Athlete Portrait Series",
    impressions: 567000,
    currentCTR: 2.1,
    peakCTR: 2.5,
    declineRate: -16,
    daysActive: 7,
    recommendation: "Monitor closely - slight decline detected",
    urgency: "low",
    performanceData: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      ctr: 2.5 - (i * 0.06),
    })),
  },
];

export default function CreativeFatigueAlert() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState<FatiguedCreative | null>(null);
  const [alerts, setAlerts] = useState(MOCK_FATIGUED_CREATIVES);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  const highUrgencyCount = activeAlerts.filter(a => a.urgency === "high").length;

  const handleDismiss = (id: string) => {
    setDismissedAlerts([...dismissedAlerts, id]);
    if (selectedCreative?.id === id) {
      setSelectedCreative(null);
    }
  };

  const handleRefresh = (creative: FatiguedCreative) => {
    console.log(`Refreshing creative: ${creative.creativeName}`);
    // In a real app, this would trigger the creative refresh workflow
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-warm-coral bg-warm-coral/10 border-warm-coral";
      case "medium": return "text-vibrant-orange bg-vibrant-orange/10 border-vibrant-orange";
      case "low": return "text-electric-blue bg-electric-blue/10 border-electric-blue";
      default: return "text-medium-gray bg-light-gray border-silk-gray";
    }
  };

  if (activeAlerts.length === 0) return null;

  return (
    <>
      {/* Alert Badge */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`fixed bottom-24 right-6 z-40 ${
          highUrgencyCount > 0 ? "bg-warm-coral" : "bg-vibrant-orange"
        } text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group`}
        onClick={() => setIsExpanded(true)}
      >
        <div className="relative">
          <AlertTriangle className="w-6 h-6" />
          {highUrgencyCount > 0 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
            />
          )}
        </div>
        <div className="absolute -top-2 -right-2 bg-dark-gray text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {activeAlerts.length}
        </div>
      </motion.button>

      {/* Alert Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 right-0 w-full sm:w-96 bg-white rounded-t-xl shadow-2xl z-50 max-h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-silk-gray">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warm-coral/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-warm-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Creative Fatigue Alerts</h3>
                    <p className="text-xs text-medium-gray">{activeAlerts.length} creatives need attention</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-light-gray rounded-md transition-colors"
                >
                  <X className="w-5 h-5 text-medium-gray" />
                </button>
              </div>
            </div>

            {/* Alert List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    getUrgencyColor(alert.urgency)
                  }`}
                  onClick={() => setSelectedCreative(alert)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-dark-gray">{alert.creativeName}</h4>
                      <p className="text-xs text-medium-gray">{alert.campaignName}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(alert.id);
                      }}
                      className="p-1 hover:bg-white/50 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm font-medium">{alert.declineRate}%</span>
                    </div>
                    <div className="text-sm text-medium-gray">
                      CTR: {alert.currentCTR}% (was {alert.peakCTR}%)
                    </div>
                  </div>

                  <p className="text-xs text-medium-gray mb-3">{alert.recommendation}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-medium-gray">
                      {(alert.impressions / 1000000).toFixed(1)}M impressions
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRefresh(alert);
                      }}
                      className="flex items-center gap-1 text-xs font-medium hover:underline"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Quick Refresh
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-silk-gray bg-light-gray/50">
              <button className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Zap className="w-4 h-4" />
                Auto-Refresh All Creatives
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Creative Detail Modal */}
      <AnimatePresence>
        {selectedCreative && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-60"
              onClick={() => setSelectedCreative(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-60 max-h-[80vh] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-dark-gray">{selectedCreative.creativeName}</h2>
                    <p className="text-medium-gray">{selectedCreative.campaignName}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCreative(null)}
                    className="p-2 hover:bg-light-gray rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-medium-gray" />
                  </button>
                </div>

                {/* Performance Chart */}
                <div className="bg-light-gray rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-dark-gray mb-4">CTR Performance Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedCreative.performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
                        <XAxis dataKey="date" stroke="#86868B" />
                        <YAxis stroke="#86868B" tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value: any) => `${value}%`} />
                        <Line 
                          type="monotone" 
                          dataKey="ctr" 
                          stroke="#FF6B6B" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-light-gray rounded-lg p-4">
                    <p className="text-sm text-medium-gray mb-1">Current CTR</p>
                    <p className="text-2xl font-bold text-dark-gray">{selectedCreative.currentCTR}%</p>
                  </div>
                  <div className="bg-light-gray rounded-lg p-4">
                    <p className="text-sm text-medium-gray mb-1">Peak CTR</p>
                    <p className="text-2xl font-bold text-dark-gray">{selectedCreative.peakCTR}%</p>
                  </div>
                  <div className="bg-light-gray rounded-lg p-4">
                    <p className="text-sm text-medium-gray mb-1">Decline</p>
                    <p className="text-2xl font-bold text-warm-coral">{selectedCreative.declineRate}%</p>
                  </div>
                  <div className="bg-light-gray rounded-lg p-4">
                    <p className="text-sm text-medium-gray mb-1">Days Active</p>
                    <p className="text-2xl font-bold text-dark-gray">{selectedCreative.daysActive}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-brand-green text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Refresh Creative
                  </button>
                  <button className="flex-1 bg-white text-dark-gray py-3 rounded-lg border border-silk-gray hover:bg-light-gray transition-colors">
                    View All Variants
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}