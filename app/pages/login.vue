<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})
const client = useSupabaseClient()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    const { data, error} = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
    }) 
    if(data.user){
        authStore.login(data.user.email)
    }
    if(error){
        // THIS IS THE ERROR MESSAGE CAN BE USED FOR WHEN INCORRECT
        //  CREDENTIALS ARE GIVEN ETC
        console.log(error.message)
    }
}
</script>

<template>
  <div class="h-1/2 w-1/3 flex flex-col relative">
    <img src="/images/logo.png" 
        alt="FRMS Logo" 
        class="absolute inset-0 h-1/2 object-contain m-auto" 
    />
    
    <form @submit.prevent="handleLogin" class="flex flex-col items-center justify-center h-full gap-20">
        <p class="z-10 text-2xl font-bold">ADMIN LOGIN</p>
        <div class="flex flex-col gap-15 w-full items-center">
            <UInput v-model="email" type="email" placeholder="Email" class="w-1/2" />
            <UInput v-model="password" type="password" placeholder="Password" class="w-1/2" />
        </div>
      

        <div class=" w-1/2 flex items-center justify-center z-10 mt-">
            <UButton type="submit" class="w-1/2" color="primary" variant="solid" :ui="{base: 'justify-center'}">Login</UButton>
        </div>
    </form>

    </div>
</template>