'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Lock,
  Play,
  Eye,
  RefreshCw
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
            Platform Intelligence That Creates Media Credits
          </h1>
          <p className="text-xl text-white/80">
            How your campaign data generates savings across Hulu, Disney+, Fox, NBC and more
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
            <h3 className="text-xl font-bold text-white mb-4">Your Platforms</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🟢</span>
                <div>
                  <p className="text-white font-medium">Hulu, Disney+, Paramount+</p>
                  <p className="text-white/70 text-sm">Premium streaming inventory</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🦊</span>
                <div>
                  <p className="text-white font-medium">Fox, NBC, CBS, ABC</p>
                  <p className="text-white/70 text-sm">Broadcast and linear</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💵</span>
                <div>
                  <p className="text-white font-medium">Media Credits Earned</p>
                  <p className="text-white/70 text-sm">$77,000+ in current campaign</p>
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
                  <p className="text-white/70 text-sm">Annalect activation</p>
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
            <h3 className="text-xl font-bold text-white mb-4">Intelligence Creates Value</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Cross-Platform Learning</p>
                  <p className="text-white/70 text-sm">Hulu insights improve Fox CPMs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Media Credit Generation</p>
                  <p className="text-white/70 text-sm">Efficiency gains = dollar savings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Privacy-Safe Attribution</p>
                  <p className="text-white/70 text-sm">Learn without exposure</p>
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
            See Your Media Credits Grow in Real-Time
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">💰</span>
              </div>
              <p className="text-white font-medium">Media Credits</p>
              <p className="text-white/60 text-sm">$77,000+ this campaign</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Platform Allocation</p>
              <p className="text-white/60 text-sm">Budget flows to performance</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Cross-Platform AI</p>
              <p className="text-white/60 text-sm">Hulu learnings → Fox gains</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Efficiency Gains</p>
              <p className="text-white/60 text-sm">Lower CPMs over time</p>
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
              Watch your media credits grow as Hulu insights improve Fox performance. See how every platform 
              - from Disney+ to NBC - learns from each other to lower your CPMs in real-time.
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
              Campaign-level reporting • Dynamic spend allocation • Real-time cross-platform optimization
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}