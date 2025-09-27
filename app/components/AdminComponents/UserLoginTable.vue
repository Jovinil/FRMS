<template>
     <UTable :data="data" :columns="columns" />
</template>


<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'

interface Users {
  gmail: string
  role: string
  status: 'active' | 'inactive'
}

const data: Users[] = [
  {
    gmail: 'johndoe@gmail.com',
    role: 'Barangay Official',
    status: 'active',
  },
  {
    gmail: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'inactive',
  },
  {
    gmail: 'johndoe@gmail.com',
    role: 'MDRRMO Officer',
    status: 'active',
  },
]

const columns: ColumnDef<Users>[] = [
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
    accessorKey: 'role',
    header: 'Role',
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
        active: 'text-success',
        inactive: 'text-error',        
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