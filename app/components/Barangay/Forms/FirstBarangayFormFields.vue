<script setup lang="ts">
import { onMounted } from 'vue'
import { useFirstBarangayFormStore } from '~/stores/useFirstBarangayStore'

const store = useFirstBarangayFormStore()
const form = store.form

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function nowYYYYMMDDHHmm() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const min = pad(d.getMinutes())
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`
}

onMounted(() => {
  // set only if empty so user can still edit it
  if (!form.incidentProfile.when) {
    form.incidentProfile.when = nowYYYYMMDDHHmm()
  }
})
</script>


<template>
  <div class="space-y-6 mt-6">
    <!-- Header info -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">
        FORM I – Initial Report (within 2 hours after flash report)
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Initial Report on"
          name="initialReportOn"
          required
        >
          <UInput
            class="w-full"
            v-model="form.initialReportOn"
            placeholder="e.g. Flooding in Barangay XYZ"
          />
        </UFormField>

        <UFormField
          label="Origin of Report"
          name="originOfReport"
          required
        >
          <UInput
            class="w-full"
            v-model="form.originOfReport"
            placeholder="e.g. Barangay DRRM Committee"
          />
        </UFormField>
      </div>
    </section>

    <!-- Profile of the Incident -->
    <section class="space-y-3">
      <h3 class="text-base font-semibold">
        Profile of the Incident
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="What"
          name="incidentProfile.what"
          required
          class="md:col-span-2"
        >
          <UTextarea
            v-model="form.incidentProfile.what"
            :rows="2"
            placeholder="Describe what happened"
          />
        </UFormField>

        <UFormField
          label="When"
          name="incidentProfile.when"
          required
        >
          <UInput
            v-model="form.incidentProfile.when"
            placeholder="YYYY-MM-DD HH:mm"
            :readonly="true"
          />
        </UFormField>

        <UFormField
          label="Where"
          name="incidentProfile.where"
          required
        >
          <UTextarea
            v-model="form.incidentProfile.where"
            :rows="2"
            placeholder="Location / affected areas"
          />
        </UFormField>

        <UFormField
          label="Why"
          name="incidentProfile.why"
          required
          class="md:col-span-2"
        >
          <UTextarea
            v-model="form.incidentProfile.why"
            :rows="2"
            placeholder="Cause / contributing factors (if known)"
          />
        </UFormField>

        <UFormField
          label="Who"
          name="incidentProfile.who"
          required
        >
          <UTextarea
            v-model="form.incidentProfile.who"
            :rows="2"
            placeholder="Affected population / groups"
          />
        </UFormField>

        <UFormField
          label="How"
          name="incidentProfile.how"
          required
        >
          <UTextarea
            v-model="form.incidentProfile.how"
            :rows="2"
            placeholder="How the incident unfolded"
          />
        </UFormField>
      </div>
    </section>

    <!-- Needs -->
    <section class="space-y-3">
      <h3 class="text-base font-semibold">
        Is there a need for:
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Search & rescue assistance?"
          name="searchRescueNeeded"
        >
          <URadioGroup
            v-model="form.searchRescueNeeded"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="Evacuation?"
          name="evacuationNeeded"
        >
          <URadioGroup
            v-model="form.evacuationNeeded"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>
    </section>

    <!-- Signature -->
    <!-- <section class="space-y-4">
      <h3 class="text-base font-semibold">
        Signed
      </h3>
      <UFormField
        label="BDRRMC Chairman"
        name="signedByChairman"
        required
      >
        <UInput
          v-model="form.signedByChairman"
          placeholder="Name of BDRRMC Chairman"
        />
      </UFormField>
    </section> -->
  </div>
</template>
