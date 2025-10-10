/*
  DANA Domain Model (OOP, TypeScript)
  - Mirrors the RDANA model's structure and principles
  - Encapsulates sections, validation rules, computed helpers, and factory
  - Designed to be used by a Pinia store and Nuxt UI forms
*/

export type YesNo = 'Yes' | 'No'
export type PassableStatus = 'passable' | 'not_passable' | ''

// -------------------------------
//  A. Profile of the Disaster
// -------------------------------
export class ProfileSection {
  typeOfDisaster = '' // e.g. Flood, Typhoon, Earthquake
  dateOfOccurrence = '' // ISO date string
  timeOfOccurrence = '' // HH:mm or ISO time
  sourceOfReport = '' // who reported
  dateOfReport = '' // ISO date
  timeOfReport = '' // HH:mm

  constructor(init?: Partial<ProfileSection>) {
    Object.assign(this, init)
  }
}

// -------------------------------
//  B. Summary of the Effects
// -------------------------------
export class PopulationCounts {
  families: number | null = null
  persons: number | null = null
  constructor(init?: Partial<PopulationCounts>) { Object.assign(this, init) }
}

export class PopulationAgeBreakdown {
  infants_0_1: number | null = null
  children_2_12: number | null = null
  adolescents_13_17: number | null = null
  adults_18_above: number | null = null
  constructor(init?: Partial<PopulationAgeBreakdown>) { Object.assign(this, init) }
}

export class CasualtiesSection {
  dead: number | null = null
  injured: number | null = null
  missing: number | null = null
  constructor(init?: Partial<CasualtiesSection>) { Object.assign(this, init) }
}

export class DamageBreakdown {
  houses: number | null = null
  schoolBuildings: number | null = null
  hospitals: number | null = null
  govOffices: number | null = null
  publicMarkets: number | null = null
  floodControl: number | null = null
  commercialFacilities: number | null = null
  othersSpec = ''
  constructor(init?: Partial<DamageBreakdown>) { Object.assign(this, init) }
}

export class DamagedPropertiesSection {
  totally: number | null = null
  partially: number | null = null
  estimatedCost: number | null = null // total estimated cost
  breakdown = new DamageBreakdown()

  constructor(init?: Partial<DamagedPropertiesSection>) {
    if (init?.breakdown) this.breakdown = new DamageBreakdown(init.breakdown)
    if (init) Object.assign(this, { ...init, breakdown: this.breakdown })
  }
}

// Lifelines: Transportation, Communication, Electrical, Water
export class TransportRoadCounts {
  national: number | null = null
  provincial: number | null = null
  municipal: number | null = null
  city: number | null = null
  barangay: number | null = null
  constructor(init?: Partial<TransportRoadCounts>) { Object.assign(this, init) }
}

export class TransportSection {
  location = ''
  passable: PassableStatus = ''
  roads = new TransportRoadCounts()
  bridgesCount: number | null = null
  cost: number | null = null
  constructor(init?: Partial<TransportSection>) {
    if (init?.roads) this.roads = new TransportRoadCounts(init.roads)
    if (init) Object.assign(this, { ...init, roads: this.roads })
  }
}

export class CommunicationSection {
  pldt: number | null = null
  bayanTel: number | null = null
  cellSites: number | null = null
  cost: number | null = null
  constructor(init?: Partial<CommunicationSection>) { Object.assign(this, init) }
}

export class LifelinesSection {
  transportation = new TransportSection()
  communication = new CommunicationSection()
  electrical = '' // short description of power status/outage
  water = '' // short description
  constructor(init?: Partial<LifelinesSection>) {
    if (init?.transportation) this.transportation = new TransportSection(init.transportation)
    if (init?.communication) this.communication = new CommunicationSection(init.communication)
    if (init) Object.assign(this, { ...init, transportation: this.transportation, communication: this.communication })
  }
}

// 7. Agriculture (summarized)
export class CropDamageItem {
  hectares: number | null = null
  metricTons: number | null = null
  lossValue: number | null = null
  constructor(init?: Partial<CropDamageItem>) { Object.assign(this, init) }
}

export class AgricultureSection {
  rice = new CropDamageItem()
  corn = new CropDamageItem()
  vegetables = new CropDamageItem()
  other = new CropDamageItem()
  fishponds: number | null = null
  fishingBoats: number | null = null
  livestockHeads: number | null = null
  livestockValue: number | null = null

  constructor(init?: Partial<AgricultureSection>) {
    if (init?.rice) this.rice = new CropDamageItem(init.rice)
    if (init?.corn) this.corn = new CropDamageItem(init.corn)
    if (init?.vegetables) this.vegetables = new CropDamageItem(init.vegetables)
    if (init?.other) this.other = new CropDamageItem(init.other)
    if (init) Object.assign(this, { ...init, rice: this.rice, corn: this.corn, vegetables: this.vegetables, other: this.other })
  }
}

// C. Local Actions
export class LocalActionsSection {
  emergencyResponders = '' // who responded
  assetsDeployed = ''
  affectedServed = new PopulationCounts()
  displacedServed = new PopulationAgeBreakdown()
  extentOfAssistance = ''
  progressReportToFollow: YesNo | '' = ''
  signedBy = ''

