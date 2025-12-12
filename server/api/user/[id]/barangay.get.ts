import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const idRaw = getRouterParam(event, 'id')
  const userId = Number.parseInt(String(idRaw), 10)

  if (!Number.isFinite(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user id' })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { barangay: { select: { name: true } } },
  })

  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })
  if (!user.barangay?.name) {
    throw createError({ statusCode: 400, statusMessage: 'User has no barangay assigned' })
  }

  return { barangayName: user.barangay.name }
})
