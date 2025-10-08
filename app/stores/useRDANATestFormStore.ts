import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { RDANAForm, createEmptyRDANA } from '~/app/models/rdana'

export const useRDANATestFormStore = defineStore('rdanaTestForm', () => {
  const form = ref<RDANAForm>(createEmptyRDANA())

  function reset() {
    form.value = createEmptyRDANA()
  }

  function validate() {
    return form.value.validate()
  }

  const asJSON = computed(() => form.value.toJSON())

  return { form, reset, validate, asJSON }
})
