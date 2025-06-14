"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface DataOwnerOnboardingProps {
  onBack: () => void;
}

export default function DataOwnerOnboarding({ onBack }: DataOwnerOnboardingProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createFormSubmission = useMutation(api.contacts.createFormSubmission);
  
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
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
        return formData.company && formData.name && formData.email && formData.role && formData.industry;
      case 2:
        return Object.values(formData.dataTypes).some(v => v) && formData.userSize && formData.infrastructure;
      case 3:
        return true; // Always valid for confirmation step
      default:
        return false;
    }
  };

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;
  
  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createFormSubmission({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        source: "data-owner-onboarding",
        formType: "data-owner",
        role: formData.role,
        industry: formData.industry,
        dataTypes: formData.dataTypes,
        userSize: formData.userSize,
        infrastructure: formData.infrastructure,
      });
      
      // Move to confirmation page
      setStep(3);
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could show an error toast here
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {step !== 3 && ( // Hide footer on confirmation page
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
                onClick={handleSubmit}
                disabled={!isStepValid(step) || isSubmitting}
                className={`btn-primary ${!isStepValid(step) || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
      )}
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
            Your name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateForm("name", e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Email address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
            placeholder="john@company.com"
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center text-center py-12"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mb-6"
      >
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      {/* Thank You Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 max-w-lg"
      >
        <h2 className="text-display-medium font-bold text-dark-gray">
          Thank you for your interest in Precise!
        </h2>
        <p className="text-lg text-medium-gray">
          Someone from our team will get in touch with you soon on how to get started with monetizing your data through our privacy-preserving infrastructure.
        </p>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-light-gray rounded-xl max-w-md"
      >
        <h4 className="font-semibold text-dark-gray mb-3">What happens next?</h4>
        <ul className="space-y-2 text-left text-medium-gray">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>We'll review your information within 24 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>A specialist will contact you to discuss your specific needs</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>We'll schedule a demo of our platform tailored to your use case</span>
          </li>
        </ul>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-sm text-medium-gray"
      >
        <p>Have questions? Email us at <a href="mailto:info@precise.ai" className="text-brand-green hover:underline">info@precise.ai</a></p>
      </motion.div>
    </motion.div>
  );
}