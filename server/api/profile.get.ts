// server/api/profile.get.ts
import { getQuery, createError } from 'h3'
// adjust this import to wherever your prisma client is
// import { prisma } from '~/server/utils/prisma'

type ProfileResponse = {
  profile: {
    id: number
    name: string
    email: string
    role: string
    barangayId: number | null
    barangayName: string | null
  }
  barangays: {
    id: number
    name: string
  }[]
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userIdParam = query.userId

  if (!userIdParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId query parameter',
    })
  }

  const userId = Number(userIdParam)
  if (Number.isNaN(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid userId, must be a number',
    })
  }

  // 🔹 Find user from your User table
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      barangay: true, // so we can also get barangay name
    },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // 🔹 Build profile object
  const profile: ProfileResponse['profile'] = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    barangayId: user.barangayId ?? null,
    barangayName: user.barangay?.name ?? null,
  }

  // 🔹 Get all barangays for dropdown
  const barangayRows = await prisma.barangay.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
    },
  })

  return {
    profile,
    barangays: barangayRows,
  } satisfies ProfileResponse
})
