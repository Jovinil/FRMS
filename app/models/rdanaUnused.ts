/*
  RDANA Domain Model (OOP, TypeScript)
  - Encapsulates sections, validation, and computed helpers for the RDANA form
  - Designed to be used by a Pinia store and Vue components
*/

export type YesNo = 'Yes' | 'No'
export type YesNoUnknown = 'Yes' | 'No' | 'Do not know'

// 1. PROFILE OF THE DISASTER & RDANA MISSION
export class EmergencyOperation {
  opName = '' // 1.1.1 Name of Operation/Event
  opType = '' // 1.1.2 Type of Disaster/Event
  opDateTime = '' // 1.1.3 Date and Time of Event (ISO string)

  constructor(init?: Partial<EmergencyOperation>) {
    Object.assign(this, init)
  }
}

export class RdanaMission {
  rdanaRegion = '' // required
  rdanaProvince = '' // required
  rdanaCity = '' // required
  rdanaBarangay = '' // required
  rdanaSitioPurok = ''
  rdanaGPS = '' // e.g., "lat, long"
  rdanaDateTime = '' // required (ISO string)

  constructor(init?: Partial<RdanaMission>) {
    Object.assign(this, init)
  }
}

export class Interviewee {
  intervieweeName = ''
  intervieweeAge: number | null = null
  intervieweeOrg = ''
  intervieweeDesignation = ''
  intervieweePhone = ''
  intervieweeEmail = ''

  constructor(init?: Partial<Interviewee>) {
    Object.assign(this, init)
  }
}

export class ProfileSection {
  emergency = new EmergencyOperation()
  mission = new RdanaMission()
  interviewee = new Interviewee()
  summaryDescription = ''

  constructor(init?: Partial<ProfileSection>) {
    if (init?.emergency) this.emergency = new EmergencyOperation(init.emergency)
    if (init?.mission) this.mission = new RdanaMission(init.mission)
    if (init?.interviewee) this.interviewee = new Interviewee(init.interviewee)
    if (typeof init?.summaryDescription === 'string') this.summaryDescription = init.summaryDescription
  }
}

// 2. INITIAL IMPACT (DEMOGRAPHICS)
export class DemographicsSection {
  // 2.1/2.2 Affected
  affectedFamilies: number | null = null
  affectedPersons: number | null = null

  // Displaced
  displacedFamiliesInsideEC: number | null = null
  displacedPersonsInsideEC: number | null = null
  displacedFamiliesOutsideEC: number | null = null
  displacedPersonsOutsideEC: number | null = null

  // Vulnerable
  affectedElderly: number | null = null
  affectedPWD: number | null = null

  // Children
  affectedChildren0_2: number | null = null
  affectedChildren3_5: number | null = null
  affectedChildren6_12: number | null = null
  affectedChildren13_17: number | null = null

  // Casualties
  missingMale: number | null = null
  missingFemale: number | null = null
  injuredMale: number | null = null
  injuredFemale: number | null = null
  deadMale: number | null = null
  deadFemale: number | null = null

  constructor(init?: Partial<DemographicsSection>) {
    Object.assign(this, init)
  }

  get missingTotal(): number {
    return (this.missingMale || 0) + (this.missingFemale || 0)
  }
  get injuredTotal(): number {
    return (this.injuredMale || 0) + (this.injuredFemale || 0)
  }
  get deadTotal(): number {
    return (this.deadMale || 0) + (this.deadFemale || 0)
  }
}

// 3. ACCESSIBILITY
export class AccessibilitySection {
  isAccessible: YesNo | '' = ''
  accessMeans: string[] = [] // Car/Bus, 4WD, Motorcycle, Foot, Boat, Airplane, Helicopter, Horse/cow/carabao
  roadDamaged: YesNo | '' = ''
  roadStatus: string[] = [] // Partially passable, Totally Unpassable
  accessNeeds: string[] = [] // Transport, Debris clearing, Road/Bridge repair, etc.
  accessNeedsOther = ''

  constructor(init?: Partial<AccessibilitySection>) {
    Object.assign(this, init)
  }
}

