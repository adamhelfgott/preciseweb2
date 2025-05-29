'use client';

import { useState } from 'react';
import { 
  LayoutGrid, 
  TrendingUp, 
  Target, 
  Users,
  Zap,
  BarChart3,
  Globe,
  Shield,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    category: 'Attribution & Performance Validation',
    items: [
      {
        id: 1,
        name: 'Proof-Based Data Lineage Tracking',
        description: 'Verifies which signals drove results with blockchain-backed lineage',
        icon: Shield,
        kpi: 'Attribution accuracy',
        outcome: 'Improve QBR trust',
        url: '/madhive-marketplace/lineage-tracking'
      },
      {
        id: 2,
        name: 'Omnichannel Journey Unifier',
        description: 'Resolves IDs across Upwave, Adelaide, InMarket into one journey',
        icon: TrendingUp,
        kpi: 'Unified ROAS',
        outcome: 'Full-funnel view',
        url: '/madhive-marketplace/journey-unifier'
      }
    ]
  },
  {
    category: 'Planning & Pre-Flight Intelligence',
    items: [
      {
        id: 3,
        name: 'Pre-Flight Segment Validator',
        description: 'Simulates expected contribution of data segments before spend',
        icon: Zap,
        kpi: 'Lower CPA',
        outcome: 'De-risk investment',
        url: '/madhive-marketplace/pre-flight',
        featured: true
      },
      {
        id: 4,
        name: 'Data Efficiency Optimizer',
        description: 'Scores segments for LCV and suppresses low-value data',
        icon: BarChart3,
        kpi: 'Increased ROAS',
        outcome: 'Maximize returns',
        url: '/madhive-marketplace/lcv-scorer'
      }
    ]
  },
  {
    category: 'Audience & Signal Activation',
    items: [
      {
        id: 5,
        name: 'First-Party Signal Amplifier',
        description: 'Tracks which CRM/CDP audiences drive long-term outcomes',
        icon: Users,
        kpi: 'Customer LTV',
        outcome: 'Extend 1P value',
        url: '/madhive-marketplace/signal-amplifier'
      },
      {
        id: 6,
        name: 'Cross-Channel Incrementality Verifier',
        description: 'Compares ACR linear exposure with CTV delivery and outcomes',
        icon: Target,
        kpi: 'Incremental reach',
        outcome: 'Justify CTV spend',
        url: '/madhive-marketplace/incrementality'
      }
    ]
  },
  {
    category: 'Partner Enablement & Localization',
    items: [
      {
        id: 7,
        name: 'Partner Intelligence Layer',
        description: 'Custom intelligence environments per broadcaster',
        icon: Globe,
        kpi: 'Partner revenue',
        outcome: 'Broadcaster retention',
        url: '/madhive-marketplace/partner-intel'
      },
      {
        id: 8,
        name: 'Regional Performance Tracker',
        description: 'Reveals which segments perform best by DMA/region',
        icon: Globe,
        kpi: 'ROAS by DMA',
        outcome: 'Local optimization',
        url: '/madhive-marketplace/regional-tracker'
      }
    ]
  }
];

export default function MadHiveMarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded"></div>
                <span className="font-bold text-xl">MadHive</span>
              </div>
              <span className="text-gray-400">×</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <span className="font-bold text-xl">Precise</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Data Marketplace 2.0
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-4">
            MadHive Data Marketplace 2.0
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Outcome-Based Intelligence Products Aligned to Business Goals & KPIs
          </p>
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className="text-3xl font-bold">34%</p>
              <p className="text-sm opacity-75">Avg CAC Reduction</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.2x</p>
              <p className="text-sm opacity-75">Higher LTV:CAC</p>
            </div>
            <div>
              <p className="text-3xl font-bold">87%</p>
              <p className="text-sm opacity-75">Attribution Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$12M</p>
              <p className="text-sm opacity-75">Value Created</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                !selectedCategory 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            {products.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.category
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {products
            .filter(cat => !selectedCategory || cat.category === selectedCategory)
            .map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((product) => (
                  <Link
                    key={product.id}
                    href={product.url}
                    className={`bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 ${
                      product.featured 
                        ? 'border-purple-500 ring-4 ring-purple-100' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        product.featured ? 'bg-purple-100' : 'bg-gray-100'
                      }`}>
                        <product.icon className={`w-6 h-6 ${
                          product.featured ? 'text-purple-600' : 'text-gray-700'
                        }`} />
                      </div>
                      {product.featured && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">KPI Impact</p>
                        <p className="text-sm font-semibold text-gray-900">{product.kpi}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Business Outcome</p>
                        <p className="text-sm font-semibold text-purple-600">{product.outcome}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-end text-purple-600">
                      <span className="text-sm font-medium">Explore Product</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Data Strategy?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join leading broadcasters and advertisers using MadHive + Precise 
            to drive measurable business outcomes.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              Schedule Demo
            </button>
            <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}