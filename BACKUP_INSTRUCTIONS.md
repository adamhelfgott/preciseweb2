# Database Backup Instructions

Since Convex requires authentication, please follow these steps to backup your databases:

## Option 1: Using Convex Dashboard (Recommended)

1. Go to https://dashboard.convex.dev
2. Log in to your account

### For Development Database (peaceful-monitor-946):
1. Select the "peaceful-monitor-946" project
2. Go to the "Data" tab
3. Click "Export" button in the top right
4. Save the file as: `backups/dev_backup_YYYYMMDD_HHMMSS.zip`

### For Production Database (perceptive-pelican-227):
1. Select the "perceptive-pelican-227" project
2. Go to the "Data" tab
3. Click "Export" button in the top right
4. Save the file as: `backups/prod_backup_YYYYMMDD_HHMMSS.zip`

## Option 2: Using CLI (Requires Authentication)

1. First authenticate with Convex:
```bash
npx convex login
```

2. Then run the backup script:
```bash
./backup-databases.sh
```

## Current Timestamp
Use this timestamp for your backups: `20250614_170526`

So your files should be named:
- `backups/dev_backup_20250614_170526.zip`
- `backups/prod_backup_20250614_170526.zip`