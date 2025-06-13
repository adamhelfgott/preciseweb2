"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, Settings, Save, RefreshCw, Info, CheckCircle, AlertCircle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AttributionWindow {
  id: string;
  name: string;
  duration: number; // in days
  type: "click" | "view" | "engagement";
  weight: number; // 0-100
  isActive: boolean;
}

interface AttributionModel {
  id: string;
  name: string;
  description: string;
  windows: AttributionWindow[];
  performance: {
    roas: number;
    conversions: number;
    revenue: number;
  };
}

const PRESET_MODELS: AttributionModel[] = [
  {
    id: "standard",
    name: "Industry Standard",
    description: "28-day click, 1-day view",
    windows: [
      { id: "1", name: "Click", duration: 28, type: "click", weight: 80, isActive: true },
      { id: "2", name: "View", duration: 1, type: "view", weight: 20, isActive: true }
    ],
    performance: { roas: 4.2, conversions: 1234, revenue: 145000 }
  },
  {
    id: "aggressive",
    name: "Aggressive Attribution",
    description: "Longer windows for brand campaigns",
    windows: [
      { id: "3", name: "Click", duration: 60, type: "click", weight: 60, isActive: true },
      { id: "4", name: "View", duration: 7, type: "view", weight: 25, isActive: true },
      { id: "5", name: "Engagement", duration: 14, type: "engagement", weight: 15, isActive: true }
    ],
    performance: { roas: 5.8, conversions: 2100, revenue: 230000 }
  },
  {
    id: "conservative",
    name: "Conservative Model",
    description: "Strict attribution for performance marketing",
    windows: [
      { id: "6", name: "Click", duration: 7, type: "click", weight: 90, isActive: true },
      { id: "7", name: "View", duration: 0.5, type: "view", weight: 10, isActive: true }
    ],
    performance: { roas: 3.2, conversions: 890, revenue: 98000 }
  }
];

const CONVERSION_DATA = [
  { day: 0, conversions: 45, revenue: 5400 },
  { day: 1, conversions: 132, revenue: 15840 },
  { day: 2, conversions: 98, revenue: 11760 },
  { day: 3, conversions: 76, revenue: 9120 },
  { day: 7, conversions: 54, revenue: 6480 },
  { day: 14, conversions: 32, revenue: 3840 },
  { day: 28, conversions: 18, revenue: 2160 },
  { day: 60, conversions: 8, revenue: 960 },
];

