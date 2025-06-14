#!/bin/bash

# Create timestamp for backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "Creating database backups at timestamp: $TIMESTAMP"

# Create backup directory
mkdir -p backups

# Backup development database (peaceful-monitor-946)
echo "Backing up development database (peaceful-monitor-946)..."
npx convex export --deployment-name peaceful-monitor-946 --path backups/dev_backup_${TIMESTAMP}.zip --include-file-storage

# Backup production database (perceptive-pelican-227)
echo "Backing up production database (perceptive-pelican-227)..."
npx convex export --deployment-name perceptive-pelican-227 --path backups/prod_backup_${TIMESTAMP}.zip --include-file-storage

echo "Backups completed!"
echo "Development backup: backups/dev_backup_${TIMESTAMP}.zip"
echo "Production backup: backups/prod_backup_${TIMESTAMP}.zip"