  constructor(init?: Partial<LocalActionsSection>) {
    if (init?.affectedServed) this.affectedServed = new PopulationCounts(init.affectedServed)
    if (init?.displacedServed) this.displacedServed = new PopulationAgeBreakdown(init.displacedServed)
    if (init) Object.assign(this, { ...init, affectedServed: this.affectedServed, displacedServed: this.displacedServed })
  }
}

// Aggregate Root: DANAForm
export class DANAForm {
  // A. Profile
  profile = new ProfileSection()

  // B. Summary of Effects
  areasAffected = '' // textual list of barangays/cities/provinces/regions
  populationAffected = new PopulationCounts()
  populationDisplaced = new PopulationCounts() // cumulative total (simpler than per-age breakdown)
  displacedAgeBreakdown = new PopulationAgeBreakdown()
  casualties = new CasualtiesSection()
  damagedProperties = new DamagedPropertiesSection()
  lifelines = new LifelinesSection()
  agriculture = new AgricultureSection()

  // C. Local Actions
  localActions = new LocalActionsSection()

  constructor(init?: Partial<DANAForm>) {
    if (!init) return
    if (init.profile) this.profile = new ProfileSection(init.profile)
    if (typeof init?.areasAffected === 'string') this.areasAffected = init.areasAffected
    if (init.populationAffected) this.populationAffected = new PopulationCounts(init.populationAffected)
    if (init.populationDisplaced) this.populationDisplaced = new PopulationCounts(init.populationDisplaced)
    if (init.displacedAgeBreakdown) this.displacedAgeBreakdown = new PopulationAgeBreakdown(init.displacedAgeBreakdown)
    if (init.casualties) this.casualties = new CasualtiesSection(init.casualties)
    if (init.damagedProperties) this.damagedProperties = new DamagedPropertiesSection(init.damagedProperties)
    if (init.lifelines) this.lifelines = new LifelinesSection(init.lifelines)
    if (init.agriculture) this.agriculture = new AgricultureSection(init.agriculture)
    if (init.localActions) this.localActions = new LocalActionsSection(init.localActions)
  }

  // Domain validations for the DANA form
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Profile required fields
    if (!this.profile.typeOfDisaster) errors.push('A.1 Type of disaster/Emergency is required')
    if (!this.profile.dateOfOccurrence) errors.push('A.2 Date of occurrence is required')
    if (!this.profile.sourceOfReport) errors.push('A.3 Source of report is required')
    if (!this.profile.dateOfReport) errors.push('A.4 Date of report is required')

    // Basic numeric sanity checks (non-negative)
    const numericFields: Array<[string, number | null]> = [
      ['Population affected - families', this.populationAffected.families],
      ['Population affected - persons', this.populationAffected.persons],
      ['Displaced - families', this.populationDisplaced.families],
      ['Displaced - persons', this.populationDisplaced.persons],
      ['Casualties - dead', this.casualties.dead],
      ['Damaged properties - totally', this.damagedProperties.totally],
    ]
    for (const [label, val] of numericFields) {
      if (val !== null && val !== undefined && val < 0) errors.push(`${label} cannot be negative`)
    }

    // Conditional rules
    // If roads are not passable, require at least one road count or bridges count to be provided
    if (this.lifelines.transportation.passable === 'not_passable') {
      const roads = this.lifelines.transportation.roads
      const anyRoadCount = (roads.national || 0) + (roads.provincial || 0) + (roads.municipal || 0) + (roads.city || 0) + (roads.barangay || 0)
      if (anyRoadCount === 0 && !this.lifelines.transportation.bridgesCount) {
        errors.push('6.1 Transportation: provide road/bridge counts when status is not passable')
      }
    }

    // If damaged properties totally/partially exist but no breakdown, remind user (soft validation)
    if ((this.damagedProperties.totally || 0) > 0 && (this.damagedProperties.breakdown.houses === null && this.damagedProperties.breakdown.schoolBuildings === null)) {
      errors.push('5. Damaged Properties: please provide breakdown (houses, schools, etc.) when total > 0')
    }

    // If progress report is expected, signedBy should be provided
    if (this.localActions.progressReportToFollow === 'Yes' && !this.localActions.signedBy) {
      errors.push('C. Local Actions: signatory (BDRRMC Chairman) is required when progress report to follow')
    }

    return { valid: errors.length === 0, errors }
  }

  toJSON(): Record<string, any> {
    return JSON.parse(JSON.stringify(this))
  }
}

// -------------------------------
// Constants / UI option lists
// -------------------------------
export const YES_NO: YesNo[] = ['Yes', 'No']
export const PASSABLE_STATUS: PassableStatus[] = ['passable', 'not_passable', '']

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

export const DAMAGE_BREAKDOWN_FIELDS = [
  'Houses',
  'School Buildings',
  'Hospital',
  "Gov't. Offices",
  'Public Markets',
  'Flood Control',
  'Commercial Facilities',
  'Others',
]

export function createEmptyDANA(): DANAForm {
  return new DANAForm()
}
