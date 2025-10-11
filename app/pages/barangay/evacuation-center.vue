<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  center_name: z.string().email('Invalid email'),
  capacity: z.number().min(8, 'Must be at least 8 characters'),
  lng: z.string(),
  lat: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  center_name: undefined,
  capacity: undefined,
  lng: undefined,
  lat: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center gap-3">   
        <UCard :ui="{ root: 'w-1/2' }">
            <template #header> 
                <h2>Evacuation Center</h2>
            </template>
            <UForm :schema="schema" :state="state" class="space-y-4 [&_div]:w-full [&]" @submit="onSubmit">
                <UFormField label="Center Name" name="center_name">
                    <UInput v-model="state.center_name" />
                </UFormField>

                <UFormField label="Center Name" name="capacity">
                    <UInput v-model="state.capacity" />
                </UFormField>

                <div class="flex flex-col gap-2">
                    <h2>Coordinates</h2>
                    <div class="flex gap-5">
                        <UFormField label="Longitude" name="lng">
                            <UInput v-model="state.capacity" />
                        </UFormField>
                        
                        <UFormField label="Latitude" name="lat">
                            <UInput v-model="state.capacity" />
                        </UFormField>
                    </div>                    
                </div>

                <div class="text-end">
                    <UButton type="submit">
                        Submit
                    </UButton>
                </div>
            </UForm>    
        </UCard>
    </div>
</template>

