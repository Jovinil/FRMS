import { defineStore } from 'pinia'
import { createEmptyRDANA, RDANASchema } from '~/models/rdana'
import type { RDANAForm } from '~/models/rdana'

export const useRDANAStore = defineStore('rdana', {
  state: () => ({
    form: createEmptyRDANA() as RDANAForm,
    errors: [] as string[],
  }),

  getters: {
    isValid: (state) => state.errors.length === 0,
  },

  actions: {
    updateField(path: string, value: unknown) {
      const keys = path.split('.')
      let target: Record<string, any> = this.form as Record<string, any>

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]!
        // Ensure path exists
        if (typeof target[key] !== 'object' || target[key] === null) {
          target[key] = {}
        }
        target = target[key] as Record<string, any>
      }

      const finalKey = keys[keys.length - 1]!
      target[finalKey] = value
    },

    validateForm() {
      const result = RDANASchema.safeParse(this.form)
      this.errors = result.success ? [] : result.error.errors.map(e => e.message)
      return result.success
    },

    resetForm() {
      this.form = createEmptyRDANA()
      this.errors = []
    },
  },
})
