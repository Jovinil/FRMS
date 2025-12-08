<script setup lang="ts">
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm';

const store = useRdanaFormStore();
const form = store.form;

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const foodSourceItems = [
  { label: 'Home stocks', value: 'home_stocks' },
  { label: 'Local markets', value: 'local_markets' },
  { label: 'Relief goods', value: 'relief_goods' },
  { label: 'Food-for-work', value: 'food_for_work' },
  { label: 'Community kitchens', value: 'community_kitchens' },
  { label: 'Other', value: 'other' }
];

const foodNeedItems = [
  { label: 'Ready-to-eat food', value: 'rte_food' },
  { label: 'Rice', value: 'rice' },
  { label: 'Canned goods', value: 'canned_goods' },
  { label: 'Cooking ingredients', value: 'cooking_ingredients' },
  { label: 'Infant food', value: 'infant_food' },
  { label: 'Other', value: 'other' }
];

const waterSourceItems = [
  { label: 'Piped water', value: 'piped' },
  { label: 'Deep well', value: 'deep_well' },
  { label: 'Shallow well', value: 'shallow_well' },
  { label: 'Spring', value: 'spring' },
  { label: 'River', value: 'river' },
  { label: 'Bottled/galled water', value: 'bottled' },
  { label: 'Other', value: 'other' }
];

const waterNeedItems = [
  { label: 'Drinking water', value: 'drinking_water' },
  { label: 'Water containers', value: 'water_containers' },
  { label: 'Water treatment (chlorine, etc.)', value: 'water_treatment' },
  { label: 'Water trucking', value: 'water_trucking' },
  { label: 'Other', value: 'other' }
];

const sanitationNeedItems = [
  { label: 'Latrines / toilets', value: 'latrines' },
  { label: 'Bathing facilities', value: 'bathing' },
  { label: 'Hygiene kits', value: 'hygiene_kits' },
  { label: 'Solid waste collection', value: 'waste_collection' },
  { label: 'Drainage cleaning', value: 'drainage_cleaning' },
  { label: 'Other', value: 'other' }
];
</script>

<template>
  <div class="space-y-6 mt-6">
    <!-- 11. FOOD SECURITY -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">11. FOOD SECURITY</h2>

      <UFormField
        label="11.1 Do most people have access to food?"
        name="foodSecurity.peopleHaveAccessToFood"
      >
        <URadioGroup
          v-model="form.foodSecurity.peopleHaveAccessToFood"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="11.2 Main sources of food"
        name="foodSecurity.mainSourcesOfFood"
      >
        <UCheckboxGroup
          v-model="form.foodSecurity.mainSourcesOfFood"
          :items="foodSourceItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="foodSecurity.mainSourceOfFoodOther"
      >
        <UInput v-model="form.foodSecurity.mainSourceOfFoodOther" />
      </UFormField>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="11.3 Are local markets operating?"
          name="foodSecurity.localMarketOperating"
        >
          <URadioGroup
            v-model="form.foodSecurity.localMarketOperating"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="11.4 Is there a food warehouse in the area?"
          name="foodSecurity.hasFoodWarehouse"
        >
          <URadioGroup
            v-model="form.foodSecurity.hasFoodWarehouse"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <UFormField
        label="11.5 Immediate food needs"
        name="foodSecurity.immediateFoodNeeds"
      >
        <UCheckboxGroup
          v-model="form.foodSecurity.immediateFoodNeeds"
          :items="foodNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="foodSecurity.immediateFoodNeedOther"
      >
        <UInput v-model="form.foodSecurity.immediateFoodNeedOther" />
      </UFormField>
    </section>

    <!-- 12. WATER SUPPLY -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">12. WATER SUPPLY</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="12.1 Do people have access to safe drinking water?"
          name="waterSupply.accessToDrinkingWater"
        >
          <URadioGroup
            v-model="form.waterSupply.accessToDrinkingWater"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="12.2 Do people have access to water for domestic use?"
          name="waterSupply.accessToDomesticWater"
        >
          <URadioGroup
            v-model="form.waterSupply.accessToDomesticWater"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <UFormField
        label="12.3 Primary source of drinking water"
        name="waterSupply.primaryDrinkingWaterSource"
      >
        <URadioGroup
          v-model="form.waterSupply.primaryDrinkingWaterSource"
          :items="waterSourceItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="waterSupply.primaryDrinkingWaterSourceOther"
      >
        <UInput v-model="form.waterSupply.primaryDrinkingWaterSourceOther" />
      </UFormField>

      <UFormField
        label="12.4 Do most households have water containers with covers?"
        name="waterSupply.householdsHaveWaterContainersWithLid"
      >
        <URadioGroup
          v-model="form.waterSupply.householdsHaveWaterContainersWithLid"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <UFormField
        label="12.5 Immediate water-related needs"
        name="waterSupply.immediateWaterNeeds"
      >
        <UCheckboxGroup
          v-model="form.waterSupply.immediateWaterNeeds"
          :items="waterNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="waterSupply.immediateWaterNeedOther"
      >
        <UInput v-model="form.waterSupply.immediateWaterNeedOther" />
      </UFormField>
    </section>

    <!-- 13. SANITATION & HYGIENE -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">13. SANITATION & HYGIENE</h2>

      <UFormField
        label="13.1 Do people have access to functioning sanitary facilities?"
        name="sanitation.accessToFunctioningSanitaryFacilities"
      >
        <URadioGroup
          v-model="form.sanitation.accessToFunctioningSanitaryFacilities"
          :items="yesNoItems"
          orientation="horizontal"
        />
      </UFormField>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="13.2 Are there separate facilities for women and men?"
          name="sanitation.separateFacilitiesForWomenAndMen"
        >
          <URadioGroup
            v-model="form.sanitation.separateFacilitiesForWomenAndMen"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>

        <UFormField
          label="13.3 Are hygiene supplies adequate?"
          name="sanitation.adequateHygieneSupplies"
        >
          <URadioGroup
            v-model="form.sanitation.adequateHygieneSupplies"
            :items="yesNoItems"
            orientation="horizontal"
          />
        </UFormField>
      </div>

      <UFormField
        label="13.4 Immediate sanitation/hygiene needs"
        name="sanitation.immediateSanitationNeeds"
      >
        <UCheckboxGroup
          v-model="form.sanitation.immediateSanitationNeeds"
          :items="sanitationNeedItems"
        />
      </UFormField>

      <UFormField
        label="Other (specify)"
        name="sanitation.immediateSanitationNeedOther"
      >
        <UInput v-model="form.sanitation.immediateSanitationNeedOther" />
      </UFormField>
    </section>
  </div>
</template>
