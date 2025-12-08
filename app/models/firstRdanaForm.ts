// models/rdanaForm.ts

export type YesNo = 'yes' | 'no';
export type YesNoUnknown = 'yes' | 'no' | 'unknown';

export enum AccessMode {
  CarBus = 'car_bus',
  Truck4wd10wheeler = 'truck_4wd_6_10_wheeler',
  Motorcycle = 'motorcycle',
  Foot = 'foot',
  Boat = 'boat',
  Airplane = 'airplane',
  Helicopter = 'helicopter',
  Animal = 'horse_cow_carabao',
}

export enum ShelterDamageRange {
  Lt25 = '<25%',
  From26To50 = '26-50%',
  From51To75 = '51-75%',
  Gt75 = '>75%',
}

export interface RdanaEmergencyOperation {
  nameOfOperation: string;
  typeOfDisaster: string;
  dateTimeOfEvent: string; // ISO string or plain text
}

export interface RdanaMission {
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  sitioPurok: string;
  gpsCoordinate: string;
  dateTimeOfRdana: string;
}

export interface RdanaLocalAuthority {
  name: string;
  age: number | null;
  officeOrganization: string;
  designation: string;
  phoneNumber: string;
  email: string;
}

export interface RdanaProfileOfDisaster {
  emergencyOperation: RdanaEmergencyOperation;
  mission: RdanaMission;
  localAuthorities: RdanaLocalAuthority[];
  summaryDescription: string;
}

export interface RdanaChildrenAffectedByAge {
  age0to2: number | null;
  age3to5: number | null;
  age6to12: number | null;
  age13to17: number | null;
}

export interface RdanaInitialImpact {
  affectedFamilies: number | null;
  affectedPersons: number | null;

  displacedFamiliesInsideECs: number | null;
  displacedPersonsInsideECs: number | null;

  displacedFamiliesOutsideECs: number | null;
  displacedPersonsOutsideECs: number | null;

  affectedChildren: RdanaChildrenAffectedByAge;
  pwd: number | null;
  elderly: number | null;

  missingMale: number | null;
  missingFemale: number | null;
  missingTotal: number | null;

  injuredMale: number | null;
  injuredFemale: number | null;
  injuredTotal: number | null;

  deadMale: number | null;
  deadFemale: number | null;
  deadTotal: number | null;
}

export interface RdanaAccessibility {
  communityAccessible: YesNo | null;
  accessModes: AccessMode[];

  hasDamagedRoadsOrBridges: YesNo | null;
  damagePassability: 'partially_passable' | 'totally_unpassable' | null;

  immediateAccessNeeds: string[]; // list of ids like 'transport', 'debris_clearing', 'road_repair', etc.
  immediateAccessNeedOther: string;
}

export interface RdanaPower {
  powerStatus:
    | 'yes'
    | 'none'
    | 'partial'
    | 'limited'
    | 'no_power_before_disaster'
    | null;
  partialWithoutPowerPercent: number | null;
  limitedFromTime: string;
  limitedToTime: string;

  powerDamages: string[]; // e.g. 'fallen_posts', 'cut_power_lines', etc.
  powerDamageOther: string;

  fuelStockDays: number | null;

  urgentPowerNeeds: string[]; // 'generators', 'gasoline_for_generators', 'diesel_for_generators'
  urgentPowerGeneratorQty: number | null;
  urgentGasolineQty: number | null;
  urgentDieselQty: number | null;
}

export interface RdanaCommunications {
  telcoSignals: string[]; // 'smart_sun', 'globe_tm', 'others'
  telcoSignalOther: string;

  mediaServices: string[]; // 'radio_am', 'radio_fm', 'tv_free_air', 'tv_cable', 'tv_satellite'
  altCommunications: string[]; // 'satellite_phone', 'vhf_radio', 'uhf_radio', 'hf_ssb_radio', 'bgan', 'v_sat'

  immediateCommNeeds: string[];
  immediateCommNeedOther: string;
}

