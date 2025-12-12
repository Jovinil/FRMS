// server/api/rdana/first-submissions.get.ts
import { defineEventHandler, getQuery, createError } from 'h3'
import { rdanaFormSchema, RdanaFormSchemaType } from '~/schemas/firstRdanaForm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string | undefined

  // 🟢 1. If no id → behave as BEFORE: return [{ id, label }]
  if (!id) {
    const submissions = await prisma.firstRdanaSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    const items = submissions.map((sub) => {
      let barangay = ''
      let dateTimeOfEvent = ''

      try {
        const profileMission = sub.profileMission as any
        if (profileMission?.mission?.barangay) {
          barangay = profileMission.mission.barangay
        }
        if (profileMission?.emergencyOperation?.dateTimeOfEvent) {
          dateTimeOfEvent =
            profileMission.emergencyOperation.dateTimeOfEvent
        }
      } catch {
        // ignore JSON issues, fallback to generic label
      }

      const labelParts = ['RDANA']
      if (barangay) labelParts.push(barangay)
      if (dateTimeOfEvent) labelParts.push(dateTimeOfEvent)

      return {
        id: sub.id,
        label: labelParts.join(' – ') || `RDANA ${sub.id}`,
      }
    })

    return items
  }

  // 🟡 2. If id is present → return a single schema-safe formData

  const submission = await prisma.firstRdanaSubmission.findUnique({
    where: { id },
  })

  if (!submission) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RDANA submission not found',
    })
  }

  // All JSON columns as loose "any"
  const profileMission = (submission.profileMission ?? {}) as any
  const initialImpactJson = (submission.initialImpact ?? {}) as any
  const accessibilityPowerJson = (submission.accessibilityPower ?? {}) as any
  const communicationsEvacJson = (submission.communicationsEvac ?? {}) as any
  const foodWaterSanitationJson =
    (submission.foodWaterSanitation ?? {}) as any
  const lawOrderShelterJson = (submission.lawOrderShelter ?? {}) as any
  const healthNutritionJson = (submission.healthNutrition ?? {}) as any
  const protectionEducationJson =
    (submission.protectionEducation ?? {}) as any
  const livelihoodEngagementOverallJson =
    (submission.livelihoodEngagementOverall ?? {}) as any
  const reliefSrrJson = (submission.reliefSrr ?? {}) as any
  const submittedByJson = (submission.submittedBy ?? {}) as any

  // 🔗 Rebuild full RDANA form from the “page JSONs”
  // This assumes your front-end saved these groups like:
  // - profileMission: { profile }
  // - initialImpact: { initialImpact }
  // - accessibilityPower: { accessibility, power }
  // - communicationsEvac: { communications, evacuation }
  // - foodWaterSanitation: { foodSecurity, waterSupply, sanitation }
  // - lawOrderShelter: { lawAndOrder, shelter }
  // - healthNutrition: { health, nutrition }
  // - protectionEducation: { protection, education }
  // - livelihoodEngagementOverall: { livelihood, communityEngagement, overallAssessment }
  // - reliefSrr: { relief, srr }
  // - submittedBy: { submittedBy }

  const formCandidate = {
    profile: profileMission.profile ?? profileMission,
    initialImpact: initialImpactJson.initialImpact ?? initialImpactJson,

    accessibility:
      accessibilityPowerJson.accessibility ?? accessibilityPowerJson,
    power: accessibilityPowerJson.power ?? {},

    communications:
      communicationsEvacJson.communications ?? communicationsEvacJson,
    evacuation: communicationsEvacJson.evacuation ?? {},

    foodSecurity:
      foodWaterSanitationJson.foodSecurity ?? foodWaterSanitationJson,
    waterSupply: foodWaterSanitationJson.waterSupply ?? {},
    sanitation: foodWaterSanitationJson.sanitation ?? {},

    lawAndOrder:
      lawOrderShelterJson.lawAndOrder ?? lawOrderShelterJson,
    shelter: lawOrderShelterJson.shelter ?? {},

    health: healthNutritionJson.health ?? healthNutritionJson,
    nutrition: healthNutritionJson.nutrition ?? {},

    protection:
      protectionEducationJson.protection ?? protectionEducationJson,
    education: protectionEducationJson.education ?? {},

    livelihood:
      livelihoodEngagementOverallJson.livelihood ??
      livelihoodEngagementOverallJson,
    communityEngagement:
      livelihoodEngagementOverallJson.communityEngagement ?? {},
    overallAssessment:
      livelihoodEngagementOverallJson.overallAssessment ?? {},

    relief: reliefSrrJson.relief ?? reliefSrrJson,
    srr: reliefSrrJson.srr ?? {},

    submittedBy:
      submittedByJson.submittedBy ?? submittedByJson,
  }

  // ✅ Validate & normalize with your Zod schema
const formData: RdanaFormSchemaType = rdanaFormSchema.parse(formCandidate)

  return {
    id: submission.id,
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
    submittedAt: submission.submittedAt,
    formData, // <-- this now 100% matches RdanaFormSchemaType
  }
})
