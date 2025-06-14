# Convex Environment Configuration

## Development Environment
- **Database**: Cloud Dev (peaceful-monitor-946)
- **URL**: https://peaceful-monitor-946.convex.cloud
- **Used for**: Local development and testing

## Production Environment
- **Database**: Production (perceptive-pelican-227)
- **URL**: https://perceptive-pelican-227.convex.cloud
- **Used for**: Live production deployment

## Configuration Files

### Local Development (.env.local)
```
NEXT_PUBLIC_CONVEX_URL=https://peaceful-monitor-946.convex.cloud
```

### Production (Set in Vercel Environment Variables)
```
NEXT_PUBLIC_CONVEX_URL=https://perceptive-pelican-227.convex.cloud
```

## Backup Commands

### Development Database
```bash
npx convex export --deployment peaceful-monitor-946 --path backups/dev_backup_$(date +%Y%m%d_%H%M%S).zip
```

### Production Database
```bash
npx convex export --deployment perceptive-pelican-227 --path backups/prod_backup_$(date +%Y%m%d_%H%M%S).zip
```