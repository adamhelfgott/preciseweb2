'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { heroSectionQuery } from '@/sanity/lib/queries';

export default function DebugSanityPage() {
  const [heroData, setHeroData] = useState<any>(null);
  const [rawQuery, setRawQuery] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Test the exact query
        const result1 = await client.fetch(heroSectionQuery);
        setHeroData(result1);
        
        // Test a simpler query
        const result2 = await client.fetch(`*[_type == "heroSection" && page == "Home"][0]`);
        setRawQuery(result2);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug Sanity Query</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Hero Section Query Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(heroData, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Raw Query Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(rawQuery, null, 2)}
          </pre>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <h3 className="font-semibold mb-2">Expected vs Actual:</h3>
          <p className="text-sm">
            <strong>Expected headline:</strong> "SANITY IS WORKING - Test Update"<br/>
            <strong>Actual headline:</strong> {heroData?.headline || rawQuery?.headline || 'Not found'}
          </p>
        </div>
      </div>
    </div>
  );
}