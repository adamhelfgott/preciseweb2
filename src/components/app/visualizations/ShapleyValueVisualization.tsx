'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Info, TrendingUp, Users, Database, Zap } from 'lucide-react';
import { Sankey, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { isMockDataEnabled } from '@/lib/utils/mockDataConfig';
import { Id } from '@/convex/_generated/dataModel';

interface DataAssetContribution {
  id: string;
  name: string;
  category: string;
  shapleyValue: number;
  marginalContribution: number;
  interactions: string[];
  quality: number;
}

interface CampaignAttribution {
  campaignId: string;
  campaignName: string;
  totalValue: number;
  assets: DataAssetContribution[];
}

const generateShapleyData = (): CampaignAttribution => {
  const assets: DataAssetContribution[] = [
    {
      id: '1',
      name: 'Purchase Intent Signals',
      category: 'Behavioral',
      shapleyValue: 0.35,
      marginalContribution: 0.42,
      interactions: ['Demographic Data', 'Location Data'],
      quality: 95
    },
    {
      id: '2',
      name: 'Demographic Data',
      category: 'Identity',
      shapleyValue: 0.25,
      marginalContribution: 0.18,
      interactions: ['Purchase Intent Signals'],
      quality: 88
    },
    {
      id: '3',
      name: 'Location Data',
      category: 'Contextual',
      shapleyValue: 0.20,
      marginalContribution: 0.15,
      interactions: ['Purchase Intent Signals', 'Weather Data'],
      quality: 92
    },
    {
      id: '4',
      name: 'Weather Data',
      category: 'Environmental',
      shapleyValue: 0.12,
      marginalContribution: 0.08,
      interactions: ['Location Data'],
      quality: 85
    },
    {
      id: '5',
      name: 'Device Graph',
      category: 'Identity',
      shapleyValue: 0.08,
      marginalContribution: 0.05,
      interactions: ['Demographic Data'],
      quality: 78
    }
  ];

  return {
    campaignId: '1',
    campaignName: 'Nike Summer Fitness',
    totalValue: 125000,
    assets
  };
};

const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'];

interface ShapleyValueVisualizationProps {
  ownerId?: Id<"users">;
  campaignId?: Id<"campaigns">;
}

export default function ShapleyValueVisualization({ ownerId, campaignId }: ShapleyValueVisualizationProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'sankey' | 'bar' | 'pie'>('sankey');
  
  // Fetch Shapley values from Convex if ownerId is provided
  const convexShapleyValues = useQuery(
    api.attribution.getShapleyValues,
    ownerId ? { ownerId } : "skip"
  );
  
  // Fetch data assets if we have Shapley values
  const dataAssets = useQuery(
    api.dataAssets.getDataAssets,
    ownerId ? { ownerId } : "skip"
  );
  
  // Generate attribution data from Convex or use mock data
  const useMockData = isMockDataEnabled();
  let attribution: CampaignAttribution;
  
  if (!useMockData && convexShapleyValues && dataAssets && convexShapleyValues.length > 0) {
    // Convert Convex data to component format
    const assets: DataAssetContribution[] = convexShapleyValues.map((sv: any) => {
      const asset = dataAssets.find((a: any) => a._id === sv.assetId);
      return {
        id: sv.assetId,
        name: asset?.name || 'Unknown Asset',
        category: asset?.type || 'Unknown',
        shapleyValue: sv.shapleyValue,
        marginalContribution: sv.marginalContribution,
        interactions: [], // Would need separate query for interactions
        quality: asset?.qualityScore || 0
      };
    });
    
    // Calculate total value from Shapley values
    const totalValue = assets.reduce((sum, a) => sum + a.marginalContribution, 0);
    
    attribution = {
      campaignId: campaignId || '1',
      campaignName: 'Campaign Attribution',
      totalValue: totalValue,
      assets
    };
  } else {
    // Use mock data
    attribution = generateShapleyData();
  }

  // Generate Sankey diagram data
  const sankeyData = {
    nodes: [
      { name: 'Campaign Value' },
      ...attribution.assets.map(asset => ({ name: asset.name })),
      { name: 'Total Attribution' }
    ],
    links: [
      // From campaign to assets
      ...attribution.assets.map(asset => ({
        source: 0,
        target: attribution.assets.indexOf(asset) + 1,
        value: asset.shapleyValue * attribution.totalValue
      })),
      // From assets to total
      ...attribution.assets.map(asset => ({
        source: attribution.assets.indexOf(asset) + 1,
        target: attribution.assets.length + 1,
        value: asset.shapleyValue * attribution.totalValue
      }))
    ]
  };

  const barData = attribution.assets.map(asset => ({
    name: asset.name,
    shapleyValue: asset.shapleyValue * 100,
    marginalContribution: asset.marginalContribution * 100,
    quality: asset.quality
  }));

  const pieData = attribution.assets.map(asset => ({
    name: asset.name,
    value: asset.shapleyValue * attribution.totalValue,
    percentage: asset.shapleyValue * 100
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Value: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Shapley Value Attribution</h3>
          <p className="text-sm text-gray-600 mt-1">Fair value distribution across data assets</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('sankey')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              viewMode === 'sankey' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Flow
          </button>
          <button
            onClick={() => setViewMode('bar')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              viewMode === 'bar' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Compare
          </button>
          <button
            onClick={() => setViewMode('pie')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              viewMode === 'pie' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Share
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">How Shapley Values Work</p>
            <p className="text-blue-700">
              Shapley values fairly distribute the total campaign value based on each data asset&apos;s 
              marginal contribution across all possible combinations. This ensures equitable compensation 
              for data providers.
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
                fill: '#000000',
                stroke: '#000000',
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
              <Bar dataKey="shapleyValue" fill="#000000" name="Shapley Value %" />
              <Bar dataKey="marginalContribution" fill="#666666" name="Marginal Contribution %" />
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
        <h4 className="font-medium text-gray-900">Asset Contributions</h4>
        {attribution.assets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedAsset === asset.id 
                ? 'border-black bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-gray-900">{asset.name}</h5>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                    {asset.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      ${(asset.shapleyValue * attribution.totalValue).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Database className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Quality: {asset.quality}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">
                  {(asset.shapleyValue * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Shapley Value</div>
              </div>
            </div>

            {selectedAsset === asset.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Marginal Contribution</div>
                    <div className="font-medium text-gray-900">
                      {(asset.marginalContribution * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Synergies With</div>
                    <div className="flex flex-wrap gap-1">
                      {asset.interactions.map((interaction) => (
                        <span
                          key={interaction}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
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
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Total Campaign Value</div>
            <div className="text-xl font-semibold text-gray-900">
              ${attribution.totalValue.toLocaleString()}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Distribute Earnings
          </motion.button>
        </div>
      </div>
    </div>
  );
}