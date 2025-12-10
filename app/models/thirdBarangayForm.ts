// models/thirdBarangayForm.ts
import type { YesNo } from '~/models/firstRdanaForm'; // or: export type YesNo = 'yes' | 'no';

export interface ThirdBarangayProfileOfDisaster {
  typeOfDisaster: string;
  dateTimeOfOccurrence: string;
  sourceOfReport: string;
  dateTimeOfReport: string;
}

export interface ThirdBarangayPopulationAffected {
  families: number | null;
  persons: number | null;
  childrenAge1to17: number | null;
}

export interface ThirdBarangayPopulationDisplaced {
  families: number | null;
  persons: number | null;
  infants0to1: number | null;
  children2to12: number | null;
  adolescents13to17: number | null;
  adults18plus: number | null;
}

export interface ThirdBarangayCasualties {
  dead: number | null;
  injured: number | null;
  missing: number | null;
}

export interface ThirdBarangayDamagePropertyRow {
  totallyNumber: number | null;
  partiallyNumber: number | null;
  estCostTotally: number | null;
  estCostPartially: number | null;
  totalCost: number | null;
}

export interface ThirdBarangayDamagedProperties {
  houses: ThirdBarangayDamagePropertyRow;
  schoolBuildings: ThirdBarangayDamagePropertyRow;
  hospital: ThirdBarangayDamagePropertyRow;
  governmentOffices: ThirdBarangayDamagePropertyRow;
  publicMarkets: ThirdBarangayDamagePropertyRow;
  floodControl: ThirdBarangayDamagePropertyRow;
  commercialFacilities: ThirdBarangayDamagePropertyRow;
  othersDescription: string;
  others: ThirdBarangayDamagePropertyRow;
}

export interface ThirdBarangayTransportEntry {
  passable: YesNo | null; // 'yes' = passable, 'no' = not passable
  number: number | null;
  cost: number | null;
}

export interface ThirdBarangayTransportationFacilities {
  roadsNational: ThirdBarangayTransportEntry;
  roadsProvincial: ThirdBarangayTransportEntry;
  roadsMunicipal: ThirdBarangayTransportEntry;
  roadsCity: ThirdBarangayTransportEntry;
  roadsBarangay: ThirdBarangayTransportEntry;

  bridgesBailey: ThirdBarangayTransportEntry;
  bridgesConcrete: ThirdBarangayTransportEntry;
  bridgesWooden: ThirdBarangayTransportEntry;
  bridgesSuspension: ThirdBarangayTransportEntry;
  railways: ThirdBarangayTransportEntry;
}

export interface ThirdBarangayCommFacilityEntry {
  operational: YesNo | null;
  number: number | null;
  cost: number | null;
}

export interface ThirdBarangayCommunicationFacilities {
  pldt: ThirdBarangayCommFacilityEntry;
  bayanTel: ThirdBarangayCommFacilityEntry;
  cellSites: ThirdBarangayCommFacilityEntry;
  repeaters: ThirdBarangayCommFacilityEntry;
}

export interface ThirdBarangaySimpleLifelineEntry {
  operational: YesNo | null;
  number: number | null;
  cost: number | null;
}

export interface ThirdBarangayDamagedLifelines {
  transportation: ThirdBarangayTransportationFacilities;
  communication: ThirdBarangayCommunicationFacilities;
  electricalPower: ThirdBarangaySimpleLifelineEntry;
  waterFacilities: ThirdBarangaySimpleLifelineEntry;
}

export interface ThirdBarangayCropDamageRow {
  areaDamagedHectares: number | null;
  lossesMetricTons: number | null;
  lossesPesoValue: number | null;
}

export interface ThirdBarangayCropDamage {
  rice: ThirdBarangayCropDamageRow;
  corn: ThirdBarangayCropDamageRow;
  vegetables: ThirdBarangayCropDamageRow;
  rootCrops: ThirdBarangayCropDamageRow;
  fruitTrees: ThirdBarangayCropDamageRow;
  bananas: ThirdBarangayCropDamageRow;
  otherDescription: string;
  other: ThirdBarangayCropDamageRow;
}

export interface ThirdBarangayFisheriesDamage {
  fishpondsAreaDamagedHectares: number | null;
  fishpondsLossesMetricTons: number | null;
  fishpondsLossesPesoValue: number | null;
  fishingBoatsNumber: number | null;
}

export interface ThirdBarangayLivestockDamageRow {
  numberOfHeads: number | null;
  pesoValue: number | null;
}

export interface ThirdBarangayLivestockDamage {
  farmAnimals: ThirdBarangayLivestockDamageRow;
  poultryAndFowls: ThirdBarangayLivestockDamageRow;
}

export interface ThirdBarangayAgriculture {
  crops: ThirdBarangayCropDamage;
  fisheries: ThirdBarangayFisheriesDamage;
  livestock: ThirdBarangayLivestockDamage;
}

export interface ThirdBarangayLocalActions {
  emergencyRespondersInvolved: string;
  assetsDeployed: string;
  affectedPopulationServedFamilies: number | null;
  affectedPopulationServedPersons: number | null;
  displacedPopulationServedFamilies: number | null;
  displacedPopulationServedPersons: number | null;
  displacedPopulationServedInfants: number | null;
  displacedPopulationServedChildren: number | null;
  displacedPopulationServedAdults: number | null;
  extentOfLocalAssistance: string;
}

export interface ThirdBarangayEvacCenterRow {
  nameOfEvacuationCenter: string;
  numberOfFamilies: number | null;
  numberOfPersons: number | null;
}

