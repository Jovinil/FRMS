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

const accessModeItems = [
  { label: 'Car / Bus', value: 'car_bus' },
  { label: 'Truck / 4WD / 6–10 wheeler', value: 'truck_4wd_6_10_wheeler' },
  { label: 'Motorcycle', value: 'motorcycle' },
  { label: 'On Foot', value: 'foot' },
  { label: 'Boat', value: 'boat' },
  { label: 'Airplane', value: 'airplane' },
  { label: 'Helicopter', value: 'helicopter' },
  { label: 'Horse / Cow / Carabao', value: 'horse_cow_carabao' }
];

const accessNeedItems = [
  { label: 'Transport', value: 'transport' },
  { label: 'Debris clearing', value: 'debris_clearing' },
  { label: 'Road repair', value: 'road_repair' },
  { label: 'Bridge repair', value: 'bridge_repair' },
  { label: 'Security', value: 'security' },
  { label: 'Other', value: 'other' }
];

const powerStatusItems = [
  { label: 'Yes (normal)', value: 'yes' },
  { label: 'None (no electricity)', value: 'none' },
  { label: 'Partial (some areas)', value: 'partial' },
  { label: 'Limited hours', value: 'limited' },
  { label: 'No power even before disaster', value: 'no_power_before_disaster' }
];

const powerDamageItems = [
  { label: 'Fallen posts', value: 'fallen_posts' },
  { label: 'Cut power lines', value: 'cut_power_lines' },
  { label: 'Damaged transformers', value: 'damaged_transformers' },
  { label: 'Submerged facilities', value: 'submerged_facilities' },
  { label: 'Other', value: 'other' }
];

const urgentPowerNeedItems = [
  { label: 'Generators', value: 'generators' },
  { label: 'Gasoline for generators', value: 'gasoline_for_generators' },
  { label: 'Diesel for generators', value: 'diesel_for_generators' }
];

const passabilityItems = [
  { label: 'Partially passable', value: 'partially_passable' },
  { label: 'Totally unpassable', value: 'totally_unpassable' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 3. ACCESSIBILITY -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">3. ACCESSIBILITY</h2>

      <UFormField
        label="3.1 Is the community accessible?"
        name="accessibility.communityAccessible"
      >
        <URadioGroup
          v-model="form.accessibility.communityAccessible"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="3.2 Modes of access currently possible"
        name="accessibility.accessModes"
      >
        <UCheckboxGroup
          v-model="form.accessibility.accessModes"
          :items="accessModeItems"
        />
      </UFormField>

      <UFormField
        label="3.3 Are there damaged roads/bridges affecting access?"
        name="accessibility.hasDamagedRoadsOrBridges"
      >
        <URadioGroup
          v-model="form.accessibility.hasDamagedRoadsOrBridges"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="3.4 Passability of main access routes"
        name="accessibility.damagePassability"
      >
        <URadioGroup
          v-model="form.accessibility.damagePassability"
          :items="passabilityItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="3.5 Immediate access/logistics needs"
        name="accessibility.immediateAccessNeeds"
      >
        <UCheckboxGroup
          v-model="form.accessibility.immediateAccessNeeds"
          :items="accessNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="accessibility.immediateAccessNeedOther"
      >
        <UInput v-model="form.accessibility.immediateAccessNeedOther" />
      </UFormField>
    </section>

    <!-- 4. POWER AND FUEL -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">4. POWER AND FUEL</h2>

      <UFormField
        label="4.1 Status of electricity supply"
        name="power.powerStatus"
      >
        <URadioGroup
          v-model="form.power.powerStatus"
          :items="powerStatusItems"
        />
      </UFormField>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="4.2 If partial: % of households without power"
          name="power.partialWithoutPowerPercent"
        >
          <UInput
            v-model.number="form.power.partialWithoutPowerPercent"
            type="number"
            min="0"
            max="100"
          />
        </UFormField>

        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="4.3 If limited: from"
            name="power.limitedFromTime"
          >
            <UInput
              v-model="form.power.limitedFromTime"
              placeholder="HH:mm"
            />
          </UFormField>

          <UFormField
            label="to"
            name="power.limitedToTime"
          >
            <UInput
              v-model="form.power.limitedToTime"
              placeholder="HH:mm"
            />
          </UFormField>
        </div>
      </div>

      <UFormField
        label="4.4 Main damages to power facilities"
        name="power.powerDamages"
      >
        <UCheckboxGroup
          v-model="form.power.powerDamages"
          :items="powerDamageItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="power.powerDamageOther"
      >
        <UInput v-model="form.power.powerDamageOther" />
      </UFormField>

      <UFormField
        label="4.5 Estimated days fuel stocks will last"
        name="power.fuelStockDays"
      >
        <UInput
          v-model.number="form.power.fuelStockDays"
          type="number"
          min="0"
        />
      </UFormField>

      <UFormField
        label="4.6 Immediate power/fuel requirements"
        name="power.urgentPowerNeeds"
      >
        <UCheckboxGroup
          v-model="form.power.urgentPowerNeeds"
          :items="urgentPowerNeedItems"
        />
      </UFormField>

      <div class="grid gap-4 md:grid-cols-3">
        <UFormField
          label="No. of generators needed"
          name="power.urgentPowerGeneratorQty"
        >
          <UInput
            v-model.number="form.power.urgentPowerGeneratorQty"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Liters of gasoline"
          name="power.urgentGasolineQty"
        >
          <UInput
            v-model.number="form.power.urgentGasolineQty"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Liters of diesel"
          name="power.urgentDieselQty"
        >
          <UInput
            v-model.number="form.power.urgentDieselQty"
            type="number"
            min="0"
          />
        </UFormField>
      </div>
    </section>
  </div>
</template>
