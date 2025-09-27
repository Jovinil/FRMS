<template>
  <div class="flex flex-col h-screen max-h-screen overflow-hidden relative">
    <LayoutComponentsTopbar />
    <div class="flex flex-1 overflow-hidden">
        <!-- sidebar -->
        <LayoutComponentsSidebar />
        <main class="flex-1 flex overflow-y-auto">
          <div :class="{ 
              'flex flex-1 flex-col gap-8': true,
              'p-6': route.path !== '/mdrrmo/map',
              'p-0': route.path === '/mdrrmo/map' 
            }">
            <slot />
          </div>
        </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'; // You may only need: const route = useRoute();

const route = useRoute();
</script>