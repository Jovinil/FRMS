<!-- components/rdana/RdanaStepInitialImpact.vue -->
<script setup lang="ts">
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';

const store = useRdanaFormStore();
const form = store.form;
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 2. INITIAL IMPACT -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">2. INITIAL IMPACT (DEMOGRAPHICS)</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="2.1 Affected Families"
          name="initialImpact.affectedFamilies"
        >
          <UInput
            v-model.number="form.initialImpact.affectedFamilies"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.2 Affected Persons"
          name="initialImpact.affectedPersons"
        >
          <UInput
            v-model.number="form.initialImpact.affectedPersons"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.3 Displaced Families (Inside ECs)"
          name="initialImpact.displacedFamiliesInsideECs"
        >
          <UInput
            v-model.number="form.initialImpact.displacedFamiliesInsideECs"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.4 Displaced Persons (Inside ECs)"
          name="initialImpact.displacedPersonsInsideECs"
        >
          <UInput
            v-model.number="form.initialImpact.displacedPersonsInsideECs"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.5 Displaced Families (Outside ECs)"
          name="initialImpact.displacedFamiliesOutsideECs"
        >
          <UInput
            v-model.number="form.initialImpact.displacedFamiliesOutsideECs"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.6 Displaced Persons (Outside ECs)"
          name="initialImpact.displacedPersonsOutsideECs"
        >
          <UInput
            v-model.number="form.initialImpact.displacedPersonsOutsideECs"
            type="number"
            min="0"
          />
        </UFormField>
      </div>
    </section>

    <!-- 2.2a Affected Children by Age -->
    <section class="space-y-4">
      <h3 class="font-semibold">
        2.2a Affected Children by Age
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Age 0-2"
          name="initialImpact.affectedChildren.age0to2"
        >
          <UInput
            v-model.number="form.initialImpact.affectedChildren.age0to2"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Age 3-5"
          name="initialImpact.affectedChildren.age3to5"
        >
          <UInput
            v-model.number="form.initialImpact.affectedChildren.age3to5"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Age 6-12"
          name="initialImpact.affectedChildren.age6to12"
        >
          <UInput
            v-model.number="form.initialImpact.affectedChildren.age6to12"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Age 13-17"
          name="initialImpact.affectedChildren.age13to17"
        >
          <UInput
            v-model.number="form.initialImpact.affectedChildren.age13to17"
            type="number"
            min="0"
          />
        </UFormField>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField label="2.2b PWD" name="initialImpact.pwd">
          <UInput
            v-model.number="form.initialImpact.pwd"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.2c Elderly"
          name="initialImpact.elderly"
        >
          <UInput
            v-model.number="form.initialImpact.elderly"
            type="number"
            min="0"
          />
        </UFormField>
      </div>
    </section>

    <!-- Missing / Injured / Dead -->
    <section class="space-y-4">
      <h3 class="font-semibold">
        Missing / Injured / Dead
      </h3>

      <div class="grid gap-4 md:grid-cols-3">
        <UFormField label="2.7 Missing (Male)" name="initialImpact.missingMale">
          <UInput
            v-model.number="form.initialImpact.missingMale"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.8 Missing (Female)"
          name="initialImpact.missingFemale"
        >
          <UInput
            v-model.number="form.initialImpact.missingFemale"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.9 Missing (Total)"
          name="initialImpact.missingTotal"
        >
          <UInput
            v-model.number="form.initialImpact.missingTotal"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField label="2.10 Injured (Male)" name="initialImpact.injuredMale">
          <UInput
            v-model.number="form.initialImpact.injuredMale"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.11 Injured (Female)"
          name="initialImpact.injuredFemale"
        >
          <UInput
            v-model.number="form.initialImpact.injuredFemale"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.12 Injured (Total)"
          name="initialImpact.injuredTotal"
        >
          <UInput
            v-model.number="form.initialImpact.injuredTotal"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField label="2.13 Dead (Male)" name="initialImpact.deadMale">
          <UInput
            v-model.number="form.initialImpact.deadMale"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.14 Dead (Female)"
          name="initialImpact.deadFemale"
        >
          <UInput
            v-model.number="form.initialImpact.deadFemale"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="2.15 Dead (Total)"
          name="initialImpact.deadTotal"
        >
          <UInput
            v-model.number="form.initialImpact.deadTotal"
            type="number"
            min="0"
          />
        </UFormField>
      </div>
    </section>
  </div>
</template>
