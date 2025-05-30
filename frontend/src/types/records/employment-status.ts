export type EmploymentStatus = 'onboarding' | 'account creation' | 'active' | 'terminated' | 'inactive';

export interface EmploymentStatusChange {
  status: EmploymentStatus;
  remarks: string;
}

export interface EmploymentStatusHistoryEntry {
  id: string;
  status_set: string;
  effective_date: string;
  remarks: string;
  created_at: string;
  changed_by: string;
  changed_by_employee_id: string | null;
}
