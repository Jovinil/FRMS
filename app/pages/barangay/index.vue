<script setup lang="ts">
import { ref, computed, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

type OverallStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'

type BarangayIncidentRow = {
  id: number
  referenceCode: string
  type: string
  incidentDatetime: string
  overallStatus: OverallStatus
  currentFormType: string | null
  deadlineAt: string | null
}

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

// 🔹 static sample incidents
const rows = ref<BarangayIncidentRow[]>([
  {
    id: 1,
    referenceCode: 'INC-2025-001',
    type: 'Flooding',
    incidentDatetime: '2025-12-10T06:00:00Z',
    overallStatus: 'IN_PROGRESS',
    currentFormType: 'B_FORM_2', // means Form 1 done, Form 2 currently due
    deadlineAt: '2025-12-13T06:00:00Z',
  },
  {
    id: 2,
    referenceCode: 'INC-2025-002',
    type: 'Fire',
    incidentDatetime: '2025-12-05T10:00:00Z',
    overallStatus: 'COMPLETED',
    currentFormType: null,
    deadlineAt: null,
  },
  {
    id: 3,
    referenceCode: 'INC-2025-003',
    type: 'Landslide',
    incidentDatetime: '2025-12-08T02:00:00Z',
    overallStatus: 'OVERDUE',
    currentFormType: 'B_FORM_1',
    deadlineAt: '2025-12-09T02:00:00Z',
  },
])

function formatDate(v: string) {
  return new Date(v).toLocaleString()
}

function humanForm(formType?: string | null) {
  if (!formType) return '-'
  if (formType === 'B_FORM_1') return 'Form 1 – Initial Report'
  if (formType === 'B_FORM_2') return 'Form 2 – Detailed Assessment'
  if (formType === 'B_FORM_3') return 'Form 3 – Recovery Plan'
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

// ✅ Nuxt UI v3+ columns
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

// summary cards
const total = computed(() => rows.value.length)
const inProgress = computed(() => rows.value.filter(i => i.overallStatus === 'IN_PROGRESS').length)
const overdue = computed(() => rows.value.filter(i => i.overallStatus === 'OVERDUE').length)
const completed = computed(() => rows.value.filter(i => i.overallStatus === 'COMPLETED').length)
</script>

<template>
  <UPage>
    <UPageHeader
      title="Barangay Dashboard (Static)"
      description="Static 3-step barangay form flow: Form 1 → Form 2 → Form 3."
    />

    <UPageBody>
      <UCard class="mb-6">
        <div class="grid gap-4 sm:grid-cols-4">
          <div>
            <p class="text-sm text-gray-500">Incidents</p>
            <p class="text-2xl font-semibold">
              {{ total }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">In Progress</p>
            <p class="text-2xl font-semibold text-yellow-600">
              {{ inProgress }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Overdue</p>
            <p class="text-2xl font-semibold text-red-600">
              {{ overdue }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Completed</p>
            <p class="text-2xl font-semibold text-emerald-600">
              {{ completed }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Incidents</h2>
        </template>

        <!-- 🔑 Nuxt UI v3: use :data -->
        <UTable :data="rows" :columns="columns" />
      </UCard>
    </UPageBody>
  </UPage>
</template>
