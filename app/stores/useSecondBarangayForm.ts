// stores/useSecondBarangayForm.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SecondBarangayForm } from '~/models/secondBarangayForm'
import { createDefaultSecondBarangayForm } from '~/models/secondBarangayForm'

export const useSecondBarangayFormStore = defineStore('secondBarangayForm', () => {
  const form = ref<SecondBarangayForm>(createDefaultSecondBarangayForm())
  const { success, error } = useFlash()
  const router = useRouter()

  function setForm(newForm: SecondBarangayForm) {
    form.value = newForm
  }

  function reset() {
    form.value = createDefaultSecondBarangayForm()
  }

  async function saveToApi() {
    try {

      const payload = {
        userId: String(useAuthStore().user?.id),
        form: form.value,
      }

      const result = await $fetch('/api/forms/second-barangay/create', {
        method: 'POST',
        body: payload,
      })

      success('Second Barangay Form submitted successfully.')

      await router.replace('/barangay')
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
