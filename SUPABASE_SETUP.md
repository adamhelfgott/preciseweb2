# Supabase Setup Instructions

Your Supabase project is created! Here's how to set up the database:

## 1. Run the Initial Migration

Go to your Supabase SQL Editor: https://supabase.com/dashboard/project/qlgxwcmbqumygxcjoyih/sql/new

Copy and paste the entire contents of `/supabase/migrations/001_initial_schema.sql` and run it.

## 2. Run the Corrected API Keys Migration

After the first migration succeeds, run this corrected version:

```sql
-- API Keys table for secure API access
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  permissions JSONB DEFAULT '["read", "write"]',
  rate_limit_tier TEXT DEFAULT 'standard',
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhooks table for event notifications
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret_hash TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  failure_count INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_api_keys_org ON api_keys(organization_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_webhooks_org ON webhooks(organization_id);

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

-- Apply update triggers
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_webhooks_updated_at BEFORE UPDATE ON webhooks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## 3. Add Environment Variables to Vercel

Go to your Vercel project settings and add these environment variables:

**For Production (master branch):**
```
NEXT_PUBLIC_SUPABASE_URL=https://qlgxwcmbqumygxcjoyih.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZ3h3Y21icXVteWd4Y2pveWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTkwNDksImV4cCI6MjA2Mzg3NTA0OX0.F3JbSPeYs9kHL28_jbHJvbw3fcrWn95BvqPe6xcxwpo
```

**For Demo/Preview (demo-ux-only branch):**
```
NEXT_PUBLIC_MOCK_MODE=true
```

## 4. Test Locally

Your local dev environment should now connect to Supabase since we've updated `.env.local`.

Run:
```bash
npm run dev
```

The DataService will automatically detect Supabase and use real database instead of mock data.

## 5. Seed Demo Data (Optional)

Once the migrations are complete, you can run:
```bash
npm run seed:cannes
```

This will populate your database with demo campaigns for testing.