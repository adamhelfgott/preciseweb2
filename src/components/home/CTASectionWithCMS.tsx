"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSanityData } from "@/hooks/useSanityData";
import { ctaSectionQuery } from "@/sanity/lib/queries";

type CTAData = {
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonHref: string;
};

export default function CTASectionWithCMS() {
  // Fetch CTA data from Sanity
  const { data: ctaData } = useSanityData<CTAData>(ctaSectionQuery);

  // Fallback to hardcoded content
  const data = ctaData || {
    headline: "Start earning from your data today",
    subheadline: "Be among the first to unlock the value of privacy-preserving data collaboration",
    buttonText: "Start Free (1M events/mo)",
    buttonHref: "/get-started",
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-brand-green/10 to-bright-purple/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-6">
            {data.headline}
          </h2>
          
          <p className="text-body-large text-medium-gray mb-8">
            {data.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href={data.buttonHref} className="btn-primary text-lg px-10 py-5">
              {data.buttonText}
              <ArrowRight size={20} />
            </Link>
            <Link href="/pricing" className="btn-secondary text-lg px-10 py-5">
              See pricing
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-medium-gray">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              5-minute setup
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}