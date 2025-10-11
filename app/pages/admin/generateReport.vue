<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-3">   
    <UInputMenu v-model="value" :items="items" class="w-1/2"/>  
    
    <AllUsersGenerateReportComponent/>
  </div>
</template>

<script setup lang="ts">
const value = ref('Barangay 1')
const items = ref([
  'Barangay 1',
  'Barangay 2',
  'Barangay 3'
])

</script>