<template>
  <div class="flex flex-col h-screen">
    <!-- Fixed Header -->
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-lg font-bold">Flood Risk Mapping</h1>
    </header>

    <div class="flex flex-1">
      <!-- Fixed Sidebar -->
      <aside class="w-64 bg-gray-200 p-4">
        <ul class="space-y-2">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </aside>

      <!-- Scrollable Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="space-y-6">
          <section
            v-for="i in 30"
            :key="i"
            class="p-4 bg-white rounded shadow"
          >
            <h2 class="text-xl font-semibold">Section {{ i }}</h2>
            <p>
              This is scrollable content inside the main container. The header
              and sidebar remain fixed while only this section scrolls.
            </p>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
