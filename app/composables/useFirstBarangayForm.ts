// composables/useFirstBarangayForm.ts
import { computed } from 'vue';
import { useFirstBarangayFormStore } from '~/stores/useFirstBarangayStore';
import { firstBarangayFormSchema } from '~/schemas/firstBarangay.schema';

export function useFirstBarangayForm() {
  const store = useFirstBarangayFormStore();

  const form = computed({
    get: () => store.form,
    set: (val) => store.setForm(val),
  });

  async function submit() {
    // UForm validates using schema; at this point data is valid
    await store.saveToApi();
  }

  function reset() {
    store.reset();
  }

  return {
    form,
    schema: firstBarangayFormSchema,
    submit,
    reset,
  };
}
