<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '#ui/types'

// form state
const state = ref({
  incidentName: '',
  date: '',
  location: '',
  disasterType: '',
  casualties: 0,
  injured: 0,
  missing: 0,
  affectedFamilies: 0,
  infrastructureDamage: '',
  immediateNeeds: [],
  remarks: ''
})

const disasterTypes = ['Flood', 'Earthquake', 'Typhoon', 'Landslide', 'Fire']
const needsOptions = ['Food', 'Water', 'Shelter', 'Medical', 'Rescue', 'Communication']

// validation
const validate = (state: any): FormError[] => {
  const errors: FormError[] = []
  if (!state.incidentName) errors.push({ name: 'incidentName', message: 'Required' })
  if (!state.date) errors.push({ name: 'date', message: 'Required' })
  if (!state.location) errors.push({ name: 'location', message: 'Required' })
  if (!state.disasterType) errors.push({ name: 'disasterType', message: 'Required' })
  return errors
}

// submit handler
const onSubmit = async (event: FormSubmitEvent<typeof state.value>) => {
  console.log('RDANA submitted:', event.data)
  // here you can send to Firestore or your backend API
}
</script>

<template>
    DAAAAAAANA
  <UCard class="w-full mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Rapid Damage Assessment and Needs Analysis (RDANA) Form</h2>

    <UForm :state="state" :validate="validate" @submit="onSubmit" class="space-y-6">
      <UFormGroup label="Incident Name" name="incidentName">
        <UInput v-model="state.incidentName" placeholder="e.g. Flooding in Barangay X" />
      </UFormGroup>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="Date" name="date">
          <UInput v-model="state.date" type="date" />
        </UFormGroup>

        <UFormGroup label="Location" name="location">
          <UInput v-model="state.location" placeholder="City / Barangay" />
        </UFormGroup>
      </div>

      <UFormGroup label="Type of Disaster" name="disasterType">
        <USelect v-model="state.disasterType" :options="disasterTypes" placeholder="Select type" />
      </UFormGroup>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormGroup label="Casualties" name="casualties">
          <UInput v-model.number="state.casualties" type="number" min="0" />
        </UFormGroup>
        <UFormGroup label="Injured" name="injured">
          <UInput v-model.number="state.injured" type="number" min="0" />
        </UFormGroup>
        <UFormGroup label="Missing" name="missing">
          <UInput v-model.number="state.missing" type="number" min="0" />
        </UFormGroup>
      </div>

      <UFormGroup label="Affected Families" name="affectedFamilies">
        <UInput v-model.number="state.affectedFamilies" type="number" min="0" />
      </UFormGroup>

      <UFormGroup label="Infrastructure Damage" name="infrastructureDamage">
        <UTextarea v-model="state.infrastructureDamage" placeholder="Brief description" />
      </UFormGroup>

      <UFormGroup label="Immediate Needs" name="immediateNeeds">
        <USelectMenu
          v-model="state.immediateNeeds"
          :options="needsOptions"
          multiple
          placeholder="Select needs"
        />
      </UFormGroup>

      <UFormGroup label="Remarks" name="remarks">
        <UTextarea v-model="state.remarks" placeholder="Additional notes" />
      </UFormGroup>

      <UButton type="submit" variant="solid" color="info">Submit Assessment</UButton>
    </UForm>
  </UCard>
</template>
