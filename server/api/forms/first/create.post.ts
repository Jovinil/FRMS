// server/api/rdana-form.post.ts
import { readBody, createError } from 'h3'
import { Prisma } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

type Body = {
  // optional, used as fallback if we can't resolve DB user from auth
  userId?: number
  barangayId?: number

  // pages / sections (support old + new key names)
  profileMission?: any
  profile?: any
  initialImpact?: any

  accessibility?: any
  power?: any

  communications?: any
  evacuation?: any

  relief?: any
  srr?: any

  lawAndOrder?: any
  shelter?: any

  foodSecurity?: any
  waterSupply?: any
  sanitation?: any

  health?: any
  nutrition?: any

  protection?: any
  education?: any

  livelihood?: any
  communityEngagement?: any
  overallAssessment?: any

  submittedBy?: any
}

export default defineEventHandler(async (event) => {
  try {
    const authUser = await serverSupabaseUser(event).catch(() => null)

    if (!authUser) {
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
    }

    const body = (await readBody<Body>(event)) ?? {}

    // ------------------------------------------------------------
    // 1) Resolve local DB user (Int) + barangayId (Int)
    // ------------------------------------------------------------
    // Best-effort: match by email (adjust if you have a different linkage)
    let dbUser:
      | { id: number; barangayId: number | null }
      | null = null

    if (authUser.email) {
      dbUser = await prisma.user.findUnique({
        where: { email: authUser.email },
        select: { id: true, barangayId: true },
      })
    }

    const userId =
      dbUser?.id ??
      (typeof body.userId === 'number' ? body.userId : null)

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Unable to resolve userId. Ensure your DB User exists (email match) or send body.userId.',
      })
    }

    const barangayId =
      dbUser?.barangayId ??
      (typeof body.barangayId === 'number' ? body.barangayId : null)

    if (!barangayId) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Unable to resolve barangayId. Assign barangay to the user or send body.barangayId.',
      })
    }

    // ------------------------------------------------------------
    // 2) Build combined JSON chunks (store undefined when empty)
    // ------------------------------------------------------------
    const accessibilityPower =
      body.accessibility || body.power
        ? {
            accessibility: body.accessibility ?? null,
            power: body.power ?? null,
          }
        : undefined

    const communicationsEvac =
      body.communications || body.evacuation
        ? {
            communications: body.communications ?? null,
            evacuation: body.evacuation ?? null,
          }
        : undefined

    const reliefSrr =
      body.relief || body.srr
        ? {
            relief: body.relief ?? null,
            srr: body.srr ?? null,
          }
        : undefined

    const lawOrderShelter =
      body.lawAndOrder || body.shelter
        ? {
            lawAndOrder: body.lawAndOrder ?? null,
            shelter: body.shelter ?? null,
          }
        : undefined

    const foodWaterSanitation =
      body.foodSecurity || body.waterSupply || body.sanitation
        ? {
            foodSecurity: body.foodSecurity ?? null,
            waterSupply: body.waterSupply ?? null,
            sanitation: body.sanitation ?? null,
          }
        : undefined

    const healthNutrition =
      body.health || body.nutrition
        ? {
            health: body.health ?? null,
            nutrition: body.nutrition ?? null,
          }
        : undefined

    const protectionEducation =
      body.protection || body.education
        ? {
            protection: body.protection ?? null,
            education: body.education ?? null,
          }
        : undefined

    const livelihoodEngagementOverall =
      body.livelihood || body.communityEngagement || body.overallAssessment
        ? {
            livelihood: body.livelihood ?? null,
            communityEngagement: body.communityEngagement ?? null,
            overallAssessment: body.overallAssessment ?? null,
          }
        : undefined

    // ------------------------------------------------------------
    // 3) Create submission (now includes userId + barangayId)
    // ------------------------------------------------------------
    const submission = await prisma.firstRdanaSubmission.create({
      data: {
        userId,
        barangayId,

        submittedByAuthId: authUser.id,
        submittedAt: new Date(),

        // simple JSON pages (support old key "profile")
        profileMission: (body.profileMission ?? body.profile ?? undefined) as unknown as Prisma.InputJsonValue,
        initialImpact: (body.initialImpact ?? undefined) as unknown as Prisma.InputJsonValue,

        // combined JSON pages
        accessibilityPower: accessibilityPower as unknown as Prisma.InputJsonValue,
        communicationsEvac: communicationsEvac as unknown as Prisma.InputJsonValue,
        reliefSrr: reliefSrr as unknown as Prisma.InputJsonValue,
        lawOrderShelter: lawOrderShelter as unknown as Prisma.InputJsonValue,
        foodWaterSanitation: foodWaterSanitation as unknown as Prisma.InputJsonValue,
        healthNutrition: healthNutrition as unknown as Prisma.InputJsonValue,
        protectionEducation: protectionEducation as unknown as Prisma.InputJsonValue,
        livelihoodEngagementOverall: livelihoodEngagementOverall as unknown as Prisma.InputJsonValue,

        submittedBy: (body.submittedBy ?? undefined) as unknown as Prisma.InputJsonValue,
      },
    })

    return submission
  } catch (err: any) {
    console.error('rdana-form.post error:', err)

    // If it's already an H3 error, rethrow
    if (err?.statusCode) throw err

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while creating RDANA submission',
    })
  }
})
