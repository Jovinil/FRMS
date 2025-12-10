// models/secondBarangayForm.ts
import type { YesNo } from '~/models/firstRdanaForm'; // or define: export type YesNo = 'yes' | 'no';

export interface SecondBarangayAffectedBreakdown {
  infants: number | null;
  children: number | null;
  adults: number | null;
}

export interface SecondBarangayPopulation {
  families: number | null;
  persons: number | null;
  breakdown: SecondBarangayAffectedBreakdown;
}

export interface SecondBarangayCasualtyEntry {
  location: string;
  number: number | null;
  cause: string;
}

export interface SecondBarangayCasualties {
  dead: SecondBarangayCasualtyEntry;
  injured: SecondBarangayCasualtyEntry;
  missing: SecondBarangayCasualtyEntry;
}

export interface SecondBarangayProfileOfDisaster {
  typeOfDisaster: string;
  dateTimeOfOccurrence: string;
  areasAffected: string;
  sourceOfReports: string;
  dateTimeOfReports: string;
}

export interface SecondBarangayInitialEffects {
  affectedPopulation: SecondBarangayPopulation;
  displacedPopulation: SecondBarangayPopulation;
  casualties: SecondBarangayCasualties;
}

// 1. Search & Rescue
export interface SecondBarangaySearchRescue {
  exactLocations: string;
  approxMissingChildren: number | null;
  approxMissingAdults: number | null;
  responseStatus: string;
  unmetNeeds: string;
}

// 2. Evacuation
export interface SecondBarangayEvacuation {
  exactLocations: string;
  approxToEvacuateInfants: number | null;
  approxToEvacuateChildren: number | null;
  approxToEvacuateAdultsWomen: number | null;
  responseDescription: string;
  unmetNeeds: string;
  evacuationCentersNames: string;
  numberInECsNeedAssistance: string;
  dailyRequirementsInECs: string;
  enoughLatrinesInECs: YesNo | null;
}

// 3. Medical Health
export interface SecondBarangayMedicalHealth {
  exactLocations: string;
  numberInjured: number | null;
  displacedNeedingMedAttentionFamilies: number | null;
  displacedNeedingMedAttentionPersons: number | null;
  displacedNeedingMedAttentionInfants: number | null;
  displacedNeedingMedAttentionChildren: number | null;
  displacedNeedingMedAttentionAdultsWomen: number | null;
  unmetNeeds: string;
  prevailingHealthCasesAndFacilities: string;
  inChargeOfEmergencyHealthServices: string;
  healthWorkersAssessingStatus: YesNo | null;
}

// 4. Shelter & Clothing
export interface SecondBarangayShelterClothing {
  exactLocations: string;
  requiringShelterClothingMale: number | null;
  requiringShelterClothingFemale: number | null;
  requiringShelterClothingInfants: number | null;
  requiringShelterClothingChildren: number | null;
  requiringShelterClothingAdultsWomen: number | null;
  responseStatus: string;
  unmetNeeds: string;
}

// 5. Food
export interface SecondBarangayFood {
  exactLocations: string;
  peopleRequiringFoodTotal: number | null;
  peopleRequiringFoodInfants: number | null;
  peopleRequiringFoodChildren: number | null;
  peopleRequiringFoodAdultsWomen: number | null;
  responseStatus: string;
  unmetNeeds: string;
  foodResourcesAndBufferAvailable: YesNo | null;
  foodAssistanceEquallyDistributed: YesNo | null;
  childrenProvidedFoodAccordingToNeeds: YesNo | null;
  primeCommoditiesLocallyAvailable: YesNo | null;
}

// 6. Water
export interface SecondBarangayWater {
  exactLocations: string;
  peopleWithoutPotableWaterTotal: number | null;
  peopleWithoutPotableWaterInfants: number | null;
  peopleWithoutPotableWaterChildren: number | null;
  peopleWithoutPotableWaterAdultsWomen: number | null;
  responseStatus: string;
  unmetNeeds: string;
  arrangementsForWaterStorageAndDistribution: YesNo | null;
  waterShortage: YesNo | null;
  waterShortageWidespreadOrConcentrated: YesNo | null;
  alternateSourcesOfWater: YesNo | null;
  serviceProvidersDidImmediateRepair: YesNo | null;
  serviceRestorationDays: number | null;
}

