// composables/useRdanaForm.ts
import { computed, ref } from 'vue';
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';
import { rdanaFormSchema } from '~/schemas/firstRdanaForm';

export function useRdanaForm() {
  const store = useRdanaFormStore();

  // Steps for pagination – adjust labels as you like
  const steps = [
    { label: 'Profile & Mission' },
    { label: 'Initial Impact' },
    { label: 'Accessibility & Power' },
    { label: 'Communications & Evacuation' },
    { label: 'Relief & SRR' },
    { label: 'Law & Order & Shelter' },
    { label: 'Food, Water & Sanitation' },
    { label: 'Health & Nutrition' },
    { label: 'Protection & Education' },
    { label: 'Livelihood, Engagement & Overall' },
    { label: 'Submitted By' },
  ];

  const currentStep = ref(0);

  const form = computed({
    get: () => store.form,
    set: (val) => store.setForm(val),
  });

  function nextStep() {
    if (currentStep.value < steps.length - 1) currentStep.value += 1;
  }

  function prevStep() {
    if (currentStep.value > 0) currentStep.value -= 1;
  }

  async function submit() {
    // Validation here if you want manual validation:
    rdanaFormSchema.parse(form.value);

    // Save to API / DB
    await store.saveToApi();

    // Optionally: navigate or show success toast
  }

  function reset() {
    store.reset();
    currentStep.value = 0;
  }

  return {
    form,
    schema: rdanaFormSchema,
    steps,
    currentStep,
    nextStep,
    prevStep,
    submit,
    reset,
  };
}
