import z from "zod"
import { Prisma } from "@prisma/client"

const evacuationCenterSchema = z.object({
    centerName: z.string(),
    capacity: z.number(),
    lng: z.number(),
    lat: z.number(),
    email: z.string().email(),
})


export default defineEventHandler(async (event) => {
    const body = await readBody(event);    
    const validated = evacuationCenterSchema.safeParse(body);

    if(!validated.success){
        console.log(validated.error.issues)
        return
    }

    const user = await prisma.user.findUnique({
        where: {
            email: validated.data?.email
        },
        include: {
            barangay: true
        }
    })

    if(!user?.barangay){
        return
    }

    const evacuationCenter = await prisma.evacuationCenter.create({
        data: {
            name: validated.data.centerName,
            capacity: validated.data.capacity,
            // address: user?.barangay?.location,
            longitude: validated.data.lng,
            latitude: validated.data.lat,
            barangay: {
                connect: {
                    id: user.barangay.id
                }
            },
        }
    })

    console.log('evacuation center created')
    return {message: "Evacuation Center Successfully created"}
})