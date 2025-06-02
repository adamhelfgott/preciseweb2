#!/bin/bash

echo "🚨 EMERGENCY SANITY FIX - Running now..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the preciseweb2 directory!"
    echo "Please run: cd /Users/adamhelfgott/projects/preciseweb2"
    exit 1
fi

echo "✅ Step 1: Installing dependencies..."
npm install

echo "✅ Step 2: Checking for Sanity token..."
if [ -z "$SANITY_API_TOKEN" ]; then
    echo "⚠️  No Sanity token found. You need to:"
    echo "1. Go to https://www.sanity.io/manage"
    echo "2. Select your project (qjy49msn)"
    echo "3. Go to Settings > API > Tokens"
    echo "4. Create a new token with 'Editor' permissions"
    echo "5. Run: export SANITY_API_TOKEN='your-token-here'"
    echo ""
    echo "🔧 For now, you can manually add content in Sanity Studio:"
    echo "   Go to: https://preciseweb.vercel.app/studio"
else
    echo "✅ Sanity token found!"
    
    echo "✅ Step 3: Running seed scripts..."
    
    # Try different ways to run the scripts
    if command -v tsx &> /dev/null; then
        echo "Using tsx..."
        tsx scripts/seed-sanity-content-fixed.ts
    elif command -v ts-node &> /dev/null; then
        echo "Using ts-node..."
        ts-node scripts/seed-sanity-content-fixed.ts
    else
        echo "Installing tsx..."
        npm install -g tsx
        tsx scripts/seed-sanity-content-fixed.ts
    fi
fi

echo ""
echo "✅ DONE! Check your Sanity Studio at:"
echo "   https://preciseweb.vercel.app/studio"
echo ""
echo "You should now see:"
echo "  - Navigation Links"
echo "  - Hero Sections" 
echo "  - Team Members"
echo "  - Value Propositions"
echo "  - And more!"