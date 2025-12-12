import type { RdanaForm } from '~/models/firstRdanaForm'
import { AccessMode } from '~/models/firstRdanaForm'

export type RdanaPdfPrimitive = string | boolean

export interface RdanaFieldMappingEntry {
  pdfName: string
  kind: 'text' | 'checkbox' | 'radio'
  path?: string
  value: (form: RdanaForm) => RdanaPdfPrimitive
}

export const RDANA_FIELD_MAPPING: RdanaFieldMappingEntry[] = [
  // -------------------------------
  // Section 1 – Profile of disaster
  // -------------------------------
  {
    pdfName: 'text_1_1_1',
    kind: 'text',
    path: 'profile.emergencyOperation.nameOfOperation',
    value: (form) => form.profile.emergencyOperation.nameOfOperation || '',
  },
  {
    pdfName: 'text_1_1_2',
    kind: 'text',
    path: 'profile.emergencyOperation.typeOfDisaster',
    value: (form) => form.profile.emergencyOperation.typeOfDisaster || '',
  },
  {
    pdfName: 'text_1_1_3',
    kind: 'text',
    path: 'profile.emergencyOperation.dateTimeOfEvent',
    value: (form) => form.profile.emergencyOperation.dateTimeOfEvent || '',
  },
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
  {
    pdfName: 'textarea_1',
    kind: 'text',
    path: 'profile.summaryDescription',
    value: (form) => form.profile.summaryDescription || '',
  },

  // -------------------------------
  // Section 3 – Accessibility
  // -------------------------------
  {
    pdfName: 'radio_3_1',
    kind: 'radio',
    path: 'accessibility.communityAccessible',
    value: (form) => {
      const v = form.accessibility.communityAccessible
      if (v === 'yes') return 'Yes'
      if (v === 'no') return 'No'
      return ''
    },
  },
  {
    pdfName: 'checkbox_3_2_a',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.CarBus)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.CarBus),
  },
  {
    pdfName: 'checkbox_3_2_b',
    kind: 'checkbox',
    path:
      'accessibility.accessModes.includes(AccessMode.Truck4wd10wheeler)',
    value: (form) =>
      form.accessibility.accessModes.includes(
        AccessMode.Truck4wd10wheeler,
      ),
  },
  {
    pdfName: 'checkbox_3_2_c',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Motorcycle)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.Motorcycle),
  },
  {
    pdfName: 'checkbox_3_2_d',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Foot)',
    value: (form) => form.accessibility.accessModes.includes(AccessMode.Foot),
  },
  {
    pdfName: 'checkbox_3_2_e',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Boat)',
    value: (form) => form.accessibility.accessModes.includes(AccessMode.Boat),
  },
  {
    pdfName: 'checkbox_3_2_f',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Airplane)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.Airplane),
  },
  {
    pdfName: 'checkbox_3_2_g',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Helicopter)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.Helicopter),
  },
  {
    pdfName: 'checkbox_3_2_h',
    kind: 'checkbox',
    path: 'accessibility.accessModes.includes(AccessMode.Animal)',
    value: (form) =>
      form.accessibility.accessModes.includes(AccessMode.Animal),
  },

  // -------------------------------
  // Section 4 – Power status
  // -------------------------------
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
]

export function mapRdanaFormToPdfData(
  form: RdanaForm,
): Record<string, RdanaPdfPrimitive> {
  const out: Record<string, RdanaPdfPrimitive> = {}
  for (const m of RDANA_FIELD_MAPPING) {
    out[m.pdfName] = m.value(form)
  }
  return out
}
