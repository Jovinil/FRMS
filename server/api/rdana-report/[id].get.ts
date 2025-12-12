// server/api/rdana-report/[id].get.ts
import { defineEventHandler, createError, setHeader } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'
import {
  buildRdanaFormFromSubmission,
  generateRdanaPdf,
} from '~/../server/utils/rdanaPdf'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing RDANA report id',
    })
  }

  // Pull the saved submission from the database
  const submission = await prisma.firstRdanaSubmission.findUnique({
    where: { id },
  })

  if (!submission) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RDANA submission not found',
    })
  }

  try {
    const form = buildRdanaFormFromSubmission(submission as any)
    const pdfBytes = await generateRdanaPdf(form)

    // Persist a copy for reuse/debugging
    const generatedDir = path.join(process.cwd(), 'server/pdf/generated')
    await fs.mkdir(generatedDir, { recursive: true })
    await fs.writeFile(
      path.join(generatedDir, `RDANA-${id}.pdf`),
      pdfBytes,
    )

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(
      event,
      'Content-Disposition',
      `inline; filename="RDANA-${id}.pdf"`,
    )

    return pdfBytes
  } catch (err) {
    console.error('Error generating RDANA PDF:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate RDANA report',
    })
  }
})
