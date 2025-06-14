"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { platformsHeroQuery } from "@/sanity/lib/queries";

type HeroData = {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonHref: string;
};

export default function PlatformsHeroWithCMS() {
  // Fetch hero data from Sanity
  const { data: heroData } = useSanityData<HeroData>(platformsHeroQuery);

  // Fallback to hardcoded content
  const hero = heroData || {
    headline: "Differentiate with verified data collaboration",
    subheadline: "Give your advertisers access to premium verified audiences and transparent attribution. Stand out from competitors with privacy-preserving data collaboration built right in.",
    primaryButtonText: "View integration docs",
    primaryButtonHref: "/developers",
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
            <p className="text-golden-amber font-medium mb-4">For Platforms</p>
            
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