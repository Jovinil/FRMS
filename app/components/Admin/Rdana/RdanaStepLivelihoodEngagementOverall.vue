<script setup lang="ts">
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';

const store = useRdanaFormStore();
const form = store.form;

const yesNoUnknownItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Unknown', value: 'unknown' }
];

const livelihoodNeedItems = [
  { label: 'Replacement of tools/equipment', value: 'tools_equipment' },
  { label: 'Agricultural inputs', value: 'agri_inputs' },
  { label: 'Fishing inputs', value: 'fishing_inputs' },
  { label: 'Livelihood assistance / grants', value: 'livelihood_assistance' },
  { label: 'Cash-for-work', value: 'cash_for_work' },
  { label: 'Other', value: 'other' }
];

const infoWantItems = [
  { label: 'Relief distribution schedule', value: 'relief_schedule' },
  { label: 'Relocation plans', value: 'relocation_plans' },
  { label: 'Livelihood assistance', value: 'livelihood_assistance' },
  { label: 'Compensation / support', value: 'compensation' },
  { label: 'Other', value: 'other' }
];

const infoSourceItems = [
  { label: 'Barangay officials', value: 'brgy_officials' },
  { label: 'Municipal/City LGU', value: 'lgu' },
  { label: 'Radio/TV', value: 'radio_tv' },
  { label: 'Social media', value: 'social_media' },
  { label: 'Neighbors/friends', value: 'neighbors' },
  { label: 'Other', value: 'other' }
];

const overallAssessmentItems = [
  {
    label: 'Serious problems – assistance required',
    value: 'serious_problems'
  },
  {
    label: 'People may get sick or die without immediate help',
    value: 'people_may_get_sick_or_die'
  },
  {
    label: 'Many people have already died',
    value: 'many_already_died'
  }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 18. LIVELIHOOD -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">18. LIVELIHOOD</h2>

      <UFormField
        label="18.1 Main source of livelihood in the community"
        name="livelihood.mainSourceOfLivelihood"
      >
        <UInput v-model="form.livelihood.mainSourceOfLivelihood" />
      </UFormField>

      <UFormField
        label="18.2 Immediate livelihood needs"
        name="livelihood.immediateLivelihoodNeeds"
      >
        <UCheckboxGroup
          v-model="form.livelihood.immediateLivelihoodNeeds"
          :items="livelihoodNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="livelihood.immediateLivelihoodNeedOther"
      >
        <UInput v-model="form.livelihood.immediateLivelihoodNeedOther" />
      </UFormField>
    </section>

    <!-- 19. COMMUNITY ENGAGEMENT AND ACCOUNTABILITY -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">19. COMMUNITY ENGAGEMENT AND ACCOUNTABILITY</h2>

      <UFormField
        label="19.1 Are affected people receiving information about the response?"
        name="communityEngagement.communityReceivingInformation"
      >
        <URadioGroup
          v-model="form.communityEngagement.communityReceivingInformation"
          :items="yesNoUnknownItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="19.2 What do people most want information about?"
        name="communityEngagement.whatPeopleWantToKnow"
      >
        <UCheckboxGroup
          v-model="form.communityEngagement.whatPeopleWantToKnow"
          :items="infoWantItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="communityEngagement.whatPeopleWantToKnowOther"
      >
        <UInput v-model="form.communityEngagement.whatPeopleWantToKnowOther" />
      </UFormField>

      <UFormField
        label="19.3 Main sources of information for the community"
        name="communityEngagement.mainInformationSources"
      >
        <UCheckboxGroup
          v-model="form.communityEngagement.mainInformationSources"
          :items="infoSourceItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="communityEngagement.mainInformationSourceOther"
      >
        <UInput v-model="form.communityEngagement.mainInformationSourceOther" />
      </UFormField>
    </section>

    <!-- 20. OVERALL ASSESSMENT -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">20. OVERALL ASSESSMENT</h2>

      <UFormField
        label="20.1 Overall situation assessment"
        name="overallAssessment.situationAssessment"
      >
        <URadioGroup
          v-model="form.overallAssessment.situationAssessment"
          :items="overallAssessmentItems"
        />
      </UFormField>

      <UFormField
        label="20.2 Justification / Remarks"
        name="overallAssessment.justification"
      >
        <UTextarea
          v-model="form.overallAssessment.justification"
          :rows="4"
        />
      </UFormField>
    </section>
  </div>
</template>
