'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Info, TrendingUp, Database, Zap, ShieldCheck } from 'lucide-react';
import { Sankey, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

interface DataAssetContribution {
  id: string;
  name: string;
  category: string;
  shapleyValue: number;
  marginalContribution: number;
  interactions: string[];
  quality: number;
  privacyScore: number;
}

interface ValenceAttribution {
  totalEarnings: number;
  assets: DataAssetContribution[];
}

const generateValenceData = (): ValenceAttribution => {
  const assets: DataAssetContribution[] = [
    {
      id: '1',
      name: 'First-Party Purchase Data',
      category: 'Transactional',
      shapleyValue: 0.38,
      marginalContribution: 0.45,
      interactions: ['Demographics', 'Behavioral Signals'],
      quality: 98,
      privacyScore: 95
    },
    {
      id: '2',
      name: 'Customer Demographics',
      category: 'Identity',
      shapleyValue: 0.22,
      marginalContribution: 0.18,
      interactions: ['Purchase Data'],
      quality: 92,
      privacyScore: 88
    },
    {
      id: '3',
      name: 'Behavioral Signals',
      category: 'Engagement',
      shapleyValue: 0.18,
      marginalContribution: 0.15,
      interactions: ['Purchase Data', 'Site Analytics'],
      quality: 85,
      privacyScore: 92
    },
    {
      id: '4',
      name: 'Site Analytics',
      category: 'Digital',
      shapleyValue: 0.14,
      marginalContribution: 0.12,
      interactions: ['Behavioral Signals'],
      quality: 88,
      privacyScore: 90
    },
    {
      id: '5',
      name: 'CRM Records',
      category: 'Relational',
      shapleyValue: 0.08,
      marginalContribution: 0.10,
      interactions: ['Demographics'],
      quality: 82,
      privacyScore: 85
    }
  ];

  return {
    totalEarnings: 45230,
    assets
  };
};

const COLORS = ['#33CC66', '#52D486', '#70DCA6', '#8FE4C6', '#ADECE6'];

export default function ValenceShapleyVisualization() {
  const [attribution] = useState<ValenceAttribution>(generateValenceData());
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'sankey' | 'bar' | 'pie'>('sankey');

  // Generate Sankey diagram data
  const sankeyData = {
    nodes: [
      { name: 'Your Data Assets' },
      ...attribution.assets.map(asset => ({ name: asset.name })),
      { name: 'Total Value Created' }
    ],
    links: [
      // From assets to value
      ...attribution.assets.map(asset => ({
        source: 0,
        target: attribution.assets.indexOf(asset) + 1,
        value: asset.shapleyValue * attribution.totalEarnings
      })),
      // From value distribution
      ...attribution.assets.map(asset => ({
        source: attribution.assets.indexOf(asset) + 1,
        target: attribution.assets.length + 1,
        value: asset.shapleyValue * attribution.totalEarnings
      }))
    ]
  };

  const barData = attribution.assets.map(asset => ({
    name: asset.name,
    valenceShare: asset.shapleyValue * 100,
    quality: asset.quality,
    privacy: asset.privacyScore
  }));

  const pieData = attribution.assets.map(asset => ({
    name: asset.name,
    value: asset.shapleyValue * attribution.totalEarnings,
    percentage: asset.shapleyValue * 100
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-light-gray">
          <p className="font-medium text-dark-gray">{payload[0].name}</p>
          <p className="text-sm text-medium-gray">
            Earnings: ${payload[0].value?.toLocaleString() || '0'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-light-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-dark-gray">Valence Enhanced Shapley Distribution</h3>
          <p className="text-sm text-medium-gray mt-1">Fair value allocation with privacy preservation</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('sankey')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              viewMode === 'sankey' ? 'bg-brand-green text-white' : 'bg-light-gray text-dark-gray hover:bg-silk-gray'
            }`}
          >
            Flow
          </button>
          <button
            onClick={() => setViewMode('bar')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              viewMode === 'bar' ? 'bg-brand-green text-white' : 'bg-light-gray text-dark-gray hover:bg-silk-gray'
            }`}
          >
            Compare
          </button>
          <button
            onClick={() => setViewMode('pie')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              viewMode === 'pie' ? 'bg-brand-green text-white' : 'bg-light-gray text-dark-gray hover:bg-silk-gray'
            }`}
          >
            Share
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-brand-green mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-dark-gray mb-1">Valence Enhanced Shapley Values</p>
            <p className="text-medium-gray">
              Our proprietary algorithm fairly distributes earnings based on your data&apos;s marginal 
              contribution while maintaining privacy. Value is calculated across all campaign interactions 
              where your data provided unique insights.
            </p>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="mb-6">
        {viewMode === 'sankey' && (
          <ResponsiveContainer width="100%" height={400}>
            <Sankey
              data={sankeyData}
              node={{
                fill: '#33CC66',
                stroke: '#33CC66',
                strokeWidth: 1
              }}
              link={{
                stroke: '#E5E7EB',
                strokeOpacity: 0.5
              }}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Tooltip content={<CustomTooltip />} />
            </Sankey>
          </ResponsiveContainer>
        )}

        {viewMode === 'bar' && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="valenceShare" fill="#33CC66" name="Value Share %" />
              <Bar dataKey="privacy" fill="#70DCA6" name="Privacy Score" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {viewMode === 'pie' && (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Asset Details */}
      <div className="space-y-4">
        <h4 className="font-medium text-dark-gray">Your Data Assets</h4>
        {attribution.assets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedAsset === asset.id 
                ? 'border-brand-green bg-brand-green/5' 
                : 'border-light-gray hover:border-silk-gray'
            }`}
            onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-dark-gray">{asset.name}</h5>
                  <span className="px-2 py-0.5 bg-light-gray text-medium-gray text-xs rounded">
                    {asset.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                    <span className="text-medium-gray">
                      ${(asset.shapleyValue * attribution.totalEarnings).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Database className="w-4 h-4 text-medium-gray" />
                    <span className="text-medium-gray">Quality: {asset.quality}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-medium-gray" />
                    <span className="text-medium-gray">Privacy: {asset.privacyScore}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-dark-gray">
                  {(asset.shapleyValue * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-medium-gray">Value Share</div>
              </div>
            </div>

            {selectedAsset === asset.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-light-gray"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-medium-gray mb-1">Marginal Contribution</div>
                    <div className="font-medium text-dark-gray">
                      {(asset.marginalContribution * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-medium-gray mb-1">Synergies With</div>
                    <div className="flex flex-wrap gap-1">
                      {asset.interactions.map((interaction) => (
                        <span
                          key={interaction}
                          className="px-2 py-0.5 bg-light-gray text-medium-gray text-xs rounded"
                        >
                          {interaction}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-light-gray rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-medium-gray">This Month\'s Earnings</div>
            <div className="text-xl font-semibold text-dark-gray">
              ${attribution.totalEarnings.toLocaleString()}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-primary-blue transition-colors"
          >
            <Zap className="w-4 h-4" />
            View Payout Details
          </motion.button>
        </div>
      </div>
    </div>
  );
}