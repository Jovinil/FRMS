import { defineEventHandler, getQuery, createError } from 'h3'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

// Converts many inputs into "YYYY-MM-DD HH:mm"
function formatToInput(value: unknown) {
  if (!value) return ''

  if (typeof value === 'string') {
    const s = value.trim()

    // already "YYYY-MM-DD HH:mm"
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(s)) return s

    // "YYYY-MM-DDTHH:mm" -> "YYYY-MM-DD HH:mm"
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s)) return s.replace('T', ' ')

    // "YYYY-MM-DD HH:mm:ss" -> "YYYY-MM-DD HH:mm"
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

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const barangayIdRaw = query.barangayId

  if (!barangayIdRaw) {
    throw createError({ statusCode: 400, statusMessage: 'Missing barangayId' })
  }

  const barangayId =
    typeof barangayIdRaw === 'string'
      ? Number.parseInt(barangayIdRaw, 10)
      : Number(barangayIdRaw)

  if (!Number.isFinite(barangayId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid barangayId' })
  }

  const latest = await prisma.thirdBarangayFormSubmission.findFirst({
    where: { barangayId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      createdAt: true,
      data: true,
      barangay: { select: { name: true } },
    },
  })

  if (!latest) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No third form submission found for this barangay',
    })
  }

  const t: any = latest.data ?? {}

  // --- Third form paths (based on your component)
  const typeOfDisaster = t?.profileOfDisaster?.typeOfDisaster
  const occurrence = t?.profileOfDisaster?.dateTimeOfOccurrence
  const reportTime = t?.profileOfDisaster?.dateTimeOfReport ?? latest.createdAt

  const areasAffected = t?.summaryOfEffects?.areasAffected ?? t?.profileOfDisaster?.areasAffected

  const affectedFamilies = t?.summaryOfEffects?.populationAffected?.families
  const affectedPersons = t?.summaryOfEffects?.populationAffected?.persons

  const displacedFamilies = t?.summaryOfEffects?.populationDisplaced?.families
  const displacedPersons = t?.summaryOfEffects?.populationDisplaced?.persons

  const deadTotal = t?.summaryOfEffects?.casualties?.dead
  const injuredTotal = t?.summaryOfEffects?.casualties?.injured
  const missingTotal = t?.summaryOfEffects?.casualties?.missing

  // --- Build RDANA prefill (ONLY values that Form 3 truly has)
  const prefill = {
    profile: {
      emergencyOperation: {
        // RDANA page 1
        typeOfDisaster: typeOfDisaster ?? undefined,
        dateTimeOfEvent: formatToInput(occurrence) || undefined,
        // nameOfOperation: (Form 3 doesn't have this) -> leave undefined
      },
      mission: {
        // Form 3 can give barangay (prefer relation name)
        barangay: latest.barangay?.name ?? t?.evacueeSummary?.barangay ?? undefined,
        // region/province/city/sitio/gps not in Form 3 -> leave undefined
        dateTimeOfRdana: formatToInput(reportTime) || undefined, // reasonable: RDANA time = report time
      },
      // best-effort summary: use "areas affected" text if available
      summaryDescription: areasAffected ?? undefined,
    },

    initialImpact: {
      // RDANA page 2
      affectedFamilies: affectedFamilies ?? undefined,
      affectedPersons: affectedPersons ?? undefined,

      // Form 3 only has displaced totals, RDANA splits inside/outside ECs.
      // We DO NOT guess. We leave them undefined unless you explicitly want to map totals -> inside ECs.
      // displacedFamiliesInsideECs: undefined,
      // displacedPersonsInsideECs: undefined,
      // displacedFamiliesOutsideECs: undefined,
      // displacedPersonsOutsideECs: undefined,

      missingTotal: missingTotal ?? undefined,
      injuredTotal: injuredTotal ?? undefined,
      deadTotal: deadTotal ?? undefined,
    },
  }

  return {
    source: { id: latest.id, createdAt: latest.createdAt },
    prefill,
  }
})
