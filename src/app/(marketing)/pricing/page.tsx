"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Shield, BarChart3, Users } from "lucide-react";

export default function PricingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    dataVolume: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! We'll be in touch within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray mb-6">
              Enterprise Pricing Built for Scale
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-2xl mx-auto">
              Custom pricing based on your data volume and usage. Get started with a personalized demo and pricing proposal.
            </p>
          </motion.div>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">Volume Discounts</h3>
              <p className="text-sm text-medium-gray">Scale pricing with your growth</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">SOC2 Compliant</h3>
              <p className="text-sm text-medium-gray">Enterprise security standards</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-bright-purple/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-bright-purple" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">Transparent ROI</h3>
              <p className="text-sm text-medium-gray">Track value at every step</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-warm-coral/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-warm-coral" />
              </div>
              <h3 className="font-semibold text-dark-gray mb-1">Dedicated Support</h3>
              <p className="text-sm text-medium-gray">White-glove onboarding</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-dark-gray mb-6">
                What's Included
              </h2>
              <div className="space-y-4">
                {[
                  "Custom data ingestion pipelines",
                  "Unlimited verified credentials",
                  "Real-time attribution analytics",
                  "API access with 99.9% uptime SLA",
                  "Dedicated customer success manager",
                  "Quarterly business reviews",
                  "Priority feature requests",
                  "24/7 technical support",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-medium-gray">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-light-gray rounded-xl">
                <h3 className="font-semibold text-dark-gray mb-2">Typical ROI</h3>
                <p className="text-sm text-medium-gray mb-4">
                  Our enterprise customers typically see:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-medium-gray">CAC Reduction</span>
                    <span className="text-sm font-semibold text-brand-green">30-45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medium-gray">ROAS Improvement</span>
                    <span className="text-sm font-semibold text-brand-green">2.5-4x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medium-gray">Time to Value</span>
                    <span className="text-sm font-semibold text-brand-green">&lt; 30 days</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-silk-gray p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-dark-gray mb-6">
                Get Your Custom Pricing
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-gray mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-dark-gray mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-dark-gray mb-1">
                      I am a... *
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      <option value="">Select role</option>
                      <option value="data-owner">Data Controller</option>
                      <option value="media-buyer">Media Buyer / Advertiser</option>
                      <option value="agency">Agency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="dataVolume" className="block text-sm font-medium text-dark-gray mb-1">
                    Monthly Data Volume
                  </label>
                  <select
                    id="dataVolume"
                    name="dataVolume"
                    value={formData.dataVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  >
                    <option value="">Select volume</option>
                    <option value="< 10M">Less than 10M events</option>
                    <option value="10M-100M">10M - 100M events</option>
                    <option value="100M-1B">100M - 1B events</option>
                    <option value="> 1B">More than 1B events</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-gray mb-1">
                    Tell us about your use case
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                    placeholder="What are your goals with Precise? What challenges are you facing?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Get Custom Pricing
                  <ArrowRight size={20} />
                </button>

                <p className="text-xs text-medium-gray text-center">
                  By submitting this form, you agree to our privacy policy.
                  We'll respond within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-soft-white">
        <div className="container">
          <p className="text-center text-medium-gray mb-8">
            Trusted by leading brands and data owners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <span className="text-lg font-semibold text-medium-gray">Chicago Cubs</span>
            <span className="text-lg font-semibold text-medium-gray">Fortune 500 Retailer</span>
            <span className="text-lg font-semibold text-medium-gray">Leading Streaming Service</span>
            <span className="text-lg font-semibold text-medium-gray">Global CPG Brand</span>
          </div>
        </div>
      </section>
    </div>
  );
}