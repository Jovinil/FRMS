

type OverallStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'

type BarangayIncidentRow = {
  id: number
  referenceCode: string
  type: string
  incidentDatetime: string
  overallStatus: OverallStatus
  currentFormType: string | null
  deadlineAt: string | null
}

const FORM_DEADLINES_HOURS = {
  B_FORM_1: 2,   // 2 hours
  B_FORM_2: 12,  // 12 hours
  B_FORM_3: 24,  // 24 hours
}

// safe getter: "a.b.c"
function get(obj: any, path: string, fallback: any = '') {
  if (!obj) return fallback
  return (
    path.split('.').reduce((acc, key) => {
      if (acc && acc[key] !== undefined && acc[key] !== null) return acc[key]
      return undefined
    }, obj) ?? fallback
  )
}

// parse "YYYY-MM-DD HH:mm" → Date | null
function parseYmdHm(str: string): Date | null {
  if (!str) return null
  const [datePart, timePart] = str.trim().split(' ')
  if (!datePart || !timePart) return null

  const [yStr, mStr, dStr] = datePart.split('-')
  const [hStr, minStr] = timePart.split(':')

  const year = Number(yStr)
  const month = Number(mStr)
  const day = Number(dStr)
  const hour = Number(hStr)
  const minute = Number(minStr)

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    !Number.isFinite(hour) ||
    !Number.isFinite(minute)
  ) {
    return null
  }

  return new Date(year, month - 1, day, hour, minute)
}

export default defineEventHandler(async () => {
  const [firstList, secondList, thirdList] = await Promise.all([
    prisma.firstBarangayFormSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        submittedAt: true,
        data: true,
      },
    }),
    prisma.secondBarangayFormSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        submittedAt: true,
        data: true,
      },
    }),
    prisma.thirdBarangayFormSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        submittedAt: true,
        data: true,
      },
    }),
  ])

  const rows: BarangayIncidentRow[] = []
  let rowId = 1
  const now = new Date()

  function buildRow(opts: {
    source: 'FIRST' | 'SECOND' | 'THIRD'
    rec: {
      id: string
      createdAt: Date
      submittedAt: Date | null
      data: any
    }
  }): BarangayIncidentRow {
    const { source, rec } = opts
    const data = rec.data as any

    // 1) Incident type
    let type = 'Unknown'
    if (source === 'FIRST') {
      type = get(data, 'incidentProfile.what', '') || 'Unknown'
    } else {
      type = get(data, 'profileOfDisaster.typeOfDisaster', '') || 'Unknown'
    }

    // 2) Incident datetime
    let incidentDatetime: Date
    let dateStr = ''

    if (source === 'FIRST') {
      dateStr = get(data, 'incidentProfile.when', '')
    } else {
      dateStr = get(data, 'profileOfDisaster.dateTimeOfOccurrence', '')
    }

    const parsed = parseYmdHm(dateStr)
    incidentDatetime = parsed ?? rec.createdAt

    // 3) Per-form deadline and code
    let formKey: keyof typeof FORM_DEADLINES_HOURS
    let formCode: string

    if (source === 'FIRST') {
      formKey = 'B_FORM_1'
      formCode = 'B_FORM_1'
    } else if (source === 'SECOND') {
      formKey = 'B_FORM_2'
      formCode = 'B_FORM_2'
    } else {
      formKey = 'B_FORM_3'
      formCode = 'B_FORM_3'
    }

    const deadline = new Date(
      incidentDatetime.getTime() + FORM_DEADLINES_HOURS[formKey] * 60 * 60 * 1000,
    )

    // 4) Status (BUT currentFormType always stays as the form code)
    let overallStatus: OverallStatus

    if (rec.submittedAt) {
      overallStatus = 'COMPLETED'
    } else if (deadline < now) {
      overallStatus = 'OVERDUE'
    } else {
      overallStatus = 'IN_PROGRESS'
    }

    const currentFormType = formCode
    const deadlineAt = deadline.toISOString()

    // 5) Reference code
    const prefix =
      source === 'FIRST'
        ? 'B1'
        : source === 'SECOND'
          ? 'B2'
          : 'B3'

    const referenceCode = `${prefix}-${rec.id.slice(0, 8).toUpperCase()}`

    return {
      id: rowId++,
      referenceCode,
      type,
      incidentDatetime: incidentDatetime.toISOString(),
      overallStatus,
      currentFormType,
      deadlineAt,
    }
  }

  for (const rec of firstList) {
    rows.push(buildRow({ source: 'FIRST', rec }))
  }
  for (const rec of secondList) {
    rows.push(buildRow({ source: 'SECOND', rec }))
  }
  for (const rec of thirdList) {
    rows.push(buildRow({ source: 'THIRD', rec }))
  }

  return rows
})
