import { readBody, createError } from 'h3'
export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing form data',
    })
  }

  const submission = await prisma.thirdBarangayFormSubmission.create({
    data: {
      submittedAt: new Date(),
      data: body, // store the whole form as JSON
    },
  })

  return submission
})
