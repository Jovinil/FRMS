<script setup lang="ts">
const toaster = { duration: 1000 } // 10-second toasts globally
const auth = useAuthStore()
const { checkReminder } = useBarangayFormReminder()

watch(
  () => auth.user?.id,
  async (id) => {
    if (!id) return
    // user just logged in or page reloaded while already logged in
    await checkReminder()
  },
  { immediate: true }
)
</script>

<template>
  <!-- Nuxt UI v4 wrapper with built-in Toaster -->
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
