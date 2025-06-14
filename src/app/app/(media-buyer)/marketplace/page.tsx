'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, Plus, Star, Users, TrendingUp, Zap, Shield, Brain, Target, DollarSign, Award } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { isMockDataEnabled } from '@/lib/utils/mockDataConfig';

interface Solution {
  id: string;
  name: string;
  creator: string;
  category: string;
  description: string;
  rating: number;
  activations: number;
  performance: {
    avgLift: number;
    avgROAS: number;
    successRate: number;
  };
  pricing: {
    type: 'cpm' | 'cpc' | 'revenue-share';
    value: number;
  };
  tags: string[];
  verified: boolean;
  featured?: boolean;
}

const mockSolutions: Solution[] = [
  {
    id: '1',
    name: 'Audience Expansion Pro',
    creator: 'DataMasters Inc.',
    category: 'Audience',
    description: 'AI-powered lookalike audience expansion using 50+ demographic and behavioral signals',
    rating: 4.8,
    activations: 2340,
    performance: {
      avgLift: 32,
      avgROAS: 3.2,
      successRate: 87
    },
    pricing: {
      type: 'cpm',
      value: 0.50
    },
    tags: ['AI', 'Lookalike', 'Expansion'],
    verified: true,
    featured: true
  },
  {
    id: '2',
    name: 'Creative Optimizer',
    creator: 'AdTech Solutions',
    category: 'Creative',
    description: 'Dynamic creative optimization based on real-time engagement metrics',
    rating: 4.6,
    activations: 1850,
    performance: {
      avgLift: 28,
      avgROAS: 2.8,
      successRate: 82
    },
    pricing: {
      type: 'revenue-share',
      value: 15
    },
    tags: ['DCO', 'Real-time', 'Creative'],
    verified: true
  },
  {
    id: '3',
    name: 'Fraud Shield Advanced',
    creator: 'SecureAds Corp',
    category: 'Safety',
    description: 'Multi-layer fraud detection with 99.7% accuracy rate',
    rating: 4.9,
    activations: 3200,
    performance: {
      avgLift: 0,
      avgROAS: 0,
      successRate: 99.7
    },
    pricing: {
      type: 'cpm',
      value: 0.10
    },
    tags: ['Fraud', 'Safety', 'Protection'],
    verified: true
  },
  {
    id: '4',
    name: 'Intent Predictor',
    creator: 'BehaviorAI',
    category: 'Targeting',
    description: 'Predict purchase intent with 85% accuracy using behavioral patterns',
    rating: 4.7,
    activations: 1560,
    performance: {
      avgLift: 42,
      avgROAS: 3.8,
      successRate: 85
    },
    pricing: {
      type: 'cpc',
      value: 0.05
    },
    tags: ['Intent', 'Prediction', 'AI'],
    verified: true
  },
  {
    id: '5',
    name: 'Cross-Device Matcher',
    creator: 'IdentityPlus',
    category: 'Identity',
    description: 'Deterministic cross-device identity resolution with privacy compliance',
    rating: 4.5,
    activations: 980,
    performance: {
      avgLift: 25,
      avgROAS: 2.5,
      successRate: 78
    },
    pricing: {
      type: 'cpm',
      value: 0.30
    },
    tags: ['Identity', 'Cross-device', 'Privacy'],
    verified: true
  },
  {
    id: '6',
    name: 'Weather Targeting',
    creator: 'ContextualAds',
    category: 'Contextual',
    description: 'Serve ads based on real-time weather conditions and forecasts',
    rating: 4.3,
    activations: 650,
    performance: {
      avgLift: 18,
      avgROAS: 2.2,
      successRate: 75
    },
    pricing: {
      type: 'cpm',
      value: 0.20
    },
    tags: ['Weather', 'Contextual', 'Real-time'],
    verified: false
  }
];

