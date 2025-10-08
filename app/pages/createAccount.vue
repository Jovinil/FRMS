<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})
const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const role = ref()
const name = ref('')
const useAuth = useAuthStore();

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
    try{
        const signup = await client.auth.signUp({
            email: email.value,
            password: password.value
        })
        if(!signup.error){
            useAuth.createAccount(name.value, email.value, password.value, role.value)
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
        <p class="z-10 text-2xl font-bold">Create ACcount</p>
        <div class="flex flex-col gap-15 w-full items-center">
            <UInput v-model="name" type="text" placeholder="Full Name" class="w-1/2" />
            <UInput v-model="email" type="email" placeholder="Email" class="w-1/2" />
            <UInput v-model="password" type="password" placeholder="Password" class="w-1/2" />
            <UInputMenu v-model="role" value-key="id" :items="roles" placeholder="Selec role" class="w-1/2" />
        </div>
      

        <div class=" w-1/2 flex items-center justify-center z-10 mt-">
            <UButton type="submit" class="w-1/2" color="primary" variant="solid" :ui="{base: 'justify-center'}">Login</UButton>
        </div>
    </form>

    </div>
</template>