
<template>
  <div class="py-3" id="rdana-form">
    <h1 class="text-2xl md:text-3xl font-bold text-primary">
      RAPID DAMAGE ASSESSMENT AND NEEDS ANALYSIS (RDANA)
    </h1>

    <UAlert v-if="errors.length" color="primary" variant="soft" title="Please fix the following before submitting" class="mb-2">
      <ul class="list-disc ml-5 mt-2 space-y-1">
        <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
      </ul>
    </UAlert>

    <UForm :state="form" @submit="onSubmit" class="flex flex-col gap-5 mt-3">
    <!-- 1. PROFILE OF THE DISASTER & RDANA MISSION -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">1. PROFILE OF THE DISASTER &amp; RDANA MISSION</h2>
      </template>

      <!-- 1.1 EMERGENCY OPERATION -->
      <h3 class="text-lg font-semibold mb-2">1.1 EMERGENCY OPERATION</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UFormField label="1.1.1 Name of Operation/Event">
          <UInput v-model="form.profile.emergency.opName" placeholder="Operation/Event name" />
        </UFormField>
        <UFormField label="1.1.2 Type of Disaster/Event">
          <UInput v-model="form.profile.emergency.opType" placeholder="e.g., Flood, Typhoon, Earthquake" />
        </UFormField>
        <UFormField label="1.1.3 Date and Time of Event">
          <UInput v-model="form.profile.emergency.opDateTime" type="datetime-local" />
        </UFormField>
      </div>

      <!-- 1.2 RDANA MISSION -->
      <h3 class="text-lg font-semibold mb-2">1.2 RDANA MISSION</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <UFormField>
          <template #label>1.2.1 Region <span class="text-red-500">*</span></template>
          <UInput v-model="form.profile.mission.rdanaRegion" placeholder="Region" />
        </UFormField>
        <UFormField>
          <template #label>1.2.2 Province <span class="text-red-500">*</span></template>
          <UInput v-model="form.profile.mission.rdanaProvince" placeholder="Province" />
        </UFormField>
        <UFormField>
          <template #label>1.2.3 City/Municipality <span class="text-red-500">*</span></template>
          <UInput v-model="form.profile.mission.rdanaCity" placeholder="City/Municipality" />
        </UFormField>
        <UFormField>
          <template #label>1.2.4 Barangay <span class="text-red-500">*</span></template>
          <UInput v-model="form.profile.mission.rdanaBarangay" placeholder="Barangay" />
        </UFormField>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UFormField label="1.2.5 Sitio/Purok">
          <UInput v-model="form.profile.mission.rdanaSitioPurok" placeholder="Sitio/Purok" />
        </UFormField>
        <UFormField label="1.2.6 GPS Coordinate">
          <UInput v-model="form.profile.mission.rdanaGPS" placeholder="lat, long" />
        </UFormField>
        <UFormField>
          <template #label>1.2.7 Date and Time of RDANA <span class="text-red-500">*</span></template>
          <UInput v-model="form.profile.mission.rdanaDateTime" type="datetime-local" />
        </UFormField>
      </div>

      <!-- 1.3 LOCAL AUTHORITIES/PERSONS INTERVIEWED -->
      <h3 class="text-lg font-semibold mb-2">1.3 LOCAL AUTHORITIES/PERSONS INTERVIEWED</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <UFormField label="1.3.1 Name">
          <UInput v-model="form.profile.interviewee.intervieweeName" placeholder="Name" />
        </UFormField>
        <UFormField label="1.3.2 Age">
          <UInput v-model.number="form.profile.interviewee.intervieweeAge" type="number" min="0" placeholder="Age" />
        </UFormField>
        <UFormField label="1.3.3 Office/Organization">
          <UInput v-model="form.profile.interviewee.intervieweeOrg" placeholder="Office/Organization" />
        </UFormField>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UFormField label="1.3.4 Designation">
          <UInput v-model="form.profile.interviewee.intervieweeDesignation" placeholder="Designation" />
        </UFormField>
        <UFormField label="1.3.5 Phone number">
          <UInput v-model="form.profile.interviewee.intervieweePhone" placeholder="Phone number" />
        </UFormField>
        <UFormField label="1.3.6 Email">
          <UInput v-model="form.profile.interviewee.intervieweeEmail" type="email" placeholder="Email" />
        </UFormField>
      </div>

      <!-- 1.4 SUMMARY DESCRIPTION OF DISASTER/INCIDENT -->
      <UFormField label="1.4 SUMMARY DESCRIPTION OF DISASTER/INCIDENT (IMPACT AND LOCATION)">
        <UTextarea v-model="form.profile.summaryDescription" placeholder="Provide a summary of the disaster/incident, impact and location..." class="w-full" autoresize/>
      </UFormField>
    </UCard>

    <!-- 2. INITIAL IMPACT: (DEMOGRAPHICS) -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">2. INITIAL IMPACT: (DEMOGRAPHICS)</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <UFormField label="2.1 Affected Families">
          <UInput v-model.number="form.demographics.affectedFamilies" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.2 Affected Persons">
          <UInput v-model.number="form.demographics.affectedPersons" type="number" min="0" placeholder="#" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <UFormField label="2.3 Displaced Families (Inside EC)">
          <UInput v-model.number="form.demographics.displacedFamiliesInsideEC" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.4 Displaced Persons (Inside EC)">
          <UInput v-model.number="form.demographics.displacedPersonsInsideEC" type="number" min="0" placeholder="#" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <UFormField label="2.5 Displaced Families (Outside ECs)">
          <UInput v-model.number="form.demographics.displacedFamiliesOutsideEC" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.6 Displaced Persons (Outside ECs)">
          <UInput v-model.number="form.demographics.displacedPersonsOutsideEC" type="number" min="0" placeholder="#" />
        </UFormField>
      </div>

      <h3 class="text-lg font-semibold mb-2">2.2s Affected children</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <UFormField label="Age 0-2">
          <UInput v-model.number="form.demographics.affectedChildren0_2" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="Age 3-5">
          <UInput v-model.number="form.demographics.affectedChildren3_5" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="Age 6-12">
          <UInput v-model.number="form.demographics.affectedChildren6_12" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="Age 13-17">
          <UInput v-model.number="form.demographics.affectedChildren13_17" type="number" min="0" placeholder="#" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <UFormField label="2.26 PWD">
          <UInput v-model.number="form.demographics.affectedPWD" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.2c Elderly">
          <UInput v-model.number="form.demographics.affectedElderly" type="number" min="0" placeholder="#" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UFormField label="2.7 Missing (Male)">
          <UInput v-model.number="form.demographics.missingMale" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.8 Missing (Female)">
          <UInput v-model.number="form.demographics.missingFemale" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.9 Missing (Total)">
          <UInput :model-value="form.demographics.missingTotal" disabled />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UFormField label="2.10 Injured (Male)">
          <UInput v-model.number="form.demographics.injuredMale" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.11 Injured (Female)">
          <UInput v-model.number="form.demographics.injuredFemale" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.12 Injured (Total)">
          <UInput :model-value="form.demographics.injuredTotal" disabled />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="2.13 Dead (Male)">
          <UInput v-model.number="form.demographics.deadMale" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.14 Dead (Female)">
          <UInput v-model.number="form.demographics.deadFemale" type="number" min="0" placeholder="#" />
        </UFormField>
        <UFormField label="2.15 Dead (Total)">
          <UInput :model-value="form.demographics.deadTotal" disabled />
        </UFormField>
      </div>
    </UCard>

    <!-- 3. ACCESSIBILITY -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">3. ACCESSIBILITY</h2>
      </template>

      <UFormField label="3.1 Is the community accessible?" class="mb-6">
        <URadioGroup v-model="form.accessibility.isAccessible" :items="['Yes','No']" />
      </UFormField>

      <UFormField label="3.2 How can the community be reached? (check all that apply)" class="mb-6">
        <UCheckboxGroup v-model="form.accessibility.accessMeans" :items="ACCESS_MEANS" />
      </UFormField>

      <UFormField label="3.3 Are there road segments or bridges that are damaged?" class="mb-6">
        <URadioGroup v-model="form.accessibility.roadDamaged" :items="['Yes','No']" />
      </UFormField>

      <div v-if="form.accessibility.roadDamaged === 'Yes'" class="pl-4 border-l-2 border-primary-500 mb-6">
        <UFormField>
          <template #label>
            3.3.1 If yes, please indicate details below
            <span v-if="form.accessibility.roadDamaged === 'Yes'" class="text-red-500">*</span>
          </template>
          <UCheckboxGroup v-model="form.accessibility.roadStatus" :items="ROAD_STATUS" />
        </UFormField>
      </div>

      <UFormField label="3.4 Most immediate need on access (check all that apply)" class="mb-6">
        <UCheckboxGroup v-model="form.accessibility.accessNeeds" :items="ACCESS_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.accessibility.accessNeedsOther" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 4. POWER OR ELECTRICITY -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">4. POWER OR ELECTRICITY</h2>
      </template>

      <UFormField label="4.1 Is there electricity in the community?" class="mb-6">
        <URadioGroup v-model="form.power.electricityStatus" :items="['None','Yes','Partial','Limited','No power before disaster']" />
        <div v-if="form.power.electricityStatus === 'Partial'" class="mt-3">
          <UFormField label="Partial (cite areas without power)">
            <UInput v-model="form.power.partialPowerDetails" placeholder="Cite areas without power" />
          </UFormField>
        </div>
        <div v-if="form.power.electricityStatus === 'Limited'" class="mt-3">
          <UFormField label="Limited from (time) to">
            <div class="flex space-x-2">
              <UInput v-model="form.power.limitedPowerStart" type="time" placeholder="Start Time" />
              <UInput v-model="form.power.limitedPowerEnd" type="time" placeholder="End Time" />
            </div>
          </UFormField>
        </div>
      </UFormField>

      <UFormField label="4.2 Based on observations, please check if the following are true:" class="mb-6">
        <UCheckboxGroup v-model="form.power.damageCheck" :items="POWER_DAMAGE_CHECK" />
        <div class="mt-3">
          <UInput v-model="form.power.damageOther" placeholder="Others (specify)" />
        </div>
      </UFormField>

      <UFormField label="4.3 How many days from date of survey will the fuel stock in the community last?" class="mb-6">
        <UInput v-model.number="form.power.fuelStockDays" type="number" min="0" placeholder="Number of days" />
      </UFormField>

      <UFormField label="4.4 What are the urgent power (electricity) needs of the community?" class="mb-6">
        <UCheckboxGroup v-model="form.power.urgentNeeds">
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <UCheckbox label="Generators/Alternative Power Kit (Solar)" value="Generators/Alternative Power Kit (Solar)" />
              <UInput v-model.number="form.power.generatorQty" type="number" min="0" placeholder="Quantity" class="w-24" />
            </div>
            <div class="flex items-center space-x-2">
              <UCheckbox label="Gasoline for Generators" value="Gasoline for Generators" />
              <UInput v-model.number="form.power.gasolineQty" type="number" min="0" placeholder="Quantity" class="w-24" />
            </div>
            <div class="flex items-center space-x-2">
              <UCheckbox label="Diesel for Generators" value="Diesel for Generators" />
              <UInput v-model.number="form.power.dieselQty" type="number" min="0" placeholder="Quantity" class="w-24" />
            </div>
          </div>
        </UCheckboxGroup>
        <div class="mt-3">
          <UInput v-model="form.power.needsOther" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 5. COMMUNICATIONS -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">5. COMMUNICATIONS</h2>
      </template>

      <UFormField label="5.1 Telecommunication services operational (has signal) in the area:" class="mb-6">
        <UCheckboxGroup v-model="form.communications.telcoOperational" :items="TELCO_OPS" />
        <div class="mt-3">
          <UInput v-model="form.communications.telcoOther" placeholder="Others (specify)" />
        </div>
      </UFormField>

      <UFormField label="5.2/5.3 Alternative communications operational in the area:" class="mb-6">
        <UCheckboxGroup v-model="form.communications.altCommsOperational" :items="ALT_COMMS" />
      </UFormField>

      <UFormField label="5.4 Most immediate need on communication (check all that apply)" class="mb-6">
        <UCheckboxGroup v-model="form.communications.immediateNeeds" :items="COMMS_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.communications.needsOther" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 6. EVACUATION CENTER DETAILS -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">6. EVACUATION CENTER DETAILS</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <UFormField label="6.1 Is there an evacuation center in the community?">
          <URadioGroup v-model="form.evacuation.hasEvacuationCenter" :items="['Yes','No']" />
        </UFormField>
        <UFormField label="6.2 If yes, is there a designated camp manager?">
          <URadioGroup v-model="form.evacuation.hasCampManager" :items="['Yes','No']" />
        </UFormField>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-semibold">6.3 Evacuation Center summary</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="text-left border-b">
                <th class="py-2 pr-3">Name</th>
                <th class="py-2 pr-3">Address</th>
                <th class="py-2 pr-3">GPS Coordinates</th>
                <th class="py-2 pr-3"># Families</th>
                <th class="py-2 pr-3"># Persons</th>
                <th class="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, i) in form.evacuation.centers" :key="i" class="border-b">
                <td class="py-2 pr-3"><UInput v-model="c.name" placeholder="Name of Evacuation Center" /></td>
                <td class="py-2 pr-3"><UInput v-model="c.address" placeholder="Address" /></td>
                <td class="py-2 pr-3"><UInput v-model="c.gps" placeholder="Lat, Long" /></td>
                <td class="py-2 pr-3"><UInput v-model.number="c.families" type="number" min="0" placeholder="#" /></td>
                <td class="py-2 pr-3"><UInput v-model.number="c.persons" type="number" min="0" placeholder="#" /></td>
                <td class="py-2"><UButton color="primary" variant="soft" size="xs" @click="removeEvacuationCenter(i)">Remove</UButton></td>
              </tr>
            </tbody>
          </table>
        </div>
        <UButton color="primary" variant="soft" icon="i-heroicons-plus" @click="addEvacuationCenter">Add Evacuation Center</UButton>
      </div>


      <UFormField label="6.4 Existing protection mechanisms (check all that applies)">
        <UCheckboxGroup v-model="form.evacuation.protectionMechanisms" :items="EVAC_PROTECTION_MECHANISMS" />
        <div class="mt-3">
          <UInput v-model="form.evacuation.protectionOther" placeholder="Others (specify)" />
        </div>
      </UFormField>


      <UFormField label="6.5 Operational in the evacuation areas (check all that applies)">
        <UCheckboxGroup v-model="form.evacuation.facilitiesOperational" :items="EVAC_FACILITIES_OPERATIONAL" />
        <div class="mt-3">
          <UInput v-model="form.evacuation.facilitiesOther" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 7. RELIEF ASSISTANCE -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">7. RELIEF ASSISTANCE</h2>
      </template>

      <UFormField label="7.1 Has the community/EC received assistance?">
        <URadioGroup v-model="form.relief.hasReceivedAssistance" :items="['Yes','No']" />
      </UFormField>

      <div class="mt-4 space-y-3" v-if="form.relief.hasReceivedAssistance === 'Yes'">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="text-left border-b">
                <th class="py-2 pr-3">NAME or ORGANIZATION (requiprimary)</th>
                <th class="py-2 pr-3">CONTACT PERSON</th>
                <th class="py-2 pr-3">CONTACT DETAILS</th>
                <th class="py-2 pr-3">ASSISTANCE GIVEN</th>
                <th class="py-2 pr-3">PARTICULARS</th>
                <th class="py-2 pr-3">QUANTITY</th>
                <th class="py-2 pr-3">SERVICE START</th>
                <th class="py-2 pr-3">SERVICE END</th>
                <th class="py-2 pr-3"># of Families Served</th>
                <th class="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in form.relief.items" :key="i" class="border-b">
                <td class="py-2 pr-3"><UInput v-model="r.organization" placeholder="Organization" /></td>
                <td class="py-2 pr-3"><UInput v-model="r.contactPerson" placeholder="Contact Person" /></td>
                <td class="py-2 pr-3"><UInput v-model="r.contactDetails" placeholder="Contact Details" /></td>
                <td class="py-2 pr-3"><UInput v-model="r.assistanceGiven" placeholder="Assistance Given" /></td>
                <td class="py-2 pr-3"><UInput v-model="r.particulars" placeholder="Particulars" /></td>
                <td class="py-2 pr-3"><UInput v-model.number="r.quantity" type="number" min="0" placeholder="#" /></td>
                <td class="py-2 pr-3"><UInput v-model="r.serviceStart" type="date" /></td>
                <td class="py-2 pr-3"><UInput v-model="r.serviceEnd" type="date" /></td>
                <td class="py-2 pr-3"><UInput v-model.number="r.familiesServed" type="number" min="0" placeholder="#" /></td>
                <td class="py-2"><UButton color="primary" variant="soft" size="xs" @click="removeReliefItem(i)">Remove</UButton></td>
              </tr>
            </tbody>
          </table>
        </div>
        <UButton color="primary" variant="soft" icon="i-heroicons-plus" @click="addReliefItem">Add Assistance Row</UButton>
      </div>
    </UCard>

    <!-- 8. SEARCH-RESCUE-RETRIEVAL -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">8. SEARCH-RESCUE-RETRIEVAL</h2>
      </template>

      <UFormField label="8.1 Based on observation, is SEARCH-RESCUE-RETRIEVAL needed in your community?">
        <URadioGroup v-model="form.srr.needed" :items="['Yes','No']" />
      </UFormField>

      <UFormField label="8.2 Please check what SRR is needed">
        <UCheckboxGroup v-model="form.srr.types" :items="SRR_TYPES" />
        <div class="mt-3">
          <UInput v-model="form.srr.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 9. LAW and ORDER -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">9. LAW and ORDER</h2>
      </template>

      <UFormField label="9.1 LAW AND ORDER a problem in your community?">
        <URadioGroup v-model="form.lawAndOrder.problem" :items="['Yes','No','Do not know']" />
      </UFormField>

      <UFormField label="9.2 Threats present in your community (check all that apply)">
        <UCheckboxGroup v-model="form.lawAndOrder.threats" :items="LAW_THREATS" />
      </UFormField>

      <UFormField label="9.3 Presence of law enforcement units in your community (check all that apply)">
        <UCheckboxGroup v-model="form.lawAndOrder.forcesPresent" :items="LAW_FORCES" />
      </UFormField>
    </UCard>

    <!-- 10. SHELTER -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">10. SHELTER</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="10.1 Number and/or percentage of destroyed homes (irreparable)">
          <div class="flex items-center gap-4 flex-wrap">
            <UInput v-model.number="form.shelter.destroyedHouses.count" type="number" min="0" placeholder="#" class="w-24" />
            <span class="text-gray-500">OR</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.shelter.destroyedHouses.pct" :items="['<25%','25-50%','51-75%','>75%']" />
            </div>
          </div>
        </UFormField>

        <UFormField label="10.2 Number and/or percentage of damaged houses (repairable)">
          <div class="flex items-center gap-4 flex-wrap">
            <UInput v-model.number="form.shelter.damagedHouses.count" type="number" min="0" placeholder="#" class="w-24" />
            <span class="text-gray-500">OR</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.shelter.damagedHouses.pct" :items="['<25%','25-50%','51-75%','>75%']" />
            </div>
          </div>
        </UFormField>
      </div>


      <UFormField label="10.3 Based on current situation, most immediate need on shelter (check all that apply)">
        <UCheckboxGroup v-model="form.shelter.immediateNeeds" :items="SHELTER_IMMEDIATE_NEEDS" />
      </UFormField>
    </UCard>

    <!-- 11. FOOD SECURITY -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">11. FOOD SECURITY</h2>
      </template>

      <UFormField label="11.1 Do people have access to food in their current location?">
        <URadioGroup v-model="form.food.accessToFood" :items="['Yes','No']" />
      </UFormField>

      <UFormField label="11.2 What are the main sources of food in the area?">
        <UCheckboxGroup v-model="form.food.foodSources" :items="FOOD_SOURCES" />
        <div class="mt-3">
          <UInput v-model="form.food.others" placeholder="Other (specify)" />
        </div>
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="11.3 Is the local market operating?">
          <URadioGroup v-model="form.food.localMarketOperating" :items="['Yes','No']" />
        </UFormField>
        <UFormField label="11.4 Is there a food warehouse in the area?">
          <URadioGroup v-model="form.food.hasWarehouse" :items="['Yes','No']" />
        </UFormField>
      </div>


      <UFormField label="11.5 Based on current situation, most immediate food need">
        <UCheckboxGroup v-model="form.food.immediateNeeds" :items="FOOD_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.food.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 12. WATER SUPPLY -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">12. WATER SUPPLY</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="12.1 Is there access to water for drinking?">
          <URadioGroup v-model="form.water.accessDrinking" :items="['Yes','No']" />
        </UFormField>
        <UFormField label="12.2 Is there access to water for domestic use?">
          <URadioGroup v-model="form.water.accessDomestic" :items="['Yes','No']" />
        </UFormField>
      </div>

      <UFormField label="12.3 What is the primary water source for drinking?">
        <URadioGroup v-model="form.water.primarySourceDrinking" :items="['Open well','Bore hole/hand pump','Stream/river','Piped water system','Storage/collection container','Other']" />
      </UFormField>

      <UFormField label="12.4 Do affected households have their own water containers with a lid to store water?">
        <URadioGroup v-model="form.water.hasContainersWithLid" :items="['Yes','No']" />
      </UFormField>


      <UFormField label="12.5 Most immediate needs for water systems">
        <UCheckboxGroup v-model="form.water.immediateNeeds" :items="WATER_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.water.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 13. SANITATION -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">13. SANITATION</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="13.1 Is there access to functioning sanitary facilities?">
          <URadioGroup v-model="form.sanitation.accessSanitaryFacilities" :items="['Yes','No']" />
        </UFormField>
        <UFormField label="13.2 Are there separate facilities for women and men?">
          <URadioGroup v-model="form.sanitation.separateFacilities" :items="['Yes','No']" />
        </UFormField>
        <UFormField label="13.3 Do affected families have adequate personal hygiene supplies?">
          <URadioGroup v-model="form.sanitation.haveHygieneSupplies" :items="['Yes','No']" />
        </UFormField>
      </div>


      <UFormField label="13.4 Most immediate need on sanitation (check all that apply)">
        <UCheckboxGroup v-model="form.sanitation.immediateNeeds" :items="SANITATION_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.sanitation.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 14. HEALTH -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">14. HEALTH</h2>
      </template>

      <UFormField label="14.1 Do people have access to Health Services in the community?">
        <URadioGroup v-model="form.health.accessToHealthServices" :items="['Yes','No','Do not know']" />
      </UFormField>

      <UFormField label="14.2 Which health facilities/services are functional?">
        <UCheckboxGroup v-model="form.health.functionalFacilities" :items="HEALTH_FUNCTIONAL_FACILITIES" />
        <div class="mt-3">
          <UInput v-model="form.health.others" placeholder="Others (specify)" />
        </div>
      </UFormField>

      <UFormField label="14.3 What are the main health concerns?">
        <UCheckboxGroup v-model="form.health.mainConcerns" :items="HEALTH_MAIN_CONCERNS" />
        <div class="mt-3">
          <UInput v-model="form.health.others" placeholder="Others (specify)" />
        </div>
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="14.4 Level of availability of medicines and medical supplies in health facilities">
          <URadioGroup v-model="form.health.availability" :items="['Adequate','Inadequate']" />
        </UFormField>
      </div>


      <UFormField label="14.5 Most immediate need on health">
        <UCheckboxGroup v-model="form.health.immediateNeeds" :items="HEALTH_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.health.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 15. NUTRITION -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">15. NUTRITION</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="15.1 Is there information on infants that are exclusively breastfed?">
          <div class="flex gap-4">
            <URadioGroup v-model="form.nutrition.infoExclusiveBreastfeeding" :items="['Yes','No']" />
          </div>
        </UFormField>
        <UFormField label="15.2 Have infant milk products and/or baby bottles/teats been distributed since the start of the emergency?">
          <div class="flex gap-4">
            <URadioGroup v-model="form.nutrition.distributedMilkProducts" :items="['Yes','No']" />
          </div>
        </UFormField>
      </div>

      <UFormField label="15.3 Activities continued without disruption during the emergency">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="flex items-center justify-between">
            <span>Vitamin A capsule supplementation for children 6-59 months</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.nutrition.vitaminAFor6To59" :items="['Yes','No']" />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span>Iron-Folic Acid tablet distribution for pregnant and lactating women</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.nutrition.ironFolicForPLW" :items="['Yes','No']" />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span>Multiple Micronutrient Powders/Iron Syrup/Iron Drops for children 6-23 months of age</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.nutrition.mmnFor6To23" :items="['Yes','No']" />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span>Management of children with moderate and severe acute malnutrition</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.nutrition.manageModerateSevere" :items="['Yes','No']" />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span>Management of Children with severe malnutrition</span>
            <div class="flex gap-3">
              <URadioGroup v-model="form.nutrition.manageSevere" :items="['Yes','No']" />
            </div>
          </div>
        </div>
      </UFormField>


      <UFormField label="15.4 Most immediate need on nutrition (check all that apply)">
        <UCheckboxGroup v-model="form.nutrition.immediateNeeds" :items="NUTRITION_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.nutrition.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 16. PROTECTION -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">16. PROTECTION</h2>
      </template>

      <UFormField label="16.1 Are there cases (reported or not) of violence in the community as a result of the disaster or displacement?">
        <URadioGroup v-model="form.protection.incidentsOfViolence" :items="['Yes','No','Do not know']" />
      </UFormField>

      <UFormField label="16.2 Presence of vulnerable people in the community/EC who need assistance">
        <UCheckboxGroup v-model="form.protection.vulnerablePresence" :items="PROTECTION_VULNERABLE" />
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="16.3 Is there an existing reporting mechanism for protection related incidents?">
          <URadioGroup v-model="form.protection.reportingMechanism" :items="['Yes','No']" />
        </UFormField>
      </div>


      <UFormField label="16.4 Most immediate need for protection essential services">
        <UCheckboxGroup v-model="form.protection.immediateNeeds" :items="PROTECTION_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.protection.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 17. EDUCATION -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">17. EDUCATION</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="17.1 Number of classrooms being used as evacuation centres">
          <UInput v-model.number="form.education.classroomsUsedAsEC" type="number" min="0" />
        </UFormField>
        <UFormField label="17.2 Number of children staying in the evacuation centres">
          <UInput v-model.number="form.education.childrenStayingInEC" type="number" min="0" />
        </UFormField>
        <UFormField label="17.3 Number of destroyed (irreparable) classrooms">
          <UInput v-model.number="form.education.destroyedClassrooms" type="number" min="0" />
        </UFormField>
        <UFormField label="17.4 Number of damaged (repairable) classrooms">
          <UInput v-model.number="form.education.damagedClassrooms" type="number" min="0" />
        </UFormField>
      </div>


      <UFormField label="17.5 Most urgent educational needs (check all that apply)">
        <UCheckboxGroup v-model="form.education.urgentNeeds" :items="EDUCATION_URGENT_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.education.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 18. LIVELIHOOD/EARLY RECOVERY -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">18. LIVELIHOOD/EARLY RECOVERY</h2>
      </template>

      <UFormField label="18.1 What is the main source of livelihood?">
        <UInput v-model="form.livelihood.mainSource" placeholder="e.g., Farming, Fishing, Retail, etc." />
      </UFormField>


      <UFormField label="18.2 Most immediate need on livelihood/early recovery">
        <UCheckboxGroup v-model="form.livelihood.immediateNeeds" :items="LIVELIHOOD_IMMEDIATE_NEEDS" />
        <div class="mt-3">
          <UInput v-model="form.livelihood.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 19. COMMUNITY ENGAGEMENT -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">19. COMMUNITY ENGAGEMENT</h2>
      </template>

      <UFormField label="19.1 Based on observation, does the community receive the information they need to cope with the evolving humanitarian situation?">
        <URadioGroup v-model="form.community.communityReceivesInfo" :items="['Yes','No','Do not know']" />
      </UFormField>

      <UFormField label="19.2 What do affected people want to know most?">
        <UCheckboxGroup v-model="form.community.infoPeopleWant" :items="COMMUNITY_INFO_WANT" />
        <div class="mt-3">
          <UInput v-model="form.community.others" placeholder="Other (specify)" />
        </div>
      </UFormField>

      <UFormField label="19.3 What are the main sources of information?">
        <UCheckboxGroup v-model="form.community.mainSources" :items="COMMUNITY_MAIN_SOURCES" />
        <div class="mt-3">
          <UInput v-model="form.community.others" placeholder="Others (specify)" />
        </div>
      </UFormField>
    </UCard>

    <!-- 20. OVER-ALL ASSESSMENT -->
    <UCard :ui="{ body:  'sm:p-6'  }">
      <template #header>
        <h2 class="text-xl font-bold">20. OVER-ALL ASSESSMENT & SUBMISSION</h2>
      </template>

      <UFormField label="20.1 When you consider the general situation in the area, would you say">
        <URadioGroup v-model="form.overall.assessment" :items="['People are facing serious problems in the area','As a result of the emergency, people will get sick and might even die','As a result of the emergency, many people have already died']" />
      </UFormField>

      <UFormField label="20.2 Please provide general justification for the answer">
        <UTextarea v-model="form.overall.justification" placeholder="Provide detailed justification here..." />
      </UFormField>


      <h3 class="text-lg font-semibold mb-2">Submitted By</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UFormField label="Name">
          <UInput v-model="form.overall.submittedBy.name" />
        </UFormField>
        <UFormField label="Organization">
          <UInput v-model="form.overall.submittedBy.organization" />
        </UFormField>
        <UFormField label="Designation">
          <UInput v-model="form.overall.submittedBy.designation" />
        </UFormField>
        <UFormField label="Contact">
          <UInput v-model="form.overall.submittedBy.contact" />
        </UFormField>
      </div>


      <div class="flex items-center justify-end gap-3 mt-3">
        <UButton color="info" variant="soft" @click="onReset">Reset</UButton>
        <UButton color="primary" icon="i-heroicons-check-circle" @click="downloadPdf" type="submit">Submit RDANA Form</UButton>
      </div>
    </UCard>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
