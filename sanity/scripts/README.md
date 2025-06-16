# Sanity Seed Scripts

This directory contains scripts to populate your Sanity Studio with content from the website.

## Running the Comprehensive Seed

The `comprehensive-seed.ts` script will populate your Sanity Studio with all the content from the Precise website, including:

- Hero sections
- Navigation links
- Footer content
- Team members
- Case studies
- Value propositions
- Benefits sections
- Process steps
- FAQs
- Testimonials
- And more!

### Prerequisites

1. Make sure you're in the root project directory (not the sanity directory)
2. Ensure your Sanity Studio is running locally
3. Make sure you have the correct environment variables set

### How to Run

From the root project directory, run:

```bash
# Install dependencies if you haven't already
npm install

# Run the seed script
cd sanity && npx tsx scripts/comprehensive-seed.ts

# Or use the runner script
cd sanity && node scripts/run-seed.js
```

### What It Does

1. **Clears existing data** - The script will first clear any existing data of the types it's about to create
2. **Creates all content** - It will then create all the content documents with proper relationships and keys
3. **Logs progress** - You'll see success/failure messages for each document created

### Important Notes

- The script uses placeholder image references (like `image-placeholder-walmart`). You'll need to upload actual images to Sanity and update these references
- All array items include `_key` properties to avoid the "missing keys" error
- The script is idempotent - you can run it multiple times safely

### Troubleshooting

If you get errors:

1. Check that your Sanity Studio is running
2. Verify your environment variables are set correctly
3. Make sure you're running from the correct directory
4. Check the console output for specific error messages

### Next Steps

After running the seed:

1. Open Sanity Studio and verify all content was created
2. Upload actual images and update the image references
3. Test that the website is now pulling content from Sanity
4. Customize content as needed in the Studio