// 7. Environmental Sanitation
export interface SecondBarangayEnvironmentalSanitation {
  enoughLatrinesAwayFromWaterSources: YesNo | null;
  washingFacilitiesAndCleaningMaterialsAvailable: YesNo | null;
}

// 8. Restoration of Lifelines
export interface SecondBarangayRestorationOfLifelines {
  exactLocations: string;
  conditionOfLifelineSystems: string;
  operationalStatusAndEmergencyMeasures: string;
  responseStatus: string;
  unmetNeeds: string;
  powerInterruptionOccurred: YesNo | null;
  powerInterruptionDate: string;
  powerInterruptionTime: string;
  powerInterruptionProbableCause: string;
  powerInterruptionWidespreadOrConcentrated: YesNo | null;
  electricPostsToppledDown: YesNo | null;
  serviceRestorationDays: number | null;
  servicingCompaniesActions: string;
}

// 9. Children’s Educational Needs
export interface SecondBarangayChildrensEducation {
  schoolBuildingsDamaged: YesNo | null;
  childrenAffectedIfBuildingsDamaged: number | null;
  extentOfDisruptionSituation: string;
  childrenNeedingPrimaryEducationBoys: number | null;
  childrenNeedingPrimaryEducationGirls: number | null;
  targetGroupsLocation: string;
  levelOfEducationOfChildren: string;
  instructionalMaterialsAvailable: string;
  existingFacilitiesForNonFormalSchooling: string;
}

// E. Local Initial Response
export interface SecondBarangayLocalInitialResponse {
  emergencyRespondersInvolved: string;
  assetsDeployed: string;
  initiallyServedFamilies: number | null;
  initiallyServedPersons: number | null;
  initiallyServedInfants: number | null;
  initiallyServedChildren: number | null;
  initiallyServedAdults: number | null;
  extentOfLocalAssistance: string;
}

export interface SecondBarangayForm {
  profileOfDisaster: SecondBarangayProfileOfDisaster;
  initialEffects: SecondBarangayInitialEffects;

  searchRescue: SecondBarangaySearchRescue;
  evacuation: SecondBarangayEvacuation;
  medicalHealth: SecondBarangayMedicalHealth;
  shelterClothing: SecondBarangayShelterClothing;
  food: SecondBarangayFood;
  water: SecondBarangayWater;
  environmentalSanitation: SecondBarangayEnvironmentalSanitation;
  restorationOfLifelines: SecondBarangayRestorationOfLifelines;
  childrensEducation: SecondBarangayChildrensEducation;
  localInitialResponse: SecondBarangayLocalInitialResponse;

  signedByChairman: string;
}

