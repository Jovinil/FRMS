import type { Barangay } from "@prisma/client";
import SuperJSON from "superjson";

export const useBarangayStore = defineStore('barangay', {
    state: () => ({
        barangays: [] as Barangay[]

    }),

    actions: {
        async fetchBarangays(){
            try{
                const request = await $fetch('/api/barangay')
                this.barangays = SuperJSON.deserialize(request.data)
            }catch(error){
                console.log(`${error} occured`)
            }
        }
    }
})