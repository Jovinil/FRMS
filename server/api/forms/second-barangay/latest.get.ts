// server/api/forms/second-barangay/latest.get.ts
import { defineEventHandler, getQuery, createError } from 'h3'

function toInt(v: unknown) {
  const n = typeof v === 'string' ? Number.parseInt(v, 10) : Number(v)
  return Number.isFinite(n) ? n : null
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const barangayIdRaw = query.barangayId

  if (!barangayIdRaw) {
    throw createError({ statusCode: 400, statusMessage: 'Missing barangayId' })
  }

  const barangayId = toInt(barangayIdRaw)

  if (!barangayId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid barangayId' })
  }

  const latest = await prisma.secondBarangayFormSubmission.findFirst({
    where: { barangayId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, createdAt: true, data: true, userId: true, barangayId: true },
  })

  if (!latest) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No second form submission found for this barangay',
    })
  }

  return latest
})
