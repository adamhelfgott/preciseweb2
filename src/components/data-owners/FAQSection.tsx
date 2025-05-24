"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How does Precise protect user privacy?",
      answer: "Your raw data never leaves your infrastructure. We only work with aggregated, anonymized cohorts and create cryptographic proofs of their characteristics.",
    },
    {
      question: "What platforms does Precise integrate with?",
      answer: "We have native integrations with Snowflake, Databricks, BigQuery, AWS, and more. Our SDK works with any platform that can make API calls.",
    },
    {
      question: "How is attribution tracked?",
      answer: "We use cryptographic proofs to track how verified data flows through the advertising ecosystem, providing transparent attribution without exposing individual records.",
    },
    {
      question: "What types of data can be verified?",
      answer: "Any structured data with proper consent can be verified, including behavioral, transactional, preference, and contextual data.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray">
            Common questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-dark-gray pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-medium-gray transition-transform ${
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
            <p className="pt-4 text-medium-gray">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}