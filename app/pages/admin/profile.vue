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

// 👇 USelect options: { label, value }
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

onMounted(async () => {
  if (!auth.user?.id) return

  try {
    loading.value = true
    error.value = null

    const data = await $fetch<ProfileResponse>('/api/profile', {
      params: { userId: auth.user.id },
    })

    console.log('Profile API response:', data)

    // Map barangays → select options
    barangayOptions.value = data.barangays.map((b) => ({
      label: b.name,
      value: b.id,
    }))

    console.log('Mapped barangayOptions:', barangayOptions.value)

    // Ensure barangayId is number | null
    const rawBarangayId = data.profile.barangayId

    const normalizedBarangayId =
      rawBarangayId == null ? undefined : Number(rawBarangayId)

    // Optional: if the current barangayId doesn't exist anymore, set it to null
    const exists = barangayOptions.value.some(
      (opt) => opt.value === normalizedBarangayId,
    )
    
    state.value = {
        ...state.value,
        ...data.profile,
        barangayId: exists ? normalizedBarangayId : undefined,
    }
    console.log("asdpojasd")
    console.log(state.value.barangayId)
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
  const router = useRouter();
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
    await navigateTo('/barangay')
    router.go(0)
  } catch (err) {
    console.error('Failed to update profile', err)
    error.value = 'Failed to update profile.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Edit Profile"
      description="Update your FRMS account information."
    />

    <UPageBody>
      <UCard class="max-w-xl mx-auto">
        <template #header>
          <h2 class="text-lg font-semibold">
            Profile Information
          </h2>
        </template>

        <UForm :state="state" @submit="onSubmit" class="space-y-4">
          <UFormGroup label="Full Name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" type="email" />
          </UFormGroup>

          <UFormGroup
            label="Role"
            name="role"
            help="Assigned by the system administrator."
          >
            <UInput v-model="state.role" disabled />
          </UFormGroup>

          <UFormGroup label="Barangay" name="barangayId">
            <USelect
              v-model="state.barangayId"
              :items="barangayOptions"
              placeholder="Select barangay"
              />
            </UFormGroup>
            <!-- option-attribute="label"
            value-attribute="value" -->

          <div class="flex justify-end gap-2 pt-2">
            <UButton type="submit" :loading="loading">
              Save Changes
            </UButton>
          </div>
        </UForm>

        <p
          v-if="error"
          class="mt-3 text-sm text-red-500"
        >
          {{ error }}
        </p>
      </UCard>
    </UPageBody>
  </UPage>
</template>
