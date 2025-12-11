<script setup lang="ts">

definePageMeta({
  layout: 'empty'
})
const client = useSupabaseClient()
const authStore = useAuthStore()
const { error: flashError } = useFlash()
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

const handleLogin = async () => {
    error.value = null
    const emailValue = email.value.trim()
    const passwordValue = password.value

    if (!emailValue || !passwordValue) {
        const message = 'Email and password are required.'
        error.value = message
        flashError(message)
        return
    }

    if (passwordValue.length < 6) {
        const message = 'Password must be at least 6 characters.'
        error.value = message
        flashError(message)
        return
    }

    loading.value = true
    try {
        const { data, error: authError } = await client.auth.signInWithPassword({
            email: emailValue,
            password: passwordValue
        }) 

        if (authError) {
            const message = authError.message || 'Login failed. Check your credentials.'
            error.value = message
            flashError(message)
            return
        }

        if(data.user){
            authStore.login(data.user.email)
        } else {
            const message = 'Invalid credentials. Please try again.'
            error.value = message
            flashError(message)
        }
    } catch (err) {
        const message = 'Unable to login right now. Please try again.'
        error.value = message
        flashError(message)
    } finally {
        loading.value = false
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
        <p class="z-10 text-2xl font-bold">LOGIN</p>
        <div class="flex flex-col gap-15 w-full items-center">
            <UInput v-model="email" type="email" placeholder="Email" class="w-1/2" />
            <UInput v-model="password" type="password" placeholder="Password" class="w-1/2" />
        </div>
      

        <div class=" w-1/2 flex items-center justify-center z-10 mt-">
            <UButton type="submit" class="w-1/2" color="primary" variant="solid" :ui="{base: 'justify-center'}" :loading="loading">Login</UButton>
        </div>
    </form>

    </div>
</template>
