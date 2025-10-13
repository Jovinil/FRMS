import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  // Fetch the user from Prisma by email
  const rdana = await prisma.rapidDamageAssessmentNeedAnalysisReport.findMany({
    include: {
        barangay: true,
        user: true,
    }
  })

  if (!rdana) {
    throw createError({ statusCode: 404, message: 'No Rdana found' })
  }

      return {data: superjson.serialize(rdana)}
})
