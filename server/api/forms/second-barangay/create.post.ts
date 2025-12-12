import { defineEventHandler, readBody, createError } from 'h3'
import { Prisma } from '@prisma/client'
import type { SecondBarangayForm } from '~/models/secondBarangayForm'

type Payload = {
  userId: string // DB user id but comes as string from client
  form: SecondBarangayForm
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Payload>(event)

    if (!body?.userId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing userId' })
    }
    if (!body?.form) {
      throw createError({ statusCode: 400, statusMessage: 'Missing form data' })
    }

    // 1) Normalize userId to Int
    const userId = Number.parseInt(body.userId, 10)
    if (!Number.isFinite(userId)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid userId' })
    }

    // 2) Fetch user's barangayId (server side)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, barangayId: true },
    })

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    if (!user.barangayId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User has no barangay assigned',
      })
    }

    const now = new Date()

    // 3) Save submission with userId + barangayId
    const submission = await prisma.secondBarangayFormSubmission.create({
      data: {
        userId: user.id,
        barangayId: user.barangayId,
        submittedAt: now,
        data: body.form as unknown as Prisma.InputJsonValue,
      },
    })

    // 4) Upsert progress (progress.userId is string in your schema)
    await prisma.barangayFormProgress.upsert({
      where: { userId: String(user.id) },
      update: {
        latestFormNumber: 2,
        latestFormSubmissionId: submission.id,
        latestFormSubmittedAt: now,
      },
      create: {
        userId: String(user.id),
        latestFormNumber: 2,
        latestFormSubmissionId: submission.id,
        latestFormSubmittedAt: now,
      },
    })

    return submission
  } catch (err: any) {
    console.error('second-barangay/create error:', err)

    // If it’s an h3 error, rethrow as-is
    if (err?.statusCode) throw err

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while creating Second Barangay Form',
    })
  }
})
