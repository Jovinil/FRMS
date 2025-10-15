import z from "zod"
import { Prisma } from "@prisma/client"

const barangayOfficialSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    barangay: z.string(),
    role: z.enum(['ADMIN', 'BARANGAY_OFFICIAL', 'MDRRMO'])
})

const signupSchema = barangayOfficialSchema.omit({ barangay: true })

export default defineEventHandler(async (event) => {
    const body = await readBody(event);    
    let validated;
    let validatedData : Prisma.UserCreateInput;
    if(body.role !== 'BARANGAY_OFFICIAL'){
        validated = signupSchema.safeParse(body)

        if(!validated.success){
            console.log(validated.error.issues)
            return;
        }

        validatedData = {
            email: validated.data?.email,
            name: validated.data?.name,
            password: validated.data?.password,
            role: validated.data?.role,
            status: 'active'
        }
    }else{
        validated = barangayOfficialSchema.safeParse(body)

        if(!validated.success){
            console.log(validated.error.issues)
            return;
        }   

        const barangay = await prisma.barangay.findFirst({
            where: {
                name: validated.data?.barangay
            }
        })
        validatedData = {
            ...validated.data,
            status: 'active',
            barangay: {
                connect: { id: barangay?.id}
            }
        }
    }
    const user = await prisma.user.create({
        data: validatedData
    })


            // name: validated.data.name,
            // email: validated.data.email,
            // password: validated.data.password,
            // role: validated.data.role,

    console.log('sucesss')
})