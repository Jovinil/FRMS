import { defineStore } from 'pinia'
import { RDANAForm, createEmptyRDANA } from '../models/rdana'
import { z } from 'zod'

// 1. PROFILE OF THE DISASTER & RDANA MISSION
const emergencySchema = z.object({
  opName: z.string().optional(),
  opType: z.string().optional(),
  opDateTime: z.string().optional(),
})

const missionSchema = z.object({
  rdanaRegion: z.string().min(1, 'Region is required'),
  rdanaProvince: z.string().min(1, 'Province is required'),
  rdanaCity: z.string().min(1, 'City/Municipality is required'),
  rdanaBarangay: z.string().min(1, 'Barangay is required'),
  rdanaSitioPurok: z.string().optional(),
  rdanaGPS: z.string().optional(),
  rdanaDateTime: z.string().min(1, 'Date and Time of RDANA is required'),
})

const intervieweeSchema = z.object({
  intervieweeName: z.string().optional(),
  intervieweeAge: z.number().int().min(0).optional().nullable(),
  intervieweeOrg: z.string().optional(),
  intervieweeDesignation: z.string().optional(),
  intervieweePhone: z.string().optional(),
  intervieweeEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
})

const profileSchema = z.object({
  emergency: emergencySchema,
  mission: missionSchema,
  interviewee: intervieweeSchema,
  summaryDescription: z.string().optional(),
})

// 2. INITIAL IMPACT: (DEMOGRAPHICS)
const demographicsSchema = z.object({
  affectedFamilies: z.number().int().min(0).optional().nullable(),
  affectedPersons: z.number().int().min(0).optional().nullable(),
  displacedFamiliesInsideEC: z.number().int().min(0).optional().nullable(),
  displacedPersonsInsideEC: z.number().int().min(0).optional().nullable(),
  displacedFamiliesOutsideEC: z.number().int().min(0).optional().nullable(),
  displacedPersonsOutsideEC: z.number().int().min(0).optional().nullable(),
  affectedChildren0_2: z.number().int().min(0).optional().nullable(),
  affectedChildren3_5: z.number().int().min(0).optional().nullable(),
  affectedChildren6_12: z.number().int().min(0).optional().nullable(),
  affectedChildren13_17: z.number().int().min(0).optional().nullable(),
  affectedPWD: z.number().int().min(0).optional().nullable(),
  affectedElderly: z.number().int().min(0).optional().nullable(),
  missingMale: z.number().int().min(0).optional().nullable(),
  missingFemale: z.number().int().min(0).optional().nullable(),
  missingTotal: z.number().int().min(0).optional().nullable(),
  injuredMale: z.number().int().min(0).optional().nullable(),
  injuredFemale: z.number().int().min(0).optional().nullable(),
  injuredTotal: z.number().int().min(0).optional().nullable(),
  deadMale: z.number().int().min(0).optional().nullable(),
  deadFemale: z.number().int().min(0).optional().nullable(),
  deadTotal: z.number().int().min(0).optional().nullable(),
})

// 3. ACCESSIBILITY
const accessibilitySchema = z.object({
  isAccessible: z.enum(['Yes', 'No']).optional(),
  accessMeans: z.array(z.string()).optional(),
  roadDamaged: z.enum(['Yes', 'No']).optional(),
  roadStatus: z.array(z.string()).optional(),
  accessNeeds: z.array(z.string()).optional(),
  accessNeedsOther: z.string().optional(),
}).refine((data) => {
  if (data.roadDamaged === 'Yes') {
    return data.roadStatus && data.roadStatus.length > 0
  }
  return true
}, {
  message: 'Road status is required when road is damaged',
  path: ['roadStatus'],
})

// 4. POWER OR ELECTRICITY
const powerSchema = z.object({
  electricityStatus: z.enum(['None', 'Yes', 'Partial', 'Limited', 'No power before disaster']).optional(),
  partialPowerDetails: z.string().optional(),
  limitedPowerStart: z.string().optional(),
  limitedPowerEnd: z.string().optional(),
  damageCheck: z.array(z.string()).optional(),
  damageOther: z.string().optional(),
  fuelStockDays: z.number().int().min(0).optional().nullable(),
  urgentNeeds: z.array(z.string()).optional(),
  generatorQty: z.number().int().min(0).optional().nullable(),
  gasolineQty: z.number().int().min(0).optional().nullable(),
  dieselQty: z.number().int().min(0).optional().nullable(),
  needsOther: z.string().optional(),
})

