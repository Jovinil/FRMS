// stores/useThirdBarangayForm.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ThirdBarangayForm } from '~/models/thirdBarangayForm'
import { createDefaultThirdBarangayForm } from '~/models/thirdBarangayForm'

export const useThirdBarangayFormStore = defineStore('thirdBarangayForm', () => {
  const form = ref<ThirdBarangayForm>(createDefaultThirdBarangayForm())
  const { success, error } = useFlash()
  const router = useRouter();


  function setForm(newForm: ThirdBarangayForm) {
    form.value = newForm
  }

  function reset() {
    form.value = createDefaultThirdBarangayForm()
  }

  async function saveToApi() {
    try {
      const result = await $fetch('/api/forms/third-barangay/create', {
        method: 'POST',
        body: form.value,
      })

      router.go(0);
      success('Third Barangay Form submitted successfully.')
      // optional redirect / reload here
      await navigateTo('/barangay/third-barangay-form-iii')

      return result
    } catch (e) {
      console.error(e)
      error('Failed to submit Third Barangay Form.')
      throw e
    }
  }

  return {
    form,
    setForm,
    reset,
    saveToApi,
  }
})
