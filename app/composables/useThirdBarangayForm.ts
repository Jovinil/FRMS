// composables/useThirdBarangayForm.ts
import { computed } from 'vue';
import { useThirdBarangayFormStore } from '~/stores/useThirdBarangayForm';
import { thirdBarangayFormSchema } from '~/schemas/thirdBarangayForm.schema';

export function useThirdBarangayForm() {
  const store = useThirdBarangayFormStore();

  const form = computed({
    get: () => store.form,
    set: (val) => store.setForm(val),
  });

  async function submit() {
    await store.saveToApi();
  }

  function reset() {
    store.reset();
  }

  return {
    form,
    schema: thirdBarangayFormSchema,
    submit,
    reset,
  };
}