// import FirstPartForm from './RDANA/FirstPartForm.vue'
import { useRDANAFormStore } from '~/stores/useRDANAFormStore'
const { $html2pdf } = useNuxtApp();
// import html2pdf from 'html2pdf.js';
import {
  ACCESS_MEANS,
  ROAD_STATUS,
  ACCESS_NEEDS,
  POWER_DAMAGE_CHECK,
  TELCO_OPS,
  ALT_COMMS,
  COMMS_IMMEDIATE_NEEDS,
  EVAC_PROTECTION_MECHANISMS,
  EVAC_FACILITIES_OPERATIONAL,
  SHELTER_IMMEDIATE_NEEDS,
  FOOD_SOURCES,
  FOOD_IMMEDIATE_NEEDS,
  SANITATION_IMMEDIATE_NEEDS,
  HEALTH_FUNCTIONAL_FACILITIES,
  HEALTH_MAIN_CONCERNS,
  HEALTH_IMMEDIATE_NEEDS,
  PROTECTION_VULNERABLE,
  PROTECTION_IMMEDIATE_NEEDS,
  EDUCATION_URGENT_NEEDS,
  COMMUNITY_INFO_WANT,
  COMMUNITY_MAIN_SOURCES,
} from '~/models/rdana'
import { usePdf } from '~/composables/usePdf';

