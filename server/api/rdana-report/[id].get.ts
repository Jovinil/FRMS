// server/api/rdana-report/[id].get.ts
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getRouterParam, setHeader, createError } from 'h3'
import { fillRdanaPdf } from '../../../src/pdf/fillRdanaPdf' // adjust path

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing RDANA submission id',
    })
  }

  const submission = await prisma.firstRdanaSubmission.findUnique({
    where: { id },
  })

  if (!submission) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RDANA submission not found',
    })
  }

  // Rebuild the formData in the shape your fillRDANAPdf expects.
  // Adjust keys to match your Pinia RdanaForm type.
  const formData = {
    profile: submission.profileMission ?? {},
    initialImpact: submission.initialImpact ?? {},
    healthNutrition: submission.healthNutrition ?? {},
    accessibilityPower: submission.accessibilityPower ?? {},
    communicationsEvac: submission.communicationsEvac ?? {},
    foodWaterSanitation: submission.foodWaterSanitation ?? {},
    lawOrderShelter: submission.lawOrderShelter ?? {},
    livelihoodEngagementOverall: submission.livelihoodEngagementOverall ?? {},
    protectionEducation: submission.protectionEducation ?? {},
    reliefSrr: submission.reliefSrr ?? {},
    submittedBy: submission.submittedBy ?? {},
  }

  // Load your RDANA template PDF from disk
  const templatePath = join(
    process.cwd(),
    'server',
    'templates',
    'RDANA-Form-1.pdf', // make sure this file exists here
  )
  const pdfBuffer = await readFile(templatePath) // Buffer/Uint8Array

  // Fill the PDF
  const pdfBytes = await fillRdanaPdf(pdfBuffer, formData)

  // Return as a real PDF
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(
    event,
    'Content-Disposition',
    `inline; filename="rdana-report-${id}.pdf"`,
  )

  return pdfBytes   // 👈 DO NOT WRAP IN AN OBJECT
})
