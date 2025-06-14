/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as assetHealth from "../assetHealth.js";
import type * as attribution from "../attribution.js";
import type * as audienceInsights from "../audienceInsights.js";
import type * as audienceOverlap from "../audienceOverlap.js";
import type * as auth from "../auth.js";
import type * as budgetReallocation from "../budgetReallocation.js";
import type * as buyerRequests from "../buyerRequests.js";
import type * as campaigns from "../campaigns.js";
import type * as chat from "../chat.js";
import type * as competitive from "../competitive.js";
import type * as creatives from "../creatives.js";
import type * as crossChannel from "../crossChannel.js";
import type * as customAttribution from "../customAttribution.js";
import type * as dataAssets from "../dataAssets.js";
import type * as dataEnhancement from "../dataEnhancement.js";
import type * as dataMapping_luigiSportsTeamCampaign from "../dataMapping/luigiSportsTeamCampaign.js";
import type * as dspPerformance from "../dspPerformance.js";
import type * as earnings from "../earnings.js";
import type * as incrementality from "../incrementality.js";
import type * as initializeMockUsers from "../initializeMockUsers.js";
import type * as marketBenchmarking from "../marketBenchmarking.js";
import type * as marketplace from "../marketplace.js";
import type * as migrations_executeSportsCampaignMigration from "../migrations/executeSportsCampaignMigration.js";
import type * as migrations_migrateMediaBuyerCampaigns from "../migrations/migrateMediaBuyerCampaigns.js";
import type * as migrations_sportsCampaignMigrationPlan from "../migrations/sportsCampaignMigrationPlan.js";
import type * as recommendations from "../recommendations.js";
import type * as regional from "../regional.js";
import type * as simulations from "../simulations.js";
import type * as testMigration from "../testMigration.js";
import type * as usageAnalytics from "../usageAnalytics.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  assetHealth: typeof assetHealth;
  attribution: typeof attribution;
  audienceInsights: typeof audienceInsights;
  audienceOverlap: typeof audienceOverlap;
  auth: typeof auth;
  budgetReallocation: typeof budgetReallocation;
  buyerRequests: typeof buyerRequests;
  campaigns: typeof campaigns;
  chat: typeof chat;
  competitive: typeof competitive;
  creatives: typeof creatives;
  crossChannel: typeof crossChannel;
  customAttribution: typeof customAttribution;
  dataAssets: typeof dataAssets;
  dataEnhancement: typeof dataEnhancement;
  "dataMapping/luigiSportsTeamCampaign": typeof dataMapping_luigiSportsTeamCampaign;
  dspPerformance: typeof dspPerformance;
  earnings: typeof earnings;
  incrementality: typeof incrementality;
  initializeMockUsers: typeof initializeMockUsers;
  marketBenchmarking: typeof marketBenchmarking;
  marketplace: typeof marketplace;
  "migrations/executeSportsCampaignMigration": typeof migrations_executeSportsCampaignMigration;
  "migrations/migrateMediaBuyerCampaigns": typeof migrations_migrateMediaBuyerCampaigns;
  "migrations/sportsCampaignMigrationPlan": typeof migrations_sportsCampaignMigrationPlan;
  recommendations: typeof recommendations;
  regional: typeof regional;
  simulations: typeof simulations;
  testMigration: typeof testMigration;
  usageAnalytics: typeof usageAnalytics;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
