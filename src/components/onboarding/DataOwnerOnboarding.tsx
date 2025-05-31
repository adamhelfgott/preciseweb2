"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DataOwnerOnboardingProps {
  onBack: () => void;
}

export default function DataOwnerOnboarding({ onBack }: DataOwnerOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    industry: "",
    dataTypes: {
      behavioral: false,
      transaction: false,
      location: false,
      preference: false,
    },
    userSize: "",
    infrastructure: "",
    integration: "",
  });

  const updateForm = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const updateDataType = (type: string, checked: boolean) => {
    setFormData({
      ...formData,
      dataTypes: { ...formData.dataTypes, [type]: checked },
    });
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.company && formData.role && formData.industry;
      case 2:
        return Object.values(formData.dataTypes).some(v => v) && formData.userSize && formData.infrastructure;
      case 3:
        return formData.integration;
      default:
        return false;
    }
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soft-white">
      {/* Header */}
      <div className="border-b border-silk-gray bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="font-semibold text-xl text-dark-gray">Precise</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-light-gray rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-sm text-medium-gray">
                Step {step} of {totalSteps}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 max-w-3xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepOne
              formData={formData}
              updateForm={updateForm}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              updateForm={updateForm}
              updateDataType={updateDataType}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              updateForm={updateForm}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-silk-gray bg-white sticky bottom-0">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={step === 1 ? onBack : () => setStep(step - 1)}
              className="flex items-center gap-2 text-medium-gray hover:text-dark-gray transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            
            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid(step)}
                className={`btn-primary ${!isStepValid(step) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Continue
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                disabled={!isStepValid(step)}
                className={`btn-primary ${!isStepValid(step) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Create account
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepOne({ formData, updateForm }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-display-medium font-bold text-dark-gray mb-2">
          Tell us about your organization
        </h2>
        <p className="text-medium-gray">
          We'll use this to personalize your experience
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Company name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateForm("company", e.target.value)}
            placeholder="Acme Corp"
            className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Your role
          </label>
          <select
            value={formData.role}
            onChange={(e) => updateForm("role", e.target.value)}
            className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            <option value="">Select your role</option>
            <option value="data-leader">Data/Analytics Leader</option>
            <option value="eng-leader">Engineering Leader</option>
            <option value="product-leader">Product Leader</option>
            <option value="executive">Executive</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Industry
          </label>
          <select
            value={formData.industry}
            onChange={(e) => updateForm("industry", e.target.value)}
            className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            <option value="">Select your industry</option>
            <option value="fitness">Fitness & Wellness</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="finance">Financial Services</option>
            <option value="media">Media & Entertainment</option>
            <option value="travel">Travel & Hospitality</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

function StepTwo({ formData, updateForm, updateDataType }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-display-medium font-bold text-dark-gray mb-2">
          About your data
        </h2>
        <p className="text-medium-gray">
          Help us understand your data assets
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark-gray mb-3">
            What types of data do you collect?
          </label>
          <div className="space-y-3">
            {Object.entries({
              behavioral: "Behavioral/Usage data",
              transaction: "Transaction/Purchase data",
              location: "Location data",
              preference: "User preferences",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.dataTypes[key]}
                  onChange={(e) => updateDataType(key, e.target.checked)}
                  className="w-5 h-5 rounded border-silk-gray text-brand-green focus:ring-brand-green"
                />
                <span className="text-medium-gray">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-3">
            Approximate user base size
          </label>
          <div className="space-y-3">
            {[
              { value: "small", label: "Under 100K users" },
              { value: "medium", label: "100K - 1M users" },
              { value: "large", label: "1M - 10M users" },
              { value: "xlarge", label: "Over 10M users" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="userSize"
                  value={option.value}
                  checked={formData.userSize === option.value}
                  onChange={(e) => updateForm("userSize", e.target.value)}
                  className="w-5 h-5 border-silk-gray text-brand-green focus:ring-brand-green"
                />
                <span className="text-medium-gray">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Current data infrastructure
          </label>
          <select
            value={formData.infrastructure}
            onChange={(e) => updateForm("infrastructure", e.target.value)}
            className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            <option value="">Select your primary platform</option>
            <option value="snowflake">Snowflake</option>
            <option value="databricks">Databricks</option>
            <option value="bigquery">BigQuery</option>
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="other-cloud">Other cloud</option>
            <option value="on-premise">On-premise</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

function StepThree({ formData, updateForm }: any) {
  const integrationOptions = [
    {
      id: "sdk",
      title: "SDK Integration",
      description: "Add our SDK to your application. Best for real-time data and custom implementations.",
      time: "~30 minutes",
    },
    {
      id: "warehouse",
      title: "Data Warehouse",
      description: "Native functions for Snowflake, Databricks, and BigQuery. Best for batch processing.",
      time: "~1 hour",
    },
    {
      id: "api",
      title: "Direct API",
      description: "RESTful API for maximum flexibility. Best for existing data pipelines.",
      time: "~2 hours",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-display-medium font-bold text-dark-gray mb-2">
          Choose your integration path
        </h2>
        <p className="text-medium-gray">
          Select the approach that works best for your team
        </p>
      </div>

      <div className="space-y-4">
        {integrationOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => updateForm("integration", option.id)}
            className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
              formData.integration === option.id
                ? "border-brand-green bg-brand-green/5"
                : "border-silk-gray hover:border-medium-gray"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                {option.id === "sdk" && (
                  <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {option.id === "warehouse" && (
                  <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                )}
                {option.id === "api" && (
                  <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dark-gray mb-1">
                  {option.title}
                </h3>
                <p className="text-medium-gray text-sm mb-2">
                  {option.description}
                </p>
                <p className="text-brand-green text-sm font-medium">
                  {option.time}
                </p>
              </div>
              {formData.integration === option.id && (
                <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {formData.integration && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-light-gray rounded-xl"
        >
          <h4 className="font-semibold text-dark-gray mb-3">Next steps</h4>
          <ol className="list-decimal list-inside space-y-2 text-medium-gray">
            <li>Create your account</li>
            <li>Get API credentials</li>
            <li>Follow our {formData.integration} guide</li>
            <li>Create your first verified asset</li>
          </ol>
        </motion.div>
      )}
    </motion.div>
  );
}