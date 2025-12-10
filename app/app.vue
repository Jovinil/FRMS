<script setup lang="ts">
const toaster = { duration: 3000 } // 3-second toasts globally
</script>

<template>
  <!-- Nuxt UI v4 wrapper with built-in Toaster -->
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
