import z from "zod"

const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['ADMIN', 'BARANGAT_OFFICIAL', 'MDRRMO'])
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);    
    const validated = signupSchema.safeParse(body)

    if(!validated.success){
        console.log(validated.error.issues)
        return;
    }

    const user = await prisma.user.create({
        data: {
            name: validated.data.name,
            email: validated.data.email,
            password: validated.data.password,
            role: validated.data.role,
            status: 'active'
        }
    })
    console.log('sucesss')
})