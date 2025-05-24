"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CalculatorSection() {
  const [industry, setIndustry] = useState("");
  const [mau, setMau] = useState("");
  const [dataTypes, setDataTypes] = useState({
    behavioral: false,
    transaction: false,
    location: false,
    preference: false,
  });

  const hasData = industry && mau && Object.values(dataTypes).some(v => v);

  return (
    <section id="calculator" className="section-padding bg-soft-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display-medium font-bold text-dark-gray mb-4">
            Understand your data's potential
          </h2>
          <p className="text-body-large text-medium-gray">
            See how verified credentials could work for your organization
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    <option value="fitness">Fitness & Wellness</option>
                    <option value="retail">Retail & E-commerce</option>
                    <option value="finance">Financial Services</option>
                    <option value="media">Media & Entertainment</option>
                    <option value="travel">Travel & Hospitality</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Monthly Active Users
                  </label>
                  <input
                    type="number"
                    value={mau}
                    onChange={(e) => setMau(e.target.value)}
                    placeholder="500,000"
                    className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Data Types
                  </label>
                  <div className="space-y-3">
                    {Object.entries({
                      behavioral: "Behavioral data",
                      transaction: "Transaction data",
                      location: "Location data",
                      preference: "Preference data",
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={dataTypes[key as keyof typeof dataTypes]}
                          onChange={(e) => setDataTypes({
                            ...dataTypes,
                            [key]: e.target.checked,
                          })}
                          className="w-5 h-5 rounded border-silk-gray text-brand-green focus:ring-brand-green"
                        />
                        <span className="text-medium-gray">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <ResultCard
                  label="Verification readiness"
                  value={hasData ? "High" : "—"}
                  description={hasData ? "Your data profile is well-suited for verification" : "Complete the form to see results"}
                  highlight={hasData}
                />

                <ResultCard
                  label="Integration complexity"
                  value={hasData ? "Low" : "—"}
                  description={hasData ? "Estimated 2-3 hours with existing infrastructure" : "Complete the form to see results"}
                  highlight={hasData}
                />

                {hasData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-6"
                  >
                    <button className="btn-primary w-full justify-center">
                      Get detailed assessment
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  description: string;
  highlight?: boolean;
}

function ResultCard({ label, value, description, highlight }: ResultCardProps) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? "border-brand-green bg-brand-green/5" : "border-silk-gray bg-white"}`}>
      <p className="text-sm text-medium-gray mb-2">{label}</p>
      <p className={`text-2xl font-bold mb-2 ${highlight ? "text-brand-green" : "text-dark-gray"}`}>
        {value}
      </p>
      <p className="text-sm text-medium-gray">{description}</p>
    </div>
  );
}