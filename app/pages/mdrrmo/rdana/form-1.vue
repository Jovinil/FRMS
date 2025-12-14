<script setup lang="ts">
  import { computed } from 'vue';
  import { useRdanaForm } from '~/composables/useFirstRdanaForm';

const { form, schema, steps, currentStep, nextStep, prevStep, submit, reset } = useRdanaForm();

const totalSteps = computed(() => steps.length);

const progress = computed(() => {
  if (!totalSteps.value) return 0; // safety if steps is empty
  return Math.round(((currentStep.value + 1) / totalSteps.value) * 100);
});

const currentStepLabel = computed(() => {
  const step = steps[currentStep.value];
  return step?.label || `Step ${currentStep.value + 1}`;
});

const isDownloading = ref(false);
async function downloadRdanaReport(submissionId: string) {
  const res = await fetch(`/api/rdana-report/${encodeURIComponent(submissionId)}`);

  if (!res.ok) {
    throw new Error('Failed to generate RDANA PDF');
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `RDANA-${submissionId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}

async function onSubmit() {
  try {
    isDownloading.value = true;
    const submission = await submit();

    if (submission?.id) {
      await downloadRdanaReport(submission.id);
    }

    await navigateTo('/mdrrmo');
  } finally {
    isDownloading.value = false;
  }
}
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-6xl p-6 space-y-6">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-700">
                Field Assessment
              </p>
              <h1 class="text-2xl font-semibold text-gray-900">
                RDANA Form 1 (72 Hours)
              </h1>
              <p class="text-sm text-gray-600">
                Rapid Damage and Needs Assessment for incident command use.
              </p>
            </div>

            <div class="text-right space-y-1">
              <p class="text-sm font-medium text-gray-700">
                {{ currentStepLabel }}
              </p>
              <p class="text-xs text-gray-500">
                Step {{ currentStep + 1 }} of {{ totalSteps }}
              </p>
              <div class="h-2 w-44 rounded-full bg-gray-100 overflow-hidden">
                <div
                  class="h-full bg-emerald-500 transition-[width] duration-300 ease-out"
                  :style="{ width: `${progress}%` }"
                />
              </div>
            </div>
          </div>
        </template>

        <div class="space-y-6">
          <div class="rounded-xl border border-gray-100 p-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div class="flex items-center gap-2 text-gray-700">
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                  {{ currentStep + 1 }}
                </span>
                <span class="text-sm font-medium">
                  {{ currentStepLabel }}
                </span>
              </div>
              <p class="text-xs text-gray-500">
                Complete each section before proceeding. You can revisit previous steps anytime.
              </p>
            </div>

            <div class="pt-3">
              <USteps v-model="currentStep" :items="steps" class="mb-4" />

              <UForm :schema="schema" :state="form" @submit="onSubmit">
                <div class="space-y-4">
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
                </div>

                <div class="sticky bottom-0 left-0 right-0 mt-6 -mx-4 rounded-b-xl border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
                  <div class="flex items-center justify-between gap-3">
                    <div class="text-xs text-gray-500">
                      Review entries before submitting. Progress saves within this session.
                    </div>
                    <div class="ml-auto flex flex-wrap items-center gap-2">
                      <UButton
                        v-if="currentStep > 0"
                        color="warning"
                        variant="ghost"
                        type="button"
                        @click="prevStep"
                      >
                        Previous
                      </UButton>

                      <UButton
                        color="error"
                        variant="ghost"
                        type="button"
                        @click="reset"
                      >
                        Reset
                      </UButton>

                      <UButton
                        v-if="currentStep < steps.length - 1"
                        color="warning"
                        type="button"
                        @click="nextStep"
                      >
                        Next
                      </UButton>

                      <UButton
                        v-else
                        color="info"
                        type="submit"
                      >
                        Submit
                      </UButton>
                    </div>
                  </div>
                </div>
              </UForm>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
