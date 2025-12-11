<!-- components/rdana/SecondBarangayFormFields.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useSecondBarangayFormStore } from '~/stores/useSecondBarangayForm'

const store = useSecondBarangayFormStore()
const form = store.form

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

// helper to format current datetime as "YYYY-MM-DD HH:mm"
function formatNowForInput() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')

  const year = now.getFullYear()
  const month = pad(now.getMonth() + 1)
  const day = pad(now.getDate())
  const hour = pad(now.getHours())
  const minute = pad(now.getMinutes())

  return `${year}-${month}-${day} ${hour}:${minute}`
}

onMounted(() => {
  // only set default if user hasn't typed anything yet
  if (!form.profileOfDisaster.dateTimeOfOccurrence) {
    form.profileOfDisaster.dateTimeOfOccurrence = formatNowForInput()
  }
})
</script>

<template>
  <div class="space-y-8 mt-6">
    <!-- A. Profile of the Disaster -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">A. Profile of the Disaster</h2>

      <UFormField
        label="Type of disaster/emergency"
        name="profileOfDisaster.typeOfDisaster"
        required
      >
        <UInput v-model="form.profileOfDisaster.typeOfDisaster" />
      </UFormField>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Date & Time of Occurrence"
          name="profileOfDisaster.dateTimeOfOccurrence"
          required
        >
          <UInput
            v-model="form.profileOfDisaster.dateTimeOfOccurrence"
            placeholder="YYYY-MM-DD HH:mm"
            :readonly="true"
          />
        </UFormField>

        <UFormField
          label="Date & Time of Reports"
          name="profileOfDisaster.dateTimeOfReports"
          required
        >
          <UInput
            v-model="form.profileOfDisaster.dateTimeOfReports"
            placeholder="YYYY-MM-DD HH:mm"
          />
        </UFormField>
      </div>

      <UFormField
        label="Areas affected"
        name="profileOfDisaster.areasAffected"
        required
      >
        <UTextarea
          v-model="form.profileOfDisaster.areasAffected"
          :rows="2"
        />
      </UFormField>

      <UFormField
        label="Source of reports"
        name="profileOfDisaster.sourceOfReports"
        required
      >
        <UInput v-model="form.profileOfDisaster.sourceOfReports" />
      </UFormField>
    </section>

    <!-- B. Initial Effects -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">B. Initial Effects</h2>

      <!-- Affected Population -->
      <div class="space-y-2">
        <h3 class="font-medium">1. Affected Population</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="Families"
            name="initialEffects.affectedPopulation.families"
          >
            <UInput
              v-model.number="form.initialEffects.affectedPopulation.families"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Persons"
            name="initialEffects.affectedPopulation.persons"
          >
            <UInput
              v-model.number="form.initialEffects.affectedPopulation.persons"
              type="number"
              min="0"
            />
          </UFormField>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Infants (0–1 yrs)"
            name="initialEffects.affectedPopulation.breakdown.infants"
          >
            <UInput
              v-model.number="
                form.initialEffects.affectedPopulation.breakdown.infants
              "
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Children (2–<18 yrs)"
            name="initialEffects.affectedPopulation.breakdown.children"
          >
            <UInput
              v-model.number="
                form.initialEffects.affectedPopulation.breakdown.children
              "
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Adults (18+ yrs)"
            name="initialEffects.affectedPopulation.breakdown.adults"
          >
            <UInput
              v-model.number="
                form.initialEffects.affectedPopulation.breakdown.adults
              "
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <!-- Displaced Population -->
      <div class="space-y-2">
        <h3 class="font-medium">2. Displaced Population</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="Families"
            name="initialEffects.displacedPopulation.families"
          >
            <UInput
              v-model.number="form.initialEffects.displacedPopulation.families"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Persons"
            name="initialEffects.displacedPopulation.persons"
          >
            <UInput
              v-model.number="form.initialEffects.displacedPopulation.persons"
              type="number"
              min="0"
            />
          </UFormField>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Infants (0–1 yrs)"
            name="initialEffects.displacedPopulation.breakdown.infants"
          >
            <UInput
              v-model.number="
                form.initialEffects.displacedPopulation.breakdown.infants
              "
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Children (2–<18 yrs)"
            name="initialEffects.displacedPopulation.breakdown.children"
          >
            <UInput
              v-model.number="
                form.initialEffects.displacedPopulation.breakdown.children
              "
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Adults (18+ yrs)"
            name="initialEffects.displacedPopulation.breakdown.adults"
          >
            <UInput
              v-model.number="
                form.initialEffects.displacedPopulation.breakdown.adults
              "
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <!-- Casualties -->
      <div class="space-y-2">
        <h3 class="font-medium">3. Casualties</h3>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Dead - Location"
            name="initialEffects.casualties.dead.location"
          >
            <UInput v-model="form.initialEffects.casualties.dead.location" />
          </UFormField>
          <UFormField
            label="Dead - Number"
            name="initialEffects.casualties.dead.number"
          >
            <UInput
              v-model.number="form.initialEffects.casualties.dead.number"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Dead - Cause"
            name="initialEffects.casualties.dead.cause"
          >
            <UInput v-model="form.initialEffects.casualties.dead.cause" />
          </UFormField>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Injured - Location"
            name="initialEffects.casualties.injured.location"
          >
            <UInput v-model="form.initialEffects.casualties.injured.location" />
          </UFormField>
          <UFormField
            label="Injured - Number"
            name="initialEffects.casualties.injured.number"
          >
            <UInput
              v-model.number="form.initialEffects.casualties.injured.number"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Injured - Cause"
            name="initialEffects.casualties.injured.cause"
          >
            <UInput v-model="form.initialEffects.casualties.injured.cause" />
          </UFormField>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Missing - Location"
            name="initialEffects.casualties.missing.location"
          >
            <UInput v-model="form.initialEffects.casualties.missing.location" />
          </UFormField>
          <UFormField
            label="Missing - Number"
            name="initialEffects.casualties.missing.number"
          >
            <UInput
              v-model.number="form.initialEffects.casualties.missing.number"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Missing - Cause"
            name="initialEffects.casualties.missing.cause"
          >
            <UInput v-model="form.initialEffects.casualties.missing.cause" />
          </UFormField>
        </div>
      </div>
    </section>

    <!-- C. INITIAL NEEDS ASSESSMENT -->
    <!-- (rest of your template unchanged) -->

    <!-- 1. Search & Rescue -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">C. Initial Needs Assessment</h2>

      <div class="space-y-3">
        <h3 class="font-medium">1. Search and Rescue</h3>

        <UFormField
          label="1.1 Exact locations"
          name="searchRescue.exactLocations"
        >
          <UTextarea
            v-model="form.searchRescue.exactLocations"
            :rows="2"
          />
        </UFormField>

        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="1.2 Approx. no. of missing - Children"
            name="searchRescue.approxMissingChildren"
          >
            <UInput
              v-model.number="form.searchRescue.approxMissingChildren"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="1.2 Approx. no. of missing - Adults"
            name="searchRescue.approxMissingAdults"
          >
            <UInput
              v-model.number="form.searchRescue.approxMissingAdults"
              type="number"
              min="0"
            />
          </UFormField>
        </div>

        <UFormField
          label="1.3 Response status (local SAR & resources deployed)"
          name="searchRescue.responseStatus"
        >
          <UTextarea
            v-model="form.searchRescue.responseStatus"
            :rows="2"
          />
        </UFormField>

        <UFormField
          label="1.4 Unmet needs (additional SAR resources requested)"
          name="searchRescue.unmetNeeds"
        >
          <UTextarea
            v-model="form.searchRescue.unmetNeeds"
            :rows="2"
          />
        </UFormField>
      </div>
    </section>

    <!-- 2. Evacuation -->
    <!-- ... rest unchanged ... -->

    <!-- Signature -->
    <!-- <section class="space-y-4">
      <h2 class="text-lg font-semibold">E. Local Initial Response – Signature</h2>

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
