'use client';

import { motion } from 'framer-motion';
import { GitBranch, Monitor, Smartphone, Mail, Search, ShoppingCart } from 'lucide-react';

interface TouchPoint {
  channel: string;
  device: string;
  timestamp: string;
  attribution: number;
  icon: React.ReactNode;
}

interface CustomerJourney {
  id: string;
  conversionValue: number;
  touchPoints: TouchPoint[];
}

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

export default function MultiTouchAttribution() {
  const totalTouchPoints = mockJourney.touchPoints.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Multi-Touch Attribution</h3>
          <p className="text-sm text-gray-600 mt-1">Shapley value-based credit distribution</p>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium">${mockJourney.conversionValue} conversion</span>
        </div>
      </div>

      {/* Journey Visualization */}
      <div className="relative mb-8">
        {/* Connection Line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-300" />
        
        {/* Touch Points */}
        <div className="relative flex justify-between">
          {mockJourney.touchPoints.map((touchPoint, index) => (
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
        {mockJourney.touchPoints.map((touchPoint, index) => (
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
                  ${((touchPoint.attribution / 100) * mockJourney.conversionValue).toFixed(2)}
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
          <li>• Precise data signals initiated 35% of conversion value</li>
          <li>• Cross-device identity resolution enabled 3 additional touchpoints</li>
          <li>• Email had lower attribution due to assisted conversions</li>
        </ul>
      </div>
    </div>
  );
}