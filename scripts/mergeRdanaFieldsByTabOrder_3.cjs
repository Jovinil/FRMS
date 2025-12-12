// scripts/mergeRdanaFieldsByTabOrder.cjs
const fs = require('fs');
const path = require('path');

// run 3

//  from buildRdanaTabOrder.cjs (Sejda HTML → JSON)
const tabOrderPath = path.resolve(__dirname, './json/rdana-tab-order.json');

//  from extractRdanaPdfFields.cjs (now outputs JSON too)
const pdfFieldsPath = path.resolve(__dirname, './json/rdana-fields.json');

// Output files
const orderedFieldsPath = path.resolve(__dirname, './json/rdana-fields-ordered.json');
const mappingSkeletonPath = path.resolve(__dirname, './json/rdana-field-mapping-skeleton.json');

// 1. Load tab order
// Shape: [ { page: 1, fields: [ { name, kind, label? }, ... ] }, ... ]
const tabOrder = JSON.parse(fs.readFileSync(tabOrderPath, 'utf8'));

// 2. Load PDF fields (from pdf-lib extraction)
// Shape: [ { name: string, type: 'text' | 'checkbox' | 'radio' | 'other' }, ... ]
const pdfFields = JSON.parse(fs.readFileSync(pdfFieldsPath, 'utf8'));

// 3. Index pdf fields by name
const fieldsByName = new Map();
for (const f of pdfFields) {
  // if duplicate names ever exist, we could store an array,
  // but for RDANA they should be unique per group name.
  fieldsByName.set(f.name, f);
}

const ordered = [];
const missingFromPdf = [];
const usedNames = new Set();
let globalIndex = 1;

// 4. Walk tab order and build final ordered list
for (const pageBlock of tabOrder) {
  const page = pageBlock.page;

  for (const field of pageBlock.fields) {
    const { name, kind } = field;

    const pdfField = fieldsByName.get(name);
    if (!pdfField) {
      missingFromPdf.push({ name, kind, page });
      continue;
    }

    usedNames.add(name);

    ordered.push({
      tabIndex: globalIndex++,
      page,
      name,
      kind,                 // from Sejda (text/checkbox/radio/etc.)
      type: pdfField.type,  // from pdf-lib extraction
      raw: pdfField,
    });
  }
}

// 5. Anything in pdfFields that wasn't used in tab order
const leftover = pdfFields.filter((f) => !usedNames.has(f.name));

// 6. Save ordered fields
fs.writeFileSync(orderedFieldsPath, JSON.stringify(ordered, null, 2), 'utf8');
console.log(`✅ Wrote ordered fields to: ${orderedFieldsPath}`);

// 7. Save mapping skeleton for you to fill with keys
const mappingSkeleton = ordered.map((f) => ({
  key: '',              // 👉 you will fill this (e.g. "province", "barangay_name", ...)
  pdfName: f.name,
  kind: f.kind,
  page: f.page,
  tabIndex: f.tabIndex,
}));

fs.writeFileSync(mappingSkeletonPath, JSON.stringify(mappingSkeleton, null, 2), 'utf8');
console.log(`✅ Wrote mapping skeleton to: ${mappingSkeletonPath}`);

// 8. Debug info
if (missingFromPdf.length) {
  console.log('\n⚠️ In tab order but not in pdf-lib output:');
  console.log(missingFromPdf);
}

if (leftover.length) {
  console.log('\n⚠️ In pdf-lib output but not in tab order:');
  console.log(leftover.map((f) => f.name));
}
