import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, isDemoMode } from '../env'

// In demo mode, create a client that won't make real requests
export const client = isDemoMode ? {
  fetch: async () => null,
  config: () => ({ projectId, dataset, apiVersion }),
  withConfig: () => client,
} as any : createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
