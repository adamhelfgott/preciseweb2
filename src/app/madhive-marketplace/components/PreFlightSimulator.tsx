'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Zap,
  DollarSign,
  Target,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface DataSegment {
  id: string;
  name: string;
  provider: string;
  cost: number;
  reach: number;
  historicalROAS: number;
  confidenceScore: number;
  selected: boolean;
}

interface SimulationResult {
  projectedROAS: number;
  roasLift: number;
  projectedCPA: number;
  cpaReduction: number;
  totalReach: number;
  overlapRate: number;
  confidence: number;
  recommendations: string[];
}

export default function PreFlightSimulator() {
  const [segments, setSegments] = useState<DataSegment[]>([
    {
      id: '1',
      name: 'Auto Intenders',
      provider: 'LiveRamp',
      cost: 5.50,
      reach: 2500000,
      historicalROAS: 3.2,
      confidenceScore: 92,
      selected: false
    },
    {
      id: '2', 
      name: 'Fitness Enthusiasts',
      provider: 'BDEX',
      cost: 4.25,
      reach: 1800000,
      historicalROAS: 4.1,
      confidenceScore: 88,
      selected: true
    },
    {
      id: '3',
      name: 'High-Income Households',
      provider: 'Acxiom',
      cost: 6.00,
      reach: 1200000,
      historicalROAS: 3.8,
      confidenceScore: 95,
      selected: true
    },
    {
      id: '4',
      name: 'Local Sports Fans',
      provider: 'MadHive First-Party',
      cost: 3.00,
      reach: 900000,
      historicalROAS: 5.2,
      confidenceScore: 98,
      selected: false
    }
  ]);

  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const toggleSegment = (id: string) => {
    setSegments(segments.map(seg => 
      seg.id === id ? { ...seg, selected: !seg.selected } : seg
    ));
    setResult(null); // Clear previous results
  };

  const runSimulation = async () => {
    setSimulating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation based on selected segments
    const selectedSegments = segments.filter(s => s.selected);
    const avgROAS = selectedSegments.reduce((acc, seg) => acc + seg.historicalROAS, 0) / selectedSegments.length;
    const totalReach = selectedSegments.reduce((acc, seg) => acc + seg.reach, 0);
    
    setResult({
      projectedROAS: avgROAS * 1.15, // 15% improvement with Precise
      roasLift: 15,
      projectedCPA: 24.50,
      cpaReduction: 34,
      totalReach: totalReach,
      overlapRate: 12,
      confidence: 87,
      recommendations: [
        'Add "Local Sports Fans" for 18% additional lift',
        'Remove "Auto Intenders" due to high overlap with other segments',
        'Consider time-based activation for "Fitness Enthusiasts" (6am-9am)'
      ]
    });
    
    setSimulating(false);
  };

  const selectedCount = segments.filter(s => s.selected).length;
  const totalCost = segments.filter(s => s.selected).reduce((acc, seg) => acc + seg.cost, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Pre-Flight Segment Validator</h1>
        </div>
        <p className="text-gray-600">
          Simulate campaign performance before spending a dollar. Powered by historical return-path data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Segment Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Select Data Segments</h2>
            
            <div className="space-y-3">
              {segments.map((segment) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    segment.selected 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSegment(segment.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {segment.selected ? (
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{segment.name}</h3>
                        <p className="text-sm text-gray-600">{segment.provider}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-500">
                            Reach: {(segment.reach / 1000000).toFixed(1)}M
                          </span>
                          <span className="text-gray-500">
                            Historical ROAS: {segment.historicalROAS}x
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            {segment.confidenceScore}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${segment.cost.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">CPM</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Selected Segments</p>
                  <p className="text-2xl font-bold">{selectedCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg CPM</p>
                  <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
                </div>
              </div>
              
              <button
                onClick={runSimulation}
                disabled={selectedCount === 0 || simulating}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold 
                         hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                         transition-colors flex items-center justify-center gap-2"
              >
                {simulating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Simulating Performance...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Run Simulation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Predicted Performance</h2>
            
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {/* ROAS Prediction */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Projected ROAS</span>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {result.projectedROAS.toFixed(1)}x
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +{result.roasLift}% vs. baseline
                  </p>
                </div>

                {/* CPA Prediction */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Projected CPA</span>
                    <TrendingDown className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    ${result.projectedCPA.toFixed(2)}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    -{result.cpaReduction}% reduction
                  </p>
                </div>

                {/* Additional Metrics */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Reach</span>
                    <span className="text-sm font-semibold">
                      {(result.totalReach / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Overlap Rate</span>
                    <span className="text-sm font-semibold">{result.overlapRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confidence</span>
                    <span className="text-sm font-semibold text-green-600">
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                    Save Scenario
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                    Export Report
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Select segments and run simulation to see predictions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}