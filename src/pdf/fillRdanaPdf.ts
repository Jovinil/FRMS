// src/pdf/fillRdanaPdf.ts
import { PDFDocument, PDFForm } from 'pdf-lib';
import {
  RdanaForm,
  YesNo,
  YesNoUnknown,
  ShelterDamageRange,
} from '../../app/models/firstRdanaForm';
import { RDANA_PDF_FIELD_MAP as F } from './rdanaPdfFieldMap';

// --------------------------------------------------
// Low-level helpers (safe, no-throw, skip missing)
// --------------------------------------------------
function setText(
  form: PDFForm,
  fieldName: string | undefined,
  value: string | number | null | undefined,
) {
  if (!fieldName) return;
  if (value === null || value === undefined) return;

  try {
    const field = form.getTextField(fieldName);
    field.setText(String(value));
  } catch {
    // Missing or wrong type field – silently ignore
  }
}

function setCheckbox(form: PDFForm, fieldName: string | undefined, checked: boolean) {
  if (!fieldName || !checked) return;
  try {
    const field = form.getCheckBox(fieldName);
    field.check();
  } catch {
    // ignore if not present
  }
}

function setYesNoFromMap(
  form: PDFForm,
  map: { yes?: string; no?: string },
  value: YesNo | null,
) {
  if (!value) return;
  setCheckbox(form, map.yes, value === 'yes');
  setCheckbox(form, map.no, value === 'no');
}

function setYesNoUnknownFromMap(
  form: PDFForm,
  map: { yes?: string; no?: string; unknown?: string },
  value: YesNoUnknown | null,
) {
  if (!value) return;
  setCheckbox(form, map.yes, value === 'yes');
  setCheckbox(form, map.no, value === 'no');
  setCheckbox(form, map.unknown, value === 'unknown');
}

function setSingleChoiceFromMap<T extends string>(
  form: PDFForm,
  map: Record<T, string>,
  value: T | ShelterDamageRange | null,
) {
  if (!value) return;

  (Object.keys(map) as T[]).forEach((k) => {
    setCheckbox(form, map[k], k === value);
  });
}

function setMultiChoiceFromMap<T extends string>(
  form: PDFForm,
  map: Record<T, string>,
  values: readonly T[] | T[] | null | undefined,
) {
  if (!values || !values.length) return;

  for (const v of values as T[]) {
    const fieldName = map[v];
    if (fieldName) {
      setCheckbox(form, fieldName, true);
    }
  }
}

// --------------------------------------------------
// Main filler
// --------------------------------------------------

