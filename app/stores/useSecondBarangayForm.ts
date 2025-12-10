// stores/secondBarangayForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SecondBarangayForm } from '~/models/secondBarangayForm';
import { createDefaultSecondBarangayForm } from '~/models/secondBarangayForm';

export const useSecondBarangayFormStore = defineStore('secondBarangayForm', () => {
  const form = ref<SecondBarangayForm>(createDefaultSecondBarangayForm());

  function setForm(newForm: SecondBarangayForm) {
    form.value = newForm;
  }

  function reset() {
    form.value = createDefaultSecondBarangayForm();
  }

  async function saveToApi() {
    // hook to your backend
    // await $fetch('/api/rdana/second-barangay-form', {
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
