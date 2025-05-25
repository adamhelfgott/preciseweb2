"use client";

import { motion } from "framer-motion";
import { useRealtimeSimulation } from "@/hooks/useRealtimeSimulation";
import AttributionBreakdown from "@/components/app/data-owner/AttributionBreakdown";
import ValenceShapleyVisualization from "@/components/app/data-owner/ValenceShapleyVisualization";
import DataContributionTimeline from "@/components/app/data-owner/DataContributionTimeline";

export default function DataOwnerAttributionPage() {
  const simulation = useRealtimeSimulation("data-owner");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-display-small font-bold text-dark-gray mb-2">
          Attribution & Value Distribution
        </h1>
        <p className="text-body-large text-medium-gray">
          See how your data contributes value across campaigns using our Valence Enhanced Shapley methodology
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Valence Enhanced Shapley Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ValenceShapleyVisualization />
        </motion.div>

        {/* Attribution Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AttributionBreakdown />
        </motion.div>

        {/* Data Contribution Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DataContributionTimeline />
        </motion.div>
      </div>
    </div>
  );
}