// 4. POWER OR ELECTRICITY
export type ElectricityStatus = 'None' | 'Yes' | 'Partial' | 'Limited' | 'No power before disaster'
export class PowerSection {
  electricityStatus: ElectricityStatus | '' = ''
  partialPowerDetails = ''
  limitedPowerStart = '' // HH:mm
  limitedPowerEnd = '' // HH:mm

  damageCheck: string[] = [] // Fallen posts, Lines cut, Damaged plant, Tower, Transformers
  damageOther = ''

  fuelStockDays: number | null = null

  urgentNeeds: string[] = [] // Generators, Gasoline, Diesel, Others
  generatorQty: number | null = null
  gasolineQty: number | null = null
  dieselQty: number | null = null
  needsOther = ''

  constructor(init?: Partial<PowerSection>) {
    Object.assign(this, init)
  }
}

// 5. COMMUNICATIONS
export class CommunicationsSection {
  telcoOperational: string[] = [] // Smart/Sun, Globe/TM
  telcoOther = ''

  altCommsOperational: string[] = [] // AM/FM, TV, Satellite Phone, VHF/UHF/HF/SSB, BGAN, V-SAT

  immediateNeeds: string[] = [] // Communication, Internet, Charging station, etc.
  needsOther = ''

  constructor(init?: Partial<CommunicationsSection>) {
    Object.assign(this, init)
  }
}

// 6. EVACUATION CENTER DETAILS
export class EvacuationCenterSummaryItem {
  name = ''
  address = ''
  gps = ''
  families: number | null = null
  persons: number | null = null

  constructor(init?: Partial<EvacuationCenterSummaryItem>) {
    Object.assign(this, init)
  }
}

export class EvacuationSection {
  hasEvacuationCenter: YesNo | '' = ''
  hasCampManager: YesNo | '' = ''
  centers: EvacuationCenterSummaryItem[] = []

  protectionMechanisms: string[] = [] // Patrols, Police, BCPC, VAWC, WFS, CFS, etc.
  protectionOther = ''

  facilitiesOperational: string[] = [] // Lighting, Ventilation, Sleeping Areas, Toilets, etc.
  facilitiesOther = ''

  constructor(init?: Partial<EvacuationSection>) {
    if (init?.centers) {
      this.centers = init.centers.map(c => new EvacuationCenterSummaryItem(c))
    }
    if (init) Object.assign(this, { ...init, centers: this.centers })
  }
}

// 7. RELIEF ASSISTANCE
export class ReliefAssistanceItem {
  organization = '' // required name/org
  contactPerson = ''
  contactDetails = ''
  assistanceGiven = ''
  particulars = ''
  quantity: number | null = null
  serviceStart = '' // date
  serviceEnd = '' // date
  familiesServed: number | null = null

  constructor(init?: Partial<ReliefAssistanceItem>) { Object.assign(this, init) }
}

export class ReliefSection {
  hasReceivedAssistance: YesNo | '' = ''
  items: ReliefAssistanceItem[] = []

  constructor(init?: Partial<ReliefSection>) {
    if (init?.items) this.items = init.items.map(i => new ReliefAssistanceItem(i))
    if (init) Object.assign(this, { ...init, items: this.items })
  }
}

// 8. SEARCH-RESCUE-RETRIEVAL (SRR)
export class SRRSection {
  needed: YesNo | '' = ''
  types: string[] = [] // SAR, Water SAR, USAR, Maritime, Mountain, Aviation, Collapsed Structure, Others
  others = ''
  constructor(init?: Partial<SRRSection>) { Object.assign(this, init) }
}

// 9. LAW and ORDER
export class LawAndOrderSection {
  problem: YesNoUnknown | '' = ''
  threats: string[] = [] // Looting, Robbery, Banditry, etc.
  forcesPresent: string[] = [] // Barangay Tanod, PNP, Army, Coast Guard, Others
  constructor(init?: Partial<LawAndOrderSection>) { Object.assign(this, init) }
}

// 10. SHELTER
export class ShelterSection {
  destroyedHouses: { count: number | null, pct: '<25%' | '25-50%' | '51-75%' | '>75%' | '' }
  damagedHouses: { count: number | null, pct: '<25%' | '25-50%' | '51-75%' | '>75%' | '' }
  immediateNeeds: string[] = [] // materials, blankets, tents, cash, etc.

