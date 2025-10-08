import type { User } from "@prisma/client"
import z from "zod"

const createAccountSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['ADMIN', 'BARANGAT_OFFICIAL', 'MDRRMO'])

})

// interface UserState {
//     currentUser: User
// }


export const useAuthStore = defineStore('auth', {
    state: () =>  ({
        user: null as User | null
    }),
    
    actions: {
        createAccount (name : string, email : string, password : string, role : 'ADMIN' | 'BARANGAT_OFFICIAL' | 'MDRRMO') {
            console.log(role)
            const validated = createAccountSchema.safeParse({name, email, password, role});

            if(!validated.success){
                console.log(validated.error.issues);
                return;
            }

            try{
                const request = $fetch('/api/user/signup', {
                    method: 'POST',
                    body: validated.data
                })
            }catch(error){
                console.log(`${error} occured while trying to create account`)
            }
        }
    }
})