import { defineStore } from 'pinia'
import { DANAForm, createEmptyDANA } from '~/models/dana'

/**
 * Pinia store for managing the DANA form state.
 * Mirrors RDANA store pattern for consistency.
 */
export const useDanaStore = defineStore('dana', {
  state: () => ({
    form: createEmptyDANA(),
    errors: [] as string[],
    lastSavedAt: null as string | null,
  }),

  getters: {
    isValid: (state) => state.errors.length === 0,
    asJSON: (state) => state.form.toJSON(),
  },

  actions: {
    /**
     * Replace the current form state with a fresh or loaded instance.
     */
    setForm(newForm: DANAForm) {
      this.form = new DANAForm(newForm)
    },

    /**
     * Update a specific section or nested field dynamically.
     * Example: updateField('profile.typeOfDisaster', 'Flood')
     */
    updateField(path: string, value: any) {
    const keys = path.split('.')
    let target: any = this.form

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i] as keyof typeof target

        // If target[key] doesn't exist or isn't an object, initialize it
        if (
        target[key] === undefined ||
        target[key] === null ||
        typeof target[key] !== 'object'
        ) {
        target[key] = {}
        }

        // Explicitly cast to any to avoid index type issues
        target = target[key] as any
    }

    const finalKey = keys[keys.length - 1] as keyof typeof target
    target[finalKey] = value
    },

    /**
     * Validate form using domain-level checks from model.
     */
    validateForm() {
      const { valid, errors } = this.form.validate()
      this.errors = errors
      return valid
    },

    /**
     * Reset to an empty form.
     */
    resetForm() {
      this.form = createEmptyDANA()
      this.errors = []
      this.lastSavedAt = null
    },

    /**
     * Save (placeholder — replace with API call or Firestore push later).
     */
    async saveForm() {
      const valid = this.validateForm()
      if (!valid) return false
      // Example of saving timestamp locally — replace with API integration.
      this.lastSavedAt = new Date().toISOString()
      return true
    },
  },
})
