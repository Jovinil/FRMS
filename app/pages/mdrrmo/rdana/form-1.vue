<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRdanaForm } from '~/composables/useFirstRdanaForm'
import type { RdanaForm } from '~/models/firstRdanaForm'
import { useAuthStore } from '~/stores/useAuthStore'

const { form, schema, steps, currentStep, nextStep, prevStep, submit, reset } = useRdanaForm()

const totalSteps = computed(() => steps.length)

const progress = computed(() => {
  if (!totalSteps.value) return 0
  return Math.round(((currentStep.value + 1) / totalSteps.value) * 100)
})

const currentStepLabel = computed(() => {
  const step = steps[currentStep.value]
  return step?.label || `Step ${currentStep.value + 1}`
})

async function onSubmit() {
  // await downloadRdanaPdf(form.value)
  await submit()
}

const isDownloading = ref(false)
const formData = ref<RdanaForm | null>(null)

async function downloadRdanaPdf(formData: RdanaForm) {
  const res = await fetch('/api/rdana-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!res.ok) throw new Error('Failed to generate RDANA PDF')

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'RDANA.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()

  window.URL.revokeObjectURL(url)
}

async function handleDownload() {
  if (!formData.value) return
  try {
    isDownloading.value = true
    await downloadRdanaPdf(formData.value)
  } finally {
    isDownloading.value = false
  }
}

/* ---------------------------
   ✅ PREFILL FROM FORM 3
   (only fields Form 3 has data about)
---------------------------- */

const auth = useAuthStore()

function isEmpty(v: unknown) {
  return v === null || v === undefined || (typeof v === 'string' && v.trim() === '')
}

function setIfEmpty(getter: () => any, setter: (v: any) => void, value: any) {
  if (isEmpty(getter()) && !isEmpty(value)) setter(value)
}

function clamp0(n: unknown) {
  if (n === null || n === undefined) return null
  const v = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(v)) return null
  return Math.max(0, v)
}

async function resolveBarangayId(): Promise<number | null> {
  const direct =
    (auth.user as any)?.barangayId ??
    (auth.user as any)?.barangay?.id ??
    null

  if (Number.isFinite(direct)) return Number(direct)

  // optional fallback if you have an endpoint for this
  const userId = (auth.user as any)?.id
  if (!userId) return null

  try {
    const res = await $fetch<{ barangayId: number }>(`/api/users/${userId}/barangay`)
    return Number.isFinite(res?.barangayId) ? res.barangayId : null
  } catch {
    return null
  }
}

onMounted(async () => {
  const idForLatest = useAuthStore().user?.barangayId
  if (!idForLatest) return

  // expects: { createdAt, data } from prisma ThirdBarangayFormSubmission latest by barangayId
  let third: { createdAt: string; data: any } | null = null

  try {
    type ThirdLatest = { id: string; createdAt: string; data: any }

    const url: string = '/api/forms/third-barangay/latest'

    third = await $fetch<ThirdLatest>(url, {  
  query: { barangayId: String(idForLatest) },
})

  } catch (e) {
    console.warn('Failed to prefill from Form 3:', e)
    return
  }

  const t = third?.data ?? {}
  const f = form.value

  // ----------------
  // RDANA Page 1: Profile / Mission
  // ----------------
  setIfEmpty(
    () => f.profile.emergencyOperation.typeOfDisaster,
    (v) => (f.profile.emergencyOperation.typeOfDisaster = v),
    t?.profileOfDisaster?.typeOfDisaster
  )

  setIfEmpty(
    () => f.profile.emergencyOperation.dateTimeOfEvent,
    (v) => (f.profile.emergencyOperation.dateTimeOfEvent = v),
    t?.profileOfDisaster?.dateTimeOfOccurrence
  )

  // safest barangay source in Form 3
  setIfEmpty(
    () => f.profile.mission.barangay,
    (v) => (f.profile.mission.barangay = v),
    t?.evacueeSummary?.barangay
  )

  // best "RDANA time" you have is Form 3 report datetime
  setIfEmpty(
    () => f.profile.mission.dateTimeOfRdana,
    (v) => (f.profile.mission.dateTimeOfRdana = v),
    t?.profileOfDisaster?.dateTimeOfReport
  )

  // optional: auto summary from known fields
  if (isEmpty(f.profile.summaryDescription)) {
    const areas = t?.summaryOfEffects?.areasAffected
    const source = t?.profileOfDisaster?.sourceOfReport
    const parts = [
      areas ? `Areas affected: ${areas}` : '',
      source ? `Source of report: ${source}` : '',
    ].filter(Boolean)

    if (parts.length) f.profile.summaryDescription = parts.join('\n')
  }
})
</script>


