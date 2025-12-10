// stores/rdanaForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RdanaForm } from '~/models/firstRdanaForm';
import { createDefaultRdanaForm } from '~/models/firstRdanaForm';

export const useRdanaFormStore = defineStore('rdanaForm', () => {
  const form = ref<RdanaForm>(createDefaultRdanaForm());
  const { success, error } = useFlash();

  function setForm(newForm: RdanaForm) {
    form.value = newForm;
  }

  function patchForm(partial: Partial<RdanaForm>) {
    form.value = {
      ...form.value,
      ...partial,
    };
     return { form, patchForm, /* ... */ }
  }

  function reset() {
    form.value = createDefaultRdanaForm();
  }

  // placeholder for DB integration
  async function saveToApi() {
    try {
      const result = await $fetch('/api/forms/first/create', {
        method: 'POST',
        body: form.value,
      })

      success('RDANA Form submitted successfully.');
      await navigateTo('/mdrrmo');
      return result
    } catch (e) {
      console.error(e)
      error('Failed to submit First RDANA Form.')
      throw e
    }
}

  return {
    form,
    setForm,
    patchForm,
    reset,
    saveToApi,
  };
});
