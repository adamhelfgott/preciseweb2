"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FlaskConical, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Play, 
  Pause, 
  CheckCircle, 
  ChevronRight, 
  Info,
  MapPin,
  Tv,
  Monitor,
  Radio,
  BarChart3,
  Calculator,
  Download
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend,
  ScatterChart,
  Scatter,
  ComposedChart,
  Area
} from "recharts";
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  Marker
} from "react-simple-maps";

// Geographic test regions with channel mix
const TEST_REGIONS = [
  {
    id: "nyc",
    name: "New York DMA",
    coordinates: [-74.006, 40.7128],
    testType: "Linear + CTV",
    control: false,
    tvReach: 2340000,
    ctvReach: 890000,
    linearOnly: 450000,
    overlap: 340000,
    lift: 34,
    confidence: 96
  },
  {
    id: "chicago",
    name: "Chicago DMA", 
    coordinates: [-87.6298, 41.8781],
    testType: "Linear Only",
    control: true,
    tvReach: 1560000,
    ctvReach: 0,
    linearOnly: 1560000,
    overlap: 0,
    lift: 0,
    confidence: 0
  },
  {
    id: "la",
    name: "Los Angeles DMA",
    coordinates: [-118.2437, 34.0522],
    testType: "CTV Only",
    control: false,
    tvReach: 0,
    ctvReach: 1120000,
    linearOnly: 0,
    overlap: 0,
    lift: 18,
    confidence: 92
  },
  {
    id: "philly",
    name: "Philadelphia DMA",
    coordinates: [-75.1652, 39.9526],
    testType: "Linear + CTV",
    control: false,
    tvReach: 980000,
    ctvReach: 420000,
    linearOnly: 320000,
    overlap: 240000,
    lift: 28,
    confidence: 94
  },
  {
    id: "dc",
    name: "Washington DC DMA",
    coordinates: [-77.0369, 38.9072],
    testType: "Control (No Media)",
    control: true,
    tvReach: 0,
    ctvReach: 0,
    linearOnly: 0,
    overlap: 0,
    lift: 0,
    confidence: 0
  }
];

// Channel overlap data
const CHANNEL_OVERLAP = [
  { channel: "Linear Only", value: 45, fill: "#10B981" },
  { channel: "CTV Only", value: 30, fill: "#3B82F6" },
  { channel: "Both (Overlap)", value: 25, fill: "#8B5CF6" }
];

// Incremental lift by channel
const LIFT_BY_CHANNEL = [
  { channel: "Linear TV", baseline: 100, lift: 122, incremental: 22 },
  { channel: "CTV", baseline: 100, lift: 118, incremental: 18 },
  { channel: "Linear + CTV", baseline: 100, lift: 142, incremental: 42 },
  { channel: "Social (Benchmark)", baseline: 100, lift: 108, incremental: 8 }
];

// Time series data showing incremental impact
const TIME_SERIES_DATA = Array.from({ length: 28 }, (_, i) => {
  const day = i + 1;
  return {
    day,
    linear: 100 + Math.random() * 20 + (i * 0.8),
    ctv: 100 + Math.random() * 15 + (i * 0.6),
    combined: 100 + Math.random() * 25 + (i * 1.5),
    control: 100 + Math.random() * 5
  };
});

