"use client";

import { useState } from "react";
import DataOwnerOnboarding from "@/components/onboarding/DataOwnerOnboarding";
import AdvertiserOnboarding from "@/components/onboarding/AdvertiserOnboarding";
import { motion } from "framer-motion";
import { Database, Target } from "lucide-react";

export default function GetStartedPage() {
  const [userType, setUserType] = useState<"data-owner" | "advertiser" | null>(null);

  if (userType === "data-owner") {
    return <DataOwnerOnboarding onBack={() => setUserType(null)} />;
  }

  if (userType === "advertiser") {
    return <AdvertiserOnboarding onBack={() => setUserType(null)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-soft-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-display-large font-bold text-dark-gray mb-4">
            Welcome to Precise
          </h1>
          <p className="text-body-large text-medium-gray">
            Choose your path to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType("data-owner")}
            className="relative card text-left hover:border-brand-green transition-all group overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-brand-green to-brand-green/70 rounded-xl p-3 mb-6">
              <Database className="w-full h-full text-white" />
            </div>
            
            <h2 className="text-heading-large font-semibold text-dark-gray mb-4">
              I have data to monetize
            </h2>
            <p className="text-medium-gray mb-4">
              Turn your data into verified credentials and earn automatic royalties
            </p>
            <span className="text-brand-green font-medium group-hover:text-dark-gray transition-colors">
              Get started as data controller →
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType("advertiser")}
            className="relative card text-left hover:border-electric-blue transition-all group overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-electric-blue to-electric-blue/70 rounded-xl p-3 mb-6">
              <Target className="w-full h-full text-white" />
            </div>
            
            <h2 className="text-heading-large font-semibold text-dark-gray mb-4">
              I need verified audiences
            </h2>
            <p className="text-medium-gray mb-4">
              Access high-quality data with transparent attribution for campaigns
            </p>
            <span className="text-electric-blue font-medium group-hover:text-dark-gray transition-colors">
              Get started as advertiser →
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}