# Sanity Content Troubleshooting

## ✅ Content Status
Your content is successfully in Sanity! Verification shows:
- **44 total documents** in the production dataset
- Hero Sections: 3
- Value Propositions: 8
- Navigation Links: 6
- Page Content: 2
- Team Members: 11
- Feature Benefits: 4

## 🔍 Quick Fixes

### 1. Force Refresh Studio
```bash
# Option 1: Hard refresh in browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Option 2: Clear Next.js cache and restart
rm -rf .next
npm run dev
```

### 2. Direct Studio Links
Try these direct links to specific content types:
- http://localhost:3000/studio/desk/heroSection
- http://localhost:3000/studio/desk/valueProposition
- http://localhost:3000/studio/desk/teamMember

### 3. Check Login Status
In the Studio, click your avatar (top right) and verify:
- Project: preciseweb
- Dataset: production

### 4. Test Content on Frontend
Visit these pages to see if content is loading from Sanity:
- http://localhost:3000/cms-example
- http://localhost:3000 (homepage should show CMS content)

## 🛠 Debug Commands

```bash
# Verify content again
npx tsx scripts/verify-sanity-content.ts

# Check a specific document
npx tsx -e "
import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'qjy49msn',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
});
client.fetch('*[_type == \"heroSection\"][0]').then(console.log);
"
```

## 📝 Manual Studio URL
If the Studio route isn't working, you can also access it directly:
https://qjy49msn.sanity.studio/

## 🎯 Branch Status
- Current branch: **demo-ux-only** ✅
- All changes are on this branch
- Content is in the production dataset

## Next Steps
1. The content IS there - it's just a display issue
2. Most likely needs a browser refresh or cache clear
3. If still issues, try logging out/in to Sanity