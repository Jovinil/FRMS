<script setup lang="ts">
import { h, resolveComponent, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import {
  useMdrrmoFirstRdanaStore,
  type MdrrmoFormRow,
} from '~/stores/useMdrrmoFirstRdanaStore'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const store = useMdrrmoFirstRdanaStore()

function getStatus(deadline: string, submittedAt: string | null) {
  if (submittedAt) return { color: 'success', label: 'Submitted' }

  const now = Date.now()
  const d = new Date(deadline).getTime()
  const diff = d - now
  const oneDay = 24 * 60 * 60 * 1000

  if (diff < 0) return { color: 'error', label: 'Overdue' }
  if (diff <= oneDay) return { color: 'warning', label: 'Due soon' }
  return { color: 'success', label: 'On time' }
}

function formatDate(v: string) {
  return new Date(v).toLocaleString()
}

function formatTimeRemaining(deadline: string) {
  const now = Date.now()
  const d = new Date(deadline).getTime()
  const diff = d - now
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (diff < 0) return `${Math.abs(hours)}h overdue`
  return `${hours}h`
}

const columns: TableColumn<MdrrmoFormRow>[] = [
  { accessorKey: 'referenceCode', header: 'Ref. Code' },
  { accessorKey: 'incidentType', header: 'Incident Type' },
  { accessorKey: 'barangay', header: 'Barangay' },
  {
    accessorKey: 'incidentDatetime',
    header: 'Incident Date/Time',
    cell: ({ row }) => {
      const value = row.getValue('incidentDatetime') as string
      return formatDate(value)
    },
  },
  {
    accessorKey: 'deadlineAt',
    header: 'Deadline',
    cell: ({ row }) => {
      const value = row.getValue('deadlineAt') as string
      return formatDate(value)
    },
  },
  {
    id: 'timeRemaining',
    header: 'Time Remaining',
    cell: ({ row }) => {
      const deadline = row.original.deadlineAt
      return formatTimeRemaining(deadline)
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const deadline = row.original.deadlineAt
      const submittedAt = row.original.submittedAt
      const status = getStatus(deadline, submittedAt)

      return h(
        UBadge as any,
        { color: status.color, variant: 'subtle' },
        () => status.label,
      )
    },
  },
  {
    id: 'actions',
    header: '',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right',
      },
    },
    cell: ({ row }) => {
      const submittedAt = row.original.submittedAt
      const label = submittedAt ? 'View' : 'Fill Form'
      const color = submittedAt ? 'neutral' : 'primary'
      const variant = submittedAt ? 'outline' : 'solid'

      return h(
        UButton as any,
        { size: 'xs', color, variant },
        () => label,
      )
    },
  },
]

onMounted(() => {
  store.fetchRows()
})
</script>

<template>
  <UPage>
    <UPageHeader
      title="MDRRMO Dashboard – RDANA 72h"
      description="Live RDANA Form 1 submissions with 72-hour deadlines."
    />

    <UPageBody>
      <UCard class="mb-6">
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <p class="text-sm text-gray-500">Total Forms</p>
            <p class="text-2xl font-semibold">
              {{ store.total }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Overdue</p>
            <p class="text-2xl font-semibold text-red-600">
              {{ store.overdue }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Submitted</p>
            <p class="text-2xl font-semibold text-emerald-600">
              {{ store.submitted }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">RDANA Form 1 Submissions</h2>
        </template>

        <UTable
          :data="store.rows"
          :columns="columns"
          :loading="store.loading"
        />

        <p
          v-if="store.error"
          class="mt-2 text-sm text-red-500"
        >
          {{ store.error }}
        </p>
      </UCard>
    </UPageBody>
  </UPage>
</template>
