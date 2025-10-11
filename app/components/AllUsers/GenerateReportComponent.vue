<template>
    <UCard :ui="{ root: 'w-1/2', footer: 'text-end' }">
        <template #header>
            Report
        </template>
            this is the generate report body
        <template #footer>
            <UButton label="Generate PDF" class="bg-active-color"/>
        </template>
    </UCard>
</template>