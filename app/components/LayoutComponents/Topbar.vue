<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from '#app'
import type { DropdownMenuItem } from '@nuxt/ui'

const router = useRouter()
const route = useRoute()

// 🔹 Mock user for now – plug in your auth user later
const user = ref({
  name: useAuthStore().user?.name,
  role: useAuthStore().user?.role,
  avatarUrl: '', // e.g. '/images/avatar.png'
})

// Highlight "Profile" when on /profile
const isOnProfile = computed(() => route.path === '/profile')

// Dropdown items, using Nuxt UI's DropdownMenuItem API
const menuItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value.name,
      type: 'label',
      avatar: user.value.avatarUrl
        ? { src: user.value.avatarUrl }
        : undefined,
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      type: 'link',
      to: '/profile'     // ← this is what does the redirect
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect() {
        // TODO: replace with real logout call
        // await $fetch('/api/auth/logout', { method: 'POST' })
        router.push('/logout')
      },
    },
  ],
])
</script>

<template>
  <div class="flex h-24 justify-between items-center py-2 px-12 md:px-24 bg-primary">
    <img src="/images/logo.png" alt="FRMS Logo" class="h-15" />

    <nav class="flex items-center gap-4">

      <!-- Profile dropdown -->
      <UDropdownMenu
        :items="menuItems"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8
        }"
        :ui="{
          content: 'w-48'
        }"
      >
        <UButton
          color="neutral"
          variant="ghost"
          class="flex items-center gap-2 text-white"
        >
          <UAvatar
            size="xs"
            :src="user.avatarUrl || undefined"
            :alt="user.name"
          />

          <div class="flex flex-col items-start leading-tight">
            <span class="text-sm font-medium hidden sm:inline">
              {{ user.name }}
            </span>
            <span class="text-xs text-white/70 hidden sm:inline">
              {{ user.role }}
            </span>
          </div>

          <UIcon
            name="i-lucide-chevron-down"
            class="hidden sm:inline"
            :class="isOnProfile ? 'rotate-180 transition-transform' : 'transition-transform'"
          />
        </UButton>
      </UDropdownMenu>
    </nav>
  </div>
</template>
