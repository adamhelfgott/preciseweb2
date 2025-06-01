"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  TrendingUp, 
  Users, 
  Lock,
  Award,
  Zap,
  ArrowUpRight,
  Info
} from "lucide-react";
import SharedCohorts from "@/components/app/data-impact/SharedCohorts";
import MediaCredits from "@/components/app/data-impact/MediaCredits";
import DataContribution from "@/components/app/data-impact/DataContribution";
import LiftAnalysis from "@/components/app/data-impact/LiftAnalysis";
import FirstPartySignalAmplifier from "@/components/app/data-impact/FirstPartySignalAmplifier";

export default function DataImpactPage() {
  const [activeTab, setActiveTab] = useState<"contribution" | "cohorts" | "credits" | "lift" | "amplifier">("contribution");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-gray mb-2">
            Data Collaboration Impact
          </h1>
          <p className="text-sm sm:text-base text-medium-gray">
            See how your data contributes to the ecosystem and unlocks new opportunities
          </p>
        </div>
      </div>

      {/* Impact Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Database className="w-5 h-5 text-primary-orange" />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-sm text-medium-gray mb-1">Data Points Shared</p>
          <p className="text-2xl font-bold text-dark-gray">2.4M</p>
          <p className="text-xs text-medium-gray">Privacy-preserved</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-xs text-green-600">+45%</span>
          </div>
          <p className="text-sm text-medium-gray mb-1">Campaign Lift</p>
          <p className="text-2xl font-bold text-dark-gray">3.2x</p>
          <p className="text-xs text-medium-gray">vs. baseline</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-sm text-medium-gray mb-1">Media Credits</p>
          <p className="text-2xl font-bold text-dark-gray">$42K</p>
          <p className="text-xs text-medium-gray">Earned this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-light-gray p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-sm text-medium-gray mb-1">Cohorts Joined</p>
          <p className="text-2xl font-bold text-dark-gray">8/12</p>
          <p className="text-xs text-orange-600">4 available</p>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide border-b border-light-gray">
        <button
          onClick={() => setActiveTab("contribution")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "contribution"
              ? "text-primary-orange border-b-2 border-primary-orange"
              : "text-medium-gray hover:text-dark-gray"
          }`}
        >
          My Data Contribution
        </button>
        <button
          onClick={() => setActiveTab("cohorts")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "cohorts"
              ? "text-primary-orange border-b-2 border-primary-orange"
              : "text-medium-gray hover:text-dark-gray"
          }`}
        >
          Shared Outcome Cohorts
        </button>
        <button
          onClick={() => setActiveTab("credits")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "credits"
              ? "text-primary-orange border-b-2 border-primary-orange"
              : "text-medium-gray hover:text-dark-gray"
          }`}
        >
          Media Credits
        </button>
        <button
          onClick={() => setActiveTab("lift")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "lift"
              ? "text-primary-orange border-b-2 border-primary-orange"
              : "text-medium-gray hover:text-dark-gray"
          }`}
        >
          Lift Analysis
        </button>
        <button
          onClick={() => setActiveTab("amplifier")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "amplifier"
              ? "text-primary-orange border-b-2 border-primary-orange"
              : "text-medium-gray hover:text-dark-gray"
          }`}
        >
          First-Party Amplifier
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "contribution" && <DataContribution />}
        {activeTab === "cohorts" && <SharedCohorts />}
        {activeTab === "credits" && <MediaCredits />}
        {activeTab === "lift" && <LiftAnalysis />}
        {activeTab === "amplifier" && <FirstPartySignalAmplifier />}
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
      >
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">
              Privacy-First Collaboration
            </h4>
            <p className="text-sm text-medium-gray mb-3">
              All data sharing happens through Precise's privacy-preserving infrastructure:
            </p>
            <ul className="text-sm text-medium-gray space-y-1 ml-4">
              <li>• Differential privacy ensures individual user data remains anonymous</li>
              <li>• Secure multi-party computation prevents raw data exposure</li>
              <li>• Cryptographic proofs verify data authenticity without revealing content</li>
              <li>• You maintain full control and can revoke access at any time</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}