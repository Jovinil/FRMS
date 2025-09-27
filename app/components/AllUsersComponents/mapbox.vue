<template>
  <ClientOnly>

    <div class="relative flex-1">
      <div ref="mapContainer"  class="map-container w-full h-full"></div>
      <div ref="geocoderContainer" class="absolute top-2 right-2 md:px-4 md:right-0 md:top-4 w-6/7 md:w-120  z-10"></div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue"
// import { useMapbox } from "~/app/composables/useMapbox"

const mapContainer = ref<HTMLElement | null>(null)
const geocoderContainer = ref<HTMLElement | null>(null)

useMapbox(mapContainer, geocoderContainer)
</script>
