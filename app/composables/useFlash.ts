// composables/useFlash.ts
export type FlashLevel = 'success' | 'error' | 'info' | 'warning'

export function useFlash() {
  const toast = useToast() // directly use Nuxt UI toast

  const show = (level: FlashLevel, message: string) => {
    toast.add({
      title:
        level === 'success'
          ? 'Success'
          : level === 'error'
            ? 'Error'
            : 'Notice',
      description: message,
      color: level, // 'success' | 'error' | 'info' | 'warning'
      icon:
        level === 'success'
          ? 'i-lucide-check-circle-2'
          : level === 'error'
            ? 'i-lucide-x-circle'
            : 'i-lucide-info',
      // duration is controlled globally via <UApp :toaster> (see below)
    })
  }

  const success = (message: string) => show('success', message)
  const error = (message: string) => show('error', message)
  const info = (message: string) => show('info', message)
  const warning = (message: string) => show('warning', message)

  return { success, error, info, warning }
}
