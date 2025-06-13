'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, TrendingUp, AlertTriangle, Eye, MousePointer } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import Image from 'next/image';

interface Creative {
  id: string;
  type: 'image' | 'video' | 'carousel' | 'native';
  url: string;
  thumbnail?: string;
  name: string;
  format: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cvr: number;
  spend: number;
  cpa: number;
  fatigueScore: number; // 0-100
  daysActive: number;
  platforms?: string[];
}

const mockCreatives: Creative[] = [
  {
    id: '1',
    type: 'image',
    url: '/creatives/nike-runner-1.jpg',
    name: 'Nike Summer Hero - Runner',
    format: '1080x1080',
    impressions: 2450000,
    clicks: 48200,
    ctr: 1.97,
    conversions: 1820,
    cvr: 3.78,
    spend: 15600,
    cpa: 8.57,
    fatigueScore: 72,
    daysActive: 14,
    platforms: ['Instagram', 'Facebook', 'TikTok']
  },
  {
    id: '2',
    type: 'video',
    url: '/creatives/nike-morning-video.mp4',
    thumbnail: '/creatives/nike-morning-thumb.jpg',
    name: 'Morning Motivation 15s',
    format: '9:16 Video',
    impressions: 3200000,
    clicks: 89600,
    ctr: 2.80,
    conversions: 3584,
    cvr: 4.00,
    spend: 24000,
    cpa: 6.70,
    fatigueScore: 25,
    daysActive: 5,
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts']
  },
  {
    id: '3',
    type: 'image',
    url: '/creatives/nike-product-grid.jpg',
    name: 'Product Collection Grid',
    format: '1200x628',
    impressions: 1850000,
    clicks: 31450,
    ctr: 1.70,
    conversions: 1100,
    cvr: 3.50,
    spend: 11000,
    cpa: 10.00,
    fatigueScore: 45,
    daysActive: 10,
    platforms: ['Facebook', 'LinkedIn', 'Twitter']
  }
];

interface CreativeCarouselProps {
  campaignId?: string;
}

export default function CreativeCarousel({ campaignId }: CreativeCarouselProps) {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Fetch creatives from Convex
  // Only use campaignId if it's a valid Convex ID (starts with 'j')
  const isValidConvexId = campaignId?.startsWith('j');
  const creatives = useQuery(api.creatives.getCreatives,
    convexUser?._id && campaignId && isValidConvexId ? { campaignId: campaignId as any } : 
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Mutation for simulating performance
  const simulatePerformance = useMutation(api.creatives.simulateCreativePerformance);

  // Map Convex data to component format or use mock data
  const displayCreatives: Creative[] = creatives?.map(c => ({
    id: c._id,
    type: c.type,
    url: `/creatives/${c.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    name: c.name,
    format: c.format,
    impressions: c.impressions,
    clicks: c.clicks,
    ctr: c.ctr,
    conversions: c.conversions,
    cvr: c.cvr,
    spend: c.spend,
    cpa: c.cpa,
    fatigueScore: c.fatigueScore,
    daysActive: c.daysActive,
    platforms: c.type === 'video' ? ['TikTok', 'Instagram Reels', 'YouTube Shorts'] :
               c.type === 'carousel' ? ['Instagram', 'Facebook'] :
               ['Facebook', 'Instagram', 'TikTok']
  })) || mockCreatives;

  const currentCreative = displayCreatives[currentIndex] || mockCreatives[0];

  // Simulate performance updates
  useEffect(() => {
    if (!convexUser?._id || !simulationActive) return;

    const interval = setInterval(async () => {
      try {
        await simulatePerformance({ buyerId: convexUser._id });
      } catch (error) {
        console.error("Failed to simulate performance:", error);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive]); // Removed simulatePerformance - mutations are stable

  const nextCreative = () => {
    setCurrentIndex((prev) => (prev + 1) % displayCreatives.length);
  };

  const prevCreative = () => {
    setCurrentIndex((prev) => (prev - 1 + displayCreatives.length) % displayCreatives.length);
  };

  const getFatigueColor = (fatigue: number) => {
    if (fatigue < 30) return 'text-green-600 bg-green-50';
    if (fatigue < 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Creative Performance</h3>
          <div className="flex items-center gap-4">
            {/* Simulation Toggle */}
            {convexUser && (
              <button
                onClick={() => setSimulationActive(!simulationActive)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  simulationActive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {simulationActive ? "Live Updates On" : "Live Updates Off"}
              </button>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={prevCreative}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                {currentIndex + 1} / {displayCreatives.length}
              </span>
              <button
                onClick={nextCreative}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!user || !convexUser ? (
        <div className="flex items-center justify-center h-96 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading creatives...</p>
          </div>
        </div>
      ) : (
      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Creative Preview */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCreative.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              {currentCreative.type === 'image' ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-400 rounded-lg mx-auto mb-4" />
                    <p className="text-gray-600">{currentCreative.name}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-6 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white" />
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Creative Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{currentCreative.name}</h4>
              <span className="text-xs text-gray-500">{currentCreative.format}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {currentCreative.platforms.map((platform) => (
                <span key={platform} className="px-2 py-1 bg-gray-100 rounded">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          {/* Creative Fatigue Indicator */}
          <div className={`p-4 rounded-lg ${getFatigueColor(currentCreative.fatigueScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Creative Fatigue</span>
              </div>
              <span className="text-2xl font-bold">{currentCreative.fatigueScore.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <motion.div
                className="h-full bg-current rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${currentCreative.fatigueScore.toFixed(0)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm mt-2">
              Running for {currentCreative.daysActive} days • 
              {currentCreative.fatigueScore > 60 && ' Consider refreshing creative'}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Impressions</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {(currentCreative.impressions / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500">
                CTR: {currentCreative.ctr.toFixed(1)}%
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <MousePointer className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Clicks</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {(currentCreative.clicks / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500">
                CVR: {currentCreative.cvr.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Conversion & Cost Metrics */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Performance</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600">Conversions</p>
                <p className="text-lg font-bold text-gray-900">
                  {currentCreative.conversions.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Spend</p>
                <p className="text-lg font-bold text-gray-900">
                  ${(currentCreative.spend / 1000).toFixed(1)}K
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">CPA</p>
                <p className="text-lg font-bold text-green-600">
                  ${currentCreative.cpa.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Precise Impact */}
          <div className="bg-black text-white rounded-lg p-4">
            <h4 className="font-medium mb-2">Precise Data Impact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Without Precise</span>
                <span className="line-through text-gray-400">${(currentCreative.cpa * 1.8).toFixed(2)} CPA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-400">With Precise</span>
                <span className="font-bold">${currentCreative.cpa.toFixed(2)} CPA</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span>Savings per conversion</span>
                  <span className="text-green-400 font-bold">
                    ${(currentCreative.cpa * 0.8).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}