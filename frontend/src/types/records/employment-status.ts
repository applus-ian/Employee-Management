export type EmploymentStatus = 'onboarding' | 'account creation' | 'active' | 'terminated' | 'inactive';

export interface EmploymentStatusChange {
  status: EmploymentStatus;
  remarks: string;
}

export interface EmploymentStatusHistoryEntry {
  id: number;
  employee_id: number;
  status_set: EmploymentStatus;
  effective_date: string;
  remarks: string;
  changed_by: number;
  created_at: string;
  updated_at: string;
}
