// composables/useBarangayFormReminder.t
const FORM_DEADLINES_MS: Record<number, number> = {
  2: 12 * 60 * 60 * 1000,  // 12 hours for next form (Form 3)
  3: 24 * 60 * 60 * 1000,  // 24 hours for whatever comes after Form 3 (optional)
}

function formatRemaining(ms: number): string {
  const totalMinutes = Math.max(0, Math.floor(ms / (60 * 1000)))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours <= 0 && minutes <= 0) return '0 minutes'
  if (hours <= 0) return `${minutes} minute${minutes === 1 ? '' : 's'}`
  if (minutes === 0) return `${hours} hour${hours === 1 ? '' : 's'}`

  return `${hours}h ${minutes}m`
}

// composables/useBarangayFormReminder.ts
export function useBarangayFormReminder() {
  const auth = useAuthStore()
  const { warningPersistent } = useFlash()

  const checkReminder = async () => {
    // ✅ you need barangayId to call the endpoint
    const barangayId = auth.user?.barangayId
    if (!barangayId) return

    const progress = await $fetch<null | {
      latest: { type: string; effectiveAt: string }
      next: { label: string; windowMs: number; deadlineAt: string }
    }>('/api/barangay/progress-by-barangay', {
      params: { barangayId },
    })

    if (!progress) return

    const submittedAt = new Date(progress.latest.effectiveAt)
    const deadlineAt = new Date(progress.next.deadlineAt)
    const now = new Date()

    // (submittedAt is not required below, but keep if you want to log/debug)
    const remaining = deadlineAt.getTime() - now.getTime()

    if (remaining <= 0) {
      warningPersistent(`Deadline passed for ${progress.next.label}. Please coordinate with the MDRRMO.`)
    } else {
      warningPersistent(`${progress.next.label} must be submitted within ${formatRemaining(remaining)}.`)
    }
  }

  return { checkReminder }
}
