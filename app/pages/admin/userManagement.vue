<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  navigateTo('/admin')
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center text-slate-600">
    Redirecting to admin dashboard…
  </div>
</template>
