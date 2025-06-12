export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy'

// For demo mode, we'll use dummy values and let components fall back to hardcoded content
export const isDemoMode = projectId === 'dummy' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
