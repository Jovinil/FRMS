// composables/useMapbox.ts
import { ref, watch, onMounted, onUnmounted } from "vue"

import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

export function useMapbox(mapContainer: Ref<HTMLElement | null>, geocoderContainer: Ref<HTMLElement | null>) {
  const map = ref<any>(null)
  const mapboxgl = ref<any>(null)

  const config = useRuntimeConfig()


  // --- Lifecycle ---
  onMounted(async () => {
    const mod = await import("mapbox-gl")
    mapboxgl.value = mod.default || mod
    mapboxgl.value.accessToken = config.public.mapboxToken

    const { default: MapboxGeocoder } = await import("@mapbox/mapbox-gl-geocoder")

    if (!mapContainer.value) return

    map.value = new mapboxgl.value.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/standard",
      center: [124.22636, 13.57884],
      zoom: 16.7,
      bearing: 0,
      pitch: 49,
    })

    // Add Geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: config.public.mapboxToken,
      mapboxgl: mapboxgl.value,
      marker: false,
      placeholder: "Search for an address",
    })

    if (geocoderContainer.value) {
      geocoderContainer.value.appendChild(geocoder.onAdd(map.value))
    }

    // Handle resize
    window.addEventListener("resize", () => {
      if (map.value) map.value.resize()
    })

  })

  onUnmounted(() => {
    if (map.value) map.value.remove()
    map.value = null
  })

  return {
    map
  }
}