// 5. COMMUNICATIONS
const communicationsSchema = z.object({
  telcoOperational: z.array(z.string()).optional(),
  telcoOther: z.string().optional(),
  altCommsOperational: z.array(z.string()).optional(),
  immediateNeeds: z.array(z.string()).optional(),
  needsOther: z.string().optional(),
})

// 6. EVACUATION CENTER DETAILS
const evacuationCenterSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  gps: z.string().optional(),
  families: z.number().int().min(0).optional().nullable(),
  persons: z.number().int().min(0).optional().nullable(),
})

const evacuationSchema = z.object({
  hasEvacuationCenter: z.enum(['Yes', 'No']).optional(),
  hasCampManager: z.enum(['Yes', 'No']).optional(),
  centers: z.array(evacuationCenterSchema).optional(),
  protectionMechanisms: z.array(z.string()).optional(),
  protectionOther: z.string().optional(),
  facilitiesOperational: z.array(z.string()).optional(),
  facilitiesOther: z.string().optional(),
})

// 7. RELIEF ASSISTANCE
const reliefItemSchema = z.object({
  organization: z.string().optional(),
  contactPerson: z.string().optional(),
  contactDetails: z.string().optional(),
  assistanceGiven: z.string().optional(),
  particulars: z.string().optional(),
  quantity: z.number().int().min(0).optional().nullable(),
  serviceStart: z.string().optional(),
  serviceEnd: z.string().optional(),
  familiesServed: z.number().int().min(0).optional().nullable(),
})

const reliefSchema = z.object({
  hasReceivedAssistance: z.enum(['Yes', 'No']).optional(),
  items: z.array(reliefItemSchema).optional(),
})

