# Manual Database Backup Process

Since Convex export requires active deployment configuration, here's how to manually backup your data:

## Option 1: Using Convex Dashboard

1. Go to your Convex Dashboard: https://dashboard.convex.dev
2. Select your project
3. Navigate to Data → Export
4. Click "Export All Tables" for both development and production deployments
5. Save the JSON files in the `backups/` directory with timestamp

## Option 2: Using Convex CLI with proper setup

1. First, ensure Convex is properly configured:
```bash
npx convex dev
```

2. Once connected, run the backup script:
```bash
./backup-databases.sh
```

## Option 3: Query and save data programmatically

Create a backup query in Convex to fetch all data from each table:

```typescript
// convex/backup.ts
import { query } from "./_generated/server";

export const backupAllData = query(async (ctx) => {
  const tables = [
    "users", "dataAssets", "earnings", "campaigns", 
    "campaignHistory", "attributions", "solutions",
    "recommendations", "dspPerformance", "chatMessages",
    "cmsContent", "contacts"
  ];
  
  const backup: any = {};
  
  for (const table of tables) {
    backup[table] = await ctx.db.query(table).collect();
  }
  
  return backup;
});
```

## Current Database State

Based on the schema, these are the tables that should be backed up:
- users
- dataAssets
- earnings
- campaigns
- campaignHistory
- attributions
- solutions
- recommendations
- dspPerformance
- chatMessages
- cmsContent
- contacts (this is the new table we're adding)

## Backup File Naming Convention

Use this format for consistency:
- Development: `backups/dev_backup_YYYYMMDD_HHMMSS.zip`
- Production: `backups/prod_backup_YYYYMMDD_HHMMSS.zip`