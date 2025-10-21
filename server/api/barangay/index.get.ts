import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  const barangay = await prisma.barangay.findMany({
    include: {
        damageAssessmentNeedAnalysisReport: true,
        rapidDamageAssessmentNeedAnalysisReport: true,
        evacuationCenters: true,
        floodRiskMap: true,
        users: true
    }
  })

  if (!barangay) {
    throw createError({ statusCode: 404, message: 'No Barangay found' })
  }

      return {data: superjson.serialize(barangay)}
})