export interface ThirdBarangayEvacueeSummary {
  date: string;
  barangay: string;
  typeOfDisaster: string;
  totalNumberOfEvacuationCenter: number | null;
  centers: ThirdBarangayEvacCenterRow[]; // typically 5 rows in form
  totalNumberOfFamilies: number | null;
  totalNumberOfPersons: number | null;
  preparedByBarangaySecretary: string;
  notedByPunongBarangay: string;
}

export interface ThirdBarangayForm {
  profileOfDisaster: ThirdBarangayProfileOfDisaster;
  summaryOfEffects: {
    areasAffected: string;
    populationAffected: ThirdBarangayPopulationAffected;
    populationDisplaced: ThirdBarangayPopulationDisplaced;
    casualties: ThirdBarangayCasualties;
    damagedProperties: ThirdBarangayDamagedProperties;
    damagedLifelines: ThirdBarangayDamagedLifelines;
    agriculture: ThirdBarangayAgriculture;
  };
  localActions: ThirdBarangayLocalActions;
  damageAssessmentSignedByChairman: string;
  evacueeSummary: ThirdBarangayEvacueeSummary;
}

function makeDamagePropertyRow(): ThirdBarangayDamagePropertyRow {
  return {
    totallyNumber: null,
    partiallyNumber: null,
    estCostTotally: null,
    estCostPartially: null,
    totalCost: null,
  };
}

function makeTransportEntry(): ThirdBarangayTransportEntry {
  return { passable: null, number: null, cost: null };
}

function makeCommEntry(): ThirdBarangayCommFacilityEntry {
  return { operational: null, number: null, cost: null };
}

function makeSimpleLifelineEntry(): ThirdBarangaySimpleLifelineEntry {
  return { operational: null, number: null, cost: null };
}

function makeCropDamageRow(): ThirdBarangayCropDamageRow {
  return { areaDamagedHectares: null, lossesMetricTons: null, lossesPesoValue: null };
}

function makeLivestockRow(): ThirdBarangayLivestockDamageRow {
  return { numberOfHeads: null, pesoValue: null };
}

export function createDefaultThirdBarangayForm(): ThirdBarangayForm {
  return {
    profileOfDisaster: {
      typeOfDisaster: '',
      dateTimeOfOccurrence: '',
      sourceOfReport: '',
      dateTimeOfReport: '',
    },
    summaryOfEffects: {
      areasAffected: '',
      populationAffected: {
        families: null,
        persons: null,
        childrenAge1to17: null,
      },
      populationDisplaced: {
        families: null,
        persons: null,
        infants0to1: null,
        children2to12: null,
        adolescents13to17: null,
        adults18plus: null,
      },
      casualties: {
        dead: null,
        injured: null,
        missing: null,
      },
      damagedProperties: {
        houses: makeDamagePropertyRow(),
        schoolBuildings: makeDamagePropertyRow(),
        hospital: makeDamagePropertyRow(),
        governmentOffices: makeDamagePropertyRow(),
        publicMarkets: makeDamagePropertyRow(),
        floodControl: makeDamagePropertyRow(),
        commercialFacilities: makeDamagePropertyRow(),
        othersDescription: '',
        others: makeDamagePropertyRow(),
      },
      damagedLifelines: {
        transportation: {
          roadsNational: makeTransportEntry(),
          roadsProvincial: makeTransportEntry(),
          roadsMunicipal: makeTransportEntry(),
          roadsCity: makeTransportEntry(),
          roadsBarangay: makeTransportEntry(),
          bridgesBailey: makeTransportEntry(),
          bridgesConcrete: makeTransportEntry(),
          bridgesWooden: makeTransportEntry(),
          bridgesSuspension: makeTransportEntry(),
          railways: makeTransportEntry(),
        },
        communication: {
          pldt: makeCommEntry(),
          bayanTel: makeCommEntry(),
          cellSites: makeCommEntry(),
          repeaters: makeCommEntry(),
        },
        electricalPower: makeSimpleLifelineEntry(),
        waterFacilities: makeSimpleLifelineEntry(),
      },
      agriculture: {
        crops: {
          rice: makeCropDamageRow(),
          corn: makeCropDamageRow(),
          vegetables: makeCropDamageRow(),
          rootCrops: makeCropDamageRow(),
          fruitTrees: makeCropDamageRow(),
          bananas: makeCropDamageRow(),
          otherDescription: '',
          other: makeCropDamageRow(),
        },
        fisheries: {
          fishpondsAreaDamagedHectares: null,
          fishpondsLossesMetricTons: null,
          fishpondsLossesPesoValue: null,
          fishingBoatsNumber: null,
        },
        livestock: {
          farmAnimals: makeLivestockRow(),
          poultryAndFowls: makeLivestockRow(),
        },
      },
    },
    localActions: {
      emergencyRespondersInvolved: '',
      assetsDeployed: '',
      affectedPopulationServedFamilies: null,
      affectedPopulationServedPersons: null,
      displacedPopulationServedFamilies: null,
      displacedPopulationServedPersons: null,
      displacedPopulationServedInfants: null,
      displacedPopulationServedChildren: null,
      displacedPopulationServedAdults: null,
      extentOfLocalAssistance: '',
    },
    damageAssessmentSignedByChairman: '',
    evacueeSummary: {
      date: '',
      barangay: '',
      typeOfDisaster: '',
      totalNumberOfEvacuationCenter: null,
      centers: Array.from({ length: 5 }, () => ({
        nameOfEvacuationCenter: '',
        numberOfFamilies: null,
        numberOfPersons: null,
      })),
      totalNumberOfFamilies: null,
      totalNumberOfPersons: null,
      preparedByBarangaySecretary: '',
      notedByPunongBarangay: '',
    },
  };
}
