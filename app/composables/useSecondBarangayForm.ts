// composables/useSecondBarangayForm.ts
import { computed } from 'vue';
import { useSecondBarangayFormStore } from '~/stores/useSecondBarangayForm';
import { secondBarangayFormSchema } from '~/schemas/secondBarangayForm.schema';

export function useSecondBarangayForm() {
  const store = useSecondBarangayFormStore();

  const form = computed({
    get: () => store.form,
    set: (val) => store.setForm(val),
  });

  async function submit() {
    // UForm validates via schema
    await store.saveToApi();
  }

  function reset() {
    store.reset();
  }

  return {
    form,
    schema: secondBarangayFormSchema,
    submit,
    reset,
  };
}
