import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

// Mock data imports (we'll keep these for demo mode)
import { mockCampaigns } from '@/lib/mockData/campaigns';
import { mockDataAssets } from '@/lib/mockData/dataAssets';

type Campaign = Database['public']['Tables']['campaigns']['Row'] & {
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
  };
};

type DataAsset = Database['public']['Tables']['data_assets']['Row'] & {
  usage?: {
    activeCampaigns: number;
    monthlyRevenue: number;
    totalQueries: number;
  };
};

class DataServiceClient {
  private supabase: ReturnType<typeof createClient> | null = null;
  private mockMode: boolean = true;
  private initialized: boolean = false;
  
  private initialize() {
    if (this.initialized) return;
    
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      console.log('DataService: Server-side, defaulting to mock mode');
      this.mockMode = true;
      this.initialized = true;
      return;
    }
    
    // Client-side: check for Supabase config
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('DataService: Checking Supabase config...');
    console.log('URL exists:', !!url, url ? `(${url.substring(0, 30)}...)` : '');
    console.log('Key exists:', !!key, key ? `(${key.substring(0, 20)}...)` : '');
    
    if (url && key) {
      try {
        this.supabase = createClient();
        this.mockMode = false;
        console.log('DataService: Connected to Supabase (client-side)');
      } catch (error) {
        console.error('DataService: Failed to create Supabase client', error);
        this.mockMode = true;
      }
    } else {
      console.log('DataService: No Supabase config, using mock mode');
      console.log('Missing:', !url ? 'URL' : '', !key ? 'KEY' : '');
      this.mockMode = true;
    }
    
    this.initialized = true;
  }

  // Public method to check if using mock data
  isUsingMockData(): boolean {
    this.initialize();
    return this.mockMode;
  }

  // === CAMPAIGNS ===
  async getCampaigns(organizationId?: string): Promise<Campaign[]> {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      // Transform mock data to match DB schema
      return mockCampaigns.map(campaign => ({
        id: campaign.id,
        organization_id: 'mock-org-1',
        name: campaign.name,
        status: campaign.status,
        campaign_type: 'standard',
        properties: {
          budget: campaign.budget,
          spend: campaign.spend,
          platform: campaign.platform,
          audience: campaign.audience,
          creatives: campaign.creatives,
          targeting: {
            demographics: campaign.audience,
            interests: []
          }
        },
        settings: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        metrics: {
          impressions: campaign.impressions,
          clicks: campaign.clicks,
          conversions: campaign.conversions,
          spend: campaign.spend,
          revenue: campaign.conversions * campaign.conversionValue
        }
      }));
    }

    // Real Supabase query
    let query = this.supabase
      .from('campaigns')
      .select(`
        *,
        metrics:campaign_performance(*)
      `)
      .order('created_at', { ascending: false });
    
    // Only filter by organization if provided
    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }
    
    const { data: campaigns, error } = await query;

    if (error) {
      console.error('DataService: Error fetching campaigns', error);
      throw error;
    }
    
    return campaigns || [];
  }

  async updateCampaign(id: string, updates: Partial<Campaign>) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      console.log('Mock mode: Would update campaign', id, updates);
      return updates;
    }

    const { data, error } = await this.supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // === DATA ASSETS ===
  async getDataAssets(organizationId?: string): Promise<DataAsset[]> {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      return mockDataAssets.map(asset => ({
        id: asset.id,
        organization_id: 'mock-org-2',
        name: asset.name,
        asset_type: asset.type,
        status: asset.status,
        properties: {
          size: asset.size,
          quality_score: asset.qualityScore,
          categories: asset.categories,
          price_per_use: asset.pricePerUse,
          refresh_frequency: asset.refreshFrequency
        },
        metadata: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        usage: {
          activeCampaigns: asset.activeCampaigns,
          monthlyRevenue: asset.monthlyRevenue,
          totalQueries: asset.totalQueries
        }
      }));
    }

    let query = this.supabase
      .from('data_assets')
      .select(`
        *,
        usage:data_asset_usage(*)
      `)
      .order('created_at', { ascending: false });
    
    // Only filter by organization if provided
    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }
    
    const { data: assets, error } = await query;

    if (error) throw error;
    return assets || [];
  }

  // === EVENTS ===
  async trackEvent(event: {
    event_type: string;
    entity_type: string;
    entity_id: string;
    properties?: Record<string, any>;
    actor_id?: string;
  }) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      console.log('Mock mode: Would track event', event);
      return;
    }

    const { error } = await this.supabase
      .from('events')
      .insert({
        ...event,
        properties: event.properties || {},
        metadata: {
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
          timestamp: new Date().toISOString()
        }
      });

    if (error) throw error;
  }

  // === METRICS ===
  async recordMetric(metric: {
    metric_type: string;
    entity_type: string;
    entity_id: string;
    value: number;
    properties?: Record<string, any>;
  }) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      console.log('Mock mode: Would record metric', metric);
      return;
    }

    const { error } = await this.supabase
      .from('metrics')
      .insert({
        ...metric,
        properties: metric.properties || {}
      });

    if (error) throw error;
  }

  // === REAL-TIME SUBSCRIPTIONS ===
  subscribeToChanges(
    table: keyof Database['public']['Tables'],
    callback: (payload: any) => void
  ) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      // In mock mode, simulate real-time updates
      const interval = setInterval(() => {
        callback({
          eventType: 'UPDATE',
          new: { mock: true, timestamp: new Date().toISOString() }
        });
      }, 5000);

      return () => clearInterval(interval);
    }

    const subscription = this.supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        callback
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  // === ANALYTICS QUERIES ===
  async getAttributionData(campaignId: string, window: number = 30) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      // Return mock attribution data
      return {
        touchpoints: [
          { channel: 'Google Ads', value: 0.4, touchCount: 1200 },
          { channel: 'Facebook', value: 0.3, touchCount: 800 },
          { channel: 'Direct', value: 0.2, touchCount: 600 },
          { channel: 'Email', value: 0.1, touchCount: 400 }
        ],
        model: 'data-driven',
        window_days: window
      };
    }

    // Complex attribution query using our flexible schema
    const { data, error } = await this.supabase.rpc('calculate_attribution', {
      campaign_id: campaignId,
      window_days: window
    });

    if (error) throw error;
    return data;
  }

  // === BULK OPERATIONS ===
  async bulkInsertEvents(events: any[]) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      console.log('Mock mode: Would bulk insert', events.length, 'events');
      return;
    }

    const { error } = await this.supabase
      .from('events')
      .insert(events);

    if (error) throw error;
  }

  async bulkInsertMetrics(metrics: any[]) {
    this.initialize();
    
    if (this.mockMode || !this.supabase) {
      console.log('Mock mode: Would bulk insert', metrics.length, 'metrics');
      return;
    }

    const { error } = await this.supabase
      .from('metrics')
      .insert(metrics);

    if (error) throw error;
  }
}

// Export singleton instance
export const dataServiceClient = new DataServiceClient();

// Export types
export type { Campaign, DataAsset };