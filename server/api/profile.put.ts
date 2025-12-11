// server/api/profile.put.ts
import { readBody, createError } from 'h3'
// adjust import path for your prisma client:

type ProfileUpdateBody = {
  userId: number | string
  name?: string
  email?: string
  barangayId?: number | null
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ProfileUpdateBody>(event)

  if (!body || body.userId === undefined || body.userId === null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId in request body',
    })
  }

  const userId = Number(body.userId)
  if (Number.isNaN(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid userId, must be a number',
    })
  }

  // Build partial data object so we only update what is provided
  const data: Record<string, any> = {}

  if (typeof body.name === 'string') {
    data.name = body.name
  }

  if (typeof body.email === 'string') {
    data.email = body.email
  }

  // barangayId can be number or null; only set if explicitly present
  if ('barangayId' in body) {
    data.barangayId = body.barangayId === null
      ? null
      : Number(body.barangayId)
  }

  if (Object.keys(data).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No updatable fields provided',
    })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      include: {
        barangay: true,
      },
    })

    return {
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        barangayId: updatedUser.barangayId,
        barangayName: updatedUser.barangay?.name ?? null,
      },
    }
  } catch (err: any) {
    console.error('Error updating user profile:', err)

    // Handle unique email constraint nicely
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email is already in use',
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update profile',
    })
  }
})
