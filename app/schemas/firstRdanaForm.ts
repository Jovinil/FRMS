// schemas/rdanaForm.schema.ts
import { z } from 'zod';
import { ShelterDamageRange } from '~/models/firstRdanaForm';

const yesNoSchema = z.enum(['yes', 'no']);
const yesNoUnknownSchema = z.enum(['yes', 'no', 'unknown']);

const localAuthoritySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().nonnegative().nullable(),
  officeOrganization: z.string().optional().default(''),
  designation: z.string().optional().default(''),
  phoneNumber: z.string().optional().default(''),
  email: z.string().email().optional().or(z.literal('')).nullable().default(''),
});

const profileSchema = z.object({
  emergencyOperation: z.object({
    nameOfOperation: z.string().min(1, 'Required'),
    typeOfDisaster: z.string().min(1, 'Required'),
    dateTimeOfEvent: z.string().min(1, 'Required'),
  }),
  mission: z.object({
    region: z.string().min(1, 'Required'),
    province: z.string().min(1, 'Required'),
    cityMunicipality: z.string().min(1, 'Required'),
    barangay: z.string().min(1, 'Required'),
    sitioPurok: z.string().optional().default(''),
    gpsCoordinate: z.string().optional().default(''),
    dateTimeOfRdana: z.string().min(1, 'Required'),
  }),
  localAuthorities: z.array(localAuthoritySchema).min(1),
  summaryDescription: z.string().optional().default(''),
});

const initialImpactSchema = z.object({
  affectedFamilies: z.number().int().nonnegative().nullable(),
  affectedPersons: z.number().int().nonnegative().nullable(),
  displacedFamiliesInsideECs: z.number().int().nonnegative().nullable(),
  displacedPersonsInsideECs: z.number().int().nonnegative().nullable(),
  displacedFamiliesOutsideECs: z.number().int().nonnegative().nullable(),
  displacedPersonsOutsideECs: z.number().int().nonnegative().nullable(),
  affectedChildren: z.object({
    age0to2: z.number().int().nonnegative().nullable(),
    age3to5: z.number().int().nonnegative().nullable(),
    age6to12: z.number().int().nonnegative().nullable(),
    age13to17: z.number().int().nonnegative().nullable(),
  }),
  pwd: z.number().int().nonnegative().nullable(),
  elderly: z.number().int().nonnegative().nullable(),
  missingMale: z.number().int().nonnegative().nullable(),
  missingFemale: z.number().int().nonnegative().nullable(),
  missingTotal: z.number().int().nonnegative().nullable(),
  injuredMale: z.number().int().nonnegative().nullable(),
  injuredFemale: z.number().int().nonnegative().nullable(),
  injuredTotal: z.number().int().nonnegative().nullable(),
  deadMale: z.number().int().nonnegative().nullable(),
  deadFemale: z.number().int().nonnegative().nullable(),
  deadTotal: z.number().int().nonnegative().nullable(),
});

const accessibilitySchema = z.object({
  communityAccessible: yesNoSchema.nullable(),
  accessModes: z.array(z.string()),
  hasDamagedRoadsOrBridges: yesNoSchema.nullable(),
  damagePassability: z.enum(['partially_passable', 'totally_unpassable']).nullable(),
  immediateAccessNeeds: z.array(z.string()),
  immediateAccessNeedOther: z.string().optional().default(''),
});

const powerSchema = z.object({
  powerStatus: z
    .enum(['yes', 'none', 'partial', 'limited', 'no_power_before_disaster'])
    .nullable(),
  partialWithoutPowerPercent: z.number().min(0).max(100).nullable(),
  limitedFromTime: z.string().optional().default(''),
  limitedToTime: z.string().optional().default(''),
  powerDamages: z.array(z.string()),
  powerDamageOther: z.string().optional().default(''),
  fuelStockDays: z.number().int().nonnegative().nullable(),
  urgentPowerNeeds: z.array(z.string()),
  urgentPowerGeneratorQty: z.number().int().nonnegative().nullable(),
  urgentGasolineQty: z.number().int().nonnegative().nullable(),
  urgentDieselQty: z.number().int().nonnegative().nullable(),
});

