<template>
  <div class="flex flex-col h-screen max-h-screen overflow-hidden relative">
    <LayoutComponentsTopbar />
    <div class="flex flex-1 overflow-hidden">
        <!-- sidebar -->
        <LayoutComponentsSidebar />
        <main class="flex-1 flex overflow-y-auto">
          <div class="flex flex-1 flex-col gap-8 p-6">
            <slot />
          </div>
        </main>
    </div>

  </div>
</template>