export interface RdanaEvacuationCenter {
  name: string;
  address: string;
  gpsCoordinates: string;
  familiesInside: number | null;
  personsInside: number | null;
}

export interface RdanaEvacuation {
  hasEvacuationCenter: YesNo | null;
  hasCampManager: YesNo | null;

  centers: RdanaEvacuationCenter[];

  protectionMechanisms: string[]; // ids like 'security_patrols', 'police_presence', etc.
  protectionMechanismOther: string;

  facilitiesOperational: string[]; // 'lighting', 'ventilation', 'sleeping_areas_partition', ...
  facilityOther: string;
}

export interface RdanaReliefAssistanceItem {
  particular: string;
  quantity: number | null;
}

export interface RdanaReliefAssistanceOrg {
  organizationName: string;
  contactPerson: string;
  contactDetails: string;
  assistanceGiven: RdanaReliefAssistanceItem[];
  serviceDateStart: string;
  serviceDateEnd: string;
  familiesServed: number | null;
}

export interface RdanaRelief {
  hasReceivedAssistance: YesNo | null;
  assistanceList: RdanaReliefAssistanceOrg[];
}

export interface RdanaSearchRescueRetrieval {
  srrNeeded: YesNoUnknown | null;
  srrTypes: string[]; // 'sar', 'usar', 'mountain_sar', 'water_sar', etc.
  srrOther: string;
}

export interface RdanaLawAndOrder {
  lawAndOrderProblem: YesNoUnknown | null;
  threats: string[];
  threatsOther: string;
  securityPresence: string[];
  securityPresenceOther: string;
}

export interface RdanaShelter {
  destroyedHousesNumber: number | null;
  destroyedHousesRange: ShelterDamageRange | null;

  damagedHousesNumber: number | null;
  damagedHousesRange: ShelterDamageRange | null;

  immediateShelterNeeds: string[];
  immediateShelterNeedOther: string;
}

export interface RdanaFoodSecurity {
  peopleHaveAccessToFood: YesNo | null;
  mainSourcesOfFood: string[];
  mainSourceOfFoodOther: string;

  localMarketOperating: YesNo | null;
  hasFoodWarehouse: YesNo | null;

  immediateFoodNeeds: string[];
  immediateFoodNeedOther: string;
}

export interface RdanaWaterSupply {
  accessToDrinkingWater: YesNo | null;
  accessToDomesticWater: YesNo | null;

  primaryDrinkingWaterSource: string | null;
  primaryDrinkingWaterSourceOther: string;

  householdsHaveWaterContainersWithLid: YesNo | null;

  immediateWaterNeeds: string[];
  immediateWaterNeedOther: string;
}

export interface RdanaSanitation {
  accessToFunctioningSanitaryFacilities: YesNo | null;
  separateFacilitiesForWomenAndMen: YesNo | null;
  adequateHygieneSupplies: YesNo | null;
  immediateSanitationNeeds: string[];
  immediateSanitationNeedOther: string;
}

export interface RdanaHealth {
  accessToHealthServices: YesNoUnknown | null;
  functionalHealthFacilities: string[];
  functionalHealthFacilityOther: string;

  mainHealthConcerns: string[];
  mainHealthConcernOther: string;

  medicinesAvailability: 'adequate' | 'inadequate' | null;

  immediateHealthNeeds: string[];
  immediateHealthNeedOther: string;
}

export interface RdanaNutrition {
  infoOnExclusivelyBreastfedInfants: YesNo | null;
  milkProductsDistributed: YesNo | null;

  vitaminA6to59Months: YesNo | null;
  ironFolicForPregLactating: YesNo | null;
  micronutrientPowders: YesNo | null;
  managementOfAcuteMalnutrition: YesNo | null;

  immediateNutritionNeeds: string[];
  immediateNutritionNeedOther: string;
}

