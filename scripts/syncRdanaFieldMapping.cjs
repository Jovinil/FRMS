// scripts/syncRdanaFieldMapping.cjs
// Run with: node scripts/syncRdanaFieldMapping.cjs

const fs = require('fs');
const path = require('path');

// 1) Paths
const sampleJsonPath = path.resolve(
  __dirname,
  './json/rdana-sample-data.json', // your big dummy JSON
);

const mappingTsPath = path.resolve(
  __dirname,
  '../src/pdf/rdanaFieldMapping.ts', // adjust if your path is different
);

// 2) Load JSON with all PDF field names
if (!fs.existsSync(sampleJsonPath)) {
  console.error('❌ Could not find rdana-sample-data.json at:', sampleJsonPath);
  process.exit(1);
}

const sampleRaw = fs.readFileSync(sampleJsonPath, 'utf8');
/** @type {Record<string, any>} */
const sampleData = JSON.parse(sampleRaw);
const allPdfNames = Object.keys(sampleData);

if (!allPdfNames.length) {
  console.error('❌ rdana-sample-data.json has no keys.');
  process.exit(1);
}

// 3) Load existing mapping TS
if (!fs.existsSync(mappingTsPath)) {
  console.error('❌ Could not find rdanaFieldMapping.ts at:', mappingTsPath);
  process.exit(1);
}

const source = fs.readFileSync(mappingTsPath, 'utf8');

// 4) Find RDANA_FIELD_MAPPING array in the TS file
const arrayStartMarker =
  'export const RDANA_FIELD_MAPPING: RdanaFieldMappingEntry[] = [';

const startIdx = source.indexOf(arrayStartMarker);
if (startIdx === -1) {
  console.error('❌ Could not find RDANA_FIELD_MAPPING array in rdanaFieldMapping.ts');
  process.exit(1);
}

const afterStartIdx = startIdx + arrayStartMarker.length;
const endIdx = source.indexOf('];', afterStartIdx);
if (endIdx === -1) {
  console.error('❌ Could not find closing "];" for RDANA_FIELD_MAPPING array');
  process.exit(1);
}

const before = source.slice(0, afterStartIdx);
const arrayBody = source.slice(afterStartIdx, endIdx);
const after = source.slice(endIdx);

// 5) Get already-defined pdfNames from the array body
const existingNames = new Set();
/** @type {RegExp} */
const pdfNameRegex = /pdfName:\s*['"]([^'"]+)['"]/g;

let match;
while ((match = pdfNameRegex.exec(arrayBody)) !== null) {
  existingNames.add(match[1]);
}

// 6) Decide which names are missing
const missingNames = allPdfNames.filter((name) => !existingNames.has(name));

if (!missingNames.length) {
  console.log('✅ RDANA_FIELD_MAPPING already covers all fields in rdana-sample-data.json');
  process.exit(0);
}

// 7) Build stub entries for missing fields
/** @type {string[]} */
const newEntries = [];

for (const pdfName of missingNames.sort()) {
  /** @type {'text' | 'checkbox' | 'radio'} */
  let kind;

  if (pdfName.startsWith('checkbox_')) {
    kind = 'checkbox';
  } else if (pdfName.startsWith('radio_')) {
    kind = 'radio';
  } else {
    kind = 'text';
  }

  const valueExpr =
    kind === 'checkbox'
      ? '() => false'
      : "() => ''";

  newEntries.push(
    `
  {
    pdfName: '${pdfName}',
    kind: '${kind}',
    path: 'TODO(${pdfName})',
    value: ${valueExpr},
  },`.trimEnd(),
  );
}

// 8) Append new entries just before the closing ];
const newArrayBody =
  arrayBody.trimEnd() + '\n\n' + newEntries.join('\n') + '\n';

const newSource = before + '\n' + newArrayBody + after;

fs.writeFileSync(mappingTsPath, newSource, 'utf8');

console.log('✅ Updated rdanaFieldMapping.ts');
console.log('   Existing fields   :', existingNames.size);
console.log('   Newly added stubs:', missingNames.length);
console.log('   File              :', mappingTsPath);
