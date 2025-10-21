import superjson from 'superjson'

export default defineEventHandler(async (event) => {

  const evacuationCenter = await prisma.evacuationCenter.findMany({
    include: {
        barangay: true,
        evacueesReport: true
    }
  })
  
  if (!evacuationCenter) {
    throw createError({ statusCode: 404, message: 'No Evacuation Center found' })
  }

    return {data: superjson.serialize(evacuationCenter)}
})
