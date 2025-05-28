import { User } from '@/types/auth';

export interface Documentation {
  id: number;
  emp_id: string;
  name: string;
  description: string;
  file_url: string;
  document_type_id: number;
  document_type?: {
    id: number;
    name: string;
  };
  upload_date: string;
  expiry_date: string;
}

export interface Employee {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  status: string;
  job_position_id: number;
  country_id: number;
  office_id: number;
  team_id: number;
  department_id: number;
}

export interface Record {
  employee: Employee;
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

export interface RecordCol {
  employee_id: string;
  profile: string;
  full_name: string;
  title: string;
  email: string;
  user_role: string;
}
