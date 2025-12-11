// scripts/listRdanaFieldIndices.cjs
// Run with: node scripts/listRdanaFieldIndices.cjs

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function main() {
  const pdfPath = path.resolve(
    __dirname,
    '../pdf-templates/RDANA-Form-MDRRMO-fillable.pdf',
  );

  if (!fs.existsSync(pdfPath)) {
    console.error('❌ PDF not found at:', pdfPath);
    console.error('   Adjust pdfPath in listRdanaFieldIndices.cjs if needed.');
    process.exit(1);
  }

  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  /** @typedef {'text' | 'checkbox' | 'radio' | 'other'} Kind */

  /** @type {Record<Kind, string[]>} */
  const groups = {
    text: [],
    checkbox: [],
    radio: [],
    other: [],
  };

  for (const field of fields) {
    const name = field.getName();
    const ctorName = field.constructor.name; // PDFTextField, PDFCheckBox, PDFRadioGroup, ...

    /** @type {Kind} */
    let kind = 'other';
    switch (ctorName) {
      case 'PDFTextField':
        kind = 'text';
        break;
      case 'PDFCheckBox':
        kind = 'checkbox';
        break;
      case 'PDFRadioGroup':
        kind = 'radio';
        break;
      default:
        kind = 'other';
        break;
    }

    groups[kind].push(name);
  }

  const sortAsc = (a, b) => a.localeCompare(b);

  groups.text.sort(sortAsc);
  groups.checkbox.sort(sortAsc);
  groups.radio.sort(sortAsc);
  groups.other.sort(sortAsc);

  console.log('=== TEXT FIELDS (T[index]) ===');
  groups.text.forEach((name, idx) => {
    console.log(`T[${idx}]  ${name}`);
  });

  console.log('\n=== CHECKBOX FIELDS (C[index]) ===');
  groups.checkbox.forEach((name, idx) => {
    console.log(`C[${idx}]  ${name}`);
  });

  console.log('\n=== RADIO FIELDS (R[index]) ===');
  groups.radio.forEach((name, idx) => {
    console.log(`R[${idx}]  ${name}`);
  });

  if (groups.other.length) {
    console.log('\n=== OTHER FIELDS ===');
    groups.other.forEach((name, idx) => {
      console.log(`OTHER[${idx}]  ${name}`);
    });
  }

  console.log('\nCounts:', {
    texts: groups.text.length,
    checkboxes: groups.checkbox.length,
    radios: groups.radio.length,
    others: groups.other.length,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
