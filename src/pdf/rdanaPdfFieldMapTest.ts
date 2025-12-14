// pdf/rdanaFieldMapping.ts
import type { RdanaForm, YesNo } from '~/models/firstRdanaForm'
import { AccessMode } from '~/models/firstRdanaForm'
// What a single PDF field expects
export type RdanaPdfPrimitive = string | boolean

export interface RdanaFieldMappingEntry {
  pdfName: string               // e.g. "text_1_1_1", "checkbox_3_4_a"
  kind: 'text' | 'checkbox' | 'radio'
  // path is just for debugging/dev, not used programmatically
  path: string                  // e.g. "profile.mission.region"
  value: (form: RdanaForm) => RdanaPdfPrimitive
}

/**
 * 👉 Fill this table out progressively.
 * I’ll show a representative subset so you see the pattern.
 */
export const RDANA_FIELD_MAPPING: RdanaFieldMappingEntry[] = [
  // -------------------------------
  // SECTION 1 – Profile of disaster
  // -------------------------------
[
  // Name of Emergency Operation
  {
    pdfName: 'text_1_1_1',
    kind: 'text',
    path: 'emergencyOperation.nameOfOperation',
    value: (form) => form.emergencyOperation?.nameOfOperation || '',
  },

  // Type of disaster
  {
    pdfName: 'text_1_1_2',
    kind: 'text',
    path: 'emergencyOperation.typeOfDisaster',
    value: (form) => form.emergencyOperation?.typeOfDisaster || '',
  },

  // Date/time of event
  {
    pdfName: 'text_1_1_3',
    kind: 'text',
    path: 'emergencyOperation.dateTimeOfEvent',
    value: (form) => form.emergencyOperation?.dateTimeOfEvent || '',
  },

  // Region / Province / City / Barangay / Sitio-Purok / GPS / DateTime of RDANA
  {
    pdfName: 'text_1_2_1',
    kind: 'text',
    path: 'mission.region',
    value: (form) => form.mission?.region || '',
  },
  {
    pdfName: 'text_1_2_2',
    kind: 'text',
    path: 'mission.province',
    value: (form) => form.mission?.province || '',
  },
  {
    pdfName: 'text_1_2_3',
    kind: 'text',
    path: 'mission.cityMunicipality',
    value: (form) => form.mission?.cityMunicipality || '',
  },
  {
    pdfName: 'text_1_2_4',
    kind: 'text',
    path: 'mission.barangay',
    value: (form) => form.mission?.barangay || '',
  },
  {
    pdfName: 'text_1_2_5',
    kind: 'text',
    path: 'mission.sitioPurok',
    value: (form) => form.mission?.sitioPurok || '',
  },
  {
    pdfName: 'text_1_2_6',
    kind: 'text',
    path: 'mission.gpsCoordinate',
    value: (form) => form.mission?.gpsCoordinate || '',
  },
  {
    pdfName: 'text_1_2_7',
    kind: 'text',
    path: 'mission.dateTimeOfRdana',
    value: (form) => form.mission?.dateTimeOfRdana || '',
  },

  // Summary description
  {
    pdfName: 'textarea_1',
    kind: 'text',
    path: 'summaryDescription',
    value: (form) => form.summaryDescription || '',
  },

  // -------------------------------
  // Accessibility section (your structure nests it under accessibilityPower)
  // -------------------------------

  // 3.1: communityAccessible
  {
    pdfName: 'radio_3_1',
    kind: 'radio',
    path: 'accessibilityPower.accessibility.communityAccessible',
    value: (form) => {
      const v = form.accessibilityPower?.accessibility?.communityAccessible
      if (v === 'yes') return 'yes'
      if (v === 'no') return 'no'
      return ''
    },
  },

  // 3.2: Access mode checkboxes (example mapping only)
  {
    pdfName: 'checkbox_3_2_a',
    kind: 'checkbox',
    path: 'accessibilityPower.accessibility.accessModes.includes(AccessMode.CarBus)',
    value: (form) =>
      (form.accessibilityPower?.accessibility?.accessModes || []).includes(
        AccessMode.CarBus
      ),
  },
  {
    pdfName: 'checkbox_3_2_b',
    kind: 'checkbox',
    path: 'accessibilityPower.accessibility.accessModes.includes(AccessMode.Truck4wd10wheeler)',
    value: (form) =>
      (form.accessibilityPower?.accessibility?.accessModes || []).includes(
        AccessMode.Truck4wd10wheeler
      ),
  },

  // -------------------------------
  // Power status (your structure nests it under accessibilityPower.power)
  // -------------------------------

  {
    pdfName: 'radio_4_1',
    kind: 'radio',
    path: 'accessibilityPower.power.powerStatus',
    value: (form) => {
      switch (form.accessibilityPower?.power?.powerStatus) {
        case 'yes':
          return 'Yes'
        case 'none':
          return 'None'
        case 'partial':
          return 'Partial'
        case 'limited':
          return 'Limited'
        case 'no_power_before_disaster':
          return 'No power before disaster'
        default:
          return ''
      }
    },
  },
]


/**
 * Convert a rich RdanaForm into a flat map
 * { "text_1_1_1": "...", "checkbox_3_2_a": true, ... }
 * ready for pdf-lib.
 */
export function mapRdanaFormToPdfData(
  form: RdanaForm,
): Record<string, RdanaPdfPrimitive> {
  const out: Record<string, RdanaPdfPrimitive> = {}

  for (const m of RDANA_FIELD_MAPPING) {
    out[m.pdfName] = m.value(form)
  }

  return out
}
