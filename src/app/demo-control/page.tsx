'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Zap, Activity, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

// This page is NOT linked from anywhere in the app
// Access directly at: /demo-control
export default function DemoControlPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [lastAction, setLastAction] = useState('Ready to start demo');

  const simulateEvent = async (type: string) => {
    setLastAction(`Simulating ${type}...`);
    
    // In production, this would call your demo agent API
    // For now, just update the UI
    setTimeout(() => {
      setEventCount(prev => prev + 1);
      setLastAction(`${type} event sent successfully`);
    }, 500);
  };

  const scenarios = [
    {
      name: 'Creative Fatigue Alert',
      icon: AlertTriangle,
      action: () => simulateEvent('creative-fatigue'),
      description: 'BMW Lifestyle creative hits fatigue score 8.5'
    },
    {
      name: 'Performance Spike',
      icon: TrendingUp,
      action: () => simulateEvent('performance-spike'),
      description: 'Nike campaign ROAS jumps to 4.2x'
    },
    {
      name: 'DSP Arbitrage',
      icon: Zap,
      action: () => simulateEvent('arbitrage-opportunity'),
      description: 'Same audience 40% cheaper on Amazon DSP'
    },
    {
      name: 'Budget Reallocation',
      icon: RefreshCw,
      action: () => simulateEvent('budget-shift'),
      description: 'AI moves $50k from saturated to scaling DSPs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-2xl font-bold mb-2">Demo Control Panel</h1>
          <p className="text-gray-600 mb-6">
            Hidden control panel for Cannes demo. Not accessible from main app.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Demo URL:</strong> Keep this tab open on a separate screen during demos.
              Main app should be shown on the primary display.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Demo Status</span>
                <Activity className={`w-5 h-5 ${isRunning ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <p className="text-2xl font-bold">{isRunning ? 'Running' : 'Stopped'}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Events Sent</span>
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold">{eventCount}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Last Action:</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">{lastAction}</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isRunning 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Stop Demo' : 'Start Demo'}
            </button>
            
            <button
              onClick={() => {
                setEventCount(0);
                setLastAction('Demo reset');
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6">Demo Scenarios</h2>
          
          <div className="grid gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.name}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <scenario.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{scenario.name}</h3>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={scenario.action}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Trigger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}