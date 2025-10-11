<template>
  <ClientOnly>
    <div class="relative flex-1">
      <div ref="mapContainer" class="map-container w-full h-full"></div>
      <div ref="geocoderContainer" class="absolute top-2 right-2 md:px-4 md:right-0 md:top-4 z-10"></div>
      
      <!-- Loading Indicator -->
      <div
        v-if="isLoading"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-lg shadow-xl p-4"
      >
        <div class="flex items-center gap-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span class="text-gray-700 font-medium">Fetching elevation data...</span>
        </div>
      </div>

      <!-- Info Panel -->
      <div class="absolute top-4 left-4 z-20 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 class="text-lg font-bold mb-3 text-gray-800">🌊 Flood Risk Map</h3>
        
        <!-- Boundary Status -->
        <div v-if="boundaryLoaded" class="mb-3 bg-green-50 border border-green-200 rounded-md p-2">
          <div class="flex items-center gap-2 text-xs text-green-700">
            <span>✓</span>
            <span class="font-medium">Boundary area loaded</span>
          </div>
        </div>
        
        <div class="text-sm text-gray-600 mb-4 space-y-1">
          <p>• Click anywhere to check elevation</p>
          <p>• Search for specific addresses</p>
          <p>• View color-coded flood risk zones</p>
          <p v-if="boundaryLoaded" class="text-xs text-blue-600">📍 Only within blue boundary</p>
        </div>

        <!-- Statistics -->
        <div v-if="statistics" class="bg-blue-50 rounded-md p-3 mb-3 border border-blue-200">
          <h4 class="font-semibold text-blue-900 mb-2 text-sm">📊 Queried Locations</h4>
          <div class="text-xs text-gray-700 space-y-1">
            <div class="flex justify-between">
              <span>Total:</span>
              <span class="font-bold">{{ statistics.total }}</span>
            </div>
            <div class="flex justify-between">
              <span>Critical:</span>
              <span class="font-bold text-red-600">{{ statistics.critical }}</span>
            </div>
            <div class="flex justify-between">
              <span>High Risk:</span>
              <span class="font-bold text-orange-600">{{ statistics.highRisk }}</span>
            </div>
            <div class="flex justify-between">
              <span>Avg Elevation:</span>
              <span class="font-bold">{{ statistics.averageElevation }}m</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div v-if="queriedLocations.length > 0" class="space-y-2 mb-3">
          <button
            @click="handleShowPrioritized"
            class="w-full px-3 py-2 rounded-md font-medium bg-purple-500 hover:bg-purple-600 text-white transition-colors text-sm"
          >
            📋 View List ({{ queriedLocations.length }})
          </button>
          
          <button
            @click="handleExport"
            class="w-full px-3 py-2 rounded-md font-medium bg-green-500 hover:bg-green-600 text-white transition-colors text-sm"
          >
            💾 Export Data
          </button>
          
          <button
            @click="handleClear"
            class="w-full px-3 py-2 rounded-md font-medium bg-red-500 hover:bg-red-600 text-white transition-colors text-sm"
          >
            🗑️ Clear Data
          </button>
        </div>

        <!-- Toggle Elevation View -->
        <div class="pt-3 border-t border-gray-200">
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm font-medium text-gray-700">3D Elevation View</span>
            <input
              type="checkbox"
              v-model="showElevation"
              @change="handleToggleElevation"
              class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            >
          </label>
        </div>
      </div>

  <div class="absolute bottom-4 left-4 z-20">
    <div
      class="bg-white rounded-lg shadow-lg max-w-xs overflow-hidden transition-all duration-300"
    >
      <!-- Header -->
      <button
        @click="isOpen = !isOpen"
        class="w-full flex justify-between items-center px-4 py-3 bg-blue-600 text-white font-semibold text-sm"
      >
        <span> Flood Risk Legend</span>
        <svg
          :class="['w-4 h-4 transform transition-transform duration-300', { 'rotate-180': isOpen }]"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Collapsible Content -->
      <transition name="fade-slide">
        <div v-if="isOpen" class="p-4 space-y-2">
          <div
            v-for="level in floodRiskLevels"
            :key="level.priority"
            class="flex items-center gap-2 text-xs"
          >
            <div
              class="w-4 h-4 rounded-full flex-shrink-0"
              :style="{ backgroundColor: level.color }"
            ></div>
            <span class="text-gray-700">{{ level.label }}</span>
          </div>

          <div class="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
            💡 Lower elevations = Higher flood risk
          </div>
        </div>
      </transition>
    </div>
  </div>

      <!-- Instructions (Mobile Friendly) -->
      <div class="absolute bottom-4 right-4 z-20 md:hidden">
        <button
          @click="showInstructions = !showInstructions"
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          <span class="text-xl">?</span>
        </button>
      </div>

      <!-- Mobile Instructions Modal -->
      <div
        v-if="showInstructions"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:hidden"
        @click.self="showInstructions = false"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800">How to Use</h3>
            <button
              @click="showInstructions = false"
              class="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div class="space-y-3 text-sm text-gray-600">
            <div class="flex gap-3">
              <span class="text-2xl">📍</span>
              <div>
                <p class="font-semibold">Tap the Map</p>
                <p>Click anywhere to see elevation and flood risk for that location</p>
              </div>
            </div>
            
            <div class="flex gap-3">
              <span class="text-2xl">🔍</span>
              <div>
                <p class="font-semibold">Search Address</p>
                <p>Use the search box to find specific residential addresses</p>
              </div>
            </div>
            
            <div class="flex gap-3">
              <span class="text-2xl">🌈</span>
              <div>
                <p class="font-semibold">Color Zones</p>
                <p>Red = High risk (low elevation)<br>Green = Low risk (high elevation)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prioritized List Modal -->
      <div
        v-if="showPrioritizedModal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="showPrioritizedModal = false"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-gray-800">📋 Prioritized Locations</h3>
              <button
                @click="showPrioritizedModal = false"
                class="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
          
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div v-if="prioritizedList.length === 0" class="text-center text-gray-500 py-8">
              No locations queried yet
            </div>
            
            <div v-else class="space-y-3">
              <div
                v-for="(location, index) in prioritizedList"
                :key="index"
                class="border rounded-lg p-4 hover:shadow-md transition-shadow"
                :style="{ borderLeftWidth: '4px', borderLeftColor: location.color }"
              >
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-semibold text-gray-800 flex-1 pr-2">{{ location.name }}</h4>
                  <span
                    class="px-2 py-1 rounded text-xs font-bold text-white flex-shrink-0"
                    :style="{ backgroundColor: location.color }"
                  >
                    Priority {{ location.priority }}
                  </span>
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span class="font-medium">Elevation:</span> {{ location.elevation }}m
                  </div>
                  <div>
                    <span class="font-medium">Risk:</span>
                    <span :style="{ color: location.color }" class="font-bold ml-1">{{ location.risk }}</span>
                  </div>
                  <div class="col-span-2">
                    <span class="font-medium">Coordinates:</span>
                    <span class="text-xs"> {{ location.lat.toFixed(5) }}, {{ location.lng.toFixed(5) }}</span>
                  </div>
                </div>
                
                <div class="mt-2 text-xs text-gray-500">
                  {{ location.category }}
                </div>
                
                <div class="mt-2 text-xs text-gray-400">
                  Queried: {{ new Date(location.timestamp).toLocaleString() }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useMapbox } from "~/composables/useMapbox"

