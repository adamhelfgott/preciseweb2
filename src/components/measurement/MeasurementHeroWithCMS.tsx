"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { measurementHeroQuery } from "@/sanity/lib/queries";

type HeroData = {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonHref: string;
};

export default function MeasurementHeroWithCMS() {
  // Fetch hero data from Sanity
  const { data: heroData } = useSanityData<HeroData>(measurementHeroQuery);

  // Fallback to hardcoded content
  const hero = heroData || {
    headline: "Complete the attribution puzzle with verified data signals",
    subheadline: "Enhance your MMM, MTA, or incrementality solutions with deterministic data signals. Help clients prove true campaign impact through privacy-preserving collaboration.",
    primaryButtonText: "Integrate Precise",
    primaryButtonHref: "/get-started",
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-soft-lavender font-medium mb-4">For Measurement Partners</p>
            
            <h1 className="text-display-hero font-bold text-dark-gray mb-6">
              {hero.headline.includes('with') ? (
                <>
                  {hero.headline.split('with')[0]}with{" "}
                  <span className="text-gradient">{hero.headline.split('with')[1]}</span>
                </>
              ) : (
                <span className="text-gradient">{hero.headline}</span>
              )}
            </h1>
            
            <p className="text-body-large text-medium-gray mb-8 leading-relaxed max-w-3xl mx-auto">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={hero.primaryButtonHref} className="btn-primary">
                {hero.primaryButtonText}
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Partner logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-16 border-t border-silk-gray"
          >
            <p className="text-sm text-medium-gray mb-8">
              Trusted by leading measurement providers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              <div className="text-lg font-semibold text-medium-gray">InMarket</div>
              <div className="text-lg font-semibold text-medium-gray">Upwave</div>
              <div className="text-lg font-semibold text-medium-gray">Neustar</div>
              <div className="text-lg font-semibold text-medium-gray">Nielsen</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}