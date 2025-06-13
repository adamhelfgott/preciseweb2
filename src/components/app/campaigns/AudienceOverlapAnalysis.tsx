"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  Eye, 
  DollarSign, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  TrendingDown,
  Layers,
  Target,
  ChevronRight,
  Download,
  Settings
} from "lucide-react";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Bar,
  Line
} from "recharts";

interface AudienceSegment {
  id?: string;
  name: string;
  size: number;
  cpm: number;
  performance: {
    ctr: number;
    cvr: number;
    roas: number;
  };
  providers: string[];
}

interface OverlapData {
  audienceA: string;
  audienceB: string;
  overlapPercentage: number;
  uniqueA: number;
  uniqueB: number;
  totalReach: number;
  costSaving: number;
}

// Venn diagram component
const VennDiagram = ({ data }: { data: OverlapData }) => {
  const radiusA = 80;
  const radiusB = 80;
  const distance = 120;
  
  return (
    <svg width="300" height="200" viewBox="0 0 300 200">
      <defs>
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2" stroke="#8B5CF6" strokeWidth="1" />
        </pattern>
      </defs>
      
      {/* Circle A */}
      <circle
        cx="100"
        cy="100"
        r={radiusA}
        fill="#3B82F6"
        fillOpacity="0.3"
        stroke="#3B82F6"
        strokeWidth="2"
      />
      
      {/* Circle B */}
      <circle
        cx={100 + distance}
        cy="100"
        r={radiusB}
        fill="#10B981"
        fillOpacity="0.3"
        stroke="#10B981"
        strokeWidth="2"
      />
      
      {/* Overlap pattern */}
      <clipPath id="overlap">
        <circle cx="100" cy="100" r={radiusA} />
      </clipPath>
      <circle
        cx={100 + distance}
        cy="100"
        r={radiusB}
        fill="url(#stripes)"
        fillOpacity="0.5"
        clipPath="url(#overlap)"
      />
      
      {/* Labels */}
      <text x="100" y="100" textAnchor="middle" className="fill-gray-700 text-sm font-medium">
        {data.uniqueA}%
      </text>
      <text x={100 + distance} y="100" textAnchor="middle" className="fill-gray-700 text-sm font-medium">
        {data.uniqueB}%
      </text>
      <text x="150" y="100" textAnchor="middle" className="fill-gray-700 text-sm font-bold">
        {data.overlapPercentage}%
      </text>
      
      {/* Audience names */}
      <text x="100" y="30" textAnchor="middle" className="fill-gray-600 text-xs">
        {data.audienceA}
      </text>
      <text x={100 + distance} y="30" textAnchor="middle" className="fill-gray-600 text-xs">
        {data.audienceB}
      </text>
    </svg>
  );
};

