"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@/contexts/AuthContext";
import { Lightbulb, ChevronRight, X } from "lucide-react";

interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  icon: string;
  estimatedImpact: {
    type: string;
    value: number | string;
  };
  status: "new" | "viewed" | "applied" | "dismissed";
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    priority: "high",
    title: "Add Sleep Data to Fitness Events",
    description: "Cohorts with sleep + fitness data earn 3.2x higher CPMs. Your estimated additional revenue: +$18,400/month",
    icon: "💎",
    estimatedImpact: {
      type: "revenue",
      value: 18400,
    },
    status: "new",
  },
  {
    id: "2",
    priority: "medium",
    title: "Enable Cross-Device Matching",
    description: "Partner with LiveRamp to increase match rates by 45%. Projected CPM increase: +$12-15",
    icon: "🔗",
    estimatedImpact: {
      type: "cpm",
      value: "12-15",
    },
    status: "new",
  },
  {
    id: "3",
    priority: "low",
    title: "Optimize Data Freshness",
    description: "Update data every 6 hours instead of daily for +18% quality score improvement",
    icon: "⚡",
    estimatedImpact: {
      type: "quality",
      value: 18,
    },
    status: "new",
  },
];

export default function RecommendationsPanel() {
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Get user's Convex ID
  const convexUser = useQuery(api.auth.getUserByEmail, 
    user?.email ? { email: user.email } : "skip"
  );

  // Fetch recommendations from Convex
  const convexRecommendations = useQuery(api.recommendations.getRecommendations,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  // Update recommendation status mutation
  const updateStatus = useMutation(api.recommendations.updateRecommendationStatus);

  // Use Convex data if available, otherwise fall back to mock data
  const recommendations = convexRecommendations || mockRecommendations;

  // Format Convex recommendations to match the component interface
  const formattedRecommendations = recommendations.map((rec: any) => ({
    id: rec._id || rec.id,
    priority: rec.priority,
    title: rec.title,
    description: rec.description,
    icon: rec.priority === "high" ? "💎" : rec.priority === "medium" ? "🔗" : "⚡",
    estimatedImpact: rec.estimatedImpact || {
      type: "revenue",
      value: rec.priority === "high" ? 18400 : rec.priority === "medium" ? 12000 : 5000
    },
    status: rec.status,
  }));

  const handleDismiss = async (id: string) => {
    if (convexRecommendations) {
      // Update status in Convex
      await updateStatus({ 
        recommendationId: id, 
        status: "dismissed" 
      });
    }
  };

  const handleApply = async (id: string) => {
    if (convexRecommendations) {
      // Update status in Convex
      await updateStatus({ 
        recommendationId: id, 
        status: "applied" 
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-warm-coral/10 text-warm-coral border-warm-coral/20";
      case "medium": return "bg-brand-green/10 text-brand-green border-brand-green/20";
      case "low": return "bg-electric-blue/10 text-electric-blue border-electric-blue/20";
      default: return "bg-light-gray text-medium-gray border-silk-gray";
    }
  };

  const activeRecommendations = formattedRecommendations.filter((r: any) => 
    r.status !== "dismissed" && r.status !== "applied"
  );

  // Loading state
  if (!user || !convexUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-2"></div>
            <p className="text-sm text-medium-gray">Loading recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-silk-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center">
            <Lightbulb size={20} className="text-brand-green" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-gray">Monetization Opportunities</h2>
            <p className="text-sm text-medium-gray">AI-powered recommendations to maximize earnings</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {activeRecommendations.map((rec: any) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                expandedId === rec.id ? "shadow-md" : "hover:shadow-sm"
              }`}
              onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{rec.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-dark-gray mb-1">
                        {rec.title}
                      </h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(rec.id);
                      }}
                      className="text-medium-gray hover:text-dark-gray transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="text-sm text-medium-gray mt-2">
                    {rec.description}
                  </p>

                  {expandedId === rec.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-silk-gray"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-medium-gray">Estimated Impact</p>
                          <p className="text-lg font-semibold text-dark-gray">
                            {rec.estimatedImpact.type === "revenue" && `+$${rec.estimatedImpact.value.toLocaleString()}/mo`}
                            {rec.estimatedImpact.type === "cpm" && `+$${rec.estimatedImpact.value} CPM`}
                            {rec.estimatedImpact.type === "quality" && `+${rec.estimatedImpact.value}% quality`}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(rec.id);
                          }}
                          className="btn-primary text-sm"
                        >
                          Apply Recommendation
                          <ChevronRight size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                          className="btn-secondary text-sm"
                        >
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}