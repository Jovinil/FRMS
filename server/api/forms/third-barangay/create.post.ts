// server/api/forms/third-barangay/create.post.ts
import { readBody, createError } from 'h3'
import { Prisma } from '@prisma/client'
import type { ThirdBarangayForm } from '~/models/thirdBarangayForm'

type Payload = {
  userId: number | string
  form: ThirdBarangayForm
}

function toInt(v: unknown) {
  const n = typeof v === 'string' ? Number.parseInt(v, 10) : Number(v)
  return Number.isFinite(n) ? n : null
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Payload>(event)

    if (!body?.userId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing userId' })
    }
    if (!body.form) {
      throw createError({ statusCode: 400, statusMessage: 'Missing form data' })
    }

    const userId = toInt(body.userId)
    if (!userId) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid userId' })
    }

    // ✅ derive barangayId from the user record (single source of truth)
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

    // 1) Save the Third Barangay form submission
    const submission = await prisma.thirdBarangayFormSubmission.create({
      data: {
        userId: user.id,
        barangayId: user.barangayId,
        submittedAt: new Date(),
        data: body.form as unknown as Prisma.InputJsonValue,
      },
    })

    // 2) Upsert progress: latest form = 3
    // NOTE: this assumes BarangayFormProgress.userId is Int (same as your DB User.id).
    await prisma.barangayFormProgress.upsert({
      where: { userId: String(user.id) },
      update: {
        latestFormNumber: 3,
        latestFormSubmissionId: submission.id,
        latestFormSubmittedAt: new Date(),
      },
      create: {
        userId: String(user.id),
        latestFormNumber: 3,
        latestFormSubmissionId: submission.id,
        latestFormSubmittedAt: new Date(),
      },
    })

    return submission
  } catch (err: any) {
    console.error('third-barangay/create error:', err)
    if (err && typeof err === 'object' && 'statusCode' in err) throw err

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while creating Third Barangay Form',
    })
  }
})
