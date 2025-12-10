import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing form data',
    })
  }

  const submission = await prisma.secondBarangayFormSubmission.create({
    data: {
      submittedAt: new Date(),
      data: body,
    },
  })

  return submission
})
