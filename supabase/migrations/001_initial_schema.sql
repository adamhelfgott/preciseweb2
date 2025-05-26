-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Organizations (Companies using Precise)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('data_owner', 'media_buyer', 'both')),
    properties JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (with flexible roles)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'data_owner', 'media_buyer', 'analyst')),
    properties JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Data Assets (flexible schema for any data type)
CREATE TABLE data_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    asset_type TEXT NOT NULL, -- 'audience', 'behavioral', 'location', 'custom'
    status TEXT DEFAULT 'active',
    properties JSONB DEFAULT '{}', -- Flexible fields: size, quality_score, categories, etc.
    metadata JSONB DEFAULT '{}', -- Technical metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns (flexible for different campaign types)
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    campaign_type TEXT NOT NULL, -- 'standard', 'programmatic', 'social', etc.
    properties JSONB DEFAULT '{}', -- Budget, targeting, creatives, etc.
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Universal Events Table (for extensibility)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL, -- 'impression', 'click', 'conversion', 'data_usage', etc.
    entity_type TEXT NOT NULL, -- 'campaign', 'data_asset', 'user', etc.
    entity_id UUID NOT NULL,
    actor_id UUID, -- Who triggered this event
    properties JSONB DEFAULT '{}', -- All event-specific data
    metadata JSONB DEFAULT '{}', -- Technical metadata
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX idx_events_entity ON events(entity_type, entity_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created ON events(created_at DESC);
CREATE INDEX idx_events_properties ON events USING GIN(properties);

-- Metrics Time Series (for any metric type)
CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_type TEXT NOT NULL, -- 'revenue', 'impressions', 'ctr', 'attribution_value', etc.
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    value DECIMAL,
    properties JSONB DEFAULT '{}', -- Additional metric data
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_metrics_entity ON metrics(entity_type, entity_id);
CREATE INDEX idx_metrics_type_time ON metrics(metric_type, timestamp DESC);

-- Relationships (many-to-many associations)
CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    relationship_type TEXT NOT NULL, -- 'campaign_uses_asset', 'user_manages_campaign', etc.
    source_type TEXT NOT NULL,
    source_id UUID NOT NULL,
    target_type TEXT NOT NULL,
    target_id UUID NOT NULL,
    properties JSONB DEFAULT '{}', -- Relationship-specific data
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(relationship_type, source_type, source_id, target_type, target_id)
);

CREATE INDEX idx_relationships_source ON relationships(source_type, source_id);
CREATE INDEX idx_relationships_target ON relationships(target_type, target_id);

-- Transactions (flexible financial records)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_type TEXT NOT NULL, -- 'data_usage', 'payment', 'credit', etc.
    from_entity_type TEXT,
    from_entity_id UUID,
    to_entity_type TEXT,
    to_entity_id UUID,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    properties JSONB DEFAULT '{}', -- Line items, fees, etc.
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Permissions (flexible permission system)
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_type TEXT NOT NULL,
    resource_id UUID,
    actor_type TEXT NOT NULL,
    actor_id UUID NOT NULL,
    permission TEXT NOT NULL, -- 'read', 'write', 'delete', 'use', etc.
    conditions JSONB DEFAULT '{}', -- Time-based, usage limits, etc.
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

CREATE INDEX idx_permissions_actor ON permissions(actor_type, actor_id);
CREATE INDEX idx_permissions_resource ON permissions(resource_type, resource_id);

-- Audit Log (track all changes)
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL, -- 'insert', 'update', 'delete'
    old_data JSONB,
    new_data JSONB,
    user_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_table_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);

-- Helper function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to relevant tables
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_data_assets_updated_at BEFORE UPDATE ON data_assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_relationships_updated_at BEFORE UPDATE ON relationships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log(table_name, record_id, action, new_data, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW), current_setting('app.current_user_id', true)::UUID);
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log(table_name, record_id, action, old_data, new_data, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW), current_setting('app.current_user_id', true)::UUID);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log(table_name, record_id, action, old_data, user_id)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD), current_setting('app.current_user_id', true)::UUID);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers
CREATE TRIGGER audit_organizations AFTER INSERT OR UPDATE OR DELETE ON organizations
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER audit_data_assets AFTER INSERT OR UPDATE OR DELETE ON data_assets
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER audit_campaigns AFTER INSERT OR UPDATE OR DELETE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Create views for common queries
CREATE VIEW campaign_performance AS
SELECT 
    c.id,
    c.name,
    c.organization_id,
    c.properties,
    COALESCE(
        (SELECT SUM(value) FROM metrics 
         WHERE entity_type = 'campaign' AND entity_id = c.id 
         AND metric_type = 'impressions' 
         AND timestamp > NOW() - INTERVAL '30 days'),
        0
    ) as impressions_30d,
    COALESCE(
        (SELECT SUM(value) FROM metrics 
         WHERE entity_type = 'campaign' AND entity_id = c.id 
         AND metric_type = 'revenue' 
         AND timestamp > NOW() - INTERVAL '30 days'),
        0
    ) as revenue_30d
FROM campaigns c;

-- Create view for data asset usage
CREATE VIEW data_asset_usage AS
SELECT 
    da.id,
    da.name,
    da.organization_id,
    da.properties,
    COUNT(DISTINCT r.source_id) as active_campaigns,
    COALESCE(
        (SELECT SUM(amount) FROM transactions 
         WHERE to_entity_type = 'data_asset' AND to_entity_id = da.id 
         AND transaction_type = 'data_usage' 
         AND created_at > NOW() - INTERVAL '30 days'),
        0
    ) as revenue_30d
FROM data_assets da
LEFT JOIN relationships r ON r.target_type = 'data_asset' AND r.target_id = da.id 
    AND r.relationship_type = 'campaign_uses_asset'
GROUP BY da.id;

-- Row Level Security Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (to be expanded based on requirements)
CREATE POLICY "Users can view their organization" ON users
    FOR SELECT USING (auth.uid() = id OR organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's data" ON data_assets
    FOR SELECT USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's campaigns" ON campaigns
    FOR SELECT USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));