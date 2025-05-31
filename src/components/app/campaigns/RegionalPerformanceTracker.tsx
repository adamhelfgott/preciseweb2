"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  BarChart3,
  Store,
  Tv,
  Navigation,
  Download,
  Calendar,
  ChevronRight
} from "lucide-react";
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  Marker
} from "react-simple-maps";
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
  Legend,
  ScatterChart,
  Scatter,
  Cell
} from "recharts";

// Mock DMA data with TV viewership and foot traffic correlation
const dmaData = [
  {
    id: "501",
    name: "New York",
    state: "NY",
    coordinates: [-74.006, 40.7128],
    tvViewership: 2340000,
    footTraffic: 145000,
    correlation: 0.87,
    lift: 34,
    roas: 4.2,
    stores: 23,
    avgSpend: 47.50,
    topBrands: ["McDonald's", "Target", "Walmart"],
    performance: "high"
  },
  {
    id: "602", 
    name: "Chicago",
    state: "IL",
    coordinates: [-87.6298, 41.8781],
    tvViewership: 1560000,
    footTraffic: 98000,
    correlation: 0.82,
    lift: 28,
    roas: 3.8,
    stores: 18,
    avgSpend: 42.30,
    topBrands: ["Jewel-Osco", "Walgreens", "Home Depot"],
    performance: "high"
  },
  {
    id: "803",
    name: "Los Angeles", 
    state: "CA",
    coordinates: [-118.2437, 34.0522],
    tvViewership: 1890000,
    footTraffic: 112000,
    correlation: 0.79,
    lift: 31,
    roas: 3.6,
    stores: 21,
    avgSpend: 52.10,
    topBrands: ["Ralph's", "CVS", "Best Buy"],
    performance: "medium"
  },
  {
    id: "504",
    name: "Philadelphia",
    state: "PA", 
    coordinates: [-75.1652, 39.9526],
    tvViewership: 980000,
    footTraffic: 67000,
    correlation: 0.75,
    lift: 22,
    roas: 3.2,
    stores: 15,
    avgSpend: 38.90,
    topBrands: ["Wawa", "Acme", "Target"],
    performance: "medium"
  },
  {
    id: "511",
    name: "Washington DC",
    state: "DC",
    coordinates: [-77.0369, 38.9072],
    tvViewership: 1120000,
    footTraffic: 78000,
    correlation: 0.91,
    lift: 37,
    roas: 4.5,
    stores: 14,
    avgSpend: 54.20,
    topBrands: ["Giant", "Harris Teeter", "Whole Foods"],
    performance: "high"
  }
];

// Mock time series data
const timeSeriesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    tvImpressions: 850000 + Math.random() * 200000,
    storeVisits: 12000 + Math.random() * 3000,
    correlation: 0.75 + Math.random() * 0.15
  };
});

