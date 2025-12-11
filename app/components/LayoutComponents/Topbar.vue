<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from '#app'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAuthStore } from '~/stores/useAuthStore'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

// Reactive user details from auth store
const user = computed(() => ({
  name: auth.user?.name ?? 'User',
  role: auth.user?.role ?? '',
  avatarUrl: '', // plug your avatar URL here if you have one
}))

// Role-based profile path
const profilePath = computed(() => {
  const role = auth.user?.role

  switch (role) {
    case 'ADMIN':
      return '/admin/profile'
    case 'BARANGAY_OFFICIAL':
      return '/barangay/profile'
    case 'MDRRMO':
      return '/mdrrmo/profile'
    default:
      return '/profile' // fallback
  }
})

// Highlight "Profile" when on the role-specific profile route
const isOnProfile = computed(() => route.path === profilePath.value)

// Dropdown items as a computed so they react to auth changes
const menuItems = computed<DropdownMenuItem[][]>(() => [
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
      to: profilePath.value, // 👈 role-aware profile route
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      async onSelect() {
        // TODO: replace with your real logout logic
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
      <UDropdownMenu
        :items="menuItems"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8
        }"
        :ui="{ content: 'w-48' }"
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
