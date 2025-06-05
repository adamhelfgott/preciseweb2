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
import type * as auth from "../auth.js";
import type * as campaigns from "../campaigns.js";
import type * as chat from "../chat.js";
import type * as cms from "../cms.js";
import type * as dataAssets from "../dataAssets.js";
import type * as earnings from "../earnings.js";
import type * as marketplace from "../marketplace.js";
import type * as recommendations from "../recommendations.js";
import type * as simulations from "../simulations.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  campaigns: typeof campaigns;
  chat: typeof chat;
  cms: typeof cms;
  dataAssets: typeof dataAssets;
  earnings: typeof earnings;
  marketplace: typeof marketplace;
  recommendations: typeof recommendations;
  simulations: typeof simulations;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
