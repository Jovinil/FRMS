// scripts/generateRdanaMappingStubs.cjs
// Run with: node scripts/generateRdanaMappingStubs.cjs > /tmp/rdana-stubs.ts

const fs = require('fs');
const path = require('path');

// 1) Path to your dummy JSON (the big object you pasted)
const jsonPath = path.resolve(__dirname, './json/rdana-sample-data.json');

if (!fs.existsSync(jsonPath)) {
  console.error('❌ JSON file not found at:', jsonPath);
  process.exit(1);
}

const raw = fs.readFileSync(jsonPath, 'utf8');

/**
 * Shape: { "text_1_1_1": "Dummy ...", "checkbox_3_2_a": true, ... }
 * We only care about the keys.
 */
const data = JSON.parse(raw);

/** @type {string[]} */
const entries = [];

// 2) Generate one RDANA_FIELD_MAPPING entry per PDF field name
for (const pdfName of Object.keys(data).sort()) {
  // OPTIONAL: skip ones you've already hand-mapped in rdanaFieldMapping.ts
  if (
    pdfName.startsWith('text_1_') ||
    pdfName.startsWith('textarea_1') ||
    pdfName.startsWith('text_2_') ||
    pdfName.startsWith('text_6_3_') ||
    pdfName === 'radio_6_1' ||
    pdfName === 'radio_6_2' ||
    pdfName.startsWith('text_20_') ||
    pdfName === 'radio_20_1' ||
    pdfName === 'textarea_20_2'
  ) {
    continue;
  }

  /** @type {'text' | 'checkbox' | 'radio'} */
  let kind;

  if (pdfName.startsWith('checkbox_')) {
    kind = 'checkbox';
  } else if (pdfName.startsWith('radio_')) {
    kind = 'radio';
  } else {
    kind = 'text';
  }

  const pathHint = `TODO(${pdfName})`;
  const valueExpr =
    kind === 'checkbox'
      ? '() => false'
      : "() => ''";

  entries.push(
    `  { pdfName: '${pdfName}', kind: '${kind}', path: '${pathHint}', value: ${valueExpr} },`
  );
}

// 3) Print result to stdout – redirect this into a file and paste into RDANA_FIELD_MAPPING
const output = `// Auto-generated stubs – paste these into RDANA_FIELD_MAPPING
// and then replace each path + value with real mappings.

${entries.join('\n')}
`;

console.log(output);
