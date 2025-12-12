// schemas/thirdBarangayForm.schema.ts
import { z } from 'zod';

const yesNoSchema = z.enum(['yes', 'no']);

const damagePropertyRowSchema = z.object({
  totallyNumber: z.number().int().nonnegative().nullable(),
  partiallyNumber: z.number().int().nonnegative().nullable(),
  estCostTotally: z.number().nonnegative().nullable(),
  estCostPartially: z.number().nonnegative().nullable(),
  totalCost: z.number().nonnegative().nullable(),
});

const transportEntrySchema = z.object({
  passable: yesNoSchema.nullable(),
  number: z.number().int().nonnegative().nullable(),
  cost: z.number().nonnegative().nullable(),
});

const commEntrySchema = z.object({
  operational: yesNoSchema.nullable(),
  number: z.number().int().nonnegative().nullable(),
  cost: z.number().nonnegative().nullable(),
});

const simpleLifelineEntrySchema = z.object({
  operational: yesNoSchema.nullable(),
  number: z.number().int().nonnegative().nullable(),
  cost: z.number().nonnegative().nullable(),
});

const cropDamageRowSchema = z.object({
  areaDamagedHectares: z.number().nonnegative().nullable(),
  lossesMetricTons: z.number().nonnegative().nullable(),
  lossesPesoValue: z.number().nonnegative().nullable(),
});

const livestockRowSchema = z.object({
  numberOfHeads: z.number().int().nonnegative().nullable(),
  pesoValue: z.number().nonnegative().nullable(),
});

export const thirdBarangayFormSchema = z.object({
  profileOfDisaster: z.object({
    typeOfDisaster: z.string().min(1, 'Required'),
    dateTimeOfOccurrence: z.string().min(1, 'Required'),
    sourceOfReport: z.string().min(1, 'Required'),
    dateTimeOfReport: z.string().min(1, 'Required'),
  }),

  summaryOfEffects: z.object({
    areasAffected: z.string().min(1, 'Required'),
    populationAffected: z.object({
      families: z.number().int().nonnegative().nullable(),
      persons: z.number().int().nonnegative().nullable(),
      childrenAge1to17: z.number().int().nonnegative().nullable(),
    }),
    populationDisplaced: z.object({
      families: z.number().int().nonnegative().nullable(),
      persons: z.number().int().nonnegative().nullable(),
      infants0to1: z.number().int().nonnegative().nullable(),
      children2to12: z.number().int().nonnegative().nullable(),
      adolescents13to17: z.number().int().nonnegative().nullable(),
      adults18plus: z.number().int().nonnegative().nullable(),
    }),
    casualties: z.object({
      dead: z.number().int().nonnegative().nullable(),
      injured: z.number().int().nonnegative().nullable(),
      missing: z.number().int().nonnegative().nullable(),
    }),
    damagedProperties: z.object({
      houses: damagePropertyRowSchema,
      schoolBuildings: damagePropertyRowSchema,
      hospital: damagePropertyRowSchema,
      governmentOffices: damagePropertyRowSchema,
      publicMarkets: damagePropertyRowSchema,
      floodControl: damagePropertyRowSchema,
      commercialFacilities: damagePropertyRowSchema,
      othersDescription: z.string().optional().default(''),
      others: damagePropertyRowSchema,
    }),
    damagedLifelines: z.object({
      transportation: z.object({
        roadsNational: transportEntrySchema,
        roadsProvincial: transportEntrySchema,
        roadsMunicipal: transportEntrySchema,
        roadsCity: transportEntrySchema,
        roadsBarangay: transportEntrySchema,
        bridgesBailey: transportEntrySchema,
        bridgesConcrete: transportEntrySchema,
        bridgesWooden: transportEntrySchema,
        bridgesSuspension: transportEntrySchema,
        railways: transportEntrySchema,
      }),
      communication: z.object({
        pldt: commEntrySchema,
        bayanTel: commEntrySchema,
        cellSites: commEntrySchema,
        repeaters: commEntrySchema,
      }),
      electricalPower: simpleLifelineEntrySchema,
      waterFacilities: simpleLifelineEntrySchema,
    }),
    agriculture: z.object({
      crops: z.object({
        rice: cropDamageRowSchema,
        corn: cropDamageRowSchema,
        vegetables: cropDamageRowSchema,
        rootCrops: cropDamageRowSchema,
        fruitTrees: cropDamageRowSchema,
        bananas: cropDamageRowSchema,
        otherDescription: z.string().optional().default(''),
        other: cropDamageRowSchema,
      }),
      fisheries: z.object({
        fishpondsAreaDamagedHectares: z.number().nonnegative().nullable(),
        fishpondsLossesMetricTons: z.number().nonnegative().nullable(),
        fishpondsLossesPesoValue: z.number().nonnegative().nullable(),
        fishingBoatsNumber: z.number().int().nonnegative().nullable(),
      }),
      livestock: z.object({
        farmAnimals: livestockRowSchema,
        poultryAndFowls: livestockRowSchema,
      }),
    }),
  }),

  localActions: z.object({
    emergencyRespondersInvolved: z.string().optional().default(''),
    assetsDeployed: z.string().optional().default(''),
    affectedPopulationServedFamilies: z.number().int().nonnegative().nullable(),
    affectedPopulationServedPersons: z.number().int().nonnegative().nullable(),
    displacedPopulationServedFamilies: z.number().int().nonnegative().nullable(),
    displacedPopulationServedPersons: z.number().int().nonnegative().nullable(),
    displacedPopulationServedInfants: z.number().int().nonnegative().nullable(),
    displacedPopulationServedChildren: z.number().int().nonnegative().nullable(),
    displacedPopulationServedAdults: z.number().int().nonnegative().nullable(),
    extentOfLocalAssistance: z.string().optional().default(''),
  }),

  // damageAssessmentSignedByChairman: z.string().min(1, 'Required'),

  evacueeSummary: z.object({
    date: z.string().min(1, 'Required'),
    barangay: z.string().min(1, 'Required'),
    typeOfDisaster: z.string().min(1, 'Required'),
    totalNumberOfEvacuationCenter: z.number().int().nonnegative().nullable(),
    centers: z
      .array(
        z.object({
          nameOfEvacuationCenter: z.string().optional().default(''),
          numberOfFamilies: z.number().int().nonnegative().nullable(),
          numberOfPersons: z.number().int().nonnegative().nullable(),
        })
      )
      .min(1),
    totalNumberOfFamilies: z.number().int().nonnegative().nullable(),
    totalNumberOfPersons: z.number().int().nonnegative().nullable(),
    preparedByBarangaySecretary: z.string().optional().default(''),
    notedByPunongBarangay: z.string().optional().default(''),
  }),
});

export type ThirdBarangayFormSchemaType = z.infer<typeof thirdBarangayFormSchema>;
