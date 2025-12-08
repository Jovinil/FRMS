<script setup lang="ts">
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';

const store = useRdanaFormStore();
const form = store.form;

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const telcoItems = [
  { label: 'Smart / Sun', value: 'smart_sun' },
  { label: 'Globe / TM', value: 'globe_tm' },
  { label: 'Other', value: 'other' }
];

const mediaItems = [
  { label: 'Radio (AM)', value: 'radio_am' },
  { label: 'Radio (FM)', value: 'radio_fm' },
  { label: 'TV (free-to-air)', value: 'tv_free_air' },
  { label: 'TV (cable)', value: 'tv_cable' },
  { label: 'TV (satellite)', value: 'tv_satellite' }
];

const altCommsItems = [
  { label: 'Satellite phone', value: 'satellite_phone' },
  { label: 'VHF radio', value: 'vhf_radio' },
  { label: 'UHF radio', value: 'uhf_radio' },
  { label: 'HF / SSB radio', value: 'hf_ssb_radio' },
  { label: 'BGAN', value: 'bgan' },
  { label: 'VSAT', value: 'v_sat' }
];

const commNeedsItems = [
  { label: 'Cellular signal restoration', value: 'cell_signal' },
  { label: 'Radio communication', value: 'radio_comm' },
  { label: 'Satellite communication', value: 'satellite_comm' },
  { label: 'Charging stations', value: 'charging_stations' },
  { label: 'Other', value: 'other' }
];

const protectionMechanismItems = [
  { label: 'Security patrols', value: 'security_patrols' },
  { label: 'Police presence', value: 'police_presence' },
  { label: 'Barangay tanods', value: 'barangay_tanods' },
  { label: 'Curfew', value: 'curfew' },
  { label: 'Other', value: 'other' }
];

const facilityItems = [
  { label: 'Lighting', value: 'lighting' },
  { label: 'Ventilation', value: 'ventilation' },
  { label: 'Sleeping areas/partitions', value: 'sleeping_areas_partition' },
  { label: 'Toilets/bath', value: 'toilets_bath' },
  { label: 'Cooking facilities', value: 'cooking' },
  { label: 'Water points', value: 'water_points' },
  { label: 'Waste collection', value: 'waste_collection' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 5. COMMUNICATIONS -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">5. COMMUNICATIONS</h2>

      <UFormField
        label="5.1 Working cellular networks / signals in the area"
        name="communications.telcoSignals"
      >
        <UCheckboxGroup
          v-model="form.communications.telcoSignals"
          :items="telcoItems"
        />
      </UFormField>

      <UFormField
        label="Other telco/network (specify)"
        name="communications.telcoSignalOther"
      >
        <UInput v-model="form.communications.telcoSignalOther" />
      </UFormField>

      <UFormField
        label="5.2 Available radio / TV / media services"
        name="communications.mediaServices"
      >
        <UCheckboxGroup
          v-model="form.communications.mediaServices"
          :items="mediaItems"
        />
      </UFormField>

      <UFormField
        label="5.3 Alternative communication means available"
        name="communications.altCommunications"
      >
        <UCheckboxGroup
          v-model="form.communications.altCommunications"
          :items="altCommsItems"
        />
      </UFormField>

      <UFormField
        label="5.4 Immediate communication needs"
        name="communications.immediateCommNeeds"
      >
        <UCheckboxGroup
          v-model="form.communications.immediateCommNeeds"
          :items="commNeedsItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="communications.immediateCommNeedOther"
      >
        <UInput v-model="form.communications.immediateCommNeedOther" />
      </UFormField>
    </section>

    <!-- 6. EVACUATION CENTERS -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">6. EVACUATION CENTERS</h2>

      <UFormField
        label="6.1 Are there official evacuation centers?"
        name="evacuation.hasEvacuationCenter"
      >
        <URadioGroup
          v-model="form.evacuation.hasEvacuationCenter"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="6.2 Is there a designated camp manager?"
        name="evacuation.hasCampManager"
      >
        <URadioGroup
          v-model="form.evacuation.hasCampManager"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <div
        v-for="(center, index) in form.evacuation.centers"
        :key="index"
        class="space-y-3 border rounded-xl p-4"
      >
        <p class="font-medium">
          Evacuation Center {{ index + 1 }}
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            :name="`evacuation.centers.${index}.name`"
            label="6.3 Name of evacuation center"
          >
            <UInput v-model="center.name" />
          </UFormField>

          <UFormField
            :name="`evacuation.centers.${index}.address`"
            label="Address / location"
          >
            <UInput v-model="center.address" />
          </UFormField>

          <UFormField
            :name="`evacuation.centers.${index}.gpsCoordinates`"
            label="GPS coordinates"
          >
            <UInput v-model="center.gpsCoordinates" />
          </UFormField>

          <UFormField
            :name="`evacuation.centers.${index}.familiesInside`"
            label="No. of families inside"
          >
            <UInput
              v-model.number="center.familiesInside"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            :name="`evacuation.centers.${index}.personsInside`"
            label="No. of persons inside"
          >
            <UInput
              v-model.number="center.personsInside"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <UFormField
        label="6.4 Protection and safety mechanisms in ECs"
        name="evacuation.protectionMechanisms"
      >
        <UCheckboxGroup
          v-model="form.evacuation.protectionMechanisms"
          :items="protectionMechanismItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="evacuation.protectionMechanismOther"
      >
        <UInput v-model="form.evacuation.protectionMechanismOther" />
      </UFormField>

      <UFormField
        label="6.5 Facilities/services available and operational"
        name="evacuation.facilitiesOperational"
      >
        <UCheckboxGroup
          v-model="form.evacuation.facilitiesOperational"
          :items="facilityItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="evacuation.facilityOther"
      >
        <UInput v-model="form.evacuation.facilityOther" />
      </UFormField>
    </section>
  </div>
</template>
