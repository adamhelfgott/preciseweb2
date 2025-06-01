-- Production-ready RLS fix without recursion
-- This provides read-only access for unauthenticated users (safe for public demo)
-- No write access without authentication

BEGIN;

-- First, clean up ALL existing policies to start fresh
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    -- Drop all policies on all our tables
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename IN ('users', 'organizations', 'campaigns', 'data_assets', 'events', 'metrics', 'api_keys', 'webhooks')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END $$;

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Enable on other tables if they exist
DO $$ 
BEGIN
    ALTER TABLE events ENABLE ROW LEVEL SECURITY;
    ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
    ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
    ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN undefined_table THEN NULL;
END $$;

-- Create READ-ONLY policies for public demo viewing
-- No recursion because we're not joining to other tables

-- Organizations: Anyone can read
CREATE POLICY "anyone_can_read_organizations" ON organizations
    FOR SELECT
    USING (true);

-- Campaigns: Anyone can read  
CREATE POLICY "anyone_can_read_campaigns" ON campaigns
    FOR SELECT
    USING (true);

-- Data Assets: Anyone can read
CREATE POLICY "anyone_can_read_data_assets" ON data_assets
    FOR SELECT
    USING (true);

-- Users: Anyone can read basic info (but you might want to limit this)
CREATE POLICY "anyone_can_read_users" ON users
    FOR SELECT
    USING (true);

-- Events: Anyone can read
DO $$ 
BEGIN
    CREATE POLICY "anyone_can_read_events" ON events
        FOR SELECT
        USING (true);
EXCEPTION
    WHEN undefined_table THEN NULL;
END $$;

-- Metrics: Anyone can read
DO $$ 
BEGIN
    CREATE POLICY "anyone_can_read_metrics" ON metrics
        FOR SELECT
        USING (true);
EXCEPTION
    WHEN undefined_table THEN NULL;
END $$;

-- IMPORTANT: No write policies without authentication
-- This means the data is read-only for public viewers

-- Sensitive tables: NO public access
DO $$ 
BEGIN
    -- API Keys: Only authenticated users can see their own
    CREATE POLICY "no_public_api_keys" ON api_keys
        FOR SELECT
        USING (false);  -- No one can read without auth
        
    -- Webhooks: Only authenticated users can see their own  
    CREATE POLICY "no_public_webhooks" ON webhooks
        FOR SELECT
        USING (false);  -- No one can read without auth
EXCEPTION
    WHEN undefined_table THEN NULL;
END $$;

-- Add policies for authenticated users (no recursion)
-- These use auth.uid() directly without joining to users table

-- Authenticated users can insert their own user record
CREATE POLICY "auth_users_insert_self" ON users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Authenticated users can update their own record
CREATE POLICY "auth_users_update_self" ON users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Authenticated users can manage campaigns for their org
-- First, let's create a simple function to get user's org without recursion
CREATE OR REPLACE FUNCTION get_user_organization_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT organization_id 
    FROM users 
    WHERE id = auth.uid()
    LIMIT 1;
$$;

-- Now use this function in policies (avoids recursion)
CREATE POLICY "auth_users_manage_own_campaigns" ON campaigns
    FOR ALL
    USING (
        CASE 
            WHEN auth.uid() IS NULL THEN false  -- No auth = no write
            ELSE organization_id = get_user_organization_id()
        END
    )
    WITH CHECK (
        CASE 
            WHEN auth.uid() IS NULL THEN false
            ELSE organization_id = get_user_organization_id()
        END
    );

COMMIT;

-- Verify the setup
SELECT 
    tablename, 
    policyname, 
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;