"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, AlertCircle, CheckCircle, Scale, Database, Eye } from "lucide-react";
import Link from "next/link";

// Icon mapping
const iconMap = {
  shield: Shield,
  lock: Lock,
  fileCheck: FileCheck,
  alertCircle: AlertCircle,
  checkCircle: CheckCircle,
  scale: Scale,
  database: Database,
  eye: Eye
};

// Color scheme mapping
const colorSchemes = {
  green: {
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    border: "border-brand-green/20",
    bgLight: "bg-brand-green/5"
  },
  blue: {
    bg: "bg-electric-blue/10",
    text: "text-electric-blue",
    border: "border-electric-blue/20",
    bgLight: "bg-electric-blue/5"
  },
  purple: {
    bg: "bg-bright-purple/10",
    text: "text-bright-purple",
    border: "border-bright-purple/20",
    bgLight: "bg-bright-purple/5"
  }
};

interface CompliancePageProps {
  data: {
    heroTitle: string;
    heroDescription: string;
    keyBenefits: Array<{
      title: string;
      description: string;
      iconType: keyof typeof iconMap;
      colorScheme: keyof typeof colorSchemes;
    }>;
    dataBrokerSection: {
      title: string;
      description: string;
      traditionalBroker: {
        title: string;
        points: string[];
      };
      withPrecise: {
        title: string;
        points: string[];
      };
    };
    architectureSection: {
      title: string;
      description: string;
      features: Array<{
        title: string;
        description: string;
        codeExample: string;
        iconType: keyof typeof iconMap;
        colorScheme: keyof typeof colorSchemes;
      }>;
    };
    standardsSection: {
      title: string;
      description: string;
      standards: Array<{
        name: string;
        description: string;
        colorScheme: keyof typeof colorSchemes;
      }>;
    };
    ctaSection: {
      title: string;
      description: string;
      primaryButtonText: string;
      primaryButtonLink: string;
      secondaryButtonText: string;
      secondaryButtonLink: string;
    };
  };
}

export default function CompliancePageWithCMS({ data }: CompliancePageProps) {
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
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-medium-gray max-w-2xl mx-auto">
              {data.heroDescription}
            </p>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {data.keyBenefits.map((benefit, index) => {
              const Icon = iconMap[benefit.iconType];
              const colors = colorSchemes[benefit.colorScheme];
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-silk-gray p-6 text-center">
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-semibold text-dark-gray mb-1">{benefit.title}</h3>
                  <p className="text-sm text-medium-gray">{benefit.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why You Won't Be a Data Broker */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              {data.dataBrokerSection.title}
            </h2>
            <p className="text-lg text-medium-gray">
              {data.dataBrokerSection.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Data Broker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-warm-coral/5 border border-warm-coral/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-warm-coral" />
                <h3 className="text-xl font-semibold text-dark-gray">{data.dataBrokerSection.traditionalBroker.title}</h3>
              </div>
              <ul className="space-y-3">
                {data.dataBrokerSection.traditionalBroker.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-warm-coral rounded-full mt-2"></div>
                    <span className="text-medium-gray">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* With Precise */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-brand-green" />
                <h3 className="text-xl font-semibold text-dark-gray">{data.dataBrokerSection.withPrecise.title}</h3>
              </div>
              <ul className="space-y-3">
                {data.dataBrokerSection.withPrecise.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-brand-green rounded-full mt-2"></div>
                    <span className="text-medium-gray">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              {data.architectureSection.title}
            </h2>
            <p className="text-lg text-medium-gray">
              {data.architectureSection.description}
            </p>
          </motion.div>

          <div className="space-y-6">
            {data.architectureSection.features.map((feature, index) => {
              const Icon = iconMap[feature.iconType];
              const colors = colorSchemes[feature.colorScheme];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-gray mb-2">{feature.title}</h3>
                      <p className="text-medium-gray mb-3">
                        {feature.description}
                      </p>
                      <div className="bg-light-gray rounded-lg p-4">
                        <code className="text-sm text-dark-gray font-mono">
                          {feature.codeExample}
                        </code>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              {data.standardsSection.title}
            </h2>
            <p className="text-lg text-medium-gray">
              {data.standardsSection.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.standardsSection.standards.map((standard, index) => {
              const colors = colorSchemes[standard.colorScheme];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-light-gray rounded-xl p-6"
                >
                  <Scale className={`w-8 h-8 ${colors.text} mb-3`} />
                  <h3 className="text-lg font-semibold text-dark-gray mb-2">{standard.name}</h3>
                  <p className="text-sm text-medium-gray">
                    {standard.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand-green to-electric-blue rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              {data.ctaSection.title}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {data.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={data.ctaSection.primaryButtonLink} className="btn-primary bg-white text-dark-gray hover:bg-light-gray">
                {data.ctaSection.primaryButtonText}
              </Link>
              <Link href={data.ctaSection.secondaryButtonLink} className="btn-secondary border-white text-white hover:bg-white/10">
                {data.ctaSection.secondaryButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}