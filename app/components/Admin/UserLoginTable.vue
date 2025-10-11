<template>
  <UTable :data="data" :columns="columns" />
</template>


<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '@prisma/client' 

const data: User[] = useAuthStore().users
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
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