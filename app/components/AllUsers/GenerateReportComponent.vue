<template>
  <div class="flex justify-center">
    <UCard :ui="{ root: 'w-full max-w-3xl', footer: 'text-end' }">
      <template #header>
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-[0.18em] text-emerald-700">
              Reports
            </p>
            <h2 class="text-xl font-semibold text-gray-900">
              Generate Incident Report
            </h2>
            <p class="text-sm text-gray-600">
              Export the latest RDANA inputs into a polished PDF for sharing with your response team.
            </p>
          </div>
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            PDF
          </span>
        </div>
      </template>

      <div class="space-y-4 text-gray-700">
        <p class="text-sm">
          Review the summary below, then generate to download or send.
        </p>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
            <p class="text-xs uppercase text-gray-500">Includes</p>
            <p class="text-sm font-medium text-gray-800">
              Mission profile, barangay impacts, attachments
            </p>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between gap-3 text-sm text-gray-500">
          <span>Ensure details are final before exporting.</span>
          <UButton color="info" label="Generate PDF" />
        </div>
      </template>
    </UCard>
  </div>
</template>
