import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

export function useSanityData<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await client.fetch(query, params || {});
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}