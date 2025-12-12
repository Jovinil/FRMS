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

  // Example: "Name of Emergency Operation" -> text_1_1_1
  {
    pdfName: 'text_1_1_1',
    kind: 'text',
    path: 'profile.emergencyOperation.nameOfOperation',
    value: (form) => form.profile.emergencyOperation.nameOfOperation || '',
  },

  // Type of disaster
  {
    pdfName: 'text_1_1_2',
    kind: 'text',
    path: 'profile.emergencyOperation.typeOfDisaster',
    value: (form) => form.profile.emergencyOperation.typeOfDisaster || '',
  },

  // Date/time of event
  {
    pdfName: 'text_1_1_3',
    kind: 'text',
    path: 'profile.emergencyOperation.dateTimeOfEvent',
    value: (form) => form.profile.emergencyOperation.dateTimeOfEvent || '',
  },

  // Region / Province / City / Barangay / Sitio-Purok / GPS / DateTime of RDANA
  {
    pdfName: 'text_1_2_1',
    kind: 'text',
    path: 'profile.mission.region',
    value: (form) => form.profile.mission.region || '',
  },
  {
    pdfName: 'text_1_2_2',
    kind: 'text',
    path: 'profile.mission.province',
    value: (form) => form.profile.mission.province || '',
  },
  {
    pdfName: 'text_1_2_3',
    kind: 'text',
    path: 'profile.mission.cityMunicipality',
    value: (form) => form.profile.mission.cityMunicipality || '',
  },
  {
    pdfName: 'text_1_2_4',
    kind: 'text',
    path: 'profile.mission.barangay',
    value: (form) => form.profile.mission.barangay || '',
  },
  {
    pdfName: 'text_1_2_5',
    kind: 'text',
    path: 'profile.mission.sitioPurok',
    value: (form) => form.profile.mission.sitioPurok || '',
  },
  {
    pdfName: 'text_1_2_6',
    kind: 'text',
    path: 'profile.mission.gpsCoordinate',
    value: (form) => form.profile.mission.gpsCoordinate || '',
  },
  {
    pdfName: 'text_1_2_7',
    kind: 'text',
    path: 'profile.mission.dateTimeOfRdana',
    value: (form) => form.profile.mission.dateTimeOfRdana || '',
  },

  // Summary description
  {
    pdfName: 'textarea_1',
    kind: 'text',
    path: 'profile.summaryDescription',
    value: (form) => form.profile.summaryDescription || '',
  },

  // -------------------------------
  // Example: Accessibility section
  // -------------------------------

  // 3.1: communityAccessible (radio_3_1)
  {
    pdfName: 'radio_3_1',
    kind: 'radio',
    path: 'accessibility.communityAccessible',
    // ⚠️ adjust returned strings to match actual PDF radio values!
    value: (form) => {
      const v = form.accessibility.communityAccessible
      if (v === 'yes') return 'Yes'
      if (v === 'no') return 'No'
      return '' // nothing selected
    },
  },

  // 3.2: Access mode checkboxes (example mapping only)
  {
    pdfName: 'checkbox_3_2_a', // e.g. "Car/Bus"
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.CarBus)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.CarBus),
  },
  {
    pdfName: 'checkbox_3_2_b', // you decide which mode this corresponds to
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Truck4wd10wheeler)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.Truck4wd10wheeler),
  },

  // ...repeat for other AccessMode values...

  // -------------------------------
  // Example: Power status (section 4)
  // -------------------------------

  // "Is there power?" radio group (example only)
  {
    pdfName: 'radio_4_1',
    kind: 'radio',
    path: 'power.powerStatus',
    value: (form) => {
      switch (form.power.powerStatus) {
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

  // etc...
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
