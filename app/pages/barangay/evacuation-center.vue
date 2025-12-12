<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css' // ✅ make markers + controls visible

type EvacCenterForm = {
  name: string
  capacity: number | null
  latitude: number | null
  longitude: number | null
}

// ✅ Runtime config with proper typing for Mapbox token
const rawConfig = useRuntimeConfig() as {
  public: {
    mapboxAccessToken?: string
  }
}

if (typeof rawConfig.public.mapboxAccessToken === 'string') {
  mapboxgl.accessToken = rawConfig.public.mapboxAccessToken
} else {
  console.warn('Mapbox access token is missing. Set NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN in .env.')
}

const mapContainer = ref<HTMLElement | null>(null)
const map = ref<MapboxMap | null>(null)

// 🔧 Use `any` here to avoid the “Type instantiation is excessively deep” TS error
const marker = ref<any | null>(null)

const loading = ref(false)
const form = ref<EvacCenterForm>({
  name: '',
  capacity: null,
  latitude: null,
  longitude: null
})

/**
 * 🔷 YOUR POLYGON HERE
 * Replace POLYGON_COORDS with the coordinates of your actual polygon.
 * Format: [lng, lat]
 */
const POLYGON_COORDS: [number, number][] = [

        [
          124.141822,
          13.669901
        ],
        [
          124.195076,
          13.659432
        ],
        [
          124.198696,
          13.621768
        ],
        [
          124.261899,
          13.593889
        ],
        [
          124.260948,
          13.593638
        ],
        [
          124.25976,
          13.593408
        ],
        [
          124.256568,
          13.593396
        ],
        [124.255093, 13.5929],
        [
          124.253548,
          13.592292
        ],
        [
          124.252696,
          13.591825
        ],
        [
          124.252061,
          13.591626
        ],
        [
          124.251678,
          13.591554
        ],
        [
          124.249882,
          13.591255
        ],
        [
          124.247321,
          13.590479
        ],
        [
          124.24627,
          13.589883
        ],
        [
          124.245334,
          13.58942
        ],
        [
          124.243063,
          13.588247
        ],
        [
          124.240628,
          13.586513
        ],
        [
          124.240162,
          13.586081
        ],
        [
          124.239998,
          13.58579
        ],
        [
          124.239857,
          13.585293
        ],
        [
          124.239755,
          13.583778
        ],
        [
          124.239573,
          13.583124
        ],
        [
          124.239299,
          13.58231
        ],
        [
          124.239114,
          13.582033
        ],
        [
          124.23891,
          13.581912
        ],
        [
          124.238632,
          13.581803
        ],
        [
          124.238331,
          13.581745
        ],
        [
          124.238167,
          13.581747
        ],
        [
          124.237975,
          13.581835
        ],
        [
          124.237614,
          13.582098
        ],
        [
          124.237358,
          13.582275
        ],
        [
          124.236957,
          13.582486
        ],
        [
          124.236553,
          13.582632
        ],
        [
          124.236126,
          13.582651
        ],
        [
          124.235793,
          13.582635
        ],
        [
          124.235307,
          13.582592
        ],
        [
          124.235044,
          13.582554
        ],
        [
          124.234803,
          13.582456
        ],
        [
          124.234401,
          13.582027
        ],
        [
          124.234532,
          13.581909
        ],
        [
          124.234458,
          13.581835
        ],
        [
          124.234323,
          13.581956
        ],
        [
          124.234267,
          13.581902
        ],
        [
          124.235207,
          13.58101
        ],
        [
          124.235116,
          13.580913
        ],
        [
          124.234174,
          13.581807
        ],
        [
          124.234159,
          13.581787
        ],
        [
          124.23429,
          13.581665
        ],
        [
          124.234226,
          13.581586
        ],
        [
          124.234084,
          13.581716
        ],
        [
          124.233827,
          13.581456
        ],
        [
          124.234158,
          13.581132
        ],
        [
          124.233853,
          13.580824
        ],
        [
          124.234195,
          13.580474
        ],
        [
          124.234116,
          13.580382
        ],
        [
          124.233354,
          13.581158
        ],
        [
          124.232697,
          13.580894
        ],
        [
          124.232669,
          13.580835
        ],
        [
          124.232569,
          13.580748
        ],
        [
          124.232272,
          13.580275
        ],
        [
          124.231859,
          13.579177
        ],
        [
          124.231746,
          13.57898
        ],
        [
          124.231283,
          13.577896
        ],
        [
          124.230342,
          13.576448
        ],
        [
          124.229994,
          13.576044
        ],
        [
          124.229452,
          13.575651
        ],
        [
          124.228368,
          13.575408
        ],
        [
          124.228021,
          13.575164
        ],
        [
          124.227657,
          13.575218
        ],
        [
          124.227391,
          13.575259
        ],
        [
          124.227156,
          13.575204
        ],
        [
          124.22582,
          13.574118
        ],
        [
          124.225359,
          13.573795
        ],
        [
          124.224832,
          13.57323
        ],
        [
          124.224412,
          13.572661
        ],
        [
          124.224213,
          13.571883
        ],
        [
          124.224177,
          13.571455
        ],
        [
          124.224323,
          13.570162
        ],
        [
          124.224841,
          13.569076
        ],
        [
          124.225477,
          13.568141
        ],
        [
          124.225612,
          13.567615
        ],
        [
          124.225529,
          13.567204
        ],
        [
          124.225356,
          13.566936
        ],
        [
          124.225054,
          13.566564
        ],
        [
          124.224703,
          13.566235
        ],
        [
          124.224299,
          13.565943
        ],
        [
          124.223893,
          13.565794
        ],
        [
          124.221508,
          13.564715
        ],
        [
          124.22104,
          13.564423
        ],
        [
          124.220254,
          13.564124
        ],
        [
          124.218799,
          13.563969
        ],
        [
          124.21656,
          13.563703
        ],
        [
          124.215442,
          13.56338
        ],
        [
          124.21397,
          13.562784
        ],
        [
          124.212548,
          13.561779
        ],
        [
          124.210919,
          13.560052
        ],
        [
          124.210453,
          13.559457
        ],
        [
          124.210005,
          13.558812
        ],
        [
          124.20981,
          13.558202
        ],
        [
          124.209299,
          13.557062
        ],
        [
          124.208461,
          13.554124
        ],
        [
          124.208405,
          13.552779
        ],
        [
          124.207319,
          13.549787
        ],
        [
          124.206821,
          13.548517
        ],
        [
          124.206097,
          13.545572
        ],
        [
          124.205813,
          13.542694
        ],
        [
          124.207059,
          13.540617
        ],
        [
          124.208318,
          13.538088
        ],
        [
          124.209334,
          13.536882
        ],
        [
          124.210092,
          13.534823
        ],
        [
          124.21021,
          13.534256
        ],
        [
          124.21022,
          13.532928
        ],
        [
          124.211522,
          13.529398
        ],
        [
          124.212627,
          13.527205
        ],
        [
          124.212974,
          13.526018
        ],
        [
          124.214488,
          13.523836
        ],
        [
          124.214755,
          13.523079
        ],
        [
          124.214826,
          13.522394
        ],
        [
          124.214676,
          13.522022
        ],
        [
          124.214429,
          13.521686
        ],
        [
          124.214089,
          13.521502
        ],
        [
          124.21147,
          13.518018
        ],
        [
          124.208626,
          13.516663
        ],
        [
          124.20475,
          13.517984
        ],
        [
          124.198035,
          13.518883
        ],
        [
          124.194887,
          13.519007
        ],
        [
          124.191444,
          13.518977
        ],
        [
          124.187816,
          13.521197
        ],
        [
          124.186111,
          13.522133
        ],
        [
          124.184741,
          13.52324
        ],
        [
          124.184626,
          13.525402
        ],
        [
          124.180679,
          13.528268
        ],
        [
          124.178614,
          13.528603
        ],
        [
          124.177512,
          13.52782
        ],
        [
          124.177016,
          13.528375
        ],
        [
          124.17135,
          13.531069
        ],
        [
          124.171333,
          13.533096
        ],
        [
          124.171761,
          13.53382
        ],
        [
          124.166495,
          13.537551
        ],
        [
          124.165012,
          13.536585
        ],
        [
          124.163898,
          13.537818
        ],
        [
          124.163888,
          13.538337
        ],
        [
          124.164867,
          13.538602
        ],
        [
          124.161765,
          13.541659
        ],
        [
          124.160775,
          13.542154
        ],
        [
          124.159886,
          13.542646
        ],
        [
          124.157481,
          13.544351
        ],
        [
          124.157476,
          13.545315
        ],
        [
          124.158092,
          13.546671
        ],
        [
          124.158529,
          13.547192
        ],
        [
          124.157036,
          13.548354
        ],
        [
          124.156031,
          13.548443
        ],
        [
          124.15547,
          13.549117
        ],
        [
          124.155271,
          13.549917
        ],
        [
          124.148708,
          13.554977
        ],
        [
          124.153751,
          13.59399
        ],
        [
          124.15248,
          13.617587
        ],
        [
          124.145502,
          13.645439
        ],
        [
          124.143758,
          13.657953
        ],
        [
          124.143063,
          13.663207
        ],
        [
          124.142985,
          13.664774
        ],
        [
          124.141822,
          13.669901
        ]
]
// Compute bounding box from polygon coords
function getBoundsFromPolygon(coords: [number, number][]) {
  let minLng = Infinity
  let minLat = Infinity
  let maxLng = -Infinity
  let maxLat = -Infinity

  for (const [lng, lat] of coords) {
    if (lng < minLng) minLng = lng
    if (lat < minLat) minLat = lat
    if (lng > maxLng) maxLng = lng
    if (lat > maxLat) maxLat = lat
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ] as [[number, number], [number, number]]
}

