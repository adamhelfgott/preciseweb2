import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Mock users that match the AuthContext
const MOCK_USERS = [
  {
    id: "user_1",
    email: "dataowner@demo.com",
    name: "Sarah Chen",
    role: "DATA_OWNER" as const,
    company: "FitnessCo",
    onboardingCompleted: true,
  },
  {
    id: "user_2",
    email: "mediabuyer@demo.com",
    name: "Michael Rodriguez",
    role: "MEDIA_BUYER" as const,
    company: "Nike",
    onboardingCompleted: true,
  },
];

export const initializeMockUsers = action({
  args: {},
  handler: async (ctx) => {
    console.log("Initializing mock users...");
    
    const createdUsers: Array<{user: typeof MOCK_USERS[0], convexId: any}> = [];
    
    // Create or update each mock user
    for (const mockUser of MOCK_USERS) {
      try {
        const convexId = await ctx.runMutation(api.auth.saveUser, {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          company: mockUser.company,
          onboardingCompleted: mockUser.onboardingCompleted,
        });
        
        createdUsers.push({ user: mockUser, convexId });
        console.log(`✓ Synced user: ${mockUser.email}`);
      } catch (error) {
        console.error(`Failed to sync user ${mockUser.email}:`, error);
      }
    }
    
    // Create demo data for each user
    console.log("Creating demo data for users...");
    
    for (const { user, convexId } of createdUsers) {
      try {
        if (user.role === "DATA_OWNER") {
          // Create some data assets for the data owner
          const assets = [
            { name: "Customer Purchase History", type: "behavioral", recordCount: 2500000, updateFrequency: 6 },
            { name: "Email Engagement Data", type: "engagement", recordCount: 1800000, updateFrequency: 12 },
            { name: "Website Analytics", type: "first_party", recordCount: 950000, updateFrequency: 24 },
          ];
          
          for (const asset of assets) {
            await ctx.runMutation(api.dataAssets.createDataAsset, {
              ownerId: convexId,
              name: asset.name,
              type: asset.type,
              recordCount: asset.recordCount,
              updateFrequency: asset.updateFrequency,
            });
          }
          console.log(`✓ Created data assets for ${user.email}`);
          
        } else if (user.role === "MEDIA_BUYER") {
          // Create a demo campaign for the media buyer
          const campaignId = await ctx.runMutation(api.campaigns.createCampaign, {
            buyerId: convexId,
            name: "Q4 Holiday Campaign",
            targetCAC: 45,
            ltv: 140,
            dsps: ["GoogleAds", "Meta", "Amazon"],
          });
          console.log(`✓ Created campaign for ${user.email}`);
          
          // Create demo creatives for the campaign
          const creatives = [
            { name: "Holiday Hero Banner", type: "image" as const, format: "728x90" },
            { name: "Gift Guide Carousel", type: "carousel" as const, format: "1080x1080" },
            { name: "Brand Story Video", type: "video" as const, format: "16:9" },
            { name: "Native Gift Recommendations", type: "native" as const, format: "1200x628" },
          ];
          
          for (const creative of creatives) {
            await ctx.runMutation(api.creatives.createCreative, {
              campaignId,
              buyerId: convexId,
              name: creative.name,
              type: creative.type,
              format: creative.format,
            });
          }
          console.log(`✓ Created creatives for campaign`);
        }
      } catch (error) {
        console.error(`Failed to create demo data for ${user.email}:`, error);
      }
    }
    
    return { 
      success: true, 
      usersCreated: createdUsers.length,
      message: "Mock users and demo data initialized successfully" 
    };
  },
});