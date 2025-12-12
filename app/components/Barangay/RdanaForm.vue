<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-primary">RDANA — Rapid Damage & Needs Assessment</h1>

    <UForm :state="form" :schema="schema" @submit="onSubmit" class="space-y-6">
      <!-- A. PROFILE -->
      <UCard>
        <template #header><h2 class="text-lg font-semibold">A. Profile</h2></template>
        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="Type of disaster" name="disaster_type">
            <UInput v-model="form.disaster_type" placeholder="e.g., Typhoon, Flood" />
          </UFormField>
          <UFormField label="Date/Time of occurrence" name="date_time_occur">
            <UInput v-model="form.date_time_occur" type="datetime-local" />
          </UFormField>
          <UFormField label="Areas affected" name="areas_affected">
            <UInput v-model="form.areas_affected" placeholder="Areas affected" />
          </UFormField>

          <UFormField label="Source of report" name="source_of_report">
            <UInput v-model="form.source_of_report" placeholder="Source of report" />
          </UFormField>
          <UFormField label="Date/Time of reports" name="date_time_reports">
            <UInput v-model="form.date_time_reports" type="datetime-local" />
          </UFormField>
        </div>
      </UCard>

      <!-- B. INITIAL EFFECTS -->
      <UCard>
        <template #header><h2 class="text-lg font-semibold">B. Initial Effects</h2></template>

        <h3 class="font-semibold">1. Affected population</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <UFormField label="# Families" name="affected_popu_families">
            <UInput type="number" v-model.number="form.affected_popu_families" />
          </UFormField>
          <UFormField label="# Persons" name="affected_popu_persons">
            <UInput type="number" v-model="form.affected_popu_persons" />
          </UFormField>
          <UFormField label="Infants (0-1 yrs)" name="affected_popu_num_infants">
            <UInput type="number" v-model.number="form.affected_popu_num_infants" />
          </UFormField>
          <UFormField label="Children (2-<18)" name="affected_popu_num_children">
            <UInput type="number" v-model.number="form.affected_popu_num_children" />
          </UFormField>
          <UFormField label="Adults (18+)" name="affected_popu_num_adults">
            <UInput type="number" v-model.number="form.affected_popu_num_adults" />
          </UFormField>
        </div>

        <h3 class="font-semibold mt-4">2. Displaced population</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <UFormField label="# Families" name="displaced_popu_families">
            <UInput type="number" v-model.number="form.displaced_popu_families" />
          </UFormField>
          <UFormField label="# Persons" name="displaced_popu_persons">
            <UInput type="number" v-model.number="form.displaced_popu_persons" />
          </UFormField>
          <UFormField label="Infants" name="displaced_popu_num_infants">
            <UInput type="number" v-model.number="form.displaced_popu_num_infants" />
          </UFormField>
          <UFormField label="Children" name="displaced_popu_num_children">
            <UInput type="number" v-model.number="form.displaced_popu_num_children" />
          </UFormField>
          <UFormField label="Adults" name="displaced_popu_num_adults">
            <UInput type="number" v-model.number="form.displaced_popu_num_adults" />
          </UFormField>
        </div>

        <h3 class="font-semibold mt-4">3. Casualties</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="Location (Dead)" name="loc_dead">
            <UInput v-model="form.loc_dead" />
          </UFormField>
          <UFormField label="# Dead" name="num_dead">
            <UInput type="number" v-model.number="form.num_dead" />
          </UFormField>
          <UFormField label="Cause (Dead)" name="cause_dead">
            <UInput v-model="form.cause_dead" />
          </UFormField>

          <UFormField label="Location (Injured)" name="loc_injured">
            <UInput v-model="form.loc_injured" />
          </UFormField>
          <UFormField label="# Injured" name="num_injured">
            <UInput type="number" v-model.number="form.num_injured" />
          </UFormField>
          <UFormField label="Cause (Injured)" name="cause_injured">
            <UInput v-model="form.cause_injured" />
          </UFormField>

          <UFormField label="Location (Missing)" name="loc_missing">
            <UInput v-model="form.loc_missing" />
          </UFormField>
          <UFormField label="# Missing" name="num_missing">
            <UInput type="number" v-model.number="form.num_missing" />
          </UFormField>
          <UFormField label="Missing notes" name="missing">
            <UInput v-model="form.missing" />
          </UFormField>
        </div>
      </UCard>

      <!-- C. INITIAL NEEDS / SAR, Evac, Medical -->
      <UCard>
        <template #header><h2 class="text-lg font-semibold">C. Initial Needs (SAR / Evac / Medical)</h2></template>

        <h3 class="font-semibold">Search & Rescue</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="Exact locations" name="search_and_rescue_exact_loc">
            <UTextarea v-model="form.search_and_rescue_exact_loc" />
          </UFormField>
          <UFormField label="Approx. missing (children)" name="sar_approx_num_missing_children">
            <UInput type="number" v-model.number="form.sar_approx_num_missing_children" />
          </UFormField>
          <UFormField label="Approx. missing (adults)" name="sar_approx_num_missing_adults">
            <UInput type="number" v-model.number="form.sar_approx_num_missing_adults" />
          </UFormField>
        </div>

        <h3 class="font-semibold mt-4">Evacuation</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="Exact locations" name="evacuation_exact_loc">
            <UTextarea v-model="form.evacuation_exact_loc" />
          </UFormField>
          <UFormField label="Response (number evacuated)" name="evac_response">
            <UInput v-model="form.evac_response" />
          </UFormField>
          <UFormField label="Unmet needs (evac)" name="unmet_needs_evac">
            <UInput v-model="form.unmet_needs_evac" />
          </UFormField>
          <UFormField label="Evacuation center names" name="evac_center_names">
            <UInput v-model="form.evac_center_names" />
          </UFormField>
          <UFormField label="Approx to evacuate (infants)" name="approx_num_to_evac_infants">
            <UInput type="number" v-model.number="form.approx_num_to_evac_infants" />
          </UFormField>
          <UFormField label="Approx to evacuate (children)" name="approx_num_to_evac_children">
            <UInput type="number" v-model.number="form.approx_num_to_evac_children" />
          </UFormField>
          <UFormField label="Approx to evacuate (adults)" name="approx_num_to_evac_adults">
            <UInput type="number" v-model.number="form.approx_num_to_evac_adults" />
          </UFormField>
          <UFormField label="# Persons in EC needing assistance" name="num_of_person_in_evac_in_need_of_assistance">
            <UInput v-model="form.num_of_person_in_evac_in_need_of_assistance" />
          </UFormField>
          <UFormField label="Daily requirement of affected fam in EC" name="requirement_of_affected_fam_in_evac">
            <UTextarea v-model="form.requirement_of_affected_fam_in_evac" />
          </UFormField>
        </div>

        <h3 class="font-semibold mt-4">Medical / Health</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="Exact locations" name="medical_health_exact_loc">
            <UTextarea v-model="form.medical_health_exact_loc" />
          </UFormField>
          <UFormField label="# Injured (medical)" name="medical_health_num_injured">
            <UInput type="number" v-model.number="form.medical_health_num_injured" />
          </UFormField>
          <UFormField label="Unmet health needs" name="medical_health_unmet_needs">
            <UTextarea v-model="form.medical_health_unmet_needs" />
          </UFormField>

          <UFormField label="Displaced needing medical attention - families" name="displaced_fam_medic_attention_families">
            <UInput type="number" v-model.number="form.displaced_fam_medic_attention_families" />
          </UFormField>
          <UFormField label="Displaced needing medical attention - persons" name="displaced_fam_medic_attention_persons">
            <UInput type="number" v-model.number="form.displaced_fam_medic_attention_persons" />
          </UFormField>
          <UFormField label="Displaced needing medical attention - infants" name="displaced_fam_medic_attention_infants">
            <UInput type="number" v-model.number="form.displaced_fam_medic_attention_infants" />
          </UFormField>
          <UFormField label="Displaced needing medical attention - children" name="displaced_fam_medic_attention_children">
            <UInput type="number" v-model.number="form.displaced_fam_medic_attention_children" />
          </UFormField>
          <UFormField label="Displaced needing medical attention - adults" name="displaced_fam_medic_attention_adults">
            <UInput type="number" v-model.number="form.displaced_fam_medic_attention_adults" />
          </UFormField>

          <UFormField label="Health care facilities (where/how)" name="health_care_facilities">
            <UTextarea v-model="form.health_care_facilities" />
          </UFormField>
          <UFormField label="Who is in charge (emergency health)" name="emergency_health_and_medical_services">
            <UInput v-model="form.emergency_health_and_medical_services" />
          </UFormField>
          <UFormField label="Are there health workers assessing children?" name="is_there_health_workers">
            <URadioGroup :items="['Yes','No']" v-model="form.is_there_health_workers" />
          </UFormField>
        </div>
      </UCard>

      <!-- D. Shelter, Food, Water, Sanitation, Lifelines (condensed here but all fields included) -->
      <UCard>
        <template #header><h2 class="text-lg font-semibold">D/E. Shelter, Food, Water, Sanitation, Lifelines & Education</h2></template>

        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="Shelter/clothing exact locations" name="shelter_and_clothing_exact_loc">
            <UTextarea v-model="form.shelter_and_clothing_exact_loc" />
          </UFormField>

          <UFormField label="# People shelter male" name="num_of_people_shelter_and_clothing_male">
            <UInput type="number" v-model.number="form.num_of_people_shelter_and_clothing_male" />
          </UFormField>
          <UFormField label="# People shelter female" name="num_of_people_shelter_and_clothing_female">
            <UInput type="number" v-model.number="form.num_of_people_shelter_and_clothing_female" />
          </UFormField>

          <UFormField label="# Food infants" name="num_of_people_food_infants">
            <UInput type="number" v-model.number="form.num_of_people_food_infants" />
          </UFormField>
          <UFormField label="Total # people requiring food" name="total_num_of_people_food">
            <UInput type="number" v-model.number="form.total_num_of_people_food" />
          </UFormField>
          <UFormField label="# Food children" name="num_of_people_food_children">
            <UInput type="number" v-model.number="form.num_of_people_food_children" />
          </UFormField>

          <UFormField label="# Without potable water (infants)" name="num_of_people_without_pot_water_infants">
            <UInput type="number" v-model.number="form.num_of_people_without_pot_water_infants" />
          </UFormField>
          <UFormField label="# Without potable water (adults)" name="num_of_people_without_pot_water_adult">
            <UInput type="number" v-model.number="form.num_of_people_without_pot_water_adult" />
          </UFormField>
          <UFormField label="# Without potable water (children)" name="num_of_people_without_pot_water_children">
            <UInput type="number" v-model.number="form.num_of_people_without_pot_water_children" />
          </UFormField>

          <UFormField label="Water response status" name="water_response_stat">
            <UTextarea v-model="form.water_response_stat" />
          </UFormField>
          <UFormField label="Water unmet needs" name="water_unmet_needs">
            <UTextarea v-model="form.water_unmet_needs" />
          </UFormField>
          <UFormField label="Is there water arrangement?" name="is_there_water_arrangement">
            <URadioGroup :items="['Yes','No']" v-model="form.is_there_water_arrangement" />
          </UFormField>

          <UFormField label="Restoration lifelines exact loc" name="restoration_lifelines_exact_loc">
            <UTextarea v-model="form.restoration_lifelines_exact_loc" />
          </UFormField>
          <UFormField label="Restoration lifelines condition" name="restoration_lifelines_condition">
            <UInput v-model="form.restoration_lifelines_condition" />
          </UFormField>
          <UFormField label="Lifeline unmet needs" name="restoration_lifelines_unmet_needs">
            <UTextarea v-model="form.restoration_lifelines_unmet_needs" />
          </UFormField>
        </div>

        <h4 class="mt-4 font-semibold">Education</h4>
        <div class="grid md:grid-cols-3 gap-4">
          <UFormField label="School damage (Yes/No)" name="is_there_school_damage_yes">
            <URadioGroup :items="['Yes','No']" v-model="form.is_there_school_damage_yes" />
          </UFormField>
          <UFormField label="# Children affected by damage" name="num_of_children_affected_by_damage">
            <UInput type="number" v-model.number="form.num_of_children_affected_by_damage" />
          </UFormField>
          <UFormField label="Extent of disruption" name="extent_of_disruption">
            <UTextarea v-model="form.extent_of_disruption" />
          </UFormField>
        </div>
      </UCard>

      <!-- E. Local Initial Response -->
      <UCard>
        <template #header><h2 class="text-lg font-semibold">E. Local Initial Response</h2></template>

        <div class="grid md:grid-cols-2 gap-4">
          <UFormField label="Responders involved" name="responders_involved">
            <UInput v-model="form.responders_involved" />
          </UFormField>
          <UFormField label="Assets deployed" name="assets_deployed">
            <UInput v-model="form.assets_deployed" />
          </UFormField>

          <UFormField label="# Families served" name="num_of_persons_served_families">
            <UInput type="number" v-model.number="form.num_of_persons_served_families" />
          </UFormField>
          <UFormField label="# Persons served" name="num_of_persons_served_persons">
            <UInput type="number" v-model.number="form.num_of_persons_served_persons" />
          </UFormField>

          <UFormField label="# Infants served" name="num_of_persons_served_infants">
            <UInput type="number" v-model.number="form.num_of_persons_served_infants" />
          </UFormField>
          <UFormField label="# Children served" name="num_of_persons_served_children">
            <UInput type="number" v-model.number="form.num_of_persons_served_children" />
          </UFormField>

          <UFormField label="# Adults served" name="num_of_persons_served_adults">
            <UInput type="number" v-model.number="form.num_of_persons_served_adults" />
          </UFormField>
          <UFormField label="Extent of local assistance" name="extent_of_local_assist">
            <UTextarea v-model="form.extent_of_local_assist" />
          </UFormField>

          <UFormField label="Signed (name/role)" name="signed">
            <UInput v-model="form.signed" />
          </UFormField>
        </div>
      </UCard>

      <div class="flex justify-end gap-3">
        <UButton variant="outline" color="info" @click="store.resetForm()">Reset</UButton>
        <UButton type="submit" color="primary">Validate & Continue</UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { RDANASchema } from '~/models/rdana'
import { useRDANAStore } from '~/stores/useRDANAStore'

const store = useRDANAStore()
const form = store.form

// Compose a Zod schema identical to the model for UForm validation
const schema = RDANASchema

const isGenerating = ref(false)

async function onSubmit() {
  if (!store.validateForm()) {
    alert('❌ Please fix validation errors before submitting.')
    return
  }

  try {
    isGenerating.value = true

    // Load your base fillable template
    const response = await fetch('/server/templates/fillable-rdana-form.pdf')
    const pdfArrayBuffer = await response.arrayBuffer()

    // Fill PDF with form data
    const filledPdfBytes = await fillRDANAPdf(pdfArrayBuffer, form)

    // 🔽 Trigger download
    const blob = new Blob([filledPdfBytes.buffer as ArrayBuffer], {
  type: 'application/pdf',
})

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'RDANA-Filled.pdf'
    a.click()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('❌ PDF generation failed:', error)
    alert('Failed to generate PDF. See console for details.')
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
/* small helpers to keep inputs visually comfortable */
:deep(.u-input input) {
  min-height: 2.4rem;
  padding-top: 0.55rem;
  padding-bottom: 0.45rem;
  line-height: 1.4;
}
</style>