export default function AudienceOverlapAnalysis() {
  const { user } = useAuth();
  const [selectedPair, setSelectedPair] = useState<OverlapData | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get data
  const segments = useQuery(api.audienceOverlap.getSegments,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  const overlaps = useQuery(api.audienceOverlap.getOverlapAnalysis,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  const recommendations = useQuery(api.audienceOverlap.getRecommendations,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Mutations
  const simulateData = useMutation(api.audienceOverlap.simulateAudienceData);
  const updateRecommendation = useMutation(api.audienceOverlap.updateRecommendationStatus);

  // Use data or fallback
  const segmentsToUse = segments || [];
  const overlapsToUse = overlaps || [];
  const recommendationsToUse = recommendations || [];

  // Set initial selected pair
  useEffect(() => {
    if (overlapsToUse.length > 0 && !selectedPair) {
      setSelectedPair(overlapsToUse[0]);
    }
  }, [overlaps, selectedPair]);

  // Simulate data
  useEffect(() => {
    if (!convexUser?._id || !simulationActive) return;

    const simulate = async () => {
      try {
        await simulateData({ buyerId: convexUser._id });
      } catch (error) {
        console.error("Failed to simulate data:", error);
      }
    };
    
    simulate(); // Run immediately
    
    const interval = setInterval(simulate, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive, simulateData]);

  // Calculate total potential savings
  const totalSavings = overlapsToUse.reduce((sum, o) => sum + o.costSaving, 0);

  // Prepare scatter data
  const scatterData = segmentsToUse.map((segment) => ({
    name: segment.name,
    x: segment.size / 1000000, // In millions
    y: segment.performance.roas,
    cpm: segment.cpm,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Layers className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Audience Overlap Analysis</h2>
            <p className="text-sm text-medium-gray">Identify and eliminate redundant targeting</p>
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
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            <Settings className="w-4 h-4" />
            {showMatrix ? "Hide" : "Show"} Matrix View
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="text-purple-600" size={20} />
            <span className="text-xs text-purple-600 font-medium">Total Segments</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{segmentsToUse.length}</div>
          <div className="text-sm text-gray-600">Active audiences</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-xs text-red-600 font-medium">Overlaps Found</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{overlapsToUse.length}</div>
          <div className="text-sm text-gray-600">Redundancies</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-medium">Potential Savings</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${(totalSavings / 1000).toFixed(1)}k
          </div>
          <div className="text-sm text-gray-600">Monthly waste</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="text-blue-600" size={20} />
            <span className="text-xs text-blue-600 font-medium">Avg Overlap</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {overlapsToUse.length > 0
              ? Math.round(overlapsToUse.reduce((sum, o) => sum + o.overlapPercentage, 0) / overlapsToUse.length)
              : 0}%
          </div>
          <div className="text-sm text-gray-600">Duplication rate</div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Overlap Pairs List */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-medium text-gray-900 mb-3">Audience Overlaps</h3>
          {overlapsToUse.map((overlap, index) => (
            <button
              key={index}
              onClick={() => setSelectedPair(overlap)}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                selectedPair?.audienceA === overlap.audienceA && selectedPair?.audienceB === overlap.audienceB
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{overlap.audienceA}</p>
                  <p className="text-xs text-gray-600">× {overlap.audienceB}</p>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {overlap.overlapPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Reach: {(overlap.totalReach / 1000000).toFixed(1)}M</span>
                <span className="text-green-600 font-medium">
                  Save ${(overlap.costSaving / 1000).toFixed(1)}k
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Venn Diagram Visualization */}
        <div className="col-span-4">
          <h3 className="font-medium text-gray-900 mb-3">Overlap Visualization</h3>
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            {selectedPair ? (
              <VennDiagram data={selectedPair} />
            ) : (
              <p className="text-gray-500">Select an overlap to visualize</p>
            )}
          </div>
          {selectedPair && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Combined Reach</span>
                <span className="font-medium">
                  {(selectedPair.totalReach / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wasted Spend</span>
                <span className="font-medium text-red-600">
                  ${(selectedPair.costSaving).toLocaleString()}/mo
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Efficiency Gain</span>
                <span className="font-medium text-green-600">
                  +{(selectedPair.overlapPercentage * 0.3).toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-medium text-gray-900 mb-3">Smart Recommendations</h3>
          {recommendationsToUse.map((rec) => (
            <motion.div
              key={rec._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{rec.recommendation}</p>
                  <p className="text-xs text-gray-600 mt-1">{rec.impact}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.priority === "high" 
                    ? "bg-red-100 text-red-700"
                    : rec.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {rec.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">
                  Save ${(rec.savings / 1000).toFixed(1)}k/mo
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateRecommendation({ 
                      recommendationId: rec._id, 
                      status: "applied" 
                    })}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle size={16} />
                  </button>
                  <button
                    onClick={() => updateRecommendation({ 
                      recommendationId: rec._id, 
                      status: "dismissed" 
                    })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audience Performance Scatter */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Audience Size vs Performance</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="x" 
                  name="Size" 
                  unit="M"
                  label={{ value: "Audience Size (Millions)", position: "insideBottom", offset: -5 }}
                />
                <YAxis 
                  dataKey="y" 
                  name="ROAS"
                  label={{ value: "ROAS", angle: -90, position: "insideLeft" }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                          <p className="font-medium text-gray-900">{data.name}</p>
                          <p className="text-sm text-gray-600">Size: {data.x.toFixed(2)}M users</p>
                          <p className="text-sm text-gray-600">ROAS: {data.y.toFixed(2)}x</p>
                          <p className="text-sm text-gray-600">CPM: ${data.cpm.toFixed(2)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Audiences" 
                  data={scatterData} 
                  fill="#8B5CF6"
                >
                  {scatterData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.y > 5 ? "#10B981" : entry.y > 4 ? "#3B82F6" : "#EF4444"} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>High Performance (ROAS {'>'} 5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Good Performance (ROAS 4-5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Low Performance (ROAS {'<'} 4)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Matrix View */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <h3 className="font-medium text-gray-900 mb-4">Overlap Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-sm font-medium text-gray-900">Audience</th>
                    {segmentsToUse.map((seg) => (
                      <th key={seg.name} className="text-center p-2 text-xs font-medium text-gray-600">
                        {seg.name.split(' ')[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {segmentsToUse.map((segA) => (
                    <tr key={segA.name}>
                      <td className="p-2 text-sm font-medium text-gray-900">{segA.name}</td>
                      {segmentsToUse.map((segB) => {
                        if (segA.name === segB.name) {
                          return <td key={segB.name} className="p-2 text-center bg-gray-100">-</td>;
                        }
                        const overlap = overlapsToUse.find(
                          (o) => (o.audienceA === segA.name && o.audienceB === segB.name) ||
                                 (o.audienceA === segB.name && o.audienceB === segA.name)
                        );
                        return (
                          <td 
                            key={segB.name} 
                            className={`p-2 text-center text-sm ${
                              overlap 
                                ? overlap.overlapPercentage > 50 
                                  ? "bg-red-100 text-red-700 font-medium" 
                                  : overlap.overlapPercentage > 25
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                                : "text-gray-400"
                            }`}
                          >
                            {overlap ? `${overlap.overlapPercentage.toFixed(0)}%` : "0%"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{overlapsToUse.length}</span> overlaps found across{" "}
          <span className="font-medium">{segmentsToUse.length}</span> audiences
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Analysis
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Apply All Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}