<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useThirdBarangayFormStore } from '~/stores/useThirdBarangayForm'
import { useAuthStore } from '~/stores/useAuthStore'

const store = useThirdBarangayFormStore()
const form = store.form

const yesNoItems = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const auth = useAuthStore()
const userId = auth.user?.id
const barangayId = auth.user?.barangayId

// dropdown items for evacuation centers
const evacuationCenterItems = ref<{ label: string; value: string }[]>([])

function nowInput() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

function todayDateInput() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function formatDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

// Converts many inputs into "YYYY-MM-DD HH:mm"
function formatToInput(value: unknown) {
  if (!value) return ''

  if (typeof value === 'string') {
    const s = value.trim()
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(s)) return s
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s)) return s.replace('T', ' ')
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(s)) return s.slice(0, 16)

    const d = new Date(s)
    return Number.isNaN(d.getTime()) ? '' : formatDate(d)
  }

  if (typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? '' : formatDate(d)
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? '' : formatDate(value)
  }

  return ''
}

function isEmpty(v: unknown) {
  return v === null || v === undefined || (typeof v === 'string' && v.trim() === '')
}
function setIfEmpty(getter: () => any, setter: (v: any) => void, value: any) {
  if (isEmpty(getter()) && !isEmpty(value)) setter(value)
}

async function resolveUserBarangayName(): Promise<string | null> {
  // best-effort from auth store first
  const maybe =
    (auth.user as any)?.barangay?.name ??
    (auth.user as any)?.barangayName ??
    (auth.user as any)?.barangay?.label
  if (typeof maybe === 'string' && maybe.trim()) return maybe.trim()

  // fallback: fetch from prisma
  if (!userId) return null
  try {
    const res = await $fetch<{ barangayName: string }>(`/api/user/${userId}/barangay`)
    return res?.barangayName?.trim?.() ?? null
  } catch {
    return null
  }
}

onMounted(async () => {
  // 0) fetch evacuation centers for dropdown
  const centers = await $fetch<Array<{ id: number; name: string }>>('/api/evacuation-centers')
  evacuationCenterItems.value = centers.map((c) => ({ label: c.name, value: c.name }))

  // If no logged-in user, fallback defaults only
  if (!userId) {
    if (!form.profileOfDisaster.dateTimeOfOccurrence) form.profileOfDisaster.dateTimeOfOccurrence = nowInput()
    if (!form.profileOfDisaster.dateTimeOfReport) form.profileOfDisaster.dateTimeOfReport = nowInput()

    setIfEmpty(() => form.evacueeSummary.date, (v) => (form.evacueeSummary.date = v), todayDateInput())
    setIfEmpty(
      () => form.evacueeSummary.typeOfDisaster,
      (v) => (form.evacueeSummary.typeOfDisaster = v),
      form.profileOfDisaster.typeOfDisaster
    )
    return
  }

  // 1) Fetch latest second form submission
  const second = await $fetch<{ createdAt: string; data: any }>('/api/forms/second-barangay/latest', {
    query: { barangayId },
  })
  const s = second?.data ?? {}

  // 2) Map Second -> Third (KEEPING YOUR OTHER DATA)
  setIfEmpty(
    () => form.profileOfDisaster.typeOfDisaster,
    (v) => (form.profileOfDisaster.typeOfDisaster = v),
    s?.profileOfDisaster?.typeOfDisaster
  )

  setIfEmpty(
    () => form.profileOfDisaster.dateTimeOfOccurrence,
    (v) => (form.profileOfDisaster.dateTimeOfOccurrence = v),
    formatToInput(s?.profileOfDisaster?.dateTimeOfOccurrence)
  )

  setIfEmpty(
    () => form.profileOfDisaster.dateTimeOfReport,
    (v) => (form.profileOfDisaster.dateTimeOfReport = v),
    formatToInput(s?.profileOfDisaster?.dateTimeOfReports ?? second?.createdAt)
  )

  setIfEmpty(
    () => form.profileOfDisaster.sourceOfReport,
    (v) => (form.profileOfDisaster.sourceOfReport = v),
    s?.profileOfDisaster?.sourceOfReports
  )

  setIfEmpty(
    () => form.summaryOfEffects.areasAffected,
    (v) => (form.summaryOfEffects.areasAffected = v),
    s?.profileOfDisaster?.areasAffected
  )

  // 3) Summary report of evacuees defaults + new rules
  const barangayName = await resolveUserBarangayName()
  setIfEmpty(() => form.evacueeSummary.barangay, (v) => (form.evacueeSummary.barangay = v), barangayName)

  setIfEmpty(() => form.evacueeSummary.date, (v) => (form.evacueeSummary.date = v), todayDateInput())

  setIfEmpty(
    () => form.evacueeSummary.typeOfDisaster,
    (v) => (form.evacueeSummary.typeOfDisaster = v),
    form.profileOfDisaster.typeOfDisaster
  )

  // 4) final fallback if still empty
  if (!form.profileOfDisaster.dateTimeOfOccurrence) form.profileOfDisaster.dateTimeOfOccurrence = nowInput()
  if (!form.profileOfDisaster.dateTimeOfReport) form.profileOfDisaster.dateTimeOfReport = formatToInput(second?.createdAt) || nowInput()
})

