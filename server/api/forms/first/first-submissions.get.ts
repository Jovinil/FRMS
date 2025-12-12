// server/api/rdana/first-submissions.get.ts
import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  // Get all FirstRdanaSubmission rows
  const submissions = await prisma.firstRdanaSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Map into a shape your UInputMenu can use: { id, label }
  const items = submissions.map((sub) => {
    // Try to build a nice label from JSON fields (profileMission)
    let barangay = ''
    let dateTimeOfEvent = ''

    try {
      const profileMission = sub.profileMission as any
      // From your RDANA form structure:
      // profile.mission.barangay
      // profile.emergencyOperation.dateTimeOfEvent
      if (profileMission?.mission?.barangay) {
        barangay = profileMission.mission.barangay
      }
      if (profileMission?.emergencyOperation?.dateTimeOfEvent) {
        dateTimeOfEvent = profileMission.emergencyOperation.dateTimeOfEvent
      }
    } catch {
      // if JSON shape is unexpected, just ignore and fallback to generic label
    }

    const labelParts = ['RDANA']
    if (barangay) labelParts.push(barangay)
    if (dateTimeOfEvent) labelParts.push(dateTimeOfEvent)

    return {
      id: sub.id,            // 👈 this is a String (cuid)
      label: labelParts.join(' – ') || `RDANA ${sub.id}`,
    }
  })

  return items
})
