// server/api/rdana-form.post.ts
import { readBody, createError } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const authUser = await serverSupabaseUser(event).catch(() => null)

  if (!authUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
    })
  }

  const body = await readBody(event)

  // build combined JSON chunks first, using undefined when empty
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

  const submission = await prisma.firstRdanaSubmission.create({
    data: {
      submittedByAuthId: authUser.id,
      submittedAt: new Date(),

      // simple JSON pages
      profileMission: body.profile ?? undefined,
      initialImpact: body.initialImpact ?? undefined,

      // combined JSON pages
      accessibilityPower,
      communicationsEvac,
      reliefSrr,
      lawOrderShelter,
      foodWaterSanitation,
      healthNutrition,
      protectionEducation,
      livelihoodEngagementOverall,

      submittedBy: body.submittedBy ?? undefined,
    },
  })

  return submission
})
