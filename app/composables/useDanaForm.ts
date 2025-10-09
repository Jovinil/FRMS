// composables/useDamageAssessmentForm.ts
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

export const useDamageAssessmentForm = () => {
  // ✅ Zod schema definition
  const schema = z.object({
    disasterType: z.string().min(1, 'Required'),
    dateTimeOccurrence: z.string().min(1, 'Required'),
    sourceOfReport: z.string().min(1, 'Required'),
    dateTimeReport: z.string().min(1, 'Required'),

    areasAffected: z.string().min(1, 'Required'),
    familiesAffected: z.coerce.number().min(0),
    personsAffected: z.coerce.number().min(0),
    childrenAffected: z.coerce.number().min(0),

    familiesDisplaced: z.coerce.number().min(0),
    personsDisplaced: z.coerce.number().min(0),
    infants: z.coerce.number().min(0),
    children: z.coerce.number().min(0),
    adolescents: z.coerce.number().min(0),
    adults: z.coerce.number().min(0),

    dead: z.coerce.number().min(0),
    injured: z.coerce.number().min(0),
    missing: z.coerce.number().min(0),

    remarks: z.string().optional(),
  })

  type Schema = z.output<typeof schema>

  // ✅ Reactive state
  const state = reactive<Partial<Schema>>({
    disasterType: undefined,
    dateTimeOccurrence: undefined,
    sourceOfReport: undefined,
    dateTimeReport: undefined,
    areasAffected: undefined,
    familiesAffected: undefined,
    personsAffected: undefined,
    childrenAffected: undefined,
    familiesDisplaced: undefined,
    personsDisplaced: undefined,
    infants: undefined,
    children: undefined,
    adolescents: undefined,
    adults: undefined,
    dead: undefined,
    injured: undefined,
    missing: undefined,
    remarks: undefined,
  })

  const toast = useToast()

  // ✅ Submit handler
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log('Form data:', event.data)
    toast.add({
      title: 'Success',
      description: 'Damage Assessment Report submitted successfully.',
      color: 'success',
    })
  }

  return {
    schema,
    state,
    onSubmit,
  }
}
