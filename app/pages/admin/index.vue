<template>
  <div class="flex flex-col gap-5 p-6">
    <UCard :ui="{ body: '!p-0' }">
      <template #header>
        User Login
      </template>

      <AdminUserLoginTable />
    </UCard>

    <UCard>
      <template #header>
        Report
      </template>
      
      <AdminReportsTable />
    </UCard>

  </div>
   
</template>