<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMapbox } from '~/composables/useMapbox'

const mapContainer = ref<HTMLElement | null>(null)
const geocoderContainer = ref<HTMLElement | null>(null)
const showLegend = ref(false)

const {
  setEvacCenters,
  floodRiskLevels,
} = useMapbox(mapContainer, geocoderContainer)

// Example evac center data; replace with your API/Prisma data
onMounted(async () => {
  const res = await $fetch('/api/evacuation-centers')
  console.log(res.evacuationCenters)
  setEvacCenters(res.evacuationCenters)
})

</script>

<template>
  <div class="relative w-full h-full">
    <!-- Map -->
    <div ref="mapContainer" class="w-full h-full" />
    <div ref="geocoderContainer" class="absolute top-4 left-4 z-20" />

    <!-- 🔽 Expandable Flood Hazard Legend -->
    <div class="absolute bottom-4 left-4 z-20 space-y-2">
      <!-- Toggle button -->
      <UButton
        size="sm"
        color="primary"
        variant="solid"
        class="shadow-md"
        @click="showLegend = !showLegend"
      >
        <UIcon
          :name="showLegend ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'"
          class="mr-2"
        />
        Flood Hazard Legend
      </UButton>

      <!-- Legend card -->
      <Transition name="fade">
        <UCard
          v-if="showLegend"
          class="w-72 shadow-lg bg-white/95 backdrop-blur border border-gray-200"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-dark">Flood Hazard by Elevation</span>
              <UButton
                icon="i-lucide-x"
                size="xs"
                color="neutral"
                variant="ghost"
                @click="showLegend = false"
              />
            </div>
          </template>

          <div class="space-y-2">
            <div
              v-for="level in floodRiskLevels"
              :key="level.priority"
              class="flex items-center justify-between gap-2"
            >
              <div class="flex items-center gap-2">
                <span
                  class="inline-block w-4 h-4 rounded-full border border-gray-300"
                  :style="{ backgroundColor: level.color }"
                />
                <span class="text-xs font-medium text-dark">
                  {{ level.risk }}
                </span>
              </div>
              <span class="text-[11px] text-gray-500">
                {{ level.label }}
              </span>
            </div>
          </div>

          <template #footer>
            <p class="text-[11px] text-gray-500 leading-snug">
              Legend describes <strong>relative flood hazard based on elevation</strong>.
              Lower elevations (darker colors) are generally more flood-prone.
            </p>
          </template>
        </UCard>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
