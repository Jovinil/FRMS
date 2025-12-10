<script setup lang="ts">
import { ref } from 'vue'

type ProfileState = {
  name: string
  email: string
  role: string
  barangay: string
}

const state = ref<ProfileState>({
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@example.com',
  role: 'MDRRMO',
  barangay: 'Barangay 1',
})

const loading = ref(false)

const onSubmit = async () => {
  try {
    loading.value = true

    // 🔹 Later: replace with real API
    // await $fetch('/api/profile', {
    //   method: 'PUT',
    //   body: state.value
    // })

    console.log('Profile updated (demo):', state.value)
    alert('Profile updated (static). Wire this to your backend next.')
  } catch (err) {
    console.error(err)
    alert('Failed to update profile.')
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

          <UFormGroup label="Barangay" name="barangay">
            <UInput v-model="state.barangay" />
          </UFormGroup>

          <div class="flex justify-end gap-2 pt-2">
            <UButton type="submit" :loading="loading">
              Save Changes
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UPageBody>
  </UPage>
</template>
