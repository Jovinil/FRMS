// models/secondBarangayPdfMapping.ts

export type SecondBarangayFieldKey =
  | 'profileOfDisaster.typeOfDisaster'
  | 'profileOfDisaster.dateTimeOfOccurrence'
  | 'profileOfDisaster.areasAffected'
  | 'profileOfDisaster.sourceOfReports'
  | 'profileOfDisaster.dateTimeOfReports'
  | 'initialEffects.affectedPopulation.families'
  | 'initialEffects.affectedPopulation.persons'
  | 'initialEffects.affectedPopulation.breakdown.infants'
  | 'initialEffects.affectedPopulation.breakdown.children'
  | 'initialEffects.affectedPopulation.breakdown.adults'
  // ...add others as needed...
  | 'signedByChairman';

export const secondBarangayPdfFieldMap: Record<SecondBarangayFieldKey, string> = {
  'profileOfDisaster.typeOfDisaster': 'SECONDBRG_TYPE_OF_DISASTER',
  'profileOfDisaster.dateTimeOfOccurrence': 'SECONDBRG_DATETIME_OCCURRENCE',
  'profileOfDisaster.areasAffected': 'SECONDBRG_AREAS_AFFECTED',
  'profileOfDisaster.sourceOfReports': 'SECONDBRG_SOURCE_REPORTS',
  'profileOfDisaster.dateTimeOfReports': 'SECONDBRG_DATETIME_REPORTS',
  'initialEffects.affectedPopulation.families': 'SECONDBRG_AFFECTED_FAMILIES',
  'initialEffects.affectedPopulation.persons': 'SECONDBRG_AFFECTED_PERSONS',
  'initialEffects.affectedPopulation.breakdown.infants': 'SECONDBRG_AFFECTED_INFANTS',
  'initialEffects.affectedPopulation.breakdown.children': 'SECONDBRG_AFFECTED_CHILDREN',
  'initialEffects.affectedPopulation.breakdown.adults': 'SECONDBRG_AFFECTED_ADULTS',
  signedByChairman: 'SECONDBRG_SIGNED_CHAIRMAN',
};
