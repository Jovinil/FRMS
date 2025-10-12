import { z } from 'zod'

// 🧠 Zod validation for Barangay input
const BarangaySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  population: z.coerce.number().nonnegative('Population must be a number'),
  elevation: z.coerce.number(),
  location: z.string().min(1, 'Location is required'),
  longitude: z.coerce.number(),
  latitude: z.coerce.number(),
})

export default defineEventHandler(async (event) => {
  try {
    // ✅ Parse and validate incoming body
    const body = await readBody(event)
    const validated = BarangaySchema.safeParse(body)

    if (!validated.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid input',
        data: validated.error.flatten(),
      })
    }

    const { name, population, location, elevation, longitude, latitude } = validated.data

    // ✅ Create Barangay in DB
    const barangay = await prisma.barangay.create({
      data: {
        name,
        population,
        location,
        elevation,
        longitude,
        latitude,
      },
    })

    return {
      success: true,
      message: 'Barangay created successfully!',
      barangay,
    }
  } catch (error: any) {
    console.error('❌ Error creating barangay:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create barangay',
    })
  }
})
