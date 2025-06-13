# Convex Migration Plan for Precise.ai

## Current State Analysis

### ✅ Already Using Convex
- **AIAssistant.tsx** - Fully integrated with chat persistence
- **ConvexClientProvider.tsx** - Provides Convex context to app

### 🔄 Components Requiring Migration

#### High Priority - Core Business Logic
1. **Campaigns Page** (`app/campaigns/page.tsx`)
   - Currently: Uses `mockCampaigns` array
   - Migrate to: `useQuery(api.campaigns.getCampaigns)`
   - Dependencies: User authentication context

2. **Earnings Page** (`app/earnings/page.tsx`)
   - Currently: Uses `mockEarnings` and `generateDailyData()`
   - Migrate to: `useQuery(api.earnings.getEarnings)` and `useQuery(api.earnings.getEarningsStats)`
   - Dependencies: User authentication, data asset relationships

3. **Assets Page** (`app/assets/page.tsx`)
   - Currently: Uses `mockAssets` array
   - Migrate to: `useQuery(api.dataAssets.getDataAssets)`
   - Dependencies: User authentication

#### Medium Priority - Real-time Features
4. **Live Earnings Ticker** (`components/features/data-owner/LiveEarningsTicker.tsx`)
   - Currently: Uses `Math.random()` with intervals
   - Migrate to: Real-time subscription to earnings updates
   - Dependencies: WebSocket connection for live updates

5. **Attribution Analysis** (`components/features/media-buyer/AttributionAnalysis.tsx`)
   - Currently: Hardcoded campaign names
   - Migrate to: `useQuery(api.campaigns.getCampaigns)` for dynamic data
   - Dependencies: Campaign data

#### Low Priority - Advanced Features
6. **Creative Fatigue Alert** (`components/features/media-buyer/CreativeFatigueAlert.tsx`)
   - Currently: `mockCreatives` with random data
   - Migrate to: New Convex query for creative performance
   - Dependencies: Creative asset tracking (new schema needed)

7. **Predictive CAC Forecasting** (`components/features/media-buyer/PredictiveCACForecasting.tsx`)
   - Currently: `generateMockForecast()`
   - Migrate to: Server-side ML predictions via Convex actions
   - Dependencies: Historical campaign data

## Migration Steps

### Phase 1: Mock Authentication Integration (Week 1)
1. **Continue using mock authentication**
   ```typescript
   // Keep current: services/auth.ts with mockUsers
   // Enhance: Add user persistence in Convex for demo accounts
   ```
   
2. **Sync mock users with Convex**
   ```typescript
   // On app initialization or login
   const mockUser = getCurrentMockUser();
   await convex.mutation(api.auth.saveUser, {
     id: mockUser.id,
     email: mockUser.email,
     name: mockUser.name,
     role: mockUser.role
   });
   ```

3. **Use consistent mock user IDs**
   - All Convex queries will use the mock user ID
   - No auth token needed - just pass mock user ID
   - Keep demo users (sarah@, tom@) persistent across sessions

### Phase 2: Core Pages Migration (Week 2)
1. **Migrate Campaigns Page**
   ```typescript
   // Replace in app/campaigns/page.tsx
   const campaigns = useQuery(api.campaigns.getCampaigns);
   const createCampaign = useMutation(api.campaigns.createCampaign);
   ```

2. **Migrate Earnings Page**
   ```typescript
   // Replace in app/earnings/page.tsx
   const earnings = useQuery(api.earnings.getEarnings);
   const stats = useQuery(api.earnings.getEarningsStats);
   ```

3. **Migrate Assets Page**
   ```typescript
   // Replace in app/assets/page.tsx
   const assets = useQuery(api.dataAssets.getDataAssets);
   const createAsset = useMutation(api.dataAssets.createDataAsset);
   ```

### Phase 3: Real-time Features (Week 3)
1. **Implement WebSocket subscriptions**
   - Use Convex's real-time capabilities for live updates
   - Convert polling intervals to subscriptions

2. **Add optimistic updates**
   ```typescript
   // Example for earnings updates
   const updateEarning = useMutation(api.earnings.simulateEarning)
     .withOptimisticUpdate((localStore, args) => {
       // Update local state immediately
     });
   ```