export interface RdanaProtection {
  violenceCasesPresent: YesNoUnknown | null;
  vulnerableGroupsPresent: string[];
  reportingMechanismExists: YesNo | null;
  immediateProtectionNeeds: string[];
  immediateProtectionNeedOther: string;
}

export interface RdanaEducation {
  classroomsUsedAsEC: number | null;
  childrenStayingInEC: number | null;
  destroyedClassrooms: number | null;
  damagedClassrooms: number | null;

  urgentEducationalNeeds: string[];
  urgentEducationalNeedOther: string;
}

export interface RdanaLivelihood {
  mainSourceOfLivelihood: string;
  immediateLivelihoodNeeds: string[];
  immediateLivelihoodNeedOther: string;
}

export interface RdanaCommunityEngagement {
  communityReceivingInformation: YesNoUnknown | null;

  whatPeopleWantToKnow: string[];
  whatPeopleWantToKnowOther: string;

  mainInformationSources: string[];
  mainInformationSourceOther: string;
}

export interface RdanaOverallAssessment {
  situationAssessment: 'serious_problems' | 'people_may_get_sick_or_die' | 'many_already_died' | null;
  justification: string;
}

export interface RdanaSubmittedBy {
  name: string;
  designation: string;
  organization: string;
  rdanaTeam: string;
  contactNumber: string;
  email: string;
}

export interface RdanaForm {
  profile: RdanaProfileOfDisaster;
  initialImpact: RdanaInitialImpact;
  accessibility: RdanaAccessibility;
  power: RdanaPower;
  communications: RdanaCommunications;
  evacuation: RdanaEvacuation;
  relief: RdanaRelief;
  srr: RdanaSearchRescueRetrieval;
  lawAndOrder: RdanaLawAndOrder;
  shelter: RdanaShelter;
  foodSecurity: RdanaFoodSecurity;
  waterSupply: RdanaWaterSupply;
  sanitation: RdanaSanitation;
  health: RdanaHealth;
  nutrition: RdanaNutrition;
  protection: RdanaProtection;
  education: RdanaEducation;
  livelihood: RdanaLivelihood;
  communityEngagement: RdanaCommunityEngagement;
  overallAssessment: RdanaOverallAssessment;
  submittedBy: RdanaSubmittedBy;
}

