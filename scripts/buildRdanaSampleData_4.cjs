// scripts/buildRdanaSampleData.cjs
// Usage: node scripts/buildRdanaSampleData.cjs
//
// Reads:
//   ./scripts/json/rdana-fields-ordered.json
// Writes:
//   ./scripts/json/rdana-sample-data.json

const fs = require('fs');
const path = require('path');

// 1) Input: result of mergeRdanaFieldsByTabOrder.cjs
const orderedFieldsPath = path.resolve(
  __dirname,
  './json/rdana-fields-ordered.json'
);

// 2) Output: sample data JSON
const sampleDataPath = path.resolve(
  __dirname,
  './json/rdana-sample-data.json'
);

function main() {
  if (!fs.existsSync(orderedFieldsPath)) {
    console.error('❌ Missing rdana-fields-ordered.json at:', orderedFieldsPath);
    console.error('   Make sure you already ran mergeRdanaFieldsByTabOrder.cjs');
    process.exit(1);
  }

  /** @type {Array<{ name: string; kind: string; tabIndex: number; page: number }>} */
  const orderedFields = JSON.parse(fs.readFileSync(orderedFieldsPath, 'utf8'));

  const data = {};
  let textCount = 0;
  let checkboxCount = 0;
  let radioCount = 0;
  let otherCount = 0;

  for (const f of orderedFields) {
    const { name, kind } = f;

    // Decide default value by kind
    if (kind === 'text' || kind === 'textarea') {
      // Leave empty string so you can fill real values later
      data[name] = '';
      textCount++;
    } else if (kind === 'checkbox') {
      // Default unchecked
      data[name] = false;
      checkboxCount++;
    } else if (kind === 'radio') {
      // Empty string: you will set to one valid option
      data[name] = '';
      radioCount++;
    } else {
      // Unknown/other – just make it empty
      data[name] = '';
      otherCount++;
    }
  }

  fs.mkdirSync(path.dirname(sampleDataPath), { recursive: true });
  fs.writeFileSync(sampleDataPath, JSON.stringify(data, null, 2), 'utf8');

  console.log('✅ Built rdana-sample-data.json at:');
  console.log('   ', sampleDataPath);
  console.log('\nSummary of fields:');
  console.log('  Text / textarea :', textCount);
  console.log('  Checkboxes      :', checkboxCount);
  console.log('  Radio groups    :', radioCount);
  console.log('  Other           :', otherCount);
}

main();
