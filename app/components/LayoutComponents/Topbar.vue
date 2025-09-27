<template>
    <div class="flex h-24 justify-between items-center py-2 px-12 md:px-24 bg-primary">
        <img src="/images/logo.png" alt="FRMS Logo" class="h-15" />

        <nav class="flex items-center gap-2">
            <UInput icon="i-lucide-search" size="md" variant="outline" placeholder="Search..." />
            <UChip :text="2" size="md">
                <UButton icon="i-lucide-bell" color="neutral" variant="ghost" />
            </UChip>
        </nav>
    </div>
</template>