// stores/thirdBarangayForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ThirdBarangayForm } from '@/models/thirdBarangayForm';
import { createDefaultThirdBarangayForm } from '@/models/thirdBarangayForm';

export const useThirdBarangayFormStore = defineStore('thirdBarangayForm', () => {
  const form = ref<ThirdBarangayForm>(createDefaultThirdBarangayForm());

  function setForm(newForm: ThirdBarangayForm) {
    form.value = newForm;
  }

  function reset() {
    form.value = createDefaultThirdBarangayForm();
  }

  async function saveToApi() {
    // hook this to your API / DB
    // await $fetch('/api/rdana/third-barangay-form', {
    //   method: 'POST',
    //   body: form.value
    // });
  }

  return {
    form,
    setForm,
    reset,
    saveToApi,
  };
});
