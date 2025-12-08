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

const vulnerableGroupItems = [
  { label: 'Unaccompanied/separated children', value: 'uasc' },
  { label: 'Children with disabilities', value: 'children_pwd' },
  { label: 'Pregnant women', value: 'pregnant_women' },
  { label: 'Lactating women', value: 'lactating_women' },
  { label: 'Elderly', value: 'elderly' },
  { label: 'Persons with disabilities', value: 'pwd' },
  { label: 'Indigenous peoples', value: 'ip' },
  { label: 'Other', value: 'other' }
];

const protectionNeedItems = [
  { label: 'Reporting mechanisms', value: 'reporting_mechanisms' },
  { label: 'Safe spaces for women/children', value: 'safe_spaces' },
  { label: 'Security patrols', value: 'security_patrols' },
  { label: 'Legal/psychosocial support', value: 'legal_psycho_support' },
  { label: 'Family tracing', value: 'family_tracing' },
  { label: 'Other', value: 'other' }
];

const educationNeedItems = [
  { label: 'Temporary learning spaces', value: 'tls' },
  { label: 'Education supplies', value: 'education_supplies' },
  { label: 'Repair of classrooms', value: 'repair_classrooms' },
  { label: 'Teachers / facilitators', value: 'teachers' },
  { label: 'Psychosocial support in schools', value: 'pss_schools' },
  { label: 'Other', value: 'other' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 16. PROTECTION -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">16. PROTECTION</h2>

      <UFormField
        label="16.1 Are there reported cases of violence, exploitation or abuse?"
        name="protection.violenceCasesPresent"
      >
        <URadioGroup
          v-model="form.protection.violenceCasesPresent"
          :items="yesNoUnknownItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="16.2 Vulnerable groups present"
        name="protection.vulnerableGroupsPresent"
      >
        <UCheckboxGroup
          v-model="form.protection.vulnerableGroupsPresent"
          :items="vulnerableGroupItems"
        />
      </UFormField>

      <UFormField
        label="16.3 Is there a functional reporting and referral mechanism?"
        name="protection.reportingMechanismExists"
      >
        <URadioGroup
          v-model="form.protection.reportingMechanismExists"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="16.4 Immediate protection needs"
        name="protection.immediateProtectionNeeds"
      >
        <UCheckboxGroup
          v-model="form.protection.immediateProtectionNeeds"
          :items="protectionNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="protection.immediateProtectionNeedOther"
      >
        <UInput v-model="form.protection.immediateProtectionNeedOther" />
      </UFormField>
    </section>

    <!-- 17. EDUCATION -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">17. EDUCATION</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="17.1 No. of classrooms used as evacuation centers"
          name="education.classroomsUsedAsEC"
        >
          <UInput
            v-model.number="form.education.classroomsUsedAsEC"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="17.2 Estimated children staying in ECs"
          name="education.childrenStayingInEC"
        >
          <UInput
            v-model.number="form.education.childrenStayingInEC"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="17.3 No. of destroyed classrooms"
          name="education.destroyedClassrooms"
        >
          <UInput
            v-model.number="form.education.destroyedClassrooms"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="17.4 No. of damaged classrooms"
          name="education.damagedClassrooms"
        >
          <UInput
            v-model.number="form.education.damagedClassrooms"
            type="number"
            min="0"
          />
        </UFormField>
      </div>

      <UFormField
        label="17.5 Urgent educational needs"
        name="education.urgentEducationalNeeds"
      >
        <UCheckboxGroup
          v-model="form.education.urgentEducationalNeeds"
          :items="educationNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="education.urgentEducationalNeedOther"
      >
        <UInput v-model="form.education.urgentEducationalNeedOther" />
      </UFormField>
    </section>
  </div>
</template>
