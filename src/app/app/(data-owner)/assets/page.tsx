"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Plus, Settings, TrendingUp, AlertCircle, Play, Pause, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import ProofBadge from "@/components/app/ProofBadge";
import VerificationModal from "@/components/app/VerificationModal";
import DataAssetHealthScore from "@/components/app/data-owner/DataAssetHealthScore";
import MarketRateBenchmarking from "@/components/app/data-owner/MarketRateBenchmarking";
import DataEnhancementSuggestions from "@/components/app/data-owner/DataEnhancementSuggestions";
import BuyerRequestDashboard from "@/components/app/data-owner/BuyerRequestDashboard";
import MarketIntelligence from "@/components/app/data-owner/MarketIntelligence";

interface DataAsset {
  id: string;
  name: string;
  type: string;
  qualityScore: number;
  recordCount: number;
  updateFrequency: number;
  revenuePerK: number;
  industryAvgPerK: number;
  usageRate: number;
  monthlyRevenue: number;
  status: "active" | "paused" | "pending";
  lastUpdated: string;
  campaigns: {
    name: string;
    cacReduction: number;
  }[];
}

const mockAssets: DataAsset[] = [
  {
    id: "1",
    name: "Fitness Activity Events",
    type: "behavioral",
    qualityScore: 94,
    recordCount: 2300000,
    updateFrequency: 24,
    revenuePerK: 12.5,
    industryAvgPerK: 8.3,
    usageRate: 78,
    monthlyRevenue: 23400,
    status: "active",
    lastUpdated: "2 hours ago",
    campaigns: [
      { name: "Nike Summer Fitness", cacReduction: 12.30 },
      { name: "Adidas Morning Warriors", cacReduction: 8.70 },
      { name: "Under Armour Premium", cacReduction: 10.20 },
    ],
  },
  {
    id: "2",
    name: "User Demographics",
    type: "demographic",
    qualityScore: 88,
    recordCount: 1500000,
    updateFrequency: 168,
    revenuePerK: 6.2,
    industryAvgPerK: 7.1,
    usageRate: 45,
    monthlyRevenue: 11200,
    status: "active",
    lastUpdated: "1 day ago",
    campaigns: [
      { name: "Nike Summer Fitness", cacReduction: 5.40 },
      { name: "Peloton Acquisition", cacReduction: 6.20 },
    ],
  },
  {
    id: "3",
    name: "Location Context",
    type: "location",
    qualityScore: 76,
    recordCount: 890000,
    updateFrequency: 48,
    revenuePerK: 4.8,
    industryAvgPerK: 5.2,
    usageRate: 32,
    monthlyRevenue: 4200,
    status: "paused",
    lastUpdated: "3 days ago",
    campaigns: [],
  },
];

