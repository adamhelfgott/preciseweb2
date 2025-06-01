"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { dataSellersHeroQuery } from "@/sanity/lib/queries";

type HeroData = {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
};

export default function DataSellersHeroWithCMS() {
  // Fetch hero data from Sanity
  const { data: heroData } = useSanityData<HeroData>(dataSellersHeroQuery);

  // Fallback to hardcoded content
  const hero = heroData || {
    headline: "Monetize your data with performance-based pricing",
    subheadline: "Whether you're a brand with valuable first-party data or a broker with premium third-party segments, Precise helps you prove value and command premium prices through verified performance attribution.",
    primaryButtonText: "Start monetizing",
    primaryButtonHref: "/get-started",
    secondaryButtonText: "Choose your path",
    secondaryButtonHref: "#paths",
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
            <p className="text-brand-green font-medium mb-4">For Data Sellers</p>
            
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
              <Link href={hero.secondaryButtonHref} className="btn-secondary">
                {hero.secondaryButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}