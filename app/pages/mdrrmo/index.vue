<template>
  <div class="flex flex-col gap-5">
    <UCard :ui="{ body: '!p-0' }">
      <template #header>
        User Login
      </template>

      <AdminComponentsUserLoginTable />
    </UCard>

    <UCard>
      <template #header>
        Report
      </template>
      
      no idea what to put here
    </UCard>

  </div>
   
</template>