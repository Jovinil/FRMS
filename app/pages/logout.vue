<template>
    <p>signing out...</p>
</template>

<script setup lang="ts">
onMounted(() => {
    const supabaseClient = useSupabaseClient()
    const signout = supabaseClient.auth.signOut()
    navigateTo('/login')
})
</script>