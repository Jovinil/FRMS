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

const lawThreatItems = [
  { label: 'Looting', value: 'looting' },
  { label: 'Riots', value: 'riots' },
  { label: 'Armed groups', value: 'armed_groups' },
  { label: 'Gender-based violence', value: 'gbv' },
  { label: 'Child abuse/exploitation', value: 'child_abuse' },
  { label: 'Other', value: 'other' }
];

const securityPresenceItems = [
  { label: 'PNP', value: 'pnp' },
  { label: 'AFP', value: 'afp' },
  { label: 'Barangay tanods', value: 'barangay_tanods' },
  { label: 'Private security', value: 'private_security' },
  { label: 'Other', value: 'other' }
];

const damageRangeItems = [
  { label: '<25%', value: '<25%' },
  { label: '26–50%', value: '26-50%' },
  { label: '51–75%', value: '51-75%' },
  { label: '>75%', value: '>75%' }
];

const shelterNeedItems = [
  { label: 'Tents / tarpaulins', value: 'tents_tarps' },
  { label: 'Repair materials', value: 'repair_materials' },
  { label: 'Transitional shelters', value: 'transitional_shelters' },
  { label: 'Tools (hammers, nails, etc.)', value: 'tools' },
  { label: 'Skilled labor', value: 'skilled_labor' },
  { label: 'Other', value: 'other' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 9. LAW AND ORDER / SECURITY -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">9. LAW AND ORDER / SECURITY</h2>

      <UFormField
        label="9.1 Are there problems related to law and order or security?"
        name="lawAndOrder.lawAndOrderProblem"
      >
        <URadioGroup
          v-model="form.lawAndOrder.lawAndOrderProblem"
          :items="yesNoUnknownItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="9.2 Nature of law and order / security threats"
        name="lawAndOrder.threats"
      >
        <UCheckboxGroup
          v-model="form.lawAndOrder.threats"
          :items="lawThreatItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="lawAndOrder.threatsOther"
      >
        <UInput v-model="form.lawAndOrder.threatsOther" />
      </UFormField>

      <UFormField
        label="9.3 Security presence in the community"
        name="lawAndOrder.securityPresence"
      >
        <UCheckboxGroup
          v-model="form.lawAndOrder.securityPresence"
          :items="securityPresenceItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="lawAndOrder.securityPresenceOther"
      >
        <UInput v-model="form.lawAndOrder.securityPresenceOther" />
      </UFormField>
    </section>

    <!-- 10. SHELTER -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">10. SHELTER</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="10.1 Estimated number of totally destroyed houses"
          name="shelter.destroyedHousesNumber"
        >
          <UInput
            v-model.number="form.shelter.destroyedHousesNumber"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Damage range (destroyed)"
          name="shelter.destroyedHousesRange"
        >
          <URadioGroup
            v-model="form.shelter.destroyedHousesRange"
            :items="damageRangeItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="10.2 Estimated number of damaged houses"
          name="shelter.damagedHousesNumber"
        >
          <UInput
            v-model.number="form.shelter.damagedHousesNumber"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Damage range (damaged)"
          name="shelter.damagedHousesRange"
        >
          <URadioGroup
            v-model="form.shelter.damagedHousesRange"
            :items="damageRangeItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <UFormField
        label="10.3 Immediate shelter needs"
        name="shelter.immediateShelterNeeds"
      >
        <UCheckboxGroup
          v-model="form.shelter.immediateShelterNeeds"
          :items="shelterNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="shelter.immediateShelterNeedOther"
      >
        <UInput v-model="form.shelter.immediateShelterNeedOther" />
      </UFormField>
    </section>
  </div>
</template>
