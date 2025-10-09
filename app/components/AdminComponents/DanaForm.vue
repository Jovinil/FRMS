<script setup lang="ts">
import { useDamageAssessmentForm } from '~/composables/useDanaForm'

const { schema, state, onSubmit } = useDamageAssessmentForm()
</script>

<template>
  <h1 class="text-2xl md:text-3xl font-bold text-primary">
    DAMAGE ASSESSMENT AND NEEDS ANALYSIS (DANA)
  </h1>

  <UCard>
    <UForm :schema="schema" :state="state" class="space-y-8" @submit="onSubmit">
      <!-- A. Profile of the Disaster -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">A. Profile of the Disaster</h2>

        <UFormField label="Type of Disaster / Emergency" name="disasterType">
          <UInput v-model="state.disasterType" placeholder="e.g., Flood, Earthquake" />
        </UFormField>

        <UFormField label="Date and Time of Occurrence" name="dateTimeOccurrence">
          <UInput v-model="state.dateTimeOccurrence" type="datetime-local" />
        </UFormField>

        <UFormField label="Source of Report" name="sourceOfReport">
          <UInput v-model="state.sourceOfReport" placeholder="e.g., Barangay Captain" />
        </UFormField>

        <UFormField label="Date and Time of Report" name="dateTimeReport">
          <UInput v-model="state.dateTimeReport" type="datetime-local" />
        </UFormField>
      </div>

      <!-- B. Summary of Effects -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">B. Summary of the Effects</h2>

        <UFormField label="Areas Affected" name="areasAffected">
          <UTextarea v-model="state.areasAffected" placeholder="List affected barangays, municipalities..." />
        </UFormField>

        <div class="grid grid-cols-3 gap-4">
          <UFormField label="Families Affected" name="familiesAffected">
            <UInput v-model="state.familiesAffected" type="number" />
          </UFormField>
          <UFormField label="Persons Affected" name="personsAffected">
            <UInput v-model="state.personsAffected" type="number" />
          </UFormField>
          <UFormField label="Children (1–17 yrs)" name="childrenAffected">
            <UInput v-model="state.childrenAffected" type="number" />
          </UFormField>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <UFormField label="Families Displaced" name="familiesDisplaced">
            <UInput v-model="state.familiesDisplaced" type="number" />
          </UFormField>
          <UFormField label="Persons Displaced" name="personsDisplaced">
            <UInput v-model="state.personsDisplaced" type="number" />
          </UFormField>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <UFormField label="Infants (0–1)" name="infants">
            <UInput v-model="state.infants" type="number" />
          </UFormField>
          <UFormField label="Children (2–12)" name="children">
            <UInput v-model="state.children" type="number" />
          </UFormField>
          <UFormField label="Adolescents (13–17)" name="adolescents">
            <UInput v-model="state.adolescents" type="number" />
          </UFormField>
          <UFormField label="Adults (18+)" name="adults">
            <UInput v-model="state.adults" type="number" />
          </UFormField>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <UFormField label="Dead" name="dead">
            <UInput v-model="state.dead" type="number" />
          </UFormField>
          <UFormField label="Injured" name="injured">
            <UInput v-model="state.injured" type="number" />
          </UFormField>
          <UFormField label="Missing" name="missing">
            <UInput v-model="state.missing" type="number" />
          </UFormField>
        </div>

        <UFormField label="Remarks / Additional Notes" name="remarks">
          <UTextarea v-model="state.remarks" placeholder="Any other relevant information..." />
        </UFormField>
      </div>

      <div class="pt-6">
        <UButton type="submit" color="primary">Submit Report</UButton>
      </div>
    </UForm>
  </UCard>
  
</template>
