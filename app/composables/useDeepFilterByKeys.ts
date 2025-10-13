import { unref } from 'vue'

/**
 * Recursively filters an object or array by key names
 * that contain one or more given keywords.
 *
 * - Handles nested objects and arrays
 * - Skips null and undefined values safely
 * - Vue/Nuxt composable (can accept refs/reactives)
 */
export function useDeepFilterByKeys() {
  const filterDeepByKeys = async (
    source: any,
    keywords: string[]
  ): Promise<Record<string, any> | any[]> => {
    const obj = unref(source)

    // 🔹 Handle primitives and nulls
    if (obj === null || obj === undefined) return {}
    if (typeof obj !== 'object') return obj

    // 🔹 Handle arrays
    if (Array.isArray(obj)) {
      const filteredArray = []
      for (const item of obj) {
        const filteredItem = await filterDeepByKeys(item, keywords)
        if (
          filteredItem &&
          typeof filteredItem === 'object' &&
          Object.keys(filteredItem).length > 0
        ) {
          filteredArray.push(filteredItem)
        }
      }
      return filteredArray
    }

    // 🔹 Handle plain objects
    const result: Record<string, any> = {}

    for (const [key, value] of Object.entries(obj)) {
      const keyMatches = keywords.some(word =>
        key.toLowerCase().includes(word.toLowerCase())
      )

      if (keyMatches) {
        result[key] = value
      } else if (value !== null && typeof value === 'object') {
        const nested = await filterDeepByKeys(value, keywords)
        if (
          nested &&
          typeof nested === 'object' &&
          Object.keys(nested).length > 0
        ) {
          result[key] = nested
        }
      }
    }

    return result
  }

  return { filterDeepByKeys }
}
