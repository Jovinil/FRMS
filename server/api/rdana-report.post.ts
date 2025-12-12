// server/api/rdana-report.post.ts
import { defineEventHandler, readBody, setHeader } from 'h3'
import { PDFDocument, PDFCheckBox, PDFRadioGroup, PDFTextField } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import type { RdanaForm } from '~/models/firstRdanaForm'
import {
  mapRdanaFormToPdfData,
  type RdanaPdfPrimitive,
} from '~/../src/pdf/rdanaPdfFieldMapTest'

export default defineEventHandler(async (event) => {
  const formBody = await readBody<RdanaForm>(event)

  // 1) Map rich form -> flat pdf data
  const pdfData: Record<string, RdanaPdfPrimitive> =
    mapRdanaFormToPdfData(formBody)

  // 2) Load template PDF
  const templatePath = path.resolve(
    process.cwd(),
    'pdf-templates/RDANA-MDRRMO-fillable.pdf',
  )

  if (!fs.existsSync(templatePath)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'RDANA template not found on server',
    })
  }

  const pdfBytes = fs.readFileSync(templatePath)
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const form = pdfDoc.getForm()

  // 3) Fill fields
  for (const [name, value] of Object.entries(pdfData)) {
    let field
    try {
      field = form.getField(name)
    } catch {
      // field not in this version of the PDF; skip
      continue
    }

    const ctorName = field.constructor.name

    try {
      if (typeof value === 'string') {
        if (ctorName === 'PDFTextField') {
          ;(field as PDFTextField).setText(value)
        } else if (ctorName === 'PDFRadioGroup') {
          // for radios, value must be one of the widget's option strings
          ;(field as PDFRadioGroup).select(value)
        }
      } else if (typeof value === 'boolean') {
        if (ctorName === 'PDFCheckBox') {
          if (value) {
            ;(field as PDFCheckBox).check()
          } else {
            ;(field as PDFCheckBox).uncheck()
          }
        }
      }
    } catch (err) {
      // for now, just swallow & continue; you can log if needed
      // console.error(`Error writing field ${name}:`, err)
    }
  }

  const outBytes = await pdfDoc.save()

  // 4) Return as PDF response
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(
    event,
    'Content-Disposition',
    'inline; filename="RDANA-MDRRMO-report.pdf"',
  )

  // Nitro is fine with Uint8Array
  return new Uint8Array(outBytes)
})
