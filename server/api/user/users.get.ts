import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  // Fetch the user from Prisma by email
  const users = await prisma.user.findMany({
    include: {
      rapidDamageAssessmentNeedAnalysisReport: true,
      damageAssessmentNeedAnalysisReport: true,
      generatedReports: true,
      floodRiskMap: true
    }
  })

  if (!users) {
    throw createError({ statusCode: 404, message: 'Users not found' })
  }

      return {data: superjson.serialize(users)}
})
