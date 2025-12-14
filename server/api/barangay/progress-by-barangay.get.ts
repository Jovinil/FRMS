import { eventHandler, getQuery, createError } from 'h3'

type LatestType =
  | 'FIRST_BARANGAY'
  | 'SECOND_BARANGAY'
  | 'THIRD_BARANGAY'
  | 'FIRST_RDANA'
  | 'NONE'

type LatestRow = {
  type: LatestType
  id: string
  submittedAt: Date | null
  createdAt: Date
}

function effectiveDate(row: LatestRow) {
  // Prefer submittedAt if you set it on submit, otherwise fallback to createdAt
  return row.submittedAt ?? row.createdAt
}

export default eventHandler(async (event) => {
  const q = getQuery(event)

  const rawBarangayId = q.barangayId
  if (!rawBarangayId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'barangayId is required',
    })
  }

  const barangayId = Number(rawBarangayId)
  if (!Number.isFinite(barangayId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'barangayId must be a number',
    })
  }

  // Pull the latest submission per table (4 queries), then compare in JS
  const [first, second, third, rdana] = await prisma.$transaction([
    prisma.firstBarangayFormSubmission.findFirst({
      where: { barangayId },
      orderBy: [{ submittedAt: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, submittedAt: true, createdAt: true },
    }),
    prisma.secondBarangayFormSubmission.findFirst({
      where: { barangayId },
      orderBy: [{ submittedAt: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, submittedAt: true, createdAt: true },
    }),
    prisma.thirdBarangayFormSubmission.findFirst({
      where: { barangayId },
      orderBy: [{ submittedAt: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, submittedAt: true, createdAt: true },
    }),
    prisma.firstRdanaSubmission.findFirst({
      where: { barangayId },
      orderBy: [{ submittedAt: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, submittedAt: true, createdAt: true },
    }),
  ])

  const candidates: LatestRow[] = [
    first && { type: 'FIRST_BARANGAY', ...first },
    second && { type: 'SECOND_BARANGAY', ...second },
    third && { type: 'THIRD_BARANGAY', ...third },
    rdana && { type: 'FIRST_RDANA', ...rdana },
  ].filter(Boolean) as LatestRow[]

  // If no submission at all -> do nothing
  if (candidates.length === 0) {
    return null
  }

  // Pick the latest among the 4 tables
  candidates.sort((a, b) => effectiveDate(b).getTime() - effectiveDate(a).getTime())
  const latest = candidates[0]

  // If latest is FirstRdanaSubmission -> do nothing
  if (latest.type === 'FIRST_RDANA') {
    return null
  }

  // Deadlines based on latest type
  const DEADLINES_MS: Record<
    Exclude<LatestType, 'FIRST_RDANA' | 'NONE'>,
    { nextType: LatestType; windowMs: number; nextLabel: string }
  > = {
    FIRST_BARANGAY: {
      nextType: 'SECOND_BARANGAY',
      windowMs: 12 * 60 * 60 * 1000,
      nextLabel: 'Second Barangay Submission',
    },
    SECOND_BARANGAY: {
      nextType: 'THIRD_BARANGAY',
      windowMs: 24 * 60 * 60 * 1000,
      nextLabel: 'Third Barangay Submission',
    },
    THIRD_BARANGAY: {
      nextType: 'FIRST_RDANA',
      windowMs: 72 * 60 * 60 * 1000,
      nextLabel: 'First RDANA Submission',
    },
  }

  const rule = DEADLINES_MS[latest.type]
  if (!rule) return null

  const latestAt = effectiveDate(latest)
  return {
    barangayId,
    latest: {
      type: latest.type,
      id: latest.id,
      submittedAt: latest.submittedAt,
      createdAt: latest.createdAt,
      effectiveAt: latestAt,
    },
    next: {
      type: rule.nextType,
      label: rule.nextLabel,
      windowMs: rule.windowMs,
      deadlineAt: new Date(latestAt.getTime() + rule.windowMs),
    },
  }
})
