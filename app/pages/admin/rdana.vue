<template>
  <div class="flex flex-col h-fit items-center justify-center ">
    <div class="w-full md:w-3/4">
        
        <div class="w-full flex flex-col gap-3">
            <div class="flex justify-between gap-3">
              <UInputMenu
                v-model="rdanaSelectStore.isSelected"
                :items="rdanaSelectStore.forms"
                class="w-1/4"
              />
              <UInputMenu
                  v-model="barangayVal"
                  :items="barangays"
                  class="w-3/4"
              />  
            </div>
            
            <component :is="selectedFormComponent" />
        </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRDANASelectStore } from '~/stores/useRDANASelectStore'

// import both form components
import AdminRdanaForm from '~/components/Admin/RdanaFormRev.vue'
import AdminDanaForm from '~/components/Admin//DanaFormRev.vue'

const rdanaSelectStore = useRDANASelectStore()

// map store value -> component
const selectedFormComponent = computed(() => {
  switch (rdanaSelectStore.isSelected) {
    case 'RDANA':
      return AdminRdanaForm
   case 'DANA':
     return AdminDanaForm
    default:
      return null
  }
})

const barangayVal = ref('barangay 1');
const barangays = ref([ 'barangay 1', 'barangay 2', 'barangay 3',]);
</script>
