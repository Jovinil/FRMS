<script setup lang="ts">
import z from 'zod'


definePageMeta({
  layout: 'empty'
})

const userSignupSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal('BARANGAY_OFFICIAL'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
    barangay: z.string().min(1, 'Barangay required'),
  }),
  z.object({
    role: z.enum(['ADMIN', 'MDRRMO']),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
  }),
])

const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const role = ref()
const name = ref('')
const useAuth = useAuthStore();
const barangay = ref()
const barangayList = useBarangayStore().barangays

const roles = ref([
    {
        label: 'Admin',
        id: 'ADMIN'
    },
    {
        label: 'Barangay official',
        id: 'BARANGAY_OFFICIAL'
    },
    {
        label: 'MDRRMO',
        id: 'MDRRMO'
    },
])

const handleSignup = async () => {
    const payload = {name: name.value, email: email.value, password: password.value, role: role.value, barangay: barangay.value};

    
    const validated = userSignupSchema.safeParse(payload)
    if(!validated.success){
        console.log(validated.error.issues)
        return;
    }
    try{
        const signup = await client.auth.signUp({
            email: email.value,
            password: password.value
        })
        if(!signup.error){
            if(validated.data.role === 'BARANGAY_OFFICIAL'){
                useAuth.createAccount(validated.data.name, validated.data.email, validated.data.password, validated.data.role, validated.data.barangay)
            }else {
                useAuth.createAccount(validated.data.name, validated.data.email, validated.data.password, validated.data.role)
            }
        }
    }catch(error){
        console.log(`${error} occured`)
    }
}

</script>

<template>
  <div class="h-1/2 w-1/3 flex flex-col relative">
    <!-- <img src="/images/logo.png" 
        alt="FRMS Logo" 
        class="absolute inset-0 h-1/2 object-contain m-auto" 
    /> -->
    
    <form @submit.prevent="handleSignup" class="flex flex-col items-center justify-center h-full gap-20">
        <p class="z-10 text-2xl font-bold">Create Account</p>
        <div class="flex flex-col gap-15 w-full items-center">
            <UInput v-model="name" type="text" placeholder="Full Name" class="w-1/2" />
            <UInput v-model="email" type="email" placeholder="Email" class="w-1/2" />
            <UInput v-model="password" type="password" placeholder="Password" class="w-1/2" />
            <UInputMenu v-model="role" value-key="id" :items="roles" placeholder="Select role" class="w-1/2" />
            <UInputMenu v-if="role === 'BARANGAY_OFFICIAL'" v-model="barangay" value-key="name" label-key="location" :items="barangayList" placeholder="Select Barangay" class="w-1/2" />
        </div>
      

        <div class=" w-1/2 flex items-center justify-center z-10 mt-">
            <UButton type="submit" class="w-1/2" color="primary" variant="solid" :ui="{base: 'justify-center'}">Sign up</UButton>
        </div>
    </form>

    </div>
</template>