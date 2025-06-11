"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Shuffle, Target, Shield, ChartBar, Calculator, Activity } from "lucide-react";
import { useSanityData } from "@/hooks/useSanityData";
import { valuePropsQuery } from "@/sanity/lib/queries";

// Icon mapping
const iconMap: Record<string, any> = {
  TrendingUp,
  Brain,
  Shuffle,
  Target,
  Shield,
  ChartBar,
  Calculator,
  Activity,
};

type ValueProp = {
  title: string;
  description: string;
  icon: string;
  gradient: string;
};

type ValuePropsData = {
  headline: string;
  subheadline: string;
  props: ValueProp[];
};

export default function ValuePropsSectionWithCMS() {
  // Fetch data from Sanity
  const { data: mediaBuyerData } = useSanityData<ValuePropsData>(
    valuePropsQuery,
    { section: 'mediaBuyers' }
  );
  
  const { data: dataSellerData } = useSanityData<ValuePropsData>(
    valuePropsQuery,
    { section: 'dataSellers' }
  );

  // Fallback data with all props
  const defaultMediaBuyerProps = {
    headline: "For Media Buyers: Drive Better Outcomes",
    subheadline: "Access verified audiences with transparent attribution across the entire marketing funnel. From awareness to retention, optimize what matters.",
    props: [
      {
        title: "Beyond CAC Reduction",
        description: "Drive outcomes across the entire funnel - awareness, consideration, conversion, and retention.",
        icon: "TrendingUp",
        gradient: "from-electric-blue to-electric-blue/70",
      },
      {
        title: "Verified Attribution",
        description: "Multi-touch attribution with deterministic signals. Know what's actually driving results.",
        icon: "Brain",
        gradient: "from-warm-coral to-warm-coral/70",
      },
      {
        title: "Cross-Channel Optimization",
        description: "Unified performance across DSPs, social, CTV, and more. One source of truth.",
        icon: "Shuffle",
        gradient: "from-bright-purple to-bright-purple/70",
      },
      {
        title: "Real-Time Intelligence",
        description: "Act on insights immediately, not weeks later. AI-powered recommendations 24/7.",
        icon: "Target",
        gradient: "from-brand-green to-electric-blue",
      },
    ],
  };

  const defaultDataSellerProps = {
    headline: "For Data Sellers: Monetize with Performance Proof",
    subheadline: "Whether you're a brand with first-party data or a broker with third-party segments, command premium prices through verified performance.",
    props: [
      {
        title: "3-5x Revenue Uplift",
        description: "Command premium prices when you can prove performance. Move from CPM to value-based pricing.",
        icon: "Shield",
        gradient: "from-brand-green to-brand-green/70",
      },
      {
        title: "Universal Activation",
        description: "One integration reaches thousands of buyers. Works for both 1P brands and 3P brokers.",
        icon: "ChartBar",
        gradient: "from-electric-blue to-electric-blue/70",
      },
      {
        title: "Quality Drives Price",
        description: "Build reputation through verified performance. Higher quality scores unlock premium rates.",
        icon: "Calculator",
        gradient: "from-bright-purple to-bright-purple/70",
      },
      {
        title: "Real-Time Analytics",
        description: "Track usage, revenue, and performance 24/7. Optimize pricing based on demand.",
        icon: "Activity",
        gradient: "from-warm-coral to-warm-coral/70",
      },
    ],
  };

  const mediaBuyer = mediaBuyerData || defaultMediaBuyerProps;
  const dataSeller = dataSellerData || defaultDataSellerProps;

  return (
    <section className="py-20 bg-soft-white">
      <div className="container">
        {/* Media Buyer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-4">
              {mediaBuyer.headline}
            </h2>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              {mediaBuyer.subheadline}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaBuyer.props.map((prop, index) => {
              const Icon = iconMap[prop.icon] || TrendingUp;
              
              return (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 shadow-sm hover:shadow-lg transition-all">
                    {/* Gradient accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prop.gradient} rounded-t-2xl`} />
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.gradient} p-2.5 mb-4`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Content with fixed height title */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-dark-gray min-h-[3.5rem] flex items-start">
                        {prop.title}
                      </h3>
                      <p className="text-sm text-medium-gray leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                    
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Data Seller Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-4">
              {dataSeller.headline}
            </h2>
            <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
              {dataSeller.subheadline}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataSeller.props.map((prop, index) => {
              const Icon = iconMap[prop.icon] || Shield;
              
              return (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className="h-full bg-white rounded-2xl border border-silk-gray p-6 shadow-sm hover:shadow-lg transition-all">
                    {/* Gradient accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prop.gradient} rounded-t-2xl`} />
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.gradient} p-2.5 mb-4`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Content with fixed height title */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-dark-gray min-h-[3.5rem] flex items-start">
                        {prop.title}
                      </h3>
                      <p className="text-sm text-medium-gray leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                    
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity pointer-events-none`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}