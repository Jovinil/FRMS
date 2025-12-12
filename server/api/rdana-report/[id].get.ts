// server/api/rdana-report/[id].get.ts
import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing RDANA report id',
    })
  }

  const filePath = path.join(
    process.cwd(),
    'server/pdf/generated',
    `RDANA-${id}.pdf`,
  )

  try {
    const pdfBytes = await fs.readFile(filePath)

    const res = event.node.res
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `inline; filename="RDANA-${id}.pdf"`,
    )

    res.end(pdfBytes)
    return
  } catch (err) {
    console.error('Error reading RDANA PDF:', err)
    throw createError({
      statusCode: 404,
      statusMessage: 'RDANA report not found',
    })
  }
})
