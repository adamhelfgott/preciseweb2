'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Lock
} from 'lucide-react';

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
              <div className="w-10 h-10 bg-green-400 rounded-full"></div>
              <span className="text-white text-2xl font-bold">Precise</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            The Intelligence Layer That Powers Your Unified Platform
          </h1>
          <p className="text-xl text-white/80">
            How Precise makes MadHive's promises real for OMG
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
            <h3 className="text-xl font-bold text-white mb-4">What OMG Sees</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-400 rounded flex-shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-white font-medium">Unified Platform</p>
                  <p className="text-white/70 text-sm">Single interface for all media</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-400 rounded flex-shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-white font-medium">Automated Workflows</p>
                  <p className="text-white/70 text-sm">MediaOcean integration</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-400 rounded flex-shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-white font-medium">Unified Reporting</p>
                  <p className="text-white/70 text-sm">Cross-platform metrics</p>
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
            <h3 className="text-xl font-bold text-white mb-4">MadHive Platform</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Maverick AI</p>
                  <p className="text-white/70 text-sm">Optimization engine</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Publisher Network</p>
                  <p className="text-white/70 text-sm">Disney+, Hulu, Fox, etc.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Data Marketplace</p>
                  <p className="text-white/70 text-sm">Audience segments</p>
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
            <h3 className="text-xl font-bold text-white mb-4">Precise Powers</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Verification Layer</p>
                  <p className="text-white/70 text-sm">Cryptographic proof</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Unified Intelligence</p>
                  <p className="text-white/70 text-sm">Buckets learn from each other</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Privacy Layer</p>
                  <p className="text-white/70 text-sm">Activate without sharing</p>
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
            Only With Precise + MadHive
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Instant Learning</p>
              <p className="text-white/60 text-sm">Across all buckets</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Unified Intelligence</p>
              <p className="text-white/60 text-sm">Each bucket teaches others</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Verified Performance</p>
              <p className="text-white/60 text-sm">Cryptographic proof</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Exponential Growth</p>
              <p className="text-white/60 text-sm">Network effects compound</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold">
            <CheckCircle className="w-6 h-6" />
            <span>Live Dashboard Ready at /app/omg-unified-dashboard</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}