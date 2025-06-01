"use client";

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

export function useSanityData<T>(
  query: string,
  params?: Record<string, any>
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('[useSanityData] Fetching with query:', query);
        const result = await client.fetch<T>(query, params || {});
        console.log('[useSanityData] Result:', result);
        setData(result);
      } catch (err) {
        console.error('[useSanityData] Error:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}