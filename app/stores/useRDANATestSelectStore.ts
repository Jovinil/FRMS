import { defineStore } from 'pinia'
import {
  YES_NO,
  YES_NO_UNKNOWN,
  ELECTRICITY_STATUS,
  ACCESS_MEANS,
  ROAD_STATUS,
  ACCESS_NEEDS,
  POWER_DAMAGE_CHECK,
  POWER_URGENT_NEEDS,
  TELCO_OPS,
  ALT_COMMS,
  COMMS_IMMEDIATE_NEEDS,
  EVAC_PROTECTION_MECHANISMS,
  EVAC_FACILITIES_OPERATIONAL,
  SHELTER_IMMEDIATE_NEEDS,
  FOOD_SOURCES,
  FOOD_IMMEDIATE_NEEDS,
  SANITATION_IMMEDIATE_NEEDS,
  HEALTH_FUNCTIONAL_FACILITIES,
  HEALTH_MAIN_CONCERNS,
  HEALTH_IMMEDIATE_NEEDS,
  PROTECTION_VULNERABLE,
  PROTECTION_IMMEDIATE_NEEDS,
  EDUCATION_URGENT_NEEDS,
  COMMUNITY_INFO_WANT,
  COMMUNITY_MAIN_SOURCES,
} from '~/app/models/rdana'

// Not present in model; define here for convenience
const WATER_IMMEDIATE_NEEDS = [
  'Jerry cans',
  'Bottled water',
  'Water Distribution/Delivery',
  'Water Purification Device',
  'Cash',
] as const

const SRR_TYPES = [
  'Search and Rescue (SAR)',
  'Water Search and Rescue',
  'Urban Search and Rescue (USAR)',
  'Maritime Search and Rescue',
  'Mountain Search and Rescue',
  'Aviation Search and Rescue',
  'Collapsed Structure Search and Rescue',
] as const

const LAW_THREATS = [
  'Looting',
  'Robbery',
  'Banditry/Hold-up',
  'Kidnapping',
  'Human Trafficking',
  'Violence against Children',
  'Violence against Women',
  'Sexual Abuse',
  'Violence between groups',
  'Violence between families',
  'Juvenile delinquency',
  'Terrorist',
  'Private armies',
  'Extremists',
  'Syndicates/Bandits/Pirates',
  'Other Armed Groups',
  'Others',
] as const

const LAW_FORCES = [
  'Barangay Tanod (BPSC)',
  'Police (PNP)',
  'Philippine Army/Air Force/Navy/Marine',
  'Coast Guard',
  'Other law enforcement units',
] as const

export const useRDANATestSelectStore = defineStore('rdanaTestSelect', () => {
  // Radio groups
  const yesNo = YES_NO
  const yesNoUnknown = YES_NO_UNKNOWN
  const electricityStatus = ELECTRICITY_STATUS

  // Accessibility
  const accessMeans = ACCESS_MEANS
  const roadStatus = ROAD_STATUS
  const accessNeeds = ACCESS_NEEDS

  // Power
  const powerDamageCheck = POWER_DAMAGE_CHECK
  const powerUrgentNeeds = POWER_URGENT_NEEDS

  // Communications
  const telcoOps = TELCO_OPS
  const altComms = ALT_COMMS
  const commsImmediateNeeds = COMMS_IMMEDIATE_NEEDS

  // Evacuation
  const evacProtectionMechanisms = EVAC_PROTECTION_MECHANISMS
  const evacFacilitiesOperational = EVAC_FACILITIES_OPERATIONAL

  // Shelter
  const shelterImmediateNeeds = SHELTER_IMMEDIATE_NEEDS

  // Food
  const foodSources = FOOD_SOURCES
  const foodImmediateNeeds = FOOD_IMMEDIATE_NEEDS

  // Water
  const waterImmediateNeeds = WATER_IMMEDIATE_NEEDS

  // Sanitation
  const sanitationImmediateNeeds = SANITATION_IMMEDIATE_NEEDS

  // Health
  const healthFunctionalFacilities = HEALTH_FUNCTIONAL_FACILITIES
  const healthMainConcerns = HEALTH_MAIN_CONCERNS
  const healthImmediateNeeds = HEALTH_IMMEDIATE_NEEDS

  // Protection
  const protectionVulnerable = PROTECTION_VULNERABLE
  const protectionImmediateNeeds = PROTECTION_IMMEDIATE_NEEDS

  // Education
  const educationUrgentNeeds = EDUCATION_URGENT_NEEDS

  // Community
  const communityInfoWant = COMMUNITY_INFO_WANT
  const communityMainSources = COMMUNITY_MAIN_SOURCES

  // SRR & Law and Order (from constants above)
  const srrTypes = SRR_TYPES
  const lawThreats = LAW_THREATS
  const lawForces = LAW_FORCES

  return {
    yesNo,
    yesNoUnknown,
    electricityStatus,
    accessMeans,
    roadStatus,
    accessNeeds,
    powerDamageCheck,
    powerUrgentNeeds,
    telcoOps,
    altComms,
    commsImmediateNeeds,
    evacProtectionMechanisms,
    evacFacilitiesOperational,
    shelterImmediateNeeds,
    foodSources,
    foodImmediateNeeds,
    waterImmediateNeeds,
    sanitationImmediateNeeds,
    healthFunctionalFacilities,
    healthMainConcerns,
    healthImmediateNeeds,
    protectionVulnerable,
    protectionImmediateNeeds,
    educationUrgentNeeds,
    communityInfoWant,
    communityMainSources,
    srrTypes,
    lawThreats,
    lawForces,
  }
})