  constructor(init?: Partial<ShelterSection>) {
    this.destroyedHouses = init?.destroyedHouses ?? { count: null, pct: '' }
    this.damagedHouses = init?.damagedHouses ?? { count: null, pct: '' }
    if (init?.immediateNeeds) this.immediateNeeds = [...init.immediateNeeds]
  }
}

// 11. FOOD SECURITY
export class FoodSecuritySection {
  accessToFood: YesNo | '' = ''
  foodSources: string[] = [] // Household stocks, Humanitarian aid, Garden/Farm, Local fisher folks/animal growers, Local market, Other
  localMarketOperating: YesNo | '' = ''
  hasWarehouse: YesNo | '' = ''
  immediateNeeds: string[] = [] // Cooked food, Food pack, Rice, Fresh produce, Cash, Others
  others = ''
  constructor(init?: Partial<FoodSecuritySection>) { Object.assign(this, init) }
}

// 12. WATER SUPPLY
export class WaterSection {
  accessDrinking: YesNo | '' = ''
  accessDomestic: YesNo | '' = ''
  primarySourceDrinking = '' // Open well, Bore hole, Stream/river, Piped, Other
  hasContainersWithLid: YesNo | '' = ''
  immediateNeeds: string[] = [] // Jerry cans, Bottled water, Distribution/Delivery, Purification Device, Cash, Others
  others = ''
  constructor(init?: Partial<WaterSection>) { Object.assign(this, init) }
}

// 13. SANITATION
export class SanitationSection {
  accessSanitaryFacilities: YesNo | '' = ''
  separateFacilities: YesNo | '' = ''
  haveHygieneSupplies: YesNo | '' = ''
  immediateNeeds: string[] = [] // Toilet, Bathing, Hygiene Kits, Dignity Kits, Info, Cleanliness, Solid Waste, Cash, Others
  others = ''
  constructor(init?: Partial<SanitationSection>) { Object.assign(this, init) }
}

// 14. HEALTH
export class HealthSection {
  accessToHealthServices: YesNoUnknown | '' = ''
  functionalFacilities: string[] = [] // BHS, Hospital, Birthing, Health desk, Mobile units, Others
  mainConcerns: string[] = [] // Skin, Hypertension, GI, Diarrhea, Respiratory, Trauma, Others
  availability: 'Adequate' | 'Inadequate' | '' = '' // medicines/supplies
  immediateNeeds: string[] = [] // Medicines, Medical Supplies, Health personnel, Blood, RH Commodities, Mobile clinics, Maternity kits, Cash, Others
  others = ''
  constructor(init?: Partial<HealthSection>) { Object.assign(this, init) }
}

// 15. NUTRITION
export class NutritionSection {
  infoExclusiveBreastfeeding: YesNo | '' = ''
  distributedMilkProducts: YesNo | '' = ''

  vitaminAFor6To59: YesNo | '' = ''
  ironFolicForPLW: YesNo | '' = ''
  mmnFor6To23: YesNo | '' = ''
  manageModerateSevere: YesNo | '' = ''
  manageSevere: YesNo | '' = ''

  immediateNeeds: string[] = [] // Food, Food supplements, Bottled water, Cash, Others
  others = ''
  constructor(init?: Partial<NutritionSection>) { Object.assign(this, init) }
}

// 16. PROTECTION
export class ProtectionSection {
  incidentsOfViolence: YesNoUnknown | '' = ''
  vulnerablePresence: string[] = [] // UASC, Seniors, Pregnant/Lactating, Child-Headed, Single Adult Headed, Senior Headed, Ethnic/IP, Sick, PWD, PWSN
  reportingMechanism: YesNo | '' = ''
  immediateNeeds: string[] = [] // Referral, Police Presence, Social Services, LGU Presence, Counseling, Replacement of IDs, Others
  others = ''
  constructor(init?: Partial<ProtectionSection>) { Object.assign(this, init) }
}

// 17. EDUCATION
export class EducationSection {
  classroomsUsedAsEC: number | null = null
  childrenStayingInEC: number | null = null
  destroyedClassrooms: number | null = null
  damagedClassrooms: number | null = null
  urgentNeeds: string[] = [] // Safe spaces, Replacement of Learning Materials, Repair, Integrating to other schools, Supplies, Teaching materials, Water/Sanitation, Light & Ventilation, Cash, Others
  others = ''
  constructor(init?: Partial<EducationSection>) { Object.assign(this, init) }
}

