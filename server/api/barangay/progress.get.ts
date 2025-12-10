// server/api/barangay/progress.get.ts
import { getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId

  if (!userId || typeof userId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid userId',
    })
  }

  const progress = await prisma.barangayFormProgress.findUnique({
    where: { userId },
  })

  // can be null if user hasn't submitted anything yet
  return progress
})
