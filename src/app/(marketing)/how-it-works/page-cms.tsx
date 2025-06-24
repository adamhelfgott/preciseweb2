"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Shield, 
  Zap, 
  TrendingUp, 
  Lock, 
  ArrowRight,
  Check,
  Users,
  BarChart3,
  DollarSign,
  Target,
  Layers,
  Brain,
  Cpu,
  LineChart,
  AlertTriangle,
  RefreshCcw,
  Sparkles,
  X
} from "lucide-react";
import { client } from "@/lib/sanity";
import * as Icons from "lucide-react";
import HowItWorksVisualExample from "@/components/marketing/HowItWorksVisualExamples";

// Icon map to convert string icon names to components
const iconMap: { [key: string]: any } = {
  Database,
  Shield,
  Zap,
  TrendingUp,
  Lock,
  ArrowRight,
  Check,
  Users,
  BarChart3,
  DollarSign,
  Target,
  Layers,
  Brain,
  Cpu,
  LineChart,
  AlertTriangle,
  RefreshCcw,
  Sparkles,
};

// Get icon component from string name
const getIcon = (iconName: string) => {
  return iconMap[iconName] || Icons[iconName as keyof typeof Icons] || Target;
};

// Get color classes based on color name
const getColorClasses = (colorName: string) => {
  const colorMap: { [key: string]: { bg: string; text: string } } = {
    'brand-green': { bg: 'bg-brand-green/10', text: 'text-brand-green' },
    'electric-blue': { bg: 'bg-electric-blue/10', text: 'text-electric-blue' },
    'bright-purple': { bg: 'bg-bright-purple/10', text: 'text-bright-purple' },
    'warm-coral': { bg: 'bg-warm-coral/10', text: 'text-warm-coral' },
    'golden-amber': { bg: 'bg-golden-amber/10', text: 'text-golden-amber' },
  };
  
  return colorMap[colorName] || { bg: 'bg-gray-100', text: 'text-gray-600' };
};

interface HowItWorksContent {
  heroTitle: string;
  heroSubtitle: string;
  mediaBuyerTabLabel: string;
  dataControllerTabLabel: string;
  mediaBuyerSection: {
    benefitsTitle: string;
    benefits: Array<{
      iconName: string;
      iconColor: string;
      title: string;
      description: string;
    }>;
    processTitle: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      description: string;
      bulletPoints: Array<{
        iconName: string;
        text: string;
      }>;
      visualExample?: {
        type: string;
        content: string;
      };
    }>;
    resultsTitle: string;
    results: Array<{
      metric: string;
      metricColor: string;
      label: string;
      sublabel: string;
    }>;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    ctaButtonLink: string;
  };
  dataControllerSection: {
    benefitsTitle: string;
    benefits: Array<{
      iconName: string;
      iconColor: string;
      title: string;
      description: string;
    }>;
    processTitle: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      description: string;
      bulletPoints: Array<{
        iconName: string;
        text: string;
      }>;
      visualExample?: {
        type: string;
        content: string;
      };
    }>;
    trustTitle: string;
    comparisonCards: Array<{
      title: string;
      isHighlighted: boolean;
      items: Array<{
        isPositive: boolean;
        text: string;
      }>;
    }>;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    ctaButtonLink: string;
  };
}

