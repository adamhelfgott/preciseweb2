"use client";

import { useState } from "react";
import DataOwnerOnboarding from "@/components/onboarding/DataOwnerOnboarding";
import AdvertiserOnboarding from "@/components/onboarding/AdvertiserOnboarding";
import { motion } from "framer-motion";

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
            className="card text-left hover:border-brand-green transition-colors group"
          >
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
            className="card text-left hover:border-brand-green transition-colors group"
          >
            <h2 className="text-heading-large font-semibold text-dark-gray mb-4">
              I need verified audiences
            </h2>
            <p className="text-medium-gray mb-4">
              Access high-quality data with transparent attribution for campaigns
            </p>
            <span className="text-brand-green font-medium group-hover:text-dark-gray transition-colors">
              Get started as advertiser →
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}