'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Loader2, 
  Link2,
  Activity,
  DollarSign,
  Target
} from 'lucide-react';

const dspConnections = [
  {
    id: 'madhive',
    name: 'MadHive',
    logo: '/logos/madhive.png',
    status: 'connected',
    lastSync: '2 minutes ago',
    campaigns: 12,
    spend: '$125,000',
    color: 'bg-purple-500',
  },
  {
    id: 'ttd',
    name: 'The Trade Desk',
    logo: '/logos/ttd.png',
    status: 'connected',
    lastSync: '5 minutes ago',
    campaigns: 8,
    spend: '$89,000',
    color: 'bg-blue-500',
  },
  {
    id: 'amazon',
    name: 'Amazon DSP',
    logo: '/logos/amazon.png',
    status: 'connected',
    lastSync: '1 hour ago',
    campaigns: 5,
    spend: '$67,000',
    color: 'bg-orange-500',
  },
  {
    id: 'dv360',
    name: 'Display & Video 360',
    logo: '/logos/google.png',
    status: 'disconnected',
    lastSync: 'Never',
    campaigns: 0,
    spend: '$0',
    color: 'bg-red-500',
  },
];

export default function CampaignSyncPage() {
  const [syncing, setSyncing] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<Record<string, string>>({});

  const handleSync = async (dspId: string) => {
    setSyncing(dspId);
    setSyncStatus({ ...syncStatus, [dspId]: 'Syncing...' });

    // Simulate API sync
    setTimeout(() => {
      setSyncing(null);
      setSyncStatus({ 
        ...syncStatus, 
        [dspId]: `Last synced: ${new Date().toLocaleTimeString()}` 
      });
    }, 2000);
  };

  const handleConnectDSP = (dspId: string) => {
    // In real app, this would open OAuth flow
    alert(`Connect to ${dspId} via OAuth flow`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-gray mb-2">DSP Campaign Sync</h1>
        <p className="text-medium-gray">
          Connect your DSP accounts to automatically sync campaigns and apply Precise data enhancements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Link2 className="text-brand-green" size={24} />
            <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-2xl font-bold">3/4</p>
          <p className="text-sm text-gray-600">Connected DSPs</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Activity className="text-electric-blue mb-2" size={24} />
          <p className="text-2xl font-bold">25</p>
          <p className="text-sm text-gray-600">Active Campaigns</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <DollarSign className="text-bright-purple mb-2" size={24} />
          <p className="text-2xl font-bold">$281K</p>
          <p className="text-sm text-gray-600">Total Spend</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Target className="text-warm-coral mb-2" size={24} />
          <p className="text-2xl font-bold">34%</p>
          <p className="text-sm text-gray-600">Avg CAC Reduction</p>
        </div>
      </div>

      {/* DSP Connections */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">DSP Integrations</h2>
          <p className="text-sm text-gray-600 mt-1">
            Campaigns are created in your DSP and synced here for Precise enhancements
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {dspConnections.map((dsp) => (
            <div key={dsp.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${dsp.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {dsp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{dsp.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          dsp.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        {dsp.status === 'connected' ? 'Connected' : 'Not Connected'}
                      </span>
                      {dsp.status === 'connected' && (
                        <>
                          <span>•</span>
                          <span>{dsp.campaigns} campaigns</span>
                          <span>•</span>
                          <span>{dsp.spend} spend</span>
                          <span>•</span>
                          <span>Last sync: {dsp.lastSync}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {dsp.status === 'connected' ? (
                    <>
                      {syncStatus[dsp.id] && (
                        <span className="text-sm text-green-600 mr-2">
                          {syncStatus[dsp.id]}
                        </span>
                      )}
                      <button
                        onClick={() => handleSync(dsp.id)}
                        disabled={syncing === dsp.id}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {syncing === dsp.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                        Sync Now
                      </button>
                      <button className="px-4 py-2 bg-dark-gray text-white rounded-lg hover:bg-gray-800">
                        View Campaigns
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnectDSP(dsp.id)}
                      className="px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
              
              {dsp.status === 'connected' && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Sync Settings</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Auto-sync hourly</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Apply Precise data</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Optimize bidding</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Pause underperformers</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">For Developers</h3>
        <p className="text-sm text-blue-800 mb-4">
          DSPs can push campaign updates via our REST API or use webhooks for real-time sync.
        </p>
        <div className="flex gap-4">
          <a href="/app/docs/api" className="text-sm text-blue-600 hover:underline">
            View API Documentation →
          </a>
          <a href="/app/docs/webhooks" className="text-sm text-blue-600 hover:underline">
            Configure Webhooks →
          </a>
        </div>
      </div>
    </div>
  );
}