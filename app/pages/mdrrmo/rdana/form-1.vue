<script setup lang="ts">
import { useRdanaForm } from '~/composables/useFirstRdanaForm';

const { form, schema, steps, currentStep, nextStep, prevStep, submit, reset } = useRdanaForm();

async function onSubmit() {
  await submit();
}
</script>

<template>
  <div class="p-6 space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold">
              RDANA FORM 1 (72 HOURS)
            </h1>
            <p class="text-sm text-gray-500">
              Rapid Damage and Needs Assessment
            </p>
          </div>
        </div>
      </template>

      <div class="space-y-6">
        <USteps v-model="currentStep" :items="steps" />

        <UForm :schema="schema" :state="form" @submit="onSubmit">
          <AdminRdanaStepProfileMission v-if="currentStep === 0" />
          <AdminRdanaStepInitialImpact v-else-if="currentStep === 1" />
          <AdminRdanaStepAccessibilityPower v-else-if="currentStep === 2" />
          <AdminRdanaStepCommunicationsEvac v-else-if="currentStep === 3" />
          <AdminRdanaStepReliefSrr v-else-if="currentStep === 4" />
          <AdminRdanaStepLawOrderShelter v-else-if="currentStep === 5" />
          <AdminRdanaStepFoodWaterSanitation v-else-if="currentStep === 6" />
          <AdminRdanaStepHealthNutrition v-else-if="currentStep === 7" />
          <AdminRdanaStepProtectionEducation v-else-if="currentStep === 8" />
          <AdminRdanaStepLivelihoodEngagementOverall v-else-if="currentStep === 9" />
          <AdminRdanaStepSubmittedBy v-else-if="currentStep === 10" />

          <div class="flex items-center justify-between mt-8">
            <UButton
              v-if="currentStep > 0"
              color="info"
              variant="ghost"
              type="button"
              @click="prevStep"
            >
              Previous
            </UButton>

            <div class="ml-auto flex gap-2">
              <UButton
                color="info"
                variant="ghost"
                type="button"
                @click="reset"
              >
                Reset
              </UButton>

              <UButton
                v-if="currentStep < steps.length - 1"
                type="button"
                @click="nextStep"
              >
                Next
              </UButton>

              <UButton
                v-else
                type="submit"
              >
                Submit
              </UButton>
            </div>
          </div>
        </UForm>
      </div>
    </UCard>
  </div>
</template>
