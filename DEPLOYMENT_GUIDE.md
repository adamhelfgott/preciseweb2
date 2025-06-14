# Precise Deployment Guide to Vercel

## Prerequisites
- Vercel account
- Git repository with your code
- Convex database already set up

## Environment Variables Required

Create these in your Vercel project settings:

```bash
# Convex Database URL (Required)
NEXT_PUBLIC_CONVEX_URL=https://peaceful-monitor-946.convex.cloud

# OpenAI API Key for AI Assistant (Required)
OPENAI_API_KEY=sk-your-openai-api-key

# Optional: If you want to specify which Convex deployment to use
CONVEX_DEPLOYMENT=dev:peaceful-monitor-946
```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `preciseweb2`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables (see above)
6. Deploy!

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# In your project directory
cd preciseweb2

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: Choose your account
# - Link to existing project: N
# - Project name: precise-db-backend (or your choice)
# - Directory: ./ (current directory)
# - Override settings: N

# Add environment variables
vercel env add NEXT_PUBLIC_CONVEX_URL
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

## Post-Deployment Setup

### 1. Verify Convex Connection

Your app should automatically connect to your Convex database at:
`https://peaceful-monitor-946.convex.cloud`

### 2. Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Environment-Specific Deployments

For different environments (staging, production):

```bash
# Create vercel.production.json
{
  "env": {
    "NEXT_PUBLIC_CONVEX_URL": "https://your-production-convex.convex.cloud",
    "CONVEX_DEPLOYMENT": "prod:your-production-deployment"
  }
}

# Deploy with specific config
vercel --prod -c vercel.production.json
```

## Important Notes

### Build Configuration

Your `package.json` build script already includes Convex codegen:
```json
"build": "npx convex codegen && next build"
```

This ensures Convex types are generated before the Next.js build.

### Convex Authentication

The app uses Convex for real-time data. Make sure your Convex deployment has:
- User authentication tables set up
- Proper indexes configured
- Initial data migrated

### Monitoring

After deployment:
1. Check Vercel Functions logs for any API errors
2. Monitor Convex dashboard for database performance
3. Set up alerts for error rates

## Troubleshooting

### Common Issues

1. **Build Fails with Convex Error**
   - Ensure `NEXT_PUBLIC_CONVEX_URL` is set correctly
   - Check that Convex deployment is accessible

2. **OpenAI API Not Working**
   - Verify `OPENAI_API_KEY` is set and valid
   - Check API usage limits

3. **Type Errors During Build**
   - Run `npx convex codegen` locally
   - Commit generated files in `convex/_generated/`

### Debug Commands

```bash
# Check environment variables
vercel env ls

# View build logs
vercel logs

# Redeploy
vercel --force
```

## Security Checklist

- [ ] Environment variables are set in Vercel (not committed to repo)
- [ ] Convex deployment has proper security rules
- [ ] API routes are protected where needed
- [ ] CORS settings are configured if needed
- [ ] Rate limiting is in place for API endpoints

## Performance Optimization

1. **Enable Vercel Analytics**:
   ```bash
   npm i @vercel/analytics
   ```

2. **Image Optimization**: 
   - Already using Next.js Image component
   - Vercel automatically optimizes images

3. **Edge Functions**:
   - AI chat endpoint could benefit from Edge Runtime
   - Consider for latency-sensitive operations

## Support

- Vercel Docs: https://vercel.com/docs
- Convex Docs: https://docs.convex.dev
- Next.js Docs: https://nextjs.org/docs