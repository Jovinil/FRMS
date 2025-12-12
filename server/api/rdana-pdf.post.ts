// server/api/rdana-pdf.post.ts
import { readBody } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

import { fillRdanaPdf } from '../../src/pdf/fillRdanaPdf'
import type { RdanaForm } from '../../app/models/firstRdanaForm'

// If your RdanaForm has an ID, you can extend the type:
type RdanaFormWithId = RdanaForm & { id?: string | number }

export default defineEventHandler(async (event) => {
  try {
    // 1. Get RdanaForm JSON from the client
    const body = await readBody<RdanaFormWithId>(event)

    // 2. Load the blank RDANA template PDF from your repo
    const templatePath = path.join(
      process.cwd(),
      'pdf-templates',
      'RDANA-Form-MDRRMO-fillable.pdf',
    )

    const templateBytes = await fs.readFile(templatePath)

    // 3. Fill & flatten the PDF (flatten already happens inside fillRdanaPdf now)
    const filledBytes = await fillRdanaPdf(templateBytes, body)

    // 4. Decide where to store the flattened PDF locally
    //    You can keep using the structure from steps 1–2:
    //    e.g. server/pdf/generated/
    const outputDir = path.join(process.cwd(), 'server/pdf/generated')

    // Make sure the folder exists
    await fs.mkdir(outputDir, { recursive: true })

    // Create a stable filename. Prefer an ID if you have one so you can
    // look it up later (e.g. rdana-<id>.pdf). Fallback to timestamp.
    const idPart = body.id ?? Date.now()
    const storedFileName = `RDANA-${idPart}.pdf`
    const storedFilePath = path.join(outputDir, storedFileName)

    // 5. Save the flattened PDF for later use by MDRRMO
    await fs.writeFile(storedFilePath, filledBytes)

    // 👉 At this point, you probably also want to store `storedFilePath`
    // in your DB for that RDANA record, so MDRRMO can fetch it later.
    // e.g. await savePdfPathForRdana(idPart, storedFilePath)

    // 6. Send PDF as binary response (same behavior as before)
    const res = event.node.res
    const downloadFileName = `RDANA-${Date.now()}.pdf` // name shown to browser

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${downloadFileName}"`,
    )

    // filledBytes is a Uint8Array; Node wants a Buffer
    res.end(Buffer.from(filledBytes))

    // We already wrote to the response, so we return nothing
    return
  } catch (err) {
    console.error('Error generating RDANA PDF:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate RDANA PDF',
    })
  }
})
