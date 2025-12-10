import { readBody, createError } from 'h3'
import { Prisma } from '@prisma/client'
import type { ThirdBarangayForm } from '~/models/thirdBarangayForm'

type Payload = {
  userId: string
  form: ThirdBarangayForm
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

    const { userId, form } = body

    // 1. Save the Third Barangay form submission
    const submission = await prisma.thirdBarangayFormSubmission.create({
      data: {
        submittedAt: new Date(),
        data: form as unknown as Prisma.InputJsonValue,
      },
    })

    // 2. Upsert progress: latest form = 3
    await prisma.barangayFormProgress.upsert({
      where: { userId },
      update: {
        latestFormNumber: 3,
        latestFormSubmissionId: submission.id,
        latestFormSubmittedAt: new Date(),
      },
      create: {
        userId,
        latestFormNumber: 3,
        latestFormSubmissionId: submission.id,
        latestFormSubmittedAt: new Date(),
      },
    })

    return submission
  } catch (err) {
    console.error('third-barangay/create error:', err)
    if (err instanceof Error && 'statusCode' in err) throw err
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while creating Third Barangay Form',
    })
  }
})
