import superjson from 'superjson'

export default defineEventHandler(async (event) => {

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