const categories = ['All', 'Audience', 'Creative', 'Safety', 'Targeting', 'Identity', 'Contextual'];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'performance' | 'newest'>('popular');
  const [activatedSolutions, setActivatedSolutions] = useState<Set<string>>(new Set());
  
  // Fetch solutions from Convex
  const convexSolutions = useQuery(api.marketplace.getMarketplaceSolutions);
  
  // Transform Convex data to match component's expected structure
  const transformedConvexSolutions = convexSolutions && convexSolutions.length > 0 ? convexSolutions.map((sol: any) => ({
    id: sol._id,
    name: sol.name,
    creator: sol.provider,
    category: 'Audience', // Default category since it's not in Convex schema
    description: sol.description,
    rating: 4.5, // Default rating since it's not in Convex schema
    activations: Math.floor(Math.random() * 3000) + 500, // Simulated activations
    performance: {
      avgLift: 30,
      avgROAS: sol.performanceMetrics?.avgROAS || 3.0,
      successRate: sol.performanceMetrics?.successRate || 85
    },
    pricing: {
      type: 'cpm' as const,
      value: 0.50
    },
    tags: sol.dsps || ['AI', 'Optimization'],
    verified: true,
    featured: sol.featured
  })) : null;
  
  // Use transformed Convex data if available and not empty, otherwise use mock data
  const solutions = (transformedConvexSolutions && transformedConvexSolutions.length > 0) 
    ? transformedConvexSolutions 
    : mockSolutions;
  
  // Debug logging
  console.log('convexSolutions:', convexSolutions);
  console.log('transformedConvexSolutions:', transformedConvexSolutions);
  console.log('mockSolutions length:', mockSolutions.length);
  console.log('solutions length:', solutions.length);

  const filteredSolutions = solutions.filter(solution => {
    const matchesCategory = selectedCategory === 'All' || solution.category === selectedCategory;
    const matchesSearch = solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         solution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         solution.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedSolutions = [...filteredSolutions].sort((a, b) => {
    // First, sort by activation status (active solutions come first)
    const aIsActive = activatedSolutions.has(a.id);
    const bIsActive = activatedSolutions.has(b.id);
    
    if (aIsActive && !bIsActive) return -1;
    if (!aIsActive && bIsActive) return 1;
    
    // If both have the same activation status, then sort by the selected criteria
    switch (sortBy) {
      case 'popular':
        return b.activations - a.activations;
      case 'performance':
        return b.performance.avgROAS - a.performance.avgROAS;
      case 'newest':
        return b.id.localeCompare(a.id); // In real app, would use creation date
      default:
        return 0;
    }
  });

  const toggleActivation = (solutionId: string) => {
    const newActivated = new Set(activatedSolutions);
    if (newActivated.has(solutionId)) {
      newActivated.delete(solutionId);
    } else {
      newActivated.add(solutionId);
    }
    setActivatedSolutions(newActivated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Federated Intelligence Hub</h1>
              <p className="text-gray-600 mt-1">Configure queries and access privacy-preserving insights from data controllers</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Configure Query
            </motion.button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search query templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="popular">Most Used Queries</option>
              <option value="performance">Highest Quality Score</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="px-8 py-6">
        {sortedSolutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No solutions found. Showing {solutions.length} total solutions.</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{solution.name}</h3>
                    {solution.verified && (
                      <Shield className="w-4 h-4 text-blue-600" />
                    )}
                    {solution.featured && (
                      <div className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{solution.creator}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{solution.rating}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{solution.description}</p>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Avg Lift</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {solution.performance.avgLift > 0 ? `+${solution.performance.avgLift}%` : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Avg ROAS</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {solution.performance.avgROAS > 0 ? `${solution.performance.avgROAS}x` : 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                  <div className="text-sm font-semibold text-gray-900">{solution.performance.successRate}%</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {solution.activations.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {solution.pricing.type === 'cpm' && `$${solution.pricing.value} CPM`}
                    {solution.pricing.type === 'cpc' && `$${solution.pricing.value} CPC`}
                    {solution.pricing.type === 'revenue-share' && `${solution.pricing.value}% Rev Share`}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleActivation(solution.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activatedSolutions.has(solution.id)
                      ? 'bg-brand-green text-white hover:bg-green-700'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {activatedSolutions.has(solution.id) ? 'Active' : 'Activate'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}