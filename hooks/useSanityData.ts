import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { isDemoMode } from '@/sanity/env';

export function useSanityData<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // In demo mode, immediately return null data to use fallbacks
      if (isDemoMode || process.env.NEXT_PUBLIC_MOCK_MODE === 'true') {
        setData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await client.fetch(query, params || {});
        setData(result);
      } catch (err) {
        // Silently fail for dummy Sanity URLs
        if (err instanceof Error && err.message.includes('dummy.apicdn.sanity.io')) {
          setData(null);
        } else {
          setError(err as Error);
          console.error('Sanity fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}