// 18. LIVELIHOOD/EARLY RECOVERY
export class LivelihoodSection {
  mainSource = ''
  immediateNeeds: string[] = [] // Transport, Debris clearance, Cash for Work, Cash, Others
  others = ''
  constructor(init?: Partial<LivelihoodSection>) { Object.assign(this, init) }
}

// 19. COMMUNITY ENGAGEMENT
export class CommunityEngagementSection {
  infoPeopleWant: string[] = [] // General situation, Home situation, Family, Aid coming, Weather, Health, Security, Other
  communityReceivesInfo: YesNoUnknown | '' = ''
  mainSources: string[] = [] // TV, Radio, Social media, Government officials, Aid workers, Friends/Family, Community/Religious leaders, Newspaper, Others
  others = ''
  constructor(init?: Partial<CommunityEngagementSection>) { Object.assign(this, init) }
}

// 20. OVER-ALL ASSESSMENT
export class OverallAssessmentSection {
  assessment: '' | 'People are facing serious problems in the area' | 'As a result of the emergency, people will get sick and might even die' | 'As a result of the emergency, many people have already died' = ''
  justification = ''
  submittedBy = {
    name: '', organization: '', designation: '', contact: ''
  }
  constructor(init?: Partial<OverallAssessmentSection>) {
    if (init?.submittedBy) this.submittedBy = { ...this.submittedBy, ...init.submittedBy }
    if (init) Object.assign(this, { ...init, submittedBy: this.submittedBy })
  }
}

// Aggregate Root
export class RDANAForm {
  profile = new ProfileSection()
  demographics = new DemographicsSection()
  accessibility = new AccessibilitySection()
  power = new PowerSection()
  communications = new CommunicationsSection()
  evacuation = new EvacuationSection()
  relief = new ReliefSection()
  srr = new SRRSection()
  lawAndOrder = new LawAndOrderSection()
  shelter = new ShelterSection()
  food = new FoodSecuritySection()
  water = new WaterSection()
  sanitation = new SanitationSection()
  health = new HealthSection()
  nutrition = new NutritionSection()
  protection = new ProtectionSection()
  education = new EducationSection()
  livelihood = new LivelihoodSection()
  community = new CommunityEngagementSection()
  overall = new OverallAssessmentSection()

  constructor(init?: Partial<RDANAForm>) {
    if (!init) return
    if (init.profile) this.profile = new ProfileSection(init.profile)
    if (init.demographics) this.demographics = new DemographicsSection(init.demographics)
    if (init.accessibility) this.accessibility = new AccessibilitySection(init.accessibility)
    if (init.power) this.power = new PowerSection(init.power)
    if (init.communications) this.communications = new CommunicationsSection(init.communications)
    if (init.evacuation) this.evacuation = new EvacuationSection(init.evacuation)
    if (init.relief) this.relief = new ReliefSection(init.relief)
    if (init.srr) this.srr = new SRRSection(init.srr)
    if (init.lawAndOrder) this.lawAndOrder = new LawAndOrderSection(init.lawAndOrder)
    if (init.shelter) this.shelter = new ShelterSection(init.shelter)
    if (init.food) this.food = new FoodSecuritySection(init.food)
    if (init.water) this.water = new WaterSection(init.water)
    if (init.sanitation) this.sanitation = new SanitationSection(init.sanitation)
    if (init.health) this.health = new HealthSection(init.health)
    if (init.nutrition) this.nutrition = new NutritionSection(init.nutrition)
    if (init.protection) this.protection = new ProtectionSection(init.protection)
    if (init.education) this.education = new EducationSection(init.education)
    if (init.livelihood) this.livelihood = new LivelihoodSection(init.livelihood)
    if (init.community) this.community = new CommunityEngagementSection(init.community)
    if (init.overall) this.overall = new OverallAssessmentSection(init.overall)
  }

