<template>
  <UTable :data="data" :columns="columns" />
</template>


<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'

interface Reports {
  gmail: string
  barangay: string
  date_submitted: string
  status: 'pending' | 'approved'
}

const data: Reports[] = [
  {
    gmail: 'johndoe@gmail.com',
    barangay: 'Barangay 1',
    date_submitted: '10-10-25',
    status: 'pending',
  },
  {
    gmail: 'johndoe@gmail.com',
    barangay: 'Barangay 1',
    date_submitted: '10-10-25',
    status: 'approved',
  },
  {
    gmail: 'johndoe@gmail.com',
    barangay: 'Barangay 1',
    date_submitted: '10-10-25',
    status: 'pending',
  },
]

const columns: ColumnDef<Reports>[] = [
  {
    accessorKey: 'gmail',
    header: 'Gmail',
    meta: {
      class: {
        th: 'text-center font-semibold',
        td: 'text-center font-mono'
      }
    }
  },
  {
    accessorKey: 'barangay',
    header: 'Barangay',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'date_submitted',
    header: 'Date Submitted',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const colorMap = {
        approved: 'text-success',
        pending: 'text-warning',        
      }
      return h(
        'span',
        {
          class: `font-semibold capitalize ${colorMap[status as keyof typeof colorMap]}`
        },
        status
      )
    }
  },  
]
</script>