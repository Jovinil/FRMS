// src/pdf/rdanaPdfFieldMap.ts

// Adjust this import path if needed
import { RDANA_PDF_FIELDS } from './rdanaPdfFields.generated';
import {
  AccessMode,
  ShelterDamageRange,
  YesNo,
  YesNoUnknown,
  RdanaForm,
} from '../../app/models/firstRdanaForm';

// Grab short aliases so we don't repeat long names
const T = RDANA_PDF_FIELDS.texts;
const C = RDANA_PDF_FIELDS.checkboxes;
const R = RDANA_PDF_FIELDS.radios;

/**
 * This map is the bridge between:
 *   - your domain model (RdanaForm)
 *   - the raw PDF fields (from RDANA_PDF_FIELDS)
 *
 * IMPORTANT:
 *   - The indices (T[0], T[1], C[5], …) are placeholders.
 *   - You will verify/adjust them while looking at the PDF.
 *   - You do NOT need to type raw field names like 'text_1uvac'.
 */

export const RDANA_PDF_FIELD_MAP = {
  profile: {
    emergencyOperation: {
      // TODO: verify T[...] indexes by looking at the PDF
      // Suggested starting assumption: first few text fields on page 1
      nameOfOperation: T[0],
      typeOfDisaster: T[1],
      dateTimeOfEvent: T[2],
    },
    mission: {
      // TODO: verify/adjust indices based on field order on page 1
      region: T[3],
      province: T[4],
      cityMunicipality: T[5],
      barangay: T[6],
      sitioPurok: T[7],
      gpsCoordinate: T[8],
      dateTimeOfRdana: T[9],
    },
    // localAuthorities is an array in your model but the PDF usually
    // only has a single row. We map localAuthorities[0] to these fields.
    firstLocalAuthority: {
      // TODO: verify/adjust
      name: T[10],
      age: T[11],
      officeOrganization: T[12],
      designation: T[13],
      phoneNumber: T[14],
      email: T[15],
    },
    summaryDescription: T[16], // likely a multiline text/textarea
  },

  // ------------------- SKELETON FOR REMAINING SECTIONS -------------------
  // For all sections below, the values are intentionally left as
  // TODO placeholders. In Step 3, we'll show exactly how to wire them
  // and how to find the right index using a small helper.

  initialImpact: {
    affectedFamilies: T[17],          // TODO: verify
    affectedPersons: T[18],           // TODO
    displacedFamiliesInsideECs: T[19],
    displacedPersonsInsideECs: T[20],
    displacedFamiliesOutsideECs: T[21],
    displacedPersonsOutsideECs: T[22],

    affectedChildren: {
      age0to2: T[23],
      age3to5: T[24],
      age6to12: T[25],
      age13to17: T[26],
    },
    pwd: T[27],
    elderly: T[28],

    missingMale: T[29],
    missingFemale: T[30],
    missingTotal: T[31],

    injuredMale: T[32],
    injuredFemale: T[33],
    injuredTotal: T[34],

    deadMale: T[35],
    deadFemale: T[36],
    deadTotal: T[37],
  },

  accessibility: {
    // communityAccessible: Yes/No radio buttons (checkboxes in PDF)
    communityAccessible: {
      yes: C[0], // TODO: verify which checkbox is "Yes"
      no: C[1],  // TODO: verify which checkbox is "No"
    },
    // AccessMode[] → many checkboxes
    accessModes: {
      [AccessMode.CarBus]: C[2],              // TODO
      [AccessMode.Truck4wd10wheeler]: C[3],   // TODO
      [AccessMode.Motorcycle]: C[4],          // TODO
      [AccessMode.Foot]: C[5],                // TODO
      [AccessMode.Boat]: C[6],                // TODO
      [AccessMode.Airplane]: C[7],            // TODO
      [AccessMode.Helicopter]: C[8],          // TODO
      [AccessMode.Animal]: C[9],              // TODO
    },
    hasDamagedRoadsOrBridges: {
      yes: C[10], // TODO
      no: C[11],  // TODO
    },
    damagePassability: {
      partially_passable: C[12],   // TODO
      totally_unpassable: C[13],   // TODO
    },
    immediateAccessNeeds: {
      // keys should match your own internal "immediateAccessNeeds" ids
      transport: C[14],            // TODO
      debris_clearing: C[15],
      road_repair: C[16],
      bridge_repair: C[17],
      traffic_management: C[18],
      early_warning_signs: C[19],
      port_roro_coordination: C[20],
      caap_airport_coordination: C[21],
      cash: C[22],
      other: C[23],
    },
    immediateAccessNeedOther: T[38], // TODO
  },

  // ------------------- POWER (SKELETON) -------------------
  power: {
    powerStatus: {
      yes: C[24],                 // TODO
      none: C[25],                // TODO
      partial: C[26],             // TODO
      limited: C[27],             // TODO
      no_power_before_disaster: C[28], // TODO
    },
    partialWithoutPowerPercent: T[39],
    limitedFromTime: T[40],
    limitedToTime: T[41],
    powerDamages: {
      fallen_posts: C[29],        // TODO: match ids with your app
      cut_power_lines: C[30],
      damaged_transformers: C[31],
      other: C[32],
    },
    powerDamageOther: T[42],
    fuelStockDays: T[43],
    urgentPowerNeeds: {
      generators: C[33],
      gasoline_for_generators: C[34],
      diesel_for_generators: C[35],
    },
    urgentPowerGeneratorQty: T[44],
    urgentGasolineQty: T[45],
    urgentDieselQty: T[46],
  },

  // ------------------- COMMUNICATIONS (SKELETON) -------------------
  communications: {
    telcoSignals: {
      smart_sun: C[36],
      globe_tm: C[37],
      others: C[38],
    },
    telcoSignalOther: T[47],
    mediaServices: {
      radio_am: C[39],
      radio_fm: C[40],
      tv_free_air: C[41],
      tv_cable: C[42],
      tv_satellite: C[43],
    },
    altCommunications: {
      satellite_phone: C[44],
      vhf_radio: C[45],
      uhf_radio: C[46],
      hf_ssb_radio: C[47],
      bgan: C[48],
      v_sat: C[49],
    },
    immediateCommNeeds: {
      // match to your internal IDs
      info_materials: C[50],
      equipment: C[51],
      personnel: C[52],
      other: C[53],
    },
    immediateCommNeedOther: T[48],
  },

  // ------------------- The rest: pure skeletons -------------------
  evacuation: {
    hasEvacuationCenter: {
      yes: C[54],
      no: C[55],
    },
    hasCampManager: {
      yes: C[56],
      no: C[57],
    },
    centers: {
      // We will handle multiple centers by index in the filler step.
      // Here we just map the fields for the FIRST row.
      first: {
        name: T[49],
        address: T[50],
        gpsCoordinates: T[51],
        familiesInside: T[52],
        personsInside: T[53],
      },
    },
    protectionMechanisms: {
      security_patrols: C[58],
      police_presence: C[59],
      barangay_tanods: C[60],
      other: C[61],
    },
    protectionMechanismOther: T[54],
    facilitiesOperational: {
      lighting: C[62],
      ventilation: C[63],
      sleeping_areas_partition: C[64],
      water_supply: C[65],
      toilets: C[66],
      waste_disposal: C[67],
      cooking_area: C[68],
      child_friendly_space: C[69],
      women_friendly_space: C[70],
      other: C[71],
    },
    facilityOther: T[55],
  },

  // For brevity, remaining sections only have the structural skeleton.
  // We'll use this structure in the filler function later.
  relief: {
    hasReceivedAssistance: {
      yes: C[72],
      no: C[73],
    },
    // assistanceList is dynamic; mapping will be handled in the filler
  },

  srr: {
    srrNeeded: {
      yes: C[74],
      no: C[75],
      unknown: C[76],
    },
    srrTypes: {
      sar: C[77],
      usar: C[78],
      mountain_sar: C[79],
      water_sar: C[80],
      other: C[81],
    },
    srrOther: T[56],
  },

  lawAndOrder: {
    lawAndOrderProblem: {
      yes: C[82],
      no: C[83],
      unknown: C[84],
    },
    threats: {
      looting: C[85],
      theft: C[86],
      violence: C[87],
      other: C[88],
    },
    threatsOther: T[57],
    securityPresence: {
      police: C[89],
      military: C[90],
      barangay_tanods: C[91],
      volunteer_groups: C[92],
      other: C[93],
    },
    securityPresenceOther: T[58],
  },

  shelter: {
    destroyedHousesNumber: T[59],
    destroyedHousesRange: {
      '<25%': C[94],
      '26-50%': C[95],
      '51-75%': C[96],
      '>75%': C[97],
    } as Record<ShelterDamageRange, string>,
    damagedHousesNumber: T[60],
    damagedHousesRange: {
      '<25%': C[98],
      '26-50%': C[99],
      '51-75%': C[100],
      '>75%': C[101],
    } as Record<ShelterDamageRange, string>,
    immediateShelterNeeds: {
      tents: C[102],
      tarpaulins: C[103],
      repair_kits: C[104],
      nfis: C[105],
      other: C[106],
    },
    immediateShelterNeedOther: T[61],
  },

  foodSecurity: {
    peopleHaveAccessToFood: {
      yes: C[107],
      no: C[108],
    },
    mainSourcesOfFood: {
      market: C[109],
      food_aid: C[110],
      own_production: C[111],
      other: C[112],
    },
    mainSourceOfFoodOther: T[62],
    localMarketOperating: {
      yes: C[113],
      no: C[114],
    },
    hasFoodWarehouse: {
      yes: C[115],
      no: C[116],
    },
    immediateFoodNeeds: {
      rice: C[117],
      canned_goods: C[118],
      ready_to_eat: C[119],
      infant_formula: C[120],
      other: C[121],
    },
    immediateFoodNeedOther: T[63],
  },

  waterSupply: {
    accessToDrinkingWater: {
      yes: C[122],
      no: C[123],
    },
    accessToDomesticWater: {
      yes: C[124],
      no: C[125],
    },
    primaryDrinkingWaterSource: {
      level_1: C[126],
      level_2: C[127],
      level_3: C[128],
      water_trucking: C[129],
      bottled: C[130],
      open_source: C[131],
      other: C[132],
    },
    primaryDrinkingWaterSourceOther: T[64],
    householdsHaveWaterContainersWithLid: {
      yes: C[133],
      no: C[134],
    },
    immediateWaterNeeds: {
      drinking_water: C[135],
      storage_containers: C[136],
      purification_tablets: C[137],
      other: C[138],
    },
    immediateWaterNeedOther: T[65],
  },

  sanitation: {
    accessToFunctioningSanitaryFacilities: {
      yes: C[139],
      no: C[140],
    },
    separateFacilitiesForWomenAndMen: {
      yes: C[141],
      no: C[142],
    },
    adequateHygieneSupplies: {
      yes: C[143],
      no: C[144],
    },
    immediateSanitationNeeds: {
      toilets: C[145],
      bathing_areas: C[146],
      soap: C[147],
      menstrual_hygiene: C[148],
      other: C[149],
    },
    immediateSanitationNeedOther: T[66],
  },

  health: {
    accessToHealthServices: {
      yes: C[150],
      no: C[151],
      unknown: C[152],
    },
    functionalHealthFacilities: {
      hospital: C[153],
      rhus: C[154],
      birthing_clinics: C[155],
      other: C[156],
    },
    functionalHealthFacilityOther: T[67],
    mainHealthConcerns: {
      diarrhea: C[157],
      ari: C[158],
      injuries: C[159],
      maternal: C[160],
      other: C[161],
    },
    mainHealthConcernOther: T[68],
    medicinesAvailability: {
      adequate: C[162],
      inadequate: C[163],
    },
    immediateHealthNeeds: {
      medicines: C[164],
      medical_supplies: C[165],
      personnel: C[166],
      other: C[167],
    },
    immediateHealthNeedOther: T[69],
  },

  nutrition: {
    infoOnExclusivelyBreastfedInfants: {
      yes: C[168],
      no: C[169],
    },
    milkProductsDistributed: {
      yes: C[170],
      no: C[171],
    },
    vitaminA6to59Months: {
      yes: C[172],
      no: C[173],
    },
    ironFolicForPregLactating: {
      yes: C[174],
      no: C[175],
    },
    micronutrientPowders: {
      yes: C[176],
      no: C[177],
    },
    managementOfAcuteMalnutrition: {
      yes: C[178],
      no: C[179],
    },
    immediateNutritionNeeds: {
      supplements: C[180],
      therapeutic_food: C[181],
      other: C[182],
    },
    immediateNutritionNeedOther: T[70],
  },

  protection: {
    violenceCasesPresent: {
      yes: C[183],
      no: C[184],
      unknown: C[185],
    },
    vulnerableGroupsPresent: {
      children: C[186],
      women: C[187],
      elderly: C[188],
      pwds: C[189],
      indigenous: C[190],
      other: C[191],
    },
    reportingMechanismExists: {
      yes: C[192],
      no: C[193],
    },
    immediateProtectionNeeds: {
      psychosocial_support: C[194],
      legal_assistance: C[195],
      family_tracing: C[196],
      other: C[197],
    },
    immediateProtectionNeedOther: T[71],
  },

  education: {
    classroomsUsedAsEC: T[72],
    childrenStayingInEC: T[73],
    destroyedClassrooms: T[74],
    damagedClassrooms: T[75],
    urgentEducationalNeeds: {
      learning_materials: C[198],
      temporary_learning_spaces: C[199],
      teachers: C[200],
      other: C[201],
    },
    urgentEducationalNeedOther: T[76],
  },

  livelihood: {
    mainSourceOfLivelihood: T[77],
    immediateLivelihoodNeeds: {
      agri_inputs: C[202],
      fishing_inputs: C[203],
      cash: C[204],
      other: C[205],
    },
    immediateLivelihoodNeedOther: T[78],
  },

  communityEngagement: {
    communityReceivingInformation: {
      yes: C[206],
      no: C[207],
      unknown: C[208],
    },
    whatPeopleWantToKnow: {
      aid: C[209],
      missing_relatives: C[210],
      relocation: C[211],
      other: C[212],
    },
    whatPeopleWantToKnowOther: T[79],
    mainInformationSources: {
      radio: C[213],
      tv: C[214],
      social_media: C[215],
      local_leaders: C[216],
      other: C[217],
    },
    mainInformationSourceOther: T[80],
  },

  overallAssessment: {
    situationAssessment: {
      serious_problems: C[218],
      people_may_get_sick_or_die: C[219],
      many_already_died: C[220],
    },
    justification: T[81],
  },

  submittedBy: {
    name: T[82],
    designation: T[83],
    organization: T[84],
    rdanaTeam: T[85],
    contactNumber: T[86],
    email: T[87],
  },
} as const;

export type RdanaPdfFieldMap = typeof RDANA_PDF_FIELD_MAP;
