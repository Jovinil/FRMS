<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const auth = useAuthStore()

const loading = ref(false)
const error = ref<string | null>(null)
const lastLoaded = ref<Date | null>(null)

const loadUsers = async () => {
  try {
    loading.value = true
    error.value = null
    await auth.fetchUsers()
    lastLoaded.value = new Date()
  } catch (err) {
    console.error('Failed to load users', err)
    error.value = 'Failed to load users. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)

const roleCounts = computed(() => {
  const counts = {
    ADMIN: 0,
    BARANGAY_OFFICIAL: 0,
    MDRRMO: 0,
  }
  auth.users.forEach((user) => {
    const role = user.role as keyof typeof counts
    if (counts[role] !== undefined) counts[role] += 1
  })
  return counts
})

const totalUsers = computed(() => auth.users.length)
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div class="space-y-1">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Admin dashboard</p>
          <h1 class="text-2xl font-semibold text-slate-900">User management</h1>
          <p class="text-sm text-slate-500">Review accounts, roles, and quick actions from one place.</p>
        </div>
        <div class="flex gap-2">
          <UButton color="primary" icon="i-heroicons-plus-circle" to="/admin/createAccount">
            Create account
          </UButton>
          <UButton
            variant="ghost"
            icon="i-heroicons-arrow-path"
            :loading="loading"
            @click="loadUsers"
          >
            Refresh
          </UButton>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UCard>
          <p class="text-xs text-slate-500">Total users</p>
          <p class="text-2xl font-semibold text-slate-900">{{ totalUsers }}</p>
        </UCard>
        <UCard>
          <p class="text-xs text-slate-500">Admins</p>
          <p class="text-2xl font-semibold text-slate-900">{{ roleCounts.ADMIN }}</p>
        </UCard>
        <UCard>
          <p class="text-xs text-slate-500">Barangay officials</p>
          <p class="text-2xl font-semibold text-slate-900">{{ roleCounts.BARANGAY_OFFICIAL }}</p>
        </UCard>
        <UCard>
          <p class="text-xs text-slate-500">MDRRMO</p>
          <p class="text-2xl font-semibold text-slate-900">{{ roleCounts.MDRRMO }}</p>
        </UCard>
      </div>

      <div class="space-y-3">
        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          class="border"
        >
          {{ error }}
        </UAlert>

        <UCard :ui="{ body: '!p-0' }" class="shadow-lg">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold text-slate-900">Accounts</p>
                <p class="text-sm text-slate-500">View existing users, their roles, and status.</p>
              </div>
              <div class="text-xs text-slate-500">
                <span v-if="lastLoaded">Updated {{ lastLoaded.toLocaleTimeString() }}</span>
              </div>
            </div>
          </template>

          <div class="overflow-hidden rounded-b-xl">
            <AdminUserLoginTable />
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <p class="text-xs text-slate-500">Need to add someone new? Create an account above.</p>
              <UButton
                variant="ghost"
                size="sm"
                icon="i-heroicons-arrow-path"
                :loading="loading"
                @click="loadUsers"
              >
                Refresh list
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
