const fs = require('fs');
const path = require('path');

const publicDir = path.resolve('public');

function checkFile(relPath) {
  if (!relPath.startsWith('/')) return true;
  const full = path.join(publicDir, relPath);
  return fs.existsSync(full);
}

// 1. Check products in lib/data/products.ts
const productsContent = fs.readFileSync('lib/data/products.ts', 'utf8');
const imgMatches = productsContent.match(/["']\/images\/[^"']+["']/g) || [];

console.log('Total image path references in products.ts:', imgMatches.length);

let brokenCount = 0;
for (const match of new Set(imgMatches)) {
  const clean = match.replace(/["']/g, '');
  const exists = checkFile(clean);
  if (!exists) {
    console.error('BROKEN IMAGE:', clean);
    brokenCount++;
  }
}

// 2. Check hero slides
const heroContent = fs.readFileSync('components/hero/HeroBanner.tsx', 'utf8');
const heroMatches = heroContent.match(/["']\/images\/[^"']+["']/g) || [];
for (const match of new Set(heroMatches)) {
  const clean = match.replace(/["']/g, '');
  const exists = checkFile(clean);
  if (!exists) {
    console.error('BROKEN HERO IMAGE:', clean);
    brokenCount++;
  }
}

// 3. Check categories
const catContent = fs.readFileSync('lib/data/categories.ts', 'utf8');
const catMatches = catContent.match(/["']\/images\/[^"']+["']/g) || [];
for (const match of new Set(catMatches)) {
  const clean = match.replace(/["']/g, '');
  const exists = checkFile(clean);
  if (!exists) {
    console.error('BROKEN CATEGORY IMAGE:', clean);
    brokenCount++;
  }
}

// 4. Check spotlights
const spotContent = fs.readFileSync('lib/data/spotlights.ts', 'utf8');
const spotMatches = spotContent.match(/["']\/images\/[^"']+["']/g) || [];
for (const match of new Set(spotMatches)) {
  const clean = match.replace(/["']/g, '');
  const exists = checkFile(clean);
  if (!exists) {
    console.error('BROKEN SPOTLIGHT IMAGE:', clean);
    brokenCount++;
  }
}

if (brokenCount === 0) {
  console.log('ALL IMAGES EXIST PERFECTLY ON DISK! 0 BROKEN IMAGES!');
} else {
  console.log('Found', brokenCount, 'broken images.');
}
