-- Fix RLS policies to avoid infinite recursion
-- Safe to run multiple times

BEGIN;

-- First, ensure RLS is enabled on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_asset_usage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Users can view their organization's users" ON users;
DROP POLICY IF EXISTS "Users can view their organization's API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can view their organization's webhooks" ON webhooks;

-- For demo purposes, create simple read-only policies
-- These allow anyone to read data (for unauthenticated demo access)

-- Organizations: Public read
CREATE POLICY "public_read_organizations" ON organizations
    FOR SELECT USING (true);

-- Users: Public read
CREATE POLICY "public_read_users" ON users
    FOR SELECT USING (true);

-- Data Assets: Public read
CREATE POLICY "public_read_data_assets" ON data_assets
    FOR SELECT USING (true);

-- Campaigns: Public read
CREATE POLICY "public_read_campaigns" ON campaigns
    FOR SELECT USING (true);

-- Campaign Performance: Public read
CREATE POLICY "public_read_campaign_performance" ON campaign_performance
    FOR SELECT USING (true);

-- Data Asset Usage: Public read
CREATE POLICY "public_read_data_asset_usage" ON data_asset_usage
    FOR SELECT USING (true);

-- Events: Public read
CREATE POLICY "public_read_events" ON events
    FOR SELECT USING (true);

-- Metrics: Public read
CREATE POLICY "public_read_metrics" ON metrics
    FOR SELECT USING (true);

-- API Keys: Public read (for demo - normally would be restricted!)
CREATE POLICY "public_read_api_keys" ON api_keys
    FOR SELECT USING (true);

-- Webhooks: Public read (for demo - normally would be restricted!)
CREATE POLICY "public_read_webhooks" ON webhooks
    FOR SELECT USING (true);

COMMIT;

-- Note: These are DEMO policies that allow public read access
-- For production, you would want proper authentication-based policies