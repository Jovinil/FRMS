import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const barangayIdRaw = q.barangayId

  if (!barangayIdRaw) {
    throw createError({ statusCode: 400, statusMessage: 'Missing barangayId' })
  }

  const barangayId =
    typeof barangayIdRaw === 'string'
      ? Number.parseInt(barangayIdRaw, 10)
      : Number(barangayIdRaw)

  if (!Number.isFinite(barangayId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid barangayId' })
  }

  const latest = await prisma.thirdBarangayFormSubmission.findFirst({
    where: { barangayId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      createdAt: true,
      barangayId: true,
      userId: true,
      data: true,
      barangay: { select: { id: true, name: true } }, // helpful for RDANA prefill
      user: { select: { id: true, name: true, email: true } }, // optional
    },
  })

  if (!latest) {
    throw createError({ statusCode: 404, statusMessage: 'No third form submission found' })
  }

  return latest
})
