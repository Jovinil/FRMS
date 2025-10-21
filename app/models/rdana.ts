// ~/models/rdanaModel.ts
import { z } from 'zod'

/**
 * Full RDANA model (field names taken from the fillable PDF metadata you provided).
 * Exports Zod schema, TS type, and a factory for an empty instance.
 */

export const RDANASchema = z.object({
  // A. Profile
  disaster_type: z.string().optional().nullable(),
  date_time_occur: z.string().optional().nullable(),
  areas_affected: z.string().optional().nullable(),
  source_of_report: z.string().optional().nullable(),
  date_time_reports: z.string().optional().nullable(),

  // B. Initial Effects - Affected Population
  affected_popu_families: z.number().nullable().optional(),
  affected_popu_persons: z.number().optional().nullable(), // original weird key kept
  affected_popu_num_infants: z.number().nullable().optional(),
  affected_popu_num_children: z.number().nullable().optional(),
  affected_popu_num_adults: z.number().nullable().optional(),

  // B. Displaced Population
  displaced_popu_families: z.number().nullable().optional(),
  displaced_popu_persons: z.number().nullable().optional(),
  displaced_popu_num_infants: z.number().nullable().optional(),
  displaced_popu_num_children: z.number().nullable().optional(),
  displaced_popu_num_adults: z.number().nullable().optional(),

  // B. Casualties
  loc_dead: z.string().optional().nullable(),
  loc_injured: z.string().optional().nullable(),
  loc_missing: z.string().optional().nullable(),
  num_dead: z.number().nullable().optional(),
  num_injured: z.number().nullable().optional(),
  num_missing: z.number().nullable().optional(),
  cause_dead: z.string().optional().nullable(),
  cause_injured: z.string().optional().nullable(),
  missing: z.string().optional().nullable(),

  // C. Search and Rescue
  search_and_rescue_exact_loc: z.string().optional().nullable(),
  sar_approx_num_missing_children: z.number().nullable().optional(),
  sar_approx_num_missing_adults: z.number().nullable().optional(),
  unmet_needs_water_closet: z.string().optional().nullable(),

  // C. Evacuation
  evacuation_exact_loc: z.string().optional().nullable(),
  evac_response: z.string().optional().nullable(),
  unmet_needs_evac: z.string().optional().nullable(),
  evac_center_names: z.string().optional().nullable(),
  approx_num_to_evac_infants: z.number().nullable().optional(),
  approx_num_to_evac_children: z.number().nullable().optional(),
  approx_num_to_evac_adults: z.number().nullable().optional(),
  num_of_person_in_evac_in_need_of_assistance: z.string().optional().nullable(),
  requirement_of_affected_fam_in_evac: z.string().optional().nullable(),

  // C. Medical / Health
  medical_health_exact_loc: z.string().optional().nullable(),
  medical_health_unmet_needs: z.string().optional().nullable(),
  is_latrines_evac_center: z.string().optional().nullable(),
  medical_health_num_injured: z.number().nullable().optional(),
  displaced_fam_medic_attention_families: z.number().nullable().optional(),
  displaced_fam_medic_attention_persons: z.number().nullable().optional(),
  displaced_fam_medic_attention_infants: z.number().nullable().optional(),
  displaced_fam_medic_attention_children: z.number().nullable().optional(),
  displaced_fam_medic_attention_adults: z.number().nullable().optional(),
  health_care_facilities: z.string().optional().nullable(),
  emergency_health_and_medical_services: z.string().optional().nullable(),
  is_there_health_workers: z.string().optional().nullable(),

  // D. Shelter & Clothing
  shelter_and_clothing_exact_loc: z.string().optional().nullable(),
  num_of_people_shelter_and_clothing_male: z.number().nullable().optional(),
  num_of_people_shelter_and_clothing_female: z.number().nullable().optional(),
  num_of_people_shelter_and_clothing_infants: z.number().nullable().optional(),
  num_of_people_shelter_and_clothing_children: z.number().nullable().optional(),
  num_of_people_shelter_and_clothing_adult: z.number().nullable().optional(),
  // unmet needs text for shelter/clothing:
  // (left generic)
  // E. Food
  num_of_people_food_infants: z.number().nullable().optional(),
  total_num_of_people_food: z.number().nullable().optional(),
  num_of_people_food_children: z.number().nullable().optional(),
  num_of_people_food_adults: z.number().nullable().optional(),
  is_there_food_stock: z.string().optional().nullable(),
  is_food_assist_equal_distri: z.string().optional().nullable(),
  is_children_being_provided_with_food_needs: z.string().optional().nullable(),
  is_prime_commo_available_yes: z.string().optional().nullable(),
  is_prime_commo_available_no: z.string().optional().nullable(),

  // Water
  num_of_people_without_pot_water_infants: z.number().nullable().optional(),
  num_of_people_without_pot_water_adult: z.number().nullable().optional(),
  num_of_people_without_pot_water_children: z.number().nullable().optional(),
  total_num_of_people_without_pot_water: z.number().nullable().optional(),
  water_response_stat: z.string().optional().nullable(),
  water_unmet_needs: z.string().optional().nullable(),
  is_there_water_arrangement: z.string().optional().nullable(),
  is_there_water_shortage_ye: z.string().optional().nullable(),
  is_there_water_shortage_no: z.string().optional().nullable(),
  water_widespread_yes: z.string().optional().nullable(),
  water_widespread_no: z.string().optional().nullable(),
  is_there_alternate_water_ye: z.string().optional().nullable(),
  is_there_alternate_water_no: z.string().optional().nullable(),
  did_service_provider_yes: z.string().optional().nullable(),
  did_service_provider_no: z.string().optional().nullable(),
  num_of_days_restore_system: z.number().nullable().optional(),

  // Environment sanitation
  environment_sani_feces_disposal: z.string().optional().nullable(),
  environment_sani_adequate: z.string().optional().nullable(),

  // Restorations of Lifelines
  restoration_lifelines_exact_loc: z.string().optional().nullable(),
  restoration_lifelines_condition: z.string().optional().nullable(),
  is_restoration_lifelines_operational: z.string().optional().nullable(),
  restoration_lifelines_response_stat: z.string().optional().nullable(),
  restoration_lifelines_unmet_needs: z.string().optional().nullable(),

  // Power / lifeline
  power_interruption_yes: z.string().optional().nullable(),
  power_interruption_date: z.string().optional().nullable(),
  power_interruption_time: z.string().optional().nullable(),
  power_interruption_cause: z.string().optional().nullable(),
  lifeline_widespread_yes: z.string().optional().nullable(),
  lifeline_widespread_no: z.string().optional().nullable(),
  is_post_down_yes: z.string().optional().nullable(),
  is_post_down_no: z.string().optional().nullable(),
  num_of_days_lifeline_restore: z.number().nullable().optional(),
  actions_taken_by_company: z.string().optional().nullable(),

  // Education
  is_there_school_damage_yes: z.string().optional().nullable(),
  is_there_school_damage_no: z.string().optional().nullable(),
  num_of_children_affected_by_damage: z.number().nullable().optional(),
  extent_of_disruption: z.string().optional().nullable(),
  num_of_children_primary_edu_boys: z.number().nullable().optional(),
  num_of_children_primary_edu_girls: z.number().nullable().optional(),
  loc_target_group: z.string().optional().nullable(),
  lvl_formal_nonformal: z.string().optional().nullable(),
  instruction_materials: z.string().optional().nullable(),
  physical_facilities_nonformal: z.string().optional().nullable(),

  // E. Local Initial Response
  responders_involved: z.string().optional().nullable(),
  assets_deployed: z.string().optional().nullable(),
  num_of_persons_served_families: z.number().nullable().optional(),
  num_of_persons_served_persons: z.number().nullable().optional(),
  num_of_persons_served_infants: z.number().nullable().optional(),
  num_of_persons_served_children: z.number().nullable().optional(),
  num_of_persons_served_adults: z.number().nullable().optional(),
  extent_of_local_assist: z.string().optional().nullable(),
  signed: z.string().optional().nullable(),
})

