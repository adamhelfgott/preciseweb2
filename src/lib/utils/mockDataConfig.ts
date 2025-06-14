// Utility to check if mock data is enabled
// This checks if the mock data files have been disabled by the toggle script

export function isMockDataEnabled(): boolean {
  // Check if we're in development mode and mock data hasn't been explicitly disabled
  // In production, always use real data
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  // For now, we'll check if mock imports are available
  // If they've been commented out by the toggle script, this will be false
  try {
    // Try to import a mock data file to see if it's available
    const { mockCampaigns } = require('@/lib/mockData/campaigns');
    return Array.isArray(mockCampaigns) && mockCampaigns.length > 0;
  } catch {
    // If import fails or returns empty, mock data is disabled
    return false;
  }
}