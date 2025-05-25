"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  image?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "chicago-cubs",
    title: "Transforming Fan Data into Revenue",
    client: "Chicago Cubs",
    industry: "Sports & Entertainment",
    challenge: "The Chicago Cubs wanted to monetize their valuable fan data while maintaining strict privacy standards and fan trust.",
    solution: "Implemented Precise's privacy-preserving infrastructure to create verified fan segments for advertisers, enabling targeted campaigns without exposing individual fan data.",
    results: [
      {
        metric: "Revenue Increase",
        value: "+47%",
        description: "New data revenue stream from verified fan segments"
      },
      {
        metric: "Privacy Compliance",
        value: "100%",
        description: "Full CCPA and GDPR compliance maintained"
      },
      {
        metric: "Advertiser ROI",
        value: "3.2x",
        description: "Average return on investment for campaigns using verified data"
      }
    ],
    testimonial: {
      quote: "Precise allowed us to unlock the value of our fan data while maintaining the highest privacy standards. It's a game-changer for sports franchises.",
      author: "Colin Faulkner",
      title: "VP of Sales & Marketing, Chicago Cubs"
    },
    // image: "/case-studies/chicago-cubs.jpg"
  },
  {
    id: "global-retailer",
    title: "Privacy-First Customer Intelligence",
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
    // image: "/case-studies/retail.jpg"
  },
  {
    id: "streaming-platform",
    title: "Maximizing Content ROI with Viewer Data",
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
    // image: "/case-studies/streaming.jpg"
  }
];

export default function CaseStudiesPage() {
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
              Real Results, Real Revenue
            </h1>
            <p className="text-xl text-medium-gray">
              See how leading brands are transforming their data into new revenue streams while maintaining the highest privacy standards
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
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
                        src={study.image}
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
              Ready to Transform Your Data Strategy?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-green-100 mb-8"
            >
              Join leading brands already maximizing their data value with Precise
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/get-started"
                className="bg-white text-brand-green font-semibold px-8 py-4 rounded-lg hover:bg-soft-white transition-colors duration-200"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-brand-green transition-all duration-200"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}