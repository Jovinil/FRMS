<template>
  <form
    class="space-y-6 bg-white p-6 rounded-lg shadow-md"
    @submit.prevent="handleSubmit"
  >
    <!-- Barangay -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Barangay
      </label>
      <USelect
        v-model="form.barangay_id"
        :options="barangayOptions"
        placeholder="Select a Barangay"
      />
    </div>

    <!-- Status -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <USelect
        v-model="form.status"
        :options="['Draft', 'Pending', 'Approved', 'Rejected']"
        placeholder="Select Status"
      />
    </div>

    <!-- Summary -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Summary
      </label>
      <UTextarea
        v-model="form.summary"
        placeholder="Enter report summary..."
        :rows=6
      />
    </div>

    <!-- Submit -->
    <div class="flex justify-end">
      <UButton type="submit" color="info">Submit Report</UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  barangay_id: null,
  status: 'Draft',
  summary: '',
})

// Example barangays from ERD (you could fetch dynamically)
const barangayOptions = [
  { label: 'Barangay 1', value: 1 },
  { label: 'Barangay 2', value: 2 },
  { label: 'Barangay 3', value: 3 },
]

function handleSubmit() {
  console.log('RDANA Report Submitted:', form.value)
  // save to API or Firestore here
}
</script>
