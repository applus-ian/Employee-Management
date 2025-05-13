export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  employees?: AssignedEmployee[];
}

export interface AssignedEmployee {
  id: string;
  profile: string | null;
  full_name: string;
  job_position: string;
  department: string;
  project_role_id: number;
}

export interface CreateProject {
  name: string;
  description: string;
  employees: { id: string; project_role_id: number }[];
  start_date: string;
  end_date: string;
}