const communicationsSchema = z.object({
  telcoSignals: z.array(z.string()),
  telcoSignalOther: z.string().optional().default(''),
  mediaServices: z.array(z.string()),
  altCommunications: z.array(z.string()),
  immediateCommNeeds: z.array(z.string()),
  immediateCommNeedOther: z.string().optional().default(''),
});

const evacuationCenterSchema = z.object({
  name: z.string().optional().default(''),
  address: z.string().optional().default(''),
  gpsCoordinates: z.string().optional().default(''),
  familiesInside: z.number().int().nonnegative().nullable(),
  personsInside: z.number().int().nonnegative().nullable(),
});

const evacuationSchema = z.object({
  hasEvacuationCenter: yesNoSchema.nullable(),
  hasCampManager: yesNoSchema.nullable(),
  centers: z.array(evacuationCenterSchema),
  protectionMechanisms: z.array(z.string()),
  protectionMechanismOther: z.string().optional().default(''),
  facilitiesOperational: z.array(z.string()),
  facilityOther: z.string().optional().default(''),
});

const reliefItemSchema = z.object({
  particular: z.string().optional().default(''),
  quantity: z.number().int().nonnegative().nullable(),
});

const reliefOrgSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  contactPerson: z.string().optional().default(''),
  contactDetails: z.string().optional().default(''),
  assistanceGiven: z.array(reliefItemSchema),
  serviceDateStart: z.string().optional().default(''),
  serviceDateEnd: z.string().optional().default(''),
  familiesServed: z.number().int().nonnegative().nullable(),
});

const reliefSchema = z.object({
  hasReceivedAssistance: yesNoSchema.nullable(),
  assistanceList: z.array(reliefOrgSchema),
});

const srrSchema = z.object({
  srrNeeded: yesNoUnknownSchema.nullable(),
  srrTypes: z.array(z.string()),
  srrOther: z.string().optional().default(''),
});

const lawAndOrderSchema = z.object({
  lawAndOrderProblem: yesNoUnknownSchema.nullable(),
  threats: z.array(z.string()),
  threatsOther: z.string().optional().default(''),
  securityPresence: z.array(z.string()),
  securityPresenceOther: z.string().optional().default(''),
});

const shelterSchema = z.object({
  destroyedHousesNumber: z.number().int().nonnegative().nullable(),
  destroyedHousesRange: z.nativeEnum(ShelterDamageRange).nullable(),
  damagedHousesNumber: z.number().int().nonnegative().nullable(),
  damagedHousesRange: z.nativeEnum(ShelterDamageRange).nullable(),
  immediateShelterNeeds: z.array(z.string()),
  immediateShelterNeedOther: z.string().optional().default(''),
});

const foodSecuritySchema = z.object({
  peopleHaveAccessToFood: yesNoSchema.nullable(),
  mainSourcesOfFood: z.array(z.string()),
  mainSourceOfFoodOther: z.string().optional().default(''),
  localMarketOperating: yesNoSchema.nullable(),
  hasFoodWarehouse: yesNoSchema.nullable(),
  immediateFoodNeeds: z.array(z.string()),
  immediateFoodNeedOther: z.string().optional().default(''),
});

const waterSupplySchema = z.object({
  accessToDrinkingWater: yesNoSchema.nullable(),
  accessToDomesticWater: yesNoSchema.nullable(),
  primaryDrinkingWaterSource: z.string().nullable(),
  primaryDrinkingWaterSourceOther: z.string().optional().default(''),
  householdsHaveWaterContainersWithLid: yesNoSchema.nullable(),
  immediateWaterNeeds: z.array(z.string()),
  immediateWaterNeedOther: z.string().optional().default(''),
});

const sanitationSchema = z.object({
  accessToFunctioningSanitaryFacilities: yesNoSchema.nullable(),
  separateFacilitiesForWomenAndMen: yesNoSchema.nullable(),
  adequateHygieneSupplies: yesNoSchema.nullable(),
  immediateSanitationNeeds: z.array(z.string()),
  immediateSanitationNeedOther: z.string().optional().default(''),
});

