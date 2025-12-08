<script setup lang="ts">
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';

const store = useRdanaFormStore();
const form = store.form;

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const yesNoUnknownItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Unknown', value: 'unknown' }
];

const srrTypeItems = [
  { label: 'SAR (Search and Rescue)', value: 'sar' },
  { label: 'USAR (Urban SAR)', value: 'usar' },
  { label: 'Mountain SAR', value: 'mountain_sar' },
  { label: 'Water SAR', value: 'water_sar' },
  { label: 'Collapsed structure', value: 'collapsed_structure' },
  { label: 'Dead body retrieval', value: 'body_retrieval' },
  { label: 'Other', value: 'other' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 7. RELIEF ASSISTANCE -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">7. RELIEF ASSISTANCE</h2>

      <UFormField
        label="7.1 Have affected families already received any relief assistance?"
        name="relief.hasReceivedAssistance"
      >
        <URadioGroup
          v-model="form.relief.hasReceivedAssistance"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <div
        v-for="(org, index) in form.relief.assistanceList"
        :key="index"
        class="space-y-3 border rounded-xl p-4"
      >
        <p class="font-medium">
          Relief Assistance Source {{ index + 1 }}
        </p>

        <UFormField
          :name="`relief.assistanceList.${index}.organizationName`"
          label="7.2 Name of organization"
        >
          <UInput v-model="org.organizationName" />
        </UFormField>

        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            :name="`relief.assistanceList.${index}.contactPerson`"
            label="Contact person"
          >
            <UInput v-model="org.contactPerson" />
          </UFormField>

          <UFormField
            :name="`relief.assistanceList.${index}.contactDetails`"
            label="Contact details"
          >
            <UInput v-model="org.contactDetails" />
          </UFormField>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium">7.3 Assistance given (items and quantity)</p>

          <div
            v-for="(item, idx) in org.assistanceGiven"
            :key="idx"
            class="grid gap-2 md:grid-cols-2"
          >
            <UFormField
              :name="`relief.assistanceList.${index}.assistanceGiven.${idx}.particular`"
              label="Particular"
            >
              <UInput v-model="item.particular" />
            </UFormField>

            <UFormField
              :name="`relief.assistanceList.${index}.assistanceGiven.${idx}.quantity`"
              label="Quantity"
            >
              <UInput
                v-model.number="item.quantity"
                type="number"
                min="0"
              />
            </UFormField>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            :name="`relief.assistanceList.${index}.serviceDateStart`"
            label="Service date (from)"
          >
            <UInput
              v-model="org.serviceDateStart"
              placeholder="YYYY-MM-DD"
            />
          </UFormField>

          <UFormField
            :name="`relief.assistanceList.${index}.serviceDateEnd`"
            label="to"
          >
            <UInput
              v-model="org.serviceDateEnd"
              placeholder="YYYY-MM-DD"
            />
          </UFormField>

          <UFormField
            :name="`relief.assistanceList.${index}.familiesServed`"
            label="No. of families served"
          >
            <UInput
              v-model.number="org.familiesServed"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>
    </section>

    <!-- 8. SEARCH, RESCUE AND RETRIEVAL -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">8. SEARCH, RESCUE AND RETRIEVAL (SRR)</h2>

      <UFormField
        label="8.1 Is there still a need for SRR operations?"
        name="srr.srrNeeded"
      >
        <URadioGroup
          v-model="form.srr.srrNeeded"
          :items="yesNoUnknownItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="8.2 Type of SRR operations required"
        name="srr.srrTypes"
      >
        <UCheckboxGroup
          v-model="form.srr.srrTypes"
          :items="srrTypeItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="srr.srrOther"
      >
        <UInput v-model="form.srr.srrOther" />
      </UFormField>
    </section>
  </div>
</template>
