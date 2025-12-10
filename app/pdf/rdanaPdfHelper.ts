// pdf/rdanaPdfHelper.ts
import fs from 'fs/promises';
import path from 'path';
import {
  PDFDocument,
  PDFTextField,
  PDFRadioGroup,
} from 'pdf-lib';
import { rdanaPdfConfigs, type RdanaFormType } from '~/pdf/forms.index';
import type { PdfFieldMapping } from '~/pdf/firstBarangay.fields';

// simple dot-path helper: getValueByPath(obj, "a.b.c")
function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => {
    if (acc == null) return undefined;
    return acc[part];
  }, obj);
}

// normalize bools => 'yes'/'no'
function normalizeYesNo(val: any): string | undefined {
  if (val === 'yes' || val === 'no') return val;
  if (typeof val === 'boolean') return val ? 'yes' : 'no';
  if (typeof val === 'string') {
    const s = val.toLowerCase();
    if (s === 'true') return 'yes';
    if (s === 'false') return 'no';
  }
  return undefined;
}

/**
 * Generate a flattened (read-only) PDF for a given RDANA form.
 * `data` should be your Pinia/TS form object (FirstBarangayForm, etc.).
 */
export async function generateRdanaPdf(
  formType: RdanaFormType,
  data: any,
): Promise<Uint8Array> {
  const config = rdanaPdfConfigs[formType];
  if (!config) {
    throw new Error(`No PDF config found for formType: ${formType}`);
  }

  // Load the fillable template PDF
  const templateFullPath = path.resolve(process.cwd(), config.templatePath);
  const existingPdfBytes = await fs.readFile(templateFullPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  // 1) Fill all mapped fields
  for (const fieldDef of config.fields) {
    const { pdfName, key, type, radioValue } = fieldDef;

    const value = getValueByPath(data, key);
    if (value == null || value === '') {
      // skip empty values
      continue;
    }

    if (type === 'text') {
      // Fill text field if it exists
      try {
        const tf = form.getTextField(pdfName);
        tf.setText(String(value));
      } catch (err) {
        // field might not exist in PDF yet → safe to ignore or log
        console.warn(`Text field '${pdfName}' not found in template:`, err);
      }
    } else if (type === 'radio') {
      // Fill radio group (yes/no etc.)
      const normalized = normalizeYesNo(value);
      if (!normalized) continue;
      if (!radioValue) continue;

      // Select option only if it matches this mapping's radioValue
      if (normalized !== radioValue) continue;

      try {
        const group = form.getRadioGroup(pdfName);
        group.select(radioValue);
      } catch (err) {
        console.warn(`Radio group '${pdfName}' not found in template:`, err);
      }
    }
  }

  // 2) Flatten the form to make it effectively read-only
  form.flatten();

  // 3) Return bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