export default function CustomAttributionWindows() {
  const { user } = useAuth();
  const [activeModel, setActiveModel] = useState<AttributionModel>(PRESET_MODELS[0]);
  const [customWindows, setCustomWindows] = useState<AttributionWindow[]>(activeModel.windows);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Get attribution models
  const models = useQuery(api.customAttribution.getModels,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Get conversion timing data
  const conversionData = useQuery(api.customAttribution.getConversionTiming,
    convexUser?._id ? { buyerId: convexUser._id } : "skip"
  );

  // Mutations
  const saveModel = useMutation(api.customAttribution.saveModel);
  const simulateTiming = useMutation(api.customAttribution.simulateConversionTiming);

  // Use Convex data or fall back to mock
  const modelsToUse = models?.length > 0 ? models.map((m: any) => ({
    id: m._id,
    name: m.name,
    description: m.description,
    windows: m.windows.map((w: any, index: number) => ({
      id: w._id || `${index}`,
      name: w.name,
      duration: w.duration,
      type: w.type,
      weight: w.weight,
      isActive: w.isActive,
    })),
    performance: m.performance,
  })) : PRESET_MODELS;

  const conversionDataToUse = conversionData?.length > 0 ? conversionData : CONVERSION_DATA;

  // Update active model when Convex data loads
  useEffect(() => {
    if (modelsToUse.length > 0 && !isCustomMode) {
      setActiveModel(modelsToUse[0]);
      setCustomWindows(modelsToUse[0].windows);
    }
  }, [models, isCustomMode]);

  // Simulate data on activation
  useEffect(() => {
    if (!convexUser?._id || !simulationActive) return;

    const simulate = async () => {
      try {
        await simulateTiming({ buyerId: convexUser._id });
      } catch (error) {
        console.error("Failed to simulate timing data:", error);
      }
    };
    
    simulate(); // Run immediately
    
    const interval = setInterval(simulate, 60000); // Every minute

    return () => clearInterval(interval);
  }, [convexUser?._id, simulationActive, simulateTiming]);

  const handleWindowChange = (windowId: string, field: keyof AttributionWindow, value: any) => {
    setCustomWindows(prev => 
      prev.map(w => w.id === windowId ? { ...w, [field]: value } : w)
    );
    setIsCustomMode(true);
  };

  const handleSaveModel = async () => {
    if (!convexUser?._id) return;
    
    setIsSaving(true);
    try {
      await saveModel({
        buyerId: convexUser._id,
        name: isCustomMode ? "Custom Model" : activeModel.name,
        description: isCustomMode ? "User-defined attribution windows" : activeModel.description,
        isCustom: isCustomMode,
        windows: customWindows,
      });
      setIsCustomMode(false);
    } catch (error) {
      console.error("Failed to save model:", error);
    }
    setIsSaving(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "click": return "#1DB954";
      case "view": return "#1E90FF";
      case "engagement": return "#7B4FFF";
      default: return "#86868B";
    }
  };

  const totalWeight = customWindows.reduce((sum, w) => sum + (w.isActive ? w.weight : 0), 0);
  const isValidWeight = totalWeight === 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-bright-purple/10 rounded-lg">
            <Clock className="w-5 h-5 text-bright-purple" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Custom Attribution Windows</h2>
            <p className="text-sm text-medium-gray">Define your own attribution logic</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Simulation Toggle */}
          {convexUser && (
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                simulationActive 
                  ? "bg-bright-purple text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {simulationActive ? "Simulation On" : "Simulation Off"}
            </button>
          )}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="text-sm text-bright-purple hover:text-purple-700 font-medium flex items-center gap-1"
          >
            <Settings className="w-4 h-4" />
            {showComparison ? "Hide" : "Show"} Comparison
          </button>
        </div>
      </div>

      {/* Preset Models */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {modelsToUse.map((model) => (
          <button
            key={model.id}
            onClick={() => {
              setActiveModel(model);
              setCustomWindows(model.windows);
              setIsCustomMode(false);
            }}
            className={`p-4 rounded-lg border transition-all text-left ${
              activeModel.id === model.id && !isCustomMode
                ? "border-bright-purple bg-bright-purple/5"
                : "border-silk-gray hover:border-medium-gray"
            }`}
          >
            <h3 className="font-medium text-dark-gray mb-1">{model.name}</h3>
            <p className="text-xs text-medium-gray mb-3">{model.description}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-medium-gray">ROAS</span>
                <span className="font-medium text-dark-gray">{model.performance.roas.toFixed(1)}x</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-medium-gray">Revenue</span>
                <span className="font-medium text-dark-gray">
                  ${(model.performance.revenue / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Custom Attribution Builder */}
      <div className="bg-light-gray rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-dark-gray">Attribution Windows</h3>
          {!isValidWeight && (
            <div className="flex items-center gap-2 text-warm-coral text-sm">
              <AlertCircle className="w-4 h-4" />
              Weights must total 100% (currently {totalWeight}%)
            </div>
          )}
        </div>

        <div className="space-y-4">
          {customWindows.map((window) => (
            <motion.div
              key={window.id}
              layout
              className={`p-4 bg-white rounded-lg border ${
                window.isActive ? "border-silk-gray" : "border-light-gray opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={window.isActive}
                  onChange={(e) => handleWindowChange(window.id, "isActive", e.target.checked)}
                  className="w-4 h-4 text-bright-purple rounded focus:ring-bright-purple"
                />
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-medium-gray">Type</label>
                    <select
                      value={window.type}
                      onChange={(e) => handleWindowChange(window.id, "type", e.target.value)}
                      disabled={!window.isActive}
                      className="w-full mt-1 px-3 py-1.5 text-sm border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-purple disabled:opacity-50"
                    >
                      <option value="click">Click</option>
                      <option value="view">View</option>
                      <option value="engagement">Engagement</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-medium-gray">Duration (days)</label>
                    <input
                      type="number"
                      value={window.duration}
                      onChange={(e) => handleWindowChange(window.id, "duration", parseFloat(e.target.value))}
                      disabled={!window.isActive}
                      min={0.5}
                      max={90}
                      step={0.5}
                      className="w-full mt-1 px-3 py-1.5 text-sm border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-purple disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-medium-gray">Weight (%)</label>
                    <input
                      type="number"
                      value={window.weight}
                      onChange={(e) => handleWindowChange(window.id, "weight", parseInt(e.target.value))}
                      disabled={!window.isActive}
                      min={0}
                      max={100}
                      className="w-full mt-1 px-3 py-1.5 text-sm border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-purple disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-end">
                    <div className="w-full bg-light-gray rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          width: `${window.weight}%`,
                          backgroundColor: getTypeColor(window.type),
                          opacity: window.isActive ? 1 : 0.3
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => {
              setCustomWindows(activeModel.windows);
              setIsCustomMode(false);
            }}
            className="text-sm text-medium-gray hover:text-dark-gray flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Preset
          </button>
          
          <button
            onClick={handleSaveModel}
            disabled={!isValidWeight || isSaving}
            className="bg-bright-purple text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Custom Model
              </>
            )}
          </button>
        </div>
      </div>

      {/* Conversion Timing Chart */}
      <div className="mb-6">
        <h3 className="font-medium text-dark-gray mb-4">Conversion Timing Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conversionDataToUse}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E7" />
              <XAxis 
                dataKey="day" 
                stroke="#86868B"
                tickFormatter={(value) => `Day ${value}`}
              />
              <YAxis stroke="#86868B" />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  name === "conversions" ? value : `$${value.toLocaleString()}`,
                  name === "conversions" ? "Conversions" : "Revenue"
                ]}
              />
              <Bar dataKey="conversions" fill="#1DB954" name="conversions">
                {conversionDataToUse.map((entry: any, index: number) => {
                  const relevantWindow = customWindows.find(w => 
                    w.isActive && entry.day <= w.duration
                  );
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={relevantWindow ? getTypeColor(relevantWindow.type) : "#E5E5E7"} 
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          {customWindows.filter(w => w.isActive).map((window) => (
            <div key={window.id} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getTypeColor(window.type) }}
              />
              <span className="text-sm text-medium-gray">
                {window.type} ({window.duration}d)
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-light-gray" />
            <span className="text-sm text-medium-gray">Outside window</span>
          </div>
        </div>
      </div>

      {/* Model Comparison */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-silk-gray pt-6"
          >
            <h3 className="font-medium text-dark-gray mb-4">Model Performance Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modelsToUse.map((model) => (
                <div key={model.id} className="bg-light-gray rounded-lg p-4">
                  <h4 className="font-medium text-dark-gray mb-3">{model.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-medium-gray">ROAS</span>
                      <span className="text-sm font-medium text-dark-gray">{model.performance.roas.toFixed(1)}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-medium-gray">Conversions</span>
                      <span className="text-sm font-medium text-dark-gray">
                        {model.performance.conversions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-medium-gray">Revenue</span>
                      <span className="text-sm font-medium text-dark-gray">
                        ${(model.performance.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-electric-blue/10 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-medium-gray">
                  Different attribution windows can significantly impact reported performance. 
                  Choose a model that aligns with your business goals and customer journey.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}