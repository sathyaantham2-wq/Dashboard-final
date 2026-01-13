
export enum Role {
  COMMISSIONER = 'Commissioner of Labour',
  JCL = 'Joint Commissioner of Labour (JCL)',
  DCL = 'Deputy Commissioner of Labour (DCL)',
  ACL = 'Assistant Commissioner of Labour (ACL)',
  ALO = 'Assistant Labour Officer (ALO)',
  ADMIN = 'System Admin'
}

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: Role;
  mobile: string;
  email: string;
  district: string;
  division?: string;
  circle?: string;
  location?: string;
  superiorId?: string;
  status: 'Active' | 'Inactive';
  mustChangePassword?: boolean;
}

// Uniform 6-field structure for Act-wise Case Work (ACL / DCL)
export interface ActCaseRow {
  actName: string;
  pendingBeginning: number;
  filed: number;
  disposed: number;
  pendingEnd: number;
  workersBenefitted: number;
  casesReserved: number;
}

export interface MonthlyReturn {
  id: string;
  userId: string;
  month: string;
  year: number;
  submittedAt: string;
  status: 'Draft' | 'Locked';

  // ALO Section A: Child Labour
  childLabour?: {
    identifiedHaz: number;
    identifiedNonHaz: number;
    rescuedHaz: number;
    rescuedNonHaz: number;
    compSettled20k: number;
    compPaid: number;
    compPending: number;
    prosecutionsFiled: number;
    pendingEndOfMonth: number;
  };

  // ALO Section B: Inspections & Prosecutions
  enforcement?: {
    allotted: number;
    conducted: number;
    notConducted: number;
    prosPendingStart: number;
    prosFiled: number;
    prosDisposed: number;
    prosPendingEnd: number;
  };

  // ACL/DCL: Act-wise Judicial Work
  actJudicialWork?: ActCaseRow[];

  // JCL: Industrial Disputes
  industrialDisputes?: {
    unionPendingStart: number;
    unionReceived: number;
    unionSettledJoint: number;
    unionSettled12_3: number;
    unionFailures12_4: number;
    unionPendingEnd: number;
    indivPendingStart: number;
    indivReceived: number;
    indivSettled: number;
    indivFailuresReferred: number;
    indivPendingEnd: number;
  };

  // Common: Grievances
  grievances: {
    pendingStart: number;
    received: number;
    disposed: number;
    pendingEnd: number;
  };

  remarks: string;
}
