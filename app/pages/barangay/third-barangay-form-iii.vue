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
  <div class="p-6 space-y-6">
    <UCard>
      <template #header>
        <div>
          <h1 class="text-xl font-semibold">
            RDANA – Third Barangay Form III
          </h1>
          <p class="text-sm text-gray-500">
            Damage Assessment Report &amp; Summary Report of Evacuees
          </p>
        </div>
      </template>

      <UForm :state="form" :schema="schema" @submit="onSubmit">
        <ThirdBarangayFormFields />

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
