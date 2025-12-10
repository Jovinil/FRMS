// pdf/firstBarangay.fields.ts

export type PdfFieldType = 'text' | 'radio';

export interface PdfFieldMapping {
  pdfName: string;      // exact AcroForm field name in the PDF
  key: string;          // path in your form data object, e.g. "incidentProfile.what"
  label: string;        // human-readable label
  type: PdfFieldType;
  // for radio buttons:
  radioValue?: string;  // 'yes' | 'no' etc (for radio options)
}

/**
 * Form I – Initial Report
 * Template: barangay_form_1_no_key.pdf
 */
export const firstBarangayFieldMappings: PdfFieldMapping[] = [
  // Text fields
  {
    pdfName: 'FIRSTBARANGAY_INITIALREPORTON',
    key: 'initialReportOn',
    label: 'Initial Report on',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_ORIGINOFREPORT',
    key: 'originOfReport',
    label: 'Origin of Report',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_INCIDENTPROFILE_WHAT',
    key: 'incidentProfile.what',
    label: 'What',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_INCIDENTPROFILE_WHEN',
    key: 'incidentProfile.when',
    label: 'When',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_INCIDENTPROFILE_WHERE',
    key: 'incidentProfile.where',
    label: 'Where',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_INCIDENTPROFILE_WHY',
    key: 'incidentProfile.why',
    label: 'Why',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_INCIDENTPROFILE_WHO',
    key: 'incidentProfile.who',
    label: 'Who',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_INCIDENTPROFILE_HOW',
    key: 'incidentProfile.how',
    label: 'How',
    type: 'text',
  },
  {
    pdfName: 'FIRSTBARANGAY_SIGNEDBYCHAIRMAN',
    key: 'signedByChairman',
    label: 'Signed (BDRRMC Chairman)',
    type: 'text',
  },

  // Yes/No – you'll need to make these radio groups in the fillable template
  // Is there a need for: - Search & rescue assistance? Yes / No
  {
    pdfName: 'FIRSTBARANGAY_NEED_SEARCH_RESCUE', // radio group name
    key: 'searchRescueNeeded', // 'yes' | 'no'
    label: 'Need search & rescue assistance (Yes)',
    type: 'radio',
    radioValue: 'yes',
  },
  {
    pdfName: 'FIRSTBARANGAY_NEED_SEARCH_RESCUE',
    key: 'searchRescueNeeded',
    label: 'Need search & rescue assistance (No)',
    type: 'radio',
    radioValue: 'no',
  },

  // Is there a need for: - Evacuation? Yes / No
  {
    pdfName: 'FIRSTBARANGAY_NEED_EVACUATION',
    key: 'evacuationNeeded', // 'yes' | 'no'
    label: 'Need evacuation (Yes)',
    type: 'radio',
    radioValue: 'yes',
  },
  {
    pdfName: 'FIRSTBARANGAY_NEED_EVACUATION',
    key: 'evacuationNeeded',
    label: 'Need evacuation (No)',
    type: 'radio',
    radioValue: 'no',
  },
];