  // Domain validations for critical required fields
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    // Required mission fields
    if (!this.profile.mission.rdanaRegion) errors.push('1.2.1 Region is required')
    if (!this.profile.mission.rdanaProvince) errors.push('1.2.2 Province is required')
    if (!this.profile.mission.rdanaCity) errors.push('1.2.3 City/Municipality is required')
    if (!this.profile.mission.rdanaBarangay) errors.push('1.2.4 Barangay is required')
    if (!this.profile.mission.rdanaDateTime) errors.push('1.2.7 Date and Time of RDANA is required')

    // If roadDamaged yes, details required
    if (this.accessibility.roadDamaged === 'Yes' && this.accessibility.roadStatus.length === 0) {
      errors.push('3.3.1 Road damage details are required when damaged = Yes')
    }

    // If electricity partial/limited, details required
    if (this.power.electricityStatus === 'Partial' && !this.power.partialPowerDetails) {
      errors.push('4.1 Partial power details are required')
    }
    if (this.power.electricityStatus === 'Limited' && (!this.power.limitedPowerStart || !this.power.limitedPowerEnd)) {
      errors.push('4.1 Limited power time window is required')
    }

    // If assistance marked yes, at least one item
    if (this.relief.hasReceivedAssistance === 'Yes' && this.relief.items.length === 0) {
      errors.push('7.2 Provide at least one assistance record')
    }

    return { valid: errors.length === 0, errors }
  }

  toJSON(): Record<string, any> {
    const cache = new WeakSet()

    const serialize = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') return obj

      if (cache.has(obj)) return '[Circular]'
      cache.add(obj)

      if (obj instanceof Date) return obj.toISOString()
      if (Array.isArray(obj)) return obj.map(serialize)

      const plain: Record<string, any> = {}
      for (const key of Object.keys(obj)) {
        const value = obj[key]
        plain[key] = serialize(value)
      }

      return plain
    }

    return serialize(this)
  }
}

// Centralized UI option lists derived from domain types
export const YES_NO = ['Yes', 'No']
export const YES_NO_UNKNOWN = ['Yes', 'No', 'Do not know']
export const ELECTRICITY_STATUS: readonly ElectricityStatus[] = ['None', 'Yes', 'Partial', 'Limited', 'No power before disaster'] as const

// 3. ACCESSIBILITY options
export const ACCESS_MEANS = [
  'Car or Bus',
  '4WD or 6-10 Wheeler Trucks',
  'Motorcycle',
  'Foot',
  'Boat',
  'Airplane',
  'Helicopter',
  'Horse/cow/carabao',
] 
export const ROAD_STATUS = [
  'Partially passable',
  'Totally Unpassable',
]
export const ACCESS_NEEDS = [
  'Transport',
  'Debris clearing',
  'Road repair',
  'Bridge repair',
  'Traffic Management',
  'Early Warning Signs/Guide lights',
  'Coordination with Port/RORO Operator',
  'Coordination with CAAP/Airport Mgt.',
  'Cash',
]

// 4. POWER options
export const POWER_DAMAGE_CHECK = [
  'Fallen electric posts',
  'Power lines are cut',
  'Damaged Power Plant',
  'Fallen or damaged electric tower',
  'Damaged transformers',
]
export const POWER_URGENT_NEEDS = [
  'Generators/Alternative Power Kit (Solar)',
  'Gasoline for Generators',
  'Diesel for Generators',
]

// 5. COMMUNICATIONS options
export const TELCO_OPS = [
  'Smart/Sun',
  'Globe/TM',
]
export const ALT_COMMS = [
  'Radio AM',
  'Radio FM',
  'TV Free-Air',
  'TV Cable',
  'TV Satellite',
  'Satellite Phone',
  'VHF Radio',
  'UHF Radio',
  'HF/SSB Radio',
  'BGAN',
  'V-SAT',
]
export const COMMS_IMMEDIATE_NEEDS = [
  'Communication to Family or Relatives',
  'Communication to Responders/Government',
  'Internet connection',
  'Charging station',
  'TV/RADIO service',
  'Public Address System',
  'Mobile Phone connection',
  'Cash',
]