const healthSchema = z.object({
  accessToHealthServices: yesNoUnknownSchema.nullable(),
  functionalHealthFacilities: z.array(z.string()),
  functionalHealthFacilityOther: z.string().optional().default(''),
  mainHealthConcerns: z.array(z.string()),
  mainHealthConcernOther: z.string().optional().default(''),
  medicinesAvailability: z.enum(['adequate', 'inadequate']).nullable(),
  immediateHealthNeeds: z.array(z.string()),
  immediateHealthNeedOther: z.string().optional().default(''),
});

const nutritionSchema = z.object({
  infoOnExclusivelyBreastfedInfants: yesNoSchema.nullable(),
  milkProductsDistributed: yesNoSchema.nullable(),
  vitaminA6to59Months: yesNoSchema.nullable(),
  ironFolicForPregLactating: yesNoSchema.nullable(),
  micronutrientPowders: yesNoSchema.nullable(),
  managementOfAcuteMalnutrition: yesNoSchema.nullable(),
  immediateNutritionNeeds: z.array(z.string()),
  immediateNutritionNeedOther: z.string().optional().default(''),
});

const protectionSchema = z.object({
  violenceCasesPresent: yesNoUnknownSchema.nullable(),
  vulnerableGroupsPresent: z.array(z.string()),
  reportingMechanismExists: yesNoSchema.nullable(),
  immediateProtectionNeeds: z.array(z.string()),
  immediateProtectionNeedOther: z.string().optional().default(''),
});

const educationSchema = z.object({
  classroomsUsedAsEC: z.number().int().nonnegative().nullable(),
  childrenStayingInEC: z.number().int().nonnegative().nullable(),
  destroyedClassrooms: z.number().int().nonnegative().nullable(),
  damagedClassrooms: z.number().int().nonnegative().nullable(),
  urgentEducationalNeeds: z.array(z.string()),
  urgentEducationalNeedOther: z.string().optional().default(''),
});

const livelihoodSchema = z.object({
  mainSourceOfLivelihood: z.string().optional().default(''),
  immediateLivelihoodNeeds: z.array(z.string()),
  immediateLivelihoodNeedOther: z.string().optional().default(''),
});

const communityEngagementSchema = z.object({
  communityReceivingInformation: yesNoUnknownSchema.nullable(),
  whatPeopleWantToKnow: z.array(z.string()),
  whatPeopleWantToKnowOther: z.string().optional().default(''),
  mainInformationSources: z.array(z.string()),
  mainInformationSourceOther: z.string().optional().default(''),
});

const overallAssessmentSchema = z.object({
  situationAssessment: z
    .enum(['serious_problems', 'people_may_get_sick_or_die', 'many_already_died'])
    .nullable(),
  justification: z.string().optional().default(''),
});

const submittedBySchema = z.object({
  name: z.string().min(1, 'Required'),
  designation: z.string().min(1, 'Required'),
  organization: z.string().min(1, 'Required'),
  rdanaTeam: z.string().optional().default(''),
  contactNumber: z.string().optional().default(''),
  email: z.string().email().optional().or(z.literal('')).nullable().default(''),
});

export const rdanaFormSchema = z.object({
  profile: profileSchema,
  initialImpact: initialImpactSchema,
  accessibility: accessibilitySchema,
  power: powerSchema,
  communications: communicationsSchema,
  evacuation: evacuationSchema,
  relief: reliefSchema,
  srr: srrSchema,
  lawAndOrder: lawAndOrderSchema,
  shelter: shelterSchema,
  foodSecurity: foodSecuritySchema,
  waterSupply: waterSupplySchema,
  sanitation: sanitationSchema,
  health: healthSchema,
  nutrition: nutritionSchema,
  protection: protectionSchema,
  education: educationSchema,
  livelihood: livelihoodSchema,
  communityEngagement: communityEngagementSchema,
  overallAssessment: overallAssessmentSchema,
  submittedBy: submittedBySchema,
});

export type RdanaFormSchemaType = z.infer<typeof rdanaFormSchema>;
