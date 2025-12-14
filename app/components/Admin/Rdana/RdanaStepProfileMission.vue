<script setup lang="ts">
import { onMounted } from 'vue'
import { useRdanaFormStore } from '~/stores/useFirstRdanaForm'
import { useAuthStore } from '~/stores/useAuthStore'

const store = useRdanaFormStore()
const form = store.form

const auth = useAuthStore()

const THIRD_LATEST_URL: string = '/api/forms/third-barangay/latest'
const formatNowForInput = () => {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}`
}

function isEmpty(v: unknown) {
  return v === null || v === undefined || (typeof v === 'string' && v.trim() === '')
}

function setIfEmpty(getter: () => any, setter: (v: any) => void, value: any) {
  if (isEmpty(getter()) && !isEmpty(value)) setter(value)
}

// (optional) normalize strings into "YYYY-MM-DD HH:mm"
function formatToInput(value: unknown) {
  if (!value) return ''
  if (typeof value === 'string') {
    const s = value.trim()
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(s)) return s
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s)) return s.replace('T', ' ')
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(s)) return s.slice(0, 16)

    const d = new Date(s)
    if (!Number.isNaN(d.getTime())) return formatNowForInput() // fallback
    return ''
  }
  if (value instanceof Date) return formatNowForInput()
  if (typeof value === 'number') return formatNowForInput()
  return ''
}

onMounted(async () => {
  // 1) Date & Time of RDANA = NOW (only if empty)
  setIfEmpty(
    () => form.profile.mission.dateTimeOfRdana,
    (v) => (form.profile.mission.dateTimeOfRdana = v),
    formatNowForInput()
  )

  // Resolve barangayId from auth store (adjust to your auth shape)
  const barangayId =
    (auth.user as any)?.barangayId ??
    (auth.user as any)?.barangay?.id

  // 2) From user's barangayId: region/province/city/barangay/sitio/gps
  if (barangayId) {
    try {
      const BARANGAY_URL: string = `/api/barangay/${barangayId}`

      const b = await $fetch<any>(BARANGAY_URL)

      setIfEmpty(() => form.profile.mission.region, (v) => (form.profile.mission.region = v), b.region)
      setIfEmpty(() => form.profile.mission.province, (v) => (form.profile.mission.province = v), b.province)
      setIfEmpty(
        () => form.profile.mission.cityMunicipality,
        (v) => (form.profile.mission.cityMunicipality = v),
        b.cityMunicipality
      )
      setIfEmpty(() => form.profile.mission.barangay, (v) => (form.profile.mission.barangay = v), b.barangay)
      setIfEmpty(
        () => form.profile.mission.sitioPurok,
        (v) => (form.profile.mission.sitioPurok = v),
        b.sitioPurok
      )

      // gpsCoordinate wants longitude + latitude (you asked for "longitude and latitude")
      if (!isEmpty(b.longitude) && !isEmpty(b.latitude)) {
        const gps = `${b.longitude}, ${b.latitude}` // lng, lat
        setIfEmpty(
          () => form.profile.mission.gpsCoordinate,
          (v) => (form.profile.mission.gpsCoordinate = v),
          gps
        )
      }
    } catch (e) {
      console.warn('Failed to fetch barangay info:', e)
    }

    // 3) Date & Time of Event = incident date from Form 3
    try {
      const third = await $fetch<any>(THIRD_LATEST_URL, {
        query: { barangayId: String(barangayId) },
      })

      const incident = formatToInput(third?.data?.profileOfDisaster?.dateTimeOfOccurrence)

      setIfEmpty(
        () => form.profile.emergencyOperation.dateTimeOfEvent,
        (v) => (form.profile.emergencyOperation.dateTimeOfEvent = v),
        incident
      )
    } catch (e) {
      // If none exists yet, keep your current default behavior
      console.warn('No Form 3 to prefill from:', e)
      setIfEmpty(
        () => form.profile.emergencyOperation.dateTimeOfEvent,
        (v) => (form.profile.emergencyOperation.dateTimeOfEvent = v),
        formatNowForInput()
      )
    }
  } else {
    // no barangayId → fallback only
    setIfEmpty(
      () => form.profile.emergencyOperation.dateTimeOfEvent,
      (v) => (form.profile.emergencyOperation.dateTimeOfEvent = v),
      formatNowForInput()
    )
  }
})
</script>


<template>
  <div class="space-y-6 mt-6">
    <!-- 1.1 Emergency Operation -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">1.1 Emergency Operation</h2>

      <UFormField
        label="1.1.1 Name of Operation/Event"
        name="profile.emergencyOperation.nameOfOperation"
      >
        <UInput
          v-model="form.profile.emergencyOperation.nameOfOperation"
          placeholder="Enter name of operation or event"
        />
      </UFormField>

      <UFormField
        label="1.1.2 Type of Disaster/Event"
        name="profile.emergencyOperation.typeOfDisaster"
      >
        <UInput
          v-model="form.profile.emergencyOperation.typeOfDisaster"
          placeholder="e.g. Flood, Earthquake, Typhoon"
        />
      </UFormField>

      <UFormField
        label="1.1.3 Date and Time of Event"
        name="profile.emergencyOperation.dateTimeOfEvent"
      >
        <UInput
          v-model="form.profile.emergencyOperation.dateTimeOfEvent"
          placeholder="YYYY-MM-DD HH:mm"
          readonly
        />
      </UFormField>
    </section>

    <!-- 1.2 RDANA Mission -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">1.2 RDANA Mission</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <UFormField
          label="1.2.1 Region"
          name="profile.mission.region"
          required
        >
          <UInput v-model="form.profile.mission.region" />
        </UFormField>

        <UFormField
          label="1.2.2 Province"
          name="profile.mission.province"
          required
        >
          <UInput v-model="form.profile.mission.province" />
        </UFormField>

        <UFormField
          label="1.2.3 City/Municipality"
          name="profile.mission.cityMunicipality"
          required
        >
          <UInput v-model="form.profile.mission.cityMunicipality" />
        </UFormField>

        <UFormField
          label="1.2.4 Barangay"
          name="profile.mission.barangay"
          required
        >
          <UInput v-model="form.profile.mission.barangay" />
        </UFormField>

        <UFormField
          label="1.2.5 Sitio/Purok"
          name="profile.mission.sitioPurok"
        >
          <UInput v-model="form.profile.mission.sitioPurok" />
        </UFormField>

        <UFormField
          label="1.2.6 GPS Coordinate"
          name="profile.mission.gpsCoordinate"
        >
          <UInput v-model="form.profile.mission.gpsCoordinate" />
        </UFormField>
      </div>

      <UFormField
        label="Date and Time of RDANA"
        name="profile.mission.dateTimeOfRdana"
        required
      >
        <UInput
          v-model="form.profile.mission.dateTimeOfRdana"
          placeholder="YYYY-MM-DD HH:mm"
        />
      </UFormField>
    </section>

    <!-- 1.3 Local Authorities -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">
        1.3 Local Authorities / Persons Interviewed
      </h2>

      <div
        v-for="(person, index) in form.profile.localAuthorities"
        :key="index"
        class="space-y-3 border rounded-xl p-4"
      >
        <div class="flex items-center justify-between">
          <p class="font-medium">
            Person {{ index + 1 }}
          </p>
          <!-- (Optional) Remove button if you want dynamic rows -->
          <!--
          <UButton
            color="red"
            size="xs"
            variant="ghost"
            icon="i-heroicons-trash"
            @click="form.profile.localAuthorities.splice(index, 1)"
          />
          -->
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            :name="`profile.localAuthorities.${index}.name`"
            label="1.3.1 Name"
            required
          >
            <UInput v-model="person.name" />
          </UFormField>

          <UFormField
            :name="`profile.localAuthorities.${index}.age`"
            label="1.3.2 Age"
          >
            <UInput
              v-model.number="person.age"
              type="number"
              min="0"
            />
          </UFormField>

          <UFormField
            :name="`profile.localAuthorities.${index}.officeOrganization`"
            label="1.3.3 Office/Organization"
          >
            <UInput v-model="person.officeOrganization" />
          </UFormField>

          <UFormField
            :name="`profile.localAuthorities.${index}.designation`"
            label="1.3.4 Designation"
          >
            <UInput v-model="person.designation" />
          </UFormField>

          <UFormField
            :name="`profile.localAuthorities.${index}.phoneNumber`"
            label="1.3.5 Phone number"
          >
            <UInput v-model="person.phoneNumber" />
          </UFormField>

          <UFormField
            :name="`profile.localAuthorities.${index}.email`"
            label="1.3.6 Email"
          >
            <UInput v-model="person.email" />
          </UFormField>
        </div>
      </div>

      <!-- Optional add-person button -->
      <!--
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-plus"
        @click="form.profile.localAuthorities.push({
          name: '',
          age: null,
          officeOrganization: '',
          designation: '',
          phoneNumber: '',
          email: ''
        })"
      >
        Add Person
      </UButton>
      -->
    </section>

    <!-- 1.4 Summary Description -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold">
        1.4 Summary Description of Disaster / Incident
      </h2>
      <UFormField
        label="Summary Description (Impact and Location)"
        name="profile.summaryDescription"
      >
        <UTextarea
          v-model="form.profile.summaryDescription"
          :rows="4"
        />
      </UFormField>
    </section>
  </div>
</template>