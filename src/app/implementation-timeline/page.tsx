'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Database,
  Shield,
  Zap,
  Brain,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Play,
  Target,
  Rocket,
  Building2,
  Network,
  BarChart3,
  DollarSign
} from 'lucide-react';

interface Phase {
  id: string;
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ReactNode;
  color: string;
  description: string;
  milestones: {
    name: string;
    description: string;
    deliverable: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const phases: Phase[] = [
  {
    id: 'phase-0',
    name: 'Phase 0: Contract & Planning',
    duration: '30 days',
    startDate: 'July 1, 2025',
    endDate: 'July 31, 2025',
    status: 'upcoming',
    icon: <Building2 className="w-6 h-6" />,
    color: 'gray',
    description: 'Finalize contracts, align stakeholders, and establish technical requirements',
    milestones: [
      {
        name: 'Contract Execution',
        description: 'Finalize legal agreements between OMG, MadHive, and Precise',
        deliverable: 'Signed MSA and SOWs',
        status: 'upcoming'
      },
      {
        name: 'Technical Discovery',
        description: 'Audit current MadHive infrastructure and OMG data assets',
        deliverable: 'Technical requirements document',
        status: 'upcoming'
      },
      {
        name: 'Data Inventory',
        description: 'Catalog all Annalect first-party data sources',
        deliverable: 'Data asset inventory with volume estimates',
        status: 'upcoming'
      },
      {
        name: 'Security Review',
        description: 'Complete security and compliance assessments',
        deliverable: 'Security approval from all parties',
        status: 'upcoming'
      }
    ],
    metrics: [
      { label: 'Stakeholders Aligned', value: '12 teams' },
      { label: 'Data Sources Identified', value: '47 sources' },
      { label: 'Compliance Requirements', value: '100% mapped' }
    ]
  },
  {
    id: 'phase-1',
    name: 'Phase 1: Foundation Integration',
    duration: '60 days',
    startDate: 'August 1, 2025',
    endDate: 'September 30, 2025',
    status: 'upcoming',
    icon: <Database className="w-6 h-6" />,
    color: 'blue',
    description: 'Connect Precise verification layer to MadHive platform and establish secure data pipelines',
    milestones: [
      {
        name: 'API Integration',
        description: 'Connect Precise APIs to MadHive\'s unified platform',
        deliverable: 'Working API endpoints with < 100ms latency',
        status: 'upcoming'
      },
      {
        name: 'Cryptographic Layer',
        description: 'Deploy zero-knowledge proof infrastructure',
        deliverable: 'Cryptographic verification on 100% of impressions',
        status: 'upcoming'
      },
      {
        name: 'Data Connectors',
        description: 'Build secure connectors for Annalect data warehouse',
        deliverable: 'Privacy-preserving data pipelines operational',
        status: 'upcoming'
      },
      {
        name: 'Initial Testing',
        description: 'Run test campaigns with sandbox data',
        deliverable: 'Successful attribution on 10M test impressions',
        status: 'upcoming'
      }
    ],
    metrics: [
      { label: 'API Response Time', value: '< 50ms' },
      { label: 'Data Sources Connected', value: '15 sources' },
      { label: 'Test Impressions Verified', value: '10M+' }
    ]
  },
  {
    id: 'phase-2',
    name: 'Phase 2: Intelligence Activation',
    duration: '60 days',
    startDate: 'October 1, 2025',
    endDate: 'November 30, 2025',
    status: 'upcoming',
    icon: <Brain className="w-6 h-6" />,
    color: 'purple',
    description: 'Deploy unified intelligence system and enable cross-platform learning',
    milestones: [
      {
        name: 'Maverick AI Integration',
        description: 'Connect Precise intelligence to Maverick optimization engine',
        deliverable: 'Cross-platform insights flowing in real-time',
        status: 'upcoming'
      },
      {
        name: 'Platform Onboarding',
        description: 'Connect Hulu, Disney+, Fox, NBC to unified system',
        deliverable: 'All tier-1 platforms integrated',
        status: 'upcoming'
      },
      {
        name: 'Dashboard Launch',
        description: 'Deploy unified campaign management dashboard',
        deliverable: 'Single view of all platforms with drill-down',
        status: 'upcoming'
      },
      {
        name: 'First Live Campaign',
        description: 'Launch pilot campaign with real client budget',
        deliverable: '$1M+ campaign with full attribution',
        status: 'upcoming'
      }
    ],
    metrics: [
      { label: 'Platforms Connected', value: '12 platforms' },
      { label: 'Cross-Platform Insights', value: '500+ daily' },
      { label: 'Attribution Accuracy', value: '99.7%' }
    ]
  },
  {
    id: 'phase-3',
    name: 'Phase 3: Scale & Optimization',
    duration: '60 days',
    startDate: 'December 1, 2025',
    endDate: 'January 31, 2026',
    status: 'upcoming',
    icon: <Rocket className="w-6 h-6" />,
    color: 'green',
    description: 'Full automation with privacy-safe data activation across all inventory',
    milestones: [
      {
        name: 'Full Data Integration',
        description: 'Onboard remaining Annalect data sources',
        deliverable: 'All 47 data sources actively contributing',
        status: 'upcoming'
      },
      {
        name: 'Automated Optimization',
        description: 'Enable AI-driven budget reallocation',
        deliverable: 'Real-time budget shifts based on performance',
        status: 'upcoming'
      },
      {
        name: 'Media Credits System',
        description: 'Launch cross-platform media credits program',
        deliverable: 'Credits automatically applied to campaigns',
        status: 'upcoming'
      },
      {
        name: 'Performance Benchmarks',
        description: 'Establish and exceed performance targets',
        deliverable: '25%+ efficiency gain vs. traditional approach',
        status: 'upcoming'
      }
    ],
    metrics: [
      { label: 'Active Campaigns', value: '50+ campaigns' },
      { label: 'Media Credits Generated', value: '$2.5M+' },
      { label: 'Efficiency Gains', value: '25-32%' }
    ]
  },
  {
    id: 'phase-4',
    name: 'Phase 4: Full Production',
    duration: 'Ongoing',
    startDate: 'February 1, 2026',
    endDate: 'Q1 2026 Complete',
    status: 'upcoming',
    icon: <Award className="w-6 h-6" />,
    color: 'emerald',
    description: 'Unified system operating at scale with continuous improvement',
    milestones: [
      {
        name: 'Scale Achievement',
        description: 'Process $100M+ in media spend through unified platform',
        deliverable: 'All major OMG clients onboarded',
        status: 'upcoming'
      },
      {
        name: 'Network Effects',
        description: 'Every campaign improving all future campaigns',
        deliverable: 'Compound learning demonstrably improving ROI',
        status: 'upcoming'
      },
      {
        name: 'Expansion Planning',
        description: 'Roadmap for additional platforms and capabilities',
        deliverable: 'Q2 2026 expansion plan approved',
        status: 'upcoming'
      },
      {
        name: 'Success Metrics',
        description: 'Document and celebrate wins',
        deliverable: 'Case studies showing 30%+ efficiency gains',
        status: 'upcoming'
      }
    ],
    metrics: [
      { label: 'Quarterly Media Spend', value: '$100M+' },
      { label: 'Total Media Credits', value: '$10M+' },
      { label: 'Client NPS Score', value: '85+' }
    ]
  }
];

export default function ImplementationTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'gantt'>('timeline');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'upcoming': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPhaseColor = (color: string) => {
    const colors: Record<string, string> = {
      gray: 'from-gray-400 to-gray-600',
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      green: 'from-green-400 to-green-600',
      emerald: 'from-emerald-400 to-emerald-600'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon size={32} />
              <span className="font-semibold text-xl">Precise</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="font-semibold text-xl">MadHive</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="font-semibold text-xl">OMG</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Timeline View
              </button>
              <button
                onClick={() => setViewMode('gantt')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'gantt'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Gantt View
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Unified Intelligence Platform
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Implementation roadmap for OMG's next-generation advertising platform. 
            From contract to full production in 8 months.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">July 2025 - Q1 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">$100M+ Media Spend</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">25-32% Efficiency Gains</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Outcomes Banner */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Target Outcomes by Q1 2026</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$10M+</div>
                <div className="text-purple-100">Media Credits Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-purple-100">Platforms Unified</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">47</div>
                <div className="text-purple-100">Data Sources Integrated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.7%</div>
                <div className="text-purple-100">Attribution Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {viewMode === 'timeline' ? (
        /* Timeline View */
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
              
              {/* Phase Cards */}
              <div className="space-y-12">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getPhaseColor(phase.color)} flex items-center justify-center text-white shadow-lg`}>
                        {phase.icon}
                      </div>
                    </div>
                    
                    {/* Phase Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedPhase(phase)}
                        className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">{phase.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                            {phase.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{phase.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{phase.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{phase.startDate} - {phase.endDate}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {phase.milestones.length} Milestones
                            </span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Gantt View */
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
              <div className="min-w-[1200px]">
                {/* Month Headers */}
                <div className="grid grid-cols-9 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="col-span-1"></div>
                  {['Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'].map(month => (
                    <div key={month} className="text-center text-sm font-medium text-gray-700">
                      {month}
                    </div>
                  ))}
                </div>
                
                {/* Phase Bars */}
                <div className="space-y-4">
                  {phases.map((phase, index) => (
                    <div key={phase.id} className="grid grid-cols-9 gap-4 items-center">
                      <div className="col-span-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getPhaseColor(phase.color)} flex items-center justify-center text-white text-xs`}>
                            {phase.icon}
                          </div>
                          <span className="text-sm font-medium whitespace-nowrap">{phase.name.split(':')[1]}</span>
                        </div>
                      </div>
                      
                      {/* Timeline Bar */}
                      <div className="col-span-8 relative h-12">
                        <div className="absolute inset-0 grid grid-cols-8">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="border-l border-gray-200"></div>
                          ))}
                        </div>
                        
                        {/* Phase Bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: 'auto' }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`absolute top-1 bottom-1 bg-gradient-to-r ${getPhaseColor(phase.color)} rounded-lg shadow-md flex items-center px-4 text-white text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow`}
                          style={{
                            left: index === 0 ? '0%' : index === 1 ? '12.5%' : index === 2 ? '37.5%' : index === 3 ? '62.5%' : '87.5%',
                            right: index === 4 ? '0%' : 'auto',
                            width: index === 0 ? '12.5%' : index === 4 ? '12.5%' : '25%'
                          }}
                          onClick={() => setSelectedPhase(phase)}
                        >
                          {phase.duration}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Phase Detail Modal */}
      {selectedPhase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhase(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${getPhaseColor(selectedPhase.color)} text-white p-6 rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {selectedPhase.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPhase.name}</h2>
                    <p className="text-white/80">{selectedPhase.startDate} - {selectedPhase.endDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhase(null)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-8">{selectedPhase.description}</p>
              
              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {selectedPhase.metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Milestones */}
              <h3 className="text-lg font-semibold mb-4">Milestones</h3>
              <div className="space-y-4">
                {selectedPhase.milestones.map((milestone, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{milestone.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                        {milestone.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">Deliverable:</span>
                      <span className="text-sm text-gray-600">{milestone.deliverable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Media Buying?</h2>
          <p className="text-xl mb-8">
            Join OMG in building the future of unified advertising intelligence
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">$10M+ Media Credits</p>
                  <p className="text-sm text-white/80">Generated through cross-platform intelligence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Network className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">12 Platforms Unified</p>
                  <p className="text-sm text-white/80">Single dashboard for all media channels</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Zero Data Exposure</p>
                  <p className="text-sm text-white/80">Activate Annalect data without sharing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">25-32% Efficiency Gains</p>
                  <p className="text-sm text-white/80">Proven performance improvements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}