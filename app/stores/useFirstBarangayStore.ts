// stores/firstBarangayForm.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FirstBarangayForm } from '~/models/firstBarangayForm';
import { createDefaultFirstBarangayForm } from '~/models/firstBarangayForm';

export const useFirstBarangayFormStore = defineStore('firstBarangayForm', () => {
  const form = ref<FirstBarangayForm>(createDefaultFirstBarangayForm());
  const { success, error } = useFlash(); 
  const router = useRouter();

  function setForm(newForm: FirstBarangayForm) {
    form.value = newForm;
  }

  function reset() {
    form.value = createDefaultFirstBarangayForm();
  }

  // hook this to your API / DB
  async function saveToApi() {
    const payload = {
      userId: String(useAuthStore().user?.id),
      form: form.value
    }
    try {
      const result = await $fetch('/api/forms/first-barangay/create', {
        method: 'POST',
        body: payload,
      })


      success('Barangay Form submitted successfully.');
      await navigateTo('/barangay')
    } catch (e) {
      console.error(e)
      error('Failed to submit First RDANA Form.')
      throw e
    }
}

  return {
    form,
    setForm,
    reset,
    saveToApi,
  };
});

