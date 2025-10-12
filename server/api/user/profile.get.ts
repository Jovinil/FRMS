import { defineEventHandler, getHeader, createError } from 'h3'
import superjson from 'superjson'

export default defineEventHandler(async (event) => {
  const email = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!email) {
    throw createError({ statusCode: 401, message: 'Unauthorized: missing email' })
  }

  // Fetch the user from Prisma by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

      return {data: superjson.serialize(user)}
})
