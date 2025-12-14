// stores/rdanaForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RdanaForm } from '~/models/firstRdanaForm';
import { createDefaultRdanaForm } from '~/models/firstRdanaForm';

type FirstRdanaSubmissionResponse = { id: string };

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
  }

  function reset() {
    form.value = createDefaultRdanaForm();
  }

  // placeholder for DB integration
  async function saveToApi(): Promise<FirstRdanaSubmissionResponse> {
    try {
      const result = await $fetch<FirstRdanaSubmissionResponse>('/api/forms/first/create', {
        method: 'POST',
        body: form.value,
      })

      success('RDANA Form submitted successfully.');
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
