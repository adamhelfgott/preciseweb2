'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import { 
  Clock, 
  Zap, 
  TrendingUp, 
  Shield, 
  Network,
  ChevronRight,
  Play,
  BarChart3,
  Layers,
  Brain,
  Target,
  DollarSign,
  Users,
  Rocket,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ValueStream {
  id: string;
  title: string;
  timeframe: string;
  icon: React.ReactNode;
  color: string;
  benefits: {
    title: string;
    description: string;
    metric: string;
  }[];
}

export default function OMDPositioningV2() {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'benefits'>('problem');
  const [showDetails, setShowDetails] = useState(false);

  const valueStreams: ValueStream[] = [
    {
      id: 'immediate',
      title: 'Stream 1: Immediate Intelligence',
      timeframe: 'Day 1 Value',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-yellow-400 to-orange-500',
      benefits: [
        {
          title: 'Cross-Platform Reach Extension',
          description: 'Find NEW audiences within existing budgets',
          metric: '15-20% incremental reach'
        },
        {
          title: 'Real-Time Optimization',
          description: 'Instant adjustments vs. weekly reports',
          metric: '< 5 minute response time'
        },
        {
          title: 'Unified Frequency Management',
          description: 'Control exposure across all platforms',
          metric: '35% reduction in waste'
        }
      ]
    },
    {
      id: 'compound',
      title: 'Stream 2: Compound Value',
      timeframe: 'Ongoing Returns',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-purple-400 to-pink-500',
      benefits: [
        {
          title: 'ML Model Improvements',
          description: 'Your data makes the platform smarter',
          metric: '$2-3M annual credits'
        },
        {
          title: 'Network Effect Moat',
          description: 'Every campaign improves all future campaigns',
          metric: 'Compounding 8% quarterly'
        },
        {
          title: 'Proprietary Intelligence',
          description: 'Insights only available to OMG',
          metric: 'Exclusive optimization layer'
        }
      ]
    }
  ];

  const unifications = [
    {
      number: '01',
      title: 'Unified Execution',
      tagline: 'One interface, all platforms',
      description: 'Control every media channel from a single command center',
      features: [
        'Real-time campaign control',
        'Cross-platform budget allocation',
        'Instant performance visibility'
      ],
      icon: <Layers className="w-6 h-6" />
    },
    {
      number: '02',
      title: 'Unified Intelligence',
      tagline: 'Every insight accessible everywhere',
      description: 'Platform learnings instantly applied across all channels',
      features: [
        'Cross-platform audience discovery',
        'Automated optimization signals',
        'Predictive performance modeling'
      ],
      icon: <Brain className="w-6 h-6" />
    },
    {
      number: '03',
      title: 'Unified Evolution',
      tagline: 'Every campaign improving the whole',
      description: 'Compound learning that creates sustainable advantage',
      features: [
        'Network effect acceleration',
        'Proprietary optimization layer',
        'Continuous capability expansion'
      ],
      icon: <Network className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon size={32} className="invert" />
              <span className="text-white/60">×</span>
              <span className="font-semibold text-xl">OMG Unified System</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('problem')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'problem' ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                The Opportunity
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'solution' ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                The Solution
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'benefits' ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                The Benefits
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                View Timeline
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Speed Focus */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                From Weeks to Seconds
              </span>
            </h1>
            <p className="text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
              The industry waits for weekly reports. You optimize in real-time.
              One dashboard. Every platform. Instant intelligence.
            </p>
            
            {/* Speed Comparison */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-red-400 font-semibold mb-4">Industry Standard</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-white/60">Weekly performance reports</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-white/60">Monthly optimization cycles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-white/60">Siloed platform insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-white/60">Historical-only learning</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-green-400 font-semibold mb-4">OMG Unified System</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Real-time performance signals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Instant budget reallocation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Cross-platform intelligence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">Predictive optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two-Stream Value Model */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">Two Streams of Value</h2>
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Immediate intelligence gains + compound network effects = sustainable competitive advantage
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {valueStreams.map((stream, index) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stream.color} flex items-center justify-center`}>
                        {stream.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{stream.title}</h3>
                        <p className="text-white/60">{stream.timeframe}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {stream.benefits.map((benefit, idx) => (
                        <div key={idx} className="border-l-2 border-white/20 pl-4">
                          <h4 className="font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-white/70 text-sm mb-2">{benefit.description}</p>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <BarChart3 className="w-3 h-3" />
                            <span className="text-xs font-medium">{benefit.metric}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 3 Unifications Framework */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">The 3 Unifications</h2>
            <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
              A simple framework for transforming media operations
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {unifications.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 h-full hover:border-purple-500/40 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-5xl font-bold text-white/20">{item.number}</span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-purple-400 font-medium mb-4">{item.tagline}</p>
                    <p className="text-white/70 mb-6">{item.description}</p>
                    
                    <div className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Network Effect Visualization */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">The Compound Advantage</h2>
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              Every campaign makes every future campaign smarter. This isn't optimization—it's evolution.
            </p>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Day 1</div>
                  <p className="text-white/60">Baseline Performance</p>
                  <div className="mt-4 h-20 bg-gradient-to-t from-purple-600/20 to-transparent rounded"></div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Month 1</div>
                  <p className="text-white/60">+12% Improvement</p>
                  <div className="mt-4 h-24 bg-gradient-to-t from-purple-600/40 to-transparent rounded"></div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Quarter 1</div>
                  <p className="text-white/60">+25% Improvement</p>
                  <div className="mt-4 h-32 bg-gradient-to-t from-purple-600/60 to-transparent rounded"></div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Year 1</div>
                  <p className="text-white/60">+47% Improvement</p>
                  <div className="mt-4 h-40 bg-gradient-to-t from-purple-600/80 to-transparent rounded"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-white/70">Campaign Intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-white/70">Platform Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-white/70">Network Effects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Why This Matters Now</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-semibold">Competitors Moving Fast</h3>
                </div>
                <p className="text-white/70">
                  Major agencies are already building unified systems. Every day without one widens the performance gap.
                </p>
              </div>
              
              <div className="bg-yellow-900/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-semibold">Data Underleveraged</h3>
                </div>
                <p className="text-white/70">
                  Annalect data sits in silos while competitors activate theirs across platforms. Untapped value compounds daily.
                </p>
              </div>
              
              <div className="bg-green-900/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold">First-Mover Advantage</h3>
                </div>
                <p className="text-white/70">
                  The first unified system in market captures compound advantages that become impossible to replicate.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Value Prop */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">Do More With The Same Budget</h2>
            <p className="text-2xl mb-8 text-white/90">
              Turn budget constraints into competitive advantages through unified intelligence.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Without Unified System</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• $10M budget = $10M spend</li>
                    <li>• Weekly optimization</li>
                    <li>• Platform silos</li>
                    <li>• Historical learning only</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">With Unified System</h3>
                  <ul className="space-y-2">
                    <li>• $10M budget = $13M+ value</li>
                    <li>• Real-time optimization</li>
                    <li>• Cross-platform intelligence</li>
                    <li>• Predictive optimization</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors"
              onClick={() => window.location.href = '/implementation-timeline'}
            >
              View Implementation Timeline
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="py-12 px-4 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Icon size={24} className="invert" />
              <span className="text-white/60">© 2025 Precise.ai</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/omd-positioning" className="text-white/60 hover:text-white transition-colors">
                View Original Positioning
              </a>
              <a href="/omg-unified-dashboard" className="text-white/60 hover:text-white transition-colors">
                View Live Dashboard
              </a>
              <a href="/implementation-timeline" className="text-white/60 hover:text-white transition-colors">
                Implementation Timeline
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}