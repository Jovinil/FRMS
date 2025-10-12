import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  // Fetch the user from Prisma by email
  const dana = await prisma.damageAssessmentNeedAnalysisReport.findMany({
    include: {
        barangay: true,
        user: true,
    }
  })

  if (!dana) {
    throw createError({ statusCode: 404, message: 'No Dana found' })
  }

      return {data: superjson.serialize(dana)}
})