const mapContainer = ref<HTMLElement | null>(null)
const geocoderContainer = ref<HTMLElement | null>(null)
const showInstructions = ref(false)
const showPrioritizedModal = ref(false)
const prioritizedList = ref<any[]>([])

const isOpen = ref(true)
// Add boundaryLoaded as a reactive variable

const {
  map,
  showElevation,
  floodRiskLevels,
  isLoading,
  queriedLocations,
  boundaryLoaded,
  toggleFloodRiskView,
  exportQueriedData,
  getPrioritizedLocations,
  clearQueriedData,
  getStatistics
} = useMapbox(mapContainer, geocoderContainer)

const statistics = computed(() => getStatistics())

const handleToggleElevation = () => {
  toggleFloodRiskView(showElevation.value)
}

const handleShowPrioritized = () => {
  prioritizedList.value = getPrioritizedLocations()
  showPrioritizedModal.value = true
}

const handleExport = () => {
  const jsonData = exportQueriedData()
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `flood-risk-queries-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const handleClear = () => {
  if (confirm('Clear all queried location data? This cannot be undone.')) {
    clearQueriedData()
  }
}
</script>

<style scoped>
.map-container {
  min-height: 400px;
}

@media (max-width: 768px) {
  .map-container {
    min-height: 300px;
  }
}
</style>