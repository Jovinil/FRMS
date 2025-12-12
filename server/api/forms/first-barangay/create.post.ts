// server/api/forms/first-barangay/create.post.ts
import { readBody, createError } from 'h3'
import { Prisma } from '@prisma/client'
import type { FirstBarangayForm } from '~/models/firstBarangayForm'

type Payload = {
  // DB User.id (Int). Allow string so front-end can send "1".
  userId: number | string

  // If your BarangayFormProgress.userId is a Supabase auth id (String),
  // send it from the client/session and we’ll use it as the progress key.
  authUserId?: string

  form: FirstBarangayForm
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Payload>(event)

  if (!body?.userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing userId' })
  }
  if (!body?.form) {
    throw createError({ statusCode: 400, statusMessage: 'Missing form data' })
  }

  // 1) normalize userId to Int
  const userId =
    typeof body.userId === 'string' ? Number.parseInt(body.userId, 10) : body.userId

  if (!Number.isFinite(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid userId' })
  }

  // 2) fetch user (to get barangayId server-side)
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
  console.log(user);
  // 3) Save the form submission with userId + barangayId
  const now = new Date()
  const submission = await prisma.firstBarangayFormSubmission.create({
    data: {
      userId: user.id,
      barangayId: user.barangayId,
      submittedAt: now,
      data: body.form as unknown as Prisma.InputJsonValue,
    },
  })

  // 4) Upsert BarangayFormProgress
  // If your progress.userId is a Supabase auth id (String), use authUserId.
  // Otherwise (quick fallback), store the numeric userId as a string.
  const progressKey = body.authUserId ?? String(user.id)

  await prisma.barangayFormProgress.upsert({
    where: { userId: progressKey }, // userId must be @unique in BarangayFormProgress
    update: {
      latestFormNumber: 1,
      latestFormSubmissionId: submission.id,
      latestFormSubmittedAt: now,
    },
    create: {
      userId: progressKey,
      latestFormNumber: 1,
      latestFormSubmissionId: submission.id,
      latestFormSubmittedAt: now,
    },
  })

  return submission
})
