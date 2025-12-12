import { promises as fs } from 'fs'
import path from 'path'
import {
  PDFCheckBox,
  PDFDocument,
  PDFRadioGroup,
  PDFTextField,
} from 'pdf-lib'
import {
  createDefaultRdanaForm,
  type RdanaForm,
} from '~/models/firstRdanaForm'
import {
  mapRdanaFormToPdfData,
  type RdanaPdfPrimitive,
} from '~/../src/pdf/rdanaFieldMapping'

const TEMPLATE_PATH = path.resolve(
  process.cwd(),
  'pdf-templates/rdana-mdrrmo-fillable-complete.pdf',
)

/**
 * Rebuild a full RdanaForm from the split JSON columns stored on
 * FirstRdanaSubmission. This keeps PDF generation independent from how
 * the data is persisted in the database.
 */
export function buildRdanaFormFromSubmission(
  submission: Record<string, any>,
): RdanaForm {
  const form = createDefaultRdanaForm()

  const pmRaw = (submission.profileMission as any) ?? {}
  const pm = pmRaw.profile ?? pmRaw

  if (pm.emergencyOperation) {
    form.profile.emergencyOperation = {
      ...form.profile.emergencyOperation,
      ...pm.emergencyOperation,
    }
  }
  if (pm.mission) {
    form.profile.mission = {
      ...form.profile.mission,
      ...pm.mission,
    }
  }
  if (pm.localAuthorities) {
    form.profile.localAuthorities = pm.localAuthorities
  }
  if (typeof pm.summaryDescription === 'string') {
    form.profile.summaryDescription = pm.summaryDescription
  }

  if (submission.initialImpact) {
    form.initialImpact = {
      ...form.initialImpact,
      ...(submission.initialImpact as any),
    }
  }

  if (submission.accessibilityPower?.accessibility) {
    form.accessibility = {
      ...form.accessibility,
      ...(submission.accessibilityPower.accessibility as any),
    }
  }
  if (submission.accessibilityPower?.power) {
    form.power = {
      ...form.power,
      ...(submission.accessibilityPower.power as any),
    }
  }

  if (submission.communicationsEvac?.communications) {
    form.communications = {
      ...form.communications,
      ...(submission.communicationsEvac.communications as any),
    }
  }
  if (submission.communicationsEvac?.evacuation) {
    form.evacuation = {
      ...form.evacuation,
      ...(submission.communicationsEvac.evacuation as any),
    }
  }

  if (submission.reliefSrr?.relief) {
    form.relief = {
      ...form.relief,
      ...(submission.reliefSrr.relief as any),
    }
  }
  if (submission.reliefSrr?.srr) {
    form.srr = {
      ...form.srr,
      ...(submission.reliefSrr.srr as any),
    }
  }

  if (submission.lawOrderShelter?.lawAndOrder) {
    form.lawAndOrder = {
      ...form.lawAndOrder,
      ...(submission.lawOrderShelter.lawAndOrder as any),
    }
  }
  if (submission.lawOrderShelter?.shelter) {
    form.shelter = {
      ...form.shelter,
      ...(submission.lawOrderShelter.shelter as any),
    }
  }

  if (submission.foodWaterSanitation?.foodSecurity) {
    form.foodSecurity = {
      ...form.foodSecurity,
      ...(submission.foodWaterSanitation.foodSecurity as any),
    }
  }
  if (submission.foodWaterSanitation?.waterSupply) {
    form.waterSupply = {
      ...form.waterSupply,
      ...(submission.foodWaterSanitation.waterSupply as any),
    }
  }
  if (submission.foodWaterSanitation?.sanitation) {
    form.sanitation = {
      ...form.sanitation,
      ...(submission.foodWaterSanitation.sanitation as any),
    }
  }

  if (submission.healthNutrition?.health) {
    form.health = {
      ...form.health,
      ...(submission.healthNutrition.health as any),
    }
  }
  if (submission.healthNutrition?.nutrition) {
    form.nutrition = {
      ...form.nutrition,
      ...(submission.healthNutrition.nutrition as any),
    }
  }

  if (submission.protectionEducation?.protection) {
    form.protection = {
      ...form.protection,
      ...(submission.protectionEducation.protection as any),
    }
  }
  if (submission.protectionEducation?.education) {
    form.education = {
      ...form.education,
      ...(submission.protectionEducation.education as any),
    }
  }

  if (submission.livelihoodEngagementOverall?.livelihood) {
    form.livelihood = {
      ...form.livelihood,
      ...(submission.livelihoodEngagementOverall.livelihood as any),
    }
  }
  if (submission.livelihoodEngagementOverall?.communityEngagement) {
    form.communityEngagement = {
      ...form.communityEngagement,
      ...(submission.livelihoodEngagementOverall
        .communityEngagement as any),
    }
  }
  if (submission.livelihoodEngagementOverall?.overallAssessment) {
    form.overallAssessment = {
      ...form.overallAssessment,
      ...(submission.livelihoodEngagementOverall.overallAssessment as any),
    }
  }

  if (submission.submittedBy) {
    form.submittedBy = {
      ...form.submittedBy,
      ...(submission.submittedBy as any),
    }
  }

  return form
}

/**
 * Fill the PDF template with values from the given form and return the
 * rendered PDF bytes.
 */
export async function generateRdanaPdf(
  form: RdanaForm,
): Promise<Uint8Array> {
  // Ensure the template exists
  await fs.access(TEMPLATE_PATH)

  const pdfBytes = await fs.readFile(TEMPLATE_PATH)
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const pdfForm = pdfDoc.getForm()

  const pdfData: Record<string, RdanaPdfPrimitive> =
    mapRdanaFormToPdfData(form)

  for (const [name, value] of Object.entries(pdfData)) {
    let field
    try {
      field = pdfForm.getField(name)
    } catch {
      continue
    }

    const ctorName = field.constructor.name

    try {
      if (typeof value === 'string') {
        if (ctorName === 'PDFTextField') {
          ;(field as PDFTextField).setText(value)
        } else if (ctorName === 'PDFRadioGroup' && value) {
          ;(field as PDFRadioGroup).select(value)
        }
      } else if (typeof value === 'boolean') {
        if (ctorName === 'PDFCheckBox') {
          if (value) {
            ;(field as PDFCheckBox).check()
          } else {
            ;(field as PDFCheckBox).uncheck()
          }
        }
      }
    } catch {
      // Ignore problematic fields; keep generating the rest
    }
  }

  const outBytes = await pdfDoc.save()
  return new Uint8Array(outBytes)
}
