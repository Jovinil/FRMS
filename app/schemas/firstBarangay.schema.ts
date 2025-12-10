// schemas/firstBarangayForm.schema.ts
import { z } from 'zod';

const yesNoSchema = z.enum(['yes', 'no']);

export const firstBarangayIncidentProfileSchema = z.object({
  what: z.string().min(1, 'Required'),
  when: z.string().min(1, 'Required'),
  where: z.string().min(1, 'Required'),
  why: z.string().min(1, 'Required'),
  who: z.string().min(1, 'Required'),
  how: z.string().min(1, 'Required'),
});

export const firstBarangayFormSchema = z.object({
  initialReportOn: z.string().min(1, 'Required'),
  originOfReport: z.string().min(1, 'Required'),
  incidentProfile: firstBarangayIncidentProfileSchema,
  searchRescueNeeded: yesNoSchema.nullable(),
  evacuationNeeded: yesNoSchema.nullable(),
  signedByChairman: z.string().min(1, 'Required'),
});

export type FirstBarangayFormSchemaType = z.infer<typeof firstBarangayFormSchema>;
