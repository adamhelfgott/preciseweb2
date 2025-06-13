"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp } from "lucide-react";

interface Earning {
  id: string;
  amount: number;
  campaign: string;
  impressions: number;
  timestamp: number;
  assetName?: string;
}

export default function LiveEarningsTicker() {
  const { user } = useAuth();
  const [simulationActive, setSimulationActive] = useState(false);
  
  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );
  
  // Fetch real-time earnings from Convex
  const recentEarnings = useQuery(api.earnings.getEarnings, 
    convexUser?._id ? { ownerId: convexUser._id, limit: 5 } : "skip"
  );
  
  // Get earnings stats
  const earningsStats = useQuery(api.earnings.getEarningsStats,
    convexUser?._id ? { ownerId: convexUser._id } : "skip"
  );
  
  // Mutation for simulating earnings
  const simulateEarning = useMutation(api.earnings.simulateEarning);
  
  // Use Convex data or fall back to empty state
  const earnings = recentEarnings || [];
  const totalToday = earningsStats?.today || 0;
  const totalAllTime = (earningsStats?.total || 0) + (earningsStats?.pending || 0);

  // Simulate live earnings (for demo mode)
  useEffect(() => {
    if (!convexUser?._id || !simulationActive) return;
    
    // Generate new earnings periodically
    const interval = setInterval(async () => {
      try {
        await simulateEarning({ ownerId: convexUser._id });
      } catch (error) {
        console.error("Failed to simulate earning:", error);
      }
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive, simulateEarning]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-dark-gray">Live Earnings</h2>
        <div className="flex items-center gap-2 text-brand-green">
          <TrendingUp size={20} />
          <span className="text-sm font-medium">Real-time</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-brand-green/5 rounded-lg p-4">
          <p className="text-sm text-medium-gray mb-1">Today's Earnings</p>
          <p className="text-2xl font-bold text-brand-green">
            ${totalToday.toFixed(2)}
          </p>
        </div>
        <div className="bg-light-gray rounded-lg p-4">
          <p className="text-sm text-medium-gray mb-1">All Time</p>
          <p className="text-2xl font-bold text-dark-gray">
            ${totalAllTime.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Simulation Toggle (for demo) */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-medium-gray">Demo Mode</p>
        <button
          onClick={() => setSimulationActive(!simulationActive)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            simulationActive 
              ? "bg-brand-green text-white" 
              : "bg-light-gray text-medium-gray hover:bg-medium-gray/20"
          }`}
        >
          {simulationActive ? "Simulation Active" : "Start Simulation"}
        </button>
      </div>

      {/* Live Feed */}
      <div className="relative h-64 overflow-hidden">
        <div className="space-y-3 absolute inset-0 overflow-y-auto">
          <AnimatePresence mode="sync">
            {earnings.map((earning: any) => (
            <motion.div
              key={earning._id || earning.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-light-gray rounded-lg p-4 relative overflow-hidden"
            >
              {/* Pulse effect for new earnings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-brand-green rounded-lg pointer-events-none"
                style={{ transformOrigin: "center" }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-dark-gray">{earning.campaign}</p>
                    <p className="text-sm text-medium-gray">{earning.assetName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-green">+${earning.amount}</p>
                    <p className="text-xs text-medium-gray">{earning.impressions} impressions</p>
                  </div>
                </div>
                <p className="text-xs text-medium-gray">
                  {new Date(earning.timestamp || earning._creationTime).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>

      {earnings.length === 0 && (
        <div className="text-center py-8 text-medium-gray">
          <p>Waiting for earnings data...</p>
        </div>
      )}
    </div>
  );
}