export function createDefaultSecondBarangayForm(): SecondBarangayForm {
  return {
    profileOfDisaster: {
      typeOfDisaster: '',
      dateTimeOfOccurrence: '',
      areasAffected: '',
      sourceOfReports: '',
      dateTimeOfReports: '',
    },
    initialEffects: {
      affectedPopulation: {
        families: null,
        persons: null,
        breakdown: {
          infants: null,
          children: null,
          adults: null,
        },
      },
      displacedPopulation: {
        families: null,
        persons: null,
        breakdown: {
          infants: null,
          children: null,
          adults: null,
        },
      },
      casualties: {
        dead: {
          location: '',
          number: null,
          cause: '',
        },
        injured: {
          location: '',
          number: null,
          cause: '',
        },
        missing: {
          location: '',
          number: null,
          cause: '',
        },
      },
    },
    searchRescue: {
      exactLocations: '',
      approxMissingChildren: null,
      approxMissingAdults: null,
      responseStatus: '',
      unmetNeeds: '',
    },
    evacuation: {
      exactLocations: '',
      approxToEvacuateInfants: null,
      approxToEvacuateChildren: null,
      approxToEvacuateAdultsWomen: null,
      responseDescription: '',
      unmetNeeds: '',
      evacuationCentersNames: '',
      numberInECsNeedAssistance: '',
      dailyRequirementsInECs: '',
      enoughLatrinesInECs: null,
    },
    medicalHealth: {
      exactLocations: '',
      numberInjured: null,
      displacedNeedingMedAttentionFamilies: null,
      displacedNeedingMedAttentionPersons: null,
      displacedNeedingMedAttentionInfants: null,
      displacedNeedingMedAttentionChildren: null,
      displacedNeedingMedAttentionAdultsWomen: null,
      unmetNeeds: '',
      prevailingHealthCasesAndFacilities: '',
      inChargeOfEmergencyHealthServices: '',
      healthWorkersAssessingStatus: null,
    },
    shelterClothing: {
      exactLocations: '',
      requiringShelterClothingMale: null,
      requiringShelterClothingFemale: null,
      requiringShelterClothingInfants: null,
      requiringShelterClothingChildren: null,
      requiringShelterClothingAdultsWomen: null,
      responseStatus: '',
      unmetNeeds: '',
    },
    food: {
      exactLocations: '',
      peopleRequiringFoodTotal: null,
      peopleRequiringFoodInfants: null,
      peopleRequiringFoodChildren: null,
      peopleRequiringFoodAdultsWomen: null,
      responseStatus: '',
      unmetNeeds: '',
      foodResourcesAndBufferAvailable: null,
      foodAssistanceEquallyDistributed: null,
      childrenProvidedFoodAccordingToNeeds: null,
      primeCommoditiesLocallyAvailable: null,
    },
    water: {
      exactLocations: '',
      peopleWithoutPotableWaterTotal: null,
      peopleWithoutPotableWaterInfants: null,
      peopleWithoutPotableWaterChildren: null,
      peopleWithoutPotableWaterAdultsWomen: null,
      responseStatus: '',
      unmetNeeds: '',
      arrangementsForWaterStorageAndDistribution: null,
      waterShortage: null,
      waterShortageWidespreadOrConcentrated: null,
      alternateSourcesOfWater: null,
      serviceProvidersDidImmediateRepair: null,
      serviceRestorationDays: null,
    },
    environmentalSanitation: {
      enoughLatrinesAwayFromWaterSources: null,
      washingFacilitiesAndCleaningMaterialsAvailable: null,
    },
    restorationOfLifelines: {
      exactLocations: '',
      conditionOfLifelineSystems: '',
      operationalStatusAndEmergencyMeasures: '',
      responseStatus: '',
      unmetNeeds: '',
      powerInterruptionOccurred: null,
      powerInterruptionDate: '',
      powerInterruptionTime: '',
      powerInterruptionProbableCause: '',
      powerInterruptionWidespreadOrConcentrated: null,
      electricPostsToppledDown: null,
      serviceRestorationDays: null,
      servicingCompaniesActions: '',
    },
    childrensEducation: {
      schoolBuildingsDamaged: null,
      childrenAffectedIfBuildingsDamaged: null,
      extentOfDisruptionSituation: '',
      childrenNeedingPrimaryEducationBoys: null,
      childrenNeedingPrimaryEducationGirls: null,
      targetGroupsLocation: '',
      levelOfEducationOfChildren: '',
      instructionalMaterialsAvailable: '',
      existingFacilitiesForNonFormalSchooling: '',
    },
    localInitialResponse: {
      emergencyRespondersInvolved: '',
      assetsDeployed: '',
      initiallyServedFamilies: null,
      initiallyServedPersons: null,
      initiallyServedInfants: null,
      initiallyServedChildren: null,
      initiallyServedAdults: null,
      extentOfLocalAssistance: '',
    },
    signedByChairman: '',
  };
}
