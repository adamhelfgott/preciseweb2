-- Final RLS fix - only for actual tables, not views
-- This script creates permissive policies for demo access

-- Drop any problematic policies first
DO $$ 
BEGIN
    -- Drop policies if they exist
    DROP POLICY IF EXISTS "Users can view their organization's users" ON users;
    DROP POLICY IF EXISTS "Users can view their organization's API keys" ON api_keys;
    DROP POLICY IF EXISTS "Users can view their organization's webhooks" ON webhooks;
EXCEPTION
    WHEN undefined_table THEN
        NULL;
    WHEN undefined_object THEN
        NULL;
END $$;

-- Create simple public read policies for core tables
-- These are safe and won't cause recursion

-- For campaigns table
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_campaigns" ON campaigns;
CREATE POLICY "public_read_campaigns" ON campaigns FOR SELECT USING (true);

-- For organizations table
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_organizations" ON organizations;
CREATE POLICY "public_read_organizations" ON organizations FOR SELECT USING (true);

-- For users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_users" ON users;
CREATE POLICY "public_read_users" ON users FOR SELECT USING (true);

-- For data_assets table
ALTER TABLE data_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_data_assets" ON data_assets;
CREATE POLICY "public_read_data_assets" ON data_assets FOR SELECT USING (true);

-- For events table (if exists)
DO $$ 
BEGIN
    ALTER TABLE events ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_read_events" ON events;
    CREATE POLICY "public_read_events" ON events FOR SELECT USING (true);
EXCEPTION
    WHEN undefined_table THEN
        NULL;
END $$;

-- For metrics table (if exists)
DO $$ 
BEGIN
    ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_read_metrics" ON metrics;
    CREATE POLICY "public_read_metrics" ON metrics FOR SELECT USING (true);
EXCEPTION
    WHEN undefined_table THEN
        NULL;
END $$;

-- Test query to verify it works
SELECT COUNT(*) as campaign_count FROM campaigns;
SELECT 'RLS policies updated successfully - found ' || COUNT(*) || ' campaigns' as status FROM campaigns;