export default function DataAssetsPage() {
  const [assets, setAssets] = useState(mockAssets);
  const [selectedAsset, setSelectedAsset] = useState<DataAsset | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<any>(null);

  const toggleAssetStatus = (assetId: string) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId 
        ? { ...asset, status: asset.status === "active" ? "paused" : "active" }
        : asset
    ));
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return "text-brand-green";
    if (score >= 80) return "text-electric-blue";
    if (score >= 70) return "text-warm-coral";
    return "text-medium-gray";
  };

  const getQualityBg = (score: number) => {
    if (score >= 90) return "bg-brand-green/10";
    if (score >= 80) return "bg-electric-blue/10";
    if (score >= 70) return "bg-warm-coral/10";
    return "bg-light-gray";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-gray mb-2">Intelligence Assets</h1>
          <p className="text-medium-gray">
            Configure query permissions and monitor intelligence usage
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Configure New Asset
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <p className="text-sm text-medium-gray mb-2">Total Assets</p>
          <p className="text-3xl font-bold text-dark-gray">{assets.length}</p>
          <p className="text-sm text-brand-green mt-1">
            {assets.filter(a => a.status === "active").length} active
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <p className="text-sm text-medium-gray mb-2">Total Records</p>
          <p className="text-3xl font-bold text-dark-gray">
            {(assets.reduce((sum, a) => sum + a.recordCount, 0) / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-medium-gray mt-1">Across all assets</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <p className="text-sm text-medium-gray mb-2">Avg Quality Score</p>
          <p className="text-3xl font-bold text-brand-green">
            {Math.round(assets.reduce((sum, a) => sum + a.qualityScore, 0) / assets.length)}
          </p>
          <p className="text-sm text-medium-gray mt-1">Excellent rating</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-silk-gray p-6"
        >
          <p className="text-sm text-medium-gray mb-2">Monthly Revenue</p>
          <p className="text-3xl font-bold text-dark-gray">
            ${assets.reduce((sum, a) => sum + a.monthlyRevenue, 0).toLocaleString()}
          </p>
          <p className="text-sm text-brand-green mt-1">+23% vs last month</p>
        </motion.div>
      </div>

      {/* Assets List */}
      <div className="space-y-6">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-silk-gray overflow-hidden"
          >
            {/* Asset Header */}
            <div className="p-6 border-b border-silk-gray">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-light-gray rounded-xl flex items-center justify-center">
                    <Database size={24} className="text-medium-gray" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-dark-gray">
                        {asset.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVerification({
                            proofId: `PRF-2024-${asset.id}-${Math.floor(Math.random() * 1000)}`,
                            timestamp: Date.now(),
                            blockHeight: 12345678,
                            dataHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                            merkleRoot: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                            dataAssets: [
                              {
                                id: asset.id,
                                name: asset.name,
                                provider: 'Your Organization',
                                contribution: 0.45
                              }
                            ],
                            campaign: {
                              id: '1',
                              name: asset.campaigns[0]?.name || 'Direct Sale',
                              advertiser: 'Nike Inc.'
                            },
                            totalValue: asset.monthlyRevenue,
                            status: 'verified'
                          });
                          setVerificationModalOpen(true);
                        }}
                      >
                        <ProofBadge verified={asset.status === 'active'} size="sm" showDetails={false} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-medium-gray">
                      <span>{(asset.recordCount / 1000000).toFixed(1)}M records</span>
                      <span>•</span>
                      <span>Updates every {asset.updateFrequency}h</span>
                      <span>•</span>
                      <span>Last updated {asset.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    getQualityBg(asset.qualityScore),
                    getQualityColor(asset.qualityScore)
                  )}>
                    {asset.qualityScore} Quality
                  </div>
                  
                  <button
                    onClick={() => toggleAssetStatus(asset.id)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      asset.status === "active" 
                        ? "bg-brand-green/10 text-brand-green hover:bg-brand-green/20" 
                        : "bg-medium-gray/10 text-medium-gray hover:bg-medium-gray/20"
                    )}
                  >
                    {asset.status === "active" ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button className="p-2 rounded-lg bg-light-gray hover:bg-medium-gray/20 transition-colors">
                    <Settings size={20} className="text-medium-gray" />
                  </button>
                </div>
              </div>
            </div>

            {/* Asset Metrics */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-medium-gray mb-2">Revenue/1K Records</p>
                <p className="text-2xl font-semibold text-dark-gray">
                  ${asset.revenuePerK}
                </p>
                <p className="text-xs text-medium-gray mt-1">
                  Industry avg: ${asset.industryAvgPerK}
                  {asset.revenuePerK > asset.industryAvgPerK ? (
                    <span className="text-brand-green ml-1">
                      (+{((asset.revenuePerK - asset.industryAvgPerK) / asset.industryAvgPerK * 100).toFixed(0)}%)
                    </span>
                  ) : (
                    <span className="text-warm-coral ml-1">
                      ({((asset.revenuePerK - asset.industryAvgPerK) / asset.industryAvgPerK * 100).toFixed(0)}%)
                    </span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-medium-gray mb-2">Usage Rate</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="h-3 bg-light-gray rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-green rounded-full transition-all duration-500"
                        style={{ width: `${asset.usageRate}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-dark-gray">
                    {asset.usageRate}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-medium-gray mb-2">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-brand-green">
                  ${asset.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-medium-gray mt-1">
                  +18% vs last month
                </p>
              </div>

              <div>
                <p className="text-sm text-medium-gray mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    asset.status === "active" ? "bg-brand-green" : "bg-medium-gray"
                  )} />
                  <span className={cn(
                    "text-lg font-medium capitalize",
                    asset.status === "active" ? "text-brand-green" : "text-medium-gray"
                  )}>
                    {asset.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Impact */}
            {asset.campaigns.length > 0 && (
              <div className="px-6 pb-6">
                <p className="text-sm font-medium text-dark-gray mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-brand-green" />
                  Campaign Impact
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {asset.campaigns.map((campaign) => (
                    <div 
                      key={campaign.name}
                      className="bg-light-gray rounded-lg p-3 flex items-center justify-between"
                    >
                      <span className="text-sm text-dark-gray font-medium">
                        {campaign.name}
                      </span>
                      <span className="text-sm text-brand-green font-semibold">
                        -${campaign.cacReduction} CAC
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {asset.status === "paused" && (
              <div className="px-6 pb-6">
                <div className="bg-warm-coral/10 border border-warm-coral/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle size={20} className="text-warm-coral mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark-gray mb-1">
                      Asset is paused
                    </p>
                    <p className="text-sm text-medium-gray">
                      This asset is not generating revenue. Reactivate to resume earning from {asset.usageRate}% of campaigns.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Advanced Features Section */}
      <div className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-dark-gray">Asset Intelligence</h2>
        
        {/* Market Intelligence */}
        <MarketIntelligence />
        
        {/* Data Asset Health Score */}
        <DataAssetHealthScore />
        
        {/* Market Rate Benchmarking */}
        <MarketRateBenchmarking />
        
        {/* Data Enhancement Suggestions */}
        <DataEnhancementSuggestions />
        
        {/* Buyer Request Dashboard */}
        <BuyerRequestDashboard />
      </div>

      {/* Verification Modal */}
      {selectedVerification && (
        <VerificationModal
          isOpen={verificationModalOpen}
          onClose={() => {
            setVerificationModalOpen(false);
            setSelectedVerification(null);
          }}
          details={selectedVerification}
        />
      )}
    </div>
  );
}