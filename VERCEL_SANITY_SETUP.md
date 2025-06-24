# Vercel Deployment with Sanity CMS Setup

## Environment Variables Required

You need to add the following environment variables in your Vercel project settings:

### Required Variables:
1. `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID (e.g., "qjy49msn")
2. `NEXT_PUBLIC_SANITY_DATASET` - Your dataset name (typically "production")
3. `NEXT_PUBLIC_SANITY_API_VERSION` - API version (use "2025-06-01" or latest)

### Steps to Configure in Vercel:

1. **Go to your Vercel Dashboard**
   - Navigate to your project
   - Click on "Settings" tab
   - Select "Environment Variables" from the left sidebar

2. **Add the Environment Variables**
   - Click "Add Variable"
   - For each variable:
     - Key: Enter the variable name exactly as shown above
     - Value: Enter your specific value
     - Environment: Select all (Production, Preview, Development)
   - Click "Save"

3. **Get Your Sanity Values**
   - Project ID: Found in your Sanity Studio dashboard or sanity.json
   - Dataset: Usually "production" unless you've created others
   - API Version: Use today's date in format "YYYY-MM-DD"

### Example Values:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=qjy49msn
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-01
```

## CORS Configuration in Sanity

You also need to configure CORS in your Sanity project to allow your Vercel deployment to access the data:

1. **Go to manage.sanity.io**
2. **Select your project**
3. **Go to Settings → API → CORS Origins**
4. **Add your Vercel URLs:**
   - Your production domain (e.g., `https://your-app.vercel.app`)
   - Vercel preview URLs: `https://*.vercel.app`
   - Local development: `http://localhost:3000`

5. **Check "Allow credentials" for each origin**

## Deploy to Vercel

### Option 1: Automatic Deployment
Since we've pushed to the `demo-ux-only` branch, Vercel should automatically detect the changes and start a new deployment if you have automatic deployments enabled.

### Option 2: Manual Deployment
1. Go to your Vercel dashboard
2. Click on your project
3. Go to the "Deployments" tab
4. Click "Redeploy" on the latest deployment from the `demo-ux-only` branch

## Verify Deployment

After deployment:
1. Check that all pages load without errors
2. Verify that CMS content is being fetched (check browser console for any errors)
3. If content isn't showing, it will fall back to hardcoded content
4. To add content, use your Sanity Studio at `/studio` route

## Troubleshooting

### If you see "Missing environment variable" errors:
- Double-check that all environment variables are set in Vercel
- Make sure there are no typos in the variable names
- Redeploy after adding variables

### If CMS content isn't loading:
- Check CORS settings in Sanity
- Verify your Sanity project is publicly accessible
- Check browser console for any API errors
- Ensure your Sanity dataset has content

### To seed initial content:
Run these scripts locally with your Sanity environment variables:
```bash
npm run seed-sanity
```