export function createDefaultRdanaForm(): RdanaForm {
  return {
    profile: {
      emergencyOperation: {
        nameOfOperation: '',
        typeOfDisaster: '',
        dateTimeOfEvent: '',
      },
      mission: {
        region: '',
        province: '',
        cityMunicipality: '',
        barangay: '',
        sitioPurok: '',
        gpsCoordinate: '',
        dateTimeOfRdana: '',
      },
      localAuthorities: [
        {
          name: '',
          age: null,
          officeOrganization: '',
          designation: '',
          phoneNumber: '',
          email: '',
        },
      ],
      summaryDescription: '',
    },
    initialImpact: {
      affectedFamilies: null,
      affectedPersons: null,
      displacedFamiliesInsideECs: null,
      displacedPersonsInsideECs: null,
      displacedFamiliesOutsideECs: null,
      displacedPersonsOutsideECs: null,
      affectedChildren: {
        age0to2: null,
        age3to5: null,
        age6to12: null,
        age13to17: null,
      },
      pwd: null,
      elderly: null,
      missingMale: null,
      missingFemale: null,
      missingTotal: null,
      injuredMale: null,
      injuredFemale: null,
      injuredTotal: null,
      deadMale: null,
      deadFemale: null,
      deadTotal: null,
    },
    accessibility: {
      communityAccessible: null,
      accessModes: [],
      hasDamagedRoadsOrBridges: null,
      damagePassability: null,
      immediateAccessNeeds: [],
      immediateAccessNeedOther: '',
    },
    power: {
      powerStatus: null,
      partialWithoutPowerPercent: null,
      limitedFromTime: '',
      limitedToTime: '',
      powerDamages: [],
      powerDamageOther: '',
      fuelStockDays: null,
      urgentPowerNeeds: [],
      urgentPowerGeneratorQty: null,
      urgentGasolineQty: null,
      urgentDieselQty: null,
    },
    communications: {
      telcoSignals: [],
      telcoSignalOther: '',
      mediaServices: [],
      altCommunications: [],
      immediateCommNeeds: [],
      immediateCommNeedOther: '',
    },
    evacuation: {
      hasEvacuationCenter: null,
      hasCampManager: null,
      centers: [
        {
          name: '',
          address: '',
          gpsCoordinates: '',
          familiesInside: null,
          personsInside: null,
        },
      ],
      protectionMechanisms: [],
      protectionMechanismOther: '',
      facilitiesOperational: [],
      facilityOther: '',
    },
    relief: {
      hasReceivedAssistance: null,
      assistanceList: [],
    },
    srr: {
      srrNeeded: null,
      srrTypes: [],
      srrOther: '',
    },
    lawAndOrder: {
      lawAndOrderProblem: null,
      threats: [],
      threatsOther: '',
      securityPresence: [],
      securityPresenceOther: '',
    },
    shelter: {
      destroyedHousesNumber: null,
      destroyedHousesRange: null,
      damagedHousesNumber: null,
      damagedHousesRange: null,
      immediateShelterNeeds: [],
      immediateShelterNeedOther: '',
    },
    foodSecurity: {
      peopleHaveAccessToFood: null,
      mainSourcesOfFood: [],
      mainSourceOfFoodOther: '',
      localMarketOperating: null,
      hasFoodWarehouse: null,
      immediateFoodNeeds: [],
      immediateFoodNeedOther: '',
    },
    waterSupply: {
      accessToDrinkingWater: null,
      accessToDomesticWater: null,
      primaryDrinkingWaterSource: null,
      primaryDrinkingWaterSourceOther: '',
      householdsHaveWaterContainersWithLid: null,
      immediateWaterNeeds: [],
      immediateWaterNeedOther: '',
    },
    sanitation: {
      accessToFunctioningSanitaryFacilities: null,
      separateFacilitiesForWomenAndMen: null,
      adequateHygieneSupplies: null,
      immediateSanitationNeeds: [],
      immediateSanitationNeedOther: '',
    },
    health: {
      accessToHealthServices: null,
      functionalHealthFacilities: [],
      functionalHealthFacilityOther: '',
      mainHealthConcerns: [],
      mainHealthConcernOther: '',
      medicinesAvailability: null,
      immediateHealthNeeds: [],
      immediateHealthNeedOther: '',
    },
    nutrition: {
      infoOnExclusivelyBreastfedInfants: null,
      milkProductsDistributed: null,
      vitaminA6to59Months: null,
      ironFolicForPregLactating: null,
      micronutrientPowders: null,
      managementOfAcuteMalnutrition: null,
      immediateNutritionNeeds: [],
      immediateNutritionNeedOther: '',
    },
    protection: {
      violenceCasesPresent: null,
      vulnerableGroupsPresent: [],
      reportingMechanismExists: null,
      immediateProtectionNeeds: [],
      immediateProtectionNeedOther: '',
    },
    education: {
      classroomsUsedAsEC: null,
      childrenStayingInEC: null,
      destroyedClassrooms: null,
      damagedClassrooms: null,
      urgentEducationalNeeds: [],
      urgentEducationalNeedOther: '',
    },
    livelihood: {
      mainSourceOfLivelihood: '',
      immediateLivelihoodNeeds: [],
      immediateLivelihoodNeedOther: '',
    },
    communityEngagement: {
      communityReceivingInformation: null,
      whatPeopleWantToKnow: [],
      whatPeopleWantToKnowOther: '',
      mainInformationSources: [],
      mainInformationSourceOther: '',
    },
    overallAssessment: {
      situationAssessment: null,
      justification: '',
    },
    submittedBy: {
      name: '',
      designation: '',
      organization: '',
      rdanaTeam: '',
      contactNumber: '',
      email: '',
    },
  };
}
