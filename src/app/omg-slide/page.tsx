'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Play
} from 'lucide-react';
import Icon from '@/components/Icon';

export default function OMGSlidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-white text-3xl font-bold">OMG</span>
            <span className="text-white/60 text-2xl">×</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-400 rounded"></div>
              <span className="text-white text-2xl font-bold">MadHive</span>
            </div>
            <span className="text-white/60 text-2xl">×</span>
            <div className="flex items-center gap-2">
              <Icon size={40} className="brightness-0 invert" />
              <span className="text-white text-2xl font-bold">Precise</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            One Dashboard. All Platforms. Real-Time Execution.
          </h1>
          <p className="text-xl text-white/80">
            See and control every campaign across Hulu, Disney+, Fox, NBC in one unified view
          </p>
        </motion.div>

        {/* Three Column Architecture */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* What OMG Sees */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">What You Control</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🎬</span>
                <div>
                  <p className="text-white font-medium">Every Platform</p>
                  <p className="text-white/70 text-sm">Streaming, broadcast, linear - unified</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">⚡</span>
                <div>
                  <p className="text-white font-medium">Real-Time Execution</p>
                  <p className="text-white/70 text-sm">See changes happen instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🎯</span>
                <div>
                  <p className="text-white font-medium">Campaign-Level Control</p>
                  <p className="text-white/70 text-sm">Drill down to any detail</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What MadHive Provides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">Platform Network</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🟢</span>
                <div>
                  <p className="text-white font-medium">Hulu & Disney+</p>
                  <p className="text-white/70 text-sm">Click to see all campaigns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🦊</span>
                <div>
                  <p className="text-white font-medium">Fox & NBC</p>
                  <p className="text-white/70 text-sm">Real-time performance data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🟣</span>
                <div>
                  <p className="text-white font-medium">MadHive Network</p>
                  <p className="text-white/70 text-sm">All publishers unified</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What Precise Powers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border-2 border-green-400/50"
          >
            <h3 className="text-xl font-bold text-white mb-4">What Makes It Work</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔄</span>
                <div>
                  <p className="text-white font-medium">Unified Intelligence</p>
                  <p className="text-white/70 text-sm">Every platform learns from others</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🎨</span>
                <div>
                  <p className="text-white font-medium">Dynamic Allocation</p>
                  <p className="text-white/70 text-sm">Budget flows to performance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <p className="text-white font-medium">Verified Attribution</p>
                  <p className="text-white/70 text-sm">Cryptographic proof of results</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            The Power of Unified Execution
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📊</span>
              </div>
              <p className="text-white font-medium">Single Dashboard</p>
              <p className="text-white/60 text-sm">All platforms unified</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🎮</span>
              </div>
              <p className="text-white font-medium">Total Control</p>
              <p className="text-white/60 text-sm">Click any platform to drill in</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🚀</span>
              </div>
              <p className="text-white font-medium">Real-Time Updates</p>
              <p className="text-white/60 text-sm">See changes instantly</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🎯</span>
              </div>
              <p className="text-white font-medium">Performance Driven</p>
              <p className="text-white/60 text-sm">Budget flows to what works</p>
            </div>
          </div>
        </motion.div>

        {/* Live Dashboard CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              See the Unified Intelligence System in Action
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Control every campaign across every platform in one unified view. Click into any platform 
              to see campaigns. Watch budgets flow to performance. All in real-time.
            </p>
            <Link 
              href="/app/omg-unified-dashboard"
              className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              <Play className="w-6 h-6" />
              Launch Live Dashboard Demo
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-white/70 text-sm mt-4">
              Unified platform control • Click to drill down • Real-time execution
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}