// 6. EVACUATION options
export const EVAC_PROTECTION_MECHANISMS = [
  'Security Patrols Organized by the Affected Population',
  'Police Presence/Patrols',
  'Community Protection Groups',
  'Church Groups',
  'BCPC Desk',
  'VAWC Desk',
  'Women-Friendly Spaces',
  'Child-Friendly Spaces',
  'No Protection Mechanism at all',
]
export const EVAC_FACILITIES_OPERATIONAL = [
  'Lighting',
  'Ventilation',
  'Sleeping Areas with partition',
  'Separate Toilets/Baths for Male and Female',
  'Separate Toilets/Baths for PWDs',
  'Washing Areas',
  'Cooking Areas',
  'Sleeping Mat',
  'Camp Management Team',
  'Medical/Health Desk',
  'Police/VAWC Desk',
  'Marked breast-feeding Areas',
  'Libreng Tawag/Charging',
]

// 10. SHELTER options
export const SHELTER_IMMEDIATE_NEEDS = [
  'Hammer/Nails/Saw',
  'Galvanized iron sheets',
  'Tarpaulins',
  'Plastic sheeting',
  'Tents',
  'Lumber',
  'Plywood',
  'Blanket',
  'Sleeping Mat',
  'Mosquito Net',
  'Cash',
  'Others',
]

// 11. FOOD options
export const FOOD_SOURCES = [
  'Household food stocks',
  'Humanitarian aid',
  'Household garden/farm',
  'Local fisher folks/animal growers',
  'Local market',
]
export const FOOD_IMMEDIATE_NEEDS = [
  'Cooked food',
  'Food pack',
  'Rice',
  'Fresh produce',
  'Cash',
]

// 13. SANITATION options
export const SANITATION_IMMEDIATE_NEEDS = [
  'Toilet facilities',
  'Bathing Facilities',
  'Hygiene kits',
  'Dignity Kits',
  'Information on Good Sanitary Practices',
  'Cleanliness of the area',
  'Solid Waste Management',
  'Cash',
]

// 14. HEALTH options
export const HEALTH_FUNCTIONAL_FACILITIES = [
  'Barangay health station',
  'Hospital',
  'Birthing facility',
  'Health desk',
  'Mobile health units',
]
export const HEALTH_MAIN_CONCERNS = [
  'Skin infections',
  'Hypertension',
  'Gastro-intestinal illnesses',
  'Diarrhea/dehydration',
  'Respiratory infection',
  'Trauma',
]
export const HEALTH_IMMEDIATE_NEEDS = [
  'Medicines',
  'Medical Supplies',
  'Health personnel',
  'Supply of Blood',
  'Reproductive Health Commodities',
  'Mobile clinics',
  'Maternity and New born Kits',
  'Cash',
]

// 16. PROTECTION options
export const PROTECTION_VULNERABLE = [
  'Unaccompanied/Separated MINORS/ORPHANS',
  'Unaccompanied/Separated SENIORS',
  'Pregnant/Lactating',
  'Child Headed',
  'Single Adult Headed',
  'Senior Headed',
  'Ethnic/IP',
  'Sick',
  'PWD',
  'PWSN',
]
export const PROTECTION_IMMEDIATE_NEEDS = [
  'Referral',
  'Police Presence',
  'Social Services',
  'Local Gov\'t. Official\'s Presence',
  'Counseling/Debriefing',
  'Replacement of identification documents',
]

// 17. EDUCATION options
export const EDUCATION_URGENT_NEEDS = [
  'Safe spaces to hold classes',
  'Replacement of Learning Materials',
  'Repair of Damaged Buildings',
  'Integrating affected children to other schools',
  'Replacement of Children\'s School Supplies',
  'Replacement of Teaching Materials',
  'Securing Water & Sanitation Facilities at Learning sites',
  'Securing Light & Ventilation at Learning sites',
  'Cash',
]

// 19. COMMUNITY options
export const COMMUNITY_INFO_WANT = [
  'General situation',
  'Situation at home',
  'Information about family members',
  'What aid is coming',
  'Weather situation',
  'Health advice',
  'Security information',
]
export const COMMUNITY_MAIN_SOURCES = [
  'TV (national/local)',
  'AM/FM radio',
  'Social media',
  'Newspaper (national/local)',
  'Government official',
  'Military official',
  'Aid worker',
  'Friends/neighbors/family',
  'Community leader',
  'Religious leader',
  'Community group',
]

export function createEmptyRDANA(): RDANAForm {
  return new RDANAForm()
}
