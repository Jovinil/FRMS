<script setup lang="ts">
import { ref, computed } from 'vue'
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

type MdrrmoFormRow = {
  id: number
  referenceCode: string
  incidentId: number
  incidentType: string
  barangay: string
  incidentDatetime: string
  deadlineAt: string
  submittedAt: string | null
}

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

// 🔹 static sample data
const rows = ref<MdrrmoFormRow[]>([
  {
    id: 1,
    referenceCode: 'INC-2025-001',
    incidentId: 1,
    incidentType: 'Flooding',
    barangay: 'Barangay 1',
    incidentDatetime: '2025-12-10T08:00:00Z',
    deadlineAt: '2025-12-13T08:00:00Z',
    submittedAt: null,
  },
  {
    id: 2,
    referenceCode: 'INC-2025-002',
    incidentId: 2,
    incidentType: 'Fire',
    barangay: 'Barangay 2',
    incidentDatetime: '2025-12-08T10:00:00Z',
    deadlineAt: '2025-12-11T10:00:00Z',
    submittedAt: '2025-12-10T09:30:00Z',
  },
])

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

// ✅ Nuxt UI v3+ style columns
const columns: TableColumn<MdrrmoFormRow>[] = [
  {
    accessorKey: 'referenceCode',
    header: 'Ref. Code',
  },
  {
    accessorKey: 'incidentType',
    header: 'Incident Type',
  },
  {
    accessorKey: 'barangay',
    header: 'Barangay',
  },
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

const total = computed(() => rows.value.length)
const overdue = computed(() =>
  rows.value.filter((r) => getStatus(r.deadlineAt, r.submittedAt).label === 'Overdue').length,
)
const submitted = computed(() => rows.value.filter((r) => r.submittedAt).length)
</script>

<template>
  <UPage>
    <UPageHeader
      title="MDRRMO Dashboard (Static)"
      description="Static view of MDRRMO incident forms with a 72-hour deadline."
    />

    <UPageBody>
      <UCard class="mb-6">
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <p class="text-sm text-gray-500">Total Forms</p>
            <p class="text-2xl font-semibold">
              {{ total }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Overdue</p>
            <p class="text-2xl font-semibold text-red-600">
              {{ overdue }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Submitted</p>
            <p class="text-2xl font-semibold text-emerald-600">
              {{ submitted }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Incident Forms</h2>
        </template>

        <!-- 🔑 Nuxt UI v3: use :data, not :rows -->
        <UTable :data="rows" :columns="columns" />
      </UCard>
    </UPageBody>
  </UPage>
</template>
