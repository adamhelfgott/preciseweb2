"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [totalToday, setTotalToday] = useState(0);
  const [totalAllTime, setTotalAllTime] = useState(47230); // Start with mock data

  // Simulate live earnings
  useEffect(() => {
    // Initialize with some recent earnings
    const initialEarnings: Earning[] = [
      {
        id: "1",
        amount: 0.12,
        campaign: "Nike Summer Fitness",
        impressions: 543,
        timestamp: Date.now() - 5000,
        assetName: "Fitness Activity Events",
      },
      {
        id: "2",
        amount: 0.08,
        campaign: "Adidas Morning Warriors",
        impressions: 321,
        timestamp: Date.now() - 10000,
        assetName: "User Demographics",
      },
    ];
    setEarnings(initialEarnings);
    setTotalToday(initialEarnings.reduce((sum, e) => sum + e.amount, 0));

    // Generate new earnings periodically
    const interval = setInterval(() => {
      const brands = ["Nike", "Adidas", "Under Armour", "Peloton", "Apple Fitness"];
      const campaigns = ["Summer Fitness", "Morning Warriors", "Premium Athletes"];
      const assets = ["Fitness Activity Events", "User Demographics"];
      
      const newEarning: Earning = {
        id: Date.now().toString(),
        amount: Number((Math.random() * 0.13 + 0.02).toFixed(2)),
        campaign: `${brands[Math.floor(Math.random() * brands.length)]} ${campaigns[Math.floor(Math.random() * campaigns.length)]}`,
        impressions: Math.floor(Math.random() * 1000 + 100),
        timestamp: Date.now(),
        assetName: assets[Math.floor(Math.random() * assets.length)],
      };

      setEarnings(prev => [newEarning, ...prev].slice(0, 5));
      setTotalToday(prev => prev + newEarning.amount);
      setTotalAllTime(prev => prev + newEarning.amount);
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, []);

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

      {/* Live Feed */}
      <div className="space-y-3">
        <AnimatePresence>
          {earnings.map((earning) => (
            <motion.div
              key={earning.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-light-gray rounded-lg p-4 relative overflow-hidden"
            >
              {/* Pulse effect for new earnings */}
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-brand-green rounded-full"
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
                  {new Date(earning.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {earnings.length === 0 && (
        <div className="text-center py-8 text-medium-gray">
          <p>Waiting for earnings data...</p>
        </div>
      )}
    </div>
  );
}