### Phase 4: Advanced Features (Week 4)
1. **Extend Convex schema for new features**
   - Add creatives table for fatigue tracking
   - Add forecasting table for CAC predictions

2. **Implement server-side logic**
   - Move complex calculations to Convex actions
   - Add caching for expensive operations

## Database Configuration

### 1. Environment Setup
```bash
# .env.local
NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key
```

### 2. Initialize Database
```bash
npx convex dev # Development
npx convex deploy # Production
```

### 3. Seed Initial Data
```typescript
// Run in Convex dashboard or create seed script
await ctx.runMutation(api.simulations.initializeDemoData);
```

## Mock User Account Integration

### 1. Mock Authentication Flow
```typescript
// Keep existing mock auth, sync with Convex
const signIn = async (email: string, password: string) => {
  // 1. Use existing mock authentication
  const mockUser = mockUsers.find(u => u.email === email);
  if (!mockUser || mockUser.password !== password) {
    throw new Error("Invalid credentials");
  }
  
  // 2. Ensure user exists in Convex
  await convex.mutation(api.auth.saveUser, {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
    role: mockUser.role
  });
  
  // 3. Store mock user in context/localStorage
  setCurrentUser(mockUser);
  return mockUser;
};
```

### 2. Simplified Role-Based Access
```typescript
// Convex function using mock user ID
export const getCampaigns = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    // Get user from mock ID
    const user = await ctx.db.query("users")
      .filter(q => q.eq(q.field("id"), userId))
      .first();
      
    if (!user || user.role !== "MEDIA_BUYER") {
      throw new Error("Unauthorized");
    }
    
    return ctx.db.query("campaigns")
      .filter(q => q.eq(q.field("userId"), user._id))
      .collect();
  }
});
```

### 3. Data Isolation
- Each user only sees their own data
- Implement row-level security in Convex queries
- Add organization support for team collaboration

## Testing Strategy

### 1. Component Testing
```typescript
// Mock Convex hooks for testing
jest.mock("convex/react", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));
```

### 2. Integration Testing
- Test auth flow end-to-end
- Verify data isolation between users
- Test real-time updates

### 3. Performance Testing
- Monitor query performance
- Implement pagination for large datasets
- Add caching where appropriate

## Rollback Plan

### Keep mock data as fallback
```typescript
const campaigns = useQuery(api.campaigns.getCampaigns) ?? mockCampaigns;
```

### Feature flags for gradual rollout
```typescript
const useConvexData = process.env.NEXT_PUBLIC_USE_CONVEX === 'true';
```

## Success Metrics

1. **Performance**: Page load times remain under 2s
2. **Reliability**: 99.9% uptime for data queries
3. **User Experience**: No degradation in functionality
4. **Data Integrity**: Zero data loss during migration

## Timeline

- **Week 1**: Mock authentication sync with Convex
- **Week 2**: Core pages migration (Campaigns, Earnings, Assets)
- **Week 3**: Real-time features (Live ticker, Activity feeds)
- **Week 4**: Advanced features & optimization
- **Week 5**: Testing & deployment

## Next Steps

1. Set up production Convex instance
2. Sync mock users with Convex database
3. Begin Phase 1 implementation with mock auth
4. Create rollback procedures
5. Migrate core pages to use Convex queries

## Mock User Setup

### Predefined Demo Users
```typescript
// Keep these users consistent across environments
const DEMO_USERS = {
  mediaBuyer: {
    id: "mock-user-1",
    email: "sarah@acmecorp.com",
    name: "Sarah Chen",
    role: "MEDIA_BUYER"
  },
  dataOwner: {
    id: "mock-user-2", 
    email: "tom@retailco.com",
    name: "Tom Johnson",
    role: "DATA_OWNER"
  }
};
```

### Initial Data Seeding
```typescript
// Run once to seed Convex with demo data
async function seedDemoData() {
  // Create demo users
  for (const user of Object.values(DEMO_USERS)) {
    await convex.mutation(api.auth.saveUser, user);
  }
  
  // Initialize demo campaigns and assets
  await convex.action(api.simulations.initializeDemoData);
}
```