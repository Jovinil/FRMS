// stores/useMdrrmoFirstRdanaStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type MdrrmoFormRow = {
  id: number
  referenceCode: string
  incidentId: number
  incidentType: string
  barangay: string
  incidentDatetime: string
  deadlineAt: string
  submittedAt: string | null
}

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

export const useMdrrmoFirstRdanaStore = defineStore('mdrrmoFirstRdana', () => {
  const rows = ref<MdrrmoFormRow[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const total = computed(() => rows.value.length)

  const overdue = computed(
    () =>
      rows.value.filter(
        (r) => getStatus(r.deadlineAt, r.submittedAt).label === 'Overdue',
      ).length,
  )

  const submitted = computed(
    () => rows.value.filter((r) => r.submittedAt !== null).length,
  )

  async function fetchRows() {
    try {
      loading.value = true
      error.value = null

      const data = await $fetch<MdrrmoFormRow[]>('/api/forms/first')
      rows.value = data
    } catch (e: any) {
      console.error(e)
      error.value = e?.message || 'Failed to load RDANA forms.'
    } finally {
      loading.value = false
    }
  }

  return {
    rows,
    loading,
    error,
    total,
    overdue,
    submitted,
    fetchRows,
  }
})
