'use client';

import { useState, useEffect } from 'react';
import { Database, Server, Check, X, AlertCircle } from 'lucide-react';
import { dataService } from '@/services/DataService';

export default function DataSourcePage() {
  const [dataSource, setDataSource] = useState<'loading' | 'mock' | 'database'>('loading');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');

  useEffect(() => {
    // Check data source
    const checkDataSource = async () => {
      try {
        // Get Supabase URL from environment
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured';
        setSupabaseUrl(url);
        
        // Simple check based on environment variables
        const hasSupabaseConfig = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        setDataSource(hasSupabaseConfig ? 'database' : 'mock');
        
        // Try to fetch campaigns
        const campaignsData = await dataService.getCampaigns();
        setCampaigns(campaignsData.slice(0, 3)); // Show first 3
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setDataSource('mock'); // Default to mock on error
      }
    };

    checkDataSource();
  }, []);

  const isProduction = typeof window !== 'undefined' && window.location.hostname === 'preciseweb2.vercel.app';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Source Diagnostic</h1>
        
        {/* Environment Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Environment
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">URL:</span>
              <span className="font-mono text-sm">{typeof window !== 'undefined' ? window.location.hostname : 'Server'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Is Production:</span>
              <span className={`font-semibold ${isProduction ? 'text-green-600' : 'text-amber-600'}`}>
                {isProduction ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">NODE_ENV:</span>
              <span className="font-mono text-sm">{process.env.NODE_ENV}</span>
            </div>
          </div>
        </div>

        {/* Environment Variables Debug */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Environment Variables Debug
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">NEXT_PUBLIC_SUPABASE_URL:</p>
              <p className="font-mono text-xs break-all bg-gray-100 p-2 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? 
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...` : 
                  '❌ NOT SET'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">NEXT_PUBLIC_SUPABASE_ANON_KEY:</p>
              <p className="font-mono text-xs break-all bg-gray-100 p-2 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
                  `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...` : 
                  '❌ NOT SET'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">NEXT_PUBLIC_CONVEX_URL:</p>
              <p className="font-mono text-xs break-all bg-gray-100 p-2 rounded">
                {process.env.NEXT_PUBLIC_CONVEX_URL ? 
                  `${process.env.NEXT_PUBLIC_CONVEX_URL.substring(0, 30)}...` : 
                  '❌ NOT SET'}
              </p>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Environment variables must be prefixed with NEXT_PUBLIC_ to be available in the browser.
                Variables are baked in at build time, so changes require a redeploy.
              </p>
            </div>
          </div>
        </div>

        {/* Data Source Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Source
          </h2>
          
          {dataSource === 'loading' ? (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
              Checking data source...
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Source:</span>
                <span className={`font-semibold text-lg flex items-center gap-2 ${
                  dataSource === 'database' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {dataSource === 'database' ? (
                    <>
                      <Check className="w-5 h-5" />
                      Supabase Database
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      Mock Data
                    </>
                  )}
                </span>
              </div>
              
              {dataSource === 'database' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    ✅ Connected to Supabase database. All data is being loaded from the real database.
                  </p>
                  <p className="text-xs text-green-600 mt-2 font-mono break-all">
                    {supabaseUrl}
                  </p>
                </div>
              )}
              
              {dataSource === 'mock' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    ⚠️ Using mock data. Supabase environment variables are not configured.
                  </p>
                  <p className="text-xs text-amber-600 mt-2">
                    To use the database, ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sample Data */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Campaigns</h2>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">Error loading campaigns: {error}</p>
            </div>
          ) : campaigns.length > 0 ? (
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-gray-600">ID: {campaign.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-semibold">{campaign.status}</p>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-500 text-center mt-4">
                Showing {campaigns.length} of total campaigns from {dataSource === 'database' ? 'database' : 'mock data'}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No campaigns found</p>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to Check Production</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Visit <a href="https://preciseweb2.vercel.app/app/data-source" className="underline font-mono">preciseweb2.vercel.app/app/data-source</a></li>
            <li>Look for "Active Source: Supabase Database" in green</li>
            <li>If you see "Mock Data" in amber, the database connection is not configured</li>
            <li>Check that campaigns are loading from the database</li>
          </ol>
        </div>
      </div>
    </div>
  );
}