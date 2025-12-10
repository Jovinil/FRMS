// server/api/forms/first-barangay/create.post.ts
import { readBody, createError } from 'h3'
import { Prisma } from '@prisma/client'
import type { FirstBarangayForm } from '~/models/firstBarangayForm'

type Payload = {
  userId: string
  form: FirstBarangayForm
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Payload>(event)

  if (!body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId',
    })
  }

  if (!body.form) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing form data',
    })
  }

  const { userId, form } = body

  // 1. Save the form submission
  const submission = await prisma.firstBarangayFormSubmission.create({
    data: {
      submittedAt: new Date(),
      // 👇 cast to Prisma's JSON type to satisfy TS
      data: form as unknown as Prisma.InputJsonValue,
    },
  })

  // 2. Upsert BarangayFormProgress for this user
  await prisma.barangayFormProgress.upsert({
    where: { userId }, // userId must be @unique in your model
    update: {
      latestFormNumber: 1,
      latestFormSubmissionId: submission.id,
      latestFormSubmittedAt: new Date(),
    },
    create: {
      userId,
      latestFormNumber: 1,
      latestFormSubmissionId: submission.id,
      latestFormSubmittedAt: new Date(),
    },
  })

  return submission
})
