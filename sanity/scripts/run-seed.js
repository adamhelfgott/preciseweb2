#!/usr/bin/env node

// This script runs the TypeScript seed file using tsx
const { execSync } = require('child_process');
const path = require('path');

const seedFile = path.join(__dirname, 'comprehensive-seed.ts');

console.log('🚀 Running comprehensive seed script...\n');

try {
  // Run the TypeScript file with tsx
  execSync(`npx tsx ${seedFile}`, { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('\n✅ Seed script completed successfully!');
} catch (error) {
  console.error('\n❌ Seed script failed:', error.message);
  process.exit(1);
}