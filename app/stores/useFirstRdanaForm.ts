// stores/rdanaForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RdanaForm } from '~/models/firstRdanaForm';
import { createDefaultRdanaForm } from '~/models/firstRdanaForm';

export const useRdanaFormStore = defineStore('rdanaForm', () => {
  const form = ref<RdanaForm>(createDefaultRdanaForm());

  function setForm(newForm: RdanaForm) {
    form.value = newForm;
  }

  function patchForm(partial: Partial<RdanaForm>) {
    form.value = {
      ...form.value,
      ...partial,
    };
  }

  function reset() {
    form.value = createDefaultRdanaForm();
  }

  // placeholder for DB integration
  async function saveToApi() {
    const result = await $fetch('/api/forms/first/create', {
      method: 'POST',
      body: form.value,
    });

    // result is a FirstRdanaSubmission (id, createdAt, etc.)
    navigateTo('/mdrrmo');
    return result;
}

  return {
    form,
    setForm,
    patchForm,
    reset,
    saveToApi,
  };
});
