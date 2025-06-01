"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DataSellersHero() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-green font-medium mb-4">For Data Sellers</p>
            
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              Monetize your data with{" "}
              <span className="text-gradient">performance-based pricing</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed max-w-3xl mx-auto">
              Whether you're a brand with valuable first-party data or a broker with 
              premium third-party segments, Precise helps you prove value and command 
              premium prices through verified performance attribution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary">
                Start monetizing
                <ArrowRight size={20} />
              </Link>
              <Link href="#paths" className="btn-secondary">
                Choose your path
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}