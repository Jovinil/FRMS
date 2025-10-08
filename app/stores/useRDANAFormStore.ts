import { defineStore } from 'pinia'
import { RDANAForm, createEmptyRDANA } from '../models/rdana'

export const useRDANAFormStore = defineStore('rdanaForm', {
  state: () => ({
    form: createEmptyRDANA() as RDANAForm,
  }),
  getters: {
    asJSON: (state) => state.form.toJSON(),
  },
  actions: {
    reset() {
      this.form = createEmptyRDANA()
    },
    updateSection<K extends keyof RDANAForm>(section: K, payload: Partial<RDANAForm[K]>) {
      // Assign into nested section to preserve class instance
      Object.assign(this.form[section] as object, payload)
    },
    validate() {
      return this.form.validate()
    },
  },
})
