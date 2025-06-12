"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSanityData } from "@/hooks/useSanityData";
import { caseStudiesQuery, caseStudiesHeroQuery } from "@/sanity/lib/queries";
import { urlFor as urlForImage } from "@/sanity/lib/image";

interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

interface CaseStudyTestimonial {
  quote: string;
  author: string;
  title: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial?: CaseStudyTestimonial;
  image?: any;
}

interface HeroData {
  headline: string;
  subheadline: string;
  ctaSection: {
    headline: string;
    subheadline: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton: {
      text: string;
      href: string;
    };
  };
}

export default function CaseStudiesPageWithCMS() {
  // Fetch case studies from Sanity
  const { data: caseStudies } = useSanityData<CaseStudy[]>(caseStudiesQuery);
  
  // Fetch hero section data from Sanity
  const { data: heroData } = useSanityData<HeroData>(caseStudiesHeroQuery);

  // Fallback data
  const fallbackCaseStudies: CaseStudy[] = [
    {
      _id: "mlb-team",
      title: "How a Major League Baseball Team Drove 312% ROI",
      slug: { current: "mlb-team" },
      client: "Major League Baseball Team",
      industry: "Sports & Entertainment",
      challenge: "Traditional sports marketing relied on broadcast and email, with only 15-20% match rates when uploading CRM data to platforms.",
      solution: "Implemented Precise's verified credential system to achieve 89% match rates and multi-touch attribution across digital channels.",
      results: [
        {
          metric: "ROI",
          value: "312%",
          description: "Return on investment for ticket sales campaigns"
        },
        {
          metric: "New Season Tickets",
          value: "+47%",
          description: "Increase in new season ticket holders"
        },
        {
          metric: "Match Rate",
          value: "89%",
          description: "Up from 18% before using verified credentials"
        }
      ],
      testimonial: {
        quote: "Precise didn't just improve our match rates—they fundamentally changed how we think about fan data. For the first time, we can see exactly which digital touchpoints drive ticket sales.",
        author: "VP of Marketing",
        title: "Major League Baseball Team"
      },
    },
    {
      _id: "global-retailer",
      title: "Privacy-First Customer Intelligence",
      slug: { current: "global-retailer" },
      client: "Fortune 500 Retailer",
      industry: "Retail",
      challenge: "A major retailer needed to share customer insights with brand partners without risking data breaches or privacy violations.",
      solution: "Deployed Precise's secure data collaboration platform, enabling brands to access aggregated insights and run targeted campaigns without accessing raw customer data.",
      results: [
        {
          metric: "Brand Partnerships",
          value: "+125%",
          description: "Increase in data collaboration partnerships"
        },
        {
          metric: "Campaign Performance",
          value: "+68%",
          description: "Improvement in targeted campaign effectiveness"
        },
        {
          metric: "Data Security",
          value: "Zero",
          description: "Data breaches or privacy incidents"
        }
      ],
    },
    {
      _id: "streaming-platform",
      title: "Maximizing Content ROI with Viewer Data",
      slug: { current: "streaming-platform" },
      client: "Leading Streaming Service",
      industry: "Media & Entertainment",
      challenge: "A streaming platform wanted to help advertisers reach specific audience segments without compromising viewer privacy.",
      solution: "Integrated Precise's API to create privacy-safe audience segments based on viewing behavior, enabling programmatic advertising without exposing user data.",
      results: [
        {
          metric: "Ad Revenue",
          value: "+82%",
          description: "Growth in advertising revenue"
        },
        {
          metric: "CPM Rates",
          value: "+45%",
          description: "Increase in average CPM for targeted segments"
        },
        {
          metric: "User Trust",
          value: "96%",
          description: "User satisfaction with privacy practices"
        }
      ],
    }
  ];

  const fallbackHero: HeroData = {
    headline: "Verified Activation in Action",
    subheadline: "See how leading brands drive exceptional performance with verified data activation — where trust meets results",
    ctaSection: {
      headline: "Ready for Verified Activation?",
      subheadline: "Join leading brands driving exceptional performance with verified data",
      primaryButton: {
        text: "Request a Demo",
        href: "/get-started"
      },
      secondaryButton: {
        text: "Contact Sales",
        href: "/contact"
      }
    }
  };

  const displayCaseStudies = caseStudies || fallbackCaseStudies;
  const displayHero = heroData || fallbackHero;

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-soft-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-dark-gray mb-6">
              {displayHero.headline}
            </h1>
            <p className="text-xl text-medium-gray">
              {displayHero.subheadline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-24">
            {displayCaseStudies.map((study, index) => (
              <motion.div
                key={study._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 text-brand-green font-medium mb-4">
                    <span>{study.industry}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
                    {study.title}
                  </h2>
                  
                  <p className="text-lg text-medium-gray mb-6">
                    <span className="font-semibold">{study.client}</span> • {study.challenge}
                  </p>
                  
                  <p className="text-medium-gray mb-8">
                    {study.solution}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    {study.results.map((result) => (
                      <div key={result.metric} className="text-center sm:text-left">
                        <div className="text-3xl font-bold text-brand-green mb-1">
                          {result.value}
                        </div>
                        <div className="text-sm font-medium text-dark-gray mb-1">
                          {result.metric}
                        </div>
                        <div className="text-xs text-medium-gray">
                          {result.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  {study.testimonial && (
                    <div className="bg-light-gray rounded-lg p-6">
                      <p className="text-medium-gray italic mb-4">
                        "{study.testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-dark-gray">
                          {study.testimonial.author}
                        </p>
                        <p className="text-sm text-medium-gray">
                          {study.testimonial.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-video bg-light-gray rounded-xl overflow-hidden">
                    {study.image ? (
                      <Image
                        src={urlForImage(study.image)?.url() || ''}
                        alt={`${study.client} case study`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-medium-gray">
                          {study.client}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-green">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              {displayHero.ctaSection.headline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-green-100 mb-8"
            >
              {displayHero.ctaSection.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href={displayHero.ctaSection.primaryButton.href}
                className="bg-white text-brand-green font-semibold px-8 py-4 rounded-lg hover:bg-soft-white transition-colors duration-200"
              >
                {displayHero.ctaSection.primaryButton.text}
              </Link>
              <Link
                href={displayHero.ctaSection.secondaryButton.href}
                className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-brand-green transition-all duration-200"
              >
                {displayHero.ctaSection.secondaryButton.text}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}