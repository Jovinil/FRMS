// stores/useSecondBarangayForm.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { routerKey } from 'vue-router'
import type { SecondBarangayForm } from '~/models/secondBarangayForm'
import { createDefaultSecondBarangayForm } from '~/models/secondBarangayForm'

export const useSecondBarangayFormStore = defineStore('secondBarangayForm', () => {
  const form = ref<SecondBarangayForm>(createDefaultSecondBarangayForm())
  const { success, error } = useFlash()
  const router = useRouter();


  function setForm(newForm: SecondBarangayForm) {
    form.value = newForm
  }

  function reset() {
    form.value = createDefaultSecondBarangayForm()
  }

  async function saveToApi() {
    try {
      const result = await $fetch('/api/forms/second-barangay/create', {
        method: 'POST',
        body: form.value,
      })

      router.go(0);
      success('Second Barangay Form submitted successfully.')
      // refresh / redirect if you want:
      await navigateTo('/barangay/second-barangay-form-ii')
      return result
    } catch (e) {
      console.error(e)
      error('Failed to submit Second Barangay Form.')
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
