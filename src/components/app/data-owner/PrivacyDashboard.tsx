"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  AlertCircle,
  CheckCircle,
  Activity,
  Database,
  Zap,
  Info,
  TrendingUp,
} from "lucide-react";

interface PrivacyMetric {
  metric: string;
  value: number;
  threshold: number;
  status: "safe" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

interface QueryType {
  type: string;
  count: number;
  privacyImpact: "low" | "medium" | "high";
  budgetUsage: number;
}

interface ComplianceItem {
  regulation: string;
  status: "compliant" | "review" | "action";
  lastAudit: Date;
  nextAudit: Date;
  score: number;
}

interface PrivacyBudget {
  total: number;
  used: number;
  remaining: number;
  resetDate: Date;
  allocation: {
    category: string;
    allocated: number;
    used: number;
  }[];
}

const privacyMetrics: PrivacyMetric[] = [
  {
    metric: "Differential Privacy ε",
    value: 0.8,
    threshold: 1.0,
    status: "safe",
    trend: "stable",
  },
  {
    metric: "Query Sensitivity",
    value: 0.3,
    threshold: 0.5,
    status: "safe",
    trend: "down",
  },
  {
    metric: "Re-identification Risk",
    value: 0.12,
    threshold: 0.25,
    status: "safe",
    trend: "down",
  },
  {
    metric: "Data Exposure Rate",
    value: 0.45,
    threshold: 0.6,
    status: "warning",
    trend: "up",
  },
];

const queryTypes: QueryType[] = [
  {
    type: "Aggregate Analytics",
    count: 3420,
    privacyImpact: "low",
    budgetUsage: 15,
  },
  {
    type: "Cohort Analysis",
    count: 1856,
    privacyImpact: "medium",
    budgetUsage: 25,
  },
  {
    type: "Lookalike Modeling",
    count: 923,
    privacyImpact: "medium",
    budgetUsage: 18,
  },
  {
    type: "Attribution Queries",
    count: 567,
    privacyImpact: "high",
    budgetUsage: 22,
  },
  {
    type: "Custom Segments",
    count: 234,
    privacyImpact: "high",
    budgetUsage: 20,
  },
];

const complianceItems: ComplianceItem[] = [
  {
    regulation: "GDPR",
    status: "compliant",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 75),
    score: 98,
  },
  {
    regulation: "CCPA",
    status: "compliant",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    score: 95,
  },
  {
    regulation: "HIPAA",
    status: "review",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
    score: 88,
  },
  {
    regulation: "SOC 2",
    status: "compliant",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 160),
    score: 92,
  },
];

const privacyBudget: PrivacyBudget = {
  total: 100,
  used: 68,
  remaining: 32,
  resetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  allocation: [
    { category: "Aggregate Queries", allocated: 30, used: 18 },
    { category: "Cohort Analysis", allocated: 25, used: 22 },
    { category: "Attribution", allocated: 25, used: 20 },
    { category: "Custom Segments", allocated: 20, used: 8 },
  ],
};

