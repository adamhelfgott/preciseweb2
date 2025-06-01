'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, TrendingUp, Users, AlertTriangle, DollarSign, ArrowRight } from 'lucide-react';

type FlowType = 'creative-fatigue' | 'bid-enhancement' | 'audience-discovery';

const flows = {
  'creative-fatigue': {
    title: 'Creative Fatigue Detection',
    steps: [
      { agent: 'DV360', action: 'Reports declining CTR', icon: TrendingUp },
      { agent: 'Precise.ai', action: 'Analyzes cross-platform patterns', icon: Brain },
      { agent: 'Meta', action: 'Confirms similar fatigue', icon: AlertTriangle },
      { agent: 'Precise.ai', action: 'Sends rotation alert', icon: Zap },
      { agent: 'All DSPs', action: 'Auto-rotate creatives', icon: DollarSign }
    ],
    description: 'When one DSP detects performance drops, Precise.ai checks all platforms and coordinates creative refresh across all channels simultaneously.'
  },
  'bid-enhancement': {
    title: 'Real-Time Bid Optimization',
    steps: [
      { agent: 'Amazon DSP', action: 'Receives bid request', icon: DollarSign },
      { agent: 'Precise.ai', action: 'Calculates incrementality', icon: Brain },
      { agent: 'Attribution Engine', action: 'Checks user journey', icon: TrendingUp },
      { agent: 'Precise.ai', action: 'Returns bid modifier', icon: Zap },
      { agent: 'Amazon DSP', action: 'Places optimized bid', icon: DollarSign }
    ],
    description: 'Every bid request is enhanced with cross-platform attribution data, ensuring you bid the right amount based on true incremental value.'
  },
  'audience-discovery': {
    title: 'Audience Arbitrage Discovery',
    steps: [
      { agent: 'TTD', action: 'High-performing segment found', icon: Users },
      { agent: 'Precise.ai', action: 'Analyzes segment pricing', icon: Brain },
      { agent: 'All DSPs', action: 'Compare segment costs', icon: DollarSign },
      { agent: 'Precise.ai', action: 'Identifies arbitrage', icon: TrendingUp },
      { agent: 'Budget Agent', action: 'Reallocates spend', icon: Zap }
    ],
    description: 'Discover high-value audiences on one platform and find where they\'re underpriced on others, automatically shifting budget for maximum efficiency.'
  }
};

export default function InteractiveA2ADiagram() {
  const [activeFlow, setActiveFlow] = useState<FlowType>('creative-fatigue');
  const [activeStep, setActiveStep] = useState(0);

  const currentFlow = flows[activeFlow];

  // Auto-advance animation
  useState(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentFlow.steps.length);
    }, 2000);
    return () => clearInterval(timer);
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Flow Selector */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {Object.entries(flows).map(([key, flow]) => (
          <button
            key={key}
            onClick={() => {
              setActiveFlow(key as FlowType);
              setActiveStep(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeFlow === key
                ? 'bg-dark-gray text-white'
                : 'bg-gray-100 text-medium-gray hover:bg-gray-200'
            }`}
          >
            {flow.title}
          </button>
        ))}
      </div>

      {/* Flow Visualization */}
      <div className="relative h-96 mb-8">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
          {/* DSP Nodes */}
          <g>
            {/* DV360 */}
            <motion.g
              animate={{
                scale: activeStep === 0 && activeFlow === 'creative-fatigue' ? 1.1 : 1,
              }}
            >
              <circle cx="150" cy="100" r="40" fill="#0984E3" opacity="0.1" />
              <circle cx="150" cy="100" r="30" fill="#0984E3" />
              <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                DV360
              </text>
            </motion.g>

            {/* Amazon DSP */}
            <motion.g
              animate={{
                scale: activeStep === 0 && activeFlow === 'bid-enhancement' ? 1.1 : 1,
              }}
            >
              <circle cx="150" cy="200" r="40" fill="#FF9F43" opacity="0.1" />
              <circle cx="150" cy="200" r="30" fill="#FF9F43" />
              <text x="150" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                Amazon
              </text>
            </motion.g>

            {/* The Trade Desk */}
            <motion.g
              animate={{
                scale: activeStep === 0 && activeFlow === 'audience-discovery' ? 1.1 : 1,
              }}
            >
              <circle cx="150" cy="300" r="40" fill="#A29BFE" opacity="0.1" />
              <circle cx="150" cy="300" r="30" fill="#A29BFE" />
              <text x="150" y="305" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                TTD
              </text>
            </motion.g>

            {/* Meta */}
            <circle cx="650" cy="100" r="30" fill="#4267B2" />
            <text x="650" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Meta
            </text>

            {/* Precise.ai Hub */}
            <motion.g
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <rect x="350" y="150" width="100" height="100" rx="20" fill="black" />
              <text x="400" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                Precise.ai
              </text>
              <text x="400" y="215" textAnchor="middle" fill="white" fontSize="10">
                Intelligence Hub
              </text>
            </motion.g>
          </g>

          {/* Animated Data Flow Lines */}
          <AnimatePresence>
            {activeStep > 0 && (
              <motion.path
                d="M 180 100 Q 300 100 350 175"
                fill="none"
                stroke="#0984E3"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {activeStep > 1 && (
              <motion.path
                d="M 450 175 Q 550 100 620 100"
                fill="none"
                stroke="#4267B2"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </svg>

        {/* Step Indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
          {currentFlow.steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeStep ? 'bg-electric-blue w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Step Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="p-2 bg-white rounded-lg">
              {React.createElement(currentFlow.steps[activeStep].icon, {
                className: 'w-5 h-5 text-electric-blue'
              })}
            </div>
            <div>
              <h4 className="font-semibold text-dark-gray">
                Step {activeStep + 1}: {currentFlow.steps[activeStep].agent}
              </h4>
              <p className="text-medium-gray">
                {currentFlow.steps[activeStep].action}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Flow Explanation */}
      <div className="mt-6 p-4 bg-electric-blue/5 rounded-lg">
        <h3 className="font-semibold mb-2 text-dark-gray flex items-center gap-2">
          <Brain className="w-5 h-5 text-electric-blue" />
          What's Happening:
        </h3>
        <p className="text-medium-gray">
          {currentFlow.description}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-electric-blue">50ms</p>
          <p className="text-sm text-medium-gray">Response Time</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-brand-green">99.9%</p>
          <p className="text-sm text-medium-gray">Uptime SLA</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-bright-purple">10B+</p>
          <p className="text-sm text-medium-gray">Daily Decisions</p>
        </div>
      </div>
    </div>
  );
}

const React = { createElement: (component: any, props: any) => {
  const Component = component;
  return <Component {...props} />;
}};