// stores/useThirdBarangayForm.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ThirdBarangayForm } from '~/models/thirdBarangayForm'
import { createDefaultThirdBarangayForm } from '~/models/thirdBarangayForm'

export const useThirdBarangayFormStore = defineStore('thirdBarangayForm', () => {
  const form = ref<ThirdBarangayForm>(createDefaultThirdBarangayForm())
  const { success, error } = useFlash()
  const router = useRouter()
  const auth = useAuthStore()

  function setForm(newForm: ThirdBarangayForm) {
    form.value = newForm
  }

  function reset() {
    form.value = createDefaultThirdBarangayForm()
  }

  async function saveToApi() {
    try {
      const rawUserId = auth.user?.id
      console.log('Third form userId:', rawUserId)

      if (!rawUserId) {
        error('You must be logged in to submit this form.')
        return
      }

      const payload = {
        userId: String(rawUserId),
        form: form.value,
      }

      const result = await $fetch('/api/forms/third-barangay/create', {
        method: 'POST',
        body: payload,
      })

      success('Third Barangay Form submitted successfully.')

      await navigateTo('/barangay')
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
