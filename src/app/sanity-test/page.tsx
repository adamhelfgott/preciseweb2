'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

export default function SanityTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await client.fetch(`*[]{
          _id,
          _type,
          title,
          name,
          text,
          "preview": coalesce(title, name, text, headline, "No preview available")
        }`);
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading Sanity content...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sanity Content Test</h1>
      
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
        <p className="text-green-800">
          ✅ Successfully connected to Sanity!
        </p>
        <p className="text-sm text-green-600 mt-1">
          Found {data?.length || 0} documents in your dataset
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Documents:</h2>
        {data?.map((doc: any) => (
          <div key={doc._id} className="p-4 border rounded bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium text-blue-600">{doc._type}</span>
                <p className="font-medium mt-1">{doc.preview}</p>
              </div>
              <span className="text-xs text-gray-500">{doc._id}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold mb-2">Studio Access:</h3>
        <p className="text-sm">
          If you can see content here but not in the Studio:
        </p>
        <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
          <li>Hard refresh the Studio page (Cmd+Shift+R)</li>
          <li>Clear browser cache/cookies for localhost:3000</li>
          <li>Try: <a href="https://qjy49msn.sanity.studio/" target="_blank" className="text-blue-600 underline">
            https://qjy49msn.sanity.studio/
          </a></li>
        </ol>
      </div>
    </div>
  );
}