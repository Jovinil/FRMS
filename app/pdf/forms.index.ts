// pdf/forms.index.ts
import type { PdfFieldMapping } from '~/pdf/firstBarangay.fields';
import { firstBarangayFieldMappings } from '~/pdf/firstBarangay.fields';
// import { secondBarangayFieldMappings } from './secondBarangay.fields';
// import { thirdBarangayFieldMappings } from './thirdBarangay.fields';
// import { fourthBarangayFieldMappings } from './fourthBarangay.fields';

export type RdanaFormType =
  | 'firstBarangay'
  | 'secondBarangay'
  | 'thirdBarangay'
  | 'fourthBarangay';

export interface FormPdfConfig {
  templatePath: string;            // path to your fillable template PDF
  fields: PdfFieldMapping[];       // field mappings for this form
}

// You can adjust paths for your project structure.
export const rdanaPdfConfigs: Record<RdanaFormType, FormPdfConfig> = {
  firstBarangay: {
    templatePath: 'pdf/templates/barangay_form_1_no_key.pdf',
    fields: firstBarangayFieldMappings,
  },
  secondBarangay: {
    templatePath: 'pdf/templates/barangay_form_2_no_key.pdf', // TODO
    fields: [], // TODO: fill with secondBarangayFieldMappings
  },
  thirdBarangay: {
    templatePath: 'pdf/templates/barangay_form_3_no_key.pdf', // TODO
    fields: [], // TODO: fill with thirdBarangayFieldMappings
  },
  fourthBarangay: {
    templatePath: 'pdf/templates/barangay_form_4_no_key.pdf', // TODO
    fields: [], // TODO: fill with fourthBarangayFieldMappings
  },
};
