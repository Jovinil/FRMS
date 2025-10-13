import { defineStore } from 'pinia'
import z from 'zod'
import { DANAForm, createEmptyDANA } from '~/models/dana'

const danaSchema = z.object({
  profile: z.object({
    typeOfDisaster: z.string().min(1, 'Type of disaster is required'),
    dateOfOccurrence: z.string().min(1, 'Date of occurrence is required'),
    timeOfOccurrence: z.string().optional(),
    sourceOfReport: z.string().min(1, 'Source of report is required'),
    dateOfReport: z.string().min(1, 'Date of report is required'),
    timeOfReport: z.string().optional(),
  }),
  areasAffected: z.string().optional(),
  populationAffected: z.object({
    families: z.number().nullable().optional(),
    persons: z.number().nullable().optional(),
  }).optional(),
  damagedProperties: z.object({
    totally: z.number().nullable().optional(),
    partially: z.number().nullable().optional(),
    estimatedCost: z.number().nullable().optional(),
    breakdown: z.object({
      houses: z.number().nullable().optional(),
      schoolBuildings: z.number().nullable().optional(),
      hospitals: z.number().nullable().optional(),
      govOffices: z.number().nullable().optional(),
      publicMarkets: z.number().nullable().optional(),
      commercialFacilities: z.number().nullable().optional(),
      othersSpec: z.string().optional(),
    }).optional(),
  }).optional(),
  casualties: z.object({
    dead: z.number().nullable().optional(),
    injured: z.number().nullable().optional(),
    missing: z.number().nullable().optional(),
  }).optional(),
  lifelines: z.object({
    electrical: z.string().optional(),
    water: z.string().optional(),
    communication: z.any().optional(),
    transportation: z.object({
      passable: z.enum(['passable', 'not_passable', '']).optional(),
      roads: z.object({
        national: z.number().nullable().optional(),
        provincial: z.number().nullable().optional(),
        municipal: z.number().nullable().optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  agriculture: z.object({
    rice: z.object({
      hectares: z.number().nullable().optional(),
      metricTons: z.number().nullable().optional(),
      lossValue: z.number().nullable().optional(),
    }).optional(),
    corn: z.object({
      hectares: z.number().nullable().optional(),
      metricTons: z.number().nullable().optional(),
      lossValue: z.number().nullable().optional(),
    }).optional(),
    fishponds: z.number().nullable().optional(),
    fishingBoats: z.number().nullable().optional(),
    livestockHeads: z.number().nullable().optional(),
    livestockValue: z.number().nullable().optional(),
  }).optional(),
  localActions: z.object({
    emergencyResponders: z.string().optional(),
    assetsDeployed: z.string().optional(),
    extentOfAssistance: z.string().optional(),
    progressReportToFollow: z.enum(['Yes', 'No', '']).optional(),
    signedBy: z.string().optional(),
  }).optional(),
})

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
      // const valid = this.validateForm()
      // if (!valid) return false
      const validated = danaSchema.safeParse(this.form)
      if(!validated.success){
        console.log(validated.error.issues)
        return
      }

      try{
        const request = await $fetch('/api/forms/dana/create', {
          method: 'POST',
          body: {
            summary: validated.data.localActions?.extentOfAssistance,
            barangayName: 'Calatagan', // to be replaced or removed
            userId: useAuthStore().user?.id
          }
        })
      }catch(error){
        console.log(error)
      }
    },
  },
})
