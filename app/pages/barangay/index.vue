<script setup lang="ts">
import { h, resolveComponent, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import {
  useBarangayIncidentStore,
  type BarangayIncidentRow,
  type OverallStatus,
} from '~/stores/useBarangayIncidentStore'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const store = useBarangayIncidentStore()

function formatDate(v: string) {
  return new Date(v).toLocaleString()
}

function humanForm(formType?: string | null) {
  if (!formType) return '-'
  if (formType === 'B_FORM_1') return 'Form 1'
  if (formType === 'B_FORM_2') return 'Form 2'
  if (formType === 'B_FORM_3') return 'Form 3'
  return formType
}

function overallBadge(status: OverallStatus) {
  switch (status) {
    case 'COMPLETED':
      return { color: 'success', label: 'Completed' }
    case 'OVERDUE':
      return { color: 'error', label: 'Overdue' }
    case 'IN_PROGRESS':
      return { color: 'warning', label: 'In Progress' }
    default:
      return { color: 'neutral', label: 'Not started' }
  }
}

// same columns you had, but typed with BarangayIncidentRow
const columns: TableColumn<BarangayIncidentRow>[] = [
  {
    accessorKey: 'referenceCode',
    header: 'Ref. Code',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'incidentDatetime',
    header: 'Incident Date',
    cell: ({ row }) => {
      const value = row.getValue('incidentDatetime') as string
      return formatDate(value)
    },
  },
  {
    accessorKey: 'currentFormType',
    header: 'Current Form',
    cell: ({ row }) => {
      const value = row.getValue('currentFormType') as string | null
      return humanForm(value)
    },
  },
  {
    accessorKey: 'deadlineAt',
    header: 'Next Deadline',
    cell: ({ row }) => {
      const value = row.getValue('deadlineAt') as string | null
      if (!value) return '-'
      return formatDate(value)
    },
  },
  {
    accessorKey: 'overallStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('overallStatus') as OverallStatus
      const badge = overallBadge(status)

      return h(
        UBadge as any,
        { color: badge.color, variant: 'subtle' },
        () => badge.label,
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
      const formType = row.original.currentFormType
      const label = formType ? `Fill ${humanForm(formType)}` : 'No pending form'

      return h(
        UButton as any,
        {
          size: 'xs',
          color: formType ? 'primary' : 'neutral',
          variant: formType ? 'solid' : 'outline',
          disabled: !formType,
        },
        () => label,
      )
    },
  },
]

onMounted(() => {
  store.fetchIncidents()
})
</script>
<template>
  <UPage>
    <UPageHeader
      title="Barangay Dashboard"
      description="3-step barangay form flow: Form 1 → Form 2 → Form 3."
    />

    <UPageBody>
      <UCard class="mb-6">
        <div class="grid gap-4 sm:grid-cols-4">
          <div>
            <p class="text-sm text-gray-500">Incidents</p>
            <p class="text-2xl font-semibold">
              {{ store.total }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">In Progress</p>
            <p class="text-2xl font-semibold text-yellow-600">
              {{ store.inProgress }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Overdue</p>
            <p class="text-2xl font-semibold text-red-600">
              {{ store.overdue }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Completed</p>
            <p class="text-2xl font-semibold text-emerald-600">
              {{ store.completed }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Incidents</h2>
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
