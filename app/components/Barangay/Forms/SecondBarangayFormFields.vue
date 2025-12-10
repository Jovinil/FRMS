<!-- components/rdana/SecondBarangayFormFields.vue -->
<script setup lang="ts">
import { useSecondBarangayFormStore } from '~/stores/useSecondBarangayForm';

const store = useSecondBarangayFormStore();
const form = store.form;

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
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
    <section class="space-y-4">
      <div class="space-y-3">
        <h3 class="font-medium">2. Evacuation</h3>

        <UFormField
          label="2.1 Exact locations"
          name="evacuation.exactLocations"
        >
          <UTextarea
            v-model="form.evacuation.exactLocations"
            :rows="2"
          />
        </UFormField>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Infants"
            name="evacuation.approxToEvacuateInfants"
          >
            <UInput
              v-model.number="form.evacuation.approxToEvacuateInfants"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Children"
            name="evacuation.approxToEvacuateChildren"
          >
            <UInput
              v-model.number="form.evacuation.approxToEvacuateChildren"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Adults (women)"
            name="evacuation.approxToEvacuateAdultsWomen"
          >
            <UInput
              v-model.number="form.evacuation.approxToEvacuateAdultsWomen"
              type="number"
              min="0"
            />
          </UFormField>
        </div>

        <UFormField
          label="2.3 Response (No. of people evacuated)"
          name="evacuation.responseDescription"
        >
          <UTextarea
            v-model="form.evacuation.responseDescription"
            :rows="2"
          />
        </UFormField>

        <UFormField
          label="2.4 Unmet needs (additional evacuation assistance)"
          name="evacuation.unmetNeeds"
        >
          <UTextarea
            v-model="form.evacuation.unmetNeeds"
            :rows="2"
          />
        </UFormField>

        <UFormField
          label="2.5 Names of evacuation centers"
          name="evacuation.evacuationCentersNames"
        >
          <UTextarea
            v-model="form.evacuation.evacuationCentersNames"
            :rows="2"
          />
        </UFormField>

        <UFormField
          label="2.6 No. of families/persons in ECs needing assistance"
          name="evacuation.numberInECsNeedAssistance"
        >
          <UTextarea
            v-model="form.evacuation.numberInECsNeedAssistance"
            :rows="2"
          />
        </UFormField>

        <UFormField
          label="2.7 Daily requirements of affected families in ECs"
          name="evacuation.dailyRequirementsInECs"
        >
          <UTextarea
            v-model="form.evacuation.dailyRequirementsInECs"
            :rows="2"
          />
        </UFormField>

        <UFormField
          label="2.8 Are there enough latrines in the ECs?"
          name="evacuation.enoughLatrinesInECs"
        >
          <URadioGroup
            v-model="form.evacuation.enoughLatrinesInECs"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>
    </section>

    <!-- 3. Medical Health, 4. Shelter & Clothing, 5. Food, 6. Water, 7. Environmental Sanitation,
         8. Restoration of Lifelines, 9. Children’s Educational Needs, and E. Local Initial Response
         follow the same pattern: UFormField + UInput/UTextarea/URadioGroup wired to form.medicalHealth.*,
         form.shelterClothing.*, form.food.*, form.water.*, form.environmentalSanitation.*,
         form.restorationOfLifelines.*, form.childrensEducation.*, form.localInitialResponse.*.
         (You can paste the rest in using the model & schema names; structure is identical.) -->

    <!-- Signature -->
    <section class="space-y-4">
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
    </section>
  </div>
</template>