const TILESET_BOUNDS = getBoundsFromPolygon(POLYGON_COORDS)

// Add a small margin around the polygon
const marginDeg = 0.002
const BOUNDS_WITH_MARGIN: [[number, number], [number, number]] = [
  [
    TILESET_BOUNDS[0][0] - marginDeg,
    TILESET_BOUNDS[0][1] - marginDeg
  ],
  [
    TILESET_BOUNDS[1][0] + marginDeg,
    TILESET_BOUNDS[1][1] + marginDeg
  ]
]

// Center = midpoint of polygon bounds
const defaultCenter: [number, number] = [
  (TILESET_BOUNDS[0][0] + TILESET_BOUNDS[1][0]) / 2,
  (TILESET_BOUNDS[0][1] + TILESET_BOUNDS[1][1]) / 2
]

onMounted(() => {
  if (!mapContainer.value) return

  const instance = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: defaultCenter,
    zoom: 13
  })

  map.value = instance

  instance.on('load', () => {
    // 🔒 Restrict panning to polygon bounds + margin
    instance.setMaxBounds(BOUNDS_WITH_MARGIN)

    // 🔍 Fit viewport to polygon area with padding
    instance.fitBounds(BOUNDS_WITH_MARGIN, {
      padding: 40
    })

    // Disable default double-click zoom
    instance.doubleClickZoom.disable()

    // 🔥 Double-click to drop/move pin + update lat/lng
    instance.on('dblclick', (e) => {
      const lngLat = e.lngLat

      if (!marker.value) {
        marker.value = new mapboxgl.Marker({
          draggable: true,
          color: '#e11d48' // nice visible pink-red
        })
          .setLngLat(lngLat)
          .addTo(instance)

        // Use `any` here to dodge the deep TS types
        ;(marker.value as any).on('dragend', () => {
          const newPos = marker.value!.getLngLat()
          form.value.latitude = newPos.lat
          form.value.longitude = newPos.lng
        })
      } else {
        marker.value.setLngLat(lngLat)
      }

      form.value.latitude = lngLat.lat
      form.value.longitude = lngLat.lng
    })
  })
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})

