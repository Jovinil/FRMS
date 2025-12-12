// scripts/fillRdanaTest.cjs
// Run with: node scripts/fillRdanaTest.cjs

// run 4

const fs = require('fs');
const path = require('path');
const { PDFDocument, PDFCheckBox, PDFRadioGroup, PDFTextField } = require('pdf-lib');

// 1. Paths
const templatePath = path.resolve(
  __dirname,
  '../pdf-templates/rdana-mdrrmo-fillable-complete.pdf'
);

const orderedFieldsPath = path.resolve(
  __dirname,
  './json/rdana-fields-ordered.json'
);

const outputDir = path.resolve(__dirname, '../pdf-output');
const outputPath = path.join(outputDir, 'RDANA-MDRRMO-test-filled.pdf');

async function main() {
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Template PDF not found at:', templatePath);
    process.exit(1);
  }

  if (!fs.existsSync(orderedFieldsPath)) {
    console.error('❌ Ordered fields JSON not found at:', orderedFieldsPath);
    console.error('   Did you run mergeRdanaFieldsByTabOrder.cjs?');
    process.exit(1);
  }

  /** @type {Array<{
   *   tabIndex: number;
   *   page: number;
   *   name: string;
   *   kind: string;
   *   type: string;
   * }>} */
  const orderedFields = JSON.parse(fs.readFileSync(orderedFieldsPath, 'utf8'));

  // 2. Load PDF
  const pdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  console.log(`Loaded template with ${orderedFields.length} fields in tab order.`);

  let textCount = 0;
  let checkboxCount = 0;
  let radioCount = 0;
  let errors = [];

  // 3. Fill everything with obvious test values
  for (const f of orderedFields) {
    const { name, kind, tabIndex, page } = f;

    let field;
    try {
      field = form.getField(name);
    } catch (err) {
      errors.push({ name, kind, tabIndex, page, error: String(err) });
      continue;
    }

    const ctorName = field.constructor.name; // PDFTextField, PDFCheckBox, PDFRadioGroup, etc.

    try {
      if (kind === 'text' || kind === 'textarea') {
        // Treat textarea the same as text for now
        if (field instanceof PDFTextField || ctorName === 'PDFTextField') {
          const value = `TAB#${tabIndex} [${name}]`;
          field.setText(value);
          textCount++;
        } else {
          console.warn(`⚠️ Field "${name}" (tabIndex=${tabIndex}) expected text but is "${ctorName}"`);
        }
      } else if (kind === 'checkbox') {
        if (field instanceof PDFCheckBox || ctorName === 'PDFCheckBox') {
          field.check(); // just check all to prove they render
          checkboxCount++;
        } else {
          console.warn(`⚠️ Field "${name}" (tabIndex=${tabIndex}) expected checkbox but is "${ctorName}"`);
        }
      } else if (kind === 'radio') {
        if (field instanceof PDFRadioGroup || ctorName === 'PDFRadioGroup') {
          // Try to select the first available option
          let options = [];
          try {
            options = field.getOptions();
          } catch {
            // some versions of pdf-lib might not support getOptions(), so just try common values
            options = ['Yes', 'On', '1', 'Option1'];
          }

          const option = options[0] || 'Yes';
          field.select(option);
          radioCount++;
        } else {
          console.warn(`⚠️ Field "${name}" (tabIndex=${tabIndex}) expected radio but is "${ctorName}"`);
        }
      } else {
        // Unknown kind, skip
        console.log(`Skipping unknown kind "${kind}" for field "${name}"`);
      }
    } catch (err) {
      errors.push({ name, kind, tabIndex, page, error: String(err) });
    }
  }

  // 4. Save output
  fs.mkdirSync(outputDir, { recursive: true });
  const outBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, outBytes);

  console.log('\n✅ RDANA test-filled PDF written to:');
  console.log('   ', outputPath);
  console.log('\nSummary:');
  console.log('  Text / textarea filled:', textCount);
  console.log('  Checkboxes checked    :', checkboxCount);
  console.log('  Radio groups selected :', radioCount);

  if (errors.length) {
    console.log('\n⚠️ Some fields caused errors:');
    for (const e of errors.slice(0, 20)) {
      console.log(
        `  [tabIndex=${e.tabIndex}, page=${e.page}] "${e.name}" (${e.kind}) -> ${e.error}`
      );
    }
    if (errors.length > 20) {
      console.log(`  ... and ${errors.length - 20} more.`);
    }
  } else {
    console.log('\n🎉 No field errors encountered.');
  }
}

main().catch((err) => {
  console.error('❌ Fatal error in fillRdanaTest.cjs:', err);
  process.exit(1);
});