export async function fillRdanaPdf(
  templateBytes: Uint8Array | ArrayBuffer,
  data: RdanaForm,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();

  // 1. PROFILE ------------------------------------------
  const profile = data.profile;

  // 1.1 Emergency Operation
  setText(
    form,
    F.profile.emergencyOperation.nameOfOperation,
    profile.emergencyOperation.nameOfOperation,
  );
  setText(
    form,
    F.profile.emergencyOperation.typeOfDisaster,
    profile.emergencyOperation.typeOfDisaster,
  );
  setText(
    form,
    F.profile.emergencyOperation.dateTimeOfEvent,
    profile.emergencyOperation.dateTimeOfEvent,
  );

  // 1.2 RDANA Mission
  setText(form, F.profile.mission.region, profile.mission.region);
  setText(form, F.profile.mission.province, profile.mission.province);
  setText(
    form,
    F.profile.mission.cityMunicipality,
    profile.mission.cityMunicipality,
  );
  setText(form, F.profile.mission.barangay, profile.mission.barangay);
  setText(form, F.profile.mission.sitioPurok, profile.mission.sitioPurok);
  setText(
    form,
    F.profile.mission.gpsCoordinate,
    profile.mission.gpsCoordinate,
  );
  setText(
    form,
    F.profile.mission.dateTimeOfRdana,
    profile.mission.dateTimeOfRdana,
  );

  // 1.3 Local authorities -> first row only (localAuthorities[0])
  const firstLocalAuthority = profile.localAuthorities[0];
  if (firstLocalAuthority) {
    setText(
      form,
      F.profile.firstLocalAuthority.name,
      firstLocalAuthority.name,
    );
    setText(
      form,
      F.profile.firstLocalAuthority.age,
      firstLocalAuthority.age,
    );
    setText(
      form,
      F.profile.firstLocalAuthority.officeOrganization,
      firstLocalAuthority.officeOrganization,
    );
    setText(
      form,
      F.profile.firstLocalAuthority.designation,
      firstLocalAuthority.designation,
    );
    setText(
      form,
      F.profile.firstLocalAuthority.phoneNumber,
      firstLocalAuthority.phoneNumber,
    );
    setText(
      form,
      F.profile.firstLocalAuthority.email,
      firstLocalAuthority.email,
    );
  }

  // 1.4 Summary
  setText(form, F.profile.summaryDescription, profile.summaryDescription);

  // 2. INITIAL IMPACT -----------------------------------
  const ii = data.initialImpact;

  setText(form, F.initialImpact.affectedFamilies, ii.affectedFamilies);
  setText(form, F.initialImpact.affectedPersons, ii.affectedPersons);

  setText(
    form,
    F.initialImpact.displacedFamiliesInsideECs,
    ii.displacedFamiliesInsideECs,
  );
  setText(
    form,
    F.initialImpact.displacedPersonsInsideECs,
    ii.displacedPersonsInsideECs,
  );
  setText(
    form,
    F.initialImpact.displacedFamiliesOutsideECs,
    ii.displacedFamiliesOutsideECs,
  );
  setText(
    form,
    F.initialImpact.displacedPersonsOutsideECs,
    ii.displacedPersonsOutsideECs,
  );

  setText(
    form,
    F.initialImpact.affectedChildren.age0to2,
    ii.affectedChildren.age0to2,
  );
  setText(
    form,
    F.initialImpact.affectedChildren.age3to5,
    ii.affectedChildren.age3to5,
  );
  setText(
    form,
    F.initialImpact.affectedChildren.age6to12,
    ii.affectedChildren.age6to12,
  );
  setText(
    form,
    F.initialImpact.affectedChildren.age13to17,
    ii.affectedChildren.age13to17,
  );

  setText(form, F.initialImpact.pwd, ii.pwd);
  setText(form, F.initialImpact.elderly, ii.elderly);

  setText(form, F.initialImpact.missingMale, ii.missingMale);
  setText(form, F.initialImpact.missingFemale, ii.missingFemale);
  setText(form, F.initialImpact.missingTotal, ii.missingTotal);

  setText(form, F.initialImpact.injuredMale, ii.injuredMale);
  setText(form, F.initialImpact.injuredFemale, ii.injuredFemale);
  setText(form, F.initialImpact.injuredTotal, ii.injuredTotal);

  setText(form, F.initialImpact.deadMale, ii.deadMale);
  setText(form, F.initialImpact.deadFemale, ii.deadFemale);
  setText(form, F.initialImpact.deadTotal, ii.deadTotal);

  // 3. ACCESSIBILITY ------------------------------------
  const acc = data.accessibility;

  setYesNoFromMap(form, F.accessibility.communityAccessible, acc.communityAccessible);

  setMultiChoiceFromMap(
    form,
    F.accessibility.accessModes,
    acc.accessModes,
  );

  setYesNoFromMap(
    form,
    F.accessibility.hasDamagedRoadsOrBridges,
    acc.hasDamagedRoadsOrBridges,
  );

  if (acc.damagePassability) {
    setSingleChoiceFromMap(
      form,
      F.accessibility.damagePassability,
      acc.damagePassability,
    );
  }

  if (acc.immediateAccessNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.accessibility.immediateAccessNeeds as Record<string, string>,
      acc.immediateAccessNeeds as string[],
    );
  }
  setText(
    form,
    F.accessibility.immediateAccessNeedOther,
    acc.immediateAccessNeedOther,
  );

  // 4. POWER --------------------------------------------
  const power = data.power;

  if (power.powerStatus) {
    setSingleChoiceFromMap(
      form,
      F.power.powerStatus as Record<string, string>,
      power.powerStatus,
    );
  }

  setText(
    form,
    F.power.partialWithoutPowerPercent,
    power.partialWithoutPowerPercent,
  );
  setText(form, F.power.limitedFromTime, power.limitedFromTime);
  setText(form, F.power.limitedToTime, power.limitedToTime);

  if (power.powerDamages?.length) {
    setMultiChoiceFromMap(
      form,
      F.power.powerDamages as Record<string, string>,
      power.powerDamages as string[],
    );
  }
  setText(form, F.power.powerDamageOther, power.powerDamageOther);

  setText(form, F.power.fuelStockDays, power.fuelStockDays);

  if (power.urgentPowerNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.power.urgentPowerNeeds as Record<string, string>,
      power.urgentPowerNeeds as string[],
    );
  }

  setText(form, F.power.urgentPowerGeneratorQty, power.urgentPowerGeneratorQty);
  setText(form, F.power.urgentGasolineQty, power.urgentGasolineQty);
  setText(form, F.power.urgentDieselQty, power.urgentDieselQty);

  // 5. COMMUNICATIONS -----------------------------------
  const comm = data.communications;

  if (comm.telcoSignals?.length) {
    setMultiChoiceFromMap(
      form,
      F.communications.telcoSignals as Record<string, string>,
      comm.telcoSignals as string[],
    );
  }
  setText(form, F.communications.telcoSignalOther, comm.telcoSignalOther);

  if (comm.mediaServices?.length) {
    setMultiChoiceFromMap(
      form,
      F.communications.mediaServices as Record<string, string>,
      comm.mediaServices as string[],
    );
  }

  if (comm.altCommunications?.length) {
    setMultiChoiceFromMap(
      form,
      F.communications.altCommunications as Record<string, string>,
      comm.altCommunications as string[],
    );
  }

  if (comm.immediateCommNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.communications.immediateCommNeeds as Record<string, string>,
      comm.immediateCommNeeds as string[],
    );
  }
  setText(
    form,
    F.communications.immediateCommNeedOther,
    comm.immediateCommNeedOther,
  );

  // 6. EVACUATION ---------------------------------------
  const evac = data.evacuation;

  setYesNoFromMap(
    form,
    F.evacuation.hasEvacuationCenter,
    evac.hasEvacuationCenter,
  );
  setYesNoFromMap(
    form,
    F.evacuation.hasCampManager,
    evac.hasCampManager,
  );

  // Only map the first evacuation center row
  const firstCenter = evac.centers[0];
  if (firstCenter && F.evacuation.centers?.first) {
    const m = F.evacuation.centers.first;
    setText(form, m.name, firstCenter.name);
    setText(form, m.address, firstCenter.address);
    setText(form, m.gpsCoordinates, firstCenter.gpsCoordinates);
    setText(form, m.familiesInside, firstCenter.familiesInside);
    setText(form, m.personsInside, firstCenter.personsInside);
  }

  if (evac.protectionMechanisms?.length) {
    setMultiChoiceFromMap(
      form,
      F.evacuation.protectionMechanisms as Record<string, string>,
      evac.protectionMechanisms as string[],
    );
  }
  setText(
    form,
    F.evacuation.protectionMechanismOther,
    evac.protectionMechanismOther,
  );

  if (evac.facilitiesOperational?.length) {
    setMultiChoiceFromMap(
      form,
      F.evacuation.facilitiesOperational as Record<string, string>,
      evac.facilitiesOperational as string[],
    );
  }
  setText(form, F.evacuation.facilityOther, evac.facilityOther);

  // 7. RELIEF -------------------------------------------
  const relief = data.relief;

  setYesNoFromMap(
    form,
    F.relief.hasReceivedAssistance,
    relief.hasReceivedAssistance,
  );

  // NOTE: assistanceList is more complex (multiple orgs/rows).
  // Once you map those fields into RDANA_PDF_FIELD_MAP, you can
  // loop over relief.assistanceList[i] and fill row i.

  // 8. SEARCH, RESCUE AND RETRIEVAL ----------------------
  const srr = data.srr;

  setYesNoUnknownFromMap(
    form,
    F.srr.srrNeeded,
    srr.srrNeeded,
  );

  if (srr.srrTypes?.length) {
    setMultiChoiceFromMap(
      form,
      F.srr.srrTypes as Record<string, string>,
      srr.srrTypes as string[],
    );
  }
  setText(form, F.srr.srrOther, srr.srrOther);

  // 9. LAW AND ORDER ------------------------------------
  const lao = data.lawAndOrder;

  setYesNoUnknownFromMap(
    form,
    F.lawAndOrder.lawAndOrderProblem,
    lao.lawAndOrderProblem,
  );

  if (lao.threats?.length) {
    setMultiChoiceFromMap(
      form,
      F.lawAndOrder.threats as Record<string, string>,
      lao.threats as string[],
    );
  }
  setText(form, F.lawAndOrder.threatsOther, lao.threatsOther);

  if (lao.securityPresence?.length) {
    setMultiChoiceFromMap(
      form,
      F.lawAndOrder.securityPresence as Record<string, string>,
      lao.securityPresence as string[],
    );
  }
  setText(
    form,
    F.lawAndOrder.securityPresenceOther,
    lao.securityPresenceOther,
  );

  // 10. SHELTER -----------------------------------------
  const sh = data.shelter;

  setText(form, F.shelter.destroyedHousesNumber, sh.destroyedHousesNumber);
  if (sh.destroyedHousesRange) {
    setSingleChoiceFromMap(
      form,
      F.shelter.destroyedHousesRange,
      sh.destroyedHousesRange,
    );
  }

  setText(form, F.shelter.damagedHousesNumber, sh.damagedHousesNumber);
  if (sh.damagedHousesRange) {
    setSingleChoiceFromMap(
      form,
      F.shelter.damagedHousesRange,
      sh.damagedHousesRange,
    );
  }

  if (sh.immediateShelterNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.shelter.immediateShelterNeeds as Record<string, string>,
      sh.immediateShelterNeeds as string[],
    );
  }
  setText(
    form,
    F.shelter.immediateShelterNeedOther,
    sh.immediateShelterNeedOther,
  );

  // 11. FOOD SECURITY -----------------------------------
  const food = data.foodSecurity;

  setYesNoFromMap(
    form,
    F.foodSecurity.peopleHaveAccessToFood,
    food.peopleHaveAccessToFood,
  );

  if (food.mainSourcesOfFood?.length) {
    setMultiChoiceFromMap(
      form,
      F.foodSecurity.mainSourcesOfFood as Record<string, string>,
      food.mainSourcesOfFood as string[],
    );
  }
  setText(
    form,
    F.foodSecurity.mainSourceOfFoodOther,
    food.mainSourceOfFoodOther,
  );

  setYesNoFromMap(
    form,
    F.foodSecurity.localMarketOperating,
    food.localMarketOperating,
  );
  setYesNoFromMap(
    form,
    F.foodSecurity.hasFoodWarehouse,
    food.hasFoodWarehouse,
  );

  if (food.immediateFoodNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.foodSecurity.immediateFoodNeeds as Record<string, string>,
      food.immediateFoodNeeds as string[],
    );
  }
  setText(
    form,
    F.foodSecurity.immediateFoodNeedOther,
    food.immediateFoodNeedOther,
  );

  // 12. WATER SUPPLY ------------------------------------
  const ws = data.waterSupply;

  setYesNoFromMap(
    form,
    F.waterSupply.accessToDrinkingWater,
    ws.accessToDrinkingWater,
  );
  setYesNoFromMap(
    form,
    F.waterSupply.accessToDomesticWater,
    ws.accessToDomesticWater,
  );

  if (ws.primaryDrinkingWaterSource) {
    setSingleChoiceFromMap(
      form,
      F.waterSupply.primaryDrinkingWaterSource as Record<string, string>,
      ws.primaryDrinkingWaterSource,
    );
  }
  setText(
    form,
    F.waterSupply.primaryDrinkingWaterSourceOther,
    ws.primaryDrinkingWaterSourceOther,
  );

  setYesNoFromMap(
    form,
    F.waterSupply.householdsHaveWaterContainersWithLid,
    ws.householdsHaveWaterContainersWithLid,
  );

  if (ws.immediateWaterNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.waterSupply.immediateWaterNeeds as Record<string, string>,
      ws.immediateWaterNeeds as string[],
    );
  }
  setText(
    form,
    F.waterSupply.immediateWaterNeedOther,
    ws.immediateWaterNeedOther,
  );

  // 13. SANITATION --------------------------------------
  const san = data.sanitation;

  setYesNoFromMap(
    form,
    F.sanitation.accessToFunctioningSanitaryFacilities,
    san.accessToFunctioningSanitaryFacilities,
  );
  setYesNoFromMap(
    form,
    F.sanitation.separateFacilitiesForWomenAndMen,
    san.separateFacilitiesForWomenAndMen,
  );
  setYesNoFromMap(
    form,
    F.sanitation.adequateHygieneSupplies,
    san.adequateHygieneSupplies,
  );

  if (san.immediateSanitationNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.sanitation.immediateSanitationNeeds as Record<string, string>,
      san.immediateSanitationNeeds as string[],
    );
  }
  setText(
    form,
    F.sanitation.immediateSanitationNeedOther,
    san.immediateSanitationNeedOther,
  );

  // 14. HEALTH ------------------------------------------
  const health = data.health;

  setYesNoUnknownFromMap(
    form,
    F.health.accessToHealthServices,
    health.accessToHealthServices,
  );

  if (health.functionalHealthFacilities?.length) {
    setMultiChoiceFromMap(
      form,
      F.health.functionalHealthFacilities as Record<string, string>,
      health.functionalHealthFacilities as string[],
    );
  }
  setText(
    form,
    F.health.functionalHealthFacilityOther,
    health.functionalHealthFacilityOther,
  );

  if (health.mainHealthConcerns?.length) {
    setMultiChoiceFromMap(
      form,
      F.health.mainHealthConcerns as Record<string, string>,
      health.mainHealthConcerns as string[],
    );
  }
  setText(
    form,
    F.health.mainHealthConcernOther,
    health.mainHealthConcernOther,
  );

  if (health.medicinesAvailability) {
    setSingleChoiceFromMap(
      form,
      F.health.medicinesAvailability as Record<string, string>,
      health.medicinesAvailability,
    );
  }

  if (health.immediateHealthNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.health.immediateHealthNeeds as Record<string, string>,
      health.immediateHealthNeeds as string[],
    );
  }
  setText(
    form,
    F.health.immediateHealthNeedOther,
    health.immediateHealthNeedOther,
  );

  // 15. NUTRITION ---------------------------------------
  const nut = data.nutrition;

  setYesNoFromMap(
    form,
    F.nutrition.infoOnExclusivelyBreastfedInfants,
    nut.infoOnExclusivelyBreastfedInfants,
  );
  setYesNoFromMap(
    form,
    F.nutrition.milkProductsDistributed,
    nut.milkProductsDistributed,
  );
  setYesNoFromMap(
    form,
    F.nutrition.vitaminA6to59Months,
    nut.vitaminA6to59Months,
  );
  setYesNoFromMap(
    form,
    F.nutrition.ironFolicForPregLactating,
    nut.ironFolicForPregLactating,
  );
  setYesNoFromMap(
    form,
    F.nutrition.micronutrientPowders,
    nut.micronutrientPowders,
  );
  setYesNoFromMap(
    form,
    F.nutrition.managementOfAcuteMalnutrition,
    nut.managementOfAcuteMalnutrition,
  );

  if (nut.immediateNutritionNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.nutrition.immediateNutritionNeeds as Record<string, string>,
      nut.immediateNutritionNeeds as string[],
    );
  }
  setText(
    form,
    F.nutrition.immediateNutritionNeedOther,
    nut.immediateNutritionNeedOther,
  );

  // 16. PROTECTION --------------------------------------
  const prot = data.protection;

  setYesNoUnknownFromMap(
    form,
    F.protection.violenceCasesPresent,
    prot.violenceCasesPresent,
  );

  if (prot.vulnerableGroupsPresent?.length) {
    setMultiChoiceFromMap(
      form,
      F.protection.vulnerableGroupsPresent as Record<string, string>,
      prot.vulnerableGroupsPresent as string[],
    );
  }

  setYesNoFromMap(
    form,
    F.protection.reportingMechanismExists,
    prot.reportingMechanismExists,
  );

  if (prot.immediateProtectionNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.protection.immediateProtectionNeeds as Record<string, string>,
      prot.immediateProtectionNeeds as string[],
    );
  }
  setText(
    form,
    F.protection.immediateProtectionNeedOther,
    prot.immediateProtectionNeedOther,
  );

  // 17. EDUCATION ---------------------------------------
  const edu = data.education;

  setText(form, F.education.classroomsUsedAsEC, edu.classroomsUsedAsEC);
  setText(form, F.education.childrenStayingInEC, edu.childrenStayingInEC);
  setText(form, F.education.destroyedClassrooms, edu.destroyedClassrooms);
  setText(form, F.education.damagedClassrooms, edu.damagedClassrooms);

  if (edu.urgentEducationalNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.education.urgentEducationalNeeds as Record<string, string>,
      edu.urgentEducationalNeeds as string[],
    );
  }
  setText(
    form,
    F.education.urgentEducationalNeedOther,
    edu.urgentEducationalNeedOther,
  );

  // 18. LIVELIHOOD --------------------------------------
  const liv = data.livelihood;

  setText(form, F.livelihood.mainSourceOfLivelihood, liv.mainSourceOfLivelihood);

  if (liv.immediateLivelihoodNeeds?.length) {
    setMultiChoiceFromMap(
      form,
      F.livelihood.immediateLivelihoodNeeds as Record<string, string>,
      liv.immediateLivelihoodNeeds as string[],
    );
  }
  setText(
    form,
    F.livelihood.immediateLivelihoodNeedOther,
    liv.immediateLivelihoodNeedOther,
  );

  // 19. COMMUNITY ENGAGEMENT ----------------------------
  const ce = data.communityEngagement;

  setYesNoUnknownFromMap(
    form,
    F.communityEngagement.communityReceivingInformation,
    ce.communityReceivingInformation,
  );

  if (ce.whatPeopleWantToKnow?.length) {
    setMultiChoiceFromMap(
      form,
      F.communityEngagement.whatPeopleWantToKnow as Record<string, string>,
      ce.whatPeopleWantToKnow as string[],
    );
  }
  setText(
    form,
    F.communityEngagement.whatPeopleWantToKnowOther,
    ce.whatPeopleWantToKnowOther,
  );

  if (ce.mainInformationSources?.length) {
    setMultiChoiceFromMap(
      form,
      F.communityEngagement.mainInformationSources as Record<string, string>,
      ce.mainInformationSources as string[],
    );
  }
  setText(
    form,
    F.communityEngagement.mainInformationSourceOther,
    ce.mainInformationSourceOther,
  );

  // 20. OVERALL ASSESSMENT ------------------------------
  const oa = data.overallAssessment;

  if (oa.situationAssessment) {
    setSingleChoiceFromMap(
      form,
      F.overallAssessment.situationAssessment as Record<string, string>,
      oa.situationAssessment,
    );
  }
  setText(form, F.overallAssessment.justification, oa.justification);

  // 21. SUBMITTED BY ------------------------------------
  const sub = data.submittedBy;

  setText(form, F.submittedBy.name, sub.name);
  setText(form, F.submittedBy.designation, sub.designation);
  setText(form, F.submittedBy.organization, sub.organization);
  setText(form, F.submittedBy.rdanaTeam, sub.rdanaTeam);
  setText(form, F.submittedBy.contactNumber, sub.contactNumber);
  setText(form, F.submittedBy.email, sub.email);

  form.flatten();

  // DONE – return bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
