import { z } from 'zod'

const EvacCenterCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  capacity: z.coerce.number().int().positive('Capacity must be > 0'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),

  // Optional fields (add/remove depending on your Prisma model)
  address: z.string().optional(),
  barangayId: z.coerce.number().int().positive().optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = EvacCenterCreateSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      data: parsed.error.flatten(),
    })
  }

  const data = parsed.data

  const created = await prisma.evacuationCenter.create({
    data: {
      name: data.name,
      capacity: data.capacity,
      latitude: data.latitude,
      longitude: data.longitude,

      // Only include if they exist in your Prisma schema
      ...(data.address ? { address: data.address } : {}),
      ...(data.barangayId ? { barangayId: data.barangayId } : {}),
    } as any,
  })

  return { ok: true, evacuationCenter: created }
})
