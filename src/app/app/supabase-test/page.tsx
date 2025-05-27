'use client';

import { useEffect, useState } from 'react';

export default function SupabaseTestPage() {
  const [results, setResults] = useState<any>({});

  useEffect(() => {
    async function testSupabase() {
      const testResults: any = {};
      
      // Test 1: Check environment variables
      testResults.envVars = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'NOT SET',
        urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      };
      
      // Test 2: Try to create Supabase client directly
      try {
        const { createBrowserClient } = await import('@supabase/ssr');
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (url && key) {
          const client = createBrowserClient(url, key);
          testResults.clientCreated = true;
          
          // Test 3: Try a simple query
          try {
            const { data, error } = await client
              .from('campaigns')
              .select('id')
              .limit(1);
              
            testResults.query = {
              success: !error,
              error: error?.message || null,
              hasData: !!data,
              dataCount: data?.length || 0
            };
          } catch (queryError) {
            testResults.query = {
              success: false,
              error: queryError instanceof Error ? queryError.message : 'Unknown error'
            };
          }
        } else {
          testResults.clientCreated = false;
          testResults.missingVars = {
            url: !url,
            key: !key
          };
        }
      } catch (clientError) {
        testResults.clientError = clientError instanceof Error ? clientError.message : 'Unknown error';
      }
      
      setResults(testResults);
    }
    
    testSupabase();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Test Results:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
      
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          This page tests the Supabase connection directly in the browser.
          Check the console for additional logs.
        </p>
      </div>
    </div>
  );
}