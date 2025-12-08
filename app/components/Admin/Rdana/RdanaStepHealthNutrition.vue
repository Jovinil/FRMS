<script setup lang="ts">
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';

const store = useRdanaFormStore();
const form = store.form;

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const yesNoUnknownItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Unknown', value: 'unknown' }
];

const healthFacilityItems = [
  { label: 'Rural health unit', value: 'rhu' },
  { label: 'Barangay health station', value: 'bhs' },
  { label: 'Hospital', value: 'hospital' },
  { label: 'Private clinic', value: 'private_clinic' },
  { label: 'Mobile clinic', value: 'mobile_clinic' },
  { label: 'Other', value: 'other' }
];

const healthConcernItems = [
  { label: 'Diarrhea', value: 'diarrhea' },
  { label: 'Acute respiratory infections', value: 'ari' },
  { label: 'Skin diseases', value: 'skin_diseases' },
  { label: 'Injuries/trauma', value: 'injuries_trauma' },
  { label: 'Vector-borne diseases', value: 'vector_borne' },
  { label: 'Mental health / psychosocial', value: 'mhpss' },
  { label: 'Other', value: 'other' }
];

const medicinesAvailabilityItems = [
  { label: 'Adequate', value: 'adequate' },
  { label: 'Inadequate', value: 'inadequate' }
];

const healthNeedItems = [
  { label: 'Medicines', value: 'medicines' },
  { label: 'Medical supplies', value: 'medical_supplies' },
  { label: 'Additional health staff', value: 'health_staff' },
  { label: 'Referral/transport', value: 'referral_transport' },
  { label: 'Medical missions', value: 'medical_missions' },
  { label: 'Other', value: 'other' }
];

const nutritionNeedItems = [
  { label: 'Breastfeeding counseling', value: 'bf_counseling' },
  { label: 'Infant and young child feeding support', value: 'iycf' },
  { label: 'Micronutrient supplements', value: 'micronutrients' },
  { label: 'Therapeutic feeding', value: 'therapeutic_feeding' },
  { label: 'Growth monitoring', value: 'growth_monitoring' },
  { label: 'Other', value: 'other' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 14. HEALTH -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">14. HEALTH</h2>

      <UFormField
        label="14.1 Do people have access to health services?"
        name="health.accessToHealthServices"
      >
        <URadioGroup
          v-model="form.health.accessToHealthServices"
          :items="yesNoUnknownItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="14.2 Functional health facilities in or near the community"
        name="health.functionalHealthFacilities"
      >
        <UCheckboxGroup
          v-model="form.health.functionalHealthFacilities"
          :items="healthFacilityItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="health.functionalHealthFacilityOther"
      >
        <UInput v-model="form.health.functionalHealthFacilityOther" />
      </UFormField>

      <UFormField
        label="14.3 Main health concerns"
        name="health.mainHealthConcerns"
      >
        <UCheckboxGroup
          v-model="form.health.mainHealthConcerns"
          :items="healthConcernItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="health.mainHealthConcernOther"
      >
        <UInput v-model="form.health.mainHealthConcernOther" />
      </UFormField>

      <UFormField
        label="14.4 Availability of medicines"
        name="health.medicinesAvailability"
      >
        <URadioGroup
          v-model="form.health.medicinesAvailability"
          :items="medicinesAvailabilityItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="14.5 Immediate health needs"
        name="health.immediateHealthNeeds"
      >
        <UCheckboxGroup
          v-model="form.health.immediateHealthNeeds"
          :items="healthNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="health.immediateHealthNeedOther"
      >
        <UInput v-model="form.health.immediateHealthNeedOther" />
      </UFormField>
    </section>

    <!-- 15. NUTRITION -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">15. NUTRITION</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="15.1 Is information available on exclusively breastfed infants?"
          name="nutrition.infoOnExclusivelyBreastfedInfants"
        >
          <URadioGroup
            v-model="form.nutrition.infoOnExclusivelyBreastfedInfants"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="15.2 Are milk products being distributed?"
          name="nutrition.milkProductsDistributed"
        >
          <URadioGroup
            v-model="form.nutrition.milkProductsDistributed"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="15.3 Vitamin A supplementation for 6–59 months"
          name="nutrition.vitaminA6to59Months"
        >
          <URadioGroup
            v-model="form.nutrition.vitaminA6to59Months"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="15.4 Iron–folic acid for pregnant/lactating women"
          name="nutrition.ironFolicForPregLactating"
        >
          <URadioGroup
            v-model="form.nutrition.ironFolicForPregLactating"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="15.5 Micronutrient powders distributed"
          name="nutrition.micronutrientPowders"
        >
          <URadioGroup
            v-model="form.nutrition.micronutrientPowders"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="15.6 Management of acute malnutrition ongoing"
          name="nutrition.managementOfAcuteMalnutrition"
        >
          <URadioGroup
            v-model="form.nutrition.managementOfAcuteMalnutrition"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <UFormField
        label="15.7 Immediate nutrition needs"
        name="nutrition.immediateNutritionNeeds"
      >
        <UCheckboxGroup
          v-model="form.nutrition.immediateNutritionNeeds"
          :items="nutritionNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="nutrition.immediateNutritionNeedOther"
      >
        <UInput v-model="form.nutrition.immediateNutritionNeedOther" />
      </UFormField>
    </section>
  </div>
</template>
