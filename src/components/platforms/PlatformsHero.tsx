"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PlatformsHero() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-golden-amber font-medium mb-4">For Platforms</p>
            
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              Differentiate with{" "}
              <span className="text-gradient">verified data collaboration</span>
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed max-w-3xl mx-auto">
              Give your advertisers access to premium verified audiences and 
              transparent attribution. Stand out from competitors with 
              privacy-preserving data collaboration built right in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Talk to partnerships
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}