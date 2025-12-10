// models/firstBarangayForm.ts
import type { YesNo } from '~/models/firstRdanaForm'; // reuse if you already have it
// If not, uncomment this line instead:
// export type YesNo = 'yes' | 'no';

export interface FirstBarangayIncidentProfile {
  what: string;
  when: string;
  where: string;
  why: string;
  who: string;
  how: string;
}

export interface FirstBarangayForm {
  initialReportOn: string;
  originOfReport: string;
  incidentProfile: FirstBarangayIncidentProfile;
  searchRescueNeeded: YesNo | null;
  evacuationNeeded: YesNo | null;
  signedByChairman: string;
}

export function createDefaultFirstBarangayForm(): FirstBarangayForm {
  return {
    initialReportOn: '',
    originOfReport: '',
    incidentProfile: {
      what: '',
      when: '',
      where: '',
      why: '',
      who: '',
      how: '',
    },
    searchRescueNeeded: null,
    evacuationNeeded: null,
    signedByChairman: '',
  };
}
