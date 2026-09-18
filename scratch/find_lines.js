const fs = require('fs');
const lines = fs.readFileSync('lib/data/products.ts', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('id: "momos-masala"') || line.includes('id: "fry-rice-masala"') || line.includes('id: "pasta-masala"') || line.includes('id: "chhole-masala"')) {
    console.log(idx + 1, line);
    for (let j = idx; j < idx + 25; j++) {
      if (lines[j].includes('featured:')) {
        console.log('   Line', j + 1, lines[j]);
      }
    }
  }
});
