// composables/useMapbox.ts
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import * as turf from '@turf/turf'

type EvacCenter = {
  id: number | string
  name: string
  latitude: number
  longitude: number
  capacity?: number
}

export function useMapbox(
  mapContainer: Ref<HTMLElement | null>,
  geocoderContainer: Ref<HTMLElement | null>
) {
  const map = ref<any>(null)
  const mapboxgl = ref<any>(null)
  const isLoading = ref(false)

  const boundaryPolygon = ref<any>(null)
  const boundaryLoaded = ref(false)

  const floodRiskLevels = [
    { min: -5, max: 5, color: '#8B0000', risk: 'Critical', label: '0–5m: Critical Flood Risk', priority: 1 },
    { min: 5, max: 10, color: '#DC143C', risk: 'Very High', label: '5–10m: Very High Flood Risk', priority: 2 },
    { min: 10, max: 20, color: '#FF6347', risk: 'High', label: '10–20m: High Flood Risk', priority: 3 },
    { min: 20, max: 30, color: '#FFA500', risk: 'Moderate', label: '20–30m: Moderate Flood Risk', priority: 4 },
    { min: 30, max: 50, color: '#FFD700', risk: 'Low', label: '30–50m: Low Flood Risk', priority: 5 },
    { min: 50, max: 10000, color: '#90EE90', risk: 'Minimal', label: '50m+: Minimal Flood Risk', priority: 6 },
  ]

  const evacCenters = ref<EvacCenter[]>([])

  const config = useRuntimeConfig()

  // Your Mapbox dataset/tileset ID (from runtime config)
  const boundaryTileset = config.public.mapboxBoundaryTileset
  const BOUNDARY_SOURCE_LAYER = 'Virac_boundary'

  onMounted(async () => {
    const mod = await import('mapbox-gl')
    mapboxgl.value = mod.default || mod

    mapboxgl.value.accessToken = config.public.mapboxToken

    const { default: MapboxGeocoder } = await import('@mapbox/mapbox-gl-geocoder')

    if (!mapContainer.value) return

    // ✅ Use your Studio style, fallback to standard if missing
    const styleUrl =
      (config.public as any).mapboxStyleUrl || 'mapbox://styles/mapbox/streets-v12'

    console.log('Using Mapbox style:', styleUrl) // <- helpful debug

    map.value = new mapboxgl.value.Map({
      container: mapContainer.value,
      style: styleUrl,              // ✅ actually use your custom style
      center: [124.22636, 13.57884],
      zoom: 16.7,
      minZoom: 8,
      maxZoom: 22,                  // ✅ Mapbox max zoom on web
      bearing: 0,
      pitch: 0,                     // set back to 49 if you want tilt
    })

    const geocoder = new MapboxGeocoder({
      accessToken: config.public.mapboxToken,
      mapboxgl: mapboxgl.value,
      marker: false,
      placeholder: 'Search for an address',
    })

    // Optional: keep your boundary check or just fly to result
    geocoder.on('result', (e: any) => {
      const [lng, lat] = e.result.center
      if (!isWithinBoundary(lng, lat)) {
        new mapboxgl.value.Popup()
          .setLngLat([lng, lat])
          .setHTML(`<div style="padding: 10px; max-width: 180px;">Location is outside the boundary.</div>`)
          .addTo(map.value)
        return
      }

      map.value.flyTo({ center: [lng, lat], zoom: 17 })
    })

    if (geocoderContainer.value) {
      geocoderContainer.value.appendChild(geocoder.onAdd(map.value))
    }

    map.value.on('load', () => {
      addBoundaryLayer()
      addEvacCentersLayer()
    })

    window.addEventListener('resize', () => {
      if (map.value) map.value.resize()
    })
  })

  const addBoundaryLayer = () => {
    if (!map.value) return

    if (!map.value.getSource('boundary')) {
      map.value.addSource('boundary', {
        type: 'vector',
        url: boundaryTileset,
      })
    }

    // if (!map.value.getLayer('boundary-fill')) {
    //   map.value.addLayer({
    //     id: 'boundary-fill',
    //     type: 'fill',
    //     source: 'boundary',
    //     'source-layer': BOUNDARY_SOURCE_LAYER,
    //     paint: {
    //       'fill-color': 'rgba(37, 99, 235, 0.12)',
    //       'fill-outline-color': '#2563eb',
    //     },
    //   })
    // }

    // if (!map.value.getLayer('boundary-line')) {
    //   map.value.addLayer({
    //     id: 'boundary-line',
    //     type: 'line',
    //     source: 'boundary',
    //     'source-layer': BOUNDARY_SOURCE_LAYER,
    //     paint: {
    //       'line-color': '#2563eb',
    //       'line-width': 2.5,
    //     },
    //   })
    // }

    // After tiles are loaded, capture polygon + limit view
    map.value.once('idle', () => {
      const features =
        map.value?.querySourceFeatures('boundary', {
          sourceLayer: BOUNDARY_SOURCE_LAYER,
        }) ?? []

      const match = features.find(
        (f: any) =>
          f?.geometry?.type === 'Polygon' || f?.geometry?.type === 'MultiPolygon'
      )

      if (match) {
        const feature = match.toJSON
          ? match.toJSON()
          : {
              type: 'Feature',
              properties: match.properties ?? {},
              geometry: match.geometry,
            }

        boundaryPolygon.value = feature
        boundaryLoaded.value = true

        // applyBoundaryBounds()
      }
    })
  }

  const applyBoundaryBounds = () => {
    if (!map.value || !boundaryPolygon.value) return

    const polygonFeature =
      boundaryPolygon.value.type === 'Feature'
        ? boundaryPolygon.value
        : { type: 'Feature', properties: {}, geometry: boundaryPolygon.value }

    try {
      const bbox = turf.bbox(polygonFeature) as [number, number, number, number]
      const margin = 0.01 // small buffer around the polygon

      const boundsWithMargin: [[number, number], [number, number]] = [
        [bbox[0] - margin, bbox[1] - margin],
        [bbox[2] + margin, bbox[3] + margin],
      ]

      // 🔒 Constrain panning
      map.value.setMaxBounds(boundsWithMargin)

      // 🔍 Fit to boundary once at start
      map.value.fitBounds(boundsWithMargin, {
        padding: 40,
        maxZoom: 18, // just for the initial fit
      })
    } catch (err) {
      console.warn('Could not set max bounds from boundary', err)
    }
  }

  const isWithinBoundary = (lng: number, lat: number) => {
    if (!boundaryPolygon.value) return false
    return turf.booleanPointInPolygon([lng, lat], boundaryPolygon.value as any)
  }

  // ---------- Evac centers: dots/pins ----------

  const buildEvacCentersGeoJSON = () => ({
    type: 'FeatureCollection',
    features: evacCenters.value.map((e) => ({
      type: 'Feature',
      properties: {
        id: e.id,
        name: e.name,
        capacity: e.capacity ?? null,
      },
      geometry: {
        type: 'Point',
        coordinates: [e.longitude, e.latitude],
      },
    })),
  })

  const addEvacCentersLayer = () => {
    if (!map.value) return

    if (!map.value.getSource('evac-centers')) {
      map.value.addSource('evac-centers', {
        type: 'geojson',
        data: buildEvacCentersGeoJSON(),
      })
    }

    if (!map.value.getLayer('evac-centers-layer')) {
      map.value.addLayer({
        id: 'evac-centers-layer',
        type: 'circle',
        source: 'evac-centers',
        paint: {
          'circle-radius': 6,
          'circle-color': '#ef4444', // red dot
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      })
    }

    // Popup on click
    map.value.on('click', 'evac-centers-layer', (e: any) => {
      const feature = e.features?.[0]
      if (!feature) return

      const [lng, lat] = feature.geometry.coordinates
      const { name, capacity } = feature.properties || {}

      new mapboxgl.value.Popup()
        .setLngLat([lng, lat])
        .setHTML(`
          <div style="padding: 8px;">
            <strong>${name || 'Evacuation Center'}</strong><br/>
            ${capacity ? `Capacity: ${capacity} people` : ''}
          </div>
        `)
        .addTo(map.value)
    })

    map.value.on('mouseenter', 'evac-centers-layer', () => {
      map.value!.getCanvas().style.cursor = 'pointer'
    })
    map.value.on('mouseleave', 'evac-centers-layer', () => {
      map.value!.getCanvas().style.cursor = ''
    })
  }

  const refreshEvacCentersOnMap = () => {
    if (!map.value) return
    const source = map.value.getSource('evac-centers') as any
    if (source && source.setData) {
      source.setData(buildEvacCentersGeoJSON())
    }
  }

  const setEvacCenters = (centers: EvacCenter[]) => {
    evacCenters.value = centers
    refreshEvacCentersOnMap()
  }

  onUnmounted(() => {
    if (map.value) map.value.remove()
    map.value = null
  })

  return {
    map,
    mapboxgl,
    isLoading,
    boundaryLoaded,
    boundaryPolygon,
    isWithinBoundary,
    setEvacCenters,
    floodRiskLevels, // for your expandable legend
  }
}