const rdanaStore = useRDANAFormStore()
const { form } = storeToRefs(rdanaStore)

const errors = ref<string[]>([])
const WATER_IMMEDIATE_NEEDS = ['Jerry cans','Bottled water','Water Distribution/Delivery','Water Purification Device','Cash']
const SRR_TYPES = [
  'Search and Rescue (SAR)',
  'Water Search and Rescue',
  'Urban Search and Rescue (USAR)',
  'Maritime Search and Rescue',
  'Mountain Search and Rescue',
  'Aviation Search and Rescue',
  'Collapsed Structure Search and Rescue',
]
const LAW_THREATS = [
  'Looting',
  'Robbery',
  'Banditry/Hold-up',
  'Kidnapping',
  'Human Trafficking',
  'Violence against Children',
  'Violence against Women',
  'Sexual Abuse',
  'Violence between groups',
  'Violence between families',
  'Juvenile delinquency',
  'Terrorist',
  'Private armies',
  'Extremists',
  'Syndicates/Bandits/Pirates',
  'Other Armed Groups',
  'Others',
]
const LAW_FORCES = [
  'Barangay Tanod (BPSC)',
  'Police (PNP)',
  'Philippine Army/Air Force/Navy/Marine',
  'Coast Guard',
  'Other law enforcement units',
]
const NUTRITION_IMMEDIATE_NEEDS = ['Food', 'Food supplements', 'Bottled water', 'Cash']
const LIVELIHOOD_IMMEDIATE_NEEDS = ['Transport','Debris clearance','Cash for Work','Cash']

