const fs = require('fs');
const path = require('path');

const folderMap = {
  'paneer-lababdar': 'paneer-lababdar',
  'tandoori-masala': 'tandoori-masala',
  'tandoori-chicken': 'tandoori-chicken-masala',
  'sandwich-masala': 'sandwich-masala',
  'momos-masala': 'momos-masala',
  'veg-biryani': 'veg-biryani-masala',
  'pizza-seasoning': 'pizza-seasoning',
  'chhole-masala': 'chhole-masala',
  'curry-masala': 'curry-masala',
  'fish-curry-masala': 'fish-curry-masala',
  'fry-rice-masala': 'fry-rice-masala',
  'peri-peri-paneer-tikka': 'peri-peri-paneer-tikka',
  'noodles-masala': 'noodles-masala',
  'pasta-masala': 'pasta-masala',
  'kolhapuri-tadka': 'kolhapuri-tadka'
};

const imagesBase = path.resolve('public/images/products');

// Scan folders to get image files
const assetMap = {};
for (const [prodId, folder] of Object.entries(folderMap)) {
  const pDir = path.join(imagesBase, folder);
  if (!fs.existsSync(pDir)) continue;
  
  const files = fs.readdirSync(pDir);
  const mainImage = `/images/products/${folder}/main.webp`;
  const galleryImages = files
    .filter(f => f.startsWith('gallery-') && f.endsWith('.webp'))
    .sort()
    .map(f => `/images/products/${folder}/${f}`);
  const editorialImages = files
    .filter(f => f.startsWith('editorial-') && f.endsWith('.webp'))
    .sort()
    .map(f => `/images/products/${folder}/${f}`);

  assetMap[prodId] = {
    folder,
    mainImage,
    galleryImages,
    editorialImages
  };
}

const productsFile = path.resolve('lib/data/products.ts');
let code = fs.readFileSync(productsFile, 'utf8');

// For each product, update mainImage, galleryImages, editorialImages, images, seo, canonicalUrl, ogImage
for (const [prodId, info] of Object.entries(assetMap)) {
  // Find id: "prodId"
  const idRegex = new RegExp(`id:\\s*["']${prodId}["'],([\\s\\S]*?)(images:\\s*{[\\s\\S]*?},)`);
  const match = code.match(idRegex);
  if (match) {
    const mainStr = `mainImage: "${info.mainImage}",`;
    const galleryStr = `galleryImages: ${JSON.stringify(info.galleryImages)},`;
    const editorialStr = `editorialImages: ${JSON.stringify(info.editorialImages)},`;
    
    // Construct backward-compatible images object
    const primaryStr = `primary: "${info.mainImage}"`;
    const secondaryStr = info.galleryImages.length > 0 
      ? `,\n      secondary: "${info.galleryImages[0]}"` 
      : (info.editorialImages.length > 0 ? `,\n      secondary: "${info.editorialImages[0]}"` : '');
    const backStr = info.galleryImages.length > 1 ? `,\n      back: "${info.galleryImages[1]}"` : '';
    const ambientStr = info.editorialImages.length > 0 ? `,\n      ambient: "${info.editorialImages[0]}"` : '';
    
    const newImagesBlock = `${mainStr}\n    ${galleryStr}\n    ${editorialStr}\n    images: {\n      ${primaryStr}${secondaryStr}${backStr}${ambientStr},\n    },`;
    
    code = code.replace(match[2], newImagesBlock);
  }
}

// Ensure SEO fields are present on each product if not already
for (const [prodId, info] of Object.entries(assetMap)) {
  // Check if ogImage or canonicalUrl exists for this product
  const idBlockRegex = new RegExp(`(id:\\s*["']${prodId}["'][\\s\\S]*?)(reviewCount:\\s*\\d+,)`);
  const match = code.match(idBlockRegex);
  if (match && !match[0].includes('canonicalUrl:')) {
    // Extract slug
    const slugMatch = match[0].match(/slug:\s*["']([^"']+)["']/);
    const nameMatch = match[0].match(/name:\s*["']([^"']+)["']/);
    const weightMatch = match[0].match(/weight:\s*["']([^"']+)["']/);
    const slug = slugMatch ? slugMatch[1] : info.folder;
    const name = nameMatch ? nameMatch[1] : 'Artisanal Spice';
    const weight = weightMatch ? weightMatch[1] : '100 g';

    const seoBlock = `reviewCount: 48,
    seoTitle: "Flavouron ${name} (${weight}) | Authentic Slow-Roasted Spices",
    seoDescription: "Buy authentic Flavouron ${name} by Shivooham Exports. Handcrafted with whole cold-milled botanicals, zero MSG, dual FSSAI certified.",
    seoKeywords: ["Flavouron", "${name}", "Shivooham Exports", "Artisanal Spices", "Indian Masala"],
    canonicalUrl: "https://flavouron.com/products/${slug}",
    ogImage: "${info.mainImage}",`;

    code = code.replace(match[2], seoBlock);
  }
}

fs.writeFileSync(productsFile, code, 'utf8');
console.log('Successfully updated lib/data/products.ts with all organized product assets and metadata!');
