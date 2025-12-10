// schemas/secondBarangayForm.schema.ts
import { z } from 'zod';

const yesNoSchema = z.enum(['yes', 'no']);

const affectedBreakdownSchema = z.object({
  infants: z.number().int().nonnegative().nullable(),
  children: z.number().int().nonnegative().nullable(),
  adults: z.number().int().nonnegative().nullable(),
});

const populationSchema = z.object({
  families: z.number().int().nonnegative().nullable(),
  persons: z.number().int().nonnegative().nullable(),
  breakdown: affectedBreakdownSchema,
});

const casualtyEntrySchema = z.object({
  location: z.string().optional().default(''),
  number: z.number().int().nonnegative().nullable(),
  cause: z.string().optional().default(''),
});

export const secondBarangayFormSchema = z.object({
  profileOfDisaster: z.object({
    typeOfDisaster: z.string().min(1, 'Required'),
    dateTimeOfOccurrence: z.string().min(1, 'Required'),
    areasAffected: z.string().min(1, 'Required'),
    sourceOfReports: z.string().min(1, 'Required'),
    dateTimeOfReports: z.string().min(1, 'Required'),
  }),

  initialEffects: z.object({
    affectedPopulation: populationSchema,
    displacedPopulation: populationSchema,
    casualties: z.object({
      dead: casualtyEntrySchema,
      injured: casualtyEntrySchema,
      missing: casualtyEntrySchema,
    }),
  }),

  searchRescue: z.object({
    exactLocations: z.string().min(1, 'Required'),
    approxMissingChildren: z.number().int().nonnegative().nullable(),
    approxMissingAdults: z.number().int().nonnegative().nullable(),
    responseStatus: z.string().optional().default(''),
    unmetNeeds: z.string().optional().default(''),
  }),

  evacuation: z.object({
    exactLocations: z.string().min(1, 'Required'),
    approxToEvacuateInfants: z.number().int().nonnegative().nullable(),
    approxToEvacuateChildren: z.number().int().nonnegative().nullable(),
    approxToEvacuateAdultsWomen: z.number().int().nonnegative().nullable(),
    responseDescription: z.string().optional().default(''),
    unmetNeeds: z.string().optional().default(''),
    evacuationCentersNames: z.string().optional().default(''),
    numberInECsNeedAssistance: z.string().optional().default(''),
    dailyRequirementsInECs: z.string().optional().default(''),
    enoughLatrinesInECs: yesNoSchema.nullable(),
  }),

  medicalHealth: z.object({
    exactLocations: z.string().min(1, 'Required'),
    numberInjured: z.number().int().nonnegative().nullable(),
    displacedNeedingMedAttentionFamilies: z.number().int().nonnegative().nullable(),
    displacedNeedingMedAttentionPersons: z.number().int().nonnegative().nullable(),
    displacedNeedingMedAttentionInfants: z.number().int().nonnegative().nullable(),
    displacedNeedingMedAttentionChildren: z.number().int().nonnegative().nullable(),
    displacedNeedingMedAttentionAdultsWomen: z.number().int().nonnegative().nullable(),
    unmetNeeds: z.string().optional().default(''),
    prevailingHealthCasesAndFacilities: z.string().optional().default(''),
    inChargeOfEmergencyHealthServices: z.string().optional().default(''),
    healthWorkersAssessingStatus: yesNoSchema.nullable(),
  }),

  shelterClothing: z.object({
    exactLocations: z.string().min(1, 'Required'),
    requiringShelterClothingMale: z.number().int().nonnegative().nullable(),
    requiringShelterClothingFemale: z.number().int().nonnegative().nullable(),
    requiringShelterClothingInfants: z.number().int().nonnegative().nullable(),
    requiringShelterClothingChildren: z.number().int().nonnegative().nullable(),
    requiringShelterClothingAdultsWomen: z.number().int().nonnegative().nullable(),
    responseStatus: z.string().optional().default(''),
    unmetNeeds: z.string().optional().default(''),
  }),

  food: z.object({
    exactLocations: z.string().min(1, 'Required'),
    peopleRequiringFoodTotal: z.number().int().nonnegative().nullable(),
    peopleRequiringFoodInfants: z.number().int().nonnegative().nullable(),
    peopleRequiringFoodChildren: z.number().int().nonnegative().nullable(),
    peopleRequiringFoodAdultsWomen: z.number().int().nonnegative().nullable(),
    responseStatus: z.string().optional().default(''),
    unmetNeeds: z.string().optional().default(''),
    foodResourcesAndBufferAvailable: yesNoSchema.nullable(),
    foodAssistanceEquallyDistributed: yesNoSchema.nullable(),
    childrenProvidedFoodAccordingToNeeds: yesNoSchema.nullable(),
    primeCommoditiesLocallyAvailable: yesNoSchema.nullable(),
  }),

  water: z.object({
    exactLocations: z.string().min(1, 'Required'),
    peopleWithoutPotableWaterTotal: z.number().int().nonnegative().nullable(),
    peopleWithoutPotableWaterInfants: z.number().int().nonnegative().nullable(),
    peopleWithoutPotableWaterChildren: z.number().int().nonnegative().nullable(),
    peopleWithoutPotableWaterAdultsWomen: z.number().int().nonnegative().nullable(),
    responseStatus: z.string().optional().default(''),
    unmetNeeds: z.string().optional().default(''),
    arrangementsForWaterStorageAndDistribution: yesNoSchema.nullable(),
    waterShortage: yesNoSchema.nullable(),
    waterShortageWidespreadOrConcentrated: yesNoSchema.nullable(),
    alternateSourcesOfWater: yesNoSchema.nullable(),
    serviceProvidersDidImmediateRepair: yesNoSchema.nullable(),
    serviceRestorationDays: z.number().int().nonnegative().nullable(),
  }),

  environmentalSanitation: z.object({
    enoughLatrinesAwayFromWaterSources: yesNoSchema.nullable(),
    washingFacilitiesAndCleaningMaterialsAvailable: yesNoSchema.nullable(),
  }),

  restorationOfLifelines: z.object({
    exactLocations: z.string().min(1, 'Required'),
    conditionOfLifelineSystems: z.string().optional().default(''),
    operationalStatusAndEmergencyMeasures: z.string().optional().default(''),
    responseStatus: z.string().optional().default(''),
    unmetNeeds: z.string().optional().default(''),
    powerInterruptionOccurred: yesNoSchema.nullable(),
    powerInterruptionDate: z.string().optional().default(''),
    powerInterruptionTime: z.string().optional().default(''),
    powerInterruptionProbableCause: z.string().optional().default(''),
    powerInterruptionWidespreadOrConcentrated: yesNoSchema.nullable(),
    electricPostsToppledDown: yesNoSchema.nullable(),
    serviceRestorationDays: z.number().int().nonnegative().nullable(),
    servicingCompaniesActions: z.string().optional().default(''),
  }),

  childrensEducation: z.object({
    schoolBuildingsDamaged: yesNoSchema.nullable(),
    childrenAffectedIfBuildingsDamaged: z.number().int().nonnegative().nullable(),
    extentOfDisruptionSituation: z.string().optional().default(''),
    childrenNeedingPrimaryEducationBoys: z.number().int().nonnegative().nullable(),
    childrenNeedingPrimaryEducationGirls: z.number().int().nonnegative().nullable(),
    targetGroupsLocation: z.string().optional().default(''),
    levelOfEducationOfChildren: z.string().optional().default(''),
    instructionalMaterialsAvailable: z.string().optional().default(''),
    existingFacilitiesForNonFormalSchooling: z.string().optional().default(''),
  }),

  localInitialResponse: z.object({
    emergencyRespondersInvolved: z.string().optional().default(''),
    assetsDeployed: z.string().optional().default(''),
    initiallyServedFamilies: z.number().int().nonnegative().nullable(),
    initiallyServedPersons: z.number().int().nonnegative().nullable(),
    initiallyServedInfants: z.number().int().nonnegative().nullable(),
    initiallyServedChildren: z.number().int().nonnegative().nullable(),
    initiallyServedAdults: z.number().int().nonnegative().nullable(),
    extentOfLocalAssistance: z.string().optional().default(''),
  }),

  signedByChairman: z.string().min(1, 'Required'),
});

export type SecondBarangayFormSchemaType = z.infer<typeof secondBarangayFormSchema>;
