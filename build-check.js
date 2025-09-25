// Build verification script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking TypeScript compilation...');

try {
  // Check if all TypeScript files compile without errors
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation successful');
  
  // Check if all required files exist
  const requiredFiles = [
    'src/contexts/InstallContext.tsx',
    'src/components/InstallButton.tsx',
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'public/manifest.json',
    'public/sw.js'
  ];
  
  console.log('🔍 Checking required files...');
  requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      console.log(`✅ ${file} exists`);
    } else {
      console.error(`❌ ${file} missing`);
      process.exit(1);
    }
  });
  
  console.log('🎉 All checks passed! Ready for Vercel deployment.');
  
} catch (error) {
  console.error('❌ Build check failed:', error.message);
  process.exit(1);
}