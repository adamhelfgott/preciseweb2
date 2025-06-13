# Convex Setup Instructions

## Phase 1 Mock Authentication Integration ✅

### 1. Install Convex CLI and Setup Project ✅

```bash
# Install Convex CLI globally (if not already installed)
npm install -g convex

# Login to Convex
npx convex login

# Initialize Convex in the project
npx convex init
```

When prompted:
- Choose "Create a new project"
- Enter a project name (e.g., "precise-ai-demo")
- The CLI will create a `.env.local` file with your `NEXT_PUBLIC_CONVEX_URL`

**Status**: ✅ Completed - Convex is deployed at `peaceful-monitor-946`

### 2. Deploy the Schema and Functions ✅

```bash
# Deploy to development
npx convex dev

# This will:
# - Create the database schema
# - Deploy all functions
# - Watch for changes
```

**Status**: ✅ Completed - All functions deployed successfully

### 3. Initialize Mock Users ✅

After Convex is running, open another terminal and run:

```bash
# Initialize mock users and demo data
npx convex run initializeMockUsers:initializeMockUsers
```

This will create:
- Two mock users (Sarah Chen - Data Owner, Michael Rodriguez - Media Buyer)
- Demo campaigns, data assets, and earnings

**Status**: ✅ Completed - Mock users and demo data created:
- dataowner@demo.com (Sarah Chen) with 3 data assets
- mediabuyer@demo.com (Michael Rodriguez) with 1 campaign

### 4. Test the Integration

1. Start the Next.js app:
```bash
npm run dev -- -p 3002
```

2. Visit http://localhost:3002/signin

3. Login with mock credentials:
   - Email: `dataowner@demo.com` / Password: `demo123`
   - Email: `mediabuyer@demo.com` / Password: `demo123`

4. Verify that:
   - Login syncs the user to Convex
   - AI Assistant chat messages persist
   - User data is stored in Convex

### 5. Verify Mock User Persistence

Check the Convex dashboard:
1. Go to https://dashboard.convex.dev
2. Select your project
3. Navigate to Data → users table
4. You should see the mock users with their `mockId` field

## What's Working Now

✅ Mock users sync to Convex on login
✅ User persistence with mock IDs
✅ AI Assistant chat history saved to Convex
✅ Schema supports all planned features
✅ Demo data initialization

## Next Steps (Phase 2)

- Migrate Campaigns page to use Convex queries
- Migrate Earnings page to use Convex queries
- Migrate Assets page to use Convex queries
- Enable real-time updates for live features

## Troubleshooting

### "Cannot find module 'convex/react'"
Run `npm install` to ensure all dependencies are installed.

### "Invalid environment variables"
Make sure your `.env.local` has:
```
NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
```

### "Unauthorized" errors
The mock users need to be synced first. Run the initialization script.