// server/api/rdana-pdf.post.ts
import { readBody, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

import { fillRdanaPdf } from '../../src/pdf/fillRdanaPdf'
import type { RdanaForm } from '../../app/models/firstRdanaForm'

// ID here should be your FirstRdanaSubmission.id (cuid)
type RdanaFormWithId = RdanaForm & { id: string }

export default defineEventHandler(async (event) => {
  try {
    // 1. Get RdanaForm JSON from the client
    const body = await readBody<RdanaFormWithId>(event)

    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing RDANA submission id in body',
      })
    }

    // 2. Load the blank RDANA template PDF
    const templatePath = path.join(
      process.cwd(),
      'pdf-templates',
      'RDANA-Form-MDRRMO-fillable.pdf',
    )

    const templateBytes = await fs.readFile(templatePath)

    // 3. Fill & flatten the PDF
    const filledBytes = await fillRdanaPdf(templateBytes, body)

    // 4. Decide where to store the PDF
    const outputDir = path.join(process.cwd(), 'server/pdf/generated')
    await fs.mkdir(outputDir, { recursive: true })

    // FILE NAME *must* match what rdana-report/[id].get.ts expects
    const storedFileName = `RDANA-${body.id}.pdf`
    const storedFilePath = path.join(outputDir, storedFileName)
    await fs.writeFile(storedFilePath, filledBytes)

    // 6. Also stream back as a download now
    const res = event.node.res
    const downloadFileName = `RDANA-${body.id}.pdf`

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${downloadFileName}"`,
    )

    res.end(Buffer.from(filledBytes))
    return
  } catch (err) {
    console.error('Error generating RDANA PDF:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate RDANA PDF',
    })
  }
})