<template>
  <div class="">
    <div class="mx-auto max-w-6xl p-6 space-y-6">
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-700">
                Field Assessment
              </p>
              <h1 class="text-2xl font-semibold text-gray-900">
                RDANA Form 1 (72 Hours)
              </h1>
              <p class="text-sm text-gray-600">
                Rapid Damage and Needs Assessment for incident command use.
              </p>
            </div>

            <div class="text-right space-y-1">
              <p class="text-sm font-medium text-gray-700">
                {{ currentStepLabel }}
              </p>
              <p class="text-xs text-gray-500">
                Step {{ currentStep + 1 }} of {{ totalSteps }}
              </p>
              <div class="h-2 w-44 rounded-full bg-gray-100 overflow-hidden">
                <div
                  class="h-full bg-emerald-500 transition-[width] duration-300 ease-out"
                  :style="{ width: `${progress}%` }"
                />
              </div>
            </div>
          </div>
        </template>

        <div class="space-y-6">
          <div class="rounded-xl border border-gray-100 p-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div class="flex items-center gap-2 text-gray-700">
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                  {{ currentStep + 1 }}
                </span>
                <span class="text-sm font-medium">
                  {{ currentStepLabel }}
                </span>
              </div>
              <p class="text-xs text-gray-500">
                Complete each section before proceeding. You can revisit previous steps anytime.
              </p>
            </div>

            <div class="pt-3">
              <USteps v-model="currentStep" :items="steps" class="mb-4" />

              <UForm :schema="schema" :state="form" @submit="onSubmit">
                <div class="space-y-4">
                  <AdminRdanaStepProfileMission v-if="currentStep === 0" />
                  <AdminRdanaStepInitialImpact v-else-if="currentStep === 1" />
                  <AdminRdanaStepAccessibilityPower v-else-if="currentStep === 2" />
                  <AdminRdanaStepCommunicationsEvac v-else-if="currentStep === 3" />
                  <AdminRdanaStepReliefSrr v-else-if="currentStep === 4" />
                  <AdminRdanaStepLawOrderShelter v-else-if="currentStep === 5" />
                  <AdminRdanaStepFoodWaterSanitation v-else-if="currentStep === 6" />
                  <AdminRdanaStepHealthNutrition v-else-if="currentStep === 7" />
                  <AdminRdanaStepProtectionEducation v-else-if="currentStep === 8" />
                  <AdminRdanaStepLivelihoodEngagementOverall v-else-if="currentStep === 9" />
                  <AdminRdanaStepSubmittedBy v-else-if="currentStep === 10" />
                </div>

                <div class="sticky bottom-0 left-0 right-0 mt-6 -mx-4 rounded-b-xl border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
                  <div class="flex items-center justify-between gap-3">
                    <div class="text-xs text-gray-500">
                      Review entries before submitting. Progress saves within this session.
                    </div>
                    <div class="ml-auto flex flex-wrap items-center gap-2">
                      <UButton
                        v-if="currentStep > 0"
                        color="warning"
                        variant="ghost"
                        type="button"
                        @click="prevStep"
                      >
                        Previous
                      </UButton>

                      <UButton
                        color="error"
                        variant="ghost"
                        type="button"
                        @click="reset"
                      >
                        Reset
                      </UButton>

                      <UButton
                        v-if="currentStep < steps.length - 1"
                        color="warning"
                        type="button"
                        @click="nextStep"
                      >
                        Next
                      </UButton>

                      <UButton
                        v-else
                        color="info"
                        type="submit"
                      >
                        Submit
                      </UButton>
                    </div>
                  </div>
                </div>
              </UForm>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
