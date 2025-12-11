<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'

type ProfileState = {
  id?: number
  name?: string
  email?: string
  role?: string
  barangayId?: number
  barangayName?: string | null
}

type BarangayRow = {
  id: number
  name: string
}

type ProfileResponse = {
  profile: ProfileState
  barangays: BarangayRow[]
}

const auth = useAuthStore()

const barangayOptions = ref<{ label: string; value: number }[]>([])

const state = ref<ProfileState>({
  name: '',
  email: '',
  role: '',
  barangayId: undefined,
  barangayName: null,
})

const loading = ref(false)
const error = ref<string | null>(null)
const status = ref<{ message: string; color: 'red' | 'green' } | null>(null)

onMounted(async () => {
  if (!auth.user?.id) return

  try {
    loading.value = true
    error.value = null

    const data = await $fetch<ProfileResponse>('/api/profile', {
      params: { userId: auth.user.id },
    })

    barangayOptions.value = data.barangays.map((b) => ({
      label: b.name,
      value: b.id,
    }))

    const rawBarangayId = data.profile.barangayId

    const normalizedBarangayId =
      rawBarangayId == null ? undefined : Number(rawBarangayId)

    const exists = barangayOptions.value.some(
      (opt) => opt.value === normalizedBarangayId,
    )

    state.value = {
      ...state.value,
      ...data.profile,
      barangayId: exists ? normalizedBarangayId : undefined,
    }
  } catch (err) {
    console.error('Failed to load profile', err)
    error.value = 'Failed to load profile.'
  } finally {
    loading.value = false
  }
})

const onSubmit = async () => {
  if (!auth.user?.id) return
  const { success } = useFlash()
  const router = useRouter()
  status.value = null
  try {
    loading.value = true
    error.value = null

    await $fetch('/api/profile', {
      method: 'PUT',
      body: {
        userId: auth.user.id,
        name: state.value.name,
        email: state.value.email,
        barangayId: state.value.barangayId,
      },
    })

    success('Profile updated successfully.')
    status.value = {
      color: 'green',
      message: 'Profile updated successfully.',
    }
    await navigateTo('/barangay')
    router.go(0)
  } catch (err) {
    console.error('Failed to update profile', err)
    error.value = 'Failed to update profile.'
    status.value = {
      color: 'red',
      message: 'Failed to update profile.',
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-5xl grid gap-6 lg:grid-cols-[1fr,1.05fr] items-start">
      <div class="rounded-3xl bg-gradient-to-br from-blue-600 via-slate-800 to-slate-900 text-white shadow-2xl p-8 md:p-10 space-y-6">
        <p class="text-sm uppercase tracking-[0.2em] text-blue-100">Barangay Profile</p>
        <div class="space-y-3">
          <h1 class="text-3xl font-semibold leading-tight">Keep your contact info ready</h1>
          <p class="text-sm text-blue-50/80">
            Updated details help responders and residents know who to reach in your barangay.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex gap-3">
            <span class="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-sm font-semibold">1</span>
            <div>
              <p class="font-semibold">Use your official email</p>
              <p class="text-sm text-blue-50/70">This is where notices and report links will arrive.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-sm font-semibold">2</span>
            <div>
              <p class="font-semibold">Double-check barangay assignment</p>
              <p class="text-sm text-blue-50/70">Make sure you are tagged to the barangay you represent.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-sm font-semibold">3</span>
            <div>
              <p class="font-semibold">Save your updates</p>
              <p class="text-sm text-blue-50/70">Changes sync right away; refresh dashboards to confirm.</p>
            </div>
          </div>
        </div>
      </div>

      <UCard class="shadow-xl rounded-2xl">
        <template #header>
          <div class="space-y-1">
            <p class="text-lg font-semibold text-slate-900">Profile details</p>
            <p class="text-sm text-slate-500">Update your name, email, and barangay alignment.</p>
          </div>
        </template>

        <div class="space-y-4">
          <UAlert
            v-if="error"
            color="info"
            variant="soft"
            class="border"
          >
            {{ error }}
          </UAlert>

          <UAlert
            v-else-if="status"
            color="info"
            variant="soft"
            class="border"
          >
            {{ status.message }}
          </UAlert>

          <UForm :state="state" @submit="onSubmit" class="space-y-5">
            <div class="grid gap-4 sm:grid-cols-2">
              <UFormGroup label="Full name" name="name">
                <UInput v-model="state.name" :disabled="loading" />
              </UFormGroup>

              <UFormGroup label="Email" name="email" help="Use the email you actively check.">
                <UInput v-model="state.email" type="email" :disabled="loading" />
              </UFormGroup>
            </div>

            <UFormGroup
              label="Role"
              name="role"
              help="Assigned by the system administrator."
            >
              <UInput v-model="state.role" disabled />
            </UFormGroup>

            <UFormGroup label="Barangay" name="barangayId" help="Select the barangay you serve.">
              <USelect
                v-model="state.barangayId"
                :items="barangayOptions"
                placeholder="Select barangay"
                :disabled="loading"
              />
            </UFormGroup>

            <div class="flex justify-end gap-2 pt-2">
              <UButton type="submit" :loading="loading" color="primary">
                Save changes
              </UButton>
            </div>
          </UForm>
        </div>
      </UCard>
    </div>
  </div>
</template>
