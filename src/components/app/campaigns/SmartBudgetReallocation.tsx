"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Save,
  Play,
  ChevronRight,
  Zap,
  BarChart3,
  Settings,
  Download
} from "lucide-react";
import {
  AreaChart,
  Area,
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
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts";

interface CampaignAllocation {
  campaignId: string;
  campaignName: string;
  currentBudget: number;
  recommendedBudget: number;
  currentROAS: number;
  projectedROAS: number;
  reason: string;
  confidence: number;
}

// Budget efficiency gauge component
const EfficiencyGauge = ({ efficiency }: { efficiency: number }) => {
  const data = [{ value: efficiency, fill: efficiency > 80 ? "#10B981" : efficiency > 60 ? "#3B82F6" : "#EF4444" }];
  
  return (
    <div className="relative w-32 h-32">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={10}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={5}
            fill={data[0].fill}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{efficiency}%</p>
          <p className="text-xs text-gray-600">Efficiency</p>
        </div>
      </div>
    </div>
  );
};

export default function SmartBudgetReallocation() {
  const { user } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [showScenarios, setShowScenarios] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [allocations, setAllocations] = useState<CampaignAllocation[]>([]);
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get data
  const budgetAllocations = useQuery(api.budgetReallocation.getAllocations,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  const scenarios = useQuery(api.budgetReallocation.getScenarios,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  const predictions = useQuery(api.budgetReallocation.getPredictions,
    convexUser?._id && selectedCampaign 
      ? { buyerId: convexUser._id, campaignId: selectedCampaign } 
      : "skip"
  );

  // Mutations
  const saveScenario = useMutation(api.budgetReallocation.saveScenario);
  const applyScenario = useMutation(api.budgetReallocation.applyScenario);
  const simulateData = useMutation(api.budgetReallocation.simulateBudgetData);

  // Initialize allocations
  useEffect(() => {
    if (budgetAllocations && budgetAllocations.length > 0) {
      setAllocations(budgetAllocations);
      if (!selectedCampaign) {
        setSelectedCampaign(budgetAllocations[0].campaignId);
      }
    }
  }, [budgetAllocations, selectedCampaign]);

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
    
    const interval = setInterval(simulate, 60000); // Every minute

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive, simulateData]);

  // Calculate metrics
  const totalCurrentBudget = allocations.reduce((sum, a) => sum + a.currentBudget, 0);
  const totalRecommendedBudget = allocations.reduce((sum, a) => sum + a.recommendedBudget, 0);
  const avgCurrentROAS = allocations.length > 0 
    ? allocations.reduce((sum, a) => sum + a.currentROAS * (a.currentBudget / totalCurrentBudget), 0)
    : 0;
  const avgProjectedROAS = allocations.length > 0
    ? allocations.reduce((sum, a) => sum + a.projectedROAS * (a.recommendedBudget / totalRecommendedBudget), 0)
    : 0;
  const efficiency = Math.round((avgProjectedROAS / avgCurrentROAS) * 100 - 100);

  // Handle allocation changes
  const handleAllocationChange = (campaignId: string, newBudget: number) => {
    setAllocations(prev => prev.map(a => 
      a.campaignId === campaignId 
        ? { ...a, recommendedBudget: newBudget }
        : a
    ));
  };

  // Save custom scenario
  const handleSaveScenario = async () => {
    if (!convexUser?._id) return;

    const scenarioAllocations = allocations.map(a => ({
      campaignId: a.campaignId,
      campaignName: a.campaignName,
      budget: a.recommendedBudget,
      percentage: (a.recommendedBudget / totalRecommendedBudget) * 100,
    }));

    await saveScenario({
      buyerId: convexUser._id,
      name: "Custom Optimization",
      description: "AI-optimized budget allocation based on performance data",
      allocations: scenarioAllocations,
    });

    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Smart Budget Reallocation</h2>
            <p className="text-sm text-medium-gray">AI-powered budget optimization across campaigns</p>
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
            onClick={() => setShowScenarios(!showScenarios)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            <Settings className="w-4 h-4" />
            {showScenarios ? "Hide" : "Show"} Scenarios
          </button>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-gray-600" size={20} />
            <span className="text-xs text-gray-600 font-medium">Current</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${(totalCurrentBudget / 1000).toFixed(0)}k
          </div>
          <div className="text-sm text-gray-600">Total Budget</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Brain className="text-purple-600" size={20} />
            <span className="text-xs text-purple-600 font-medium">Optimized</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${(totalRecommendedBudget / 1000).toFixed(0)}k
          </div>
          <div className="text-sm text-gray-600">Recommended</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-gray-600" size={20} />
            <span className="text-xs text-gray-600 font-medium">Current</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {avgCurrentROAS.toFixed(1)}x
          </div>
          <div className="text-sm text-gray-600">Avg ROAS</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-medium">Projected</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {avgProjectedROAS.toFixed(1)}x
          </div>
          <div className="text-sm text-gray-600">New ROAS</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <EfficiencyGauge efficiency={100 + efficiency} />
        </motion.div>
      </div>

      {/* Budget Allocation Chart */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Campaign List */}
        <div className="col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Campaign Budget Recommendations</h3>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-3">
            {allocations.map((allocation) => {
              const change = ((allocation.recommendedBudget - allocation.currentBudget) / allocation.currentBudget) * 100;
              const isIncrease = change > 0;
              
              return (
                <div
                  key={allocation.campaignId}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedCampaign === allocation.campaignId
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCampaign(allocation.campaignId)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{allocation.campaignName}</h4>
                      <p className="text-xs text-gray-600 mt-1">{allocation.reason}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {isIncrease ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        isIncrease ? "text-green-600" : "text-red-600"
                      }`}>
                        {isIncrease ? "+" : ""}{change.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Budget Change</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                          ${(allocation.currentBudget / 1000).toFixed(1)}k
                        </span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        {editMode ? (
                          <input
                            type="number"
                            value={allocation.recommendedBudget}
                            onChange={(e) => handleAllocationChange(
                              allocation.campaignId, 
                              parseFloat(e.target.value) || 0
                            )}
                            onClick={(e) => e.stopPropagation()}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                        ) : (
                          <span className="text-sm font-medium text-purple-600">
                            ${(allocation.recommendedBudget / 1000).toFixed(1)}k
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">ROAS Impact</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                          {allocation.currentROAS.toFixed(1)}x
                        </span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-medium text-green-600">
                          {allocation.projectedROAS.toFixed(1)}x
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${allocation.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{allocation.confidence}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {editMode && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSaveScenario}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Scenario
              </button>
            </div>
          )}
        </div>

        {/* Performance Prediction Chart */}
        <div className="col-span-5">
          <h3 className="font-medium text-gray-900 mb-4">Performance at Different Budget Levels</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {predictions && predictions.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={predictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="budgetLevel" 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ value: "ROAS", angle: -90, position: "insideLeft" }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Revenue", angle: 90, position: "insideRight" }}
                    />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        name === "predictedROAS" ? `${value.toFixed(2)}x` : `$${(value / 1000).toFixed(1)}k`,
                        name === "predictedROAS" ? "ROAS" : "Revenue"
                      ]}
                      labelFormatter={(value) => `Budget: $${(value / 1000).toFixed(0)}k`}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="predictedRevenue"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="predictedROAS"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: "#8B5CF6", r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Select a campaign to view predictions
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scenarios Section */}
      <AnimatePresence>
        {showScenarios && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <h3 className="font-medium text-gray-900 mb-4">Pre-built Optimization Scenarios</h3>
            <div className="grid grid-cols-2 gap-4">
              {scenarios?.map((scenario) => (
                <div
                  key={scenario._id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedScenario?._id === scenario._id
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                    </div>
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-medium">${(scenario.totalBudget / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-medium text-green-600">
                        ${(scenario.projectedRevenue / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">ROAS</p>
                      <p className="font-medium text-purple-600">{scenario.projectedROAS.toFixed(1)}x</p>
                    </div>
                  </div>
                  {scenario.status === "active" && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      Currently Active
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <span>Optimization will impact {allocations.length} campaigns</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => {
              if (selectedScenario) {
                applyScenario({ scenarioId: selectedScenario._id });
              }
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Apply Optimization
          </button>
        </div>
      </div>
    </div>
  );
}