// Default content (fallback if CMS is not configured)
const defaultContent: HowItWorksContent = {
  heroTitle: "AI-Powered Intelligence Infrastructure",
  heroSubtitle: "Precise combines federated learning, predictive analytics, and privacy-preserving computation to revolutionize how brands collaborate with data",
  mediaBuyerTabLabel: "For Media Buyers",
  dataControllerTabLabel: "For Data Controllers",
  mediaBuyerSection: {
    benefitsTitle: "AI-Powered Campaign Optimization at Scale",
    benefits: [
      {
        iconName: "Brain",
        iconColor: "brand-green",
        title: "Predictive CAC Forecasting",
        description: "AI predicts customer acquisition costs 4 weeks out with 92% accuracy"
      },
      {
        iconName: "Layers",
        iconColor: "electric-blue",
        title: "Multi-DSP Arbitrage",
        description: "Automatically shift budgets between DSPs for 2.3x better performance"
      },
      {
        iconName: "AlertTriangle",
        iconColor: "bright-purple",
        title: "Creative Fatigue Detection",
        description: "Know when to refresh creatives before performance drops"
      }
    ],
    processTitle: "How Our AI AdOps Command Center Works",
    steps: [
      {
        stepNumber: 1,
        title: "Connect Your Campaign Stack",
        description: "One-click integration with all major DSPs, measurement partners, and creative platforms. Your AI assistant immediately begins learning your campaign patterns.",
        bulletPoints: [
          {
            iconName: "Cpu",
            text: "Google DV360, TTD, Amazon DSP, Meta"
          },
          {
            iconName: "BarChart3",
            text: "LiveRamp, Neustar, TransUnion integration"
          },
          {
            iconName: "Sparkles",
            text: "AI learns your KPIs and optimization style"
          }
        ]
      },
      {
        stepNumber: 2,
        title: "AI Monitors & Predicts Performance",
        description: "Our AI continuously analyzes millions of signals to predict CAC changes, detect creative fatigue, and identify arbitrage opportunities before humans can.",
        bulletPoints: [
          {
            iconName: "LineChart",
            text: "4-week CAC predictions with confidence intervals"
          },
          {
            iconName: "RefreshCcw",
            text: "Creative performance decay modeling"
          },
          {
            iconName: "TrendingUp",
            text: "Cross-DSP performance arbitrage"
          }
        ]
      },
      {
        stepNumber: 3,
        title: "Execute with AI Copilot",
        description: "Your AI assistant provides specific, actionable recommendations. Execute optimizations with one click or let AI handle routine tasks automatically.",
        bulletPoints: [
          {
            iconName: "Sparkles",
            text: "Natural language campaign management"
          },
          {
            iconName: "Shield",
            text: "Guardrails prevent overspending"
          },
          {
            iconName: "BarChart3",
            text: "Track incrementality with holdout testing"
          }
        ]
      }
    ],
    resultsTitle: "Real Results from Real Campaigns",
    results: [
      {
        metric: "-47%",
        metricColor: "brand-green",
        label: "CAC Reduction",
        sublabel: "Average across 50+ campaigns"
      },
      {
        metric: "3.2x",
        metricColor: "electric-blue",
        label: "ROAS Improvement",
        sublabel: "With multi-touch attribution"
      },
      {
        metric: "92%",
        metricColor: "bright-purple",
        label: "Forecast Accuracy",
        sublabel: "4-week CAC predictions"
      }
    ],
    ctaTitle: "Join the AI-Powered Future of Media Buying",
    ctaSubtitle: "Leading brands use Precise to outperform their competition",
    ctaButtonText: "See Live Demo",
    ctaButtonLink: "/get-started"
  },
  dataControllerSection: {
    benefitsTitle: "Market Intelligence Without Sharing Your Data",
    benefits: [
      {
        iconName: "Lock",
        iconColor: "brand-green",
        title: "Stay a Data Controller",
        description: "Never become a data broker. Maintain GDPR/CCPA controller status."
      },
      {
        iconName: "LineChart",
        iconColor: "electric-blue",
        title: "Real-Time Demand Signals",
        description: "See what advertisers need before your competitors do."
      },
      {
        iconName: "Brain",
        iconColor: "bright-purple",
        title: "AI Revenue Optimization",
        description: "ML-driven pricing based on real campaign performance data."
      }
    ],
    processTitle: "How Intelligence Infrastructure Works",
    steps: [
      {
        stepNumber: 1,
        title: "Deploy Secure Query Infrastructure",
        description: "Install federated learning nodes that enable privacy-preserving queries. Your data never moves - algorithms come to you in secure enclaves.",
        bulletPoints: [
          {
            iconName: "Check",
            text: "SOC2 Type II compliant infrastructure"
          },
          {
            iconName: "Check",
            text: "Zero-trust architecture with audit logs"
          },
          {
            iconName: "Check",
            text: "Differential privacy on all outputs"
          }
        ]
      },
      {
        stepNumber: 2,
        title: "Get Market Intelligence Insights",
        description: "Our AI analyzes demand patterns across the ecosystem to show you opportunities, pricing benchmarks, and quality improvements that drive revenue.",
        bulletPoints: [
          {
            iconName: "LineChart",
            text: "Real-time advertiser demand signals"
          },
          {
            iconName: "TrendingUp",
            text: "Pricing optimization recommendations"
          },
          {
            iconName: "Sparkles",
            text: "Data enhancement opportunities"
          }
        ]
      },
      {
        stepNumber: 3,
        title: "Earn Based on Real Impact",
        description: "Our Valence Enhanced Shapley system ensures you're paid fairly based on your data's actual contribution to campaign success. Full transparency, no guesswork.",
        bulletPoints: [
          {
            iconName: "BarChart3",
            text: "Attribution based on incrementality"
          },
          {
            iconName: "DollarSign",
            text: "Weekly automated payments"
          },
          {
            iconName: "Shield",
            text: "Cryptographic proof of usage"
          }
        ]
      }
    ],
    trustTitle: "Why You Won't Be a Data Broker",
    comparisonCards: [
      {
        title: "Traditional Data Broker",
        isHighlighted: false,
        items: [
          {
            isPositive: false,
            text: "Collects and stores third-party data"
          },
          {
            isPositive: false,
            text: "Sells data to unknown parties"
          },
          {
            isPositive: false,
            text: "Data leaves your control"
          },
          {
            isPositive: false,
            text: "Complex regulatory compliance"
          }
        ]
      },
      {
        title: "Precise Infrastructure",
        isHighlighted: true,
        items: [
          {
            isPositive: true,
            text: "You only process your first-party data"
          },
          {
            isPositive: true,
            text: "Data never leaves your servers"
          },
          {
            isPositive: true,
            text: "Only approved queries execute"
          },
          {
            isPositive: true,
            text: "Maintain controller status"
          }
        ]
      }
    ],
    ctaTitle: "Enable Intelligence Without Sharing Data",
    ctaSubtitle: "Join leading brands already using federated intelligence",
    ctaButtonText: "Schedule Demo",
    ctaButtonLink: "/get-started"
  }
};

