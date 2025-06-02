"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Shield, BarChart3, Users } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const iconMap = {
  Zap: Zap,
  Shield: Shield,
  BarChart3: BarChart3,
  Users: Users,
};

export default function PricingPageWithCMS() {
  const content = useQuery(api.cms.getPricingContent);
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

  if (!content) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white">
        <div className="container max-w-4xl">
          <div className="animate-pulse">
            <div className="h-12 w-3/4 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto mb-12" />
          </div>
        </div>
      </div>
    );
  }

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
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-2xl mx-auto">
              {content.hero.description}
            </p>
          </motion.div>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {content.valueProps.map((prop, index) => {
              const Icon = iconMap[prop.icon as keyof typeof iconMap];
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {Icon && <Icon className="w-6 h-6 text-brand-green" />}
                  </div>
                  <h3 className="font-semibold text-dark-gray mb-1">{prop.title}</h3>
                  <p className="text-sm text-medium-gray">{prop.description}</p>
                </div>
              );
            })}
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
                {content.features.map((feature, index) => (
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
                <h3 className="font-semibold text-dark-gray mb-2">{content.roi.title}</h3>
                <p className="text-sm text-medium-gray mb-4">
                  {content.roi.description}
                </p>
                <div className="space-y-2">
                  {content.roi.metrics.map((metric, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm text-medium-gray">{metric.label}</span>
                      <span className="text-sm font-semibold text-brand-green">{metric.value}</span>
                    </div>
                  ))}
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
                {content.form.title}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-1">
                      {content.form.fields.name.label} *
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
                      {content.form.fields.email.label} *
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
                      {content.form.fields.company.label} *
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
                      {content.form.fields.role.label} *
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
                      {content.form.fields.role.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="dataVolume" className="block text-sm font-medium text-dark-gray mb-1">
                    {content.form.fields.dataVolume.label}
                  </label>
                  <select
                    id="dataVolume"
                    name="dataVolume"
                    value={formData.dataVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                  >
                    <option value="">Select volume</option>
                    {content.form.fields.dataVolume.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-gray mb-1">
                    {content.form.fields.message.label}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-silk-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                    placeholder={content.form.fields.message.placeholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {content.form.submitButton}
                  <ArrowRight size={20} />
                </button>

                <p className="text-xs text-medium-gray text-center">
                  {content.form.disclaimer}
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
            {content.trustedBy.title}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {content.trustedBy.companies.map((company, index) => (
              <span key={index} className="text-lg font-semibold text-medium-gray">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}