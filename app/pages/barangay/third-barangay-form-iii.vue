<!-- pages/rdana/third-barangay-form-iii.vue -->
<script setup lang="ts">
import { useThirdBarangayForm } from '~/composables/useThirdBarangayForm';
import ThirdBarangayFormFields from '~/components/Barangay/Forms/ThirdBarangayFormFields.vue';

const { form, schema, submit, reset } = useThirdBarangayForm();

async function onSubmit() {
  await submit();
  // toast/redirect if you like
}
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-4xl p-6 space-y-6">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-700">
                Barangay Submission
              </p>
              <h1 class="text-2xl font-semibold text-gray-900">
                RDANA – Third Barangay Form III
              </h1>
              <p class="text-sm text-gray-600">
                Damage Assessment Report &amp; Summary Report of Evacuees.
              </p>
            </div>
            <div class="text-right text-xs text-gray-500">
              Focus on accuracy; update counts before sending.
            </div>
          </div>
        </template>

        <div class="rounded-xl    p-4 shadow-sm">
          <div class="pb-3 border-b  flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">
              Damage summary &amp; evacuee status
            </span>
            <span class="text-xs text-gray-500">
              Required fields marked in form
            </span>
          </div>

          <div class="pt-3">
            <UForm :state="form" :schema="schema" @submit="onSubmit">
              <div class="space-y-4">
                <ThirdBarangayFormFields />
              </div>

              <div class="sticky bottom-0 left-0 right-0 mt-6 -mx-4 rounded-b-xl border-t  px-4 py-3 backdrop-blur">
                <div class="flex items-center justify-end gap-2">
                  <UButton
                    type="button"
                    color="error"
                    variant="ghost"
                    @click="reset"
                  >
                    Reset
                  </UButton>
                  <UButton
                    color="info"
                    type="submit"
                  >
                    Submit
                  </UButton>
                </div>
              </div>
            </UForm>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
