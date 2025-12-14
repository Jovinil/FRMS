// composables/useFlash.ts
export type FlashLevel = 'success' | 'error' | 'info' | 'warning'

export function useFlash() {
  const toast = useToast()

  const show = (level: FlashLevel, message: string, opts?: { persistent?: boolean }) => {
    toast.add({
      title:
        level === 'success'
          ? 'Success'
          : level === 'error'
            ? 'Error'
            : 'Notice',
      description: message,
      color: level,
      icon:
        level === 'success'
          ? 'i-lucide-check-circle-2'
          : level === 'error'
            ? 'i-lucide-x-circle'
            : 'i-lucide-info',

      // ✅ override global duration for this toast only
      ...(opts?.persistent ? { timeout: 0 } : {}),
      // If your Nuxt UI build uses `duration` instead of `timeout`, use this instead:
      // ...(opts?.persistent ? { duration: 0 } : {}),
    })
  }

  const success = (message: string) => show('success', message)
  const error = (message: string) => show('error', message)
  const info = (message: string) => show('info', message)
  const warning = (message: string) => show('warning', message)

  // ✅ persistent warning
  const warningPersistent = (message: string) => show('warning', message, { persistent: true })

  return { success, error, info, warning, warningPersistent }
}
  