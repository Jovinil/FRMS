import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const centers = await prisma.evacuationCenter.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      capacity: true,
      latitude: true,
      longitude: true,
    },
  })

  return centers
})
