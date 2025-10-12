import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  // Fetch the user from Prisma by email
  const barangay = await prisma.barangay.findMany({
    include: {
        damageAssessmentNeedAnalysisReport: true,
        rapidDamageAssessmentNeedAnalysisReport: true,
        evacuationCenters: true,
        floodRiskMap: true
    }
  })

  if (!barangay) {
    throw createError({ statusCode: 404, message: 'No Barangay found' })
  }

      return {data: superjson.serialize(barangay)}
})
