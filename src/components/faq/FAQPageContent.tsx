"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export default function FAQPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqs: FAQ[] = [
    // Privacy & Security
    {
      question: "How does Precise protect user privacy?",
      answer: "Your raw data never leaves your infrastructure. We only work with aggregated, anonymized cohorts and create cryptographic proofs of their characteristics. This ensures complete privacy while still enabling valuable insights.",
      category: "Privacy & Security"
    },
    {
      question: "Is Precise GDPR and CCPA compliant?",
      answer: "Yes, Precise is fully compliant with GDPR, CCPA, and other major privacy regulations. Our privacy-preserving architecture ensures that personal data is never exposed or transferred, making compliance straightforward.",
      category: "Privacy & Security"
    },
    {
      question: "How secure is the Precise platform?",
      answer: "We maintain SOC 2 Type II certification, ISO 27001 compliance, and use bank-level encryption for all data transmissions. Our zero-knowledge architecture means we never have access to your raw data.",
      category: "Privacy & Security"
    },
    
    // Technical Integration
    {
      question: "What platforms does Precise integrate with?",
      answer: "We have native integrations with Snowflake, Databricks, BigQuery, AWS, Azure, and more. Our SDK works with any platform that can make API calls, ensuring broad compatibility with your existing tech stack.",
      category: "Technical Integration"
    },
    {
      question: "How long does integration take?",
      answer: "Basic integration can be completed in as little as 5 minutes using our SDK. Full production deployment typically takes 1-2 weeks, depending on your data complexity and compliance requirements.",
      category: "Technical Integration"
    },
    {
      question: "Do I need to change my existing data infrastructure?",
      answer: "No, Precise is designed to work with your existing infrastructure. We connect to your data where it lives without requiring any migration or architectural changes.",
      category: "Technical Integration"
    },
    
    // Data & Attribution
    {
      question: "How is attribution tracked?",
      answer: "We use cryptographic proofs to track how verified data flows through the advertising ecosystem, providing transparent attribution without exposing individual records. This creates an immutable audit trail of data usage.",
      category: "Data & Attribution"
    },
    {
      question: "What types of data can be verified?",
      answer: "Any structured data with proper consent can be verified, including behavioral, transactional, preference, and contextual data. Common examples include purchase history, app usage, content preferences, and demographic information.",
      category: "Data & Attribution"
    },
    {
      question: "How does the Shapley value attribution work?",
      answer: "Our Valence Enhanced Shapley algorithm fairly distributes value based on each data contributor's marginal contribution to campaign outcomes. This ensures everyone gets paid proportionally to the value they provide.",
      category: "Data & Attribution"
    },
    
    // Business & Pricing
    {
      question: "How does pricing work?",
      answer: "Precise uses performance-based pricing. Data owners earn revenue when their verified data drives measurable campaign outcomes. Media buyers pay only for data that delivers results. Contact us for detailed pricing information.",
      category: "Business & Pricing"
    },
    {
      question: "What's the minimum data volume required?",
      answer: "There's no minimum data volume requirement. However, larger, more diverse datasets typically command higher prices due to their increased utility for targeting and measurement.",
      category: "Business & Pricing"
    },
    {
      question: "How quickly can I start earning revenue?",
      answer: "Once integrated, your data becomes immediately available in our marketplace. Revenue generation depends on demand from media buyers, but most data owners see their first earnings within 30 days.",
      category: "Business & Pricing"
    },
    
    // For Media Buyers
    {
      question: "How does Precise improve campaign performance?",
      answer: "By providing access to verified, high-quality data with transparent attribution, Precise helps you target more effectively, measure true incrementality, and optimize campaigns based on real outcomes rather than proxies.",
      category: "For Media Buyers"
    },
    {
      question: "Can I use my existing DSP?",
      answer: "Yes, Precise integrates with all major DSPs including DV360, The Trade Desk, Amazon DSP, and others. Our verified audiences can be activated directly through your preferred platforms.",
      category: "For Media Buyers"
    },
    {
      question: "How does Precise compare to traditional data providers?",
      answer: "Unlike traditional providers, Precise offers cryptographically verified data with transparent sourcing, real-time quality scores, and outcome-based attribution. This means higher match rates, better performance, and clearer ROI.",
      category: "For Media Buyers"
    },
    
    // Getting Started
    {
      question: "How do I get started with Precise?",
      answer: "Simply click 'Get Started' and choose whether you're a data owner or media buyer. We'll guide you through the onboarding process, which includes a demo, technical integration planning, and access to our platform.",
      category: "Getting Started"
    },
    {
      question: "Is there a free trial or pilot program?",
      answer: "Yes, we offer pilot programs for qualified enterprises. This allows you to test our platform with your data and see real results before committing to a full deployment.",
      category: "Getting Started"
    },
    {
      question: "What support is available?",
      answer: "We provide comprehensive support including dedicated customer success managers, 24/7 technical support, extensive documentation, and regular training sessions to ensure your success with the platform.",
      category: "Getting Started"
    }
  ];

  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-padding bg-gradient-to-b from-white to-soft-white min-h-screen">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-display-large font-bold text-dark-gray mb-4">
            Common Questions
          </h1>
          <p className="text-body-large text-medium-gray max-w-3xl mx-auto">
            Find answers to frequently asked questions about Precise's privacy-preserving data collaboration platform
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-silk-gray rounded-xl focus:outline-none focus:border-brand-green transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-brand-green text-white"
                    : "bg-white text-medium-gray hover:bg-light-gray"
                }`}
              >
                {category === "all" ? "All Questions" : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-medium-gray">No questions found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-dark-gray mb-4">
              Still have questions?
            </h2>
            <p className="text-medium-gray mb-6">
              Our team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, category }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-dark-gray mb-1">{question}</h3>
          <span className="text-sm text-brand-green">{category}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-medium-gray transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="text-medium-gray leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}