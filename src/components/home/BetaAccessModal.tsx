"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function BetaAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the modal
    const dismissed = localStorage.getItem("betaModalDismissed");
    if (dismissed) {
      setHasBeenDismissed(true);
      return;
    }

    // Show modal after 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenDismissed(true);
    localStorage.setItem("betaModalDismissed", "true");
  };

  if (hasBeenDismissed) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-[50%] -translate-y-1/2 max-w-lg mx-auto bg-white rounded-2xl shadow-2xl z-50 overflow-hidden md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            {/* Header */}
            <div className="bg-brand-green p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Join Our Exclusive Beta
                  </h3>
                  <p className="text-green-100">
                    Be among the first to transform your data strategy
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-green-100 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-gray">Early Access Benefits</h4>
                    <p className="text-sm text-medium-gray">Priority onboarding and dedicated support from our team</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-gray">Exclusive Pricing</h4>
                    <p className="text-sm text-medium-gray">Lock in preferred rates for beta participants</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-gray">Shape the Future</h4>
                    <p className="text-sm text-medium-gray">Direct input on product features and roadmap</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Link
                  href="/get-started"
                  className="flex-1 bg-brand-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Request Beta Access
                </Link>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 text-medium-gray hover:text-dark-gray transition-colors duration-200"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}