// Mock scatter plot data for correlation visualization
const correlationData = Array.from({ length: 50 }, () => ({
  tvReach: Math.random() * 100000 + 50000,
  footTraffic: Math.random() * 5000 + 2000,
  roas: Math.random() * 2 + 2.5,
}));

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function RegionalPerformanceTracker() {
  const [selectedDMA, setSelectedDMA] = useState(dmaData[0]);
  const [timeRange, setTimeRange] = useState("30d");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  // Calculate total metrics
  const totalViewership = dmaData.reduce((sum, dma) => sum + dma.tvViewership, 0);
  const totalFootTraffic = dmaData.reduce((sum, dma) => sum + dma.footTraffic, 0);
  const avgCorrelation = dmaData.reduce((sum, dma) => sum + dma.correlation, 0) / dmaData.length;
  const avgROAS = dmaData.reduce((sum, dma) => sum + dma.roas, 0) / dmaData.length;

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="text-brand-green" />
              Regional Performance Tracker
            </h3>
            <p className="text-gray-600 mt-1">
              Track how local TV drives foot traffic to physical locations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1 rounded ${viewMode === "map" ? "bg-white shadow-sm" : ""} text-sm`}
              >
                Map View
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""} text-sm`}
              >
                Grid View
              </button>
            </div>
            <button className="px-3 py-1.5 bg-brand-green text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Tv className="text-brand-green" size={20} />
              <span className="text-xs text-green-600 font-medium">+12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(totalViewership / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">TV Impressions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Store className="text-blue-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+23%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(totalFootTraffic / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">Store Visits</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="text-purple-600" size={20} />
              <span className="text-xs text-gray-600 font-medium">Strong</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(avgCorrelation * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Correlation</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-600" size={20} />
              <span className="text-xs text-green-600 font-medium">+15%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {avgROAS.toFixed(1)}x
            </div>
            <div className="text-sm text-gray-600">Avg. ROAS</div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Map/Grid View */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 h-[600px]">
            {viewMode === "map" ? (
              <div className="h-full">
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
                  {dmaData.map((dma) => (
                    <Marker
                      key={dma.id}
                      coordinates={dma.coordinates}
                      onClick={() => setSelectedDMA(dma)}
                    >
                      <motion.circle
                        r={Math.sqrt(dma.footTraffic) / 20}
                        fill={
                          dma.performance === "high" ? "#10B981" :
                          dma.performance === "medium" ? "#F59E0B" : "#EF4444"
                        }
                        fillOpacity={0.7}
                        stroke="#fff"
                        strokeWidth={2}
                        whileHover={{ scale: 1.2 }}
                        style={{ cursor: "pointer" }}
                      />
                      <text
                        textAnchor="middle"
                        y={-Math.sqrt(dma.footTraffic) / 20 - 10}
                        className="text-xs font-medium fill-gray-700"
                      >
                        {dma.name}
                      </text>
                    </Marker>
                  ))}
                </ComposableMap>
              </div>
            ) : (
              <div className="h-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">DMA</th>
                      <th className="text-right py-3 px-4">TV Reach</th>
                      <th className="text-right py-3 px-4">Store Visits</th>
                      <th className="text-right py-3 px-4">Correlation</th>
                      <th className="text-right py-3 px-4">Lift</th>
                      <th className="text-right py-3 px-4">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dmaData.map((dma) => (
                      <tr
                        key={dma.id}
                        onClick={() => setSelectedDMA(dma)}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{dma.name}</div>
                            <div className="text-sm text-gray-600">{dma.stores} stores</div>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4">
                          {(dma.tvViewership / 1000000).toFixed(1)}M
                        </td>
                        <td className="text-right py-3 px-4">
                          {(dma.footTraffic / 1000).toFixed(0)}K
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className={`font-medium ${
                            dma.correlation > 0.8 ? "text-green-600" : "text-gray-900"
                          }`}>
                            {(dma.correlation * 100).toFixed(0)}%
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          +{dma.lift}%
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className="font-medium">{dma.roas}x</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* DMA Details */}
        <div className="col-span-4 space-y-6">
          {/* Selected DMA Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {selectedDMA.name} DMA
              </h4>
              <span className={`px-2 py-1 rounded text-sm font-medium ${
                selectedDMA.performance === "high" 
                  ? "bg-green-100 text-green-700"
                  : selectedDMA.performance === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {selectedDMA.performance.charAt(0).toUpperCase() + selectedDMA.performance.slice(1)} Performance
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">TV → Store Correlation</span>
                  <span className="text-sm font-medium">{(selectedDMA.correlation * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-green h-2 rounded-full"
                    style={{ width: `${selectedDMA.correlation * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Incremental Lift</div>
                  <div className="text-2xl font-bold text-green-600">+{selectedDMA.lift}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Avg. Transaction</div>
                  <div className="text-2xl font-bold text-gray-900">${selectedDMA.avgSpend}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Top Performing Brands</div>
                <div className="space-y-2">
                  {selectedDMA.topBrands.map((brand, i) => (
                    <div key={brand} className="flex items-center justify-between">
                      <span className="text-sm">{brand}</span>
                      <span className="text-sm text-gray-600">{85 - i * 5}% lift</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <BarChart3 size={16} />
                View Full DMA Report
              </button>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Local ROI Calculator
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">TV Spend (Monthly)</label>
                <input
                  type="text"
                  defaultValue="$50,000"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Target Stores</label>
                <input
                  type="number"
                  defaultValue={selectedDMA.stores}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Projected Revenue</span>
                  <span className="font-medium">$213,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expected ROAS</span>
                  <span className="font-bold text-green-600">{selectedDMA.roas}x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Series and Correlation Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* TV vs Foot Traffic Over Time */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            TV Impressions vs Store Visits
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tvImpressions"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="TV Impressions"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="storeVisits"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Store Visits"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation Scatter Plot */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            TV Reach vs Foot Traffic Correlation
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="tvReach" 
                  name="TV Reach"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <YAxis 
                  dataKey="footTraffic"
                  name="Store Visits" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === "TV Reach") return `${(value / 1000).toFixed(0)}K`;
                    if (name === "Store Visits") return `${(value / 1000).toFixed(1)}K`;
                    if (name === "ROAS") return `${value.toFixed(1)}x`;
                    return value;
                  }}
                />
                <Scatter 
                  name="DMAs" 
                  data={correlationData} 
                  fill="#10B981"
                >
                  {correlationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.roas > 3.5 ? "#10B981" : entry.roas > 2.5 ? "#F59E0B" : "#EF4444"} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>High ROAS (&gt;3.5x)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Medium ROAS (2.5-3.5x)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Low ROAS (&lt;2.5x)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Local Business Insights */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Store className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Local Business Intelligence
            </h4>
            <p className="text-gray-700 mb-4">
              Based on your TV campaign in the {selectedDMA.name} DMA, we're seeing strong foot traffic lift 
              at {selectedDMA.stores} store locations. The {(selectedDMA.correlation * 100).toFixed(0)}% correlation 
              between TV exposure and store visits indicates your creative is driving real-world action.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Navigation size={16} />
                Optimize Local Targeting
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View Competitive Analysis
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}