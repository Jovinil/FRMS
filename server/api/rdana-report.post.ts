// server/api/rdana-report.post.ts
import {
  defineEventHandler,
  readBody,
  setHeader,
  createError,
} from 'h3'
import type { RdanaForm } from '~/models/firstRdanaForm'
import { generateRdanaPdf } from '~/../server/utils/rdanaPdf'

export default defineEventHandler(async (event) => {
  const formBody = await readBody<RdanaForm>(event)

  try {
    const pdfBytes = await generateRdanaPdf(formBody)

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(
      event,
      'Content-Disposition',
      'inline; filename="RDANA-MDRRMO-report.pdf"',
    )

    return pdfBytes
  } catch (err) {
    console.error('Error generating RDANA report:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate RDANA report',
    })
  }
})