export default function PrivacyDashboard() {
  const [selectedView, setSelectedView] = useState<"metrics" | "compliance">(
    "metrics"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
      case "compliant":
        return "text-brand-green";
      case "warning":
      case "review":
        return "text-brand-orange";
      case "critical":
      case "action":
        return "text-brand-red";
      default:
        return "text-medium-gray";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "safe":
      case "compliant":
        return "bg-brand-green/10";
      case "warning":
      case "review":
        return "bg-brand-orange/10";
      case "critical":
      case "action":
        return "bg-brand-red/10";
      default:
        return "bg-light-gray";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-gray">
            Privacy Dashboard
          </h2>
          <p className="text-sm text-medium-gray mt-1">
            Monitor privacy metrics, compliance, and data protection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedView("metrics")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedView === "metrics"
                ? "bg-bright-purple text-white"
                : "bg-light-gray text-medium-gray hover:bg-light-gray/80"
            }`}
          >
            Privacy Metrics
          </button>
          <button
            onClick={() => setSelectedView("compliance")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedView === "compliance"
                ? "bg-bright-purple text-white"
                : "bg-light-gray text-medium-gray hover:bg-light-gray/80"
            }`}
          >
            Compliance
          </button>
        </div>
      </div>

      {/* Privacy Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-gradient-to-r from-bright-purple/10 to-brand-blue/10 rounded-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-bright-purple" />
            <h3 className="font-medium text-dark-gray">Privacy Budget Status</h3>
            <div className="group relative">
              <Info size={14} className="text-medium-gray cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-dark-gray text-white text-xs p-2 rounded whitespace-nowrap z-10">
                Privacy budget ensures differential privacy guarantees
              </div>
            </div>
          </div>
          <span className="text-sm text-medium-gray">
            Resets in {Math.ceil((privacyBudget.resetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
          </span>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-medium-gray">Budget Usage</span>
            <span className="font-medium text-dark-gray">
              {privacyBudget.used}% used
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-3">
            <div
              className="bg-gradient-to-r from-bright-purple to-brand-blue h-3 rounded-full transition-all duration-500"
              style={{ width: `${privacyBudget.used}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {privacyBudget.allocation.map((alloc, index) => (
            <motion.div
              key={alloc.category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 rounded-lg p-2"
            >
              <p className="text-xs text-medium-gray mb-1">{alloc.category}</p>
              <p className="text-sm font-medium text-dark-gray">
                {alloc.used}/{alloc.allocated}
              </p>
              <div className="mt-1 w-full bg-light-gray rounded-full h-1">
                <div
                  className="bg-bright-purple h-1 rounded-full"
                  style={{ width: `${(alloc.used / alloc.allocated) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedView === "metrics" ? (
        <>
          {/* Privacy Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {privacyMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-silk-gray rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-dark-gray">{metric.metric}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusBg(
                          metric.status
                        )} ${getStatusColor(metric.status)}`}
                      >
                        {metric.status}
                      </span>
                      <span className="text-xs text-medium-gray">
                        {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"} {metric.trend}
                      </span>
                    </div>
                  </div>
                  <div className="group relative">
                    <Info size={14} className="text-medium-gray cursor-help" />
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-dark-gray text-white text-xs p-2 rounded whitespace-nowrap z-10">
                      Threshold: {metric.threshold}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-end justify-between mb-1">
                    <span className="text-2xl font-bold text-dark-gray">
                      {metric.value}
                    </span>
                    <span className="text-xs text-medium-gray">
                      / {metric.threshold}
                    </span>
                  </div>
                  <div className="w-full bg-light-gray rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric.status === "safe"
                          ? "bg-brand-green"
                          : metric.status === "warning"
                          ? "bg-brand-orange"
                          : "bg-brand-red"
                      }`}
                      style={{
                        width: `${Math.min(
                          (metric.value / metric.threshold) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Query Types Analysis */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-dark-gray mb-3">
              Query Volume by Type
            </h3>
            <div className="space-y-3">
              {queryTypes.map((query, index) => (
                <motion.div
                  key={query.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-light-gray/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        query.privacyImpact === "low"
                          ? "bg-brand-green/10"
                          : query.privacyImpact === "medium"
                          ? "bg-brand-orange/10"
                          : "bg-brand-red/10"
                      }`}
                    >
                      <Database
                        size={16}
                        className={
                          query.privacyImpact === "low"
                            ? "text-brand-green"
                            : query.privacyImpact === "medium"
                            ? "text-brand-orange"
                            : "text-brand-red"
                        }
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark-gray">
                        {query.type}
                      </p>
                      <p className="text-xs text-medium-gray">
                        {query.privacyImpact} privacy impact
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark-gray">
                      {query.count.toLocaleString()} queries
                    </p>
                    <p className="text-xs text-medium-gray">
                      {query.budgetUsage}% of budget
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Privacy Recommendations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-brand-blue/5 rounded-lg border border-brand-blue/20"
          >
            <div className="flex items-start gap-3">
              <Zap size={20} className="text-brand-blue mt-0.5" />
              <div>
                <p className="font-medium text-dark-gray mb-1">
                  Privacy Enhancement Recommendations
                </p>
                <ul className="space-y-1 text-sm text-medium-gray">
                  <li>• Consider increasing noise injection for attribution queries</li>
                  <li>• Implement query rate limiting for high-impact operations</li>
                  <li>• Enable automatic budget alerts at 80% threshold</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Compliance Status */}
          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <motion.div
                key={item.regulation}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-silk-gray rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(
                        item.status
                      )}`}
                    >
                      {item.status === "compliant" ? (
                        <CheckCircle
                          size={20}
                          className={getStatusColor(item.status)}
                        />
                      ) : item.status === "review" ? (
                        <AlertCircle
                          size={20}
                          className={getStatusColor(item.status)}
                        />
                      ) : (
                        <Lock size={20} className={getStatusColor(item.status)} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-dark-gray">
                        {item.regulation} Compliance
                      </p>
                      <p className="text-xs text-medium-gray">
                        Score: {item.score}/100
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${getStatusBg(
                      item.status
                    )} ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-medium-gray mb-1">Last Audit</p>
                    <p className="font-medium text-dark-gray">
                      {item.lastAudit.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-medium-gray mb-1">Next Audit</p>
                    <p className="font-medium text-dark-gray">
                      {item.nextAudit.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-light-gray rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        item.score >= 90
                          ? "bg-brand-green"
                          : item.score >= 70
                          ? "bg-brand-orange"
                          : "bg-brand-red"
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-light-gray/50 rounded-lg"
          >
            <h3 className="font-medium text-dark-gray mb-3">
              Upcoming Compliance Actions
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-medium-gray">HIPAA documentation review</span>
                <span className="text-brand-orange">Due in 14 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-medium-gray">GDPR annual assessment</span>
                <span className="text-medium-gray">Due in 75 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-medium-gray">SOC 2 renewal preparation</span>
                <span className="text-medium-gray">Due in 160 days</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}