// ACR data matching
const ACR_MATCHING = [
  { segment: "Sports Viewers", linearReach: 78, ctvMatch: 62, incremental: 34 },
  { segment: "News Watchers", linearReach: 85, ctvMatch: 45, incremental: 42 },
  { segment: "Prime Time", linearReach: 92, ctvMatch: 71, incremental: 38 },
  { segment: "Late Night", linearReach: 45, ctvMatch: 82, incremental: 55 }
];

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function CrossChannelIncrementality() {
  const { user } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"geographic" | "channel" | "timeline">("geographic");
  const [showMethodology, setShowMethodology] = useState(false);
  const [testStatus, setTestStatus] = useState<"running" | "paused" | "completed">("running");
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get active test
  const activeTest = useQuery(api.crossChannel.getActiveTest,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Get test regions
  const testRegions = useQuery(api.crossChannel.getTestRegions,
    activeTest?._id ? { testId: activeTest._id } : "skip"
  );

  // Get channel performance
  const channelPerformance = useQuery(api.crossChannel.getChannelPerformance,
    activeTest?._id ? { testId: activeTest._id, days: 28 } : "skip"
  );

  // Get ACR matching data
  const acrMatching = useQuery(api.crossChannel.getACRMatching,
    activeTest?._id ? { testId: activeTest._id } : "skip"
  );

  // Mutation for simulating test
  const simulateTest = useMutation(api.crossChannel.simulateIncrementalityTest);

  // Use Convex data or fall back to mock
  const regionsToUse = testRegions?.length > 0 ? testRegions : TEST_REGIONS;
  const selectedRegionData = selectedRegion || regionsToUse[0];

  // Calculate metrics
  const totalLinearReach = regionsToUse.reduce((sum: number, r: any) => sum + r.tvReach, 0);
  const totalCTVReach = regionsToUse.reduce((sum: number, r: any) => sum + r.ctvReach, 0);
  const avgLift = regionsToUse.filter((r: any) => !r.isControl).reduce((sum: number, r: any) => sum + r.lift, 0) / 
    regionsToUse.filter((r: any) => !r.isControl).length || 0;

  // Map channel performance data
  const timeSeriesData = channelPerformance?.length > 0 
    ? channelPerformance
        .filter((p: any) => p.channel === "linear" || p.channel === "ctv" || p.channel === "combined" || p.channel === "control")
        .reduce((acc: any[], p: any) => {
          const existing = acc.find(d => d.day === new Date(p.date).getDate());
          if (existing) {
            existing[p.channel] = p.index;
          } else {
            acc.push({
              day: new Date(p.date).getDate(),
              [p.channel]: p.index,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => a.day - b.day)
    : TIME_SERIES_DATA;

  // Map ACR matching data
  const acrMatchingData = acrMatching?.length > 0 ? acrMatching : ACR_MATCHING;

  // Set initial selected region
  useEffect(() => {
    if (regionsToUse.length > 0 && !selectedRegion) {
      setSelectedRegion(regionsToUse[0]);
    }
  }, [regionsToUse, selectedRegion]);

  // Simulate test data
  useEffect(() => {
    if (!convexUser?._id || !simulationActive) return;

    // Simulate immediately on activation
    const simulate = async () => {
      try {
        await simulateTest({ 
          buyerId: convexUser._id 
        });
      } catch (error) {
        console.error("Failed to simulate test:", error);
      }
    };
    
    simulate(); // Run immediately
    
    const interval = setInterval(simulate, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive, simulateTest]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Tv className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Cross-Channel Incrementality Verifier</h2>
            <p className="text-sm text-medium-gray">Compare ACR linear exposure with CTV delivery and outcomes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Simulation Toggle */}
          {convexUser && (
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                simulationActive 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {simulationActive ? "Simulation On" : "Simulation Off"}
            </button>
          )}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("geographic")}
              className={`px-3 py-1 rounded text-sm ${viewMode === "geographic" ? "bg-white shadow-sm" : ""}`}
            >
              Geographic
            </button>
            <button
              onClick={() => setViewMode("channel")}
              className={`px-3 py-1 rounded text-sm ${viewMode === "channel" ? "bg-white shadow-sm" : ""}`}
            >
              Channel Mix
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1 rounded text-sm ${viewMode === "timeline" ? "bg-white shadow-sm" : ""}`}
            >
              Timeline
            </button>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculate Lift
          </button>
        </div>
      </div>

      {/* Test Status Bar */}
      <div className="bg-purple-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Test Running</span>
            </div>
            <span className="text-sm text-gray-600">Day {activeTest?.daysRunning || 18} of 28</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-600">Test Regions:</span>
              <span className="font-medium ml-1">{regionsToUse.filter((r: any) => !r.isControl).length}</span>
            </div>
            <div>
              <span className="text-gray-600">Control Regions:</span>
              <span className="font-medium ml-1">{regionsToUse.filter((r: any) => r.isControl).length}</span>
            </div>
            <div>
              <span className="text-gray-600">Confidence:</span>
              <span className="font-medium text-purple-600 ml-1">{activeTest?.confidence?.toFixed(1) || 94.2}%</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-purple-100 rounded-full h-2">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${((activeTest?.daysRunning || 18) / 28) * 100}%` }} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Radio className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-medium">Linear TV</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(totalLinearReach / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-600">Households Reached</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Monitor className="text-blue-600" size={20} />
            <span className="text-xs text-blue-600 font-medium">CTV</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(totalCTVReach / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-600">Devices Reached</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-xs text-purple-600 font-medium">Combined</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            +{avgLift.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600">Incremental Lift</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-orange-600" size={20} />
            <span className="text-xs text-orange-600 font-medium">Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            2.4x
          </div>
          <div className="text-sm text-gray-600">ROAS vs Linear Only</div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      {viewMode === "geographic" && (
        <div className="grid grid-cols-12 gap-6">
          {/* Map View */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-[500px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test & Control Regions</h3>
              <div className="h-[400px]">
                <ComposableMap projection="geoAlbersUsa" className="w-full h-full">
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#E5E7EB"
                          stroke="#D1D5DB"
                          strokeWidth={0.5}
                        />
                      ))
                    }
                  </Geographies>
                  {regionsToUse.map((region: any) => (
                    <Marker
                      key={region.regionId || region.id}
                      coordinates={region.coordinates}
                      onClick={() => setSelectedRegion(region)}
                    >
                      <motion.circle
                        r={20}
                        fill={region.isControl || region.control ? "#EF4444" : "#8B5CF6"}
                        fillOpacity={0.7}
                        stroke="#fff"
                        strokeWidth={2}
                        whileHover={{ scale: 1.2 }}
                        style={{ cursor: "pointer" }}
                      />
                      <text
                        textAnchor="middle"
                        y={-25}
                        className="text-xs font-medium fill-gray-700"
                      >
                        {region.regionName || region.name}
                      </text>
                      <text
                        textAnchor="middle"
                        y={35}
                        className="text-xs fill-gray-600"
                      >
                        {region.testType}
                      </text>
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded-full" />
                  <span>Test Regions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full" />
                  <span>Control Regions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Region Details */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{selectedRegionData?.regionName || selectedRegionData?.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedRegionData?.isControl || selectedRegionData?.control 
                    ? "bg-red-100 text-red-700" 
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {selectedRegionData?.isControl || selectedRegionData?.control ? "Control" : "Test"}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Channel Mix</div>
                  <div className="space-y-2">
                    {selectedRegionData?.tvReach > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Linear TV</span>
                        <span className="text-sm font-medium">
                          {(selectedRegionData.tvReach / 1000).toFixed(0)}K households
                        </span>
                      </div>
                    )}
                    {selectedRegionData?.ctvReach > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CTV</span>
                        <span className="text-sm font-medium">
                          {(selectedRegionData.ctvReach / 1000).toFixed(0)}K devices
                        </span>
                      </div>
                    )}
                    {selectedRegionData?.overlap > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overlap</span>
                        <span className="text-sm font-medium">
                          {(selectedRegionData.overlap / 1000).toFixed(0)}K both
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {!(selectedRegionData?.isControl || selectedRegionData?.control) && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Incremental Lift</span>
                      <span className="text-2xl font-bold text-purple-600">
                        +{selectedRegionData?.lift?.toFixed(0) || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${selectedRegionData?.confidence || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-600">Confidence</span>
                      <span className="text-xs font-medium">{selectedRegionData?.confidence?.toFixed(0) || 0}%</span>
                    </div>
                  </div>
                )}

                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  View Detailed Report
                </button>
              </div>
            </div>

            {/* MadHive ACR Integration */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg">
                  <Tv className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">MadHive ACR Data</h4>
                  <p className="text-xs text-gray-600">Automatic Content Recognition matching</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Linear ad exposures</span>
                  <span className="font-medium">3.2M</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">CTV match rate</span>
                  <span className="font-medium text-purple-600">67%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Incremental reach</span>
                  <span className="font-medium text-green-600">+34%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "channel" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Channel Overlap Visualization */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Reach & Overlap</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHANNEL_OVERLAP}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {CHANNEL_OVERLAP.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incremental Lift by Channel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incremental Lift by Channel</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LIFT_BY_CHANNEL} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" />
                  <YAxis dataKey="channel" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="baseline" stackId="a" fill="#E5E7EB" name="Baseline" />
                  <Bar dataKey="incremental" stackId="a" fill="#8B5CF6" name="Incremental" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ACR Matching Analysis */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ACR Linear to CTV Matching</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Viewing Segment</th>
                    <th className="text-right py-3 px-4">Linear Reach %</th>
                    <th className="text-right py-3 px-4">CTV Match %</th>
                    <th className="text-right py-3 px-4">Incremental Reach %</th>
                    <th className="text-right py-3 px-4">Combined Lift</th>
                  </tr>
                </thead>
                <tbody>
                  {acrMatchingData.map((segment: any, i: number) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{segment.segment}</td>
                      <td className="text-right py-3 px-4">{segment.linearReach}%</td>
                      <td className="text-right py-3 px-4">{segment.ctvMatch}%</td>
                      <td className="text-right py-3 px-4 text-green-600">
                        +{segment.incremental}%
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${segment.incremental * 2}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {(segment.incremental * 1.2).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {viewMode === "timeline" && (
        <div className="space-y-6">
          {/* Performance Over Time */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Index (Base = 100)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="linear" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    name="Linear TV"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ctv" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    name="CTV"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="combined" 
                    stroke="#8B5CF6" 
                    strokeWidth={3} 
                    name="Linear + CTV"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="control" 
                    stroke="#6B7280" 
                    strokeWidth={2} 
                    name="Control"
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistical Significance Timeline */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-4">Statistical Milestones</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">90% Confidence</span>
                  <span className="text-sm font-medium">Day 12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">95% Confidence</span>
                  <span className="text-sm font-medium">Day 16</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">99% Confidence</span>
                  <span className="text-sm font-medium text-gray-400">Est. Day 22</span>
                </div>
                <div className="pt-3 border-t border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Confidence</span>
                    <span className="text-lg font-bold text-purple-600">94.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-4">Key Findings</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Linear + CTV delivers 42% higher lift than either channel alone</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>67% of linear viewers can be reached on CTV</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>CTV-only strategy misses 33% of target audience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          <Info className="w-4 h-4" />
          {showMethodology ? "Hide" : "Show"} Methodology
        </button>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Apply to All Campaigns
          </button>
        </div>
      </div>

      {/* Methodology */}
      <AnimatePresence>
        {showMethodology && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <h4 className="font-medium text-gray-900 mb-3">Cross-Channel Testing Methodology</h4>
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Geographic Split Testing:</p>
                <p>• DMAs randomly assigned to test/control groups</p>
                <p>• Matched markets based on demographics and viewership</p>
                <p>• Minimum 4-week test period for full measurement</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">MadHive ACR Integration:</p>
                <p>• Automatic Content Recognition tracks linear TV exposure</p>
                <p>• Device graphs match linear viewers to CTV devices</p>
                <p>• Privacy-compliant household-level attribution</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}