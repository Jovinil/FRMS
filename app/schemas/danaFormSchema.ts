import { z } from "zod"

export const danaFormSchema = z.object({
  // A. Profile
  disasterType: z.string().min(1, "Type of disaster is required"),
  dateOccurrence: z.string().min(1, "Date and time required"),
  sourceReport: z.string().min(1, "Source of report required"),
  dateReport: z.string().min(1, "Date and time of report required"),

  // B. Summary
  areasAffected: z.string().min(1, "Areas affected required"),
  familiesAffected: z.number().min(0),
  personsAffected: z.number().min(0),
  childrenAffected: z.number().min(0),

  familiesDisplaced: z.number().min(0),
  personsDisplaced: z.number().min(0),
  infants: z.number().min(0),
  children: z.number().min(0),
  adolescents: z.number().min(0),
  adults: z.number().min(0),

  dead: z.number().min(0),
  injured: z.number().min(0),
  missing: z.number().min(0),

  // C. Local Actions
  emergencyResponders: z.string().optional(),
  assetsDeployed: z.string().optional(),
  affectedServedFamilies: z.number().min(0),
  affectedServedPersons: z.number().min(0),
  displacedServedFamilies: z.number().min(0),
  displacedServedPersons: z.number().min(0),
  localAssistance: z.string().optional(),
})

export type DanaFormSchema = z.infer<typeof danaFormSchema>
