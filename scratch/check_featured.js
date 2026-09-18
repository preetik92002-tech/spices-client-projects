const fs = require('fs');
const content = fs.readFileSync('lib/data/products.ts', 'utf8');

const regex = /id:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?featured:\s*(true|false)/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(m[1], '|', m[2], '| featured:', m[3]);
}
