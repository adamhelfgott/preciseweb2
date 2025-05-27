-- Fix RLS policies for Supabase to avoid infinite recursion
-- This script is safe to run multiple times

-- Start transaction
BEGIN;

-- Drop all existing policies on users table to clean slate
DROP POLICY IF EXISTS "users_select_policy" ON users;
DROP POLICY IF EXISTS "users_insert_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;
DROP POLICY IF EXISTS "users_delete_policy" ON users;
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON users;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON users;

-- Drop all existing policies on campaigns table
DROP POLICY IF EXISTS "campaigns_select_policy" ON campaigns;
DROP POLICY IF EXISTS "campaigns_insert_policy" ON campaigns;
DROP POLICY IF EXISTS "campaigns_update_policy" ON campaigns;
DROP POLICY IF EXISTS "campaigns_delete_policy" ON campaigns;
DROP POLICY IF EXISTS "Enable read access for all users" ON campaigns;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON campaigns;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON campaigns;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON campaigns;

-- Drop all existing policies on earnings table
DROP POLICY IF EXISTS "earnings_select_policy" ON earnings;
DROP POLICY IF EXISTS "earnings_insert_policy" ON earnings;
DROP POLICY IF EXISTS "earnings_update_policy" ON earnings;
DROP POLICY IF EXISTS "earnings_delete_policy" ON earnings;
DROP POLICY IF EXISTS "Enable read access for all users" ON earnings;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON earnings;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON earnings;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON earnings;

-- Drop all existing policies on transactions table
DROP POLICY IF EXISTS "transactions_select_policy" ON transactions;
DROP POLICY IF EXISTS "transactions_insert_policy" ON transactions;
DROP POLICY IF EXISTS "transactions_update_policy" ON transactions;
DROP POLICY IF EXISTS "transactions_delete_policy" ON transactions;
DROP POLICY IF EXISTS "Enable read access for all users" ON transactions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON transactions;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON transactions;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON transactions;

-- Create simple, non-recursive policies for demo
-- For production, you'll want more restrictive policies

-- Users table: Allow read access for demo
CREATE POLICY "users_read_all" ON users
    FOR SELECT
    USING (true);

-- Campaigns table: Allow read access for demo
CREATE POLICY "campaigns_read_all" ON campaigns
    FOR SELECT
    USING (true);

-- Earnings table: Allow read access for demo
CREATE POLICY "earnings_read_all" ON earnings
    FOR SELECT
    USING (true);

-- Transactions table: Allow read access for demo
CREATE POLICY "transactions_read_all" ON transactions
    FOR SELECT
    USING (true);

-- For authenticated users, allow them to manage their own data (without recursion)
-- These use auth.uid() which doesn't cause recursion

-- Users table: Users can update their own record
CREATE POLICY "users_update_own" ON users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Users table: Allow authenticated users to insert their own record
CREATE POLICY "users_insert_own" ON users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Campaigns table: Users can manage their own campaigns
CREATE POLICY "campaigns_insert_own" ON campaigns
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "campaigns_update_own" ON campaigns
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "campaigns_delete_own" ON campaigns
    FOR DELETE
    USING (auth.uid() = user_id);

-- Earnings table: Users can manage their own earnings
CREATE POLICY "earnings_insert_own" ON earnings
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "earnings_update_own" ON earnings
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "earnings_delete_own" ON earnings
    FOR DELETE
    USING (auth.uid() = user_id);

-- Transactions table: Users can manage their own transactions
CREATE POLICY "transactions_insert_own" ON transactions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "transactions_update_own" ON transactions
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "transactions_delete_own" ON transactions
    FOR DELETE
    USING (auth.uid() = user_id);

-- Commit transaction
COMMIT;

-- Verify policies were created (optional)
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;