export type RDANAForm = z.infer<typeof RDANASchema>

export function createEmptyRDANA(): RDANAForm {
  return {
    disaster_type: '',
    date_time_occur: '',
    areas_affected: '',
    source_of_report: '',
    date_time_reports: '',

    affected_popu_families: null,
    affected_popu_persons: null,
    affected_popu_num_infants: null,
    affected_popu_num_children: null,
    affected_popu_num_adults: null,

    displaced_popu_families: null,
    displaced_popu_persons: null,
    displaced_popu_num_infants: null,
    displaced_popu_num_children: null,
    displaced_popu_num_adults: null,

    loc_dead: '',
    loc_injured: '',
    loc_missing: '',
    num_dead: null,
    num_injured: null,
    num_missing: null,
    cause_dead: '',
    cause_injured: '',
    missing: '',

    search_and_rescue_exact_loc: '',
    sar_approx_num_missing_children: null,
    sar_approx_num_missing_adults: null,
    unmet_needs_water_closet: '',

    evacuation_exact_loc: '',
    evac_response: '',
    unmet_needs_evac: '',
    evac_center_names: '',
    approx_num_to_evac_infants: null,
    approx_num_to_evac_children: null,
    approx_num_to_evac_adults: null,
    num_of_person_in_evac_in_need_of_assistance: '',
    requirement_of_affected_fam_in_evac: '',

    medical_health_exact_loc: '',
    medical_health_unmet_needs: '',
    is_latrines_evac_center: '',
    medical_health_num_injured: null,
    displaced_fam_medic_attention_families: null,
    displaced_fam_medic_attention_persons: null,
    displaced_fam_medic_attention_infants: null,
    displaced_fam_medic_attention_children: null,
    displaced_fam_medic_attention_adults: null,
    health_care_facilities: '',
    emergency_health_and_medical_services: '',
    is_there_health_workers: '',

    shelter_and_clothing_exact_loc: '',
    num_of_people_shelter_and_clothing_male: null,
    num_of_people_shelter_and_clothing_female: null,
    num_of_people_shelter_and_clothing_infants: null,
    num_of_people_shelter_and_clothing_children: null,
    num_of_people_shelter_and_clothing_adult: null,

    num_of_people_food_infants: null,
    total_num_of_people_food: null,
    num_of_people_food_children: null,
    num_of_people_food_adults: null,
    is_there_food_stock: '',
    is_food_assist_equal_distri: '',
    is_children_being_provided_with_food_needs: '',
    is_prime_commo_available_yes: '',
    is_prime_commo_available_no: '',

    num_of_people_without_pot_water_infants: null,
    num_of_people_without_pot_water_adult: null,
    num_of_people_without_pot_water_children: null,
    total_num_of_people_without_pot_water: null,
    water_response_stat: '',
    water_unmet_needs: '',
    is_there_water_arrangement: '',
    is_there_water_shortage_ye: '',
    is_there_water_shortage_no: '',
    water_widespread_yes: '',
    water_widespread_no: '',
    is_there_alternate_water_ye: '',
    is_there_alternate_water_no: '',
    did_service_provider_yes: '',
    did_service_provider_no: '',
    num_of_days_restore_system: null,

    environment_sani_feces_disposal: '',
    environment_sani_adequate: '',

    restoration_lifelines_exact_loc: '',
    restoration_lifelines_condition: '',
    is_restoration_lifelines_operational: '',
    restoration_lifelines_response_stat: '',
    restoration_lifelines_unmet_needs: '',

    power_interruption_yes: '',
    power_interruption_date: '',
    power_interruption_time: '',
    power_interruption_cause: '',
    lifeline_widespread_yes: '',
    lifeline_widespread_no: '',
    is_post_down_yes: '',
    is_post_down_no: '',
    num_of_days_lifeline_restore: null,
    actions_taken_by_company: '',

    is_there_school_damage_yes: '',
    is_there_school_damage_no: '',
    num_of_children_affected_by_damage: null,
    extent_of_disruption: '',
    num_of_children_primary_edu_boys: null,
    num_of_children_primary_edu_girls: null,
    loc_target_group: '',
    lvl_formal_nonformal: '',
    instruction_materials: '',
    physical_facilities_nonformal: '',

    responders_involved: '',
    assets_deployed: '',
    num_of_persons_served_families: null,
    num_of_persons_served_persons: null,
    num_of_persons_served_infants: null,
    num_of_persons_served_children: null,
    num_of_persons_served_adults: null,
    extent_of_local_assist: '',
    signed: '',
  }
}
