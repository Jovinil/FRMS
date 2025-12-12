export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q.trim() : ''
  const take = Math.min(
    500,
    Math.max(1, Number(query.take ?? 200) || 200)
  )
  const skip = Math.max(0, Number(query.skip ?? 0) || 0)

  const where = q
    ? { name: { contains: q, mode: 'insensitive' as const } }
    : {}

  const centers = await prisma.evacuationCenter.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take,
    skip,
    select: {
      id: true,
      name: true,
      capacity: true,
      latitude: true,
      longitude: true,
      createdAt: true,
    },
  })

  return { ok: true, evacuationCenters: centers }
})
