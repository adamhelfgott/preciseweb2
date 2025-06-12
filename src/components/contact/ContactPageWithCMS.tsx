"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Calendar, MapPin, Send } from "lucide-react";

const iconMap = {
  Mail: Mail,
  MessageSquare: MessageSquare,
  Calendar: Calendar,
  MapPin: MapPin,
  Send: Send,
};

// Hardcoded content for contact page
const DEFAULT_CONTENT = {
  hero: {
    title: "Let's Start a Conversation",
    titleHighlight: "",
    subtitle: "Whether you're a data owner looking to monetize your assets or an advertiser seeking better attribution, we're here to help."
  },
  contactMethods: [
    {
      icon: "Mail",
      title: "Email Us",
      description: "Get in touch with our team",
      action: "hello@precise.ai",
      link: "mailto:hello@precise.ai"
    },
    {
      icon: "Calendar",
      title: "Schedule a Demo",
      description: "See Precise in action",
      action: "Book a 30-min call",
      link: "https://calendly.com/precise-demo"
    },
    {
      icon: "MessageSquare",
      title: "Live Chat",
      description: "Chat with our team",
      action: "Start conversation",
      link: "#"
    }
  ],
  form: {
    title: "Send us a message",
    subtitle: "We'll get back to you within 24 hours",
    submitButton: "Send Message",
    fields: {
      name: { label: "Name", placeholder: "John Doe", required: true },
      email: { label: "Email", placeholder: "john@company.com", required: true },
      company: { label: "Company", placeholder: "Acme Inc.", required: true },
      role: {
        label: "I am a...",
        required: true,
        options: [
          { value: "media-buyer", label: "Media Buyer / Advertiser" },
          { value: "data-owner", label: "Data Owner / Publisher" },
          { value: "platform", label: "Platform / Technology Partner" },
          { value: "other", label: "Other" }
        ]
      },
      message: { label: "Message", placeholder: "Tell us about your needs...", required: false }
    }
  },
  locations: [
    {
      city: "New York",
      address: "123 Broadway, Suite 100",
      country: "USA"
    },
    {
      city: "San Francisco",
      address: "456 Market St, Floor 20",
      country: "USA"
    }
  ],
  quickContact: {
    title: "Quick Contact",
    items: [
      {
        icon: "Mail",
        label: "Email us at",
        value: "hello@precise.ai",
        link: "mailto:hello@precise.ai"
      },
      {
        icon: "MessageSquare",
        label: "Live chat",
        value: "Available 9am-6pm EST",
        link: "#"
      }
    ]
  },
  office: {
    title: "Main Office",
    location: {
      name: "New York Headquarters",
      address: [
        "123 Broadway, Suite 100",
        "New York, NY 10004",
        "United States"
      ]
    }
  },
  responseTime: {
    title: "Fast Response Times",
    description: "We're committed to getting back to you quickly with the information you need.",
    metrics: [
      { time: "< 1 hour", label: "Initial response" },
      { time: "< 24 hours", label: "Full follow-up" }
    ]
  },
  faqCta: {
    title: "Have more questions?",
    description: "Check out our comprehensive FAQ section for instant answers.",
    primaryButton: { text: "View FAQ", href: "/faq" },
    secondaryButton: { text: "Schedule a call", href: "https://calendly.com/precise-demo" }
  }
};

export default function ContactPageWithCMS() {
  const content = DEFAULT_CONTENT;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "media-buyer",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "media-buyer",
          message: "",
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white">
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray mb-6">
              {content.hero.title}{" "}
              {content.hero.titleHighlight && (
                <span className="text-gradient">{content.hero.titleHighlight}</span>
              )}
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              {content.hero.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-dark-gray mb-6">{content.form.title}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        {content.form.fields.name.label} {content.form.fields.name.required && "*"}
                      </label>
                      <input
                        type="text"
                        required={content.form.fields.name.required}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                        placeholder={content.form.fields.name.placeholder}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        {content.form.fields.email.label} {content.form.fields.email.required && "*"}
                      </label>
                      <input
                        type="email"
                        required={content.form.fields.email.required}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                        placeholder={content.form.fields.email.placeholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      {content.form.fields.company.label} {content.form.fields.company.required && "*"}
                    </label>
                    <input
                      type="text"
                      required={content.form.fields.company.required}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      placeholder={content.form.fields.company.placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      {content.form.fields.role.label}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                    >
                      {content.form.fields.role.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      {content.form.fields.message.label} {content.form.fields.message.required && "*"}
                    </label>
                    <textarea
                      required={content.form.fields.message.required}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all resize-none"
                      placeholder={content.form.fields.message.placeholder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-green text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        {content.form.submitButton}
                        <Send size={20} />
                      </>
                    )}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      Thank you for your inquiry! We'll be in touch within 24 hours.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      Something went wrong. Please try again or email us directly at hello@precise.ai
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-dark-gray mb-6">{content.quickContact.title}</h3>
                
                <div className="space-y-4">
                  {content.quickContact.items.map((item, index) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    return (
                      <a
                        key={index}
                        href={item.link}
                        className="flex items-center gap-4 text-medium-gray hover:text-dark-gray transition-colors"
                      >
                        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                          {Icon && <Icon className="w-6 h-6 text-brand-green" />}
                        </div>
                        <div>
                          <div className="text-sm">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-dark-gray mb-6">{content.office.title}</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warm-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-warm-coral" />
                  </div>
                  <div>
                    <div className="font-medium text-dark-gray mb-1">{content.office.location.name}</div>
                    <div className="text-medium-gray">
                      {content.office.location.address.map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-brand-green/10 to-electric-blue/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-dark-gray mb-4">{content.responseTime.title}</h3>
                <p className="text-medium-gray mb-6">
                  {content.responseTime.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {content.responseTime.metrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-brand-green">{metric.time}</div>
                      <div className="text-sm text-medium-gray">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-dark-gray mb-4">
              {content.faqCta.title}
            </h2>
            <p className="text-medium-gray mb-6">
              {content.faqCta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={content.faqCta.primaryButton.href}
                className="inline-flex items-center justify-center px-6 py-3 bg-dark-gray text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                {content.faqCta.primaryButton.text}
              </a>
              <a
                href={content.faqCta.secondaryButton.href}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-dark-gray text-dark-gray font-semibold rounded-lg hover:bg-light-gray transition-colors"
              >
                {content.faqCta.secondaryButton.text}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}