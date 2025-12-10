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

export function useBarangayFormReminder() {
  const auth = useAuthStore()
  const { warning, info } = useFlash() // or useToast() directly

  const checkReminder = async () => {
    const rawUserId = auth.user?.id
    if (!rawUserId) return

    const userId = String(rawUserId)

    const progress = await $fetch<{
      latestFormNumber: number
      latestFormSubmittedAt: string | null
    } | null>('/api/barangay/progress', {
      params: { userId },
    })

    if (!progress || !progress.latestFormSubmittedAt) {
      // user has not submitted anything yet
      return
    }

    const { latestFormNumber, latestFormSubmittedAt } = progress

    // Decide which form is next
    const nextFormNumber = latestFormNumber + 1

    // if already on/after Form 3, no next form required (or handle differently)
    if (nextFormNumber > 3) {
      return
    }

    const windowMs = FORM_DEADLINES_MS[latestFormNumber]
    if (!windowMs) return

    const submittedAt = new Date(latestFormSubmittedAt)
    const now = new Date()
    const elapsed = now.getTime() - submittedAt.getTime()

    if (elapsed < 0) {
      // clock skew; ignore
      return
    }

    if (elapsed >= windowMs) {
      // deadline passed – you *could* show an overdue message instead
      warning(
        `The deadline to submit Form ${nextFormNumber} has passed. Please coordinate with the MDRRMO.`
      )
      return
    }

    // Still within allowed window → show "remaining time" warning
    const remainingMs = windowMs - elapsed
    const remainingText = formatRemaining(remainingMs)

    // Customize per form
    if (latestFormNumber === 1) {
      // Form 1 submitted, Form 2 pending
      warning(
        `Form 2 must be submitted within ${remainingText}. Please complete Form 2.`
      )
    } else if (latestFormNumber === 2) {
      // Form 2 submitted, Form 3 pending
      warning(
        `Form 3 must be submitted within ${remainingText}. Please complete Form 3.`
      )
    } else if (latestFormNumber === 3) {
      // Optional: follow-up after Form 3
      info(
        `Please complete the required follow-up within ${remainingText}.`
      )
    }
  }

  return {
    checkReminder,
  }
}