// Keep evacueeSummary.typeOfDisaster synced if still empty
watch(
  () => form.profileOfDisaster.typeOfDisaster,
  (v) => {
    if (isEmpty(form.evacueeSummary.typeOfDisaster) && !isEmpty(v)) {
      form.evacueeSummary.typeOfDisaster = v
    }
  }
)
</script>



<template>
  <div class="space-y-8 mt-6">
    <!-- A. Profile of the Disaster -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">A. Profile of the Disaster</h2>

      <UFormField
        label="1. Type of disaster / Emergency"
        name="profileOfDisaster.typeOfDisaster"
        required
      >
        <UInput v-model="form.profileOfDisaster.typeOfDisaster" />
      </UFormField>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="2. Date and time of occurrence"
          name="profileOfDisaster.dateTimeOfOccurrence"
          required
        >
          <UInput
            v-model="form.profileOfDisaster.dateTimeOfOccurrence"
            placeholder="YYYY-MM-DD HH:mm"
            :readonly="true"
          />
        </UFormField>

        <UFormField
          label="4. Date and time of report"
          name="profileOfDisaster.dateTimeOfReport"
          required
        >
          <UInput
            v-model="form.profileOfDisaster.dateTimeOfReport"
            placeholder="YYYY-MM-DD HH:mm"
            :readonly="true"
          />
        </UFormField>
      </div>

      <UFormField
        label="3. Source of report"
        name="profileOfDisaster.sourceOfReport"
        required
      >
        <UInput v-model="form.profileOfDisaster.sourceOfReport" />
      </UFormField>
    </section>

    <!-- B. Summary of the Effects -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">
        B. Summary of the Effects (as of reporting time)
      </h2>

      <!-- 1. Areas Affected -->
      <UFormField
        label="1. Areas affected (barangays, cities/municipalities, provinces, regions)"
        name="summaryOfEffects.areasAffected"
        required
      >
        <UTextarea
          v-model="form.summaryOfEffects.areasAffected"
          :rows="2"
        />
      </UFormField>

      <!-- 2. Population Affected -->
      <div class="space-y-2">
        <h3 class="font-medium">2. Population affected (cumulative total)</h3>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Families"
            name="summaryOfEffects.populationAffected.families"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationAffected.families"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Persons"
            name="summaryOfEffects.populationAffected.persons"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationAffected.persons"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Children (1–17 yrs)"
            name="summaryOfEffects.populationAffected.childrenAge1to17"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationAffected.childrenAge1to17"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <!-- 3. Population Displaced -->
      <div class="space-y-2">
        <h3 class="font-medium">3. Population displaced (cumulative total)</h3>

        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="Families"
            name="summaryOfEffects.populationDisplaced.families"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationDisplaced.families"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Persons"
            name="summaryOfEffects.populationDisplaced.persons"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationDisplaced.persons"
              type="number"
              min="0"
            />
          </UFormField>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
          <UFormField
            label="Infants (0–1)"
            name="summaryOfEffects.populationDisplaced.infants0to1"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationDisplaced.infants0to1"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Children (2–12)"
            name="summaryOfEffects.populationDisplaced.children2to12"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationDisplaced.children2to12"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Adolescents (13–17)"
            name="summaryOfEffects.populationDisplaced.adolescents13to17"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationDisplaced.adolescents13to17"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Adults (18+)"
            name="summaryOfEffects.populationDisplaced.adults18plus"
          >
            <UInput
              v-model.number="form.summaryOfEffects.populationDisplaced.adults18plus"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <!-- 4. Casualties -->
      <div class="space-y-2">
        <h3 class="font-medium">4. Casualties (cumulative total)</h3>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Dead"
            name="summaryOfEffects.casualties.dead"
          >
            <UInput
              v-model.number="form.summaryOfEffects.casualties.dead"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Injured"
            name="summaryOfEffects.casualties.injured"
          >
            <UInput
              v-model.number="form.summaryOfEffects.casualties.injured"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            label="Missing"
            name="summaryOfEffects.casualties.missing"
          >
            <UInput
              v-model.number="form.summaryOfEffects.casualties.missing"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <!-- 5 & 6 & 7 tables: (same as before, unchanged) -->
    </section>

    <!-- C. Local Actions -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">C. Local Actions</h2>

      <UFormField
        label="1. Emergency responders involved"
        name="localActions.emergencyRespondersInvolved"
      >
        <UTextarea
          v-model="form.localActions.emergencyRespondersInvolved"
          :rows="2"
        />
      </UFormField>

      <UFormField
        label="2. Assets deployed"
        name="localActions.assetsDeployed"
      >
        <UTextarea
          v-model="form.localActions.assetsDeployed"
          :rows="2"
        />
      </UFormField>

      <div class="space-y-2">
        <h3 class="font-medium">3. Number of affected population served</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="Families"
            name="localActions.affectedPopulationServedFamilies"
          >
            <UInput
              v-model.number="form.localActions.affectedPopulationServedFamilies"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Persons"
            name="localActions.affectedPopulationServedPersons"
          >
            <UInput
              v-model.number="form.localActions.affectedPopulationServedPersons"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="font-medium">4. Number of displaced population served</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="Families"
            name="localActions.displacedPopulationServedFamilies"
          >
            <UInput
              v-model.number="form.localActions.displacedPopulationServedFamilies"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Persons"
            name="localActions.displacedPopulationServedPersons"
          >
            <UInput
              v-model.number="form.localActions.displacedPopulationServedPersons"
              type="number"
              min="0"
            />
          </UFormField>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <UFormField
            label="Infants"
            name="localActions.displacedPopulationServedInfants"
          >
            <UInput
              v-model.number="form.localActions.displacedPopulationServedInfants"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Children"
            name="localActions.displacedPopulationServedChildren"
          >
            <UInput
              v-model.number="form.localActions.displacedPopulationServedChildren"
              type="number"
              min="0"
            />
          </UFormField>
          <UFormField
            label="Adults"
            name="localActions.displacedPopulationServedAdults"
          >
            <UInput
              v-model.number="form.localActions.displacedPopulationServedAdults"
              type="number"
              min="0"
            />
          </UFormField>
        </div>
      </div>

      <UFormField
        label="5. Extent of local assistance"
        name="localActions.extentOfLocalAssistance"
      >
        <UTextarea
          v-model="form.localActions.extentOfLocalAssistance"
          :rows="2"
        />
      </UFormField>

      <!-- <UFormField
        label="Signed (BDRRMC Chairman)"
        name="damageAssessmentSignedByChairman"
        required
      >
        <UInput
          v-model="form.damageAssessmentSignedByChairman"
          placeholder="Name of BDRRMC Chairman"
        />
      </UFormField> -->
    </section>

    <!-- SUMMARY REPORT OF EVACUEES (page 4) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">Summary Report of Evacuees</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Date"
          name="evacueeSummary.date"
          required
        >
          <UInput
            v-model="form.evacueeSummary.date"
            placeholder="YYYY-MM-DD"
          />
        </UFormField>

        <UFormField
          label="Barangay"
          name="evacueeSummary.barangay"
          required
        >
          <UInput v-model="form.evacueeSummary.barangay" 
          :readonly="true"
            />
        </UFormField>

        <UFormField
          label="Type of Disaster"
          name="evacueeSummary.typeOfDisaster"
          required
        >
          <UInput v-model="form.evacueeSummary.typeOfDisaster" />
        </UFormField>

        <UFormField
          label="Total number of evacuation center"
          name="evacueeSummary.totalNumberOfEvacuationCenter"
        >
          <UInput
            v-model.number="form.evacueeSummary.totalNumberOfEvacuationCenter"
            type="number"
            min="0"
          />
        </UFormField>
      </div>

      <div class="space-y-2">
        <p class="font-medium text-sm">
          Name of evacuation centers, number of families and persons
        </p>
        <div
          v-for="(center, index) in form.evacueeSummary.centers"
          :key="index"
          class="grid gap-2 md:grid-cols-3 border rounded-lg p-3"
        >
          <p class="text-xs font-semibold">
            #{{ index + 1 }}
          </p>
          <UInputMenu
            class="w-50"
            v-model="center.nameOfEvacuationCenter"
            :items="evacuationCenterItems"
            value-key="value"
            option-attribute="label"
            placeholder="Select evacuation center"
          />


          <!-- <UFormField
            :label="`Name of evacuation center`"
            :name="`evacueeSummary.centers.${index}.nameOfEvacuationCenter`"
          >
            <UInput v-model="center.nameOfEvacuationCenter" />
          </UFormField> -->

          <div class="grid gap-2 md:grid-cols-2 md:col-span-2">
            <UFormField
              :name="`evacueeSummary.centers.${index}.numberOfFamilies`"
              label="No. of families"
            >
              <UInput
                v-model.number="center.numberOfFamilies"
                type="number"
                min="0"
              />
            </UFormField>
            <UFormField
              :name="`evacueeSummary.centers.${index}.numberOfPersons`"
              label="No. of persons"
            >
              <UInput
                v-model.number="center.numberOfPersons"
                type="number"
                min="0"
              />
            </UFormField>
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Total number of families"
          name="evacueeSummary.totalNumberOfFamilies"
        >
          <UInput
            v-model.number="form.evacueeSummary.totalNumberOfFamilies"
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField
          label="Total number of persons"
          name="evacueeSummary.totalNumberOfPersons"
        >
          <UInput
            v-model.number="form.evacueeSummary.totalNumberOfPersons"
            type="number"
            min="0"
          />
        </UFormField>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="Prepared by (Barangay Secretary)"
          name="evacueeSummary.preparedByBarangaySecretary"
        >
          <UInput v-model="form.evacueeSummary.preparedByBarangaySecretary" />
        </UFormField>

        <UFormField
          label="Noted by (Punong Barangay)"
          name="evacueeSummary.notedByPunongBarangay"
        >
          <UInput v-model="form.evacueeSummary.notedByPunongBarangay" />
        </UFormField>
      </div>
    </section>
  </div>
</template>
