"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, TrendingUp, Smartphone, Monitor, Tv, MapPin, Phone, ShoppingBag } from "lucide-react";

interface PathNode {
  channel: string;
  device: string;
  timestamp: string;
  contribution: number;
  icon: React.ReactNode;
}

interface ConversionPath {
  id: string;
  paths: PathNode[];
  conversions: number;
  avgValue: number;
  avgDays: number;
  frequency: number;
}

const CONVERSION_PATHS: ConversionPath[] = [
  {
    id: "1",
    paths: [
      { channel: "YouTube Pre-roll", device: "Mobile", timestamp: "Day 1", contribution: 18, icon: <Tv className="w-4 h-4" /> },
      { channel: "Instagram Story", device: "Mobile", timestamp: "Day 3", contribution: 22, icon: <Smartphone className="w-4 h-4" /> },
      { channel: "Google Search", device: "Desktop", timestamp: "Day 5", contribution: 35, icon: <Monitor className="w-4 h-4" /> },
      { channel: "Direct", device: "Desktop", timestamp: "Day 7", contribution: 25, icon: <Monitor className="w-4 h-4" /> }
    ],
    conversions: 3420,
    avgValue: 127.50,
    avgDays: 7,
    frequency: 28
  },
  {
    id: "2",
    paths: [
      { channel: "TikTok", device: "Mobile", timestamp: "Day 1", contribution: 15, icon: <Smartphone className="w-4 h-4" /> },
      { channel: "Meta Retargeting", device: "Mobile", timestamp: "Day 2", contribution: 30, icon: <Smartphone className="w-4 h-4" /> },
      { channel: "Email", device: "Desktop", timestamp: "Day 4", contribution: 25, icon: <Monitor className="w-4 h-4" /> },
      { channel: "Google Search", device: "Mobile", timestamp: "Day 4", contribution: 30, icon: <Smartphone className="w-4 h-4" /> }
    ],
    conversions: 2150,
    avgValue: 95.20,
    avgDays: 4,
    frequency: 22
  },
  {
    id: "3",
    paths: [
      { channel: "Display (MadHive)", device: "CTV", timestamp: "Day 1", contribution: 20, icon: <Tv className="w-4 h-4" /> },
      { channel: "YouTube", device: "Mobile", timestamp: "Day 3", contribution: 25, icon: <Smartphone className="w-4 h-4" /> },
      { channel: "Meta Feed", device: "Mobile", timestamp: "Day 5", contribution: 20, icon: <Smartphone className="w-4 h-4" /> },
      { channel: "Amazon DSP", device: "Desktop", timestamp: "Day 8", contribution: 35, icon: <Monitor className="w-4 h-4" /> }
    ],
    conversions: 1890,
    avgValue: 156.30,
    avgDays: 8,
    frequency: 18
  },
  {
    id: "4",
    paths: [
      { channel: "Local Radio", device: "Audio", timestamp: "Day 1", contribution: 15, icon: <Phone className="w-4 h-4" /> },
      { channel: "Google Maps", device: "Mobile", timestamp: "Day 2", contribution: 25, icon: <MapPin className="w-4 h-4" /> },
      { channel: "Geo-fence Display", device: "Mobile", timestamp: "Day 3", contribution: 20, icon: <MapPin className="w-4 h-4" /> },
      { channel: "Store Visit", device: "In-Store", timestamp: "Day 3", contribution: 40, icon: <ShoppingBag className="w-4 h-4" /> }
    ],
    conversions: 850,
    avgValue: 68.40,
    avgDays: 3,
    frequency: 12
  },
  {
    id: "5",
    paths: [
      { channel: "OOH Billboard", device: "Physical", timestamp: "Day 1", contribution: 10, icon: <MapPin className="w-4 h-4" /> },
      { channel: "Mobile Geo-Push", device: "Mobile", timestamp: "Day 1", contribution: 15, icon: <Smartphone className="w-4 h-4" /> },
      { channel: "Google My Business", device: "Mobile", timestamp: "Day 2", contribution: 35, icon: <MapPin className="w-4 h-4" /> },
      { channel: "Footfall Conversion", device: "In-Store", timestamp: "Day 2", contribution: 40, icon: <ShoppingBag className="w-4 h-4" /> }
    ],
    conversions: 620,
    avgValue: 45.20,
    avgDays: 2,
    frequency: 8
  }
];

interface ConversionPathsProps {
  campaign: string;
  model: string;
}

