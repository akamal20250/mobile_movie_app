const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to remove directory recursively
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Clean up directories
console.log('🧹 Cleaning up project...');

// Remove node_modules
removeDir(path.join(__dirname, '../node_modules'));
console.log('✅ Removed node_modules');

// Remove .expo
removeDir(path.join(__dirname, '../.expo'));
console.log('✅ Removed .expo');

// Remove .next
removeDir(path.join(__dirname, '../.next'));
console.log('✅ Removed .next');

// Install dependencies
console.log('📦 Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });
console.log('✅ Dependencies installed');

console.log('✨ Project reset complete!'); 