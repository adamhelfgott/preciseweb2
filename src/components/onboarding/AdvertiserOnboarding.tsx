"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy } from "lucide-react";
import Link from "next/link";

interface AdvertiserOnboardingProps {
  onBack: () => void;
}

export default function AdvertiserOnboarding({ onBack }: AdvertiserOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    objective: "",
    platforms: {
      madhive: false,
      ttd: false,
      amazon: false,
      dv360: false,
    },
    spend: "",
    challenges: {
      quality: false,
      attribution: false,
      compliance: false,
      performance: false,
    },
    selectedPlatform: "",
  });

  const updateForm = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const updatePlatform = (platform: string, checked: boolean) => {
    setFormData({
      ...formData,
      platforms: { ...formData.platforms, [platform]: checked },
    });
  };

  const updateChallenge = (challenge: string, checked: boolean) => {
    setFormData({
      ...formData,
      challenges: { ...formData.challenges, [challenge]: checked },
    });
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.company && formData.role && formData.objective;
      case 2:
        return Object.values(formData.platforms).some(v => v) && formData.spend;
      case 3:
        return formData.selectedPlatform;
      default:
        return false;
    }
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const generateAPIKey = () => {
    return "pk_live_" + Math.random().toString(36).substring(2, 15);
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
              updatePlatform={updatePlatform}
              updateChallenge={updateChallenge}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              updateForm={updateForm}
              generateAPIKey={generateAPIKey}
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
                Complete setup
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
          Welcome to Precise
        </h2>
        <p className="text-medium-gray">
          Let's get you set up with verified audiences
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
            placeholder="Your company"
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
            <option value="media-buyer">Media Buyer</option>
            <option value="marketing-manager">Marketing Manager</option>
            <option value="data-analyst">Data Analyst</option>
            <option value="agency">Agency</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-3">
            Primary advertising objective
          </label>
          <div className="space-y-3">
            {[
              { value: "acquisition", label: "Customer acquisition" },
              { value: "retention", label: "Customer retention" },
              { value: "awareness", label: "Brand awareness" },
              { value: "mixed", label: "Mixed objectives" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="objective"
                  value={option.value}
                  checked={formData.objective === option.value}
                  onChange={(e) => updateForm("objective", e.target.value)}
                  className="w-5 h-5 border-silk-gray text-brand-green focus:ring-brand-green"
                />
                <span className="text-medium-gray">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepTwo({ formData, updateForm, updatePlatform, updateChallenge }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-display-medium font-bold text-dark-gray mb-2">
          Your advertising setup
        </h2>
        <p className="text-medium-gray">
          Help us understand your current workflow
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark-gray mb-3">
            Which platforms do you use?
          </label>
          <div className="space-y-3">
            {Object.entries({
              madhive: "MadHive",
              ttd: "The Trade Desk",
              amazon: "Amazon DSP",
              dv360: "Google DV360",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.platforms[key]}
                  onChange={(e) => updatePlatform(key, e.target.checked)}
                  className="w-5 h-5 rounded border-silk-gray text-brand-green focus:ring-brand-green"
                />
                <span className="text-medium-gray">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-3">
            Monthly advertising spend
          </label>
          <div className="space-y-3">
            {[
              { value: "small", label: "Under $50K" },
              { value: "medium", label: "$50K - $500K" },
              { value: "large", label: "$500K - $5M" },
              { value: "xlarge", label: "Over $5M" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="spend"
                  value={option.value}
                  checked={formData.spend === option.value}
                  onChange={(e) => updateForm("spend", e.target.value)}
                  className="w-5 h-5 border-silk-gray text-brand-green focus:ring-brand-green"
                />
                <span className="text-medium-gray">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-3">
            Current data challenges
          </label>
          <div className="space-y-3">
            {Object.entries({
              quality: "Data quality concerns",
              attribution: "Attribution visibility",
              compliance: "Privacy compliance",
              performance: "Campaign performance",
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.challenges[key]}
                  onChange={(e) => updateChallenge(key, e.target.checked)}
                  className="w-5 h-5 rounded border-silk-gray text-brand-green focus:ring-brand-green"
                />
                <span className="text-medium-gray">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepThree({ formData, updateForm, generateAPIKey }: any) {
  const [apiKey] = useState(generateAPIKey());
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availablePlatforms = Object.entries(formData.platforms)
    .filter(([_, selected]) => selected)
    .map(([key, _]) => ({
      key,
      name: {
        madhive: "MadHive",
        ttd: "The Trade Desk",
        amazon: "Amazon DSP",
        dv360: "Google DV360",
      }[key],
    }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-display-medium font-bold text-dark-gray mb-2">
          Connect your first platform
        </h2>
        <p className="text-medium-gray">
          Select a platform to connect and start accessing verified audiences
        </p>
      </div>

      {availablePlatforms.length > 0 ? (
        <>
          <div className="space-y-4">
            {availablePlatforms.map((platform) => (
              <motion.button
                key={platform.key}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => updateForm("selectedPlatform", platform.key)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  formData.selectedPlatform === platform.key
                    ? "border-brand-green bg-brand-green/5"
                    : "border-silk-gray hover:border-medium-gray"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-dark-gray">
                      {platform.name}
                    </h3>
                    {platform.key === "madhive" && (
                      <p className="text-sm text-brand-green font-medium mt-1">
                        Recommended - Native integration
                      </p>
                    )}
                  </div>
                  {formData.selectedPlatform === platform.key && (
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

          {formData.selectedPlatform && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 bg-light-gray rounded-xl">
                <h4 className="font-semibold text-dark-gray mb-3">
                  Connect {availablePlatforms.find(p => p.key === formData.selectedPlatform)?.name}
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-medium-gray mb-6">
                  <li>Log into your {availablePlatforms.find(p => p.key === formData.selectedPlatform)?.name} account</li>
                  <li>Navigate to integrations settings</li>
                  <li>Add Precise as a data partner</li>
                  <li>Enter your Precise API key below</li>
                </ol>

                <div className="bg-white rounded-lg p-4 border border-silk-gray">
                  <label className="block text-sm font-medium text-dark-gray mb-2">
                    Your API Key
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-light-gray px-3 py-2 rounded font-mono text-sm">
                      {apiKey}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-light-gray rounded transition-colors"
                    >
                      {copied ? (
                        <span className="text-brand-green text-sm">Copied!</span>
                      ) : (
                        <Copy size={20} className="text-medium-gray" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-medium-gray">
          No platforms selected. Please go back and select at least one platform.
        </div>
      )}
    </motion.div>
  );
}