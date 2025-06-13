'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRealtimeSimulation, SimulationEvent } from '@/hooks/useRealtimeSimulation';
import { 
  Activity, 
  MousePointer, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Tv,
  Headphones,
  Pause,
  Play
} from 'lucide-react';

const getEventIcon = (type: SimulationEvent['type']) => {
  switch (type) {
    case 'impression':
      return <Activity className="w-4 h-4" />;
    case 'click':
      return <MousePointer className="w-4 h-4" />;
    case 'conversion':
      return <ShoppingCart className="w-4 h-4" />;
    case 'attribution':
      return <TrendingUp className="w-4 h-4" />;
    case 'earning':
      return <DollarSign className="w-4 h-4" />;
  }
};

const getEventColor = (type: SimulationEvent['type']) => {
  switch (type) {
    case 'impression':
      return 'text-blue-600 bg-blue-50';
    case 'click':
      return 'text-purple-600 bg-purple-50';
    case 'conversion':
      return 'text-green-600 bg-green-50';
    case 'attribution':
      return 'text-orange-600 bg-orange-50';
    case 'earning':
      return 'text-emerald-600 bg-emerald-50';
  }
};

const getDeviceIcon = (device?: string) => {
  switch (device) {
    case 'Mobile':
      return <Smartphone className="w-3 h-3" />;
    case 'Desktop':
      return <Monitor className="w-3 h-3" />;
    case 'Tablet':
      return <Tablet className="w-3 h-3" />;
    case 'CTV':
      return <Tv className="w-3 h-3" />;
    case 'Audio':
      return <Headphones className="w-3 h-3" />;
    default:
      return <Monitor className="w-3 h-3" />;
  }
};

interface RealtimeActivityFeedProps {
  showStats?: boolean;
  maxEvents?: number;
  eventsPerSecond?: number;
}

export default function RealtimeActivityFeed({ 
  showStats = true, 
  maxEvents = 10,
  eventsPerSecond = 2 
}: RealtimeActivityFeedProps) {
  const { events, stats, isRunning, pause, resume } = useRealtimeSimulation({ eventsPerSecond });

  const formatValue = (value?: number) => {
    if (!value) return '';
    if (value < 1) return `$${value.toFixed(3)}`;
    return `$${value.toFixed(2)}`;
  };

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
          <p className="text-sm text-gray-600 mt-1">Real-time campaign events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isRunning ? pause : resume}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {isRunning ? (
            <Pause className="w-4 h-4 text-gray-700" />
          ) : (
            <Play className="w-4 h-4 text-gray-700" />
          )}
        </motion.button>
      </div>

      {showStats && (
        <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 min-h-[2rem] flex items-center justify-center">
              {stats.totalImpressions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Impressions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 min-h-[2rem] flex items-center justify-center">
              {stats.totalClicks.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 min-h-[2rem] flex items-center justify-center">
              {stats.totalConversions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Conversions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 min-h-[2rem] flex items-center justify-center">
              ${stats.totalRevenue.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="space-y-2 h-full overflow-y-auto">
        <AnimatePresence mode="sync">
          {events.slice(0, maxEvents).map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900 truncate">
                    {event.data.campaignName}
                  </span>
                  {event.data.value && (
                    <span className="text-sm font-semibold text-green-600">
                      {formatValue(event.data.value)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500 truncate">
                    {event.data.assetName}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    {event.data.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    {getDeviceIcon(event.data.device)}
                    {event.data.device}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">{event.data.dsp}</div>
                <div className="text-xs text-gray-400">{formatTime(event.timestamp)}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {events.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Waiting for activity...</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}