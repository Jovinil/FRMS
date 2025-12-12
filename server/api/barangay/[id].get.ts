import { defineEventHandler, getRouterParam, createError } from 'h3'

function decimalToNumber(v: any): number | null {
  if (v === null || v === undefined) return null

  // Prisma Decimal can stringify; depending on runtime it may be { toString() } or already string/number
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }
  if (typeof v === 'object' && typeof v.toString === 'function') {
    const n = Number(v.toString())
    return Number.isFinite(n) ? n : null
  }

  return null
}

export default defineEventHandler(async (event) => {
  const idRaw = getRouterParam(event, 'id')
  const id = Number.parseInt(String(idRaw), 10)

  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid barangay id' })
  }

  const barangay = await prisma.barangay.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      province: true,
      city: true,
      purok: true,
      location: true,
      longitude: true,
      latitude: true,
    },
  })

  if (!barangay) {
    throw createError({ statusCode: 404, statusMessage: 'Barangay not found' })
  }

  const longitude = decimalToNumber(barangay.longitude)
  const latitude = decimalToNumber(barangay.latitude)

  return {
    // RDANA expects these names:
    region: '', // not available in schema, return empty string
    province: barangay.province ?? '',
    cityMunicipality: barangay.city ?? '',
    barangay: barangay.name ?? '',
    sitioPurok: barangay.purok ?? '',

    // keep extra useful fields too
    location: barangay.location ?? '',

    longitude,
    latitude,

    // optional: a ready-to-use string for gpsCoordinate
    gpsCoordinate: longitude != null && latitude != null ? `${longitude}, ${latitude}` : '',
  }
})
