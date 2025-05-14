import { User } from '@/types/auth';

export interface Documentation {
  id: number;
  emp_id: string;
  name: string;
  description: string;
  file_url: string;
  document_type_name: string;
  upload_date: string;
  expiry_date: string;
}

export interface Record {
  records: {
    users: User[];
    projects: EmployeeProjects[];
    skills: EmployeeSkill[];
    documentations: Documentation[];
    employee_status: EmployeeStatusHistory[];
  };
}

export interface EmployeeSkill {
  emp_id: string;
  skill_name: string;
  years_of_experience: number;
}

export interface EmployeeProjects {
  emp_id: string;
  project_name: string;
  project_role_name: string;
  start_date: string;
  end_date: string;
}

export interface EmployeeStatusHistory {
  emp_id: string;
  status_set: string;
  effective_date: string;
}
