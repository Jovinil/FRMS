import type { User } from "@prisma/client"
import SuperJSON from "superjson"
import z from "zod"

const createAccountSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['ADMIN', 'BARANGAY_OFFICIAL', 'MDRRMO'])

})

const emailSchema = z.object({
    email: z.string().email()
})

// interface UserState {
//     currentUser: User
// }


export const useAuthStore = defineStore('auth', {
    state: () =>  ({
        user: null as User | null
    }),
    
    actions: {
        createAccount (name : string, email : string, password : string, role : 'ADMIN' | 'BARANGAY_OFFICIAL' | 'MDRRMO') {
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
        },

        async login(email?: string) {
            if(!email) console.log("recea")
            const validated = emailSchema.safeParse({email})

            if(!validated.success){
                console.log(validated.error.issues)
                return;
            }

            try{
                const { data } = await $fetch('/api/user/login', {
                    method: 'POST',
                    body: validated.data,
                })
                this.user = SuperJSON.deserialize(data)
                switch (this.user!.role) {
                    case 'ADMIN':
                        navigateTo('/admin')
                        break;
                    case 'BARANGAY_OFFICIAL':
                        navigateTo('/barangay')
                        break;
                    case 'MDRRMO':
                        navigateTo('/mdrrmo')
                        break;
                    default:
                        navigateTo('/login')
                        break;
                }
            }catch(error){
                console.log(`${error} occured`);
            }
             
        }
    }
})