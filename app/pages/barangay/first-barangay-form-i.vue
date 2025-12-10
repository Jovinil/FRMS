<!-- pages/rdana/first-barangay-form-i.vue -->
<script setup lang="ts">
import { useFirstBarangayForm } from '~/composables/useFirstBarangayForm';
import FirstBarangayFormFields from '~/components/Barangay/Forms/FirstBarangayFormFields.vue';

const { form, schema, submit, reset } = useFirstBarangayForm();

async function onSubmit() {
  await submit();
  // show toast / redirect etc.
}
</script>

<template>
  <div class="p-6 space-y-6">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-xl font-semibold">
            RDANA – First Barangay Form I (Initial Report)
          </h1>
          <p class="text-sm text-gray-500">
            To be submitted within 2 hours after the flash report
          </p>
        </div>
      </template>

      <UForm :state="form" :schema="schema" @submit="onSubmit">
        <FirstBarangayFormFields />

        <div class="flex justify-end mt-8 gap-2">
          <UButton
            type="button"
            color="info"
            variant="ghost"
            @click="reset"
          >
            Reset
          </UButton>
          <UButton type="submit">
            Submit
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
