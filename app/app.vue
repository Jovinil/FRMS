<script setup lang="ts">
const toaster = { duration: 10000 } // 10-second toasts globally
const auth = useAuthStore()
const { checkReminder } = useBarangayFormReminder()

const reminderChecked = ref(false)

watch(
  () => [auth.user?.id, auth.user?.barangayId] as const,
  async ([id, barangayId]) => {
    if (!id || !barangayId) return
    if (reminderChecked.value) return
    reminderChecked.value = true
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
