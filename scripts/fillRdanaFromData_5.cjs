// scripts/fillRdanaFromData.cjs
// Usage:
//   node scripts/fillRdanaFromData.cjs ./scripts/json/rdana-sample-data.json ./pdf-output/rdana-demo.pdf
//
// If you omit args, it falls back to defaults below.

const fs = require('fs');
const path = require('path');
const { PDFDocument, PDFCheckBox, PDFRadioGroup, PDFTextField } = require('pdf-lib');

// --------------------------
// 1. CONFIG + CLI arguments
// --------------------------

// IMPORTANT: use the SAME PDF you used when renaming fields
// and when running extractRdanaPdfFields.cjs
const DEFAULT_TEMPLATE_PATH = path.resolve(
  __dirname,
  '../pdf-templates/rdana-mdrrmo-fillable-complete.pdf'
);

// Default input JSON (if none passed)
const DEFAULT_DATA_JSON = path.resolve(
  __dirname,
  './json/rdana-sample-data.json'
);

// Default output path (if none passed)
const DEFAULT_OUTPUT_PDF = path.resolve(
  __dirname,
  '../pdf-output/RDANA-MDRRMO-filled-from-data.pdf'
);

// CLI: node scripts/fillRdanaFromData.cjs <dataJson> <outputPdf>
const dataJsonPath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : DEFAULT_DATA_JSON;

const outputPdfPath = process.argv[3]
  ? path.resolve(process.cwd(), process.argv[3])
  : DEFAULT_OUTPUT_PDF;

// --------------------------
// 2. Helper functions
// --------------------------

/**
 * "Truthy" interpretation for checkboxes.
 * Supports boolean, number, string ("yes", "true", "1", etc.).
 */
function isTruthyLike(val) {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val !== 0;
  if (typeof val === 'string') {
    const s = val.trim().toLowerCase();
    if (['yes', 'y', 'true', '1', 'on', 'checked'].includes(s)) return true;
    if (['no', 'n', 'false', '0', 'off', 'unchecked'].includes(s)) return false;
  }
  return Boolean(val);
}

/**
 * Try to select an option in a radio group given a value.
 * If the value doesn't match any option, falls back to the first option.
 */
function selectRadioOption(field, key, rawValue) {
  let options = [];
  try {
    options = field.getOptions();
  } catch (err) {
    // Older pdf-lib versions may not support getOptions; in that case,
    // just attempt to select the raw string.
  }

  const valueStr = rawValue == null ? '' : String(rawValue);

  if (options && options.length > 0) {
    // Try exact match first
    let chosen = options.find((o) => o === valueStr);

    // Then case-insensitive match
    if (!chosen) {
      const lowerVal = valueStr.toLowerCase();
      chosen = options.find((o) => o.toLowerCase() === lowerVal);
    }

    // Fallback to first option
    if (!chosen) {
      console.warn(
        `⚠️ Radio "${key}": value "${valueStr}" not in options [${options.join(
          ', '
        )}], falling back to "${options[0]}".`
      );
      chosen = options[0];
    }

    field.select(chosen);
  } else {
    // No getOptions() support, just try selecting the value directly
    const fallback = valueStr || 'Yes';
    console.warn(
      `⚠️ Radio "${key}": options not available via getOptions(), selecting "${fallback}".`
    );
    field.select(fallback);
  }
}

// --------------------------
// 3. Main
// --------------------------

