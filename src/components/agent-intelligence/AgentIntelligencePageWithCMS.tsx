"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, Shield, ArrowRight, CheckCircle, Zap } from "lucide-react";
import InteractiveA2ADiagram from "@/components/marketing/InteractiveA2ADiagram";
import CodeTabs from "@/components/marketing/CodeTabs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const iconMap = {
  Brain: Brain,
  TrendingUp: TrendingUp,
  Users: Users,
  Shield: Shield,
  Zap: Zap,
  CheckCircle: CheckCircle,
};

export default function AgentIntelligencePageWithCMS() {
  const content = useQuery(api.cms.getAgentIntelligenceContent);

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 w-3/4 bg-gray-200 rounded mx-auto mb-4" />
              <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto mb-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {content.hero.badge && (
            <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 mb-6">
              {content.hero.badge.icon && iconMap[content.hero.badge.icon as keyof typeof iconMap] && (
                <Zap className="w-4 h-4 text-electric-blue" />
              )}
              <span className="text-sm font-medium">{content.hero.badge.text}</span>
            </div>
          )}
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-dark-gray">
            {content.hero.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-bright-purple">
              {content.hero.titleHighlight}
            </span>
          </h1>
          
          <p className="text-xl text-medium-gray mb-8 max-w-3xl mx-auto">
            {content.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={content.hero.primaryCta.href}>
              <Button size="lg" className="w-full sm:w-auto">
                {content.hero.primaryCta.text}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            {content.hero.secondaryCta && (
              <Link href={content.hero.secondaryCta.href}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {content.hero.secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>
          
          {/* Trust Badges */}
          {content.hero.trustBadges && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-medium-gray">
              {content.hero.trustBadges.map((badge, index) => {
                const Icon = iconMap[badge.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 text-brand-green" />}
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Architecture Diagram */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              {content.architecture.title}
            </h2>
            <p className="text-lg text-medium-gray">
              {content.architecture.description}
            </p>
          </div>
          <InteractiveA2ADiagram />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              {content.features.title}
            </h2>
            <p className="text-lg text-medium-gray">
              {content.features.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.items.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-electric-blue/10 to-bright-purple/10 rounded-lg">
                      {Icon && <Icon className="w-6 h-6 text-electric-blue" />}
                    </div>
                    {feature.metric && (
                      <span className="text-sm font-medium text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                        {feature.metric}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-dark-gray">
                    {feature.title}
                  </h3>
                  <p className="text-medium-gray mb-4">
                    {feature.description}
                  </p>
                  
                  {feature.details && (
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-medium-gray">
                          <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              {content.codeExamples.title}
            </h2>
            <p className="text-lg text-medium-gray">
              {content.codeExamples.description}
            </p>
          </div>
          
          <CodeTabs examples={content.codeExamples.examples} />
        </div>
      </section>

      {/* Integration Steps */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
              {content.integrationSteps.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {content.integrationSteps.steps.map((item, index) => (
              <div key={index} className="relative">
                {index < content.integrationSteps.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-bright-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-dark-gray">
                    {item.title}
                  </h3>
                  <p className="text-sm text-medium-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-black to-gray-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {content.cta.title}
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={content.cta.primaryButton.href}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {content.cta.primaryButton.text}
              </Button>
            </Link>
            {content.cta.secondaryButton && (
              <Link href={content.cta.secondaryButton.href}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black"
                >
                  {content.cta.secondaryButton.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}