// composables/useDamageSummary.ts
import { unref } from 'vue'
import { useDeepFilterByKeys } from '~/composables/useDeepFilterByKeys'

export function useDamageSummary() {
  const { filterDeepByKeys } = useDeepFilterByKeys()

  /**
   * Robust recursive summing:
   * - Numbers -> added
   * - Numeric strings -> parsed & added
   * - Arrays -> add length + recursively sum items
   * - Objects -> recursively sum values
   * - Guards against circular refs with `seen` WeakSet
   */
  const sumNumericValues = (obj: any, seen = new WeakSet()): number => {
    if (obj == null) return 0 // handles null & undefined

    // primitives
    if (typeof obj === 'number') {
      return Number.isFinite(obj) ? obj : 0
    }
    if (typeof obj === 'string') {
      // treat numeric strings as numbers, otherwise ignore
      const n = Number(obj.replace(/,/g, '').trim())
      return Number.isFinite(n) ? n : 0
    }
    if (typeof obj === 'boolean') return 0

    // protect against cycles
    if (typeof obj === 'object') {
      if (seen.has(obj)) return 0
      seen.add(obj)

      // arrays: add length + sum contents
      if (Array.isArray(obj)) {
        let total = obj.length
        for (const item of obj) {
          total += sumNumericValues(item, seen)
        }
        return total
      }

      // plain objects: sum all values
      let total = 0
      for (const val of Object.values(obj)) {
        total += sumNumericValues(val, seen)
      }
      return total
    }

    // fallback
    return 0
  }

  /**
   * Filter data by keywords then compute total.
   * Returns both the filtered structure and the numeric total.
   */
  const getTotalDamage = async (
    data: any,
    keywords: string[] = ['damage', 'destroyed']
  ): Promise<{ filtered: any; total: number }> => {
    const filtered = await filterDeepByKeys(unref(data), keywords)
    const total = sumNumericValues(filtered)
    return { filtered, total }
  }

  return { getTotalDamage, sumNumericValues }
}
