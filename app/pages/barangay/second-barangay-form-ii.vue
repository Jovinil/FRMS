<!-- pages/rdana/second-barangay-form-ii.vue -->
<script setup lang="ts">
import { useSecondBarangayForm } from '~/composables/useSecondBarangayForm';
import SecondBarangayFormFields from '~/components/Barangay/Forms/SecondBarangayFormFields.vue';

const { form, schema, submit, reset } = useSecondBarangayForm();

async function onSubmit() {
  await submit();
  // toast / redirect if you like
}
</script>

<template>
  <div class="p-6 space-y-6">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-xl font-semibold">
            RDANA – Second Barangay Form II
          </h1>
          <p class="text-sm text-gray-500">
            Rapid Damage &amp; Needs Assessment Checklist
          </p>
        </div>
      </template>

      <UForm :state="form" :schema="schema" @submit="onSubmit">
        <SecondBarangayFormFields />

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
