<!-- components/DanaForm.vue -->
<template>
  <div class="p-6 space-y-10">
    <!-- Header -->
    <header class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-primary">DANA Rapid Damage Assessment Form</h1>
    </header>

    <!-- Bind directly to the Pinia store's form -->
    <UForm :schema="schema" :state="form" @submit="onSubmit" class="space-y-8">
      <!-- A. PROFILE -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">A. Disaster Profile</h2>
        </template>
        <div class="grid md:grid-cols-2 gap-4">
          <!-- Matches models/dana.ProfileSection -->
          <UFormField label="Type of Disaster/Emergency" name="profile.typeOfDisaster">
            <UInput v-model="form.profile.typeOfDisaster" placeholder="e.g., Typhoon, Flood" />
          </UFormField>

          <UFormField label="Date of Occurrence" name="profile.dateOfOccurrence">
            <UInput type="date" v-model="form.profile.dateOfOccurrence" />
          </UFormField>

          <UFormField label="Time of Occurrence" name="profile.timeOfOccurrence">
            <UInput type="time" v-model="form.profile.timeOfOccurrence" />
          </UFormField>

          <UFormField label="Source of Report" name="profile.sourceOfReport">
            <UInput v-model="form.profile.sourceOfReport" placeholder="e.g., BDRRMC, Citizen" />
          </UFormField>

          <UFormField label="Date of Report" name="profile.dateOfReport">
            <UInput type="date" v-model="form.profile.dateOfReport" />
          </UFormField>

          <UFormField label="Time of Report" name="profile.timeOfReport">
            <UInput type="time" v-model="form.profile.timeOfReport" />
          </UFormField>
        </div>
      </UCard>

      <!-- B. SUMMARY (mapped to areasAffected + populationAffected) -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">B. Summary Situation</h2>
        </template>

        <UFormField label="Brief Summary of Incident / Areas Affected" name="areasAffected">
          <UTextarea
            v-model="form.areasAffected"
            :rows="4"
            class="w-full"
            placeholder="Provide a summary of damages, affected areas (barangays/cities/provinces/regions), and key events."
          />
        </UFormField>

        <div class="grid md:grid-cols-2 gap-4">
          <UFormField label="Families Affected (cumulative)" name="populationAffected.families">
            <UInput type="number" v-model.number="form.populationAffected.families" min="0" />
          </UFormField>

          <UFormField label="Persons Affected (cumulative)" name="populationAffected.persons">
            <UInput type="number" v-model.number="form.populationAffected.persons" min="0" />
          </UFormField>
        </div>
      </UCard>

      <!-- C. LOCAL ACTIONS -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">C. Local Actions Taken</h2>
        </template>

        <UFormField label="Emergency Responders Involved" name="localActions.emergencyResponders">
          <UTextarea v-model="form.localActions.emergencyResponders" :rows="2" placeholder="Who responded?" class="w-full" />
        </UFormField>

        <UFormField label="Assets Deployed" name="localActions.assetsDeployed">
          <UTextarea v-model="form.localActions.assetsDeployed" :rows="2" placeholder="Assets (vehicles, equipment) deployed" class="w-full" />
        </UFormField>

        <UFormField label="Extent of Local Assistance / Remarks" name="localActions.extentOfAssistance">
          <UTextarea v-model="form.localActions.extentOfAssistance" :rows="2" placeholder="Notes or scope of assistance" class="w-full"/>
        </UFormField>

        <UFormField label="Progress report to follow?" name="localActions.progressReportToFollow">
          <URadioGroup v-model="form.localActions.progressReportToFollow" :items="['Yes','No']" />
        </UFormField>

        <UFormField label="Signed (BDRRMC Chairman)" name="localActions.signedBy">
          <UInput v-model="form.localActions.signedBy" placeholder="Name of signatory" />
        </UFormField>
      </UCard>

      <!-- D. DAMAGES AND IMPACT -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">D. Damages and Impact</h2>
        </template>
        <div class="grid md:grid-cols-2 gap-4">
          <UFormField label="Houses Totally Damaged" name="damagedProperties.totally">
            <UInput type="number" v-model.number="form.damagedProperties.totally" min="0" />
          </UFormField>

          <UFormField label="Houses Partially Damaged" name="damagedProperties.partially">
            <UInput type="number" v-model.number="form.damagedProperties.partially" min="0" />
          </UFormField>

          <UFormField label="Estimated Cost (₱)" name="damagedProperties.estimatedCost">
            <UInput type="number" v-model.number="form.damagedProperties.estimatedCost" min="0" />
          </UFormField>

          <UFormField label="Casualties - Dead" name="casualties.dead">
            <UInput type="number" v-model.number="form.casualties.dead" min="0" />
          </UFormField>

          <UFormField label="Casualties - Injured" name="casualties.injured">
            <UInput type="number" v-model.number="form.casualties.injured" min="0" />
          </UFormField>

          <UFormField label="Casualties - Missing" name="casualties.missing">
            <UInput type="number" v-model.number="form.casualties.missing" min="0" />
          </UFormField>
        </div>

        <div class="mt-4">
          <label class="block font-medium mb-2">Damage Breakdown (optional)</label>
          <div class="grid md:grid-cols-3 gap-3">
            <UFormField label="Houses">
              <UInput type="number" v-model.number="form.damagedProperties.breakdown.houses" min="0" />
            </UFormField>
            <UFormField label="School Buildings">
              <UInput type="number" v-model.number="form.damagedProperties.breakdown.schoolBuildings" min="0" />
            </UFormField>
            <UFormField label="Hospitals">
              <UInput type="number" v-model.number="form.damagedProperties.breakdown.hospitals" min="0" />
            </UFormField>
            <UFormField label="Gov't Offices">
              <UInput type="number" v-model.number="form.damagedProperties.breakdown.govOffices" min="0" />
            </UFormField>
            <UFormField label="Public Markets">
              <UInput type="number" v-model.number="form.damagedProperties.breakdown.publicMarkets" min="0" />
            </UFormField>
            <UFormField label="Commercial Facilities">
              <UInput type="number" v-model.number="form.damagedProperties.breakdown.commercialFacilities" min="0" />
            </UFormField>
            <UFormField label="Others (specify)">
              <UInput v-model="form.damagedProperties.breakdown.othersSpec" />
            </UFormField>
          </div>
        </div>
      </UCard>

      <!-- E. LIFELINES -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">E. Lifelines and Services</h2>
        </template>

        <UFormField label="Power (short note / status)" name="lifelines.electrical">
          <UInput v-model="form.lifelines.electrical" placeholder="e.g., Outage at barangay X; Partial" />
        </UFormField>

        <UFormField label="Water (short note / status)" name="lifelines.water">
          <UInput v-model="form.lifelines.water" placeholder="e.g., No potable water; contamination suspected" />
        </UFormField>

        <UFormField label="Communication (short note)" name="lifelines.communication">
          <UInput v-model="form.lifelines.communication.cellSites" placeholder="Cell site count or note" />
        </UFormField>

        <UFormField label="Transportation — Passable?" name="lifelines.transportation.passable">
          <URadioGroup
            v-model="form.lifelines.transportation.passable"
            :items="[{ label: 'Passable', value: 'passable' }, { label: 'Not passable', value: 'not_passable' }]"
          />
        </UFormField>

        <div class="grid md:grid-cols-3 gap-3 mt-3">
          <UFormField label="Roads - National (No.)">
            <UInput type="number" v-model.number="form.lifelines.transportation.roads.national" min="0" />
          </UFormField>
          <UFormField label="Provincial (No.)">
            <UInput type="number" v-model.number="form.lifelines.transportation.roads.provincial" min="0" />
          </UFormField>
          <UFormField label="Municipal (No.)">
            <UInput type="number" v-model.number="form.lifelines.transportation.roads.municipal" min="0" />
          </UFormField>
        </div>
      </UCard>

      <!-- F. AGRICULTURE -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">F. Agriculture and Livelihood</h2>
        </template>
        <div class="grid md:grid-cols-2 gap-4">
          <UFormField label="Rice area damaged (ha)" name="agriculture.rice.hectares">
            <UInput type="number" v-model.number="form.agriculture.rice.hectares" min="0" />
          </UFormField>

          <UFormField label="Corn area damaged (ha)" name="agriculture.corn.hectares">
            <UInput type="number" v-model.number="form.agriculture.corn.hectares" min="0" />
          </UFormField>

          <UFormField label="Fishponds affected (No./ha)" name="agriculture.fishponds">
            <UInput type="number" v-model.number="form.agriculture.fishponds" min="0" />
          </UFormField>

          <UFormField label="Fishing boats lost (No.)" name="agriculture.fishingBoats">
            <UInput type="number" v-model.number="form.agriculture.fishingBoats" min="0" />
          </UFormField>

          <UFormField label="Livestock heads lost (No.)" name="agriculture.livestockHeads">
            <UInput type="number" v-model.number="form.agriculture.livestockHeads" min="0" />
          </UFormField>

          <UFormField label="Livestock peso value (₱)" name="agriculture.livestockValue">
            <UInput type="number" v-model.number="form.agriculture.livestockValue" min="0" />
          </UFormField>
        </div>
      </UCard>

      <!-- G. FINAL ASSESSMENT (mapped to localActions.extentOfAssistance & signedBy) -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">G. Final Assessment and Submission</h2>
        </template>

        <UFormField label="Assessment Summary (notes / recommendation)" name="localActions.extentOfAssistance">
          <UTextarea v-model="form.localActions.extentOfAssistance" :rows="3" placeholder="Summarize findings and recommended actions." class="w-full" />
        </UFormField>

        <div class="grid md:grid-cols-2 gap-4 mt-3">
          <UFormField label="Submitted / Signed By" name="localActions.signedBy">
            <UInput v-model="form.localActions.signedBy" placeholder="Name of BDRRMC Chair or team lead" />
          </UFormField>

          <UFormField label="Contact (optional)">
            <UInput v-model="form.localActions.assetsDeployed" placeholder="Contact or office (reused field for simplicity)" />
          </UFormField>
        </div>
      </UCard>

      <div class="flex justify-end gap-4">
        <UButton variant="outline" color="info" @click="resetForm">Reset</UButton>
        <UButton type="button" color="primary" @click="onSubmit">Submit</UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