export default function ConversionPaths({ campaign, model }: ConversionPathsProps) {
  const getChannelColor = (channel: string): string => {
    if (channel.includes("Google")) return "bg-blue-500";
    if (channel.includes("Meta") || channel.includes("Instagram")) return "bg-purple-500";
    if (channel.includes("YouTube")) return "bg-red-500";
    if (channel.includes("TikTok")) return "bg-black";
    if (channel.includes("Email")) return "bg-green-500";
    if (channel.includes("Display") || channel.includes("MadHive")) return "bg-orange-500";
    if (channel.includes("Amazon")) return "bg-yellow-600";
    if (channel.includes("Store") || channel.includes("Footfall")) return "bg-emerald-600";
    if (channel.includes("Radio") || channel.includes("Audio")) return "bg-indigo-600";
    if (channel.includes("Maps") || channel.includes("Geo") || channel.includes("OOH") || channel.includes("Billboard")) return "bg-teal-600";
    return "bg-gray-500";
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "Mobile": return <Smartphone className="w-3 h-3" />;
      case "Desktop": return <Monitor className="w-3 h-3" />;
      case "CTV": return <Tv className="w-3 h-3" />;
      case "Audio": return <Phone className="w-3 h-3" />;
      case "Physical": return <MapPin className="w-3 h-3" />;
      case "In-Store": return <ShoppingBag className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dark-gray">Top Conversion Paths</h3>
        <div className="flex items-center gap-2 text-sm text-medium-gray">
          <Clock className="w-4 h-4" />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Path Visualizations */}
      <div className="space-y-4">
        {CONVERSION_PATHS.map((path, pathIndex) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: pathIndex * 0.1 }}
            className="bg-white rounded-xl border border-light-gray p-6"
          >
            {/* Path Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-medium-gray mb-1">Path #{pathIndex + 1}</p>
                  <p className="text-xl font-bold text-dark-gray">
                    {path.conversions.toLocaleString()} conversions
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <p className="text-medium-gray">Avg. Value</p>
                    <p className="font-semibold text-dark-gray">${path.avgValue}</p>
                  </div>
                  <div>
                    <p className="text-medium-gray">Avg. Days</p>
                    <p className="font-semibold text-dark-gray">{path.avgDays}</p>
                  </div>
                  <div>
                    <p className="text-medium-gray">Frequency</p>
                    <p className="font-semibold text-dark-gray">{path.frequency}%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  High Performance
                </span>
              </div>
            </div>

            {/* Path Visualization */}
            <div className="relative">
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
                {path.paths.map((node, nodeIndex) => (
                  <div key={nodeIndex} className="flex items-center flex-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: pathIndex * 0.1 + nodeIndex * 0.05 }}
                      className="relative"
                    >
                      {/* Node */}
                      <div className={`relative ${getChannelColor(node.channel)} text-white rounded-lg p-4 min-w-[140px]`}>
                        <div className="flex items-center justify-between mb-2">
                          {node.icon}
                          {getDeviceIcon(node.device)}
                        </div>
                        <p className="text-xs font-medium mb-1">{node.channel}</p>
                        <p className="text-xs opacity-80">{node.timestamp}</p>
                        
                        {/* Contribution Badge */}
                        <div className="absolute -top-2 -right-2 bg-white text-dark-gray text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-light-gray">
                          {node.contribution}%
                        </div>
                      </div>
                    </motion.div>

                    {/* Arrow */}
                    {nodeIndex < path.paths.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pathIndex * 0.1 + nodeIndex * 0.05 + 0.2 }}
                        className="flex-shrink-0 mx-2"
                      >
                        <ArrowRight className="w-5 h-5 text-medium-gray" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Attribution Model Note */}
              <div className="mt-4 pt-4 border-t border-light-gray">
                <p className="text-xs text-medium-gray">
                  {model === "mixed" && "Marketing Mix Model analyzes the impact of marketing investments on business outcomes across all channels"}
                  {model === "data-driven" && "Data-driven attribution uses machine learning to distribute credit based on actual impact"}
                  {model === "last-click" && "Last-click attribution gives 100% credit to the final touchpoint"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
      >
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">Path Analysis Insights</h4>
            <div className="space-y-2 text-sm text-medium-gray">
              <p>• YouTube pre-roll consistently appears as an effective awareness driver (18-25% contribution)</p>
              <p>• Mobile-first paths show 23% higher conversion rates than desktop-only</p>
              <p>• Cross-device journeys have 45% higher average order values</p>
              <p>• Local attribution shows 40% of conversions happen as footfall within 48 hours of mobile exposure</p>
              <p>• Geo-targeted campaigns drive 3.2x higher in-store visit rates</p>
              <p>• Adding Precise-verified audience data increases path efficiency by 31%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}