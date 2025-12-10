
type MdrrmoFormRow = {
  id: number
  referenceCode: string
  incidentId: number
  incidentType: string
  barangay: string
  incidentDatetime: string
  deadlineAt: string
  submittedAt: string | null
}

// helper to get nested property like "mission.barangay"
function get(obj: any, path: string, fallback: any = '') {
  if (!obj || !path) return fallback
  return (
    path.split('.').reduce((acc, key) => {
      if (acc && acc[key] !== undefined && acc[key] !== null) return acc[key]
      return undefined
    }, obj) ?? fallback
  )
}

export default defineEventHandler(async () => {
  const submissions = await prisma.firstRdanaSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      profileMission: true,
      submittedAt: true,
      createdAt: true,
    },
  })

  const rows: MdrrmoFormRow[] = submissions.map((s, idx) => {
    const pmRaw = (s.profileMission as any) || {}

    // 👇 support both shapes:
    // - new:   profileMission = { profile: { emergencyOperation, mission, ... } }
    // - older: profileMission = { emergencyOperation, mission, ... }
    const pm = pmRaw.profile ?? pmRaw

    // ✅ incident type from emergencyOperation.typeOfDisaster
    const incidentType: string =
      get(pm, 'emergencyOperation.typeOfDisaster', '') ||
      get(pm, 'emergencyOperation.hazardType', '') || // fallback if you renamed
      ''

    // ✅ barangay from mission.barangay
    const barangay: string =
      get(pm, 'mission.barangay', '') ||
      get(pm, 'mission.barangayName', '') ||
      ''

    // ✅ incident datetime from emergencyOperation.dateTimeOfEvent, with safe fallback
    const incidentDatetimeStr: string =
      get(pm, 'emergencyOperation.dateTimeOfEvent', '') ||
      ''

    let incidentDatetime: Date

    if (incidentDatetimeStr) {
      const parsed = new Date(incidentDatetimeStr)
      // if invalid, fall back to createdAt
      incidentDatetime = isNaN(parsed.getTime()) ? s.createdAt : parsed
    } else {
      // nothing in JSON → use createdAt as best guess
      incidentDatetime = s.createdAt
    }

    // 72-hour deadline from incidentDatetime
    const deadlineDate = new Date(
      incidentDatetime.getTime() + 72 * 60 * 60 * 1000,
    )

    // fallback reference code
    const referenceCode: string =
      get(pm, 'referenceCode', '') ||
      `RDANA-${s.id.slice(0, 8).toUpperCase()}`

    const incidentId = idx + 1

    return {
      id: incidentId,
      referenceCode,
      incidentId,
      incidentType,
      barangay,
      incidentDatetime: incidentDatetime.toISOString(),
      deadlineAt: deadlineDate.toISOString(),
      submittedAt: s.submittedAt ? s.submittedAt.toISOString() : null,
    }
  })

  return rows
})