/**
 * Corrected DANA view — bindings aligned to models/dana.ts DANAForm class
 * - Uses useDanaStore() from ~/stores/dana
 * - Uses schema that maps to the properties used in the template
 */

import { useDanaStore } from '~/stores/useDANAFormStore'     // adjust path if your store file is located elsewhere
import { z } from 'zod'
import { reactive, toRefs } from 'vue'

// Pinia store
const store = useDanaStore()
const form = store.form  // this is the DANAForm instance from the store

// Zod schema — includes only the keys we currently bind in the UI.
// If you add more fields, extend this schema to match them.
const schema = z.object({
  profile: z.object({
    typeOfDisaster: z.string().min(1, 'Type of disaster is required'),
    dateOfOccurrence: z.string().min(1, 'Date of occurrence is required'),
    timeOfOccurrence: z.string().optional(),
    sourceOfReport: z.string().min(1, 'Source of report is required'),
    dateOfReport: z.string().min(1, 'Date of report is required'),
    timeOfReport: z.string().optional(),
  }),
  areasAffected: z.string().optional(),
  populationAffected: z.object({
    families: z.number().nullable().optional(),
    persons: z.number().nullable().optional(),
  }).optional(),
  damagedProperties: z.object({
    totally: z.number().nullable().optional(),
    partially: z.number().nullable().optional(),
    estimatedCost: z.number().nullable().optional(),
    breakdown: z.object({
      houses: z.number().nullable().optional(),
      schoolBuildings: z.number().nullable().optional(),
      hospitals: z.number().nullable().optional(),
      govOffices: z.number().nullable().optional(),
      publicMarkets: z.number().nullable().optional(),
      commercialFacilities: z.number().nullable().optional(),
      othersSpec: z.string().optional(),
    }).optional(),
  }).optional(),
  casualties: z.object({
    dead: z.number().nullable().optional(),
    injured: z.number().nullable().optional(),
    missing: z.number().nullable().optional(),
  }).optional(),
  lifelines: z.object({
    electrical: z.string().optional(),
    water: z.string().optional(),
    communication: z.any().optional(),
    transportation: z.object({
      passable: z.enum(['passable', 'not_passable', '']).optional(),
      roads: z.object({
        national: z.number().nullable().optional(),
        provincial: z.number().nullable().optional(),
        municipal: z.number().nullable().optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  agriculture: z.object({
    rice: z.object({
      hectares: z.number().nullable().optional(),
      metricTons: z.number().nullable().optional(),
      lossValue: z.number().nullable().optional(),
    }).optional(),
    corn: z.object({
      hectares: z.number().nullable().optional(),
      metricTons: z.number().nullable().optional(),
      lossValue: z.number().nullable().optional(),
    }).optional(),
    fishponds: z.number().nullable().optional(),
    fishingBoats: z.number().nullable().optional(),
    livestockHeads: z.number().nullable().optional(),
    livestockValue: z.number().nullable().optional(),
  }).optional(),
  localActions: z.object({
    emergencyResponders: z.string().optional(),
    assetsDeployed: z.string().optional(),
    extentOfAssistance: z.string().optional(),
    progressReportToFollow: z.enum(['Yes', 'No', '']).optional(),
    signedBy: z.string().optional(),
  }).optional(),
})

// Submit handler
const onSubmit = async () => {
  // store.validateForm() returns boolean (true if valid)
  // const valid = store.validateForm()
  // if (!valid) {
  //   // show errors stored in store.errors
  //   // keep message short — UI alert/toast recommended in real app
  //   // eslint-disable-next-line no-alert
  //   alert('Please fix validation errors:\n' + (store.errors || []).join('\n'))
  //   return
  // }

  // call the store's saveForm() (placeholder; replace with real persistence)
  const saved = await store.saveForm()
  // if (saved) {
  //   // eslint-disable-next-line no-alert
  //   alert('✅ DANA form successfully saved!')
  // } else {
  //   // eslint-disable-next-line no-alert
  //   alert('Unable to save form. Fix validation errors first.')
  // }
}

// Reset
const resetForm = () => {
  store.resetForm()
}
</script>
