import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const isDemoMode = projectId === 'dummy' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// In demo mode, create a mock client that won't make real requests
export const client = isDemoMode ? {
  fetch: async () => null,
  config: () => ({ projectId, dataset }),
  withConfig: () => client,
} as any : createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}