import type { EvacuationCenter, User } from "@prisma/client"
import SuperJSON from "superjson"
import z from "zod"

const evacuationCenterSchema = z.object({
    centerName: z.string(),
    capacity: z.number(),
    lng: z.number(),
    lat: z.number(),
    email: z.string().email(),
})

export const useEvacuationCenterStore = defineStore('evacuationCenter', {
    state: () =>  ({
        evacuationCenters: [] as EvacuationCenter[]
    }),
    
    actions: {
        createEvacuationCenter (centerName : string, capacity : number, lng : number, lat : number) {
            const email = useAuthStore().user!.email
            const validated = evacuationCenterSchema.safeParse({centerName, capacity, lng, lat, email})

            try{
                const request = $fetch('/api/evacuationCenter/create', {
                    method: 'POST',
                    body: validated.data
                })
            }catch(error){
                console.log(`${error} occured while trying to create evacuation center`)
            }
        },

        async fetchEvacuationCenters(){
            try{
                const request = await $fetch('/api/evacuationCenter')
                this.evacuationCenters = SuperJSON.deserialize(request.data)
            }catch(error){
                console.log(`${error} occured`)
            }
        }
    }
})