const handleSubmit = async () => {
  if (!form.value.name || !form.value.capacity || !form.value.latitude || !form.value.longitude) {
    alert('Please fill in all fields and double-click on the map to set coordinates.')
    return
  }

  try {
    loading.value = true

    const res = await $fetch('/api/evacuation-centers', {
      method: 'POST',
      body: {
        name: form.value.name,
        capacity: form.value.capacity,
        latitude: form.value.latitude,
        longitude: form.value.longitude
      }
    })

    console.log('Evacuation center payload:', form.value)
    alert('Evacuation center saved.')
  } catch (e) {
    console.error(e)
    alert('Failed to save evacuation center.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Add Evacuation Center"
      description="Create a new evacuation center and set its location by double-clicking on the map."
    />

    <UPageBody>
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)]">
        <!-- Left: Form -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">
              Evacuation Center Details
            </h2>
          </template>

          <UForm :state="form" @submit="handleSubmit" class="space-y-4">
            <div class="flex justify-between">
              <UFormGroup label="Evacuation Center Name" name="name" required>
                <UInput
                  v-model="form.name"
                  placeholder="e.g. Barangay Hall Evacuation Center"
                />
              </UFormGroup>

              <UFormGroup label="Capacity (people)" name="capacity" required>
                <UInput
                  v-model.number="form.capacity"
                  type="number"
                  min="1"
                  placeholder="e.g. 250"
                />
              </UFormGroup>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup label="Latitude" name="latitude" required>
                <UInput
                  v-model="form.latitude"
                  type="number"
                  step="0.000001"
                  placeholder="Double-click on the map"
                  readonly
                />
              </UFormGroup>

              <UFormGroup label="Longitude" name="longitude" required>
                <UInput
                  v-model="form.longitude"
                  type="number"
                  step="0.000001"
                  placeholder="Double-click on the map"
                  readonly
                />
              </UFormGroup>
            </div>

            <p class="text-xs text-gray-500">
              Double-click on the map to drop a pin. The latitude and longitude will be set automatically.
              You can drag the pin to fine-tune the location.
            </p>

            <div class="flex justify-end gap-2 pt-2">
              <UButton type="submit" :loading="loading">
                Save Evacuation Center
              </UButton>
            </div>
          </UForm>
        </UCard>

        <!-- Right: Map -->
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">
              Map Location
            </h2>
          </template>

          <div
            ref="mapContainer"
            class="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200"
          >
            <!-- Mapbox mounts here -->
          </div>

          <template #footer>
            <p class="text-xs text-gray-500">
              Map is limited to your polygon area with a small margin so it’s easier to scroll.
              Double-click anywhere inside to place the evacuation center pin.
            </p>
          </template>
        </UCard>
      </div>
    </UPageBody>
  </UPage>
</template>
