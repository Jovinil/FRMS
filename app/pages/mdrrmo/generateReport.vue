<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-3">
    <!-- Select RDANA submission -->
    <UInputMenu
      v-model="selectedSubmission"
      :items="items"
      value-key="id"
      option-attribute="label"
      class="w-1/2"
      placeholder="Select RDANA submission"
    />

    <!-- Button to fetch & open PDF -->
    <UButton
      class="w-1/2"
      color="primary"
      variant="solid"
      :disabled="!selectedSubmission"
      @click="downloadRdanaReport"
    >
      View RDANA report
    </UButton>

    <!-- Pass the selected id to the GenerateReportComponent (optional but nice) -->
    <AllUsersGenerateReportComponent
      :submission-id="selectedSubmission?.id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type RdanaItem = {
  id: string   // matches FirstRdanaSubmission.id (cuid)
  label: string
}

const items = ref<RdanaItem[]>([])
const selectedSubmission = ref<RdanaItem | null>(null)

// Load all First RDANA submissions for the dropdown
onMounted(async () => {
  try {
    const res = await $fetch<RdanaItem[]>('/api/forms/first/first-submissions')
    items.value = res
  } catch (error) {
    console.error('Failed to load RDANA submissions:', error)
  }
})

// Use the selected ID to hit your PDF endpoint
const downloadRdanaReport = async () => {
  if (!selectedSubmission.value) return

  const id = selectedSubmission.value.id

  try {
    const res = await fetch(`/api/rdana-report/${id}`)

    if (!res.ok) {
      console.error('Failed to fetch report', res.status, res.statusText)
      // helpful while debugging:
      // console.log(await res.text())
      return
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    // Open PDF in a new tab
    window.open(url, '_blank')
  } catch (error) {
    console.error('Error fetching RDANA report:', error)
  }
}
</script>
