import z from "zod"

const rdanaSchema = z.object({
  summary: z.string(),
  barangayName: z.string(),
  userId: z.number()
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);    
    const validated = rdanaSchema.safeParse(body)

    if(!validated.success){
        console.log(validated.error.issues)
        return;
    }

    const barangay = await prisma.barangay.findFirst({
      where: {
        name: validated.data.barangayName
      }
    })

    const user = await prisma.damageAssessmentNeedAnalysisReport.create({
        data: {
            status: 'pending',
            summary: validated.data.summary,
            barangay: {
              connect: { id: barangay?.id}
            },
            user: {
              connect: { id: validated.data.userId}
            }
        }
    })
    return {
      success: true,
      message: 'Dana created successfully!',
      barangay,
    }
})