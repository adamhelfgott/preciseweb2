'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GitBranch, Monitor, Smartphone, Mail, Search, ShoppingCart, Globe, Video, DollarSign } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";

interface TouchPoint {
  channel: string;
  device?: string;
  timestamp: string;
  attribution: number;
  icon: React.ReactNode;
  dataSource?: string;
}

interface CustomerJourney {
  id: string;
  conversionValue: number;
  touchPoints: TouchPoint[];
}

const getChannelIcon = (channel: string) => {
  if (channel.toLowerCase().includes('precise')) return <GitBranch className="w-4 h-4" />;
  if (channel.toLowerCase().includes('google')) return <Search className="w-4 h-4" />;
  if (channel.toLowerCase().includes('meta') || channel.toLowerCase().includes('instagram')) return <Smartphone className="w-4 h-4" />;
  if (channel.toLowerCase().includes('email')) return <Mail className="w-4 h-4" />;
  if (channel.toLowerCase().includes('video')) return <Video className="w-4 h-4" />;
  if (channel.toLowerCase().includes('direct')) return <Monitor className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
};

const getDeviceFromChannel = (channel: string) => {
  if (channel.toLowerCase().includes('mobile') || channel.toLowerCase().includes('instagram')) return 'Mobile';
  if (channel.toLowerCase().includes('email') || channel.toLowerCase().includes('direct')) return 'Desktop';
  return 'Cross-device';
};

const formatTimestamp = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
};

const mockJourney: CustomerJourney = {
  id: '1',
  conversionValue: 89.99,
  touchPoints: [
    {
      channel: 'Precise Data - Intent Signal',
      device: 'Cross-device',
      timestamp: '7 days ago',
      attribution: 35,
      icon: <GitBranch className="w-4 h-4" />
    },
    {
      channel: 'Google Search',
      device: 'Mobile',
      timestamp: '5 days ago',
      attribution: 15,
      icon: <Search className="w-4 h-4" />
    },
    {
      channel: 'Instagram Story Ad',
      device: 'Mobile',
      timestamp: '3 days ago',
      attribution: 25,
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      channel: 'Email Retargeting',
      device: 'Desktop',
      timestamp: '2 days ago',
      attribution: 10,
      icon: <Mail className="w-4 h-4" />
    },
    {
      channel: 'Direct Site Visit',
      device: 'Desktop',
      timestamp: '1 day ago',
      attribution: 15,
      icon: <Monitor className="w-4 h-4" />
    }
  ]
};

interface MultiTouchAttributionProps {
  campaignId?: string;
}

export default function MultiTouchAttribution({ campaignId }: MultiTouchAttributionProps) {
  const { user } = useAuth();
  const [simulationActive, setSimulationActive] = useState(false);
  
  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get campaigns if no specific campaign is provided
  const campaigns = useQuery(api.campaigns.getCampaigns,
    convexUser?._id && !campaignId ? { buyerId: convexUser._id } : "skip"
  );

  // Use provided campaign or first campaign
  const isValidConvexId = campaignId?.startsWith('j');
  const targetCampaignId = (campaignId && isValidConvexId) ? campaignId : campaigns?.[0]?._id;

  // Fetch touch points from Convex
  const touchPoints = useQuery(api.attribution.getTouchPoints,
    targetCampaignId ? { campaignId: targetCampaignId as any, limit: 5 } : "skip"
  );

  // Mutation for simulating attribution
  const simulateAttribution = useMutation(api.attribution.simulateAttribution);

  // Map Convex data to component format
  const journey: CustomerJourney = touchPoints?.[0] ? {
    id: touchPoints[0]._id,
    conversionValue: touchPoints[0].totalValue,
    touchPoints: touchPoints[0].touchPoints.map((tp: any) => ({
      channel: tp.channel,
      device: getDeviceFromChannel(tp.channel),
      timestamp: formatTimestamp(tp.timestamp),
      attribution: tp.attribution,
      icon: getChannelIcon(tp.channel),
      dataSource: tp.dataSource,
    }))
  } : mockJourney;

  // Simulate attribution data
  useEffect(() => {
    if (!convexUser?._id || !targetCampaignId || !simulationActive) return;

    const interval = setInterval(async () => {
      try {
        await simulateAttribution({ 
          campaignId: targetCampaignId as any,
          buyerId: convexUser._id 
        });
      } catch (error) {
        console.error("Failed to simulate attribution:", error);
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, targetCampaignId, simulationActive, simulateAttribution]);

  const totalTouchPoints = journey.touchPoints.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Multi-Touch Attribution</h3>
          <p className="text-sm text-gray-600 mt-1">Shapley value-based credit distribution</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Simulation Toggle */}
          {convexUser && (
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                simulationActive 
                  ? "bg-purple-100 text-purple-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {simulationActive ? "Simulation On" : "Simulation Off"}
            </button>
          )}
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">${journey.conversionValue.toFixed(2)} conversion</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!user || !convexUser ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading attribution data...</p>
          </div>
        </div>
      ) : (
      <>
      {/* Journey Visualization */}
      <div className="relative mb-8">
        {/* Connection Line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-300" />
        
        {/* Touch Points */}
        <div className="relative flex justify-between">
          {journey.touchPoints.map((touchPoint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Node */}
              <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                touchPoint.channel.includes('Precise') 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {touchPoint.icon}
                {/* Attribution Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                  {touchPoint.attribution}%
                </div>
              </div>
              
              {/* Details */}
              <div className="mt-4 text-center">
                <p className="text-xs font-medium text-gray-900 max-w-[100px]">
                  {touchPoint.channel}
                </p>
                <p className="text-xs text-gray-500 mt-1">{touchPoint.device}</p>
                <p className="text-xs text-gray-400">{touchPoint.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Attribution Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Credit Distribution</h4>
        {journey.touchPoints.map((touchPoint, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              touchPoint.channel.includes('Precise')
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {touchPoint.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{touchPoint.channel}</span>
                <span className="text-sm font-medium text-gray-900">
                  ${((touchPoint.attribution / 100) * journey.conversionValue).toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-full rounded-full ${
                    touchPoint.channel.includes('Precise')
                      ? 'bg-black'
                      : 'bg-gray-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${touchPoint.attribution}%` }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Attribution Insights</h4>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Precise data signals initiated {journey.touchPoints.find(tp => tp.channel.includes('Precise'))?.attribution || 35}% of conversion value</li>
          <li>• Cross-device identity resolution enabled {journey.touchPoints.filter(tp => tp.device === 'Cross-device').length} touchpoints</li>
          <li>• {journey.touchPoints.length} touchpoints tracked across customer journey</li>
        </ul>
      </div>
      </>
      )}
    </div>
  );
}