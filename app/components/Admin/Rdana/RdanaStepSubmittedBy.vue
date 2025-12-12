<script setup lang="ts">
import { watch } from 'vue'
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm'
import { useAuthStore } from '~/stores/useAuthStore'

const store = useRdanaFormStore()
const form = store.form

const auth = useAuthStore()

watch(
  () => auth.user,
  (u) => {
    if (!u) return

    // ✅ auto-fill only if empty (so user can override)
    if (!form.submittedBy.name) form.submittedBy.name = u.name ?? ''
    if (!form.submittedBy.email) form.submittedBy.email = u.email ?? ''
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="space-y-6 mt-6">
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">21. SUBMITTED BY</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField label="Name" name="submittedBy.name" required>
          <UInput v-model="form.submittedBy.name" 
          :readonly="true"
          />
        </UFormField>

        <UFormField label="Designation" name="submittedBy.designation" required>
          <UInput v-model="form.submittedBy.designation" />
        </UFormField>

        <UFormField label="Organization" name="submittedBy.organization" required>
          <UInput v-model="form.submittedBy.organization" />
        </UFormField>

        <UFormField label="RDANA Team / Cluster" name="submittedBy.rdanaTeam">
          <UInput v-model="form.submittedBy.rdanaTeam" />
        </UFormField>

        <UFormField label="Contact number" name="submittedBy.contactNumber">
          <UInput v-model="form.submittedBy.contactNumber" />
        </UFormField>

        <UFormField label="Email" name="submittedBy.email">
          <UInput v-model="form.submittedBy.email" 
          :readonly="true"
          />
        </UFormField>
      </div>
    </section>
  </div>
</template>
