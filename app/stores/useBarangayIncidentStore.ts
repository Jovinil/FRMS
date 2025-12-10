// stores/useBarangayIncidentStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type OverallStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'

export type BarangayIncidentRow = {
  id: number
  referenceCode: string
  type: string
  incidentDatetime: string
  overallStatus: OverallStatus
  currentFormType: string | null
  deadlineAt: string | null
}

export const useBarangayIncidentStore = defineStore('barangayIncidents', () => {
  const rows = ref<BarangayIncidentRow[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const total = computed(() => rows.value.length)
  const inProgress = computed(
    () => rows.value.filter((i) => i.overallStatus === 'IN_PROGRESS').length,
  )
  const overdue = computed(
    () => rows.value.filter((i) => i.overallStatus === 'OVERDUE').length,
  )
  const completed = computed(
    () => rows.value.filter((i) => i.overallStatus === 'COMPLETED').length,
  )

  async function fetchIncidents() {
    try {
      loading.value = true
      error.value = null

      const data = await $fetch<BarangayIncidentRow[]>(
        '/api/barangay/incidents-from-forms',
      )
      rows.value = data
    } catch (e: any) {
      console.error(e)
      error.value = e?.message || 'Failed to load barangay incidents.'
    } finally {
      loading.value = false
    }
  }

  return {
    rows,
    loading,
    error,
    total,
    inProgress,
    overdue,
    completed,
    fetchIncidents,
  }
})
