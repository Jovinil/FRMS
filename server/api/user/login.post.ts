import z from "zod"
import superjson from "superjson"

const LoginSchema = z.object({
    email: z.string().email()
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const validated = await LoginSchema.safeParse(body)

    const user = await prisma.user.findFirst({
        where: {
            email:  validated.data?.email
        }
    });

    return {data: superjson.serialize(user)}
})