import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  const users = await prisma.user.findMany({
    include: {
      rapidDamageAssessmentNeedAnalysisReport: true,
      damageAssessmentNeedAnalysisReport: true,
      generatedReports: true,
      floodRiskMap: true,
      barangay: true
    }
  })

  if (!users) {
    throw createError({ statusCode: 404, message: 'Users not found' })
  }

      return {data: superjson.serialize(users)}
})
