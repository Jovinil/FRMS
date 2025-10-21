import { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup } from 'pdf-lib'
import { RDANAFieldMap } from '~/models/pdfFieldMap'

/**
 * Fills out the RDANA fillable PDF using data from the form store.
 * @param pdfBuffer ArrayBuffer of the RDANA PDF template
 * @param formData RDANA form data object (from Pinia store)
 */
export async function fillRDANAPdf(pdfBuffer: ArrayBuffer, formData: any) {
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const form = pdfDoc.getForm()

  // console.group('📋 Dochub PDF Field Labels / Data Keys')

  // const fields = form.getFields()
  // for (const field of fields) {
  //   const name = field.getName()
  //   const type = field.constructor.name

  //   // Access raw dict entries (pdf-lib internal)
  //   const raw = (field as any).acroField?.dict
  //   const tooltip = raw?.get('TU')?.decodeText?.() // field tooltip / label
  //   const mapping = raw?.get('TM')?.decodeText?.() // data key / export name

  //   console.log(`• ${name} (${type}) → label: "${tooltip || '-'}", data key: "${mapping || '-'}"`)
  // }

  // console.groupEnd()

  console.group('🧩 Populating RDANA PDF Fields')
  for (const [pdfField, path] of Object.entries(RDANAFieldMap)) {
    const value = getValueByPath(formData, path)
    console.log(`→ ${pdfField} (${path}) =`, value)

    if (value == null || value === '') continue

    try {
      const field = form.getField(pdfField)

      if (field instanceof PDFTextField) {
        field.setText(String(value))
      } else if (field instanceof PDFCheckBox) {
        if (value === true || value === 'true' || value === 'on' || value === 1) field.check()
        else field.uncheck()
      } else if (field instanceof PDFRadioGroup) {
        field.select(String(value))
      } else {
        // fallback
        ;(field as any).setText?.(String(value))
      }
    } catch (err) {
      console.warn(`⚠️ Could not set ${pdfField}:`, err)
    }
  }
  console.groupEnd()

  // Optional: flatten to make fields static
  form.updateFieldAppearances()
  form.flatten()

  return await pdfDoc.save()
}

/** Helper to get nested object values safely */
function getValueByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}