// 8. SEARCH-RESCUE-RETRIEVAL
const srrSchema = z.object({
  needed: z.enum(['Yes', 'No']).optional(),
  types: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 9. LAW and ORDER
const lawAndOrderSchema = z.object({
  problem: z.enum(['Yes', 'No', 'Do not know']).optional(),
  threats: z.array(z.string()).optional(),
  forcesPresent: z.array(z.string()).optional(),
})

// 10. SHELTER
const shelterSchema = z.object({
  destroyedHouses: z.object({
    count: z.number().int().min(0).optional().nullable(),
    pct: z.enum(['<25%', '25-50%', '51-75%', '>75%']).nullish(),
  }),
  damagedHouses: z.object({
    count: z.number().int().min(0).optional().nullable(),
    pct: z.enum(['<25%', '25-50%', '51-75%', '>75%']).nullish(),
  }),
  immediateNeeds: z.array(z.string()).optional(),
})

// 11. FOOD SECURITY
const foodSchema = z.object({
  accessToFood: z.enum(['Yes', 'No']).optional(),
  foodSources: z.array(z.string()).optional(),
  others: z.string().optional(),
  localMarketOperating: z.enum(['Yes', 'No']).optional(),
  hasWarehouse: z.enum(['Yes', 'No']).optional(),
  immediateNeeds: z.array(z.string()).optional(),
})

// 12. WATER SUPPLY
const waterSchema = z.object({
  accessDrinking: z.enum(['Yes', 'No']).optional(),
  accessDomestic: z.enum(['Yes', 'No']).optional(),
  primarySourceDrinking: z.enum(['Open well', 'Bore hole/hand pump', 'Stream/river', 'Piped water system', 'Storage/collection container', 'Other']).optional(),
  hasContainersWithLid: z.enum(['Yes', 'No']).optional(),
  immediateNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 13. SANITATION
const sanitationSchema = z.object({
  accessSanitaryFacilities: z.enum(['Yes', 'No']).optional(),
  separateFacilities: z.enum(['Yes', 'No']).optional(),
  haveHygieneSupplies: z.enum(['Yes', 'No']).optional(),
  immediateNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 14. HEALTH
const healthSchema = z.object({
  accessToHealthServices: z.enum(['Yes', 'No', 'Do not know']).optional(),
  functionalFacilities: z.array(z.string()).optional(),
  mainConcerns: z.array(z.string()).optional(),
  availability: z.enum(['Adequate', 'Inadequate']).optional(),
  immediateNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 15. NUTRITION
const nutritionSchema = z.object({
  infoExclusiveBreastfeeding: z.enum(['Yes', 'No']).optional(),
  distributedMilkProducts: z.enum(['Yes', 'No']).optional(),
  vitaminAFor6To59: z.enum(['Yes', 'No']).optional(),
  ironFolicForPLW: z.enum(['Yes', 'No']).optional(),
  mmnFor6To23: z.enum(['Yes', 'No']).optional(),
  manageModerateSevere: z.enum(['Yes', 'No']).optional(),
  manageSevere: z.enum(['Yes', 'No']).optional(),
  immediateNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 16. PROTECTION
const protectionSchema = z.object({
  incidentsOfViolence: z.enum(['Yes', 'No', 'Do not know']).optional(),
  vulnerablePresence: z.array(z.string()).optional(),
  reportingMechanism: z.enum(['Yes', 'No']).optional(),
  immediateNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 17. EDUCATION
const educationSchema = z.object({
  classroomsUsedAsEC: z.number().int().min(0).optional().nullable(),
  childrenStayingInEC: z.number().int().min(0).optional().nullable(),
  destroyedClassrooms: z.number().int().min(0).optional().nullable(),
  damagedClassrooms: z.number().int().min(0).optional().nullable(),
  urgentNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 18. LIVELIHOOD/EARLY RECOVERY
const livelihoodSchema = z.object({
  mainSource: z.string().optional(),
  immediateNeeds: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 19. COMMUNITY ENGAGEMENT
const communitySchema = z.object({
  communityReceivesInfo: z.enum(['Yes', 'No', 'Do not know']).optional(),
  infoPeopleWant: z.array(z.string()).optional(),
  mainSources: z.array(z.string()).optional(),
  others: z.string().optional(),
})

// 20. OVER-ALL ASSESSMENT
const overallSchema = z.object({
  assessment: z.enum([
    'People are facing serious problems in the area',
    'As a result of the emergency, people will get sick and might even die',
    'As a result of the emergency, many people have already died'
  ]).optional(),
  justification: z.string().optional(),
  submittedBy: z.object({
    name: z.string().optional(),
    organization: z.string().optional(),
    designation: z.string().optional(),
    contact: z.string().optional(),
  }),
})

// Complete RDANA Form Schema
export const rdanaFormSchema = z.object({
  profile: profileSchema,
  demographics: demographicsSchema,
  accessibility: accessibilitySchema,
  power: powerSchema,
  communications: communicationsSchema,
  evacuation: evacuationSchema,
  relief: reliefSchema,
  srr: srrSchema,
  lawAndOrder: lawAndOrderSchema,
  shelter: shelterSchema,
  food: foodSchema,
  water: waterSchema,
  sanitation: sanitationSchema,
  health: healthSchema,
  nutrition: nutritionSchema,
  protection: protectionSchema,
  education: educationSchema,
  livelihood: livelihoodSchema,
  community: communitySchema,
  overall: overallSchema,
})

// Type inference
// export type RDANAFormData = z.infer<typeof rdanaFormSchema>


export const useRDANAFormStore = defineStore('rdanaForm', {
  state: () => ({
    form: createEmptyRDANA() as RDANAForm,
  }),
  getters: {
    asJSON: (state) => state.form.toJSON(),
  },
  actions: {
    reset() {
      this.form = createEmptyRDANA()
    },
    updateSection<K extends keyof RDANAForm>(section: K, payload: Partial<RDANAForm[K]>) {
      // Assign into nested section to preserve class instance
      Object.assign(this.form[section] as object, payload)
    },
    validate() {
      return this.form.validate()
    },
    async store() {
      const validated = rdanaFormSchema.safeParse(this.form);
      // const validatedDev = this.form
      const totalDamage = await useDamageSummary().getTotalDamage(this.form, ['damage', 'destroyed'])
      const totalDisplaced = await useDamageSummary().getTotalDamage(this.form, ['displaced'])

      if(!validated.success){
        console.log(validated.error.issues)
        return;
      }

      try{
        const request = await $fetch('/api/forms/rdana/create', {
          method: 'POST',
          body: {
            totalDamage: totalDamage.total,
            totalDisplaced: totalDisplaced.total,
            summary: validated.data.profile.summaryDescription,
            barangayName: validated.data.profile.mission.rdanaBarangay,
            userId: useAuthStore().user?.id
          }
        })
      }catch(error){
        console.log(error)
      }

    }
  },
})
