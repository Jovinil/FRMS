<template>
  <div class="flex flex-col h-fit items-center justify-center ">
    <div class="w-full md:w-3/4">
        
        <div class="w-full flex flex-col gap-3">
            <UInputMenu
                v-model="rdanaSelectStore.isSelected"
                :items="rdanaSelectStore.forms"
            />
   
                <component :is="selectedFormComponent" />
        </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRDANASelectStore } from '~/stores/useRDANASelectStore'

// import both form components
import AdminComponentsRdanaForm from '~/components/AdminComponents/RdanaForm.vue'
import AdminComponentsDanaForm from '~/components/AdminComponents//DanaForm.vue'

const rdanaSelectStore = useRDANASelectStore()

// map store value -> component
const selectedFormComponent = computed(() => {
  switch (rdanaSelectStore.isSelected) {
    case 'RDANA':
      return AdminComponentsRdanaForm
   case 'DANA':
     return AdminComponentsDanaForm
    default:
      return null
  }
})
</script>
