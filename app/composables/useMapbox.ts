// composables/useMapbox.ts
import { ref, onMounted, onUnmounted } from "vue"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

export function useMapbox(mapContainer: Ref<HTMLElement | null>, geocoderContainer: Ref<HTMLElement | null>) {
  const map = ref<any>(null)
  const mapboxgl = ref<any>(null)
  const showElevation = ref(true)
  const isLoading = ref(false)
  const queriedLocations = ref<any[]>([])
  const boundaryPolygon = ref<any>(null)
  const boundaryLoaded = ref(false)

  const config = useRuntimeConfig()

  // Your Mapbox dataset/tileset ID (update this with your actual tileset ID)
  const BOUNDARY_TILESET_ID = 'mapbox://jovinil.cmgj317xk0i7m1no1ti39s5el-20dwi' // e.g., 'mapbox://username.abc123'
  const BOUNDARY_SOURCE_LAYER = 'Virac_boundary' // The layer name in your tileset

  // Flood risk categories based on elevation
  const floodRiskLevels = [
    { min: -5, max: 5, color: '#8B0000', risk: 'Critical', label: '0-5m: Critical Flood Risk', priority: 1 },
    { min: 5, max: 10, color: '#DC143C', risk: 'Very High', label: '5-10m: Very High Risk', priority: 2 },
    { min: 10, max: 20, color: '#FF6347', risk: 'High', label: '10-20m: High Risk', priority: 3 },
    { min: 20, max: 30, color: '#FFA500', risk: 'Moderate', label: '20-30m: Moderate Risk', priority: 4 },
    { min: 30, max: 50, color: '#FFD700', risk: 'Low', label: '30-50m: Low Risk', priority: 5 },
    { min: 50, max: 10000, color: '#90EE90', risk: 'Minimal', label: '50m+: Minimal Risk', priority: 6 }
  ]

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

    // Handle geocoder results
    geocoder.on('result', async (e: any) => {
      const { center, place_name } = e.result
      const [lng, lat] = center
      
      await showElevationInfo(lng, lat, place_name)
    })

    if (geocoderContainer.value) {
      geocoderContainer.value.appendChild(geocoder.onAdd(map.value))
    }

    // Wait for map to load
    map.value.on('load', () => {
      addStaticFloodRiskVisualization()
      enableElevationQuery()
    })

    // Handle resize
    window.addEventListener("resize", () => {
      if (map.value) map.value.resize()
    })
  })

  const addStaticFloodRiskVisualization = () => {
    if (!map.value) return

    // Add terrain source for DEM data
    map.value.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14
    })

    // Set terrain for 3D visualization
    map.value.setTerrain({ 
      source: 'mapbox-dem', 
      exaggeration: 2.5 
    })

    // Add sky layer for better 3D effect
    map.value.addLayer({
      id: 'sky',
      type: 'sky',
      paint: {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
      }
    })

    // Add hillshade layer with flood risk coloring
    map.value.addLayer({
      id: 'flood-risk-hillshade',
      type: 'hillshade',
      source: 'mapbox-dem',
      layout: { visibility: 'visible' },
      paint: {
        'hillshade-exaggeration': 0.8,
        'hillshade-shadow-color': '#8B0000',
        'hillshade-highlight-color': '#90EE90',
        'hillshade-accent-color': '#4A90E2'
      }
    })

    // Add color-coded contour lines for flood risk zones
    map.value.addLayer({
      id: 'flood-risk-contours',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
      },
      'source-layer': 'contour',
      layout: { visibility: 'visible' },
      paint: {
        'line-color': [
          'step',
          ['get', 'ele'],
          '#8B0000',    // 0-5m: Critical
          5, '#DC143C',  // 5-10m: Very High
          10, '#FF6347', // 10-20m: High
          20, '#FFA500', // 20-30m: Moderate
          30, '#FFD700', // 30-50m: Low
          50, '#90EE90'  // 50m+: Minimal
        ],
        'line-width': [
          'case',
          ['==', ['%', ['get', 'ele'], 10], 0],
          2.5,  // Bold lines every 10m
          1.5   // Regular lines
        ],
        'line-opacity': 0.8
      }
    })

    // Add elevation labels on major contours
    map.value.addLayer({
      id: 'contour-labels',
      type: 'symbol',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
      },
      'source-layer': 'contour',
      layout: {
        'symbol-placement': 'line',
        'text-field': ['concat', ['get', 'ele'], 'm'],
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11,
        visibility: 'visible'
      },
      paint: {
        'text-color': [
          'step',
          ['get', 'ele'],
          '#FFFFFF',    // White text for dark backgrounds (low elevation)
          20, '#000000'  // Black text for lighter backgrounds (high elevation)
        ],
        'text-halo-color': [
          'step',
          ['get', 'ele'],
          '#000000',    // Dark halo for low elevations
          20, '#FFFFFF'  // Light halo for high elevations
        ],
        'text-halo-width': 1.5
      },
      filter: ['==', ['%', ['get', 'ele'], 10], 0] // Show labels every 10m
    })

    console.log('Static flood risk visualization added')
  }

  // Get elevation at a point using API
  const getElevationAtPoint = async (lng: number, lat: number) => {
    try {
      isLoading.value = true
      
      // Try Mapbox Tilequery API first
      const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token=${config.public.mapboxToken}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      let elevation = 0
      
      if (data.features && data.features.length > 0) {
        const elevations = data.features.map((f: any) => f.properties.ele)
        // elevation = Math.round(elevations.reduce((a: number, b: number) => a + b, 0) / elevations.length)
        elevation = elevations.length;
        console.log(elevation);
      } else {
        // Fallback to Open-Elevation API
        const openElevUrl = `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
        const openElevResponse = await fetch(openElevUrl)
        const openElevData = await openElevResponse.json()
        
        if (openElevData.results && openElevData.results.length > 0) {
          elevation = Math.round(openElevData.results[0].elevation)
        }
      }
      
      return elevation
    } catch (error) {
      console.error('Error fetching elevation:', error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Categorize elevation into flood risk
  const categorizeFloodRisk = (elevation: number) => {
    const finalRiskLevel = floodRiskLevels.find(level => 
      elevation >= level.min && elevation < level.max
    ) || floodRiskLevels[floodRiskLevels.length - 1]
    
    return {
      elevation,
      risk: finalRiskLevel?.risk ?? 'Unknown',
      category: finalRiskLevel?.label ?? 'Unknown',
      color: finalRiskLevel?.color ?? '#CCCCCC',
      priority: finalRiskLevel?.priority ?? 0
    }
  }

  // Show elevation info popup
  const showElevationInfo = async (lng: number, lat: number, addressName: string = 'Selected Location') => {
    if (!map.value || !mapboxgl.value) return

    const elevation = await getElevationAtPoint(lng, lat)
    
    if (elevation === null) {
      new mapboxgl.value.Popup()
        .setLngLat([lng, lat])
        .setHTML(`
          <div style="padding: 12px;">
            <p style="color: red;">Unable to fetch elevation data</p>
          </div>
        `)
        .addTo(map.value)
      return
    }

    const riskData = categorizeFloodRisk(elevation)
    
    // Save queried location
    queriedLocations.value.push({
      lng,
      lat,
      name: addressName,
      elevation: riskData.elevation,
      risk: riskData.risk,
      category: riskData.category,
      color: riskData.color,
      priority: riskData.priority,
      timestamp: new Date().toISOString()
    })
    
    // Add temporary marker
    const marker = new mapboxgl.value.Marker({ color: riskData.color })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.value.Popup().setHTML(`
          <div style="padding: 12px; min-width: 250px;">
            <strong style="font-size: 14px;">${addressName}</strong>
            <hr style="margin: 8px 0; border: none; border-top: 1px solid #ddd;"/>
            
            <div style="margin: 10px 0;">
              <div style="display: flex; justify-content: space-between; margin: 6px 0;">
                <span><strong>Elevation:</strong></span>
                <span>${riskData.elevation}m</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 6px 0;">
                <span><strong>Flood Risk:</strong></span>
                <span style="color: ${riskData.color}; font-weight: bold;">${riskData.risk}</span>
              </div>
              <div style="display: flex; justify-between; margin: 6px 0;">
                <span><strong>Priority:</strong></span>
                <span style="font-weight: bold;">Level ${riskData.priority}</span>
              </div>
            </div>
            
            <div style="background: ${riskData.color}; padding: 10px; border-radius: 6px; margin-top: 10px; color: white; text-align: center; font-weight: bold; font-size: 12px;">
              ${riskData.category}
            </div>
            
            ${riskData.priority <= 3 ? `
              <div style="background: #FFF3CD; padding: 8px; border-radius: 4px; margin-top: 8px; border-left: 4px solid #FFA500; font-size: 11px; color: #856404;">
                ⚠️ <strong>High Priority Area:</strong> Elevated flood risk. Consider priority evacuation planning.
              </div>
            ` : ''}
          </div>
        `)
      )
      .addTo(map.value)
      .togglePopup()

    return { marker, riskData }
  }

  // Enable clicking on map to query elevation
  const enableElevationQuery = () => {
    if (!map.value) return

    map.value.on('click', async (e: any) => {
      const { lng, lat } = e.lngLat
      
      // Reverse geocode to get address
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
      let addressName = 'Selected Location'
      
      try {
        const geocodeResponse = await fetch(geocodeUrl)
        const geocodeData = await geocodeResponse.json()
        if (geocodeData.features && geocodeData.features.length > 0) {
          addressName = geocodeData.features[0].place_name
        }
      } catch (err) {
        console.log('Could not reverse geocode')
      }
      
      await showElevationInfo(lng, lat, addressName)
    })

    map.value.getCanvas().style.cursor = 'crosshair'
  }

  const toggleFloodRiskView = (enabled: boolean) => {
    if (!map.value) return
    
    showElevation.value = enabled
    const visibility = enabled ? 'visible' : 'none'
    
    if (map.value.getLayer('flood-risk-hillshade')) {
      map.value.setLayoutProperty('flood-risk-hillshade', 'visibility', visibility)
    }
    if (map.value.getLayer('flood-risk-contours')) {
      map.value.setLayoutProperty('flood-risk-contours', 'visibility', visibility)
    }
    if (map.value.getLayer('contour-labels')) {
      map.value.setLayoutProperty('contour-labels', 'visibility', visibility)
    }

    // Toggle 3D terrain
    if (enabled) {
      map.value.setTerrain({ source: 'mapbox-dem', exaggeration: 2.5 })
    } else {
      map.value.setTerrain(null)
    }
  }

  // Export all queried locations
  const exportQueriedData = () => {
    return JSON.stringify({
      exportDate: new Date().toISOString(),
      totalLocations: queriedLocations.value.length,
      locations: queriedLocations.value
    }, null, 2)
  }

  // Get prioritized list of queried locations
  const getPrioritizedLocations = () => {
    return [...queriedLocations.value].sort((a, b) => a.priority - b.priority)
  }

  // Clear all queried locations
  const clearQueriedData = () => {
    queriedLocations.value = []
  }

  // Get statistics
  const getStatistics = () => {
    if (queriedLocations.value.length === 0) return null

    const criticalCount = queriedLocations.value.filter(l => l.priority <= 2).length
    const highRiskCount = queriedLocations.value.filter(l => l.priority === 3).length
    const moderateCount = queriedLocations.value.filter(l => l.priority === 4).length
    const lowRiskCount = queriedLocations.value.filter(l => l.priority >= 5).length

    return {
      total: queriedLocations.value.length,
      critical: criticalCount,
      highRisk: highRiskCount,
      moderate: moderateCount,
      lowRisk: lowRiskCount,
      averageElevation: Math.round(
        queriedLocations.value.reduce((sum, l) => sum + l.elevation, 0) / queriedLocations.value.length
      )
    }
  }

  onUnmounted(() => {
    if (map.value) map.value.remove()
    map.value = null
  })

  return {
    map,
    mapboxgl,
    showElevation,
    floodRiskLevels,
    isLoading,
    queriedLocations,
    boundaryLoaded,
    boundaryPolygon,
    toggleFloodRiskView,
    getElevationAtPoint,
    categorizeFloodRisk,
    showElevationInfo,
    exportQueriedData,
    getPrioritizedLocations,
    clearQueriedData,
    getStatistics
  }
}