// models/rdanaPdfMapping.ts

// Keys are "paths" to your form values. You can expand this list as needed.
export type RdanaFieldKey =
  | 'profile.emergencyOperation.nameOfOperation'
  | 'profile.emergencyOperation.typeOfDisaster'
  | 'profile.emergencyOperation.dateTimeOfEvent'
  | 'profile.mission.region'
  | 'profile.mission.province'
  | 'profile.mission.cityMunicipality'
  | 'profile.mission.barangay'
  | 'profile.mission.dateTimeOfRdana'
  // ...add the rest of the fields you plan to map to the PDF
  | 'submittedBy.name'
  | 'submittedBy.designation'
  | 'submittedBy.organization'
  | 'submittedBy.contactNumber'
  | 'submittedBy.email';

export const rdanaPdfFieldMap: Record<RdanaFieldKey, string> = {
  'profile.emergencyOperation.nameOfOperation': 'FIELD_OPERATION_NAME',
  'profile.emergencyOperation.typeOfDisaster': 'FIELD_DISASTER_TYPE',
  'profile.emergencyOperation.dateTimeOfEvent': 'FIELD_EVENT_DATETIME',
  'profile.mission.region': 'FIELD_REGION',
  'profile.mission.province': 'FIELD_PROVINCE',
  'profile.mission.cityMunicipality': 'FIELD_CITY_MUNICIPALITY',
  'profile.mission.barangay': 'FIELD_BARANGAY',
  'profile.mission.dateTimeOfRdana': 'FIELD_RDANA_DATETIME',
  'submittedBy.name': 'FIELD_SUBMITTED_NAME',
  'submittedBy.designation': 'FIELD_SUBMITTED_DESIGNATION',
  'submittedBy.organization': 'FIELD_SUBMITTED_ORG',
  'submittedBy.contactNumber': 'FIELD_SUBMITTED_CONTACT',
  'submittedBy.email': 'FIELD_SUBMITTED_EMAIL',
};