function addEvacuationCenter() {
  form.value.evacuation.centers.push({
    name: '', address: '', gps: '', families: null, persons: null,
  })
}
function removeEvacuationCenter(idx: number) {
  form.value.evacuation.centers.splice(idx, 1)
}

function addReliefItem() {
  form.value.relief.items.push({
    organization: '', contactPerson: '', contactDetails: '', assistanceGiven: '', particulars: '', quantity: null, serviceStart: '', serviceEnd: '', familiesServed: null,
  })
}
function removeReliefItem(idx: number) {
  form.value.relief.items.splice(idx, 1)
}

function onReset() {
  rdanaStore.reset()
  errors.value = []
}

function onSubmit(e?: Event) {
  e?.preventDefault()
  const v = rdanaStore.validate()
  errors.value = v.errors
  if (!v.valid) return
  // var element = document.getElementById('rdana-form');
  // html2pdf(element!);
  // In a real app, submit form.asJSON to API
  // For now, log to console
  // eslint-disable-next-line no-console
  // console.log('RDANA SUBMISSION', rdanaStore.asJSON)
}

// ✅ PDF download logic
const downloadPdf = async () => {
  await rdanaStore.store()
  const element = document.getElementById('rdana-form');
  // if (!element) return;
// await usePdf(element)
};
</script>