export default function HowItWorksPageCMS() {
  const [activeTab, setActiveTab] = useState<"data-controller" | "media-buyer">("media-buyer");
  const [content, setContent] = useState<HowItWorksContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const query = `*[_type == "howItWorksPage"][0]`;
        const fetchedContent = await client.fetch(query);
        
        if (fetchedContent) {
          setContent(fetchedContent);
        }
      } catch (error) {
        console.error("Error fetching How It Works content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);


  if (loading) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-soft-white to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              {content.heroSubtitle}
            </p>
          </motion.div>

          {/* Tab Selection */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("media-buyer")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                activeTab === "media-buyer"
                  ? "bg-dark-gray text-white"
                  : "bg-white text-dark-gray border-2 border-silk-gray hover:border-dark-gray"
              }`}
            >
              <Target className="inline w-5 h-5 mr-2" />
              {content.mediaBuyerTabLabel}
            </button>
            <button
              onClick={() => setActiveTab("data-controller")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                activeTab === "data-controller"
                  ? "bg-dark-gray text-white"
                  : "bg-white text-dark-gray border-2 border-silk-gray hover:border-dark-gray"
              }`}
            >
              <Database className="inline w-5 h-5 mr-2" />
              {content.dataControllerTabLabel}
            </button>
          </div>
        </div>
      </section>

      {/* Media Buyer Flow */}
      {activeTab === "media-buyer" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Key Benefits */}
          <section className="py-12 bg-white">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                {content.mediaBuyerSection.benefitsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.mediaBuyerSection.benefits.map((benefit, index) => {
                  const Icon = getIcon(benefit.iconName);
                  const colors = getColorClasses(benefit.iconColor);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-dark-gray mb-2">{benefit.title}</h3>
                      <p className="text-medium-gray">{benefit.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="py-16 md:py-24">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-16">
                {content.mediaBuyerSection.processTitle}
              </h2>
              
              <div className="space-y-16">
                {content.mediaBuyerSection.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                          {step.stepNumber}
                        </div>
                        <h3 className="text-2xl font-bold text-dark-gray">{step.title}</h3>
                      </div>
                      <p className="text-lg text-medium-gray mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.bulletPoints.map((bullet, bulletIndex) => {
                          const BulletIcon = getIcon(bullet.iconName);
                          return (
                            <li key={bulletIndex} className="flex items-start gap-3">
                              <BulletIcon className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                              <span className="text-medium-gray">{bullet.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <HowItWorksVisualExample 
                        type={step.visualExample?.type || 'dashboard'}
                        content={step.visualExample?.content || ''}
                        stepNumber={step.stepNumber}
                        tabType="media-buyer"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-16 bg-gradient-to-b from-white to-light-gray">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                {content.mediaBuyerSection.resultsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.mediaBuyerSection.results.map((result, index) => {
                  const colors = getColorClasses(result.metricColor);
                  return (
                    <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                      <div className={`text-4xl font-bold ${colors.text} mb-2`}>
                        {result.metric}
                      </div>
                      <div className="text-lg font-medium text-dark-gray mb-1">{result.label}</div>
                      <p className="text-sm text-medium-gray">{result.sublabel}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-dark-gray">
            <div className="container max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.mediaBuyerSection.ctaTitle}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {content.mediaBuyerSection.ctaSubtitle}
              </p>
              <a
                href={content.mediaBuyerSection.ctaButtonLink}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                {content.mediaBuyerSection.ctaButtonText}
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        </motion.div>
      )}

      {/* Data Controller Flow */}
      {activeTab === "data-controller" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Key Benefits */}
          <section className="py-12 bg-white">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                {content.dataControllerSection.benefitsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.dataControllerSection.benefits.map((benefit, index) => {
                  const Icon = getIcon(benefit.iconName);
                  const colors = getColorClasses(benefit.iconColor);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-dark-gray mb-2">{benefit.title}</h3>
                      <p className="text-medium-gray">{benefit.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="py-16 md:py-24">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-16">
                {content.dataControllerSection.processTitle}
              </h2>
              
              <div className="space-y-16">
                {content.dataControllerSection.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">
                          {step.stepNumber}
                        </div>
                        <h3 className="text-2xl font-bold text-dark-gray">{step.title}</h3>
                      </div>
                      <p className="text-lg text-medium-gray mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.bulletPoints.map((bullet, bulletIndex) => {
                          const BulletIcon = getIcon(bullet.iconName);
                          return (
                            <li key={bulletIndex} className="flex items-start gap-3">
                              <BulletIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                              <span className="text-medium-gray">{bullet.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <HowItWorksVisualExample 
                        type={step.visualExample?.type || 'dashboard'}
                        content={step.visualExample?.content || ''}
                        stepNumber={step.stepNumber}
                        tabType="media-buyer"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-16 bg-gradient-to-b from-white to-light-gray">
            <div className="container max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">
                {content.dataControllerSection.trustTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.dataControllerSection.comparisonCards.map((card, index) => (
                  <div 
                    key={index} 
                    className={`bg-white rounded-xl p-8 shadow-lg ${
                      card.isHighlighted ? 'border-2 border-brand-green' : ''
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-dark-gray mb-4">{card.title}</h3>
                    <ul className="space-y-3">
                      {card.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className={item.isPositive ? "text-brand-green" : "text-warm-coral"}>
                            {item.isPositive ? "✓" : "✗"}
                          </span>
                          <span className="text-medium-gray">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-dark-gray">
            <div className="container max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.dataControllerSection.ctaTitle}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {content.dataControllerSection.ctaSubtitle}
              </p>
              <a
                href={content.dataControllerSection.ctaButtonLink}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                {content.dataControllerSection.ctaButtonText}
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}