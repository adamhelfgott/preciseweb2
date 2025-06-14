"use client";

import { motion } from "framer-motion";
import { useSanityData } from "@/hooks/useSanityData";
import { dataOwnersTestimonialsQuery } from "@/sanity/lib/queries";
import Image from "next/image";

type TestimonialData = {
  headline: string;
  subheadline?: string;
  items: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    metric?: string;
    imageUrl?: string;
  }>;
};

export default function TestimonialsSectionWithCMS() {
  // Fetch testimonials data from Sanity
  const { data: testimonialsData } = useSanityData<TestimonialData>(dataOwnersTestimonialsQuery);

  // Fallback to hardcoded content
  const testimonials = testimonialsData || {
    headline: "Trusted by data leaders",
    subheadline: "See how forward-thinking companies are using Precise to unlock data value",
    items: [
      {
        quote: "Precise lets us participate in the advertising ecosystem without compromising our users' privacy. The integration was surprisingly simple.",
        author: "Sarah Chen",
        role: "VP Data",
        company: "Fitness Platform",
        metric: "250% increase in data revenue"
      },
      {
        quote: "We finally have visibility into how our data creates value downstream. The attribution is game-changing.",
        author: "Michael Rodriguez",
        role: "CTO",
        company: "Retail Analytics",
        metric: "3x better CPMs"
      }
    ]
  };

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            {testimonials.headline}
          </h2>
          {testimonials.subheadline && (
            <p className="text-body-large text-medium-gray">
              {testimonials.subheadline}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.items.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="card"
            >
              <div className="mb-6">
                <svg className="w-12 h-12 text-brand-green/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-lg text-dark-gray mb-6 italic">
                "{testimonial.quote}"
              </p>

              {testimonial.metric && (
                <div className="mb-6 p-4 bg-brand-green/5 rounded-lg">
                  <p className="text-brand-green font-semibold">{testimonial.metric}</p>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                {testimonial.imageUrl && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-light-gray">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-dark-gray">{testimonial.author}</p>
                  <p className="text-medium-gray">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}