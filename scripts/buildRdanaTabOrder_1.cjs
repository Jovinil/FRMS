// scripts/buildRdanaTabOrder.cjs

// run 1

const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, './sejda-tab-order.html');
const outputPath = path.resolve(__dirname, './json/rdana-tab-order.json');

const html = fs.readFileSync(inputPath, 'utf8');

// Split per page block
const pageBlocks = html.split('<div class="page-tab-ordering">').slice(1);

const pages = pageBlocks.map((block, index) => {
  // Page number
  const pageMatch = block.match(/Page <span class="page_num">(\d+)<\/span>/);
  const page = pageMatch ? parseInt(pageMatch[1], 10) : index + 1;

  const fields = [];
  const liRegex =
    /<span class="field-name">([^<]+)<\/span>\s*<span class="field-kind">([^<]+)<\/span>/g;

  let m;
  while ((m = liRegex.exec(block)) !== null) {
    const name = m[1].trim(); // e.g. text_1uvac, checkbox_41uuku
    const kind = m[2].trim(); // "text" | "checkbox" | "radio" | "textarea"
    fields.push({ name, kind });
  }

  return { page, fields };
});

fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2), 'utf8');

console.log(`Wrote tab order to: ${outputPath}`);
