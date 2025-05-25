"use client";

import { motion } from "framer-motion";
import { Users, Lock, TrendingUp, Sparkles, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface Cohort {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  expectedLift: number;
  dataRequired: string[];
  privacyLevel: "high" | "medium" | "low";
  status: "joined" | "available" | "locked";
  benefits: string[];
  missingRequirements?: string[];
}

const COHORTS: Cohort[] = [
  {
    id: "1",
    name: "Premium Auto Intenders",
    description: "Brands targeting luxury vehicle purchasers with verified income and interest signals",
    members: 12,
    category: "Automotive",
    expectedLift: 4.2,
    dataRequired: ["Purchase history", "Income verification", "Website behavior"],
    privacyLevel: "high",
    status: "joined",
    benefits: [
      "Access to Tesla, BMW, Mercedes campaigns",
      "3.8x average ROAS improvement",
      "$156K monthly media credits"
    ]
  },
  {
    id: "2",
    name: "Fitness Enthusiasts Alliance",
    description: "Wellness brands collaborating on verified health and fitness audience data",
    members: 24,
    category: "Health & Wellness",
    expectedLift: 3.5,
    dataRequired: ["App usage", "Purchase history", "Location patterns"],
    privacyLevel: "medium",
    status: "joined",
    benefits: [
      "Nike, Adidas, Peloton partnerships",
      "Cross-promotion opportunities",
      "$98K monthly media credits"
    ]
  },
  {
    id: "3",
    name: "Streaming Media Consortium",
    description: "Entertainment platforms sharing viewing patterns for better content recommendations",
    members: 18,
    category: "Entertainment",
    expectedLift: 2.8,
    dataRequired: ["Viewing history", "Subscription data", "Device usage"],
    privacyLevel: "high",
    status: "available",
    benefits: [
      "Disney+, Netflix, HBO Max campaigns",
      "Content recommendation insights",
      "Est. $120K monthly credits"
    ],
    missingRequirements: ["Viewing history data"]
  },
  {
    id: "4",
    name: "Sustainable Lifestyle Collective",
    description: "Eco-conscious brands targeting verified sustainable product purchasers",
    members: 15,
    category: "Retail",
    expectedLift: 3.2,
    dataRequired: ["Purchase history", "Brand preferences", "Values survey"],
    privacyLevel: "medium",
    status: "available",
    benefits: [
      "Patagonia, Allbirds partnerships",
      "Green consumer insights",
      "Est. $85K monthly credits"
    ],
    missingRequirements: ["Values survey data", "Eco-purchase history"]
  },
  {
    id: "5",
    name: "Travel Intent Network",
    description: "Travel brands sharing anonymized booking and search patterns",
    members: 21,
    category: "Travel",
    expectedLift: 4.5,
    dataRequired: ["Search history", "Booking data", "Location history"],
    privacyLevel: "high",
    status: "locked",
    benefits: [
      "Expedia, Airbnb, United campaigns",
      "Seasonal trend predictions",
      "Est. $145K monthly credits"
    ],
    missingRequirements: ["Booking data", "Location history", "Search patterns"]
  }
];

export default function SharedCohorts() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "joined": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "available": return <Sparkles className="w-5 h-5 text-yellow-600" />;
      case "locked": return <Lock className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "joined": return "bg-green-50 border-green-200";
      case "available": return "bg-yellow-50 border-yellow-200";
      case "locked": return "bg-gray-50 border-gray-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  const getPrivacyColor = (level: string) => {
    switch (level) {
      case "high": return "bg-green-100 text-green-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Active</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">2 Cohorts</p>
          <p className="text-sm text-medium-gray">Generating $254K/mo</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">Available</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">2 Cohorts</p>
          <p className="text-sm text-medium-gray">Est. $205K/mo</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Avg. Lift</span>
          </div>
          <p className="text-2xl font-bold text-dark-gray">3.6x</p>
          <p className="text-sm text-medium-gray">Across all cohorts</p>
        </div>
      </div>

      {/* Cohort List */}
      <div className="space-y-4">
        {COHORTS.map((cohort, index) => (
          <motion.div
            key={cohort.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl border p-6 ${getStatusColor(cohort.status)}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              {/* Cohort Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  {getStatusIcon(cohort.status)}
                  <div>
                    <h4 className="font-semibold text-dark-gray text-lg">{cohort.name}</h4>
                    <p className="text-sm text-medium-gray mt-1">{cohort.description}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-medium-gray">Members</p>
                    <p className="text-sm font-semibold text-dark-gray">{cohort.members} brands</p>
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray">Category</p>
                    <p className="text-sm font-semibold text-dark-gray">{cohort.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray">Expected Lift</p>
                    <p className="text-sm font-semibold text-green-600">{cohort.expectedLift}x</p>
                  </div>
                  <div>
                    <p className="text-xs text-medium-gray">Privacy</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPrivacyColor(cohort.privacyLevel)}`}>
                      {cohort.privacyLevel}
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-dark-gray mb-2">Benefits:</p>
                  <div className="space-y-1">
                    {cohort.benefits.map((benefit, i) => (
                      <p key={i} className="text-xs text-medium-gray flex items-start gap-1">
                        <span className="text-green-600 mt-0.5">•</span>
                        {benefit}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                {cohort.status !== "joined" && (
                  <div>
                    <p className="text-xs font-medium text-dark-gray mb-2">Data Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {cohort.dataRequired.map((req) => (
                        <span
                          key={req}
                          className={`text-xs px-2 py-1 rounded-full ${
                            cohort.missingRequirements?.includes(req)
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {cohort.missingRequirements?.includes(req) && <XCircle className="w-3 h-3 inline mr-1" />}
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex-shrink-0">
                {cohort.status === "joined" && (
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-600 mb-1">Active Member</p>
                    <p className="text-xs text-medium-gray">Since Jan 2024</p>
                  </div>
                )}
                {cohort.status === "available" && (
                  <button className="btn-primary">
                    Join Cohort
                  </button>
                )}
                {cohort.status === "locked" && (
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 mb-1">Requirements Not Met</p>
                    <p className="text-xs text-medium-gray">{cohort.missingRequirements?.length} missing</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Opportunity Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">
              Missing Out on $205K Monthly Credits
            </h4>
            <p className="text-sm text-medium-gray mb-3">
              By joining the 2 available cohorts, you could:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-dark-gray">+$205K</p>
                <p className="text-xs text-medium-gray">Additional monthly credits</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-dark-gray">3.0x</p>
                <p className="text-xs text-medium-gray">Average lift increase</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-dark-gray">33</p>
                <p className="text-xs text-medium-gray">New brand partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}