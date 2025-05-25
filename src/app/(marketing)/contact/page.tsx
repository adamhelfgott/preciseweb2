"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Calendar, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "media-buyer",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert("Thank you for your inquiry. We'll be in touch within 24 hours.");
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
              Let's Transform Your{" "}
              <span className="text-gradient">Advertising Performance</span>
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              Whether you're looking to optimize campaigns with AI or enable federated intelligence on your data, we're here to help.
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
                <h2 className="text-2xl font-bold text-dark-gray mb-6">Get in Touch</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      I'm interested in Precise as a...
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                    >
                      <option value="media-buyer">Media Buyer / Advertiser</option>
                      <option value="data-controller">Data Controller / Publisher</option>
                      <option value="partner">Technology Partner</option>
                      <option value="investor">Investor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      How can we help? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-green text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send size={20} />
                  </button>
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
                <h3 className="text-xl font-bold text-dark-gray mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <a href="mailto:hello@precise.ai" className="flex items-center gap-4 text-medium-gray hover:text-dark-gray transition-colors">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <div className="text-sm">Email us</div>
                      <div className="font-medium">hello@precise.ai</div>
                    </div>
                  </a>

                  <a href="#" className="flex items-center gap-4 text-medium-gray hover:text-dark-gray transition-colors">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div>
                      <div className="text-sm">Live chat</div>
                      <div className="font-medium">Available 9AM-6PM PST</div>
                    </div>
                  </a>

                  <a href="#" className="flex items-center gap-4 text-medium-gray hover:text-dark-gray transition-colors">
                    <div className="w-12 h-12 bg-bright-purple/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-bright-purple" />
                    </div>
                    <div>
                      <div className="text-sm">Schedule a demo</div>
                      <div className="font-medium">30-minute walkthrough</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-dark-gray mb-6">Visit Us</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warm-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-warm-coral" />
                  </div>
                  <div>
                    <div className="font-medium text-dark-gray mb-1">San Francisco Office</div>
                    <div className="text-medium-gray">
                      548 Market Street<br />
                      Suite 28562<br />
                      San Francisco, CA 94104
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-brand-green/10 to-electric-blue/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-dark-gray mb-4">Fast Response Guaranteed</h3>
                <p className="text-medium-gray mb-6">
                  Our team typically responds within 24 hours during business days. For urgent inquiries, please mention it in your message.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-brand-green">&lt; 2 hrs</div>
                    <div className="text-sm text-medium-gray">Demo requests</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-electric-blue">&lt; 24 hrs</div>
                    <div className="text-sm text-medium-gray">General inquiries</div>
                  </div>
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
              Looking for quick answers?
            </h2>
            <p className="text-medium-gray mb-6">
              Check out our comprehensive documentation and frequently asked questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/developers"
                className="inline-flex items-center justify-center px-6 py-3 bg-dark-gray text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                View Documentation
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-dark-gray text-dark-gray font-semibold rounded-lg hover:bg-light-gray transition-colors"
              >
                How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}