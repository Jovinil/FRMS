// server/api/rdana-pdf.post.ts
import {
  defineEventHandler,
  readBody,
  setHeader,
  createError,
} from 'h3'
import type { RdanaForm } from '~/models/firstRdanaForm'
import { generateRdanaPdf } from '~/../server/utils/rdanaPdf'

export default defineEventHandler(async (event) => {
  const body = await readBody<RdanaForm>(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'RDANA form payload is required',
    })
  }

  try {
    const pdfBytes = await generateRdanaPdf(body)

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(
      event,
      'Content-Disposition',
      'attachment; filename="RDANA.pdf"',
    )

    return pdfBytes
  } catch (err) {
    console.error('Error generating RDANA PDF:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate RDANA PDF',
    })
  }
})
