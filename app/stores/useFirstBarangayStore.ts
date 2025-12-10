// stores/firstBarangayForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FirstBarangayForm } from '~/models/firstBarangayForm';
import { createDefaultFirstBarangayForm } from '~/models/firstBarangayForm';

export const useFirstBarangayFormStore = defineStore('firstBarangayForm', () => {
  const form = ref<FirstBarangayForm>(createDefaultFirstBarangayForm());

  function setForm(newForm: FirstBarangayForm) {
    form.value = newForm;
  }

  function reset() {
    form.value = createDefaultFirstBarangayForm();
  }

  // hook this to your API / DB
  async function saveToApi() {
    // await $fetch('/api/rdana/first-barangay-form', {
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
