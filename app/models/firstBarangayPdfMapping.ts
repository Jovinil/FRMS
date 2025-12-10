// models/firstBarangayPdfMapping.ts

export type FirstBarangayFieldKey =
  | 'initialReportOn'
  | 'originOfReport'
  | 'incidentProfile.what'
  | 'incidentProfile.when'
  | 'incidentProfile.where'
  | 'incidentProfile.why'
  | 'incidentProfile.who'
  | 'incidentProfile.how'
  | 'searchRescueNeeded'
  | 'evacuationNeeded'
  | 'signedByChairman';

export const firstBarangayPdfFieldMap: Record<FirstBarangayFieldKey, string> = {
  initialReportOn: 'FIRSTBARANGAY_INITIAL_REPORT_ON',
  originOfReport: 'FIRSTBARANGAY_ORIGIN_OF_REPORT',
  'incidentProfile.what': 'FIRSTBARANGAY_WHAT',
  'incidentProfile.when': 'FIRSTBARANGAY_WHEN',
  'incidentProfile.where': 'FIRSTBARANGAY_WHERE',
  'incidentProfile.why': 'FIRSTBARANGAY_WHY',
  'incidentProfile.who': 'FIRSTBARANGAY_WHO',
  'incidentProfile.how': 'FIRSTBARANGAY_HOW',
  searchRescueNeeded: 'FIRSTBARANGAY_NEED_SAR',
  evacuationNeeded: 'FIRSTBARANGAY_NEED_EVAC',
  signedByChairman: 'FIRSTBARANGAY_SIGNED_CHAIRMAN',
};
