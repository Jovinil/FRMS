<template>
    <div class="flex flex-col h-screen items-center justify-center">
        
        <div class="w-full md:w-3/4">
            <UCard :ui="{ body: '!p-0', footer: 'text-end' }">
                <template #header>
                User Login
                </template>

                <AdminsUserLoginTable />

                <template #footer>
                    <UButton label="View Account"/>
                </template>
            </UCard>
        </div>
        
    </div>
</template>