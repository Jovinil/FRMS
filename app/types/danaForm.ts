export interface DanaForm {
  disasterType: string
  dateOccurrence: string
  sourceReport: string
  dateReport: string
  areasAffected: string
  familiesAffected: number
  personsAffected: number
  childrenAffected: number
  familiesDisplaced: number
  personsDisplaced: number
  infants: number
  children: number
  adolescents: number
  adults: number
  dead: number
  injured: number
  missing: number
  emergencyResponders?: string
  assetsDeployed?: string
  affectedServedFamilies: number
  affectedServedPersons: number
  displacedServedFamilies: number
  displacedServedPersons: number
  localAssistance?: string
}