async function main() {
  // 3.1 Load JSON data
  if (!fs.existsSync(dataJsonPath)) {
    console.error('❌ Data JSON not found at:', dataJsonPath);
    console.error('   Pass it explicitly: node scripts/fillRdanaFromData.cjs <dataJson> [outputPdf]');
    process.exit(1);
  }

  /** @type {Record<string, any>} */
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));

  // 3.2 Load template PDF
  if (!fs.existsSync(DEFAULT_TEMPLATE_PATH)) {
    console.error('❌ Template PDF not found at:', DEFAULT_TEMPLATE_PATH);
    console.error('   Adjust DEFAULT_TEMPLATE_PATH in fillRdanaFromData.cjs.');
    process.exit(1);
  }

  const pdfBytes = fs.readFileSync(DEFAULT_TEMPLATE_PATH);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  console.log('✅ Loaded template PDF:', DEFAULT_TEMPLATE_PATH);
  console.log('✅ Loaded data JSON:', dataJsonPath);

  let textCount = 0;
  let checkboxCount = 0;
  let radioCount = 0;
  const missingFields = [];
  const typeWarnings = [];

  // 3.3 Iterate over every key in your RDANA data
  for (const [key, value] of Object.entries(data)) {
    // Skip undefined / null if you want
    if (value === undefined || value === null) {
      continue;
    }

    let field;
    try {
      field = form.getField(key);
    } catch (err) {
      missingFields.push({ name: key, error: String(err) });
      continue;
    }

    const ctorName = field.constructor.name; // e.g. PDFTextField, PDFCheckBox, PDFRadioGroup

    // Heuristic: decide by prefix first, then by actual pdf-lib type
    const isTextLike =
      key.startsWith('text_') ||
      key.startsWith('textarea_') ||
      ctorName === 'PDFTextField';

    const isCheckboxLike =
      key.startsWith('check_') ||
      key.startsWith('checkbox_') ||
      ctorName === 'PDFCheckBox';

    const isRadioLike =
      key.startsWith('radio_') || ctorName === 'PDFRadioGroup';

    try {
      if (isTextLike) {
        // Text / textarea
        if (field instanceof PDFTextField || ctorName === 'PDFTextField') {
          field.setText(String(value));
          textCount++;
        } else {
          typeWarnings.push(
            `Field "${key}" looks text-like but is actually "${ctorName}".`
          );
        }
      } else if (isCheckboxLike) {
        // Checkbox
        if (field instanceof PDFCheckBox || ctorName === 'PDFCheckBox') {
          const truthy = isTruthyLike(value);
          if (truthy) {
            field.check();
          } else if (typeof field.uncheck === 'function') {
            field.uncheck();
          }
          checkboxCount++;
        } else {
          typeWarnings.push(
            `Field "${key}" looks checkbox-like but is actually "${ctorName}".`
          );
        }
      } else if (isRadioLike) {
        // Radio group
        if (field instanceof PDFRadioGroup || ctorName === 'PDFRadioGroup') {
          selectRadioOption(field, key, value);
          radioCount++;
        } else {
          typeWarnings.push(
            `Field "${key}" looks radio-like but is actually "${ctorName}".`
          );
        }
      } else {
        // Fallback: try to guess by ctorName only
        if (ctorName === 'PDFTextField') {
          field.setText(String(value));
          textCount++;
        } else if (ctorName === 'PDFCheckBox') {
          const truthy = isTruthyLike(value);
          if (truthy) {
            field.check();
          } else if (typeof field.uncheck === 'function') {
            field.uncheck();
          }
          checkboxCount++;
        } else if (ctorName === 'PDFRadioGroup') {
          selectRadioOption(field, key, value);
          radioCount++;
        } else {
          console.warn(
            `⚠️ Unknown field type "${ctorName}" for key "${key}", skipping.`
          );
        }
      }
    } catch (err) {
      console.warn(
        `⚠️ Error while filling field "${key}" (${ctorName}): ${String(err)}`
      );
    }
  }

  // 3.4 Save output
  fs.mkdirSync(path.dirname(outputPdfPath), { recursive: true });
  const outBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, outBytes);

  console.log('\n✅ RDANA PDF filled from data written to:');
  console.log('   ', outputPdfPath);

  // 3.5 Summary
  console.log('\nSummary:');
  console.log('  Text fields filled   :', textCount);
  console.log('  Checkboxes handled   :', checkboxCount);
  console.log('  Radio groups handled :', radioCount);

  if (missingFields.length) {
    console.log('\n⚠️ Keys in data with no matching PDF field:');
    for (const m of missingFields.slice(0, 20)) {
      console.log(`  "${m.name}" -> ${m.error}`);
    }
    if (missingFields.length > 20) {
      console.log(`  ... and ${missingFields.length - 20} more.`);
    }
  }

  if (typeWarnings.length) {
    console.log('\n⚠️ Type warnings:');
    for (const w of typeWarnings.slice(0, 20)) {
      console.log(' ', w);
    }
    if (typeWarnings.length > 20) {
      console.log(`  ... and ${typeWarnings.length - 20} more.`);
    }
  }
}

main().catch((err) => {
  console.error('❌ Fatal error in fillRdanaFromData.cjs:', err);
  process.exit(1);
});
